"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { Aside, withHighlights } from "@/components/landing-primitives";
import { IconButton } from "@/components/rail-controls";
import { AccountAgentConstellation } from "@/components/sections/account-agent-constellation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SCROLL_DURATION_MS = 1000;
const PINNED_SCROLL_QUERY = "(min-width: 1100px) and (min-height: 820px)";

type AgentSlide = {
  label: string;
  headline: string;
  description: string;
  wide?: boolean;
  aside?: string;
  visual: ReactNode;
};

type Connector = {
  initials: string;
  name: string;
  label: string;
  phase: string;
  icon?: string;
};

// Some launch connectors do not exist in the downloaded Composio logo set yet.
// Keep those as neutral text placeholders until the owner supplies the real assets.
const connectors = [
  { initials: "AH", name: "Apple Health", label: "Read at 6:12am", phase: "V1" },
  {
    initials: "GC",
    name: "Google Calendar",
    label: "2 events moved",
    phase: "V1",
    icon: "/assets/composio-connectors/googlecalendar.svg",
  },
  { initials: "GM", name: "Gmail", label: "14 threads scanned", phase: "V1", icon: "/assets/composio-connectors/gmail.svg" },
  { initials: "TD", name: "Todoist", label: "3 tasks reprioritised", phase: "V1" },
  { initials: "LN", name: "Linear", label: "Sprint tickets pulled", phase: "V1", icon: "/assets/composio-connectors/linear.svg" },
  { initials: "AC", name: "Apple Calendar", label: "All calendars synced", phase: "V1" },
  { initials: "OM", name: "Open-Meteo", label: "Weather and UV fed to Brief", phase: "V1" },
  { initials: "TG", name: "Telegram", label: "Brief delivered", phase: "V1" },
  { initials: "SL", name: "Slack", label: "Focus status set", phase: "Phase 2", icon: "/assets/composio-connectors/slack.svg" },
  { initials: "SP", name: "Spotify", label: "Mood: calm, focused", phase: "Phase 2" },
  { initials: "ST", name: "Strava", label: "Recovery day suggested", phase: "Phase 2" },
  { initials: "GH", name: "GitHub", label: "PR load: 3 reviews pending", phase: "Phase 2", icon: "/assets/composio-connectors/github.svg" },
  {
    initials: "GD",
    name: "Google Drive",
    label: "Doc search across 200 files",
    phase: "Phase 2",
    icon: "/assets/composio-connectors/googledrive.svg",
  },
] satisfies Connector[];

const overnightLog = [
  ["11:14pm", "The Close: day summary delivered"],
  ["11:15pm", "Patrol: quiet hours activated"],
  ["2:00am", "Dreaming Mode: consolidated 14 memories"],
  ["2:01am", 'Promoted pattern: "Tuesday crashes" (3+ occurrences)'],
  ["2:02am", "Pre-computed tomorrow's Brief (2.3 seconds)"],
  ["6:12am", "Patrol: scanned overnight HRV"],
  ["6:14am", "Brief ready. Waiting for your alarm."],
] as const;

const mcpPullSources = [
  {
    connector: connectors[0],
    label: "Recovery 61",
    read: "rough morning",
    style: { left: "5%", top: "18%", width: "206px", "--chip-shift-x": "10px", "--chip-shift-y": "-6px", "--chip-delay": "0ms" },
  },
  {
    connector: connectors[1],
    label: "9am review",
    read: "can move",
    style: { left: "8%", top: "64%", width: "206px", "--chip-shift-x": "13px", "--chip-shift-y": "6px", "--chip-delay": "520ms" },
  },
  {
    connector: connectors[2],
    label: "104 emails",
    read: "2 need you",
    style: { left: "37%", top: "11%", width: "188px", "--chip-shift-x": "8px", "--chip-shift-y": "8px", "--chip-delay": "980ms" },
  },
  {
    connector: connectors[8],
    label: "Slack quiet",
    read: "status ready",
    style: { left: "40%", top: "70%", width: "184px", "--chip-shift-x": "11px", "--chip-shift-y": "-7px", "--chip-delay": "1380ms" },
  },
  {
    connector: connectors[4],
    label: "Deck task",
    read: "due Thursday",
    style: { left: "61%", top: "29%", width: "178px", "--chip-shift-x": "8px", "--chip-shift-y": "9px", "--chip-delay": "1840ms" },
  },
] as const;

const mcpFlowSteps = [
  ["Read", "Body, calendar, inbox"],
  ["Choose", "Morning review moves"],
  ["Write", "Task and draft wait"],
] as const;

const multiAccountGroups = [
  {
    connector: connectors[2],
    shortName: "Gmail",
    summary: "2 accounts",
    accounts: [
      ["suyash@waldo.work", "WORK", "S"],
      ["suyash@gmail.com", "PERSONAL", "S"],
    ],
  },
  {
    connector: connectors[1],
    shortName: "Calendar",
    summary: "3 calendars",
    accounts: [["3 calendars synced", "WORK + HOME + TEAM", "3"]],
  },
  {
    connector: connectors[3],
    shortName: "Todoist",
    summary: "1 account",
    accounts: [["Personal tasks", "YOU", "S"]],
  },
  {
    connector: connectors[4],
    shortName: "Linear",
    summary: "1 account",
    accounts: [["Team sprint", "TEAM", "T"]],
  },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function easeInOutQuad(progress: number) {
  return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d={direction === "next" ? "M6.5 3.5 10.5 8.5 6.5 13.5" : "M10.5 3.5 6.5 8.5 10.5 13.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConnectorIcon({
  connector,
  size = "default",
}: {
  connector: Pick<Connector, "icon" | "initials" | "name">;
  size?: "small" | "default";
}) {
  const frameClass =
    size === "small"
      ? "h-7 w-7 rounded-[9px]"
      : "h-10 w-10 rounded-[12px]";
  const imageSize = size === "small" ? 18 : 24;

  return (
    <span
      className={`flex ${frameClass} shrink-0 items-center justify-center border border-[var(--border-default)] bg-[var(--surface-t1)]`}
      aria-hidden
    >
      {connector.icon ? (
        <Image src={connector.icon} alt="" width={imageSize} height={imageSize} className="h-auto w-auto max-w-[70%]" />
      ) : (
        <span className="type-caption text-[var(--ink)]">{connector.initials}</span>
      )}
    </span>
  );
}

function ChatVisual() {
  return (
    <div className="grid h-full gap-3 lg:grid-cols-[0.96fr_1.04fr]">
      <div className="flex flex-col justify-end gap-3">
        <div className="ml-auto max-w-[82%] rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t3)] px-4 py-3">
          <p className="type-caption text-[var(--ink)]">How did I sleep?</p>
        </div>
        <div className="max-w-[90%] rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t1)] px-4 py-3">
          <p className="type-caption text-[var(--ink)]">Not great, honestly.</p>
        </div>
        <div className="max-w-[94%] rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="type-label text-[var(--ink)]">Sleep</p>
            <p className="type-data text-[var(--ink)]">5h 42m</p>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {[42, 70, 36, 58, 28].map((height, index) => (
              <span key={index} className="block rounded-full bg-[var(--surface-t4)]" style={{ height: `${height}px` }} />
            ))}
          </div>
          <Aside className="mt-3">deep sleep below baseline.</Aside>
        </div>
        <div className="max-w-[90%] rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t1)] px-4 py-3">
          <p className="type-caption text-[var(--text-secondary)]">
            Recovery is sitting at 61 today. I&apos;ve already pushed your 9am.
          </p>
        </div>
      </div>

      <div className="hidden flex-col justify-end gap-3 lg:flex">
        <div className="ml-auto max-w-[86%] rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t3)] px-4 py-3">
          <p className="type-caption text-[var(--ink)]">Prep me for my 3pm</p>
        </div>
        <div className="rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <p className="type-label text-[var(--ink)]">Board review</p>
          <div className="mt-3 grid gap-2">
            {["8 attendees", "90 minutes", "Form is 72, steady enough", "3 follow-ups from last week"].map((line) => (
              <div key={line} className="rounded-[8px] bg-[var(--surface-t3)] px-3 py-2">
                <p className="type-caption text-[var(--text-secondary)]">{line}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="type-caption rounded-full bg-[var(--ink)] px-3 py-2 text-[var(--surface-t2)]">View prep brief</span>
            <span className="type-caption rounded-full bg-[var(--surface-t3)] px-3 py-2 text-[var(--text-secondary)]">Skip</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DraftsVisual() {
  const drafts = [
    ["Document", "Q3 Engineering Retro", "Based on: Linear tickets, Calendar, team velocity", "Export to Drive"],
    ["Email", "Re: Product strategy review", '"Hey Suyash, We do not care if you received..."', "Send requires your tap"],
    ["Task", "Review deck before Friday", "Priority: High, Due: Thu, Source: Calendar follow-up", "Created in Todoist"],
  ] as const;

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {drafts.map(([type, title, body, action]) => (
        <div key={title} className="rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="type-caption text-[var(--text-tertiary)]">{type}</p>
            <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
          </div>
          <p className="type-label mt-3 text-[var(--ink)]">{title}</p>
          <p className="type-caption tone-secondary mt-2">{body}</p>
          <p className="type-aside tone-tertiary mt-3">{action}</p>
        </div>
      ))}
    </div>
  );
}

function MultiAccountVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[8px] bg-[var(--surface-t1)] p-4 sm:p-5">
      <div className="hidden h-full sm:block">
        <div className="absolute left-5 top-5 z-20 max-w-[230px]">
          <p className="type-caption text-[var(--text-tertiary)]">Account context</p>
          <p className="type-label mt-1 text-[var(--ink)]">One read across the versions of your day.</p>
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 764 450" fill="none" aria-hidden>
          <path className="waldo-tool-path" d="M176 230 C252 178 300 126 384 110" />
          <path className="waldo-tool-path" d="M176 230 C258 202 310 198 384 198" style={{ animationDelay: "420ms" }} />
          <path className="waldo-tool-path" d="M176 230 C260 255 315 284 384 294" style={{ animationDelay: "840ms" }} />
          <path className="waldo-tool-path" d="M176 230 C258 300 306 336 384 374" style={{ animationDelay: "1260ms" }} />
          <path className="waldo-tool-path" d="M426 110 C474 88 516 84 594 92" style={{ animationDelay: "260ms" }} />
          <path className="waldo-tool-path" d="M426 110 C480 124 524 138 594 158" style={{ animationDelay: "520ms" }} />
          <path className="waldo-tool-path" d="M426 198 C482 194 526 204 594 226" style={{ animationDelay: "780ms" }} />
          <path className="waldo-tool-path" d="M426 294 C476 300 520 316 594 304" style={{ animationDelay: "1040ms" }} />
          <path className="waldo-tool-path" d="M426 374 C474 368 522 376 594 374" style={{ animationDelay: "1300ms" }} />
        </svg>

        <div className="absolute left-[8%] top-1/2 z-30 flex w-[176px] -translate-y-1/2 items-center gap-3 rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[var(--ink)] text-[var(--surface-t2)]">
            <span className="type-label">W</span>
          </span>
          <div>
            <p className="type-label text-[var(--ink)]">Waldo</p>
            <p className="type-caption mt-1 text-[var(--text-tertiary)]">one context</p>
          </div>
        </div>

        <div className="absolute left-[49%] top-1/2 z-20 grid w-[106px] -translate-x-1/2 -translate-y-1/2 gap-6">
          {multiAccountGroups.map((group) => (
            <div key={group.connector.name} className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)]">
              <ConnectorIcon connector={group.connector} size="small" />
            </div>
          ))}
        </div>

        <div className="absolute right-5 top-10 z-20 grid w-[260px] gap-3">
          {multiAccountGroups.flatMap((group) =>
            group.accounts.map(([account, badge, initial]) => (
              <div
                key={`${group.connector.name}-${account}`}
                className="waldo-tool-chip flex items-center gap-3 rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] px-3 py-2.5"
                style={{ "--chip-shift-x": "8px", "--chip-shift-y": "-4px" } as CSSProperties}
              >
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-t4)]">
                  <span className="type-caption text-[var(--ink)]">{initial}</span>
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)]">
                    {group.connector.icon ? (
                      <Image src={group.connector.icon} alt="" width={13} height={13} className="h-auto w-auto max-w-[70%]" />
                    ) : (
                      <span className="text-[8px] font-medium leading-none text-[var(--ink)]">{group.connector.initials}</span>
                    )}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="type-caption truncate text-[var(--ink)]">{account}</p>
                  <p className="type-caption mt-0.5 truncate text-[var(--text-tertiary)]">{group.connector.name}</p>
                </div>
                <span className="type-caption rounded-full bg-[var(--surface-t1)] px-2.5 py-1 text-[var(--text-secondary)]">
                  {badge}
                </span>
              </div>
            )),
          )}
        </div>
      </div>

      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 sm:hidden">
        <div>
          <p className="type-caption text-[var(--text-tertiary)]">Account context</p>
          <p className="type-label mt-1 text-[var(--ink)]">Waldo reads work, personal, and team accounts together.</p>
        </div>
        <div className="grid content-center grid-cols-2 gap-2">
          {multiAccountGroups.map((group) => (
            <div key={group.connector.name} className="rounded-[12px] bg-[var(--surface-t2)] p-2.5">
              <div className="flex items-center gap-2">
                <ConnectorIcon connector={group.connector} size="small" />
                <p className="type-caption truncate text-[var(--ink)]">{group.shortName}</p>
              </div>
              <p className="type-caption mt-1.5 text-[var(--text-tertiary)]">{group.summary}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-2.5">
          <p className="type-caption text-[var(--text-tertiary)]">Output</p>
          <p className="type-label mt-1 text-[var(--ink)]">One day, not four separate versions.</p>
        </div>
      </div>
    </div>
  );
}

function McpWorkflowVisual() {
  return (
    <div className="relative h-full overflow-hidden rounded-[8px] bg-[var(--surface-t1)] p-4 sm:p-5">
      <div className="hidden h-full sm:block">
        <div className="absolute left-5 top-5 z-20 max-w-[220px]">
          <p className="type-caption text-[var(--text-tertiary)]">Live handoff</p>
          <p className="type-label mt-1 text-[var(--ink)]">Waldo is pulling what matters.</p>
        </div>

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 764 450" fill="none" aria-hidden>
          <path className="waldo-tool-path" d="M148 116 C248 108 330 138 405 205" />
          <path className="waldo-tool-path" d="M150 320 C258 305 335 270 405 234" style={{ animationDelay: "420ms" }} />
          <path className="waldo-tool-path" d="M404 96 C430 132 438 165 438 190" style={{ animationDelay: "840ms" }} />
          <path className="waldo-tool-path" d="M442 338 C448 304 452 274 456 252" style={{ animationDelay: "1260ms" }} />
          <path className="waldo-tool-path" d="M565 172 C544 187 518 202 496 214" style={{ animationDelay: "1680ms" }} />
          <path className="waldo-tool-path" d="M505 236 C565 258 610 292 648 330" style={{ animationDelay: "2100ms" }} />
        </svg>

        {mcpPullSources.map((source) => (
          <div
            key={source.connector.name}
            className="waldo-tool-chip absolute z-10 flex items-center gap-3 rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3"
            style={source.style as CSSProperties}
          >
            <ConnectorIcon connector={source.connector} />
            <div className="min-w-0">
              <p className="type-caption truncate text-[var(--ink)]">{source.label}</p>
              <p className="type-caption mt-1 truncate text-[var(--text-tertiary)]">{source.read}</p>
            </div>
          </div>
        ))}

        <div className="absolute left-[56%] top-1/2 z-20 w-[244px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="type-label text-[var(--ink)]">Waldo</p>
            <span className="flex items-center gap-1.5 rounded-full bg-[var(--surface-t1)] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--zone-peak)]" aria-hidden />
              <span className="type-caption text-[var(--text-tertiary)]">running</span>
            </span>
          </div>
          <p className="type-caption mt-3 text-[var(--text-secondary)]">Turning a rough morning into one handoff.</p>
          <div className="mt-4 grid gap-2">
            {mcpFlowSteps.map(([step, detail], index) => (
              <div
                key={step}
                className="waldo-mcp-step rounded-[10px] bg-[var(--surface-t1)] px-3 py-2"
                style={{ "--step-delay": `${index * 1200}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="type-caption text-[var(--ink)]">{step}</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
                </div>
                <p className="type-caption mt-1 text-[var(--text-tertiary)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 right-5 z-20 w-[218px] rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3">
          <p className="type-caption text-[var(--text-tertiary)]">Output</p>
          <div className="mt-3 grid gap-2">
            {["9am moved to 10:30", "Deck task created", "Email draft waits for tap"].map((line) => (
              <div key={line} className="rounded-[9px] bg-[var(--surface-t1)] px-3 py-2">
                <p className="type-caption text-[var(--ink)]">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid h-full content-between gap-3 sm:hidden">
        <div>
          <p className="type-caption text-[var(--text-tertiary)]">Live handoff</p>
          <p className="type-label mt-1 text-[var(--ink)]">Waldo pulls from the sources around your day.</p>
        </div>
        <div className="grid gap-2">
          {mcpPullSources.slice(0, 4).map((source) => (
            <div key={source.connector.name} className="flex items-center gap-3 rounded-[12px] bg-[var(--surface-t2)] p-2.5">
              <ConnectorIcon connector={source.connector} size="small" />
              <div className="min-w-0">
                <p className="type-caption truncate text-[var(--ink)]">{source.label}</p>
                <p className="type-caption truncate text-[var(--text-tertiary)]">{source.read}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3">
          <p className="type-caption text-[var(--text-tertiary)]">Output</p>
          <p className="type-label mt-1 text-[var(--ink)]">Calendar moved. Task created. Email waiting.</p>
        </div>
      </div>
    </div>
  );
}

function InterfaceLayerVisual() {
  const columns = [
    {
      label: "Tools and agents",
      items: ["Research agent", "Scheduling agent", "Writing agent", "Gmail", "Calendar"],
    },
    {
      label: "Waldo human context",
      items: ["rough morning", "sharp window", "approval needed", "work account only"],
    },
    {
      label: "Work completed",
      items: ["Brief returned", "Safer slot found", "Follow-up drafted", "Send left to you"],
    },
  ] as const;

  const receipts = [
    "Research agent returned the missing brief.",
    "Scheduling agent found the safer slot.",
    "Writing agent drafted the follow-up.",
    "Waldo left the send button to you.",
  ] as const;

  return (
    <div className="waldo-interface-layer h-full rounded-[8px] bg-[var(--surface-t1)] p-4 sm:p-5">
      <div className="hidden h-full flex-col justify-between sm:flex">
        <div className="grid flex-1 gap-3 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={column.label} className="waldo-interface-column rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
              <p className="type-caption text-[var(--text-tertiary)]">{column.label}</p>
              <div className="mt-4 grid gap-2">
                {column.items.map((item, itemIndex) => (
                  <div
                    key={item}
                    className="waldo-interface-pill rounded-[10px] bg-[var(--surface-t1)] px-3 py-2"
                    style={{ "--step-delay": `${(columnIndex * 240) + itemIndex * 120}ms` } as CSSProperties}
                  >
                    <p className="type-caption text-[var(--ink)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {receipts.map((receipt) => (
            <div key={receipt} className="rounded-[12px] border border-[var(--border-default)] bg-[var(--surface-t2)] px-3 py-2.5">
              <p className="type-caption text-[var(--ink)]">{receipt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid h-full content-between gap-3 sm:hidden">
        {columns.map((column) => (
          <div key={column.label} className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3">
            <p className="type-caption text-[var(--text-tertiary)]">{column.label}</p>
            <p className="type-label mt-1 text-[var(--ink)]">{column.items[0]}</p>
          </div>
        ))}
        <div className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3">
          <p className="type-caption text-[var(--text-tertiary)]">Receipt</p>
          <p className="type-label mt-1 text-[var(--ink)]">Waldo left the send button to you.</p>
        </div>
      </div>
    </div>
  );
}

function OvernightVisual() {
  return (
    <div className="flex h-full flex-col justify-center rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--zone-peak)]" aria-hidden />
        <p className="type-caption uppercase text-[var(--text-tertiary)]">Overnight patrol</p>
      </div>
      <div className="grid gap-2">
        {overnightLog.map(([time, line]) => (
          <div key={time + line} className="grid grid-cols-[62px_1fr] gap-3 rounded-[10px] bg-[var(--surface-t2)] px-3 py-2">
            <p className="type-data text-[var(--text-tertiary)]">{time}</p>
            <p className="type-caption text-[var(--ink)]">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const slides: AgentSlide[] = [
  {
    label: "Constellation",
    headline: "Every app, account, and agent.",
    description:
      "Waldo reads the human context from Apple Health, then routes the right work through calendar, inbox, tasks, documents, and specialist agents. The output is not another app switch. It is a receipt.",
    wide: true,
    aside: "one orbit around the day.",
    visual: <AccountAgentConstellation />,
  },
  {
    label: "Interface layer",
    headline: "Agents can act. Waldo knows the human.",
    description:
      "Agents know tools. Waldo tells them what kind of day the human is having, which account is in scope, and where the final approval gate belongs.",
    wide: true,
    aside: "the human layer for agent work.",
    visual: <InterfaceLayerVisual />,
  },
  {
    label: "Chat",
    headline: "Every thread remembers.",
    description:
      "Most AI chats forget what you said ten messages ago. Waldo keeps threads - one for sleep questions, one for the Q3 retro, one for your training plan. Context carries across conversations, across days, across weeks. Ask 'how did I sleep?' on Monday and 'is that a pattern?' on Friday - Waldo connects both without you re-explaining.",
    wide: true,
    aside: "there when you want the why.",
    visual: <ChatVisual />,
  },
  {
    label: "Drafts",
    headline: "Waldo drafts. You approve.",
    description:
      "Emails, documents, tasks, spreadsheet entries. Waldo creates them. You review them. *Emails never auto-send.* Tasks never auto-complete. Some things always need a human.",
    aside: "hands off until your tap.",
    visual: <DraftsVisual />,
  },
  {
    label: "Accounts",
    headline: "Every tool. Every account. One Waldo.",
    description:
      "Two Gmail accounts - work and personal. Three calendars. A Todoist for you and a Linear for the team. Waldo reads across all of them without you switching contexts. It sees your full day, not the version one app knows about.",
    wide: true,
    aside: "one day, not four versions of it.",
    visual: <MultiAccountVisual />,
  },
  {
    label: "MCP workflow",
    headline: "Your body becomes the context.",
    description:
      "Every AI agent runs on prompts. Waldo runs on your body. Your HRV, sleep, stress, and circadian position shape the handoff - which meetings move, which tasks wait, when to protect your afternoon. Waldo checks the tools around your day, writes back through MCP, and keeps every move logged.",
    wide: true,
    aside: "the only loop with a pulse.",
    visual: <McpWorkflowVisual />,
  },
  {
    label: "Overnight",
    headline: "Waldo works while you sleep.",
    description:
      "At 2am, Waldo dreams. It consolidates what it learned, finds patterns, and pre-builds your morning. *By the time your alarm goes off, it is already done.* Other agents wait for your prompt. Waldo's prompt is your pulse - updated every 15 minutes, running even at 2am.",
    aside: "start a task. take a nap. come back to it handled.",
    visual: <OvernightVisual />,
  },
];

export function AgentFeaturesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const offsetsRef = useRef<number[]>([]);
  const animationRef = useRef<number | null>(null);
  const scrollSnapTypeRef = useRef<string | null>(null);
  const scrollDebounceRef = useRef<number | null>(null);
  const scrollDrivenRef = useRef(false);
  const railProgressRef = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [railProgress, setRailProgress] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);

  const measureOffsets = () => {
    const firstOffset = itemRefs.current[0]?.offsetLeft ?? 0;
    offsetsRef.current = itemRefs.current.map((item) => Math.max(0, (item?.offsetLeft ?? firstOffset) - firstOffset));
  };

  useEffect(() => {
    measureOffsets();
    window.addEventListener("resize", measureOffsets);
    return () => window.removeEventListener("resize", measureOffsets);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
      if (scrollDebounceRef.current) window.clearTimeout(scrollDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const setActiveValue = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;

    const mm = gsap.matchMedia();

    mm.add(PINNED_SCROLL_QUERY, () => {
      measureOffsets();
      let maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      if (maxScroll < 8) return undefined;

      const snapToCard = (progress: number) => {
        const points = offsetsRef.current.map((offset) => Math.max(0, Math.min(1, offset / Math.max(1, maxScroll))));
        if (points.length === 0) return progress;

        return points.reduce((nearest, point) => (
          Math.abs(point - progress) < Math.abs(nearest - progress) ? point : nearest
        ), points[0] ?? progress);
      };

      scrollDrivenRef.current = true;
      const pinnedSnapType = viewport.style.scrollSnapType || window.getComputedStyle(viewport).scrollSnapType;
      viewport.style.scrollSnapType = "none";
      setScrollDriven(true);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${maxScroll + window.innerHeight * 0.45}`,
        pin: true,
        pinSpacing: "margin",
        scrub: true,
        snap: {
          snapTo: snapToCard,
          duration: { min: 0.18, max: 0.38 },
          delay: 0.04,
          ease: "power2.out",
        },
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
        },
        onUpdate: (self) => {
          const rawIndex = self.progress * (slides.length - 1);
          const nextIndex = Math.max(0, Math.min(slides.length - 1, Math.round(rawIndex)));
          const nextScrollLeft = maxScroll * self.progress;

          if (Math.abs(viewport.scrollLeft - nextScrollLeft) > 0.5) {
            viewport.scrollLeft = nextScrollLeft;
          }
          if (Math.abs(railProgressRef.current - self.progress) > 0.018 || self.progress <= 0.001 || self.progress >= 0.999) {
            railProgressRef.current = self.progress;
            setRailProgress(self.progress);
          }
          if (nextIndex !== activeRef.current) setActiveValue(nextIndex);
        },
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
        scrollDrivenRef.current = false;
        viewport.style.scrollSnapType = pinnedSnapType;
        setScrollDriven(false);
      };
    });

    return () => mm.revert();
  }, [reducedMotion]);

  const finishAnimation = () => {
    const viewport = viewportRef.current;
    if (viewport && scrollSnapTypeRef.current !== null) {
      viewport.style.scrollSnapType = scrollSnapTypeRef.current;
      scrollSnapTypeRef.current = null;
    }
    animationRef.current = null;
  };

  const animateTo = (index: number) => {
    const viewport = viewportRef.current;
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const to = offsetsRef.current[nextIndex] ?? 0;
    setActiveValue(nextIndex);

    if (!viewport) return;
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);

    const from = viewport.scrollLeft;
    const distance = to - from;

    if (reducedMotion || Math.abs(distance) < 1) {
      viewport.scrollLeft = to;
      return;
    }

    let startTime: number | null = null;
    scrollSnapTypeRef.current = viewport.style.scrollSnapType || window.getComputedStyle(viewport).scrollSnapType;
    viewport.style.scrollSnapType = "none";

    const step = (now: number) => {
      startTime ??= now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / SCROLL_DURATION_MS);
      viewport.scrollLeft = from + distance * easeInOutQuad(progress);

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(step);
        return;
      }

      viewport.scrollLeft = to;
      finishAnimation();
    };

    animationRef.current = window.requestAnimationFrame(step);
  };

  const updateActiveFromScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (scrollDrivenRef.current) return;

    const nearest = offsetsRef.current.reduce(
      (best, offset, index) => {
        const distance = Math.abs(viewport.scrollLeft - offset);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: active, distance: Number.POSITIVE_INFINITY },
    ).index;

    if (nearest !== active) setActiveValue(nearest);
  };

  const handleScroll = () => {
    if (scrollDrivenRef.current) return;
    if (scrollDebounceRef.current) window.clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = window.setTimeout(updateActiveFromScroll, 200);
  };

  return (
    <section ref={sectionRef} id="agent-features" className="waldo-agent-gallery relative z-20 isolate min-h-[100svh] w-screen max-w-none scroll-mt-0 overflow-hidden bg-[var(--surface-t3)] pt-32 pb-8 lg:pt-36 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[var(--surface-t3)] lg:h-56" />
      <div className="px-[var(--agent-side-padding)]" data-animate="blur-fade">
        <p className="type-eyebrow mb-4 text-[var(--text-tertiary)]">Apps, accounts, agents</p>
        <h2 className="type-h1 max-w-[760px] text-[var(--ink)]" data-animate="headline">
          Every app, account, and agent.
        </h2>
        <p className="type-body tone-secondary mt-5 max-w-[620px]">
          Agents can act. Waldo tells them what kind of day the human is having.
        </p>
      </div>

      <div
        ref={viewportRef}
        data-animate="stagger"
        data-stagger="0.08"
        className="mt-12 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "var(--agent-side-padding)" }}
        aria-label="Agent features gallery"
        onScroll={handleScroll}
      >
        <ul
          role="list"
          className="grid w-fit grid-flow-col gap-[var(--agent-card-gap)] px-[var(--agent-side-padding)]"
        >
          {slides.map((slide, index) => (
            <li
              key={slide.label}
              data-stagger-item
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={`${slide.wide ? "w-[var(--agent-wide-card-width)]" : "w-[var(--agent-card-width)]"} scroll-ml-0 snap-start`}
              aria-current={active === index}
            >
              <article className="h-full">
                <div className="h-[var(--agent-card-height)] overflow-hidden rounded-[24px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
                  {slide.visual}
                </div>
                <div className="mt-[var(--agent-card-block-top)] px-[var(--agent-card-block-inline)]">
                  <h3 className="type-h2 text-[var(--ink)]">{slide.headline}</h3>
                  <p className="type-body tone-secondary mt-4">{withHighlights(slide.description)}</p>
                  {slide.aside ? <Aside className="mt-4">{slide.aside}</Aside> : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-end px-[var(--agent-side-padding)] max-[480px]:justify-center">
        <div className="flex items-center gap-3">
          <div
            className="waldo-carousel-controls flex h-14 w-[200px] items-center justify-center gap-3 rounded-full bg-[var(--surface-t2)] px-4 sm:w-[216px] sm:gap-4"
            aria-label="Agent feature progress"
          >
            {slides.map((slide, index) => {
              const fillWidth = scrollDriven
                ? Math.max(0, Math.min(1, railProgress * slides.length - index))
                : index <= active
                  ? 1
                  : 0;

              return (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  className="focusable-ring flex h-11 w-6 items-center justify-center rounded-full"
                  onClick={() => animateTo(index)}
                >
                  <span
                    className="relative block h-2 shrink-0 overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)] transition-[width,background-color] duration-[250ms] ease-[var(--ease-premium)]"
                    style={{
                      width: index === active ? "var(--active-dot-width)" : "8px",
                      boxShadow: "var(--bar-track-inset)",
                    }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 rounded-[var(--bar-radius)] bg-[var(--bar-fill-ink)]"
                      style={{ width: `${fillWidth * 100}%` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <IconButton aria-label="Previous agent feature" disabled={active === 0} onClick={() => animateTo(active - 1)}>
            <ArrowIcon direction="prev" />
          </IconButton>
          <IconButton
            aria-label="Next agent feature"
            disabled={active === slides.length - 1}
            onClick={() => animateTo(active + 1)}
          >
            <ArrowIcon direction="next" />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
