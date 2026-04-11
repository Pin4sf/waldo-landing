"use server";

import { promises as dns } from "dns";
import { LoopsClient } from "loops";
import disposableDomains from "disposable-email-domains";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validate-email";

type Result =
  | { success: true }
  | { success: false; error: "invalid_email" | "server_error" };

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

async function domainHasMx(domain: string): Promise<boolean> {
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

export async function submitEmail(formData: FormData): Promise<Result> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.toLowerCase().trim() : "";

  // 1. Format + length check (fast, no network)
  if (!isValidEmail(email)) {
    return { success: false, error: "invalid_email" };
  }

  const domain = email.split("@")[1];

  // 2. Disposable email check (~4,000 known throwaway domains)
  if (disposableDomains.includes(domain)) {
    return { success: false, error: "invalid_email" };
  }

  // 3. DNS MX check — domain must be able to receive mail
  const hasMx = await domainHasMx(domain);
  if (!hasMx) {
    return { success: false, error: "invalid_email" };
  }

  // 4. Persist to Supabase (unique constraint handles duplicates silently)
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source: "website" });

  if (error) {
    if (error.code !== "23505") {
      return { success: false, error: "server_error" };
    }
    // Duplicate — already on waitlist, still fire success (no confirmation re-send)
    return { success: true };
  }

  // 5. Add to Loops + fire waitlist_signup event → triggers confirmation email
  //    Fire-and-forget: email failure never blocks the user's success state
  loops.sendEvent({
    email,
    eventName: "waitlist_signup",
    eventProperties: { source: "heywaldo.in" },
  }).catch(() => {
    // Log silently — Supabase already captured the signup
    console.error("[loops] failed to send waitlist_signup event for", email);
  });

  return { success: true };
}
