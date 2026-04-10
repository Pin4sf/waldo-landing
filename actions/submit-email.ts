"use server";

import { promises as dns } from "dns";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validate-email";

type Result =
  | { success: true }
  | { success: false; error: "invalid_email" | "server_error" };

async function domainHasMx(email: string): Promise<boolean> {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    // ENOTFOUND / ENODATA → domain doesn't exist or has no MX records
    return false;
  }
}

export async function submitEmail(formData: FormData): Promise<Result> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.toLowerCase().trim() : "";

  // 1. Format check (fast, no network)
  if (!isValidEmail(email)) {
    return { success: false, error: "invalid_email" };
  }

  // 2. DNS MX check — verify the domain can actually receive mail
  const validDomain = await domainHasMx(email);
  if (!validDomain) {
    return { success: false, error: "invalid_email" };
  }

  // 3. Persist
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source: "website" });

  if (error) {
    if (error.code === "23505") return { success: true }; // already signed up
    return { success: false, error: "server_error" };
  }

  return { success: true };
}
