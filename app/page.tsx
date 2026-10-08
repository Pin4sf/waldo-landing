import type { Metadata } from "next";
import Link from "next/link";

import { AgentsChat } from "@/components/site/agents-chat";
import { ConnectorRows } from "@/components/site/connector-rows";
import {
  DesignerFigma,
  EngineerCli,
  FounderWhatsApp,
  InvestorWatch,
  SalesSlack,
} from "@/components/site/hats-scenes";
import { LearningWeeks } from "@/components/site/learning-weeks";
import {
  Body,
  Header,
  Item,
  Questions,
  Section,
} from "@/components/site/blocks";
import { Carousel } from "@/components/site/carousel";
import { SeeSection } from "@/components/site/see/see-section";
import { SiteShell } from "@/components/site/site-shell";
import { LiveClose } from "@/components/site/live-close";
import { MemoryMap } from "@/components/site/memory-map";
import { TrustWindow } from "@/components/site/trust-window";
import { WaldoLoop } from "@/components/site/waldo-loop";
import {
  OG_DESCRIPTION,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site-metadata";

// Copy: docs/website/pages/home.md ("Live copy" at the top)

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

const announcement = (
  <div className="site-container">
    <p>
      <strong>Kennel for Mac is now open source.</strong>{" "}
      <span>
        It understands your build, and takes your agent outputs to the intended
        outcome. <Link href="/kennel">Get now →</Link>
      </span>
    </p>
  </div>
);

export default function Home() {
  return (
    <SiteShell home announcement={announcement}>
      {/* 2 · Hero. One screen: the phone with the Overview card is what you find below it. */}
      <div className="site-hero">
        <Section size="screen">
          <Header
            as="h1"
            lines={["Life happens.", "Waldo handles it."]}
            subtitle={
              <>
                A personal assistant that meets all needs
                <br />
                for life, work and health; with nothing hidden.
              </>
            }
            actions={{
              primary: { label: "Let Waldo in →", href: "/waitlist" },
              secondary: { label: "See how it works", href: "/how-it-works" },
            }}
          />
          <WaldoLoop />
        </Section>
      </div>

      {/* 2b · Every tool, handled: five cards (the last two moved up from the removed "Agents do tasks" section). Swapped with "What you see of it" on 2026-10-04: it now follows the hero. */}
      <Section>
        <Header
          lines={["You can’t keep up", "with everything. Waldo can."]}
          center
        />
        <Body>
          <Carousel label="What you're carrying" loop>
            <Item
              visual="Months of health data in a watch and a recovery app, and nothing acting on it"
              image="/assets/home/problem/watch-recovery.svg"
              plain
              strong="Your health data is huge. Almost none of it gets used."
            >
              Months of sleep, heart rate and recovery sit in your watch, WHOOP
              or Oura, in breakdowns most of us never learn to apply. Pasting a
              few readings into a chat never compounds. Waldo reads all of it,
              every day, and turns it into a plan.
            </Item>
            <Item
              visual="You, spread across accounts, apps and agents"
              scene={<ConnectorRows />}
              strong="Every tool needs teaching. None knows the day you’re having."
            >
              You spend hours telling each tool and AI who you are, and it still
              falls short. They&apos;re built for a normal day. On no food, little
              sleep and back-to-back meetings, nothing connects the dots. Waldo
              does, and fixes the cause, not the symptom.
            </Item>
            <Item
              visual="An agent's finished work, waiting on you to review it"
              image="/assets/home/problem/agent-diffs.svg"
              plain
              strong="Chat AI writes walls of text you can’t review."
              link={{ label: "This is where Kennel starts →", href: "/kennel" }}
            >
              Its memory is gone when you change chats, you can&apos;t add all your
              context by hand, and each one locks you into its own ecosystem. It
              waits to be asked, with no consumer app on top. Waldo remembers
              across everything, speaks up when it matters, and works with every
              agent.
            </Item>
            <Item
              visual="A text thread with Waldo: you name the agents in the message, he answers in one line"
              scene={<AgentsChat />}
              strong="Text agents run where you can’t see."
            >
              Your data is processed online, with no way to see how, and nothing
              you control. Waldo shows what he can access and what he does, and
              lets you take access back.
            </Item>
            <Item
              visual="The same Tuesday over three weeks: Waldo asks, then suggests, then just does it, as he learns you"
              scene={<LearningWeeks />}
              strong="Everyone’s day has its own rhythm."
            >
              Busy people either spend real time working out what to do when, or
              let things happen. Waldo learns your rhythm, tells a rough day from
              an easy one and plans around it. He looks after your day the way a
              considerate person would.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 3 · What you see of it (after "Every tool, handled" since 2026-10-04): five views of the hero's story, a carousel with no end and no heading
          (docs/website/what-you-see-plan.md) */}
      <Section size="auto">
        <SeeSection />
      </Section>

      {/* 4 · Who it's for */}
      <Section>
        <Header
          lines={["Same Waldo.", "Different hats."]}
          subtitle="The same Waldo, in the place each of them already works. He reads the tools they already use, and tells you where each answer came from."
          center
        />
        <Body>
          <Carousel label="Who Waldo works for" loop>
            <Item
              title="Founders"
              visual="A founder travelling, sending Waldo a photo, a voice note and a clip in WhatsApp, and Waldo answering with the tools he read: Google Calendar, Apple Health, Granola and Gmail"
              scene={<FounderWhatsApp />}
            >
              Three calls back to back, then the co-founder sync. Waldo reads
              your sleep in Apple Health, your day in Google Calendar and what
              was said in Granola, then puts ten minutes of air before the sync,
              so the snappy reply never happens.
            </Item>
            <Item
              title="Engineers"
              visual="An engineer asking Waldo from the terminal, with a screenshot and a screen recording, and Waldo answering with the tools he read: GitHub, Oura, Vercel and Linear"
              scene={<EngineerCli />}
            >
              Waldo reads your wearable for the hour you&apos;re sharpest, and
              GitHub, Vercel and Linear for what is actually blocking you. That
              hour goes to the hard problem. Standup moves somewhere else.
            </Item>
            <Item
              title="Investors"
              visual="An investor sending Waldo a voice note and a slide from an Apple Watch, and Waldo answering with the tools he read: Calendly, Oura and Stripe"
              scene={<InvestorWatch />}
            >
              Waldo reads the day&apos;s pitches in Calendly and your recovery
              from your wearable, then spaces them to what you can actually
              give. He checks the deck against the latest numbers, so the
              founder at pitch five gets your pitch-one attention.
            </Item>
            <Item
              title="Designers"
              visual="A designer leaving Waldo a comment on a frame in Figma, with a screenshot, and him answering under it with the tools he read: Google Calendar, Oura and Notion"
              scene={<DesignerFigma />}
            >
              The crit is at 3 and the empty states aren&apos;t done. Waldo
              reads your calendar, your client brief in Notion and your clearest
              hours, then gives you those hours before the crit and moves the
              review back.
            </Item>
            <Item
              title="Sales"
              visual="A salesperson sending Waldo a voice clip and a screenshot of the pipeline in a Slack message, and Waldo answering with the tools he read: Oura, HubSpot, Google Calendar and Apple Health"
              scene={<SalesSlack />}
            >
              Waldo reads your pipeline in HubSpot, your calendar and your best
              hours, and puts the most important call in the strongest one. The
              follow-up is drafted in Gmail before you hang up.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 5 · Trust: one box, the heading in it, and one app window rising out of its foot that holds what Waldo can
          see, do and keep and where it goes (docs/website/trust-carousel-review.md) */}
      <Section size="auto">
        <div className="tv">
          <Header
            lines={["Your context.", "Your call."]}
            subtitle="What he can access. What he can do. What he keeps."
            actions={{ secondary: { label: "Read the Privacy page", href: "/privacy" } }}
            center
          />
          <TrustWindow />
        </div>
      </Section>

      {/* 5b · Learns: one box, the heading in it, and the Spots and Constellations map to use: tap a spot or a pattern,
          drag to look around, step through the weeks (docs/website/pages/home.md, "Longer he learns") */}
      <Section size="auto">
        <MemoryMap>
          <Header
            lines={["Longer he learns,", "smarter he gets."]}
            body="Months in, Waldo gets to know you, more than you do. It finds the patterns. Shows how you can compound. No tool has all of it."
            center
          />
        </MemoryMap>
      </Section>

      {/* 6 · Questions */}
      <Section size="auto">
        <Header lines={["You’re going to", "ask these."]} />
        <Body>
          <Questions
            groups={[
              {
                items: [
                  {
                    q: "How is Waldo different from ChatGPT or Claude?",
                    a: "They answer when you ask. Waldo works toward an outcome, uses tools like them to get there, and comes back when it's done, or when it genuinely needs you.",
                  },
                  {
                    q: "How is it different from WHOOP or Oura?",
                    a: "They show you your data. Waldo does something with it. WHOOP tells you your recovery is low. Waldo already moved your morning.",
                  },
                  {
                    q: "Do I have to set everything up?",
                    a: "No. Connect what you already use. Waldo brings your context into every tool it works with, so you don't explain yourself twice.",
                  },
                  {
                    q: "What if Waldo gets it wrong?",
                    a: "Undo it in one tap. Waldo learns from every correction, and the first week is mostly it learning you.",
                  },
                  {
                    q: "Do I need a smartwatch?",
                    a: "It helps, since that's how Waldo knows how you're doing. Apple Watch, Oura, WHOOP, Garmin and Fitbit all work. Without one, Waldo leans on your calendar, work and patterns.",
                  },
                  {
                    q: "What can I use today?",
                    a: "Kennel for Mac is in open beta now. iPhone and messaging come next, and people on the list get in first.",
                  },
                ],
              },
            ]}
          />
        </Body>
        <Body>
          <Link href="/support" className="site-link">
            More questions →
          </Link>
        </Body>
      </Section>

      {/* 7 · Close: the live build's hero section, copied as it is (components/site/live-close.tsx) */}
      <LiveClose />
    </SiteShell>
  );
}
