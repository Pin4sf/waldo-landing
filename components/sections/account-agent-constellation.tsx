import Image from "next/image";
import type { CSSProperties } from "react";

type ConstellationNode = {
  label: string;
  detail: string;
  icon?: string;
  initials?: string;
  style: CSSProperties;
};

const signalNodes: ConstellationNode[] = [
  { label: "Apple Health", detail: "recovery read", initials: "AH", style: { left: "4%", top: "14%" } },
  { label: "Gmail", detail: "2 need you", icon: "/assets/composio-connectors/gmail.svg", style: { left: "4%", top: "42%" } },
  { label: "Slack", detail: "batch the rest", icon: "/assets/composio-connectors/slack.svg", style: { left: "4%", top: "70%" } },
  { label: "Calendar", detail: "review can move", icon: "/assets/composio-connectors/googlecalendar.svg", style: { left: "26%", top: "10%" } },
  { label: "Linear", detail: "deck task", icon: "/assets/composio-connectors/linear.svg", style: { left: "26%", top: "38%" } },
  { label: "Drive", detail: "source docs", icon: "/assets/composio-connectors/googledrive.svg", style: { left: "26%", top: "66%" } },
  { label: "Todoist", detail: "task created", initials: "TD", style: { left: "48%", top: "72%" } },
];

const agentNodes: ConstellationNode[] = [
  { label: "Research agent", detail: "brief returned", initials: "RA", style: { left: "76%", top: "14%" } },
  { label: "Scheduling agent", detail: "meeting moved", initials: "SA", style: { left: "76%", top: "36%" } },
  { label: "Writing agent", detail: "draft waiting", initials: "WA", style: { left: "76%", top: "58%" } },
  { label: "Ops agent", detail: "task created", initials: "OA", style: { left: "76%", top: "80%" } },
];

const mobileLanes = [
  ["Signals", "Apple Health", "Calendar", "Gmail", "Slack"],
  ["Waldo read", "rough morning", "2 threads", "sharp window"],
  ["Agents/tools", "Research agent", "Scheduling agent", "Linear"],
  ["Receipts", "brief returned", "meeting moved", "draft waiting"],
] as const;

function MiniIcon({ node }: { node: Pick<ConstellationNode, "icon" | "initials" | "label"> }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-[var(--border-default)] bg-[var(--surface-t1)]">
      {node.icon ? (
        <Image src={node.icon} alt="" width={22} height={22} className="h-auto w-auto max-w-[70%]" />
      ) : (
        <span className="type-caption text-[var(--ink)]">{node.initials}</span>
      )}
    </span>
  );
}

function FloatingNode({ node }: { node: ConstellationNode }) {
  return (
    <div className="waldo-constellation-node absolute z-20 flex w-[148px] items-center gap-2.5 rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-2.5" style={node.style}>
      <MiniIcon node={node} />
      <div className="min-w-0">
        <p className="type-caption truncate text-[var(--ink)]">{node.label}</p>
        <p className="type-caption mt-1 truncate text-[var(--text-tertiary)]">{node.detail}</p>
      </div>
    </div>
  );
}

export function AccountAgentConstellation() {
  return (
    <div className="waldo-constellation-visual relative h-full overflow-hidden rounded-[8px] bg-[var(--surface-t1)] p-4 sm:p-5">
      <div className="hidden h-full sm:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 764 450" fill="none" aria-hidden>
          <path className="waldo-tool-path" d="M98 120 C210 122 292 162 380 222" />
          <path className="waldo-tool-path" d="M132 282 C226 252 300 238 380 225" style={{ animationDelay: "220ms" }} />
          <path className="waldo-tool-path" d="M306 70 C354 116 374 164 393 218" style={{ animationDelay: "440ms" }} />
          <path className="waldo-tool-path" d="M310 355 C350 310 374 272 396 232" style={{ animationDelay: "660ms" }} />
          <path className="waldo-tool-path" d="M454 224 C520 176 594 154 706 160" style={{ animationDelay: "880ms" }} />
          <path className="waldo-tool-path" d="M454 226 C530 232 610 260 706 280" style={{ animationDelay: "1100ms" }} />
          <path className="waldo-tool-path" d="M454 230 C534 300 606 340 712 366" style={{ animationDelay: "1320ms" }} />
        </svg>

        {signalNodes.map((node) => <FloatingNode key={node.label} node={node} />)}
        {agentNodes.map((node) => <FloatingNode key={node.label} node={node} />)}

        <div className="waldo-constellation-core absolute left-1/2 top-1/2 z-30 w-[184px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--ink)] text-[var(--surface-t2)]">
            <span className="type-label">W</span>
          </div>
          <p className="type-label mt-3 text-[var(--ink)]">Waldo</p>
          <p className="type-caption mt-1 text-[var(--text-tertiary)]">human context</p>
        </div>
      </div>

      <div className="grid h-full content-between gap-3 sm:hidden">
        {mobileLanes.map(([label, ...items]) => (
          <div key={label} className="rounded-[14px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3">
            <p className="type-caption text-[var(--text-tertiary)]">{label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="type-caption rounded-full bg-[var(--surface-t1)] px-3 py-1.5 text-[var(--ink)]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
