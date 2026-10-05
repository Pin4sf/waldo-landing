import type { Metadata } from "next";

import { Body, Close, Grid, Header, Item, Section, Stage } from "@/components/site/blocks";
import { type Feature, FeatureList } from "@/components/site/feature-sheet";
import { Carousel } from "@/components/site/carousel";
import { ConnectorRows } from "@/components/site/connector-rows";
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
    line: "Counted over two weeks, not one night. “Tonight’s the night to pay it back.”",
    detail: [
      "Waldo keeps a running count of the sleep you’ve missed, weighted over the last 14 days, so one good night doesn’t hide a short week.",
      "When the debt builds, it plans around it: an earlier wind-down, a lighter morning, the hard task moved to when you’re fresher.",
    ],
    status: "today",
    image: "/figma-assets/waldo-cards/morning-phone-sleep-debt.webp",
  },
  {
    name: "Quiet flags",
    line: "Blood oxygen, breathing and wrist temperature, flagged gently when they drift.",
    detail: [
      "These sit in the background. Waldo compares each one with your own usual, and only mentions it when it drifts.",
      "A gentle flag, never an alarm, and never a diagnosis. If something worries you, talk to a doctor.",
    ],
    status: "today",
    image: "/figma-assets/waldo-cards/morning-phone-resting-state.webp",
  },
  {
    name: "Training",
    line: "Workouts and work share one calendar, so they get planned together.",
    detail: [
      "Waldo sees your training next to your meetings. After a hard session it knows you may have a sharp 90 minutes, and it offers them to the hard task.",
      "It can tell a racing heart on a run from a racing heart in a meeting, so a good workout never gets mistaken for a bad day.",
    ],
    status: "today",
  },
  {
    name: "Weather and daylight",
    line: "Heat, air quality and daylight where you are, factored into your day.",
    detail: [
      "Heat, UV and air quality where you are, plus how much daylight you’ve had. Waldo factors them into your plan, and tells you when a walk outside would help.",
      "There’s nothing to set up. It works from your rough location.",
    ],
    status: "today",
    image: "/figma-assets/waldo-cards/edge-circadian-context.webp",
  },
  {
    name: "Your history",
    line: "Every past day as a coloured dot. Tap one to see it in full.",
    detail: [
      "Look back 7, 30 or 90 days. Each day is a dot, coloured by how it went. Tap one to see how you slept, what the day asked of you, and what Waldo did about it.",
    ],
    status: "today",
  },
  {
    name: "Bring your past",
    line: "Import your Apple Health history, so Waldo knows you from day one.",
    detail: [
      "Your watch has been collecting for years. Import that history, and Waldo starts with your real usual instead of a blank page.",
      "It knows you from day one, not week three.",
    ],
    status: "today",
  },
];

const DAY: Feature[] = [
  {
    name: "Your best hours",
    line: "Learns when you’re sharpest, and keeps invites out of that window.",
    detail: [
      "Waldo learns when you do your best work and when you need slack, then shapes your calendar around it.",
      "When an invite lands in your sharpest window, it suggests another time. “This invite lands in your sharpest window. Suggest 3pm instead?”",
    ],
    status: "next",
  },
  {
    name: "The right task, at the right time",
    line: "Hard things land when you’re fresh. Deadlines never slip.",
    detail: [
      "Your list is ordered by what’s due and by how much you’ve got in you. The hardest thing goes to your sharpest hour.",
      "On a low day, big tasks get broken into small chunks. Anything due today stays put, even on a rough one.",
    ],
    status: "today",
  },
  {
    name: "Fewer pings",
    line: "Watches how much is coming at you, never what it says. Email in two blocks, Slack on Focus.",
    detail: [
      "Waldo reads volume, timing and urgency, never the words. When messages spike and your stress climbs with them, it offers to go quiet for a while.",
      "It can batch email into two blocks a day, and set Slack to Focus while you work.",
    ],
    status: "next",
  },
  {
    name: "Fixed first, mentioned after",
    line: "The Patrol runs overnight too. It fixes what it can within your limits, and asks about the rest.",
    detail: [
      "The Patrol runs around the clock. When something looks off, like two meetings overlapping, Waldo fixes it if your limits allow, and tells you after. With an undo.",
      "If it can’t fix something, it comes to you with options. If something is only worth watching, it watches.",
    ],
    status: "today",
    image: "/waldo-web-assets/agent-features/overnight-patrol.webp",
  },
  {
    name: "Patterns",
    line: "Single spots join into named patterns, like “The Tuesday Crash,” and what Waldo does about it.",
    detail: [
      "One observation is a Spot: “Emails after 10pm, and your sleep is 8% worse.” Enough Spots join into a named pattern, along with what Waldo now does about it.",
      "Six weeks of Tuesdays that looked ordinary, until they didn’t. You were too close to see it. Waldo wasn’t.",
    ],
    status: "next",
    image: "/waldo-web-assets/constellation/tuesday-crash-constellation.webp",
  },
  {
    name: "The Slope",
    line: "Today against four weeks ago, across six dimensions.",
    detail: [
      "Recovery, Form, Weight, your meeting load, message pressure and task pileup, each set against where it was a month ago. “Four of six are better than a month ago.”",
      "When most of them slide at once, Waldo tells you it’s time to ease off.",
    ],
    status: "next",
  },
];

const TALK: Feature[] = [
  {
    name: "Threads",
    line: "Separate conversations for separate things, one tap to switch.",
    detail: ["One thread for the week ahead, one for training, one for that trip. Each keeps its own context, and one tap moves between them."],
    status: "today",
  },
  {
    name: "Follow up on anything",
    line: "“Tell me more” on any Brief opens a thread about that exact message.",
    detail: ["Every Brief and every Fetch has a “Tell me more.” Tap it, and a thread opens about that message, with the context already there."],
    status: "next",
    image: "/waldo-web-assets/agent-features/context-thread.webp",
  },
  {
    name: "Quick replies",
    line: "Suggested answers, so you tap instead of type.",
    detail: ["Under Waldo’s messages sit a few likely answers, like “Tell me more” or “What should I do?”. Tap one, or type your own."],
    status: "today",
  },
  {
    name: "Charts in replies",
    line: "A small visual inside the answer when a number needs showing.",
    detail: ["Ask how you slept, and the answer comes with a small chart inside it. A picture where it helps, never a dashboard to go and read."],
    status: "today",
  },
  {
    name: "Full history",
    line: "Every conversation, kept and scrollable.",
    detail: ["Everything you and Waldo have said is kept, so you can scroll back to what it told you last Tuesday, and why."],
    status: "today",
  },
  {
    name: "Thumbs up, thumbs down",
    line: "Every rating teaches Waldo what’s actually useful to you.",
    detail: ["Rate any message. Waldo learns what’s worth telling you, and what to leave out next time."],
    status: "today",
  },
];

const RULES: Feature[] = [
  {
    name: "Three levels, per area",
    line: "“Just do it” for your calendar. “Ask me” for anything that goes to other people.",
    detail: [
      "Tell me, Ask me or Just do it, set separately for each part of your life. Waldo only acts as far as you’ve allowed in that area.",
      "Change any of them whenever you like.",
    ],
    status: "today",
  },
  {
    name: "Always comes back to you",
    line: "A short list of things Waldo never does on its own.",
    detail: ["Whatever level you’ve set, some things always come to you first."],
    status: "today",
  },
  {
    name: "The activity log",
    line: "Everything Waldo did, and chose not to do, with one-tap undo.",
    detail: [
      "Every move is written down with the reason for it, including the things Waldo noticed and decided to leave alone.",
      "Anything it changed can be undone with one tap.",
    ],
    status: "today",
  },
  {
    name: "Say it once",
    line: "People, preferences and corrections stick. See and change every one.",
    detail: [
      "“Priya is your lead investor. Keep it short, send numbers first.” “No meetings before 10.” Tell Waldo once, and it remembers.",
      "Everything it knows about you is listed in one place, where you can change or remove any of it.",
    ],
    status: "today",
  },
  {
    name: "Your schedule",
    line: "Wake time, quiet hours, and which of The Brief, The Fetch and The Close run.",
    detail: [
      "Set your wake time and when the evening check-in arrives. Turn The Brief, The Fetch or The Close on or off, one by one.",
      "Quiet hours, when Waldo stays silent, are coming next.",
    ],
    status: "today",
  },
  {
    name: "Yours, always",
    line: "Export everything any time. Delete your account, and it’s gone.",
    detail: [
      "Download everything Waldo holds about you, whenever you want. Delete your account, and your data goes with it.",
      "It’s encrypted when stored and when it moves. The full detail is on the Privacy page.",
    ],
    status: "today",
  },
];

const COMING: Feature[] = [
  {
    name: "Voice",
    line: "Ask out loud. Hear it back.",
    detail: ["Hold the mic and ask. Waldo can read your Brief out loud too."],
    status: "planned",
  },
  {
    name: "Your own routines",
    line: "Write a routine once, and Waldo runs it on schedule.",
    detail: ["“Every Sunday evening, tell me how next week looks.” Write it once, and Waldo runs it on schedule."],
    status: "planned",
  },
  {
    name: "Tomorrow, today",
    line: "Waldo forecasts how tomorrow looks tonight.",
    detail: ["The night before, Waldo tells you how tomorrow is likely to feel, while there’s still time to change it."],
    status: "planned",
  },
  {
    name: "Other agents ask Waldo",
    line: "The tools you use check how you’re doing before they act for you.",
    detail: ["Your other agents will be able to ask Waldo how you’re doing, and plan around it, before they act on your behalf."],
    status: "planned",
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
          <FeatureList section="Health" features={HEALTH} center />
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
          <FeatureList section="Day to day" features={DAY} center />
        </Body>
      </Section>

      {/* 3 · Connectors (teaser): in a Stage, with the homepage's drifting tool tiles rising out of it */}
      <Section id="connectors" size="auto">
        <Stage
          picture={
            <div className="site-stage-scene" data-visual="Every tool Waldo works with, drifting past in rows">
              <ConnectorRows />
            </div>
          }
        >
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
          <FeatureList section="Talk to Waldo" features={TALK} center />
        </Body>
      </Section>

      {/* 5 · Your rules */}
      <Section id="rules" size="auto">
        <Header
          label="Your rules"
          lines={["Nothing happens", "that you can’t undo."]}
          subtitle="You choose how far Waldo goes, area by area, and you can change it whenever you like."
          body="Every move is logged. One tap takes it back."
          actions={{ secondary: { label: "How we handle your data", href: "/privacy" } }}
          center
        />
        <Body>
          <FeatureList section="Your rules" features={RULES} center />
        </Body>
      </Section>

      {/* 6 · What's coming */}
      <Section size="auto">
        <Header lines={["New tricks,", "coming soon."]} center />
        <Body>
          <FeatureList label="Coming later" section="What's coming" features={COMING} center />
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
