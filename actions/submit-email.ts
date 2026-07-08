"use server";

import { promises as dns } from "dns";
import disposableDomains from "disposable-email-domains";
import { isValidEmail } from "@/lib/validate-email";

type Result =
  | { success: true }
  | { success: false; error: "invalid_email" | "server_error" };

type LoopsJson = Array<unknown> | { success?: boolean; id?: string; message?: string };

const LOOPS_API_BASE = "https://app.loops.so/api/v1";
const LOOPS_REQUEST_TIMEOUT_MS = 8_000;

async function domainHasMx(domain: string): Promise<boolean> {
  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

function getLoopsApiKey() {
  const apiKey = process.env.LOOPS_API_KEY?.trim();
  if (!apiKey) throw new Error("loops_api_key_missing");
  return apiKey;
}

async function loopsRequest(path: string, init: { method: "GET" | "POST" | "PUT"; body?: Record<string, unknown> }): Promise<LoopsJson> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LOOPS_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${LOOPS_API_BASE}${path}`, {
      method: init.method,
      headers: {
        "Accept":        "application/json",
        "Authorization": `Bearer ${getLoopsApiKey()}`,
        "Content-Type":  "application/json",
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      cache: "no-store",
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null) as LoopsJson | null;
    if (!response.ok || (payload && !Array.isArray(payload) && payload.success === false)) {
      throw new Error(`loops_request_failed_${response.status}`);
    }

    return payload ?? { success: true };
  } finally {
    clearTimeout(timeout);
  }
}

async function loopsContactExists(email: string) {
  const contactList = await loopsRequest(`/contacts/find?email=${encodeURIComponent(email)}`, { method: "GET" });
  return Array.isArray(contactList) && contactList.length > 0;
}

async function upsertLoopsContact(email: string): Promise<void> {
  await loopsRequest("/contacts/update", {
    method: "PUT",
    body: {
      email,
      source:    "heywaldo.in",
      userGroup: "waitlist",
    },
  });
}

async function sendLoopsWaitlistEvent(email: string): Promise<void> {
  await loopsRequest("/events/send", {
    method: "POST",
    body: {
      email,
      eventName:       "waitlist_signup",
      eventProperties: { source: "heywaldo.in" },
    },
  });
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

  try {
    // Duplicate — already on waitlist, silent success.
    if (await loopsContactExists(email)) return { success: true };

    await upsertLoopsContact(email);
    await sendLoopsWaitlistEvent(email);
  } catch (error) {
    console.error("[waitlist] loops submission failed", error instanceof Error ? error.message : "unknown_error");
    return { success: false, error: "server_error" };
  }

  return { success: true };
}
