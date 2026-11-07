// Where everything on the site stands. The one place a status is set: the feature sheets (How it works), the tool
// list (connector-tools.ts) and every "works today" line read from here, so a change of status is one edit.
//
// As of 27 October 2026 the iPhone app is the first surface. What ships, from the owner's list that day:
//   live         app chat with streamed replies; the Brief, Check-in and Close; exact approvals for anything that
//                touches other people or spends money; Recovery, Form, Weight, sleep debt and history from Apple
//                Health and Apple Watch; Gmail, Google Calendar and Google Drive reads; connecting apps from chat;
//                memory you can correct and forget; a first constellation from what you connect; iMessage
//   beta         WHOOP (connect exists, not proven); Kennel for Mac (a narrow beta), and the agents it runs
//   coming next  Oura, Garmin, Fitbit; WhatsApp (waiting on Meta's verification); everything else not listed above
// Telegram is internal and test only, so it isn't offered on the site. Anything the list didn't name is marked
// "coming next" until the owner confirms it.

export type Status = "live" | "beta" | "coming next";

export const STATUS_AS_OF = "27 October 2026";

export const STATUS_LABEL: Record<Status, string> = {
  live: "Live",
  beta: "Beta",
  "coming next": "Coming next",
};

/** A class-safe name for each status, for the dots in site.css and connectors.css */
export const STATUS_SLUG: Record<Status, "live" | "beta" | "next"> = {
  live: "live",
  beta: "beta",
  "coming next": "next",
};
