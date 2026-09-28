import type { Metadata } from "next";
import Link from "next/link";

import { Body, DraftNotice, Grid, Header, Item, List, Placeholder, Section, Table } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
import { SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/privacy.md (v1). Part A is the plain-language draft. Part B (legal policy)
// must be written by a lawyer before launch.

const DESCRIPTION = "What Waldo collects, why, who else touches it, and how to take it back.";

export const metadata: Metadata = {
  title: "Privacy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy | Waldo", description: DESCRIPTION, url: `${SITE_URL}/privacy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <Section size="auto">
        <Header
          as="h1"
          lines={["Your data,", "plainly."]}
          subtitle="What Waldo collects, why, who else touches it, and how to take it back. The legal version is further down, and it says the same thing in more words."
          body="The boundary is part of the product."
        />
        <DraftNotice>Draft. This page is being written and reviewed, and the legal policy below isn&apos;t final yet.</DraftNotice>
      </Section>

      <Section size="auto">
        <Header lines={["The short", "version."]} />
        <Body>
          <List
            items={[
              <><strong>You choose what Waldo connects to.</strong> Nothing connects on its own.</>,
              <><strong>From email and messages, Waldo reads the pattern, never the words:</strong> volume, timing, urgency.</>,
              <><strong>We never sell your data</strong> and never use it for ads.</>,
              <><strong>We don&apos;t train AI models on your data.</strong></>,
              <><strong>You can see it, download it and delete it,</strong> any time.</>,
            ]}
          />
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["Which Waldo", "are you using?"]} subtitle="Different parts of Waldo handle different data." />
        <Body>
          <Grid cols={4}>
            <Item title="Visiting this website">Almost nothing. No ad trackers, no analytics scripts.</Item>
            <Item title="On the waitlist">Your email, and where you found us.</Item>
            <Item title="Using Waldo (beta)">Only what you connect. See below.</Item>
            <Item title="Using Kennel for Mac">Kennel keeps its records on your Mac.</Item>
          </Grid>
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["The website", "and the waitlist."]} />
        <Body>
          <Table
            columns={["What", "Why", "Where it goes"]}
            rows={[
              ["Your email (if you join the waitlist)", "To let you in, and to send updates", "Loops, our email provider"],
              ["Where you came from (e.g. “from Kennel”)", "To know which links work", "Saved with your waitlist signup"],
              ["That you closed the cookie notice", "So it doesn't pop up again", "Your own browser only"],
            ]}
          />
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["Using Waldo:", "what it collects, and why."]} subtitle="Only from what you connect." />
        <Body>
          <Table
            columns={["Source", "What Waldo reads", "Why"]}
            rows={[
              ["Your watch (Apple Health, Health Connect)", "Sleep, heart rate, HRV, resting heart rate, breathing rate, blood oxygen, wrist temperature, steps, exercise, daylight", "To work out how you're doing (Recovery, Form, Weight)"],
              ["Calendar", "Event times, lengths, how packed your day is", "To plan around your day, and move or protect time if you allow it"],
              ["Email (Gmail)", "Metadata only: how many, when, whether they're waiting on you. Never the words.", "To notice when messages are piling up"],
              ["Tasks", "Task names, due dates, what's overdue", "To order your list by deadline and energy"],
              ["Location", "Roughly where you are", "For local weather and air quality"],
              ["What you tell Waldo", "Your messages to Waldo, your corrections, your preferences", "To answer you, and to remember what you've taught it"],
            ]}
          />
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["Who else", "touches it."]} subtitle="Waldo uses a few companies to run. They process data only to provide Waldo's service to you, not for their own purposes." />
        <Body>
          <Table
            columns={["Company", "What they do for Waldo", "What they see"]}
            rows={[
              ["Supabase", "Stores your account and data", "Everything above, encrypted"],
              ["Anthropic (Claude)", "Writes Waldo's messages and replies", "The context needed for each message"],
              ["Telegram (if you choose it)", "Delivers Waldo's messages to you", "The messages Waldo sends you"],
              ["Google (if you connect it)", "Calendar, Gmail metadata, Tasks", "Their own service, under your Google account"],
              ["Apple / Health Connect", "Where your health data comes from", "Their own service, on your phone"],
              ["Open-Meteo", "Weather", "A rough location, no identity"],
              ["Loops", "Waitlist and update emails", "Your email"],
              ["Vercel", "Hosts this website", "Normal web server logs"],
            ]}
          />
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["What we", "never do."]} />
        <Body>
          <List
            items={[
              "Sell your data, or use it for ads",
              "Read the words in your email or messages",
              "Use health data to make medical decisions. Waldo isn't a medical device.",
              "Share your health data with anyone else without your say-so",
              "Store your Apple Health data in iCloud",
            ]}
          />
        </Body>
        <Body>
          <Placeholder>
            <strong>How long we keep it, and where it&apos;s stored.</strong> Retention period, deletion timing and data
            region, once decided.
          </Placeholder>
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["Kennel", "for Mac."]} subtitle="Kennel is open source and runs on your Mac." />
        <Body>
          <List
            items={[
              "Kennel keeps its records on your Mac, in a folder you control (~/.kennel).",
              "Your agents work through your own accounts (Codex, Claude Code, Cursor and others), under those companies' terms.",
              "We don't receive your code or your project data.",
            ]}
          />
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["Your", "controls."]} />
        <Body>
          <Table
            columns={["You can…", "How"]}
            rows={[
              ["See what Waldo knows about you", "Settings → What Waldo knows"],
              ["Change or remove any of it", "Same place, tap an item"],
              ["Disconnect any tool", "Settings → Connections, or from that tool's own settings"],
              ["Download everything", "Settings → Your data → Export"],
              ["Delete your account and data", "Settings → Your data → Delete"],
            ]}
          />
        </Body>
        <Body>
          <p className="site-note">
            Step-by-step help is on the <Link href="/support">Support</Link> page. Waldo is for people 18 and over.
          </p>
        </Body>
      </Section>

      <Section size="auto">
        <Header label="Part B" lines={["Privacy", "Policy."]} subtitle="The legal version of everything above." />
        <Body>
          <Placeholder>
            <strong>Legal policy goes here, written and reviewed by a lawyer.</strong> It covers who we are, what we
            collect and why, the legal basis, sharing, international transfers, retention, security, your rights,
            children, automated decisions, cookies and local storage, changes, and contact and grievance officer. The
            outline and compliance checklist are in docs/website/pages/privacy.md.
          </Placeholder>
        </Body>
      </Section>
    </SiteShell>
  );
}
