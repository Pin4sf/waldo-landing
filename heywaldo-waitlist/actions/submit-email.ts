"use server";

import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validate-email";

type Result =
  | { success: true }
  | { success: false; error: "invalid_email" | "server_error" };

export async function submitEmail(formData: FormData): Promise<Result> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.toLowerCase().trim() : "";

  if (!isValidEmail(email)) {
    return { success: false, error: "invalid_email" };
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email, source: "website" });

  if (error) {
    // 23505 = unique constraint violation (already signed up)
    if (error.code === "23505") return { success: true };
    return { success: false, error: "server_error" };
  }

  return { success: true };
}
