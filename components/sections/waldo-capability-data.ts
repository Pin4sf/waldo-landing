export type WaldoCapabilityState = "recovery" | "form" | "weight" | "delegation";

export type WaldoArtifact = {
  label: string;
  value: string;
  read: string;
  source: "health" | "calendar" | "inbox" | "task" | "account" | "agent";
  icon?: string;
};

export type WaldoActionReceipt = {
  time: string;
  action: string;
  detail: string;
  requiresApproval?: boolean;
};

export type WaldoHeroState = {
  key: WaldoCapabilityState;
  status: string;
  headlineReceipt: string;
  inputs: WaldoArtifact[];
  reads: WaldoArtifact[];
  outputs: WaldoActionReceipt[];
};

export const waldoHeroStates: WaldoHeroState[] = [
  {
    key: "recovery",
    status: "Waldo is reading recovery",
    headlineReceipt: "Moved the 9am review to 10:30.",
    inputs: [
      { label: "Sleep", value: "5h 42m", read: "short night", source: "health" },
      { label: "HRV", value: "38ms", read: "below baseline", source: "health" },
      { label: "Calendar", value: "9am review", read: "can move", source: "calendar", icon: "/assets/composio-connectors/googlecalendar.svg" },
    ],
    reads: [
      { label: "Recovery", value: "63", read: "rough morning", source: "health" },
    ],
    outputs: [
      { time: "6:14am", action: "Moved review", detail: "9am product strategy review moved to 10:30" },
      { time: "6:15am", action: "Drafted note", detail: "Gmail draft waiting for approval", requiresApproval: true },
      { time: "6:16am", action: "Set status", detail: "Slack focus status queued" },
    ],
  },
  {
    key: "form",
    status: "Waldo is protecting focus",
    headlineReceipt: "Held your sharpest window clear.",
    inputs: [
      { label: "Form", value: "76", read: "steady enough", source: "health" },
      { label: "Circadian", value: "10:30-12", read: "best window", source: "health" },
      { label: "Linear", value: "deck task", read: "needs sharp work", source: "task", icon: "/assets/composio-connectors/linear.svg" },
    ],
    reads: [
      { label: "Focus", value: "10:30", read: "protect this", source: "calendar" },
    ],
    outputs: [
      { time: "8:03am", action: "Blocked focus", detail: "10:30-12 held for deck review" },
      { time: "8:04am", action: "Pulled context", detail: "Linear ticket and prior notes attached" },
    ],
  },
  {
    key: "weight",
    status: "Waldo is lowering the load",
    headlineReceipt: "Two things need you, not one hundred and eight.",
    inputs: [
      { label: "Inbox", value: "104", read: "2 need you", source: "inbox", icon: "/assets/composio-connectors/gmail.svg" },
      { label: "Meetings", value: "6", read: "stacked", source: "calendar", icon: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Slack", value: "late threads", read: "batch the rest", source: "inbox", icon: "/assets/composio-connectors/slack.svg" },
    ],
    reads: [
      { label: "Signal pressure", value: "high", read: "day is heavy", source: "health" },
    ],
    outputs: [
      { time: "8:11am", action: "Archived noise", detail: "Newsletters batched for later" },
      { time: "8:12am", action: "Created tasks", detail: "Two real follow-ups sent to Todoist" },
    ],
  },
  {
    key: "delegation",
    status: "Waldo is coordinating agents",
    headlineReceipt: "Asked the research agent for the missing brief.",
    inputs: [
      { label: "Brief", value: "missing", read: "needs research", source: "agent" },
      { label: "Drive", value: "Q4 docs", read: "source material", source: "account", icon: "/assets/composio-connectors/googledrive.svg" },
      { label: "Calendar", value: "3pm review", read: "deadline", source: "calendar", icon: "/assets/composio-connectors/googlecalendar.svg" },
    ],
    reads: [
      { label: "Agent handoff", value: "ready", read: "scope bounded", source: "agent" },
    ],
    outputs: [
      { time: "9:32am", action: "Brief requested", detail: "Research agent asked for three missing points" },
      { time: "9:36am", action: "Draft returned", detail: "Summary waiting in Drive", requiresApproval: true },
    ],
  },
];

export const waldoHeroReceipts: WaldoActionReceipt[] = waldoHeroStates.flatMap((state) => state.outputs);

const waldoReceiptTrail: WaldoActionReceipt[] = [
  { time: "6:12am", action: "health read", detail: "Recovery 63 turned the first review into a later start" },
  { time: "6:14am", action: "calendar move", detail: "Product strategy review moved to 10:30" },
  { time: "8:12am", action: "task created", detail: "Two real follow-ups sent to Todoist" },
  { time: "8:18am", action: "draft waiting", detail: "Gmail follow-up held for your approval", requiresApproval: true },
  { time: "9:32am", action: "agent handoff", detail: "Research agent asked for the missing three points" },
  { time: "4:44pm", action: "undo learned", detail: "Waldo remembered that weekly syncs should not move" },
];

export const waldoLiveReceipts: WaldoActionReceipt[] = [...waldoHeroReceipts, ...waldoReceiptTrail];
