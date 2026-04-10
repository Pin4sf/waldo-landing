"use server";

import { promises as dns } from "dns";
import disposableDomains from "disposable-email-domains";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validate-email";

type Result =
  | { success: true }
  | { success: false; error: "invalid_email" | "server_error" };

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

  // 4. Persist (unique constraint handles duplicates silently)
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source: "website" });

  if (error) {
    if (error.code === "23505") return { success: true }; // duplicate → silent success
    return { success: false, error: "server_error" };
  }

  return { success: true };
}
