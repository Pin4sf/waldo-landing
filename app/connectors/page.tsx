import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AgentHandoff } from "@/components/site/agent-handoff";
import { AccountsSplit } from "@/components/site/accounts-split";
import { Body, Header, Item, Section, Stage } from "@/components/site/blocks";
import { Carousel } from "@/components/site/carousel";
import { ConnectorMorning } from "@/components/site/connector-morning";
import { ConnectorRequestForm } from "@/components/site/connector-request-form";
import { ConnectorStatusList } from "@/components/site/connector-status-list";
import { availability, countOf } from "@/components/site/connector-tools";
import { UseBody, UseCalendar, UseInbox, UseNotes, UseTasks, UseWeather, UseWork } from "@/components/site/connector-uses";
import { KeyWindow } from "@/components/site/key-window";
import { PutToWork } from "@/components/site/put-to-work";
import { SiteShell } from "@/components/site/site-shell";
import { ToolTalk } from "@/components/site/tool-talk";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/connectors.md ("Live copy" at the top)
// Rebuilt 2026-10-09 (docs/website/sessions/2026-10-09.md): one idea per section, each shown as the tools
// themselves before and after Waldo. The jobs section follows claude.com/product/overview's "Put Claude to work".

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

/** A use case's words: the first line in ink, the rest in grey, then which tools it works with, in plain words */
function Use({ strong, children, tools, extra }: { strong: string; children: ReactNode; tools: string[]; extra?: string }) {
  return (
    <>
      <p>
        <strong>{strong}</strong> {children}
      </p>
      <p className="cn-works">
        {availability(tools)}
        {extra ? ` ${extra}` : null}
      </p>
    </>
  );
}

export default function ConnectorsPage() {
  return (
    <SiteShell>
      {/* 0 · Opening, and one morning: what Waldo read, and what he did about it */}
      <Section size="open">
        <Header
          as="h1"
          lines={["Connect it once.", "Waldo takes it from there."]}
          subtitle="Your watch, your calendar, your inbox, your tasks, and the agents you already use. Connect them once, and Waldo reads what each one knows about your day, then acts on it."
          center
        />
        <ConnectorMorning />
      </Section>

      {/* 1 · What Waldo does with each kind of tool: the tool itself, before and after */}
      <Section size="auto">
        <Header
          lines={["Reads what it needs.", "Nothing more."]}
          subtitle="Every tool gives Waldo one piece of your day. Here's exactly which piece, and what Waldo does with it."
          center
        />
        <Body>
          <Carousel label="What Waldo does with each kind of tool" loop>
            <Item meta="Your watch" visual="Last night's sleep in Apple Health, and Waldo's read on it" scene={<UseBody />}>
              <Use strong="It knows how you slept. Waldo acts on it." tools={["Apple Watch", "Health Connect", "Oura", "WHOOP", "Garmin"]}>
                Waldo reads sleep, heart rate, HRV, stress and movement, works out Recovery, Form and Weight, and spots when you&apos;re running low.
              </Use>
            </Item>
            <Item meta="Your calendar" visual="A Tuesday in Google Calendar: the design review moves from 9:30 to 11:30" scene={<UseCalendar />}>
              <Use strong="Your day bends around how you are." tools={["Google Calendar", "Outlook", "Apple Calendar", "Calendly"]}>
                Waldo reads meetings, gaps, back-to-backs and late nights, then moves, blocks and protects time, within your limits.
              </Use>
            </Item>
            <Item meta="Your inbox and messages" visual="A Gmail inbox: two messages come through, 36 fold into a batch for 11:30" scene={<UseInbox />}>
              <Use strong="Your inbox waits for a better moment." tools={["Gmail", "Telegram", "Slack", "WhatsApp"]}>
                Waldo batches your inbox, goes quiet when it&apos;s too much, and flags what needs you. Email access depends on the permissions you grant.
              </Use>
            </Item>
            <Item meta="Your tasks" visual="Today's task list reorders: the proposal first, three tasks move to Thursday" scene={<UseTasks />}>
              <Use strong="Your list, in an order you can actually do." tools={["Google Tasks", "Todoist", "Microsoft To Do", "Linear", "Asana"]}>
                Waldo reads due dates and what&apos;s piling up, then reorders by deadline and energy and breaks big tasks down.
              </Use>
            </Item>
            <Item meta="Your notes and files" visual="Two documents become three lines before a 2pm client call" scene={<UseNotes />}>
              <Use strong="The context, before you ask for it." tools={["Notion", "Google Drive", "Dropbox", "Granola"]}>
                Waldo reads the documents you point it to and pulls them together before you need them, so you don&apos;t re-explain.
              </Use>
            </Item>
            <Item meta="Your work tools" visual="Reviews, comments and issues scattered through the day gather into one hour at 4pm" scene={<UseWork />}>
              <Use strong="What waits on you, in one sitting." tools={["GitHub", "Figma", "Linear", "HubSpot", "Jira"]}>
                Waldo reads reviews, comments and pipeline pressure, then batches them into your focus time instead of scattering them across the day.
              </Use>
            </Item>
            <Item meta="Weather and travel" visual="Tomorrow's heat peaks at 1pm, so the 12:30 run moves to 7am" scene={<UseWeather />}>
              <Use strong="Heat, light and travel, with nothing to set up." tools={["Weather", "Location"]} extra="Nothing to connect.">
                Waldo reads the weather, air quality and roughly where you are, and factors them into your day.
              </Use>
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 2 · Built for your work: a job's day, moment by moment (after claude.com/product/overview) */}
      <Section size="auto">
        <Header
          lines={["Pick your job.", "The tools follow."]}
          subtitle="Pick your profession and Waldo starts with the tools and routines people like you rely on, then adjusts to you."
          body="Starts where you already are."
          center
        />
        <Body>
          <PutToWork />
        </Body>
      </Section>

      {/* 3 · Every account */}
      <Section size="auto">
        <Header
          lines={["Work Gmail. Personal Gmail.", "Waldo knows which."]}
          subtitle="Connect more than one account for the same tool, and Waldo keeps them straight. Work stays work. Personal stays personal."
          body="Two inboxes. One Waldo."
          center
        />
        <Body>
          <AccountsSplit />
          <div className="ax-rules">
            <p>
              <strong>Work.</strong> Handled during work hours, batched into two blocks a day.
            </p>
            <p>
              <strong>Personal.</strong> Never touched during work hours.
            </p>
          </div>
        </Body>
      </Section>

      {/* 4 · Agents are tools too */}
      <Section size="auto">
        <Stage picture={<AgentHandoff />}>
          <Header
            lines={["Your agents,", "on the same team."]}
            subtitle="Codex, Claude Code, Cursor and the rest do the work. Waldo gives them your context and checks what they deliver. Working today, in Kennel's open beta."
            body="Soon, your agents will be able to ask Waldo how you're doing before they act for you."
            actions={{ secondary: { label: "See how Kennel runs them", href: "/kennel" } }}
            center
          />
        </Stage>
      </Section>

      {/* 5 · You hold the keys */}
      <Section size="auto">
        <Header lines={["Connect anything.", "Disconnect anytime."]} body="Your keys. Your call." actions={{ secondary: { label: "Full detail", href: "/privacy" } }} center />
        <Body>
          <KeyWindow />
        </Body>
      </Section>

      {/* 6 · Missing a tool? With every tool's status folded away above the form */}
      <Section id="request" size="auto">
        <Header
          lines={["Don’t see yours?", "Tell us."]}
          body={`${countOf("today")} tools work today and ${countOf("next")} are coming next, growing to 200+ across 27 categories. The most-asked get built first.`}
          center
        />
        <Body>
          <ConnectorStatusList />
          <ConnectorRequestForm />
        </Body>
      </Section>

      {/* 7 · Close: the shared close box, with the tools talking only through Waldo under the button */}
      <Section size="auto">
        <div className="site-stage site-stage--close">
          <Header lines={["Your tools don’t talk", "to each other. Waldo does."]} actions={{ primary: { label: "Let Waldo in →", href: "/waitlist" } }} center />
          <ToolTalk />
        </div>
      </Section>
    </SiteShell>
  );
}
