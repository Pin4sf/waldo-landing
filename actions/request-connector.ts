"use server";

import { isValidEmail } from "@/lib/validate-email";

// A "Missing a tool?" request from /connectors. Sent to Loops as an event, tagged so
// requests can be counted by tool. See docs/website/pages/connectors.md §7.

type Result = { success: true } | { success: false; error: "invalid_email" | "missing_tool" | "server_error" };

const LOOPS_API_BASE = "https://app.loops.so/api/v1";

export async function requestConnector(formData: FormData): Promise<Result> {
  const rawEmail = formData.get("email");
  const rawTool = formData.get("tool");
  const rawNote = formData.get("note");
  const email = typeof rawEmail === "string" ? rawEmail.toLowerCase().trim() : "";
  const tool = typeof rawTool === "string" ? rawTool.trim().slice(0, 80) : "";
  const note = typeof rawNote === "string" ? rawNote.trim().slice(0, 280) : "";

  if (!tool) return { success: false, error: "missing_tool" };
  if (!isValidEmail(email)) return { success: false, error: "invalid_email" };

  const apiKey = process.env.LOOPS_API_KEY?.trim();
  if (!apiKey) return { success: false, error: "server_error" };

  try {
    const response = await fetch(`${LOOPS_API_BASE}/events/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        email,
        eventName: "connector_request",
        eventProperties: { tool, note },
      }),
      cache: "no-store",
    });
    if (!response.ok) return { success: false, error: "server_error" };
  } catch {
    return { success: false, error: "server_error" };
  }

  return { success: true };
}
