"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Status } from "./blocks";

// Proposed statuses from docs/website/pages/connectors.md — to be confirmed before launch.
type ToolStatus = "today" | "next" | "planned";
type Tool = { name: string; group: string; status: ToolStatus; reads: string };

// Logos from the older build (public/assets/connectors). Tools without one get their first letter.
const LOGOS: Record<string, string> = {
  "Apple Watch": "apple",
  "Health Connect": "google-health-connect",
  Oura: "oura",
  WHOOP: "whoop",
  Garmin: "garmin",
  Fitbit: "fitbit",
  Strava: "strava",
  "Google Calendar": "google-calendar",
  Outlook: "microsoft-outlook",
  "Apple Calendar": "apple",
  Zoom: "zoom",
  Calendly: "calendly",
  Gmail: "gmail",
  Telegram: "telegram",
  Slack: "slack",
  WhatsApp: "whatsapp",
  Discord: "discord",
  Linear: "linear",
  Asana: "asana",
  Trello: "trello",
  ClickUp: "clickup",
  Airtable: "airtable",
  Notion: "notion",
  "Google Drive": "google-drive",
  Dropbox: "dropbox",
  GitHub: "github",
  Jira: "jira",
  Vercel: "vercel",
  Supabase: "supabase",
  Figma: "figma",
  Salesforce: "salesforce",
  HubSpot: "hubspot",
  Zendesk: "zendesk",
  Intercom: "intercom",
  Stripe: "stripe",
  QuickBooks: "quickbooks",
  Shopify: "shopify",
  Spotify: "spotify",
  Codex: "openai",
  Granola: "granola",
};

const TOOLS: Tool[] = [
  { name: "Apple Watch", group: "Body", status: "today", reads: "Sleep, heart rate, HRV, movement" },
  { name: "Health Connect", group: "Body", status: "today", reads: "Sleep, heart rate, movement (Android)" },
  { name: "Oura", group: "Body", status: "next", reads: "Sleep, readiness, HRV" },
  { name: "WHOOP", group: "Body", status: "next", reads: "Recovery, strain, sleep" },
  { name: "Garmin", group: "Body", status: "next", reads: "Sleep, heart rate, training" },
  { name: "Fitbit", group: "Body", status: "next", reads: "Sleep, heart rate (via Health Connect)" },
  { name: "Galaxy Watch", group: "Body", status: "next", reads: "Sleep, heart rate (via Health Connect)" },
  { name: "Strava", group: "Body", status: "planned", reads: "Workouts and training load" },
  { name: "Google Calendar", group: "Calendar", status: "today", reads: "Meetings, gaps, back-to-backs" },
  { name: "Outlook", group: "Calendar", status: "next", reads: "Meetings and email metadata" },
  { name: "Apple Calendar", group: "Calendar", status: "planned", reads: "Meetings and gaps" },
  { name: "Zoom", group: "Calendar", status: "planned", reads: "Call times and length" },
  { name: "Calendly", group: "Calendar", status: "planned", reads: "Bookings" },
  { name: "Gmail", group: "Mail & messages", status: "today", reads: "Volume, timing, urgency. Never the words." },
  { name: "Telegram", group: "Mail & messages", status: "today", reads: "Where Waldo talks to you" },
  { name: "Slack", group: "Mail & messages", status: "next", reads: "Message volume and timing" },
  { name: "WhatsApp", group: "Mail & messages", status: "next", reads: "Where Waldo talks to you" },
  { name: "Discord", group: "Mail & messages", status: "planned", reads: "Where Waldo talks to you" },
  { name: "Google Tasks", group: "Tasks & projects", status: "today", reads: "Due dates, overdue items" },
  { name: "Todoist", group: "Tasks & projects", status: "next", reads: "Due dates, overdue items" },
  { name: "Microsoft To Do", group: "Tasks & projects", status: "next", reads: "Due dates, overdue items" },
  { name: "Linear", group: "Tasks & projects", status: "next", reads: "Issues assigned to you" },
  { name: "Asana", group: "Tasks & projects", status: "planned", reads: "Tasks and deadlines" },
  { name: "Trello", group: "Tasks & projects", status: "planned", reads: "Cards and deadlines" },
  { name: "ClickUp", group: "Tasks & projects", status: "planned", reads: "Tasks and deadlines" },
  { name: "Airtable", group: "Tasks & projects", status: "planned", reads: "Records you point it to" },
  { name: "Notion", group: "Notes & files", status: "next", reads: "Pages you point it to" },
  { name: "Google Drive", group: "Notes & files", status: "planned", reads: "Documents you point it to" },
  { name: "Dropbox", group: "Notes & files", status: "planned", reads: "Documents you point it to" },
  { name: "GitHub", group: "Engineering", status: "planned", reads: "Reviews waiting on you" },
  { name: "Jira", group: "Engineering", status: "planned", reads: "Tickets assigned to you" },
  { name: "Vercel", group: "Engineering", status: "planned", reads: "Deploys and their status" },
  { name: "Supabase", group: "Engineering", status: "planned", reads: "Project health" },
  { name: "Figma", group: "Design", status: "planned", reads: "Comments waiting on you" },
  { name: "Salesforce", group: "Sales & support", status: "planned", reads: "Pipeline pressure" },
  { name: "HubSpot", group: "Sales & support", status: "planned", reads: "Pipeline pressure" },
  { name: "Zendesk", group: "Sales & support", status: "planned", reads: "Queue pressure" },
  { name: "Intercom", group: "Sales & support", status: "planned", reads: "Queue pressure" },
  { name: "Stripe", group: "Money", status: "planned", reads: "Business numbers. Read only." },
  { name: "QuickBooks", group: "Money", status: "planned", reads: "Business numbers. Read only." },
  { name: "Shopify", group: "Money", status: "planned", reads: "Store numbers. Read only." },
  { name: "Spotify", group: "Music", status: "next", reads: "The mood of what you play" },
  { name: "Codex", group: "Agents", status: "today", reads: "Their work and results (via Kennel)" },
  { name: "Claude Code", group: "Agents", status: "today", reads: "Their work and results (via Kennel)" },
  { name: "Cursor", group: "Agents", status: "today", reads: "Their work and results (via Kennel)" },
  { name: "OpenCode", group: "Agents", status: "today", reads: "Their work and results (via Kennel)" },
  { name: "Pi", group: "Agents", status: "today", reads: "Their work and results (via Kennel)" },
  { name: "Granola", group: "Agents", status: "planned", reads: "Meeting notes" },
  { name: "Weather", group: "Automatic", status: "today", reads: "Heat, UV, air quality. No setup." },
  { name: "Location", group: "Automatic", status: "today", reads: "Roughly where you are. No setup." },
];

const GROUPS = ["All", ...Array.from(new Set(TOOLS.map((tool) => tool.group)))];
const STATUSES: { value: ToolStatus | "all"; label: string }[] = [
  { value: "all", label: "Any status" },
  { value: "today", label: "Working today" },
  { value: "next", label: "Coming next" },
  { value: "planned", label: "Planned" },
];

export function ConnectorCounts() {
  const today = TOOLS.filter((tool) => tool.status === "today").length;
  const next = TOOLS.filter((tool) => tool.status === "next").length;
  return (
    <>
      {today} tools work today and {next} are coming next, growing to 200+ across 27 categories.
    </>
  );
}

export function ConnectorDirectory() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const [status, setStatus] = useState<ToolStatus | "all">("all");

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return TOOLS.filter(
      (tool) =>
        (group === "All" || tool.group === group) &&
        (status === "all" || tool.status === status) &&
        (!needle || tool.name.toLowerCase().includes(needle) || tool.group.toLowerCase().includes(needle)),
    );
  }, [query, group, status]);

  return (
    <div>
      <div className="site-form" role="search">
        <input
          className="site-input"
          type="search"
          placeholder="Search tools…"
          aria-label="Search tools"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="site-chips" style={{ marginTop: 20 }} aria-label="Filter by type">
        {GROUPS.map((name) => (
          <button key={name} type="button" className="site-chip" aria-pressed={group === name} onClick={() => setGroup(name)}>
            {name}
          </button>
        ))}
      </div>
      <div className="site-chips" style={{ marginTop: 10 }} aria-label="Filter by status">
        {STATUSES.map((option) => (
          <button
            key={option.value}
            type="button"
            className="site-chip"
            aria-pressed={status === option.value}
            onClick={() => setStatus(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="site-note" style={{ marginTop: 28 }} aria-live="polite">
        Showing{" "}
        <span key={shown.length} className="site-state" style={{ display: "inline-block" }}>
          {shown.length}
        </span>{" "}
        of {TOOLS.length} tools
      </p>

      {/* Tools that come back into the list when a filter changes fade in (see site.css) */}
      <div className="site-grid site-directory-grid" style={{ ["--cols" as string]: 4, marginTop: 28 }}>
        {shown.map((tool) => (
          <div key={tool.name} className="site-item">
            <p className="site-label site-item-meta">{tool.group}</p>
            <h3 className="site-item-title site-tool-name">
              {LOGOS[tool.name] ? (
                <Image src={`/assets/connectors/${LOGOS[tool.name]}.svg`} alt="" width={24} height={24} unoptimized />
              ) : (
                <span className="site-tool-mark" aria-hidden="true">
                  {tool.name[0]}
                </span>
              )}
              {tool.name}
            </h3>
            <div className="site-item-text" style={{ marginTop: 10 }}>
              <p>{tool.reads}</p>
            </div>
            <div style={{ marginTop: 10 }}>
              <Status value={tool.status} />
            </div>
          </div>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="site-text site-state">
          Nothing matches yet. <a className="site-link" href="#request">Ask for it →</a>
        </p>
      ) : null}
    </div>
  );
}
