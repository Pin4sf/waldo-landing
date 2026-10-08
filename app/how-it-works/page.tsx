import type { Metadata } from "next";

import { Body, Close, Grid, Header, Item, Section, Stage } from "@/components/site/blocks";
import { type Feature, FeatureList } from "@/components/site/feature-sheet";
import { Carousel } from "@/components/site/carousel";
import { ConnectorPile } from "@/components/site/connector-pile";
import { LockMoment } from "@/components/site/day-moments";
import { SiteShell } from "@/components/site/site-shell";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/how-it-works.md ("Live copy" at the top). One section per part: a headline, one main
// block, then the smaller features as a "+" row that opens a side panel. Only "Live" and "Next" features
// appear as working; "Later" features live in the "What's coming" section. Statuses are the product docs'
// (April 2026), still to be confirmed.
// Layout, pictures and motion follow the homepage (docs/website/site-wide-pass.md): centred titles, centred
// endless carousels, the Stage box, a centred close.

const DESCRIPTION =
  "Everything Waldo does: how it reads how you're doing, runs your day around it, works across your tools, talks to you, and stays inside the limits you set.";

export const metadata: Metadata = {
  title: "How it works",
  description: DESCRIPTION,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How it works | Waldo",
    description: DESCRIPTION,
    url: `${SITE_URL}/how-it-works`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
};

const HEALTH: Feature[] = [
  {
    name: "Sleep debt",
    line: "One good night doesn’t cancel a short week. Waldo keeps count, so your plans match the sleep you’ve actually had.",
    detail: [
      "Most sleep apps grade last night and start again tomorrow. Waldo keeps a running count of the sleep you’ve missed, weighted over the last 14 days, so a Saturday lie-in doesn’t hide three short nights before it.",
      "When the debt builds, it plans around it before you feel it: an earlier wind-down, a lighter morning, the hard task moved to when you’re fresher.",
    ],
    status: "today",
    wire: { name: "sleep-debt", caption: "Fourteen nights against your usual, and what tonight is for" },
    helps: {
      heading: "How it helps",
      columns: ["When", "What Waldo does"],
      rows: [
        ["The debt is building", "Suggests an earlier wind-down, and keeps tomorrow morning light."],
        ["One long night", "Counts it, without calling the debt paid. Two weeks say more than one night."],
        ["Something hard is due", "Moves it to when you’re fresher, and leaves the deadline where it is."],
      ],
    },
  },
  {
    name: "Quiet flags",
    line: "The signals you’d never think to check, checked for you, against your own usual.",
    detail: [
      "Blood oxygen, breathing rate and wrist temperature sit in the background. Nobody reads them every morning, and you shouldn’t have to. Waldo compares each one with your own usual, not a stranger’s average, and stays quiet while they hold steady.",
      "When one drifts, you get a gentle flag. Never an alarm, and never a diagnosis. If something worries you, talk to a doctor.",
    ],
    status: "today",
    wire: { name: "quiet-flags", caption: "Three resting signals, each against your own usual range" },
    helps: {
      heading: "What it watches",
      columns: ["Signal", "What Waldo does with it"],
      rows: [
        ["Blood oxygen", "Reads it overnight, and mentions it only if it drifts from your usual."],
        ["Breathing rate", "Steady for most people, most nights, so a drift is worth knowing about."],
        ["Wrist temperature", "Tracks it night to night, and flags it when it moves away from your usual."],
      ],
    },
  },
  {
    name: "Training",
    line: "Workouts and work share one calendar, so they get planned together, not against each other.",
    detail: [
      "Waldo sees your training next to your meetings. After a hard session it knows you may have a sharp 90 minutes, and offers them to the work that needs them most.",
      "It can tell a racing heart on a run from a racing heart in a meeting, so a good workout never gets mistaken for a bad day.",
    ],
    status: "today",
    wire: { name: "training", caption: "A morning run, and the sharp stretch after it given to the hardest task" },
    helps: {
      heading: "How it helps",
      columns: ["When", "What Waldo does"],
      rows: [
        ["After a hard session", "Offers the sharp stretch that follows to your hardest task."],
        ["Your heart races on a run", "Reads it as a workout, not stress. Nothing gets pulled."],
        ["Your heart races at your desk", "Reads it as stress, and The Fetch can step in."],
      ],
    },
  },
  {
    name: "Weather and daylight",
    line: "Heat, air and daylight change how a day feels. Waldo plans with them, so you don’t have to check.",
    detail: [
      "Heat, UV and air quality where you are, plus how much daylight you’ve had, all go into your plan. When a walk outside would help, Waldo tells you.",
      "There’s nothing to set up and nothing to look up. It works from your rough location.",
    ],
    status: "today",
    wire: { name: "weather", caption: "Today’s daylight and the conditions outside, folded into the plan" },
    helps: {
      heading: "What it reads",
      columns: ["Reading", "How it’s used"],
      rows: [
        ["Daylight so far", "Counted through the day, so a walk gets suggested when it would help."],
        ["Heat, UV and air", "Read where you are, and weighed in before anything outdoors is suggested."],
        ["Your location", "Rough, not exact. It’s all Waldo needs, and there’s nothing to set up."],
      ],
    },
  },
  {
    name: "Your history",
    line: "Every past day as one coloured dot. Spot a rough patch at a glance, then tap in to see why.",
    detail: [
      "Look back 7, 30 or 90 days. Each day is a dot, coloured by how it went, so the shape of the last few months shows without a single chart to read.",
      "Tap a dot to see that day in full: how you slept, what the day asked of you, and what Waldo did about it.",
    ],
    status: "today",
    wire: { name: "history", caption: "Ninety days as dots, with one day opened" },
    helps: {
      heading: "What you can do",
      columns: ["Do this", "To see"],
      rows: [
        ["Switch between 7, 30 and 90 days", "This week, this month, or the whole season."],
        ["Tap a dot", "How you slept, what the day asked of you, and what Waldo changed."],
        ["Look for runs of colour", "The rough stretches, and what came just before them."],
      ],
    },
  },
  {
    name: "Bring your past",
    line: "Your watch has years of you on it. Import them, and Waldo starts from your real usual, not a blank page.",
    detail: [
      "A new app usually needs weeks to learn what normal looks like for you. Import your Apple Health history, and Waldo has your usual from the first morning.",
      "So the first Brief is already about you, not a guess. It knows you from day one, not week three.",
    ],
    status: "today",
    wire: { name: "bring-past", caption: "Apple Health history coming across, one kind of data at a time" },
    helps: {
      heading: "Why it matters",
      columns: ["Without your history", "With it"],
      rows: [
        ["Weeks of learning what normal is", "Your usual is known on day one."],
        ["Early Briefs that hedge", "Early Briefs that are about you."],
        ["Last night compared with nothing", "Last night compared with your own long-run usual."],
      ],
    },
  },
];

const DAY: Feature[] = [
  {
    name: "Your best hours",
    line: "Waldo learns when you’re sharpest, then keeps that time for the work that needs it.",
    detail: [
      "Everyone has a stretch of the day when hard things feel easier, and most calendars give it away to whoever books first. Waldo learns yours, and shapes your calendar around it.",
      "When an invite lands in that window, it suggests another time before you’ve said yes. “This invite lands in your sharpest window. Suggest 3pm instead?”",
    ],
    status: "next",
    wire: { name: "best-hours", caption: "Your sharpest stretch, and an invite that lands in it" },
    helps: {
      heading: "How it helps",
      columns: ["When", "What Waldo does"],
      rows: [
        ["An invite lands in your best hours", "Suggests another time, before you’ve accepted."],
        ["Your week fills up", "Holds your sharpest stretch for the work that needs it."],
        ["Your rhythm changes", "Keeps learning, so the window moves with you."],
      ],
    },
  },
  {
    name: "The right task, at the right time",
    line: "Your list, ordered by what’s due and by how much you’ve got in you, so the hard things land when you can handle them.",
    detail: [
      "A to-do list doesn’t know you slept badly. Waldo does. The hardest thing goes to your sharpest hour, and on a low day, big tasks get broken into small chunks you can actually start.",
      "Deadlines stay visible. Anything due today stays put, even on a rough day.",
    ],
    status: "today",
    wire: { name: "right-task", caption: "Today’s list, reordered, with the reason beside each move" },
    helps: {
      heading: "How it helps",
      columns: ["On your list", "What Waldo does"],
      rows: [
        ["The hardest task", "Moves it to your sharpest hour."],
        ["A big task on a low day", "Breaks it into small chunks, starting with the part you know."],
        ["Anything due today", "Leaves it where it is, whatever kind of day it is."],
      ],
    },
  },
  {
    name: "Fewer pings",
    line: "Messages arrive all day. Waldo helps you read them in a couple of blocks, so the hours in between stay yours.",
    detail: [
      "Constant pings break up the time you need most. Waldo can batch email into two blocks a day, and set Slack to Focus while you work, so messages wait for you instead of the other way round.",
      "What Waldo can see and do depends on the service you connect and the permissions you give it. Final app data details are under review, and the screen here is an example.",
    ],
    status: "next",
    wire: { name: "fewer-pings", caption: "An example day: email read in two blocks, Slack on Focus" },
    helps: {
      heading: "How it helps",
      columns: ["When", "What Waldo can do"],
      rows: [
        ["Email lands all day", "Gathers it into two blocks, so you check it twice, not constantly."],
        ["You’re in deep work", "Sets Slack to Focus until the work block ends."],
      ],
    },
  },
  {
    name: "Fixed first, mentioned after",
    line: "Small problems get handled while you sleep. You hear about them after, with the reason.",
    detail: [
      "The Patrol runs around the clock, overnight included. When something looks off, like two meetings overlapping, Waldo fixes it if your limits allow, and tells you after. Whether a fix can be reversed depends on the action.",
      "If it can’t fix something, it comes to you with options. If something is only worth watching, it watches, and says nothing until it matters.",
    ],
    status: "today",
    wire: { name: "fixed-first", caption: "One night of The Patrol: one fixed, one asked, one watched" },
    helps: {
      heading: "Three ways it ends",
      columns: ["What it finds", "What happens"],
      rows: [
        ["Something it can fix", "Fixed within your limits, then mentioned in the morning."],
        ["Something it can’t", "Brought to you with options, not just a problem."],
        ["Something worth watching", "Watched quietly. You hear about it only if it builds."],
      ],
    },
  },
  {
    name: "Patterns",
    line: "Some things only show over weeks. Waldo spots them, names them, and plans for the next one.",
    detail: [
      "One observation is a Spot: “Emails after 10pm, and your sleep is 8% worse.” When enough Spots line up, they join into a named pattern, like “The Tuesday Crash,” along with what Waldo now does about it.",
      "Six weeks of Tuesdays that looked ordinary, until they didn’t. You were too close to see it. Waldo wasn’t.",
    ],
    status: "next",
    wire: { name: "patterns", caption: "Spots joining into a named pattern" },
    helps: {
      heading: "From one night to a pattern",
      columns: ["Stage", "What you get"],
      rows: [
        ["A Spot", "One link between two things, like late email and worse sleep."],
        ["A pattern", "Spots that keep lining up, given a name you’ll recognise."],
        ["A plan", "What Waldo now does differently, before the next one lands."],
      ],
    },
  },
  {
    name: "The Slope",
    line: "Day to day, it’s hard to tell if things are getting better. The Slope sets today against four weeks ago.",
    detail: [
      "Recovery, Form, Weight, your meeting load, message pressure and task pileup, each set against where it was a month ago. One look tells you which way you’re heading: “Four of six are better than a month ago.”",
      "When most of them slide at once, Waldo tells you it’s time to ease off.",
    ],
    status: "next",
    wire: { name: "slope", caption: "Six measures, today against four weeks ago" },
    helps: {
      heading: "How to read it",
      columns: ["What you see", "What it means"],
      rows: [
        ["Recovery and Form up", "You’re getting more back than a month ago."],
        ["Weight, The Stack, Signal Pressure and Task Pileup down", "Your days are asking less of you."],
        ["Most of the six sliding", "Waldo tells you it’s time to ease off."],
      ],
    },
  },
];

const TALK: Feature[] = [
  {
    name: "Threads",
    line: "Keep each part of life in its own conversation, so nothing gets buried under something else.",
    detail: [
      "One thread for the week ahead, one for training, one for that trip. Each keeps its own context, so Waldo picks up where that conversation left off, not where the last one did.",
      "One tap moves between them.",
    ],
    status: "today",
    wire: { name: "threads", caption: "Three threads, each with its own context" },
    helps: {
      heading: "How it helps",
      columns: ["Without threads", "With them"],
      rows: [
        ["Training notes buried under work", "Each topic has its own place."],
        ["Explaining the background every time", "Each thread remembers its own."],
        ["Scrolling to find the trip plans", "One tap to the thread."],
      ],
    },
  },
  {
    name: "Follow up on anything",
    line: "Every Brief and every Fetch can turn into a conversation, with the context already there.",
    detail: [
      "Sometimes one line isn’t enough. Tap “Tell me more” on any Brief or Fetch, and a thread opens about that exact message. No copying, and no explaining what you mean.",
      "Ask why it moved the 9am, or what else it could do, and the answer starts from what Waldo already knows.",
    ],
    status: "next",
    wire: { name: "follow-up", caption: "“Tell me more” on a Brief, opening a thread about it" },
    helps: {
      heading: "Good things to ask",
      columns: ["Ask", "And get"],
      rows: [
        ["“Why did you move it?”", "The reason, from the data behind the Brief."],
        ["“What else could you do?”", "Another way to handle it, for you to pick."],
        ["“What should I do?”", "One clear next step for the rest of the day."],
      ],
    },
  },
  {
    name: "Quick replies",
    line: "Answer Waldo in one tap. Most replies don’t need typing.",
    detail: [
      "Under Waldo’s messages sit a few likely answers, like “Tell me more” or “What should I do?”. Tap one, or type your own.",
      "Waldo tends to speak up between meetings, which is exactly when you don’t have time to type.",
    ],
    status: "today",
    wire: { name: "quick-replies", caption: "A message from Waldo, with suggested replies under it" },
    helps: {
      heading: "How it helps",
      columns: ["When you want", "Tap"],
      rows: [
        ["The detail", "“Tell me more”"],
        ["The next step", "“What should I do?”"],
        ["To say it your way", "Nothing. Type your own, as you would to anyone."],
      ],
    },
  },
  {
    name: "Charts in replies",
    line: "When a number needs showing, the answer brings a small chart with it, right there in the message.",
    detail: [
      "Ask how you slept, and the reply comes with a small chart inside it. You see the shape of the night without leaving the conversation or opening another app.",
      "A picture where it helps, and plain words everywhere else.",
    ],
    status: "today",
    wire: { name: "charts-in-replies", caption: "“How did I sleep?” answered with last night’s stages" },
    helps: {
      heading: "Where it shows up",
      columns: ["You ask", "The reply might show"],
      rows: [
        ["“How did I sleep?”", "Last night’s stages, with the short part easy to see."],
        ["“How’s my HRV?”", "This week against your usual."],
        ["“How heavy is this week?”", "Each day’s load, side by side."],
      ],
    },
  },
  {
    name: "Full history",
    line: "Everything Waldo has told you is kept, so “what did it say last Tuesday?” always has an answer.",
    detail: [
      "Every conversation is kept and scrollable, including the reasons behind each move. Scroll back to what it told you last Tuesday, and why.",
      "Useful when a day starts to feel familiar, or when you just want to check what changed.",
    ],
    status: "today",
    wire: { name: "full-history", caption: "Scrolling back to last Tuesday’s Heads-Up" },
    helps: {
      heading: "How it helps",
      columns: ["When", "Scroll back to"],
      rows: [
        ["A day feels familiar", "The last time it happened, and what Waldo did then."],
        ["You missed a message", "Every Brief, Fetch and Close, in order."],
        ["You want the reason", "The why behind each move, kept right next to it."],
      ],
    },
  },
  {
    name: "Thumbs up, thumbs down",
    line: "Tell Waldo what helped and what didn’t. You get more of the first, and less of the second.",
    detail: [
      "Rate any message. Waldo learns what’s worth telling you, and what to leave out next time.",
      "No forms, and no settings to dig through. One tap, and the next Brief is a little more yours.",
    ],
    status: "today",
    wire: { name: "thumbs", caption: "Rating two messages, and the note that follows" },
    helps: {
      heading: "What a rating changes",
      columns: ["You tap", "Waldo learns"],
      rows: [
        ["Thumbs up", "This was worth saying. More like it."],
        ["Thumbs down", "Not useful. Less of it, or said differently."],
        ["Nothing", "That’s fine too. Ratings help, but they’re never required."],
      ],
    },
  },
];

const RULES: Feature[] = [
  {
    name: "Three levels, per area",
    line: "Decide how far Waldo goes, one part of your life at a time.",
    detail: [
      "Tell me, Ask me or Just do it, set separately for each area. “Just do it” for your calendar. “Ask me” for anything that goes to other people. Waldo only acts as far as you’ve allowed in that area.",
      "Start careful, and give it more room as it earns it. Change any of them whenever you like.",
    ],
    status: "today",
    wire: { name: "levels", caption: "Each area with its own level" },
    helps: {
      heading: "The three levels",
      columns: ["Level", "What Waldo does"],
      rows: [
        ["Tell me", "Says what it would do. Nothing changes."],
        ["Ask me", "Suggests the change, and waits for your yes."],
        ["Just do it", "Makes the change, then tells you what it did."],
      ],
    },
  },
  {
    name: "Always comes back to you",
    line: "Whatever level you’ve set, some things always come to you first.",
    detail: [
      "Even on “Just do it,” a short list of things never happens on its own. Waldo brings them to you, says what it wants to do, and waits.",
      "So giving Waldo more room never means giving up the final say on the things that matter most.",
    ],
    status: "today",
    wire: { name: "always-asks", caption: "A request that waits for your answer" },
    helps: {
      heading: "How it works",
      columns: ["Your level", "For anything on the list"],
      rows: [
        ["Tell me", "Waldo tells you. Nothing changes."],
        ["Ask me", "Waldo asks first."],
        ["Just do it", "Waldo still asks first."],
      ],
    },
  },
  {
    name: "The activity log",
    line: "Every move Waldo makes is written down with its reason, so nothing happens behind your back.",
    detail: [
      "Review recorded actions and their outcomes. Each one carries the reason for it, including the things Waldo noticed and decided to leave alone.",
      "Whether an action can be reversed depends on the service and the action.",
    ],
    status: "today",
    wire: { name: "activity-log", caption: "A day of actions, each with its reason" },
    helps: {
      heading: "What each entry tells you",
      columns: ["Entry", "Shows"],
      rows: [
        ["What happened", "The change, in plain words, and when."],
        ["Why", "The reason, from the data behind it."],
        ["Left alone", "What Waldo noticed, and chose not to act on."],
      ],
    },
  },
  {
    name: "Say it once",
    line: "Tell Waldo something once, and it sticks. People, preferences and corrections, all remembered.",
    detail: [
      "“Priya is your lead investor. Keep it short, send numbers first.” “No meetings before 10.” Tell Waldo once, and it remembers, so you never have to repeat yourself.",
      "Everything it knows about you is listed in one place, where you can change or remove any of it.",
    ],
    status: "today",
    wire: { name: "say-it-once", caption: "What Waldo remembers, each line yours to change" },
    helps: {
      heading: "What it remembers",
      columns: ["Kind", "For example"],
      rows: [
        ["People", "“Priya is your lead investor. Keep it short, send numbers first.”"],
        ["Preferences", "“No meetings before 10.”"],
        ["Corrections", "“That wasn’t stress. It was a workout.”"],
      ],
    },
  },
  {
    name: "Your schedule",
    line: "Waldo fits your hours, not the other way round. Pick when it speaks, and which messages you get.",
    detail: [
      "Set your wake time and when the evening check-in arrives. Turn The Brief, The Fetch or The Close on or off, one by one.",
      "Quiet hours, when Waldo stays silent, are coming next.",
    ],
    status: "today",
    wire: { name: "schedule", caption: "Wake time, the evening check-in, and each message on or off" },
    helps: {
      heading: "What you can set",
      columns: ["Setting", "What it changes"],
      rows: [
        ["Wake time", "When your morning starts, and The Brief with it."],
        ["Evening check-in", "When the day gets wrapped up."],
        ["The Brief, The Fetch, The Close", "Each one on or off, separately."],
        ["Quiet hours", "Coming next. Time when Waldo stays silent."],
      ],
    },
  },
  {
    name: "Yours, always",
    line: "Export everything any time. Delete your account, and it’s gone.",
    detail: [
      "That’s the aim. Export and deletion controls are still being reviewed, so treat the screen here as an example, not a promise of controls you can use today.",
      "Final security and retention details have not been published here yet.",
    ],
    status: "today",
    wire: { name: "yours-always", caption: "An example screen. These controls are still under review" },
    helps: {
      heading: "Where things stand",
      columns: ["Control", "Status"],
      rows: [
        ["Export everything", "Under review"],
        ["Delete your account", "Under review"],
        ["Security and retention details", "Not published yet"],
      ],
    },
  },
];

const COMING: Feature[] = [
  {
    name: "Voice",
    line: "Ask out loud, and hear the answer back. For the moments typing isn’t an option.",
    detail: ["Hold the mic and ask. Waldo can read your Brief out loud too, so the morning can start while you’re still getting ready."],
    status: "planned",
    wire: { name: "voice", caption: "Holding the mic to ask, with the Brief read out loud" },
    helps: {
      heading: "Where it would help",
      columns: ["Moment", "With voice"],
      rows: [
        ["Getting ready in the morning", "The Brief, read out loud."],
        ["Walking between meetings", "Ask without stopping to type."],
      ],
    },
  },
  {
    name: "Your own routines",
    line: "The things you ask for every week, written once. Waldo runs them on schedule.",
    detail: ["“Every Sunday evening, tell me how next week looks.” Write it once, in your own words, and Waldo runs it on schedule until you change it."],
    status: "planned",
    wire: { name: "routines", caption: "A weekly routine, written once" },
    helps: {
      heading: "For example",
      columns: ["When", "You write"],
      rows: [
        ["Every Sunday evening", "“Tell me how next week looks.”"],
        ["Every Friday afternoon", "“What can wait until Monday?”"],
      ],
    },
  },
  {
    name: "Tomorrow, today",
    line: "Find out how tomorrow will feel tonight, while there’s still time to change it.",
    detail: ["The night before, Waldo tells you how tomorrow is likely to feel. If it looks heavy, there’s still room to move things before the day begins."],
    status: "planned",
    wire: { name: "tomorrow-today", caption: "Tomorrow’s outlook, sent the evening before" },
    helps: {
      heading: "What you could do with it",
      columns: ["If tomorrow", "You can"],
      rows: [
        ["Looks heavy", "Move something tonight, before the day starts."],
        ["Looks fine", "Nothing. Sleep on it."],
      ],
    },
  },
  {
    name: "Other agents ask Waldo",
    line: "The other tools that act for you will check how you’re doing first.",
    detail: [
      "Your other agents will be able to ask Waldo how you’re doing, and plan around it, before they act on your behalf. So a call gets booked for when you’re rested, not first thing after a short night.",
    ],
    status: "planned",
    wire: { name: "other-agents", caption: "Another agent checking with Waldo before it books" },
    helps: {
      heading: "For example",
      columns: ["The agent asks", "Waldo answers"],
      rows: [
        ["“Is 8am tomorrow a good time?”", "“Short night likely. After 10:30 works better.”"],
        ["“Can this go on Friday afternoon?”", "“Friday’s light. Go ahead.”"],
      ],
    },
  },
];

export default function HowItWorksPage() {
  return (
    <SiteShell>
      {/* 0 · Hero */}
      <Section size="open">
        <Header
          as="h1"
          lines={["Everything it handles.", "Nothing you have to."]}
          subtitle="Everything Waldo does, from reading last night's sleep to moving tomorrow's meeting."
          actions={{ primary: { label: "Let Waldo in →", href: "/waitlist" } }}
          center
        />
        <Body>
          <Grid cols={5} boxed>
            <Item title="Health" href="#health">Knows how you&apos;re doing.</Item>
            <Item title="Day to day" href="#day">Runs your day around it.</Item>
            <Item title="Connectors" href="#connectors">Works with everything you use.</Item>
            <Item title="Talk to Waldo" href="#talk">Ask anything, anywhere.</Item>
            <Item title="Your rules" href="#rules">You decide how far it goes.</Item>
          </Grid>
        </Body>
      </Section>

      {/* 1 · Health */}
      <Section id="health" size="auto">
        <Header
          label="Health"
          lines={["Your health,", "without the homework."]}
          subtitle="Health apps hand you charts and a score, then leave the reading to you. Waldo does the reading. It even knows a racing heart on a morning run from a racing heart in a board call."
          body="You have better things to memorise."
          center
        />
        <Body>
          <Carousel label="Recovery, Form and Weight" loop>
            <Item title="Recovery" visual="Last night on iPhone: sleep, HRV and resting state" image="/figma-assets/waldo-cards/morning-overview.webp" plain strong="What did last night give you?">
              <p>Set each morning, from Sleep, HRV and Resting State.</p>
              <p>63: &ldquo;Short night, HRV 12% below your usual. Take the morning easy.&rdquo;</p>
            </Item>
            <Item title="Form" visual="Stress climbing on iPhone" image="/figma-assets/waldo-cards/edge-phone-stress.webp" plain strong="What can you handle right now?">
              <p>Live all day, from Circadian, Motion and Stress.</p>
              <p>76: &ldquo;Steady. Stress rising since 1pm.&rdquo;</p>
            </Item>
            <Item title="Weight" visual="A full calendar, with Waldo's changes marked" image="/figma-assets/waldo-cards/edge-waldo-action-calendar.webp" plain strong="What is today asking of you?">
              <p>Live all day. Higher means heavier: meetings, messages, tasks and Load.</p>
              <p>84: &ldquo;Six meetings and a full inbox. A heavy one.&rdquo;</p>
            </Item>
          </Carousel>
        </Body>
        <Body>
          <FeatureList section="Health" features={HEALTH} />
          <p className="site-note" style={{ marginTop: 40 }}>
            Waldo uses health signals as context for planning your day. It isn&apos;t a medical device, and it doesn&apos;t
            diagnose anything.
          </p>
        </Body>
      </Section>

      {/* 2 · Day to day */}
      <Section id="day" size="auto">
        <Header
          label="Day to day"
          lines={["Done before", "you’re up."]}
          subtitle="Waldo reads your night, then rebuilds the day around it. The hard meeting moves, your best hours stay protected, and the inbox waits its turn."
          body="Most of it, you'll never see happen."
          center
        />
        <Body>
          {/* Was a table (When / What Waldo does / What it looks like). Same words: each one is now the message
              arriving on the lock screen at that time (components/site/day-moments.tsx). */}
          <Carousel label="Waldo through a day" loop>
            <Item
              meta="Morning"
              visual="The Brief arriving on the lock screen at 7:02"
              scene={<LockMoment day="Tuesday 6 October" time="7:02" title="The Brief" text="Rough night, about 5h 40m. Nudged your 9am to 10:30. The afternoon looks fine." />}
              strong="The Brief"
            />
            <Item
              meta="Morning"
              visual="The Window arriving on the lock screen at 7:15"
              scene={<LockMoment day="Tuesday 6 October" time="7:15" title="The Window" text="10:30–12:30 is your sharpest stretch. Blocked it." />}
              strong="The Window"
            />
            <Item
              meta="Before a big meeting"
              visual="Prep arriving on the lock screen at 1:25, before a board call"
              scene={<LockMoment day="Tuesday 6 October" time="1:25" title="Prep" text="Board call in 35 minutes. You're running lower than usual. Here are last time's open items." />}
              strong="Prep"
            />
            <Item
              meta="Afternoon"
              visual="The Heads-Up arriving on the lock screen at 2:40"
              scene={<LockMoment day="Tuesday 6 October" time="2:40" title="The Heads-Up" text="This Tuesday is shaping up like the last three. Moved your 4pm before it lands." />}
              strong="The Heads-Up"
            />
            <Item
              meta="Evening"
              visual="The Close arriving on the evening lock screen at 6:48"
              scene={<LockMoment day="Tuesday 6 October" time="6:48" title="The Close" text="Today: 3 things moved, 1 protected. Tomorrow looks lighter." evening />}
              strong="The Close"
            />
            <Item
              meta="End of week"
              visual="The Adjustment arriving on the lock screen on Friday at 4:10"
              scene={<LockMoment day="Friday 9 October" time="4:10" title="The Adjustment" text="22 hours of meetings this week. Friday afternoon cleared. Retro moved to Monday." />}
              strong="The Adjustment"
            />
          </Carousel>
        </Body>
        <Body>
          <FeatureList section="Day to day" features={DAY} />
        </Body>
      </Section>

      {/* 3 · Connectors (teaser): in a Stage, with every tool dropping into the box and heaping at its foot */}
      <Section id="connectors" size="auto">
        <Stage pile={<ConnectorPile />}>
          <Header
            label="Connectors"
            lines={["Already fluent", "in your tools."]}
            subtitle="Your watch, your calendar, your inbox, your tasks, and the agents you already pay for. Growing to 200+ tools across 27 categories."
            actions={{ primary: { label: "See every tool →", href: "/connectors" } }}
            center
          />
        </Stage>
      </Section>

      {/* 4 · Talk to Waldo */}
      <Section id="talk" size="auto">
        <Header
          label="Talk to Waldo"
          lines={["You don’t have to talk to it.", "But you can."]}
          subtitle="Waldo speaks first, but ask it anything, any time: “How did I sleep?” “When should I do the hard thing today?”"
          body="Talk to it on Telegram and the web today. WhatsApp and iPhone notifications are coming next."
          center
        />
        <Body>
          <FeatureList section="Talk to Waldo" features={TALK} />
        </Body>
      </Section>

      {/* 5 · Your rules */}
      <Section id="rules" size="auto">
        <Header
          label="Your rules"
          lines={["Review actions", "before they count."]}
          subtitle="You choose how far Waldo goes, area by area, and you can change it whenever you like."
          body="Every move is logged. One tap takes it back."
          actions={{ secondary: { label: "How we handle your data", href: "/privacy" } }}
          center
        />
        <Body>
          <FeatureList section="Your rules" features={RULES} />
        </Body>
      </Section>

      {/* 6 · What's coming */}
      <Section size="auto">
        <Header lines={["New tricks,", "coming soon."]} center />
        <Body>
          <FeatureList label="Coming later" section="What's coming" features={COMING} />
        </Body>
      </Section>

      {/* 7 · Close */}
      <Close
        lines={["Now you know.", "Let it work."]}
        body="You'll notice the difference, not the work."
        actions={{ primary: { label: "Let Waldo in →", href: "/waitlist" } }}
      />
    </SiteShell>
  );
}
