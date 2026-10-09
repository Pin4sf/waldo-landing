// Every tool on the Connectors page and its status (docs/website/pages/connectors.md). The statuses are the ones
// proposed in the copy doc's TOOL LIST, still to be confirmed before launch: the counts in the request section and
// the "Works with" lines under each use case follow this list.

export type ToolStatus = "today" | "next" | "planned";
export type Tool = { name: string; status: ToolStatus };

export const STATUS_LABEL: Record<ToolStatus, string> = {
  today: "Working today",
  next: "Coming next",
  planned: "Planned",
};

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
  Telegram: "/assets/connectors/telegram.svg",
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
};

export const logoOf = (name: string): string | undefined => LOGOS[name];

const list = (status: ToolStatus, names: string[]): Tool[] => names.map((name) => ({ name, status }));

export const TOOLS: Tool[] = [
  ...list("today", [
    "Apple Watch",
    "Health Connect",
    "Google Calendar",
    "Gmail",
    "Telegram",
    "Google Tasks",
    "Codex",
    "Claude Code",
    "Cursor",
    "OpenCode",
    "Pi",
    "Weather",
    "Location",
  ]),
  ...list("next", [
    "Oura",
    "WHOOP",
    "Garmin",
    "Fitbit",
    "Galaxy Watch",
    "Outlook",
    "Slack",
    "WhatsApp",
    "Todoist",
    "Microsoft To Do",
    "Linear",
    "Notion",
    "Spotify",
  ]),
  ...list("planned", [
    "Strava",
    "Apple Calendar",
    "Zoom",
    "Calendly",
    "Discord",
    "Asana",
    "Trello",
    "ClickUp",
    "Airtable",
    "Google Drive",
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
  const today = by("today");
  const next = by("next");
  const later = by("planned");
  if (today.length) parts.push(`${joinNames(today)} ${today.length > 1 ? "work" : "works"} today.`);
  if (next.length) parts.push(`${joinNames(next)} ${next.length > 1 ? "are" : "is"} next.`);
  if (later.length) parts.push(`${joinNames(later)} ${later.length > 1 ? "are" : "is"} planned.`);
  return parts.join(" ");
}
