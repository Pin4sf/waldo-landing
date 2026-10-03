// The one fixture behind "What you see of it" (docs/website/what-you-see-plan.md, sections 17 to 19).
// Every screen in the five cards reads from here, so the five views of the story cannot drift apart.
// The story is one fictional Wednesday and the Thursday morning after it. Every person, company,
// message and number is invented.
//
// Text marks: [label|tool] is a chip with that connector's mark (tool is a file in
// public/assets/connectors); [label] is a chip with no mark.

export const SEE_SECTION = {
  eyebrow: "What you see of it",
  lines: ["Less to sort.", "Still your call."],
  intro: "He connects the dots. You see what matters, ask why, and decide what happens next.",
  /** Read out by assistive tech: the section's people and numbers are samples */
  demoNote: "An illustrative scenario. The names, amounts and readings shown are samples, not your data.",
} as const;

export const SEE_CARDS = [
  // copyCh: how wide the words run on a wide card, chosen per card so each one breaks well
  { id: "overview", name: "Daily brief", headline: "One brief. Always current.", line: "It changes as your day does. How he got there is one tap away.", copyCh: "25ch" },
  { id: "chat", name: "Chat", headline: "Ask once. Keep going.", line: "He brings the context. You bring the next question.", copyCh: "24ch" },
  { id: "health", name: "Plan", headline: "Ask for a plan. Get it handled.", line: "Training, meals, the watch on charge. Your meetings stay put.", copyCh: "25ch" },
  { id: "handoff", name: "To send", headline: "Every reply drafted. Yours to send.", line: "Work and life in one list, most urgent first.", copyCh: "24ch" },
  { id: "catch-up", name: "Overnight", headline: "You slept. He didn’t.", line: "The noise waits. What matters is there when you wake.", copyCh: "24ch" },
] as const;

/** The shared facts. Strings elsewhere are built from these. */
export const FACTS = {
  sleep: "5h 12m",
  deep: "38m",
  bedtime: "1:18am",
  wake: "6:30am",
  recovery: "32%",
  hrv: "38ms",
  hills: "12.4km hills",
  quote: { version: "Quote v4", price: "$48k", seats: "60 seats" },
  deadline: "5pm",
  flat: { right: "402", wrong: "204" },
  order: "SR-2081",
  address: "18 Church Street, Bengaluru",
} as const;

export type Doc = { name: string; tool: string; meta: string };
export type Decision = {
  /** A yes / no question. No chips: what it is about is linked in its details */
  text: string;
  details: { title: string; lines: string[]; docs: Doc[] };
};
export type Step = { time: string; text: string; tool: string };
export type Brief = {
  part: string;
  /** The clock in the status bar */
  clock: string;
  time: string;
  body: string[];
  decisions: Decision[];
  /** The stack behind the brief: what Waldo did to get here, one action each */
  steps: Step[];
};

const DESIGN_REVIEW: Decision = {
  text: "Move Design review to Thursday at 11?",
  details: {
    title: "Design review",
    lines: ["Board prep and Design review both start at 3pm today.", "Thursday at 11 is free for Priya and Leon. Nothing has moved yet."],
    docs: [
      { name: "Design review", tool: "google-calendar", meta: "Today, 3pm" },
      { name: "Empty state v6", tool: "figma", meta: "What the review covers" },
    ],
  },
};
const QUOTE: Decision = {
  text: "Send Dev the final quote?",
  details: {
    title: "Northstar’s quote",
    lines: [`${FACTS.quote.version} is ${FACTS.quote.price} for ${FACTS.quote.seats}. Only the seat cap changed from v3.`, `Dev needs the PDF by ${FACTS.deadline}.`],
    docs: [
      { name: FACTS.quote.version, tool: "google-drive", meta: "PDF, 2 pages" },
      { name: "Northstar renewal", tool: "hubspot", meta: "Deal" },
    ],
  },
};
const ADDRESS: Decision = {
  text: `Correct the delivery to Flat ${FACTS.flat.right}?`,
  details: {
    title: "Soundroom delivery",
    lines: [`Their email says Flat ${FACTS.flat.wrong}. Your order says ${FACTS.flat.right}.`, "The headphones arrive Thursday. The correction is drafted."],
    docs: [
      { name: `Order ${FACTS.order}`, tool: "gmail", meta: "Order confirmation" },
      { name: "Soundroom’s email", tool: "gmail", meta: "Today, 2:48pm" },
    ],
  },
};

/** Card 1: the brief through the day. Each part replaces the last; the stack holds how he got there. */
export const BRIEFS: Brief[] = [
  {
    part: "Morning brief",
    clock: "6:40",
    time: "6:40am",
    body: [`Morning. You’re short on [Sleep|icon:bed], so I’ve kept today light.`, "[Board prep|icon:calendar] and [Design review|icon:calendar] both land at 3pm."],
    decisions: [DESIGN_REVIEW],
    steps: [
      { time: "1:18am", text: "Logged a late bedtime", tool: "apple-health" },
      { time: "3:02am", text: `Noted HRV down to ${FACTS.hrv}`, tool: "whoop" },
      { time: "6:30am", text: `Read last night: ${FACTS.sleep}`, tool: "apple-health" },
      { time: "6:34am", text: "Found the 3pm clash", tool: "google-calendar" },
      { time: "6:38am", text: "Checked Thursday for Priya and Leon", tool: "google-calendar" },
    ],
  },
  {
    part: "Midday update",
    clock: "11:20",
    time: "11:20am",
    body: [`Northstar sent [${FACTS.quote.version}|google-drive]: ${FACTS.quote.price} for ${FACTS.quote.seats}.`, "Checked against v3 [|icon:check] Only the seat cap changed."],
    decisions: [QUOTE, DESIGN_REVIEW],
    steps: [
      { time: "9:12am", text: "Read Northstar’s email", tool: "gmail" },
      { time: "9:15am", text: "Compared v4 with v3", tool: "google-drive" },
      { time: "10:40am", text: "Held Maya’s draft: it promised SSO on Thursday", tool: "slack" },
      { time: "11:05am", text: "Confirmed SSO is Monday in Priya’s plan", tool: "linear" },
    ],
  },
  {
    part: "Afternoon update",
    clock: "2:10",
    time: "2:10pm",
    body: ["[PR #184|github] passes its checks.", "The release waits on one sign-off in [Empty state v6|figma]."],
    decisions: [
      {
        text: "Sign off the sample-workspace button?",
        details: {
          title: "Release v1.8",
          lines: ["The fix is in and green. The empty state still needs your yes before it ships."],
          docs: [
            { name: "PR #184", tool: "github", meta: "Checks passed" },
            { name: "Empty state v6", tool: "figma", meta: "The button" },
            { name: "REL-42", tool: "jira", meta: "Release ticket" },
          ],
        },
      },
      QUOTE,
    ],
    steps: [
      { time: "12:40pm", text: "Watched PR #184’s checks finish", tool: "github" },
      { time: "1:15pm", text: "Matched ONB-73 and ONB-74 to one bug", tool: "linear" },
      { time: "1:50pm", text: "Found what blocks v1.8", tool: "jira" },
    ],
  },
  {
    part: "Afternoon update",
    clock: "4:15",
    time: "4:15pm",
    body: ["Two things before 5pm.", "Dev needs the final quote, and [Soundroom|gmail] has the wrong flat."],
    decisions: [QUOTE, ADDRESS],
    steps: [
      { time: "2:48pm", text: "Read Soundroom’s delivery email", tool: "gmail" },
      { time: "2:50pm", text: `Caught Flat ${FACTS.flat.wrong}; your order says ${FACTS.flat.right}`, tool: "gmail" },
      { time: "3:30pm", text: "Drafted the correction", tool: "gmail" },
      { time: "4:02pm", text: "Ranked what you need to send", tool: "gmail" },
    ],
  },
  {
    part: "Evening wrap",
    clock: "8:30",
    time: "8:30pm",
    body: ["Day’s wrapped. Tomorrow’s [easy 5km|go:run] is set for 7am.", "Lights out by [11:30|icon:moon] gets you back on track."],
    decisions: [
      {
        text: "Keep the 7am easy run?",
        details: {
          title: "Tomorrow’s run",
          lines: [`Recovery is ${FACTS.recovery} after ${FACTS.hills}. An easy 5km fits before your first meeting.`],
          docs: [
            { name: "Thursday plan", tool: "strava", meta: "5km easy" },
            { name: "Recovery", tool: "whoop", meta: FACTS.recovery },
          ],
        },
      },
    ],
    steps: [
      { time: "6:10pm", text: "Read today’s strain", tool: "whoop" },
      { time: "7:45pm", text: "Found a gap at 7am tomorrow", tool: "google-calendar" },
      { time: "8:20pm", text: "Set a wind-down nudge for 11pm", tool: "apple" },
    ],
  },
];

/** Card 4 shows the brief as it stands at 4:15pm */
export const OUTBOX_BRIEF = 3;

export type Outgoing = {
  id: string;
  to: string;
  about: string;
  /** Where it goes out from: the connector, and what the send button says */
  tool: string;
  send: string;
  /** high, soon or later: the list is in this order */
  priority: "high" | "soon" | "later";
  due: string;
  work: boolean;
  draft: string;
  docs: Doc[];
};

/** Card 4 (and the top of it under card 1's brief): what is drafted and waiting to go, most urgent first */
export const OUTBOX = {
  label: "To send",
  note: "Drafted by Waldo. Nothing goes until you say.",
  sent: "Sent",
  items: [
    {
      id: "soundroom",
      to: "Soundroom support",
      about: "Wrong flat on your delivery",
      tool: "gmail",
      send: "Send with Gmail",
      priority: "high",
      due: "Today",
      work: false,
      draft: `Hi, please deliver ${FACTS.order} to Flat ${FACTS.flat.right}, ${FACTS.address}, not Flat ${FACTS.flat.wrong}. Thank you.`,
      docs: [{ name: `Order ${FACTS.order}`, tool: "gmail", meta: "Order confirmation" }],
    },
    {
      id: "dev",
      to: "Dev, Northstar",
      about: "Final quote",
      tool: "gmail",
      send: "Send with Gmail",
      priority: "high",
      due: `By ${FACTS.deadline}`,
      work: true,
      draft: `Hi Dev, attached is ${FACTS.quote.version}: ${FACTS.quote.price} for ${FACTS.quote.seats}, with SSO on Monday. Shout if anything looks off.`,
      docs: [{ name: FACTS.quote.version, tool: "google-drive", meta: "PDF, 2 pages" }],
    },
    {
      id: "mum",
      to: "Mum",
      about: "Birthday wishes",
      tool: "whatsapp",
      send: "Send on WhatsApp",
      priority: "soon",
      due: "Tonight",
      work: false,
      draft: "Happy birthday, Ma. Dinner on Sunday? I’ll book the place you liked.",
      docs: [],
    },
    {
      id: "maya",
      to: "Maya",
      about: "Monday SSO update",
      tool: "slack",
      send: "Send on Slack",
      priority: "soon",
      due: "Tomorrow",
      work: true,
      draft: "Quick one for Northstar: SSO ships Monday. Thursday’s call runs on password login.",
      docs: [{ name: "Priya’s plan", tool: "linear", meta: "SSO on Monday" }],
    },
    {
      id: "landlord",
      to: "Mr. Rao",
      about: "October rent receipt",
      tool: "gmail",
      send: "Send with Gmail",
      priority: "later",
      due: "This week",
      work: false,
      draft: "Hi Mr. Rao, October’s rent went out this morning. The receipt is attached.",
      docs: [{ name: "Rent receipt", tool: "google-drive", meta: "PDF" }],
    },
  ] as Outgoing[],
};

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
      graphic?: "sleep" | "day";
      /** What to do about it, or what he has handled */
      help?: Help[];
      helpLabel?: string;
    };

/** Card 2: an empty chat, a question, and Waldo working it out */
export const CHAT = {
  clock: "9:12",
  time: "9:12 AM",
  untitled: "New chat",
  title: "Flat day, short night",
  pins: [
    { icon: "bed", text: FACTS.sleep, down: true },
    { icon: "moon", text: FACTS.bedtime },
    { icon: "heart", text: `HRV ${FACTS.hrv}`, down: true },
  ] as Pin[],
  turns: [
    { from: "you", text: "Why do I feel so flat today?" },
    {
      from: "waldo",
      work: ["Checked last night against your 7-night baseline", "Read three nights of HRV from WHOOP", "Looked at what kept you up after midnight"],
      lead: `You slept ${FACTS.sleep}, and only ${FACTS.deep} of it was deep. That’s the flat feeling.`,
      graphic: "sleep",
      helpLabel: "What helps today",
      help: [
        { icon: "coffee", text: "One coffee, before 2pm." },
        { icon: "moon", text: "Lights out by 11:30. I’ll nudge you at 11." },
      ],
    },
    { from: "you", text: "Can I still do the 3pm review?" },
    { from: "waldo", lead: "Yes. It’s 40 minutes and you’re not presenting. I’d skip the 5pm walk-and-talk instead." },
  ] as Turn[],
  /** The last seven nights, in minutes by stage; the last one is last night */
  nights: [
    { day: "T", deep: 82, rem: 96, light: 250 },
    { day: "F", deep: 88, rem: 100, light: 236 },
    { day: "S", deep: 92, rem: 104, light: 262 },
    { day: "S", deep: 85, rem: 98, light: 240 },
    { day: "M", deep: 80, rem: 94, light: 246 },
    { day: "T", deep: 76, rem: 90, light: 244 },
    { day: "W", deep: 38, rem: 52, light: 222 },
  ],
};

/** Card 3: Thursday is packed. Asked when and what to train, Waldo plans it and handles the rest */
export const PLAN = {
  clock: "8:55",
  time: "8:55 PM",
  day: "Thursday",
  /** Tomorrow's calendar as the prequel shows it, in hours from midnight */
  /** The week strip above it: Thursday 1 October (2026) is the day shown */
  week: [["M", "28"], ["T", "29"], ["W", "30"], ["T", "1"], ["F", "2"], ["S", "3"], ["S", "4"]].map(([d, n]) => ({ d, n })),
  allDay: "Release week · v1.8",
  events: [
    { from: 8.5, to: 9, name: "Commute", meta: "", tone: "grey" },
    { from: 9, to: 9.5, name: "Standup", meta: "Google Meet", tone: "blue" },
    { from: 9.5, to: 10.5, name: "Northstar walkthrough", meta: "Zoom · Dev, Maya", tone: "orange" },
    { from: 11, to: 11.75, name: "Design review", meta: "Room 4B · Priya, Leon", tone: "blue" },
    { from: 12, to: 13, name: "Hiring panel", meta: "Room 2A · 3 candidates", tone: "purple" },
    { from: 13, to: 14, name: "1:1 with Priya", meta: "Café downstairs", tone: "blue" },
    { from: 14.5, to: 15.5, name: "Board prep", meta: "Deck v7 · Maya", tone: "orange" },
    { from: 16, to: 17, name: "Release check", meta: "#release · Jira REL-42", tone: "purple" },
  ],
  workout: { from: 7, to: 7.67, name: "Easy 5km + mobility" },
  untitled: "New chat",
  title: "Thursday training",
  pins: [
    { icon: "calendar", text: "7 meetings" },
    { logo: "whoop", text: FACTS.recovery },
    { logo: "strava", text: FACTS.hills },
  ] as Pin[],
  turns: [
    { from: "you", text: "When do I train tomorrow, and what?" },
    {
      from: "waldo",
      work: ["Found the gaps in tomorrow’s calendar", "Checked this week’s plan in Garmin", `Read recovery from WHOOP: ${FACTS.recovery}`],
      lead: "7am, 40 minutes. Easy 5km and mobility. Your legs need a break after yesterday’s hills.",
      graphic: "day",
      helpLabel: "Handled",
      help: [
        { icon: "calendar", tool: "google-calendar", text: "Added to your calendar, 7:00 to 7:40" },
        { icon: "chat", tool: "whatsapp", text: "Texted Mrs. Chen: eggs and toast by 8, a light lunch at 12:30" },
        { icon: "watch", text: "Forerunner is at 18%. Charge reminder at 9pm" },
      ],
    },
    { from: "you", text: "Lunch at my desk? I’m in a panel at 12." },
    { from: "waldo", lead: "Sorted. Mrs. Chen will pack it for 11:50, and none of your meetings move." },
  ] as Turn[],
};

/** Card 5: Thursday, 6:30am, the lock screen. What came in overnight is held; what matters is there */
export const OVERNIGHT = {
  time: "6:30",
  date: "Thursday 1 October",
  notes: [
    { id: "brief", when: "now", title: "Morning", text: "7h 05m of sleep, back near your usual. Your 7am run is set." },
    { id: "soundroom", when: "5:58am", title: "Soundroom replied", text: `Flat ${FACTS.flat.right} is confirmed. The headphones arrive today by 6pm.` },
    { id: "held", when: "overnight", title: "Held while you slept", text: "23 messages, 4 emails. Nothing urgent. Sorted for after your run." },
  ],
  ask: "Ask Waldo",
};
