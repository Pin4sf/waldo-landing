// The one fixture behind "What you see of it" (docs/website/what-you-see-plan.md, sections 17 to 23).
// Every screen in the five cards reads from here, so the five views of the story cannot drift apart.
// The story is the hero's Wednesday (components/site/hero-states.ts), told in the same order, and the
// Thursday morning after it. Every person, company, message and number is invented.
//
// Each scene answers three questions: what did he catch, what did he check or prepare, and what still
// needs you. Nothing is shown as sent, moved or approved unless the reader is shown approving it
// (card 3), and nothing appears in the brief before the hour it happened.
//
// Text marks: [label|tool] is a chip with that connector's mark (tool is a file in
// public/assets/connectors); [label|icon:name] a chip with an icon from the set.

export const SEE_SECTION = {
  eyebrow: "What you see of it",
  lines: ["Less to sort.", "Still your call."],
  intro: "He connects the dots. You see what matters, ask why, and decide what happens next.",
  /** Read out by assistive tech: the section's people and numbers are samples */
  demoNote: "An illustrative scenario. The names, amounts and readings shown are samples, not your data.",
} as const;

export const SEE_CARDS = [
  // copyCh: how wide the words run on a wide card, chosen per card so each one breaks well
  { id: "overview", name: "Daily brief", headline: "The loose ends, joined up.", line: "One brief that follows your day. He says what he checked and what’s ready, and asks for a yes or no only on what’s yours to decide.", copyCh: "30ch" },
  { id: "chat", name: "Chat", headline: "Ask why. He has the context.", line: "Ask about any change and he shows his work: what he read, what he compared, and where each fact came from.", copyCh: "30ch" },
  { id: "health", name: "Plan", headline: "A lighter run. For a reason.", line: "Asked what to train, he weighs your sleep, recovery and yesterday’s hills and suggests an easier run. Say yes, and he moves it and sorts lunch.", copyCh: "30ch" },
  { id: "handoff", name: "To send", headline: "Ready isn’t the same as sent.", line: "He catches the wrong promise in a draft, fixes it and holds the reply. You see who it goes to and every word before you send it.", copyCh: "30ch" },
  { id: "catch-up", name: "Overnight", headline: "The day stops. The loose ends don’t.", line: "Overnight he handles what he can. At 6:30 you get one notification: the one thing that needs your yes.", copyCh: "30ch" },
  { id: "patterns", name: "Patterns", headline: "Spots and constellations.", line: "Everything he notices is remembered as a spot. Spots that keep recurring join into a constellation, and each week builds on the last, so what he knows about you compounds.", copyCh: "30ch" },
] as const;

/** The shared facts, all from the hero. Strings elsewhere are built from these. */
export const FACTS = {
  sleep: "5h 12m",
  recovery: "32%",
  hills: "12.4km hills",
  tempo: { name: "8km tempo", at: "6:30am", pace: "4:45/km" },
  easy: { name: "5km easy", at: "7:00am" },
  quote: { version: "Quote v4", price: "$48k", seats: "60 seats" },
  deadline: "5pm",
  flat: { right: "402", wrong: "204" },
  order: "SR-2081",
  address: "18 Church Street, Bengaluru",
} as const;

/** How far along a piece of work is. Green "Done" is kept for work that was approved and finished. */
export type State = "Checked" | "Prepared" | "Needs you" | "Watching" | "Done";

export type Doc = { name: string; tool: string; meta: string };
export type Decision = {
  /** A yes / no question. No chips: what it is about is linked in its details */
  text: string;
  details: { title: string; lines: string[]; docs: Doc[] };
  /** What happens after each answer, said plainly */
  yes: string;
  no: string;
};
export type Step = { time: string; text: string; tool: string; state: State };
/** Work still open that the two decisions on the card are not showing */
export type Open = { text: string; tool: string; state: State };
export type Brief = {
  part: string;
  /** The clock in the status bar */
  clock: string;
  time: string;
  body: string[];
  decisions: Decision[];
  /** The rest of the day's open work, one tap away */
  open: Open[];
  /** The stack behind the brief: what Waldo did since the last part, one action each */
  steps: Step[];
};

const REVIEW: Decision = {
  text: "Move Design review to Thursday at 11?",
  details: {
    title: "The 3pm clash",
    lines: ["Board prep and Design review both start at 3pm today.", "Thursday at 11 is free for Priya and Leon. Nothing has moved."],
    docs: [
      { name: "Design review", tool: "google-calendar", meta: "Today, 3pm · 30 min · Priya, Leon" },
      { name: "Board prep", tool: "google-calendar", meta: "Today, 3pm · 60 min · Anika, Nikhil, Tara" },
    ],
  },
  yes: "Priya and Leon get the new time.",
  no: "Both stay at 3pm.",
};
const QUOTE_V3: Decision = {
  text: "Approve $48k for 60 seats?",
  details: {
    title: "Northstar’s quote",
    lines: ["Quote v3 is $48k for 60 seats. v2 said $46k, without the extra 20 seats.", `Dev needs the final PDF by ${FACTS.deadline}. Nothing has gone to him.`],
    docs: [
      { name: "Quote v3", tool: "google-drive", meta: "PDF · replaces v2" },
      { name: "Northstar renewal", tool: "hubspot", meta: "$48,000 · closes Friday" },
    ],
  },
  yes: "Approved. The replies wait in To send.",
  no: "Held. Nothing goes to Dev.",
};
const BUTTON: Decision = {
  text: "Approve the sample-workspace button?",
  details: {
    title: "Empty state v6",
    lines: ["“Try a sample workspace” leads; import stays second.", "Leon’s demo and the release notes wait on this. Launch target is Thursday, 2pm."],
    docs: [
      { name: "Empty state v6", tool: "figma", meta: "Both buttons, side by side" },
      { name: "REL-42", tool: "jira", meta: "v1.8 · blocked on this" },
    ],
  },
  yes: "Approved. Your note to Priya is in To send.",
  no: "Left open for Priya.",
};
const QUOTE_V4: Decision = {
  text: "Approve Quote v4, $48k for 60 seats?",
  details: {
    title: "Quote v4",
    lines: ["v4 agrees with Priya’s plan: $48k, 60 seats, SSO on Monday.", "It replaces v3 in both replies. Nothing has gone to Dev."],
    docs: [
      { name: "Quote v4", tool: "google-drive", meta: "PDF · uploaded by Leon" },
      { name: "Northstar rollout plan", tool: "notion", meta: "SSO moved to Monday" },
    ],
  },
  yes: "Approved. The replies wait in To send.",
  no: "Held. Nothing goes to Dev.",
};
const TEMPO: Decision = {
  text: "Swap tomorrow’s tempo for 5km easy?",
  details: {
    title: "Tomorrow’s run",
    lines: [`Recovery is ${FACTS.recovery} after yesterday’s 12.4km of hills.`, `The ${FACTS.tempo.name} at 6:30am is still on your plan.`],
    docs: [
      { name: "Thursday plan", tool: "strava", meta: `${FACTS.tempo.name} · ${FACTS.tempo.pace}` },
      { name: "Recovery", tool: "whoop", meta: FACTS.recovery },
    ],
  },
  yes: "Swapped. 5km easy, no pace target.",
  no: "The tempo stays.",
};
const NORTHSTAR: Decision = {
  text: "Approve the quote and Maya’s update?",
  details: {
    title: "Northstar",
    lines: [`${FACTS.quote.version}: ${FACTS.quote.price} for ${FACTS.quote.seats}, SSO Monday.`, "Maya’s update now has Monday SSO and Friday’s kits. Unsent."],
    docs: [
      { name: FACTS.quote.version, tool: "google-drive", meta: "PDF · agrees with the plan" },
      { name: "Reply to Maya", tool: "gmail", meta: "Draft · Northstar renewal thread" },
    ],
  },
  yes: "Approved. Both wait in To send.",
  no: "Held. Nothing goes out.",
};
const ADDRESS: Decision = {
  text: `Correct the delivery to Flat ${FACTS.flat.right}?`,
  details: {
    title: "Soundroom delivery",
    lines: [`Their email says Flat ${FACTS.flat.wrong}. Your order says ${FACTS.flat.right}.`, "The headphones arrive Thursday. The reply is drafted, not sent."],
    docs: [
      { name: `Order ${FACTS.order}`, tool: "gmail", meta: "Your order confirmation" },
      { name: "Soundroom’s email", tool: "gmail", meta: "Today, 6:12pm" },
    ],
  },
  yes: "The correction waits in To send.",
  no: "Left as it is.",
};

const OPEN_REVIEW: Open = { text: "Design review: Thursday at 11 is only a proposal", tool: "google-calendar", state: "Needs you" };
const OPEN_ROHAN: Open = { text: "Rohan: Dadar at 5:50 on Saturday", tool: "whatsapp", state: "Needs you" };
const OPEN_BUTTON: Open = { text: "Empty state v6: the sample-workspace button", tool: "figma", state: "Needs you" };
const OPEN_TEMPO: Open = { text: "Tomorrow: 8km tempo or 5km easy", tool: "strava", state: "Needs you" };

/** Card 1: the brief through the day. Each part replaces the last; the stack holds how he got there. */
export const BRIEFS: Brief[] = [
  {
    part: "Morning brief",
    clock: "6:40",
    time: "6:40am",
    body: [`Morning. [${FACTS.sleep} of sleep|icon:bed] isn’t much to run on.`, "[Board prep|icon:calendar] and [Design review|icon:calendar] both start at 3pm. Nothing has moved."],
    decisions: [REVIEW],
    open: [],
    steps: [
      { time: "1:18am", text: "Logged a late bedtime", tool: "apple-health", state: "Checked" },
      { time: "6:30am", text: `Read last night: ${FACTS.sleep}`, tool: "apple-health", state: "Checked" },
      { time: "6:34am", text: "Found the 3pm clash", tool: "google-calendar", state: "Checked" },
      { time: "6:38am", text: "Found Thursday at 11 free for Priya and Leon", tool: "google-calendar", state: "Prepared" },
    ],
  },
  {
    part: "Midday update",
    clock: "11:20",
    time: "11:20am",
    body: ["Maya and Leon asked the same thing: [Quote v3|google-drive], $48k for 60 seats.", "v2 said $46k. Both replies are drafted. Nothing sent."],
    decisions: [QUOTE_V3, REVIEW],
    open: [OPEN_ROHAN],
    steps: [
      { time: "7:50am", text: "Read Rohan’s new meeting time", tool: "whatsapp", state: "Checked" },
      { time: "9:05am", text: "Read Maya’s question about seats", tool: "gmail", state: "Checked" },
      { time: "9:40am", text: "Joined Leon’s thread to it", tool: "slack", state: "Checked" },
      { time: "10:15am", text: "Compared Quote v2 with v3", tool: "google-drive", state: "Checked" },
      { time: "10:20am", text: "Drafted replies to Maya and Leon", tool: "gmail", state: "Prepared" },
    ],
  },
  {
    part: "Afternoon update",
    clock: "2:10",
    time: "2:10pm",
    body: ["[PR #184|github] passes its checks. [Empty state v6|figma] still needs your yes.", "v1.8 waits on that one button, not on code."],
    decisions: [BUTTON, QUOTE_V3],
    open: [OPEN_REVIEW, OPEN_ROHAN],
    steps: [
      { time: "12:10pm", text: "Matched REL-42 to PR #184", tool: "jira", state: "Checked" },
      { time: "1:15pm", text: "Compared both Empty state buttons", tool: "figma", state: "Checked" },
      { time: "1:45pm", text: "Checked the proposed fix: no new API", tool: "github", state: "Checked" },
      { time: "1:55pm", text: "Drafted your note to Priya", tool: "slack", state: "Prepared" },
    ],
  },
  {
    part: "Afternoon update",
    clock: "4:15",
    time: "4:15pm",
    body: ["Maya’s update promised SSO on Thursday. Priya’s plan says Monday.", "I’ve fixed the draft and matched it to [Quote v4|google-drive]. Nothing sent."],
    decisions: [QUOTE_V4, TEMPO],
    open: [OPEN_BUTTON, OPEN_REVIEW, OPEN_ROHAN],
    steps: [
      { time: "2:40pm", text: "Held Maya’s update: it promised SSO Thursday", tool: "claude", state: "Checked" },
      { time: "3:05pm", text: "Found “SSO next week” in Friday’s call notes", tool: "granola", state: "Checked" },
      { time: "3:20pm", text: "Read Priya’s plan: SSO moved to Monday", tool: "notion", state: "Checked" },
      { time: "3:30pm", text: "Read 32% recovery against tomorrow’s tempo", tool: "whoop", state: "Checked" },
      { time: "3:50pm", text: "Compared Quote v4 with the plan", tool: "google-drive", state: "Checked" },
      { time: "4:05pm", text: "Rewrote Maya’s update", tool: "gmail", state: "Prepared" },
    ],
  },
  {
    part: "Evening update",
    clock: "8:30",
    time: "8:30pm",
    body: [
      "Northstar: [Quote v4|google-drive] is $48k for 60 seats. SSO Monday, kits Friday.",
      "The quote, update and call brief now agree. Nothing sent.",
      `[Soundroom|gmail] has Flat ${FACTS.flat.wrong}. Your order says ${FACTS.flat.right}. The fix is ready.`,
    ],
    decisions: [NORTHSTAR, ADDRESS],
    open: [
      { text: "PR #184: the fix still returns no workspace ID", tool: "github", state: "Needs you" },
      OPEN_BUTTON,
      OPEN_TEMPO,
      OPEN_REVIEW,
      OPEN_ROHAN,
      { text: "Cedar Studio: the $399 retry runs Thursday, 9am", tool: "stripe", state: "Watching" },
      { text: "Northstar’s three kits: one courier delay, now Friday", tool: "shopify", state: "Watching" },
    ],
    steps: [
      { time: "5:10pm", text: "Found Cedar’s retry already set for 9am", tool: "stripe", state: "Watching" },
      { time: "6:12pm", text: `Caught Flat ${FACTS.flat.wrong} on Soundroom’s email`, tool: "gmail", state: "Checked" },
      { time: "6:20pm", text: "Drafted the address correction", tool: "gmail", state: "Prepared" },
      { time: "7:05pm", text: "Grouped three kit orders under one delay", tool: "shopify", state: "Checked" },
      { time: "7:10pm", text: "Added Friday’s kits to Maya’s update", tool: "gmail", state: "Prepared" },
      { time: "7:40pm", text: "Matched ONB-73 and ONB-74 to one missing ID", tool: "linear", state: "Checked" },
    ],
  },
];

/** Card 4 shows the screen as it stands after the evening update */
export const OUTBOX_BRIEF = 4;
export const OUTBOX_CLOCK = "9:10";

export type Version = { from: number; about: string; due: string; draft: string };
export type Outgoing = {
  id: string;
  to: string;
  /** Where it goes out from: the connector, and what the send button says */
  tool: string;
  send: string;
  /** high, soon or later: the list is in this order */
  priority: "high" | "soon" | "later";
  work: boolean;
  /** The draft as it stood after each part of the day (the index into BRIEFS it was drafted or changed at) */
  versions: Version[];
  /** Why it was held, and what changed, when Waldo caught something in it */
  held?: string;
  changed?: string[];
  docs: Doc[];
};

/** Card 4 (and the foot of card 1): what is drafted and waiting, most urgent first. Nothing goes until you send it. */
export const OUTBOX = {
  label: "To send",
  note: "Drafted by Waldo. Nothing goes until you send it.",
  empty: "Nothing drafted yet.",
  items: [
    {
      id: "soundroom",
      to: "Soundroom support",
      tool: "gmail",
      send: "Send with Gmail",
      priority: "high",
      work: false,
      versions: [{ from: 4, about: `Flat ${FACTS.flat.right}, not ${FACTS.flat.wrong}`, due: "Before Thursday", draft: `Hi, please deliver ${FACTS.order} to Flat ${FACTS.flat.right}, ${FACTS.address}, not Flat ${FACTS.flat.wrong}. Thank you.` }],
      docs: [{ name: `Order ${FACTS.order}`, tool: "gmail", meta: "Your order confirmation" }],
    },
    {
      id: "maya",
      to: "Maya Chen, Northstar",
      tool: "gmail",
      send: "Send with Gmail",
      priority: "high",
      work: true,
      versions: [
        { from: 1, about: "60 seats at $48k", due: `By ${FACTS.deadline}`, draft: "Hi Maya, yes: the quote covers 60 seats at $48k. Dev will have the final PDF by 5pm." },
        { from: 3, about: "SSO moves to Monday", due: "Before Thu, 10am", draft: "Hi Maya, SSO is now Monday. Sorry for the delay. Thursday’s review will use password login. Quote v4 is attached." },
        {
          from: 4,
          about: "SSO Monday, kits Friday",
          due: "Before Thu, 10am",
          draft: "Hi Maya, SSO is now Monday. Sorry for the delay. Thursday’s review will use password login and the demo kit; the three kits arrive Friday. I’ve included the 10-minute walkthrough in the brief.",
        },
      ],
      held: "Held · it promised SSO on Thursday",
      changed: ["SSO Monday", "Kits Friday", "Walkthrough added"],
      docs: [
        { name: "Northstar rollout plan", tool: "notion", meta: "SSO moved to Monday · Priya" },
        { name: FACTS.quote.version, tool: "google-drive", meta: "$48k · 60 seats" },
      ],
    },
    {
      id: "dev",
      to: "Dev Rao, Northstar",
      tool: "microsoft-outlook",
      send: "Send with Outlook",
      priority: "high",
      work: true,
      versions: [
        { from: 1, about: "Final quote PDF", due: `By ${FACTS.deadline}`, draft: "Hi Dev, attached is Quote v3: $48k for 60 seats." },
        { from: 3, about: "Final quote PDF, v4", due: `By ${FACTS.deadline}`, draft: "Hi Dev, attached is Quote v4: $48k for 60 seats, with SSO on Monday." },
      ],
      docs: [{ name: FACTS.quote.version, tool: "google-drive", meta: "PDF" }],
    },
    {
      id: "leon",
      to: "Leon, #sales",
      tool: "slack",
      send: "Send on Slack",
      priority: "soon",
      work: true,
      versions: [{ from: 1, about: "Same quote, one answer", due: "Today", draft: "Same question as Maya’s: 60 seats at $48k. I’ll confirm here once it’s approved." }],
      docs: [],
    },
    {
      id: "priya",
      to: "Priya",
      tool: "slack",
      send: "Send on Slack",
      priority: "soon",
      work: true,
      versions: [
        { from: 2, about: "Sample workspace first", due: "Before Thu, 2pm", draft: "Let’s lead with “Try a sample workspace”; import can stay second." },
        { from: 4, about: "Sample workspace, and the ID", due: "Before Thu, 2pm", draft: "Let’s lead with “Try a sample workspace”. The fix still needs createSampleWorkspace() to return the workspace ID." },
      ],
      docs: [{ name: "Empty state v6", tool: "figma", meta: "The button" }],
    },
    {
      id: "rohan",
      to: "Rohan",
      tool: "whatsapp",
      send: "Send on WhatsApp",
      priority: "later",
      work: false,
      versions: [{ from: 1, about: "Dadar at 5:50, Saturday", due: "Saturday", draft: "Dadar at 5:50 works. The coffee is non-negotiable." }],
      docs: [],
    },
  ] as Outgoing[],
};

/** What the "To send" list holds after a given part of the day: only what had been drafted by then */
export function outboxAt(part: number) {
  return OUTBOX.items.flatMap((item) => {
    const version = [...item.versions].reverse().find((v) => v.from <= part);
    return version ? [{ ...item, ...version }] : [];
  });
}

export type Pin = { icon?: "bed" | "moon" | "heart" | "calendar"; logo?: string; text: string; down?: boolean };
export type Help = { icon: "coffee" | "moon" | "calendar" | "chat" | "watch"; tool?: string; text: string };
export type Turn =
  | { from: "you"; text: string }
  | {
      from: "waldo";
      /** What he looks through, at the same time, before answering */
      work?: string[];
      /** The short answer */
      lead: string;
      /** Which graphic follows the answer, if any */
      graphic?: "evidence" | "swap";
      /** A line after the graphic */
      more?: string;
      /** What he has prepared, or done once you said so */
      help?: Help[];
      helpState?: State;
    };

/** Card 2: after the evening update, the reader asks why Maya's update changed */
export const CHAT = {
  clock: "8:41",
  time: "8:41 PM",
  untitled: "New chat",
  title: "Maya’s update",
  pins: [
    { logo: "gmail", text: "Draft · unsent" },
    { icon: "calendar", text: "Call Thu, 10am" },
    { logo: "hubspot", text: "$48k renewal" },
  ] as Pin[],
  turns: [
    { from: "you", text: "Why did you change Maya’s update?" },
    {
      from: "waldo",
      work: ["Read Priya’s rollout plan", "Compared Quote v4", "Checked the kit orders"],
      lead: "It promised SSO on Thursday. Priya’s plan says Monday.",
      graphic: "evidence",
      more: "So I fixed the date, kept password login for Thursday and added Friday’s kits. Still unsent.",
    },
    { from: "you", text: "What does Thursday’s call use, then?" },
    { from: "waldo", lead: "Password login and the demo kit. The 10-minute walkthrough is in the call brief, so you’re not piecing it together at 9:59." },
  ] as Turn[],
  /** The answer's evidence: what changed, and where each fact comes from */
  change: { was: "SSO live Thursday", now: "SSO Monday" },
  evidence: [
    { tool: "notion", name: "Priya’s rollout plan", value: "SSO Monday" },
    { tool: "google-drive", name: "Quote v4", value: "$48k · 60 seats" },
    { tool: "shopify", name: "Kit orders #1041–1043", value: "Friday delivery" },
  ],
};

/** Card 3: Thursday is packed. Asked when and what to train, Waldo proposes a lighter run; you say yes, and he handles the rest */
export const PLAN = {
  clock: "8:55",
  time: "8:55 PM",
  day: "Thursday",
  /** The week strip above it: Thursday 1 October (2026) is the day shown */
  week: [["M", "28"], ["T", "29"], ["W", "30"], ["T", "1"], ["F", "2"], ["S", "3"], ["S", "4"]].map(([d, n]) => ({ d, n })),
  allDay: "Release week · v1.8",
  /** Tomorrow's calendar, in hours from midnight. 8:30 to 9:30 is free, as the hero says. */
  events: [
    { from: 6.5, to: 7.25, name: FACTS.tempo.name, meta: `Training plan · ${FACTS.tempo.pace}`, tone: "green" },
    { from: 9.5, to: 10, name: "Standup", meta: "Google Meet", tone: "blue" },
    { from: 10, to: 10.5, name: "Northstar onboarding review", meta: "Zoom · Maya, Dev", tone: "orange" },
    { from: 11, to: 11.5, name: "Design review", meta: "Proposed · not booked", tone: "proposed" },
    { from: 12, to: 13, name: "Hiring panel", meta: "Room 2A · 3 candidates", tone: "purple" },
    { from: 13.25, to: 13.75, name: "1:1 with Priya", meta: "Café downstairs", tone: "blue" },
    { from: 14, to: 14.5, name: "v1.8 launch", meta: "#release · REL-42", tone: "purple" },
  ],
  workout: { from: 7, to: 7.67 },
  untitled: "New chat",
  title: "Thursday’s run",
  pins: [
    { icon: "bed", text: FACTS.sleep },
    { logo: "whoop", text: FACTS.recovery },
    { logo: "strava", text: FACTS.hills },
  ] as Pin[],
  /** The comparison in the first answer */
  swap: {
    scheduled: { name: FACTS.tempo.name, when: FACTS.tempo.at, detail: `${FACTS.tempo.pace} target` },
    proposed: { name: FACTS.easy.name, when: FACTS.easy.at, detail: "No pace target" },
    note: "No meeting moves.",
  },
  turns: [
    { from: "you", text: "When do I train tomorrow, and what?" },
    {
      from: "waldo",
      work: ["Read tomorrow’s plan: 8km tempo at 6:30", `Read recovery from WHOOP: ${FACTS.recovery}`, "Found the gaps in tomorrow’s calendar"],
      lead: "5km easy at 7, not the 8km tempo. Yesterday’s hills and 32% recovery say go gentle.",
      graphic: "swap",
      helpState: "Prepared",
      help: [
        { icon: "calendar", tool: "google-calendar", text: "Move the run to 7:00–7:40 in your calendar" },
        { icon: "chat", tool: "whatsapp", text: "Text Mrs. Chen: eggs and toast by 8, lunch at 12:30" },
        { icon: "watch", text: "Forerunner is at 18%. A charge reminder at 9pm" },
      ],
    },
    { from: "you", text: "Do it. Lunch at my desk, though? I’m on a panel at 12." },
    { from: "waldo", lead: "Done. The run’s at 7, Mrs. Chen packs lunch for 11:50, and none of your meetings move." },
  ] as Turn[],
};

/**
  Card 5: Thursday, 6:30am, the lock screen. One notification, and it is the only one: the thing that is
  his to decide. Nothing about what Waldo did or is watching, on purpose; the line under it says so.
*/
export const OVERNIGHT = {
  time: "6:30",
  date: "Thursday 1 October",
  note: { state: "Needs you", title: "Soundroom", text: `The Flat ${FACTS.flat.right} correction is drafted. It waits for your yes.` } as { state: State; title: string; text: string },
  quiet: { line: "Nothing else needs you.", reason: "He only asks about what’s yours to decide." },
};

/**
  Card 6: Spots and Constellations, played as a short film (patterns.tsx). A Spot is one small thing he
  noticed; a Constellation is several spots that keep turning up, joined into a pattern. The picture is
  Suyash's constellation map. The film shows memory compounding: spots arrive week by week, join into the
  Tuesday Crash, then more patterns form, each easier to see than the last. The week, and how many spots
  make the pattern being looked at, change with each step. All of it is sample data.
*/
export type PatternKind = "constellation" | "spot";
export type PatternNode = { id: string; kind: PatternKind; label: string; text: string; /** a one-word name, for the small chips under the map */ short?: string };
export type PatternStep = {
  /** Which spots have arrived by this step, and whether the pattern in the middle and the others have formed */
  spots: string[];
  centre: boolean;
  others: boolean;
  /** The week the film has got to */
  week: number;
  caption: { kind: string; title: string; text: string };
  /** When a constellation is the subject: how many spots make it, over how many weeks */
  detail?: { id: string; count: number; weeks: number };
};
export const PATTERNS = {
  clock: "7:05",
  title: "Spots and constellations",
  home: "crash",
  words: { week: "Week", spots: "spots", spot: "spot", weeks: "weeks", inThis: "in this pattern", over: "over" },
  nodes: [
    { id: "crash", kind: "constellation", label: "Tuesday Crash", text: "Stress shoots up, sleep and HRV dip, caffeine rises and Form crashes. Seen on Tuesdays for 6 weeks." },
    { id: "stress", kind: "spot", short: "Stress", label: "Stress shot up", text: "Stress climbed well above your usual after the back-to-back meetings." },
    { id: "sleep", kind: "spot", short: "Sleep", label: "Sleep Compromised", text: "A short night: about 5 hours, light and broken." },
    { id: "caffeine", kind: "spot", short: "Caffeine", label: "Excess Caffeine", text: "Three coffees before noon, on a short night." },
    { id: "form", kind: "spot", short: "Form", label: "Form Crash", text: "Form fell from the morning to the afternoon." },
    { id: "hrv", kind: "spot", short: "HRV", label: "HRV Dipped", text: "HRV sat below your baseline overnight." },
    { id: "weight", kind: "spot", short: "Weight", label: "Weight Intensified", text: "A heavier day: more meetings, and a harder run the day before." },
    { id: "load", kind: "spot", short: "Load", label: "Load Collapsed", text: "Strain stayed high while recovery fell, so the day cost more than it gave back." },
    { id: "cognitive", kind: "constellation", label: "Cognitive Stress", text: "Stress and focus move together when a day stacks up." },
    { id: "pattern", kind: "constellation", label: "Sleep Pattern", text: "Bedtime and sleep length, week to week." },
    { id: "meals", kind: "constellation", label: "Meals", text: "How skipped and late meals line up with your afternoons." },
    { id: "flow", kind: "constellation", label: "Work Flow", text: "When your best hours for focus actually fall." },
    { id: "training", kind: "constellation", label: "Training Style", text: "How hard sessions and recovery trade off." },
  ] as PatternNode[],
  /** Who is joined to whom: the Tuesday Crash to its seven spots */
  links: [
    ["crash", "stress"], ["crash", "sleep"], ["crash", "caffeine"], ["crash", "form"], ["crash", "hrv"], ["crash", "weight"], ["crash", "load"],
  ] as [string, string][],
  steps: [
    { spots: [], centre: false, others: false, week: 1, caption: { kind: "Memory", title: "He notices small things.", text: "Each one is saved as a spot, with the week it happened." } },
    { spots: ["sleep"], centre: false, others: false, week: 1, caption: { kind: "Spot", title: "Sleep Compromised", text: "A short night, about 5 hours." } },
    { spots: ["sleep", "hrv"], centre: false, others: false, week: 2, caption: { kind: "Spot", title: "HRV Dipped", text: "Below your baseline again." } },
    { spots: ["sleep", "hrv", "stress", "caffeine"], centre: false, others: false, week: 3, caption: { kind: "Spots", title: "Stress shot up, Excess Caffeine", text: "The same day of the week, again." } },
    { spots: ["sleep", "hrv", "stress", "caffeine", "form", "weight"], centre: false, others: false, week: 4, caption: { kind: "Spots", title: "Form Crash, Weight Intensified", text: "And again. Something is repeating." } },
    { spots: ["sleep", "hrv", "stress", "caffeine", "form", "weight", "load"], centre: true, others: false, week: 6, caption: { kind: "Constellation", title: "Tuesday Crash", text: "Seven spots keep turning up together, so he joins them into one pattern." }, detail: { id: "crash", count: 7, weeks: 6 } },
    { spots: ["sleep", "hrv", "stress", "caffeine", "form", "weight", "load"], centre: true, others: true, week: 10, caption: { kind: "Constellations", title: "More patterns form", text: "Each one builds on what he already knows, so each takes fewer weeks to see." }, detail: { id: "crash", count: 7, weeks: 6 } },
    { spots: ["sleep", "hrv", "stress", "caffeine", "form", "weight", "load"], centre: true, others: true, week: 16, caption: { kind: "Constellation", title: "Training Style", text: "Each pattern makes the next one easier to see." }, detail: { id: "training", count: 32, weeks: 16 } },
    { spots: ["sleep", "hrv", "stress", "caffeine", "form", "weight", "load"], centre: true, others: true, week: 16, caption: { kind: "Memory", title: "The longer he runs, the more he knows", text: "77 spots in 6 patterns, and counting. All of it remembered for you." }, detail: { id: "crash", count: 7, weeks: 6 } },
  ] as PatternStep[],
};
