import type { Metadata } from "next";
import Link from "next/link";

import { Body, Grid, Header, Item, List, Questions, Section } from "@/components/site/blocks";
import { Carousel } from "@/components/site/carousel";
import { SiteShell } from "@/components/site/site-shell";
import { OG_DESCRIPTION, OG_IMAGE_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site-metadata";

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
      <strong>Kennel for Mac is in open beta.</strong>{" "}
      <span>
        Run all your coding agents toward one finished result. <Link href="/kennel">See Kennel →</Link>
      </span>
    </p>
  </div>
);

export default function Home() {
  return (
    <SiteShell announcement={announcement}>
      {/* 2 · Hero */}
      <Section>
        <Header
          as="h1"
          lines={["Life happens.", "Waldo handles it."]}
          subtitle="One personal agent across your work and your life. It knows how you're doing, brings in the right tools and agents, and stays on it until it's actually done."
          body="You'll hear from it when it matters."
          actions={{
            primary: { label: "Let Waldo in →", href: "/waitlist" },
            secondary: { label: "See how it works", href: "/how-it-works" },
          }}
        />
      </Section>

      {/* 3 · The problem */}
      <Section>
        <Header
          lines={["You were promised assistants.", "You got a second job."]}
          subtitle="More apps, more agents, more data about you. All of it still waits on you to read it, brief it, check it and decide."
        />
        <Body>
          <Carousel label="What you're carrying">
            <Item
              visual="Health data piling up across apps, and nothing acting on it"
              image="/assets/home/too-much-data.svg"
              strong="Your watch knows. Nothing acts."
            >
              It knows you slept five hours and your stress is up. Your calendar still has four meetings before noon.
            </Item>
            <Item
              visual="You, spread across accounts, apps and agents"
              image="/waldo-web-assets/agent-features/apps-accounts-agents.webp"
              strong="Every new tool wants your life story."
            >
              A better tool shows up, and you spend an hour teaching it who you are. Then the next one shows up.
            </Item>
            <Item
              visual="An agent's finished work, waiting on you to review it"
              image="/build/work-unit-agent-illustration.svg"
              strong="Every agent reports to you."
              link={{ label: "This is where Kennel starts →", href: "/kennel" }}
            >
              Agents finish tasks, but you hold the why. Every re-brief, every review and every &ldquo;what did you
              mean?&rdquo; runs through you.
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
              image="/build/understands-illustration.svg"
            >
              Remembers the people, the context and how you like it done. Say it once. It sticks.
            </Item>
            <Item
              title="Works with every agent."
              visual="Waldo at the centre, the agents it works with around it"
              image="/build/coordinates-illustration.svg"
            >
              Claude, Codex, or whatever ships next. Waldo runs them and hands you back one result.
            </Item>
            <Item
              title="Knows what kind of day it is."
              visual="The same weekly sync, handled differently as your Form changes week to week"
              image="/build/returns-illustration.svg"
            >
              The same request gets a different plan on a rough day. Waldo can tell which day you&apos;re having.
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
          <Grid cols={3}>
            <Item title="Founders">
              Three calls back to back, then the co-founder sync. Waldo puts ten minutes of air before it, so the snappy
              reply never happens.
            </Item>
            <Item title="Engineers">
              Waldo finds the hour you&apos;re sharpest and gives it to the hard problem. Standup moves somewhere else.
            </Item>
            <Item title="Investors">
              Pitches spaced to what you can actually give. The founder at pitch five gets your pitch-one attention.
            </Item>
          </Grid>
        </Body>
      </Section>

      {/* 6 · Trust */}
      <Section>
        <Header
          lines={["It does as much", "as you let it."]}
          subtitle="You choose how far Waldo goes, and you can change it anytime."
          body="On a leash you hold."
        />
        <Body>
          <Carousel label="How far Waldo goes">
            <Item title="Tell me" visual="Waldo saying what it would move, and asking first" image="/assets/home/data-alone/data-alone-map.svg">
              Waldo says what it would do.
            </Item>
            <Item title="Ask me" visual="Drafts ready to go, waiting for your approval" image="/assets/home/agent-approval.svg">
              Waldo suggests, you approve.
            </Item>
            <Item title="Just do it" visual="The log of what Waldo did overnight" image="/assets/home/agent-patrol.svg">
              Waldo acts, and you can undo anything in one tap.
            </Item>
          </Carousel>
        </Body>
        <Body>
          <List
            items={[
              "Only what you connect. Only what you allow.",
              "Reads message metadata (volume, timing, urgency), never what your messages say.",
              "Health is context for planning your day. Never medical decisions.",
              "Never sells your data. Never trains on it.",
            ]}
          />
        </Body>
      </Section>

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
              Lives in the notch. Shows what Waldo is working on, and what needs you.
            </Item>
            <Item meta="Coming soon" title="Waldo for iPhone" visual="Waldo's overview on iPhone" image="/build/phone-mockup.png">
              Where Waldo gets to know the person behind the work.
            </Item>
            <Item meta="Coming soon" title="Messaging & browser" visual="Asking Waldo in a chat thread" image="/assets/home/agent-ask-thread.svg">
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
