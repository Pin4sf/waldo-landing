import type { Metadata } from "next";

import { Body, Grid, Header, Item, List, Section, Table, Visual } from "@/components/site/blocks";
import { ConnectorCounts, ConnectorDirectory } from "@/components/site/connector-directory";
import { ConnectorRequestForm } from "@/components/site/connector-request-form";
import { SiteShell } from "@/components/site/site-shell";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/connectors.md ("Live copy" at the top)

const DESCRIPTION = "Every tool Waldo works with, what it reads from each, and what it can change. Honest status for every one.";

export const metadata: Metadata = {
  title: "Connectors",
  description: DESCRIPTION,
  alternates: { canonical: "/connectors" },
  openGraph: {
    title: "Connectors | Waldo",
    description: DESCRIPTION,
    url: `${SITE_URL}/connectors`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
};

export default function ConnectorsPage() {
  return (
    <SiteShell>
      {/* 0 · Hero */}
      <Section size="auto">
        <Header
          as="h1"
          lines={["Connect it once.", "Waldo takes it from there."]}
          subtitle="Your watch, your calendar, your inbox, your tasks, and the agents you already use. Here's everything Waldo works with, and what it does with each."
          body={[<ConnectorCounts key="counts" />, "Start with one. Add the rest when you're ready."]}
        />
      </Section>

      {/* 1 · Directory */}
      <Section size="auto">
        <ConnectorDirectory />
      </Section>

      {/* 2 · What Waldo does with them */}
      <Section size="auto">
        <Header
          lines={["Reads what it needs.", "Nothing more."]}
          subtitle="Every tool gives Waldo one piece of your day. Here's exactly which piece, and what Waldo does with it."
        />
        <Body>
          <Table
            columns={["Type of tool", "Waldo reads", "Waldo does"]}
            rows={[
              ["Body", "Sleep, heart rate, HRV, stress, movement", "Works out Recovery, Form and Weight. Spots when you're running low."],
              ["Calendar", "Meetings, gaps, back-to-backs, late nights", "Moves, blocks and protects time, within your limits"],
              ["Mail & messages", "Volume, timing, urgency. Never the words.", "Batches your inbox, goes quiet when it's too much, flags what needs you"],
              ["Tasks & projects", "Due dates, overdue items, what's piling up", "Reorders by deadline and energy, breaks big tasks down"],
              ["Notes & files", "Documents you point it to", "Pulls context together, so you don't re-explain"],
              ["Engineering", "Reviews waiting on you, ticket load", "Batches reviews into your focus time, updates tickets"],
              ["Design", "Comments waiting on you", "Sorts feedback before crit"],
              ["Sales & support", "Pipeline and queue pressure", "Spaces your calls, flags what's urgent"],
              ["Money", "Business numbers. Read only.", "Drafts your investor update"],
              ["Music", "The mood of what you play, not a list of songs", "Adds one more clue to how you're doing"],
              ["Agents", "Their work and results", "Gives them your context, checks their work (via Kennel)"],
              ["Automatic", "Weather, air quality, your location", "Factors heat, light and travel into your day. No setup."],
            ]}
          />
        </Body>
      </Section>

      {/* 3 · Every account */}
      <Section size="auto">
        <Header
          lines={["Work Gmail. Personal Gmail.", "Waldo knows which."]}
          subtitle="Connect more than one account for the same tool, and Waldo keeps them straight. Work stays work. Personal stays personal."
          body="Two inboxes. One Waldo."
        />
        <Body>
          <Grid cols={2}>
            <Item title="Work" visual="Gmail card: Connected as you@work.com" strong="Connected as you@work.com">
              Handled during work hours, batched into two blocks a day.
            </Item>
            <Item title="Personal" visual="Gmail card: Connected as you@gmail.com" strong="Connected as you@gmail.com">
              Never touched during work hours.
            </Item>
          </Grid>
        </Body>
      </Section>

      {/* 4 · Built for your work */}
      <Section size="auto">
        <Header
          lines={["Pick your job.", "The tools follow."]}
          subtitle="Pick your profession and Waldo starts with the tools and routines people like you rely on, then adjusts to you."
          body="Starts where you already are."
        />
        <Body>
          <Visual wide label="Professions, each with the tools that light up for it" src="/build/professions-illustration.svg" />
        </Body>
        <Body>
          <Table
            columns={["Profession", "Tools that light up", "Example routine"]}
            rows={[
              ["Founders", "Slack, Linear, Gmail, Stripe, HubSpot", "“Friday investor update, drafted from your numbers, Linear and your calendar.”"],
              ["Engineers", "GitHub, Linear, Jira, Vercel, Slack", "“Reviews waiting on you, batched into your morning focus block.”"],
              ["Investors", "Gmail, Calendar, Zoom, Calendly", "“Notes pulled together before every founder call.”"],
              ["Designers", "Figma, Notion, Slack", "“Figma comments sorted before crit.”"],
              ["Consultants", "Outlook, Zoom, Asana, Calendly", "“Client calls spaced so none gets the tired you.”"],
              ["Athletes", "Strava, Garmin, WHOOP, Oura", "“Training load and work load, balanced on one calendar.”"],
            ]}
          />
        </Body>
      </Section>

      {/* 5 · Agents are tools too */}
      <Section size="auto">
        <Header
          lines={["Your agents,", "on the same team."]}
          subtitle="Codex, Claude Code, Cursor and the rest do the work. Waldo gives them your context and checks what they deliver. Working today, in Kennel's open beta."
          body="Soon, your agents will be able to ask Waldo how you're doing before they act for you."
          actions={{ secondary: { label: "See how Kennel runs them", href: "/kennel" } }}
        />
      </Section>

      {/* 6 · You hold the keys */}
      <Section size="auto">
        <Header lines={["Connect anything.", "Disconnect anytime."]} body="Your keys. Your call." actions={{ secondary: { label: "Full detail", href: "/privacy" } }} />
        <Body>
          <List
            items={[
              <><strong>You approve every tool.</strong> Nothing connects on its own.</>,
              <><strong>Read only, unless you say so.</strong> Each tool shows whether Waldo can change anything there.</>,
              <><strong>Words stay private.</strong> From email and messages, Waldo reads volume and timing, never what&apos;s written.</>,
              <><strong>One tap to disconnect.</strong> What Waldo learned from that tool goes with it.</>,
            ]}
          />
        </Body>
      </Section>

      {/* 7 · Missing a tool? */}
      <Section id="request" size="auto">
        <Header lines={["Don’t see yours?", "Tell us."]} body="The most-asked get built first." />
        <Body>
          <ConnectorRequestForm />
        </Body>
      </Section>

      {/* 9 · Close */}
      <Section>
        <Header
          lines={["Your tools don’t talk", "to each other. Waldo does."]}
          actions={{ primary: { label: "Let Waldo in →", href: "/waitlist" } }}
        />
      </Section>
    </SiteShell>
  );
}
