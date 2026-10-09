// The jobs and their days for Connectors' "Pick your job. The tools follow." (put-to-work.tsx), after Claude's
// "Put Claude to work" (claude.com/product/overview). Each job has three moments in a day. A moment is what Waldo
// was asked once (or what he noticed on his own), the steps he took across your tools, and the result, shown in the
// app it landed in. In `body`, [[Tool]] marks a tool's name (underlined, and lit in the dock).
//
// The routines from the old professions table are kept word for word as titles where they fit. Everything in the
// pictures (names, times, numbers) is illustrative. Mail is only ever metadata: who, when, how much, never the words.

export type Trigger = { kind: "ask"; text: string } | { kind: "noticed"; tool: string; text: string };

export type Result =
  | { app: "calendar"; tool: string; title: string; rows: { time: string; label: string; mark?: "new" | "moved" | "kept"; note?: string }[] }
  | { app: "doc"; tool: string; title: string; meta?: string; blocks: { tool?: string; text: string }[]; foot?: string }
  | { app: "chat"; tool: string; title: string; messages: string[] }
  | { app: "list"; tool: string; title: string; meta?: string; rows: { label: string; value?: string; strong?: boolean; dim?: boolean }[] };

export type Moment = {
  time: string;
  title: string;
  body: string;
  trigger: Trigger;
  thinking: string;
  steps: { tool: string; text: string }[];
  result: Result;
};

export type Job = { id: string; name: string; tagline: string; moments: [Moment, Moment, Moment] };

export const JOBS: Job[] = [
  {
    id: "founders",
    name: "Founders",
    tagline: "Run the company, not your calendar.",
    moments: [
      {
        time: "7:30 AM",
        title: "Start the day you actually have",
        body: "Waldo reads last night from [[Apple Watch]], weighs it against today in [[Google Calendar]], and moves what can move before you're up. Board prep stays put.",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Slept 5h 12m. Heart rate variability is 12% below your usual." },
        thinking: "Checking what can move without anyone waiting",
        steps: [
          { tool: "Google Calendar", text: "Read today: 4 calls before noon" },
          { tool: "Google Calendar", text: "Moved the 9:00 hiring sync to Thursday" },
          { tool: "Telegram", text: "Sent you the plan at 7:30" },
        ],
        result: {
          app: "chat",
          tool: "Telegram",
          title: "Waldo",
          messages: ["Short night. The hiring sync is on Thursday now, and your first call is at 10.", "Board prep stays at 2. Lunch is protected."],
        },
      },
      {
        time: "12:00 PM",
        title: "Keep the investor call clear",
        body: "Waldo holds [[Slack]] and [[Gmail]] while you're on the call, then tells you what needs you, not what's in it.",
        trigger: { kind: "ask", text: "When I'm on an investor call, hold Slack and email. Tell me after what needs me." },
        thinking: "Sorting what can wait from what can't",
        steps: [
          { tool: "Google Calendar", text: "Investor call, 12:00 to 1:00" },
          { tool: "Slack", text: "Status set, mentions held" },
          { tool: "Gmail", text: "Inbox batched for 1:15" },
        ],
        result: {
          app: "list",
          tool: "Slack",
          title: "After your call",
          meta: "1:02 PM",
          rows: [
            { label: "Mentions from Priya, Dev and #launch", value: "Need you", strong: true },
            { label: "41 other messages", value: "Can wait" },
            { label: "Email, 23 new", value: "Batch at 1:15", dim: true },
          ],
        },
      },
      {
        time: "Fri 4:00 PM",
        title: "Friday investor update, drafted for you",
        body: "Every Friday, Waldo drafts your update from your numbers in [[Stripe]], what shipped in [[Linear]] and your calendar, and leaves it in [[Gmail]] to send.",
        trigger: { kind: "ask", text: "Every Friday at 4, draft my investor update from this month's numbers and what shipped." },
        thinking: "Checking the numbers against last month first",
        steps: [
          { tool: "Stripe", text: "Read October revenue and churn" },
          { tool: "Linear", text: "Read 14 issues shipped" },
          { tool: "Gmail", text: "Saved a draft to Investors" },
        ],
        result: {
          app: "doc",
          tool: "Gmail",
          title: "October update",
          meta: "Draft",
          blocks: [
            { tool: "Stripe", text: "Revenue is up 14% on September. Churn is flat." },
            { tool: "Linear", text: "We shipped the new onboarding and 12 smaller fixes." },
            { tool: "Google Calendar", text: "Three enterprise pilots start on the 20th." },
          ],
          foot: "Nothing goes out until you send it.",
        },
      },
    ],
  },
  {
    id: "engineers",
    name: "Engineers",
    tagline: "Hard problems in your sharpest hours.",
    moments: [
      {
        time: "8:30 AM",
        title: "Put the hard problem in your best hours",
        body: "Waldo learns when you're clearest from [[Apple Watch]], blocks it in [[Google Calendar]], and moves standup out of the way.",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Slept well. You're usually sharpest from 9 to 11." },
        thinking: "Looking for your two clearest hours",
        steps: [
          { tool: "Google Calendar", text: "Blocked 9:00 to 11:00 for focus" },
          { tool: "Google Calendar", text: "Moved standup to 11:15" },
          { tool: "Slack", text: "Set your status to heads-down" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "Tuesday",
          rows: [
            { time: "9:00", label: "Focus: the export bug", mark: "new" },
            { time: "11:15", label: "Standup", mark: "moved", note: "Was 9:30" },
            { time: "12:00", label: "Lunch" },
            { time: "2:00", label: "Sprint planning" },
          ],
        },
      },
      {
        time: "11:30 AM",
        title: "Reviews waiting on you, batched into one block",
        body: "Reviews waiting on you in [[GitHub]] come in one sitting, ordered by who they're blocking in [[Linear]].",
        trigger: { kind: "ask", text: "Batch my reviews into one block a day. Start with whatever's blocking someone." },
        thinking: "Ordering reviews by who's waiting",
        steps: [
          { tool: "GitHub", text: "Found 4 reviews waiting on you" },
          { tool: "Linear", text: "2 of them block this cycle" },
          { tool: "Google Calendar", text: "Booked 11:30 to 12:15" },
        ],
        result: {
          app: "list",
          tool: "GitHub",
          title: "Reviews",
          meta: "11:30 AM",
          rows: [
            { label: "#212 Fix the export timeout", value: "Blocking Dev", strong: true },
            { label: "#215 Retry queue", value: "Blocking Ana", strong: true },
            { label: "#218 Copy tweaks", value: "Can wait" },
            { label: "#220 Bump dependencies", value: "Can wait", dim: true },
          ],
        },
      },
      {
        time: "6:00 PM",
        title: "Let your agent finish while you log off",
        body: "Waldo hands [[Claude Code]] the issue from [[Linear]] and tomorrow's context, then checks the work in [[Kennel]] before you see it.",
        trigger: { kind: "ask", text: "Have Claude Code finish the retry queue tonight. Check it before I look." },
        thinking: "Giving it the spec and tomorrow's demo time",
        steps: [
          { tool: "Linear", text: "Read the issue and its spec" },
          { tool: "Claude Code", text: "Worked on the retry queue" },
          { tool: "Kennel", text: "Checked: tests pass, one file flagged" },
        ],
        result: {
          app: "chat",
          tool: "Telegram",
          title: "Waldo",
          messages: ["Claude Code finished the retry queue. Tests pass and it does what the issue asks.", "One file it shouldn't have touched is flagged for the morning."],
        },
      },
    ],
  },
  {
    id: "designers",
    name: "Designers",
    tagline: "More time making, less time sorting.",
    moments: [
      {
        time: "9:00 AM",
        title: "Clear hours for the hard screens",
        body: "Waldo finds your clearest hours from [[Apple Watch]] and holds them in [[Google Calendar]] before crit.",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Rested. You're clearest from 10 to 1 today." },
        thinking: "Finding room before the 3pm crit",
        steps: [
          { tool: "Google Calendar", text: "Blocked 10:00 to 1:00 for the empty states" },
          { tool: "Google Calendar", text: "Moved the review to Thursday" },
          { tool: "Slack", text: "Status set until 1" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "Tuesday",
          rows: [
            { time: "10:00", label: "Design: empty states", mark: "new" },
            { time: "1:00", label: "Lunch" },
            { time: "3:00", label: "Crit", mark: "kept" },
            { time: "Thu", label: "Design review", mark: "moved", note: "Was today" },
          ],
        },
      },
      {
        time: "12:30 PM",
        title: "Figma comments sorted before crit",
        body: "Waldo groups new [[Figma]] comments into themes, checks them against the brief in [[Notion]], and flags the one that needs your call.",
        trigger: { kind: "ask", text: "Before every crit, sort the new Figma comments by theme and flag what needs my call." },
        thinking: "Grouping comments before counting them",
        steps: [
          { tool: "Figma", text: "Read 23 new comments" },
          { tool: "Notion", text: "Checked them against the brief" },
          { tool: "Slack", text: "Sent you the summary" },
        ],
        result: {
          app: "list",
          tool: "Figma",
          title: "Crit at 3pm",
          meta: "23 comments",
          rows: [
            { label: "Copy and labels", value: "8" },
            { label: "Spacing", value: "6" },
            { label: "Empty states", value: "5" },
            { label: "Already resolved", value: "3", dim: true },
            { label: "Needs your call", value: "1", strong: true },
          ],
        },
      },
      {
        time: "5:30 PM",
        title: "Leave the feedback for tomorrow",
        body: "Waldo keeps crit threads in [[Slack]] quiet overnight and lists what changes in [[Notion]], with time held to do it.",
        trigger: { kind: "ask", text: "After crit, keep the threads quiet until morning and list what changes." },
        thinking: "Pulling the decisions out of the threads",
        steps: [
          { tool: "Slack", text: "Muted 3 crit threads until 9am" },
          { tool: "Notion", text: "Listed 6 changes" },
          { tool: "Google Calendar", text: "Held tomorrow 10 to 12 for them" },
        ],
        result: {
          app: "doc",
          tool: "Notion",
          title: "Changes from crit",
          meta: "6 items",
          blocks: [
            { text: "Shorten the empty-state copy to one line." },
            { text: "Cards back on the 8pt grid." },
            { text: "A new icon for offline." },
          ],
          foot: "Tomorrow, 10 to 12, is held for these.",
        },
      },
    ],
  },
  {
    id: "product",
    name: "Product",
    tagline: "Fewer status checks, more decisions.",
    moments: [
      {
        time: "8:45 AM",
        title: "Walk into standup knowing what moved",
        body: "Waldo reads what changed overnight in [[Linear]] and sends you three lines in [[Telegram]] before standup.",
        trigger: { kind: "ask", text: "Every morning before standup, tell me what moved in Linear overnight." },
        thinking: "Skipping the noise, keeping what changed plans",
        steps: [
          { tool: "Linear", text: "Read 18 updates since 6pm" },
          { tool: "Linear", text: "2 slipped, 1 is blocked" },
          { tool: "Telegram", text: "Sent at 8:45" },
        ],
        result: {
          app: "chat",
          tool: "Telegram",
          title: "Waldo",
          messages: ["Two issues slipped to next cycle. Search is blocked on the API change.", "Everything else is on track."],
        },
      },
      {
        time: "1:00 PM",
        title: "Customer calls become issues, with owners",
        body: "Waldo reads your call notes in [[Granola]] and adds the follow-ups to [[Linear]], each with an owner.",
        trigger: { kind: "ask", text: "After each customer call, turn the notes into Linear issues with owners." },
        thinking: "Separating requests from passing comments",
        steps: [
          { tool: "Granola", text: "Read notes from the 12:00 call" },
          { tool: "Linear", text: "Created 3 issues" },
          { tool: "Slack", text: "Told #product they're in" },
        ],
        result: {
          app: "list",
          tool: "Linear",
          title: "From the Northwind call",
          meta: "3 issues",
          rows: [
            { label: "Export to CSV", value: "Ana" },
            { label: "Bulk invites", value: "Dev" },
            { label: "Question about SSO", value: "You", strong: true },
          ],
        },
      },
      {
        time: "4:30 PM",
        title: "Keep the hour for the spec",
        body: "When the day runs long, Waldo moves the low-stakes meeting in [[Google Calendar]] so the spec in [[Notion]] still gets written.",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Stress has been climbing since 2pm." },
        thinking: "Finding what can move without hurting anyone",
        steps: [
          { tool: "Google Calendar", text: "Moved the 5pm sync to tomorrow" },
          { tool: "Notion", text: "Opened the spec where you left off" },
          { tool: "Slack", text: "Status set to focusing" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "Wednesday",
          rows: [
            { time: "3:00", label: "Roadmap review", mark: "kept" },
            { time: "4:30", label: "Write the spec", mark: "new" },
            { time: "5:00", label: "Weekly sync", mark: "moved", note: "Tomorrow, 10:00" },
          ],
        },
      },
    ],
  },
  {
    id: "sales",
    name: "Sales",
    tagline: "Your best hours go to your biggest calls.",
    moments: [
      {
        time: "8:00 AM",
        title: "Prep for every call before you dial",
        body: "Waldo reads today in [[Google Calendar]], pulls each account from [[HubSpot]], and hands you three lines before every call.",
        trigger: { kind: "ask", text: "Before each call today, give me three lines on the account." },
        thinking: "Matching today's calls to their deals",
        steps: [
          { tool: "Google Calendar", text: "Read 6 calls today" },
          { tool: "HubSpot", text: "Pulled each deal's stage and last touch" },
          { tool: "Telegram", text: "Briefs arrive 10 minutes before each" },
        ],
        result: {
          app: "doc",
          tool: "Telegram",
          title: "Before your 10:30 with Acme",
          meta: "10:20 AM",
          blocks: [
            { tool: "HubSpot", text: "Renewal, closes this month." },
            { tool: "HubSpot", text: "Last touch: the demo on the 2nd." },
            { tool: "Google Calendar", text: "Their CFO joins this time." },
          ],
        },
      },
      {
        time: "10:30 AM",
        title: "Your biggest call in your strongest hour",
        body: "Waldo matches your best hours from [[Apple Watch]] to the deal that matters most in [[Salesforce]], and spaces the rest.",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "You're sharpest between 10 and 12 today." },
        thinking: "Finding the call worth your best hour",
        steps: [
          { tool: "Salesforce", text: "Acme is the biggest renewal this week" },
          { tool: "Google Calendar", text: "Moved it to 10:30" },
          { tool: "Google Calendar", text: "Spaced the demos 15 minutes apart" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "Thursday",
          rows: [
            { time: "9:00", label: "Pipeline review" },
            { time: "10:30", label: "Acme renewal", mark: "moved", note: "Your best hour" },
            { time: "12:00", label: "Lunch", mark: "kept" },
            { time: "2:00", label: "Three demos, spaced" },
          ],
        },
      },
      {
        time: "4:00 PM",
        title: "Follow-ups drafted before you hang up",
        body: "Waldo reads your call notes in [[Granola]], drafts each follow-up in [[Gmail]], and logs next steps in [[HubSpot]].",
        trigger: { kind: "ask", text: "After each call, draft the follow-up from my notes. I'll send them." },
        thinking: "Pulling the promises out of the notes",
        steps: [
          { tool: "Granola", text: "Read notes from 3 calls" },
          { tool: "Gmail", text: "Drafted 3 follow-ups" },
          { tool: "HubSpot", text: "Logged next steps" },
        ],
        result: {
          app: "list",
          tool: "Gmail",
          title: "Drafts",
          meta: "3 ready",
          rows: [
            { label: "Acme: next steps on the renewal", value: "Ready" },
            { label: "Ferro: the pricing you asked for", value: "Ready" },
            { label: "Ostra: an intro to our CTO", value: "Ready" },
          ],
        },
      },
    ],
  },
  {
    id: "investors",
    name: "Investors",
    tagline: "Pitch five gets pitch one's attention.",
    moments: [
      {
        time: "8:00 AM",
        title: "Five pitches, each one fresh",
        body: "Waldo spaces today's [[Calendly]] bookings around how you're doing, so the founder at pitch five gets your pitch-one attention.",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Recovered well. Your best hours are 9 to 12." },
        thinking: "Putting the pitches that matter where you're best",
        steps: [
          { tool: "Calendly", text: "Read 5 pitches booked today" },
          { tool: "Google Calendar", text: "Put the two that matter in the morning" },
          { tool: "Google Calendar", text: "Added 15 minutes after each" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "Monday",
          rows: [
            { time: "9:00", label: "Northwind", mark: "moved", note: "Your best hours" },
            { time: "10:15", label: "Halden", mark: "moved", note: "Your best hours" },
            { time: "12:00", label: "Lunch", mark: "kept" },
            { time: "2:00", label: "Three pitches, spaced" },
          ],
        },
      },
      {
        time: "9:45 AM",
        title: "Notes pulled together before every founder call",
        body: "Waldo pulls the history from [[Google Calendar]], when you last heard from them in [[Gmail]], and your notes in [[Notion]] into one brief.",
        trigger: { kind: "ask", text: "Before every founder call, pull together what I already know about them." },
        thinking: "Checking how many times you've met first",
        steps: [
          { tool: "Google Calendar", text: "Second meeting; the first was 12 September" },
          { tool: "Gmail", text: "They replied on Monday" },
          { tool: "Notion", text: "Read your notes from last time" },
        ],
        result: {
          app: "doc",
          tool: "Telegram",
          title: "Before your 10am with Northwind",
          meta: "9:50 AM",
          blocks: [
            { tool: "Google Calendar", text: "Second meeting. The first was on 12 September." },
            { tool: "Notion", text: "Last time: strong team, unclear on pricing." },
            { tool: "Gmail", text: "They replied to your follow-up on Monday." },
          ],
        },
      },
      {
        time: "6:00 PM",
        title: "The day's pitches in one message",
        body: "Waldo sums up the day from [[Zoom]] and your notes in [[Notion]], and tells you what's worth sleeping on.",
        trigger: { kind: "ask", text: "Each evening, sum up the day's pitches in one message." },
        thinking: "Keeping it to what needs a decision",
        steps: [
          { tool: "Zoom", text: "Read 5 calls, 2 ran over" },
          { tool: "Notion", text: "Read today's notes" },
          { tool: "Telegram", text: "Sent at 6:00" },
        ],
        result: {
          app: "chat",
          tool: "Telegram",
          title: "Waldo",
          messages: ["Five pitches today. Two follow-ups to send.", "One to sleep on: Northwind's pricing."],
        },
      },
    ],
  },
  {
    id: "consultants",
    name: "Consultants",
    tagline: "No client gets the tired you.",
    moments: [
      {
        time: "8:00 AM",
        title: "Client calls spaced so none gets the tired you",
        body: "Waldo reads your day in [[Outlook]] and your energy from [[Apple Watch]], then spaces the calls and closes late slots in [[Calendly]].",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Short night. You usually fade after 2pm." },
        thinking: "Making room between calls",
        steps: [
          { tool: "Outlook", text: "Read 4 client calls" },
          { tool: "Outlook", text: "Added 20 minutes between each" },
          { tool: "Calendly", text: "Closed new bookings after 3pm" },
        ],
        result: {
          app: "calendar",
          tool: "Outlook",
          title: "Thursday",
          rows: [
            { time: "9:00", label: "Halden" },
            { time: "10:00", label: "20 minutes to reset", mark: "new" },
            { time: "10:30", label: "Ferro" },
            { time: "12:00", label: "Lunch", mark: "kept" },
            { time: "2:00", label: "Ostra" },
          ],
        },
      },
      {
        time: "11:00 AM",
        title: "Deliverables in an order you can do",
        body: "Waldo reorders [[Asana]] by deadline and energy: the deck while you're sharp, the admin when you're not.",
        trigger: { kind: "ask", text: "Each morning, order my deliverables by deadline and how I'm doing." },
        thinking: "Weighing deadlines against your energy",
        steps: [
          { tool: "Asana", text: "Read 7 tasks due this week" },
          { tool: "Apple Watch", text: "You're sharpest before noon" },
          { tool: "Asana", text: "Reordered for today" },
        ],
        result: {
          app: "list",
          tool: "Asana",
          title: "Today",
          meta: "Reordered",
          rows: [
            { label: "Halden deck", value: "Now", strong: true },
            { label: "Ferro memo", value: "After lunch" },
            { label: "Expenses", value: "4pm", dim: true },
            { label: "Timesheets", value: "Friday", dim: true },
          ],
        },
      },
      {
        time: "2:00 PM",
        title: "When a call runs over, the next one moves",
        body: "Waldo sees a [[Zoom]] call running long and pushes the next one in [[Outlook]], with a note to the client you've approved.",
        trigger: { kind: "noticed", tool: "Zoom", text: "The Ferro call is running 25 minutes over." },
        thinking: "Checking who's next and how much room there is",
        steps: [
          { tool: "Outlook", text: "Ostra starts in 5 minutes" },
          { tool: "Outlook", text: "Pushed it to 2:15" },
          { tool: "Outlook", text: "Sent Ostra the new time, with your OK" },
        ],
        result: {
          app: "doc",
          tool: "Outlook",
          title: "To: Ostra",
          meta: "Sent 1:56 PM",
          blocks: [{ text: "Running about 15 minutes behind. Does 2:15 still work? Same link." }],
          foot: "Sent after you tapped OK.",
        },
      },
    ],
  },
  {
    id: "athletes",
    name: "Athletes",
    tagline: "Training and work, on one calendar.",
    moments: [
      {
        time: "6:00 AM",
        title: "Train for the body you woke up with",
        body: "Waldo reads recovery from [[WHOOP]] and swaps today's session in [[Strava]] when you're not ready for it.",
        trigger: { kind: "noticed", tool: "WHOOP", text: "Recovery is in the red." },
        thinking: "Checking which session can move",
        steps: [
          { tool: "Strava", text: "Today: intervals" },
          { tool: "Strava", text: "Swapped for an easy 40 minutes" },
          { tool: "Google Calendar", text: "Intervals moved to Thursday" },
        ],
        result: {
          app: "chat",
          tool: "Telegram",
          title: "Waldo",
          messages: ["Recovery's low. Easy 40 minutes today.", "Intervals move to Thursday, your light work day."],
        },
      },
      {
        time: "9:00 AM",
        title: "Training load and work load, balanced on one calendar",
        body: "Waldo puts your sessions from [[Strava]] next to meetings in [[Google Calendar]], and moves whichever can give.",
        trigger: { kind: "ask", text: "Keep my hardest sessions off my heaviest work days." },
        thinking: "Lining up the week's training against its meetings",
        steps: [
          { tool: "Google Calendar", text: "Wednesday has 7 meetings" },
          { tool: "Strava", text: "Wednesday has the tempo run" },
          { tool: "Google Calendar", text: "Moved the tempo to Thursday" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "This week",
          rows: [
            { time: "Mon", label: "Easy run" },
            { time: "Tue", label: "Intervals" },
            { time: "Wed", label: "Rest, 7 meetings", mark: "kept" },
            { time: "Thu", label: "Tempo run", mark: "moved", note: "From Wednesday" },
            { time: "Sat", label: "Long run" },
          ],
        },
      },
      {
        time: "9:30 PM",
        title: "Sleep for tomorrow's session",
        body: "Waldo reads your sleep from [[Oura]] and tomorrow's plan in [[Strava]], and tells you when to wind down.",
        trigger: { kind: "noticed", tool: "Oura", text: "Three short nights in a row." },
        thinking: "Working back from tomorrow's first thing",
        steps: [
          { tool: "Strava", text: "Tomorrow: race-pace session" },
          { tool: "Google Calendar", text: "First meeting at 9" },
          { tool: "Telegram", text: "A wind-down nudge at 10" },
        ],
        result: {
          app: "chat",
          tool: "Telegram",
          title: "Waldo",
          messages: ["Race pace tomorrow, and three short nights behind you.", "Lights out by 10:30 gives you eight hours."],
        },
      },
    ],
  },
  {
    id: "students",
    name: "Students",
    tagline: "Study when your head is clear.",
    moments: [
      {
        time: "8:00 AM",
        title: "Revision in the hours you're clearest",
        body: "Waldo finds your clearest hours from [[Apple Watch]] and books revision into them around lectures in [[Google Calendar]].",
        trigger: { kind: "noticed", tool: "Apple Watch", text: "Slept 7h 50m. You're sharp until early afternoon." },
        thinking: "Fitting revision around lectures",
        steps: [
          { tool: "Google Calendar", text: "Lectures at 10 and 2" },
          { tool: "Google Calendar", text: "Booked revision 8:30 to 9:45" },
          { tool: "Google Calendar", text: "And 11:15 to 12:30" },
        ],
        result: {
          app: "calendar",
          tool: "Google Calendar",
          title: "Wednesday",
          rows: [
            { time: "8:30", label: "Revision: statistics", mark: "new" },
            { time: "10:00", label: "Lecture" },
            { time: "11:15", label: "Revision: essay plan", mark: "new" },
            { time: "2:00", label: "Lecture" },
          ],
        },
      },
      {
        time: "12:30 PM",
        title: "Big assignments, one step a day",
        body: "Waldo breaks the essay due Friday in [[Google Tasks]] into steps that fit the free hours in [[Google Calendar]].",
        trigger: { kind: "ask", text: "Break my essay into steps I can finish by Friday." },
        thinking: "Counting the free hours before Friday",
        steps: [
          { tool: "Google Tasks", text: "Essay due Friday" },
          { tool: "Google Calendar", text: "6 free hours this week" },
          { tool: "Google Tasks", text: "Split into 4 steps" },
        ],
        result: {
          app: "list",
          tool: "Google Tasks",
          title: "Essay",
          meta: "Due Friday",
          rows: [
            { label: "Read the three sources", value: "Today", strong: true },
            { label: "Outline", value: "Wednesday" },
            { label: "First draft", value: "Thursday" },
            { label: "Edit and submit", value: "Friday" },
          ],
        },
      },
      {
        time: "9:00 PM",
        title: "The night before an exam, your notes on one page",
        body: "Waldo pulls your lecture notes from [[Notion]] and the past paper from [[Google Drive]] into one page for the night before.",
        trigger: { kind: "ask", text: "The night before each exam, put my notes for it on one page." },
        thinking: "Keeping only what the past papers ask about",
        steps: [
          { tool: "Notion", text: "Read 9 lecture pages" },
          { tool: "Google Drive", text: "Read last year's paper" },
          { tool: "Notion", text: "Made one revision page" },
        ],
        result: {
          app: "doc",
          tool: "Notion",
          title: "Statistics exam, tomorrow 10am",
          meta: "1 page",
          blocks: [
            { text: "Which test to use when, in one table." },
            { text: "The three formulas you keep missing." },
            { text: "Last year's Q4, worked through." },
          ],
          foot: "Lights out by 11 gives you eight hours.",
        },
      },
    ],
  },
];

/** Splits a moment's body into plain words and the tools marked [[like this]] */
export function bodyParts(body: string): (string | { tool: string })[] {
  return body.split(/(\[\[.+?\]\])/).filter(Boolean).map((part) => (part.startsWith("[[") ? { tool: part.slice(2, -2) } : part));
}

/** Every tool a job's day touches, in the order they first come up: its dock */
export function toolsOf(job: Job): string[] {
  const seen: string[] = [];
  const add = (tool: string) => {
    if (!seen.includes(tool)) seen.push(tool);
  };
  for (const moment of job.moments) {
    if (moment.trigger.kind === "noticed") add(moment.trigger.tool);
    moment.steps.forEach((step) => add(step.tool));
    add(moment.result.tool);
  }
  return seen;
}

/** The tools one moment touches: their dots light in the dock */
export function toolsOfMoment(moment: Moment): string[] {
  const set = new Set<string>(moment.steps.map((step) => step.tool));
  if (moment.trigger.kind === "noticed") set.add(moment.trigger.tool);
  set.add(moment.result.tool);
  bodyParts(moment.body).forEach((part) => typeof part !== "string" && set.add(part.tool));
  return [...set];
}
