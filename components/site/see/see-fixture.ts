// The one fixture behind "What you see of it" (see docs/website/what-you-see-plan.md). Every screen
// in the five cards reads from here, so the five views of the story cannot drift apart. The story is
// the hero's fictional Wednesday (components/site/hero-states.ts), shown after its later signals and
// before the 5pm quote deadline. No exact snapshot time and no timed quiet-hours interval are shown:
// the quiet period is illustrative, not a hero event or a shipped setting. Nothing here is sent,
// approved, moved or done; every name, amount and reading is invented.

export const SEE_SECTION = {
  eyebrow: "What you see of it",
  lines: ["Less to sort.", "Still your call."],
  intro: "He connects the dots. You see what matters, ask why, and decide what happens next.",
  /** Read out by assistive tech: the section's people and numbers are samples */
  demoNote: "An illustrative scenario. The names, amounts, readings and quiet hours shown are samples, not your data.",
} as const;

export const SEE_CARDS = [
  // copyCh: how wide the words run on a wide card, chosen per card so each one breaks well
  { id: "overview", name: "Overview", headline: "Your day. Already untangled.", line: "The clash, the quote, the wrong address. One place to pick up.", copyCh: "26ch" },
  { id: "chat", name: "Chat", headline: "Ask once. Keep going.", line: "He brings the context. You bring the next question.", copyCh: "24ch" },
  { id: "health", name: "Health logic", headline: "A suggestion. With its reasons.", line: "Sleep, recovery and yesterday’s run, before tomorrow’s plan.", copyCh: "26ch" },
  { id: "handoff", name: "Permission handoff", headline: "Ready. When you say so.", line: "The reply is drafted. The decision is still yours.", copyCh: "24ch" },
  { id: "catch-up", name: "Quiet-hours catch-up", headline: "Quiet hours. Nothing lost.", line: "What he checked, what he held, and what needs you next.", copyCh: "26ch" },
] as const;

/** The shared facts. Strings elsewhere are built from these. */
export const FACTS = {
  sleep: "5h 12m",
  bedtime: "1:18am",
  wake: "6:30am",
  recovery: "32%",
  hills: "12.4km hills",
  quote: { version: "Quote v4", price: "$48k", seats: "60 seats" },
  deadline: "5pm",
  sso: "Monday",
  flat: { right: "402", wrong: "204" },
  order: "SR-2081",
  address: "18 Church Street, Bengaluru",
  kits: ["#1041", "#1042", "#1043"],
} as const;

const quote = `${FACTS.quote.version}, ${FACTS.quote.price} / ${FACTS.quote.seats.replace(" seats", "")} seats`;

/** The three things that need the reader, in the same order on card 1 and card 5 */
export type ItemId = "northstar" | "update" | "soundroom";

export const OVERVIEW = {
  greeting: "Afternoon. Here’s where things stand.",
  summary:
    "Quote v4 is $48k for 60 seats. Maya’s draft covers Monday SSO and Friday kits, with the demo kit for Thursday. Soundroom’s address still needs your check. Nothing sent.",
  needsYou: "Needs you",
  needs: [
    { id: "northstar" as ItemId, who: "Northstar", what: `Review ${quote}`, status: "Before 5pm" },
    { id: "update" as ItemId, who: "Maya’s update", what: "Monday SSO, Friday kits", status: "Draft held" },
    { id: "soundroom" as ItemId, who: "Soundroom", what: "Flat 204 or 402?", status: "Confirm address" },
  ],
  quiet: [
    { who: "Design review", what: "Thursday 11am proposal still unsent" },
    { who: "Tomorrow’s run", what: "5km easy option prepared · Plan unchanged" },
  ],
} as const;

/** What opens when an item is chosen on card 1 or card 5: the facts behind it, nothing new */
export const ITEM_DETAIL: Record<ItemId, { title: string; lines: string[]; status: string }> = {
  northstar: {
    title: "Northstar",
    lines: [
      "Quote v4 replaces v3: $48k for 60 seats, Monday SSO, Thursday walkthrough.",
      "Dev needs the final PDF by 5. The price is not approved; nothing has gone to Maya or Dev.",
    ],
    status: "Waiting on you",
  },
  update: {
    title: "Maya’s update",
    lines: [
      "The draft follows Priya’s plan: Monday SSO, password login for Thursday’s 10am call, and Friday kit delivery with the demo kit for Thursday.",
      "It is held. Nothing sent.",
    ],
    status: "Draft held",
  },
  soundroom: {
    title: "Soundroom",
    lines: [
      "Their email says Flat 204. Your order says Flat 402, 18 Church Street, Bengaluru. The headphones arrive Thursday.",
      "The correction is drafted. Nothing sent.",
    ],
    status: "Confirm address",
  },
};

/** Card 2: Suyash's own drawing of the chat (public/assets/home/chat-form.svg), and the thread that opens
    from its replies button (the round message icon with the 7). The drawing's words are Suyash's. */
export const CHAT = {
  asset: "/assets/home/chat-form.svg",
  alt: "A chat with Waldo. Asked “Why do I feel inactive today?”, he answers that deep sleep ran short and that Recovery is sitting at 61 because of it.",
  replies: 7,
  openLabel: "Open the 7 replies in this thread",
  closeLabel: "Close the thread",
  backLabel: "Back to the chat",
  threadLabel: "The thread that opens from the replies",
  thread: [
    { from: "waldo", lead: true, text: "Deep sleep ran short, Recovery is sitting at 61 because of it." },
    { from: "person", text: "But I did sleep for around 8 hours" },
    {
      from: "waldo",
      text: "You did - 8h 2m in bed. But you were asleep for 6h 40m, and only 38 minutes of that was deep. Time isn’t the number that matters. Depth is.",
    },
    { from: "person", text: "so the 8 hours basically lied to me?" },
    { from: "waldo", text: "The clock did. Your body didn’t. That’s the gap sleep apps miss - they count hours," },
  ],
} as const;

export const HEALTH = {
  // The three scores, side by side (0 to 100). Recovery is WHOOP's reading; Form and Weight are the
  // two other lenses. Weight runs the other way: a lower number is a lighter day.
  gauges: [
    { id: "form", name: "Form", value: 46, zone: "Flagging", tone: "orange" },
    { id: "recovery", name: "Recovery", value: 32, zone: "Depleted", tone: "red" },
    { id: "weight", name: "Weight", value: 38, zone: "Light day", tone: "green" },
  ],
  label: "Suggested for tomorrow",
  distance: "5 km",
  effort: "Easy",
  option: "No pace target",
  summary:
    "Short sleep. A low recovery reading. Hills yesterday. That’s why I prepared an easy option, not why I changed your run.",
  reasonsLabel: "Why this one",
  evidence: [
    { name: "Sleep", value: "5h 12m", source: "Garmin" },
    { name: "Recovery", value: "32%", source: "WHOOP" },
    { name: "Previous run", value: "12.4km hills", source: "Strava" },
  ],
} as const;

export const HANDOFF = {
  title: "Soundroom delivery",
  waldo:
    "Their email says Flat 204. Your order says 402. I’ve drafted the correction. Confirm the address before this goes out.",
  to: "Soundroom support",
  subject: "SR-2081: delivery address",
  status: "Draft only",
  draft:
    "Hi, please deliver SR-2081 to Flat 402, 18 Church Street, Bengaluru, not Flat 204. Please confirm the corrected delivery address.",
  question: "Is Flat 402 correct, and do you want to send this exact reply to Soundroom?",
  placeholder: "Confirm or edit the draft",
  edited: [
    { from: "person", text: "402 is right. Let me read the draft once more." },
    { from: "waldo", text: "The draft is still here. Nothing sent." },
  ],
} as const;

export const CATCH_UP = {
  label: "After quiet hours",
  headline: "Back? Here’s what needs you.",
  recap:
    "Ready when you are: Quote v4, Maya’s Monday-SSO and Friday-kit update, and the Soundroom address reply. All held for your review. Dev needs the final PDF by 5.",
  prompt: "What do you want to review first?",
  choices: [
    { id: "northstar" as ItemId | "run", text: "Northstar’s Quote v4, $48k / 60 seats" },
    { id: "update" as ItemId | "run", text: "Maya’s Monday SSO / Friday kits update" },
    { id: "soundroom" as ItemId | "run", text: "Soundroom’s address correction" },
    { id: "run" as ItemId | "run", text: "Tomorrow’s 5km easy option" },
  ],
  placeholder: "Something else? Tell me.",
  status: "Choosing an item opens it. It doesn’t approve or send it.",
  calendar: "Calendar",
  calendarRows: [
    { time: "3pm", what: "Board prep" },
    { time: "3pm", what: "Design review" },
  ],
} as const;

/** The run, which card 1 and card 5 both carry */
export const RUN_DETAIL = {
  title: "Tomorrow’s run",
  lines: [
    "The 8km tempo is still on the plan. I’ve prepared a 5km easy option beside it, with no pace target.",
    "Your training plan is unchanged.",
  ],
  status: "Plan unchanged",
};
