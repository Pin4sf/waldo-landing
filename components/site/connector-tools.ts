// Every tool on the Connectors page and where it stands (docs/website/pages/connectors.md). Statuses come from
// status.ts, as of the owner's list of 27 October 2026: the counts in the request section and the "works today" lines
// under each use case follow this list. Tools nobody has started on are "later": listed so people can ask for them,
// never shown as coming. Telegram is internal and test only, so it isn't listed.

import { type Status, STATUS_LABEL as LABEL, STATUS_SLUG as SLUG } from "./status";

export type ToolStatus = Status | "later";
export type Tool = { name: string; status: ToolStatus };

export const STATUS_LABEL: Record<ToolStatus, string> = { ...LABEL, later: "Not built yet" };
export const STATUS_SLUG: Record<ToolStatus, string> = { ...SLUG, later: "later" };

// Marks in public/assets/connectors. Tools without one get their first letter.
const LOGOS: Record<string, string> = {
  "Apple Watch": "/assets/connectors/apple.svg",
  "Apple Health": "/assets/connectors/apple-health.svg",
  "Health Connect": "/assets/connectors/google-health-connect.svg",
  Oura: "/assets/connectors/oura.svg",
  WHOOP: "/assets/connectors/whoop.svg",
  Garmin: "/assets/connectors/garmin.svg",
  Fitbit: "/assets/connectors/fitbit.svg",
  Strava: "/assets/connectors/strava.svg",
  "Google Calendar": "/assets/connectors/google-calendar.svg",
  Outlook: "/assets/connectors/microsoft-outlook.svg",
  Zoom: "/assets/connectors/zoom.svg",
  Calendly: "/assets/connectors/calendly.svg",
  Gmail: "/assets/connectors/gmail.svg",
  Slack: "/assets/connectors/slack.svg",
  WhatsApp: "/assets/connectors/whatsapp.svg",
  Linear: "/assets/connectors/linear.svg",
  Asana: "/assets/connectors/asana.svg",
  Notion: "/assets/connectors/notion.svg",
  "Google Drive": "/assets/connectors/google-drive.svg",
  GitHub: "/assets/connectors/github.svg",
  Figma: "/assets/connectors/figma.svg",
  Salesforce: "/assets/connectors/salesforce.svg",
  HubSpot: "/assets/connectors/hubspot.svg",
  Stripe: "/assets/connectors/stripe.svg",
  Codex: "/assets/connectors/openai.svg",
  "Claude Code": "/assets/connectors/claude.svg",
  Granola: "/assets/connectors/granola.svg",
  Kennel: "/build/kennel-icon.svg",
  Waldo: "/logodots.svg",
};

export const logoOf = (name: string): string | undefined => LOGOS[name];

const list = (status: ToolStatus, names: string[]): Tool[] => names.map((name) => ({ name, status }));

export const TOOLS: Tool[] = [
  ...list("live", ["Apple Watch", "Apple Health", "Google Calendar", "Gmail", "Google Drive", "Google Tasks", "iMessage"]),
  // WHOOP connects, but isn't proven yet. The agents run in Kennel for Mac, which is a narrow beta.
  ...list("beta", ["WHOOP", "Codex", "Claude Code", "Cursor", "OpenCode", "Pi"]),
  ...list("coming next", [
    "Oura",
    "Garmin",
    "Fitbit",
    // Waiting on Meta's verification
    "WhatsApp",
    "Outlook",
    "Slack",
    "Todoist",
    "Microsoft To Do",
    "Linear",
    "Notion",
    "Spotify",
    "Weather",
    "Location",
  ]),
  ...list("later", [
    // Android comes later, and these with it
    "Health Connect",
    "Galaxy Watch",
    "Strava",
    "Apple Calendar",
    "Zoom",
    "Calendly",
    "Discord",
    "Asana",
    "Trello",
    "ClickUp",
    "Airtable",
    "Dropbox",
    "GitHub",
    "Jira",
    "Vercel",
    "Supabase",
    "Figma",
    "HubSpot",
    "Salesforce",
    "Zendesk",
    "Intercom",
    "Stripe",
    "QuickBooks",
    "Shopify",
    "Granola",
  ]),
];

export const statusOf = (name: string): ToolStatus | undefined => TOOLS.find((tool) => tool.name === name)?.status;

export const countOf = (status: ToolStatus) => TOOLS.filter((tool) => tool.status === status).length;

/** "A, B and C" */
export function joinNames(names: string[]) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** One plain line on which of these tools work today and which come later, e.g. "Gmail works today. Slack is next." */
export function availability(names: string[]) {
  const by = (status: ToolStatus) => names.filter((name) => statusOf(name) === status);
  const parts: string[] = [];
  const live = by("live");
  const beta = by("beta");
  const next = by("coming next");
  const later = by("later");
  if (live.length) parts.push(`${joinNames(live)} ${live.length > 1 ? "work" : "works"} today.`);
  if (beta.length) parts.push(`${joinNames(beta)} ${beta.length > 1 ? "are" : "is"} in beta.`);
  if (next.length) parts.push(`${joinNames(next)} ${next.length > 1 ? "are" : "is"} next.`);
  if (later.length) parts.push(`${joinNames(later)} ${later.length > 1 ? "aren’t" : "isn’t"} built yet.`);
  return parts.join(" ");
}
