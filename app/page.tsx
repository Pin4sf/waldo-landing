import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { AgentsChat } from "@/components/site/agents-chat";
import { ConnectorRows } from "@/components/site/connector-rows";
import {
  EngineerCli,
  FounderWhatsApp,
  InvestorWatch,
} from "@/components/site/hats-scenes";
import { LearningWeeks } from "@/components/site/learning-weeks";
import {
  Body,
  Header,
  Item,
  List,
  Questions,
  Section,
} from "@/components/site/blocks";
import { Carousel } from "@/components/site/carousel";
import { SeeSection } from "@/components/site/see/see-section";
import { ConsoleTour } from "@/components/site/console-tour";
import { type Feature, FeatureList } from "@/components/site/feature-sheet";
import { SiteShell } from "@/components/site/site-shell";
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

const CONTROLS: Feature[] = [
  {
    name: "Autonomy",
    line: "Three stages. Pick one, and move it anytime.",
    detail: [
      <Fragment key="tell">
        <strong>Tell me.</strong> Waldo says what it would do, and waits. Nothing changes until you say so.
      </Fragment>,
      <Fragment key="ask">
        <strong>Ask me.</strong> Waldo drafts the move, you approve it. Skip one and nothing is sent.
      </Fragment>,
      <Fragment key="do">
        <strong>Just do it.</strong> Waldo acts, logs what it did, and you can undo anything in one tap.
      </Fragment>,
    ],
  },
  {
    name: "Only what you connect",
    line: "Waldo reaches the tools you allow, and nothing else.",
    detail: ["Every connection is listed in the console, with what Waldo can reach through it."],
  },
  {
    name: "Metadata, not messages",
    line: "Volume, timing and urgency. Never what your messages say.",
    detail: ["Waldo uses how many, how often and how urgent to plan your day. The words in your messages stay private."],
  },
  {
    name: "Health is context",
    line: "It shapes your day. It never makes medical decisions.",
    detail: [
      "Sleep and stress help Waldo decide what to move and what to protect. They feed a plan for your day, not a diagnosis, and Waldo gives no medical advice.",
    ],
  },
  {
    name: "Never sold, never trained on",
    line: "Your data stays yours.",
    detail: [
      "Waldo does not sell your data, train on it or share it with third parties. It is encrypted at rest and in transit.",
    ],
  },
];

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

      {/* 2b · What you see of it: five views of the hero's story, a carousel with no end and no heading
          (docs/website/what-you-see-plan.md) */}
      <Section size="auto">
        <SeeSection />
      </Section>

      {/* 3 · The problem */}
      <Section>
        <Header
          lines={["Co-ordinating your data with AI", "shouldn’t be your job."]}
          subtitle="More apps, more agents, more data about you. All of it still waits on you to read it, brief it, check it and decide."
        />
        <Body>
          <Carousel label="What you're carrying">
            <Item
              visual="Health data piling up across apps, and nothing acting on it"
              image="/assets/home/problem/watch-recovery.svg"
              plain
              strong="Your watch knows. Nothing acts."
            >
              It knows you slept five hours and your stress is up. Your calendar
              still has four meetings before noon.
            </Item>
            <Item
              visual="You, spread across accounts, apps and agents"
              scene={<ConnectorRows />}
              strong="Every new tool wants your life story."
            >
              A better tool shows up, and you spend an hour teaching it who you
              are. Then the next one shows up.
            </Item>
            <Item
              visual="An agent's finished work, waiting on you to review it"
              image="/assets/home/problem/agent-diffs.svg"
              plain
              strong="Every agent reports to you."
              link={{ label: "This is where Kennel starts →", href: "/kennel" }}
            >
              Agents finish tasks, but you hold the why. Every re-brief, every
              review and every &ldquo;what did you mean?&rdquo; runs through
              you.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 4 · An agent, not a product */}
      <Section>
        <Header
          lines={["Agents do tasks.", "Waldo carries outcomes."]}
          subtitle="An agent can finish the code while the release is still blocked. Waldo stays on it until the release ships, and only pulls you in when it's your call."
          actions={{ primary: { label: "Let Waldo in →", href: "/waitlist" } }}
        />
        <Body>
          <Carousel label="What Waldo does differently">
            <Item
              title="Never makes you explain twice."
              visual="Your accounts, health and work, held as one context"
              image="/assets/home/never-explain-twice.svg"
              plain
            >
              Remembers the people, the context and how you like it done. Say it
              once. It sticks.
            </Item>
            <Item
              title="Works with every agent."
              visual="A text thread with Waldo: you name the agents in the message, he answers in one line"
              scene={<AgentsChat />}
            >
              Claude, Codex, or whatever ships next. Waldo runs them and hands
              you back one result.
            </Item>
            <Item
              title="Knows what kind of day it is."
              visual="The same Tuesday over three weeks: Waldo asks, then suggests, then just does it, as he learns you"
              scene={<LearningWeeks />}
            >
              The same request gets a different plan on a rough day. Waldo can
              tell which day you&apos;re having.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 5 · Who it's for */}
      <Section>
        <Header
          lines={["Same Waldo.", "Different hats."]}
          subtitle="Starting with founders, engineers and investors, the people already running several agents at once."
        />
        <Body>
          <Carousel label="Who Waldo works for">
            <Item
              title="Founders"
              visual="A founder travelling, sending Waldo a photo, a voice note and a clip in WhatsApp"
              scene={<FounderWhatsApp />}
            >
              Three calls back to back, then the co-founder sync. Waldo puts ten
              minutes of air before it, so the snappy reply never happens.
            </Item>
            <Item
              title="Engineers"
              visual="An engineer asking Waldo from the terminal, with a screenshot and a screen recording"
              scene={<EngineerCli />}
            >
              Waldo finds the hour you&apos;re sharpest and gives it to the hard
              problem. Standup moves somewhere else.
            </Item>
            <Item
              title="Investors"
              visual="An investor sending Waldo a voice note and a slide from an Apple Watch"
              scene={<InvestorWatch />}
            >
              Pitches spaced to what you can actually give. The founder at pitch
              five gets your pitch-one attention.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 6 · Trust: one white box, edge to edge. Centred title and text, the console, then the controls */}
      <section className="site-section site-section--box">
        <div className="site-box">
          <div className="site-box-head">
            <Header
              lines={["Waldo does as much as you let it.", "Then shows its work."]}
              subtitle="Start with Waldo only telling you what it would do. Hand over more when you’re ready. Everything it remembers, and everything it does, sits in your console in plain sight. On a leash you hold."
            />
          </div>
          <ConsoleTour />
          <div className="site-box-foot site-container">
            <FeatureList label="Your controls" section="Your controls" features={CONTROLS} />
          </div>
        </div>
      </section>

      {/* 7 · Where Waldo lives */}
      <Section>
        <Header
          lines={["Where’s Waldo?", "Wherever you are."]}
          subtitle="It starts on your Mac, comes to your iPhone next, and answers in the chats you already use."
        />
        <Body>
          <Carousel label="Where Waldo lives">
            <Item
              meta="Open beta"
              title="Kennel for Mac"
              href="/kennel"
              visual="Kennel in the Mac menu bar, around the notch"
              image="/build/menubar-illustration.svg"
              link={{ label: "See Kennel →", href: "/kennel" }}
            >
              Lives in the notch. Shows what Waldo is working on, and what needs
              you.
            </Item>
            <Item
              meta="Coming soon"
              title="Waldo for iPhone"
              visual="Waldo's overview on iPhone"
              image="/build/phone-mockup.png"
            >
              Where Waldo gets to know the person behind the work.
            </Item>
            <Item
              meta="Coming soon"
              title="Messaging & browser"
              visual="Asking Waldo in a chat thread"
              image="/assets/home/agent-ask-thread.svg"
            >
              Talk to the same Waldo in WhatsApp, Slack or your browser.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 8 · Questions */}
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

      {/* 9 · Close */}
      <Section>
        <Header
          lines={["Your agents aren’t going", "to fix your life."]}
          subtitle="One Waldo across work and life, carrying what matters so you don't have to."
          actions={{ primary: { label: "Let Waldo in →", href: "/waitlist" } }}
        />
      </Section>
    </SiteShell>
  );
}
