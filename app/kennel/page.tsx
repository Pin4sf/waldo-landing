import type { Metadata, Viewport } from "next";

import { Body, Grid, Header, Item, List, Questions, Section, Visual } from "@/components/site/blocks";
import { Carousel } from "@/components/site/carousel";
import { SiteShell } from "@/components/site/site-shell";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/kennel.md ("Live copy" at the top). The existing Kennel visuals go into the blank
// visual slots in the visual pass.

const KENNEL_URL = `${SITE_URL}/kennel`;
const KENNEL_REPO = "https://github.com/waldoco/Waldo-Kennel";
const KENNEL_WAITLIST = "/waitlist?utm_source=kennel&utm_medium=site";
const KENNEL_TITLE = "Kennel for Mac | Stop managing agent sessions. Manage outcomes.";
const KENNEL_DESCRIPTION =
  "Kennel is Waldo's open-source Mac app for supervising coding agents. Tell it what should become true, approve the plan, and let Codex, Claude Code, Cursor, OpenCode or Pi earn it, with evidence, not vibes.";

export const metadata: Metadata = {
  title: { absolute: KENNEL_TITLE },
  description: KENNEL_DESCRIPTION,
  alternates: { canonical: "/kennel" },
  openGraph: {
    title: KENNEL_TITLE,
    description: KENNEL_DESCRIPTION,
    url: KENNEL_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: KENNEL_TITLE,
    description: KENNEL_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

// Kennel is always dark, so the phone browser bar is too.
export const viewport: Viewport = { themeColor: "#111111" };

export default function KennelPage() {
  return (
    <SiteShell theme="dark">
      {/* 0 · Hero */}
      <Section>
        <Header
          as="h1"
          label="Kennel for Mac"
          lines={["Your agents finish.", "Kennel gets it done."]}
          subtitle="Tell Kennel what should be true when you're done. It splits the work across Codex, Claude Code, Cursor and the rest, checks every result, and shows you the proof."
          body="It's free, open source and in open beta, and it runs on your Mac."
          actions={{
            primary: { label: "Try the beta on GitHub", href: KENNEL_REPO },
            secondary: { label: "Get the Mac app first →", href: KENNEL_WAITLIST },
          }}
        />
        <Body>
          <Visual wide label="Kennel app window showing a project's work queue" src="/build/kennel-hero-asset-3.svg" eager />
        </Body>
      </Section>

      {/* 1 · Not done */}
      <Section>
        <Header
          lines={["“Finished” isn’t", "“done.”"]}
          subtitle="An output is what the session produced. An outcome is what you wanted. Most agent tools stop at the output. Kennel is built around the outcome."
        />
        <Body>
          <Carousel label="How Kennel works toward an outcome">
            <Item title="Outcome first." visual="Outcome card" image="/build/kennel/outcome-first.svg">
              What the project should look like in the end. Not the steps, the end state. That&apos;s the outcome, and
              it&apos;s the only thing Kennel measures against.
            </Item>
            <Item title="Contracts come from the outcome." visual="Outcome splitting into contracts" image="/build/kennel/contracts-from-outcome.svg">
              Kennel breaks the outcome into contracts for agents. Right slice, right hands, each one small enough for a
              single session to finish and prove.
            </Item>
            <Item title="Waldo holds it together." visual="Waldo keeping contracts in step" image="/build/kennel/waldo-holds.svg">
              Waldo shapes the outcome up front, keeps every contract in step, and catches anything that drifts from the
              plan before it reaches you.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 2–5 · How it runs */}
      <Section size="auto">
        <Header lines={["Turns your intent", "into an outcome."]} subtitle="Waldo takes a loose sentence and turns it into a contract you can check." />
        <Body>
          <Visual wide label="Kennel turning a loose intent into a checkable contract" src="/build/kennel/intent-to-outcome.svg" />
        </Body>
      </Section>

      <Section size="auto">
        <Header
          lines={["One outcome.", "Many hands."]}
          subtitle="Contracts flow to your agents in the right order. Each one hands off to the next and reports against the same outcome."
        />
        <Body>
          <Visual wide label="Contracts moving between agents, a status list, and a contract card" src="/build/kennel/many-hands-2.svg" />
        </Body>
      </Section>

      <Section size="auto">
        <Header
          lines={["Read the card,", "not the log."]}
          subtitle="Every session summarises itself: what it did, what it's doing, what comes next. The full transcript is one click away."
        />
        <Body>
          <Visual wide label="Kennel's work board with a session brief card" src="/build/kennel/read-card-2.svg" />
        </Body>
      </Section>

      <Section size="auto">
        <Header
          lines={["Approve without", "switching."]}
          subtitle="Island puts questions, approvals and Home (every project, what moved, what needs you) in the menu bar. Answer, and the run continues."
        />
        <Body>
          <Visual wide label="Kennel Island in the macOS menu bar" src="/build/kennel/island-2.svg" />
        </Body>
      </Section>

      {/* 6 · Three things */}
      <Section>
        <Header
          lines={["Three things stop", "being your job."]}
          subtitle="Ferrying context. Picking the model. Checking the work. Kennel takes the coordinating, the checking and the routing. You keep the decisions."
        />
        <Body>
          <Carousel label="What stops being your job">
            <Item title="Stop babysitting your agents." visual="Agents with context and contracts">
              You approve the outcome, Kennel handles the rest. Each agent gets the context it needs and a contract for
              what&apos;s expected. No re-explaining, no tab hopping.
            </Item>
            <Item title="Done means you’ve seen the proof." visual="Evidence attached to a contract">
              Every contract comes with its own checks. Kennel gathers the evidence, and you make the call.
            </Item>
            <Item title="Gets the best out of what you have." visual="Agent and model picker">
              Every piece goes to the agent and model you approve. Your subscriptions, your keys.
            </Item>
          </Carousel>
        </Body>
      </Section>

      {/* 7 · Stays on your Mac */}
      <Section size="auto">
        <Header
          lines={["Your code", "stays home."]}
          subtitle="Kennel runs on your Mac and keeps its records there. Your agents work through your own accounts, the way they always have."
          body="A kennel, not a cloud."
        />
        <Body>
          <Grid cols={3}>
            <Item title="Local first.">Everything Kennel tracks lives on your machine.</Item>
            <Item title="Only the access you approve.">Each agent gets exactly the files and permissions its contract needs. Nothing more.</Item>
            <Item title="Nothing hidden.">If something isn&apos;t set up, Kennel tells you. It never quietly swaps in a different agent.</Item>
          </Grid>
        </Body>
      </Section>

      {/* 8 · Part of Waldo */}
      <Section size="auto">
        <Header
          lines={["Kennel is", "Waldo at work."]}
          subtitle="Waldo is one personal agent across work and life. Kennel is where it starts: your agents, your outcomes, on your Mac. The same Waldo is coming to your iPhone, where it knows how you're actually doing."
          body="Same dog, first room."
          actions={{ secondary: { label: "See the whole of Waldo", href: "/how-it-works" } }}
        />
        <Body>
          <Grid cols={3}>
            <Item meta="You are here" title="Kennel for Mac">Waldo at work.</Item>
            <Item meta="Coming soon" title="Waldo for iPhone">Waldo in your personal life.</Item>
            <Item meta="Coming soon" title="Messaging & browser">Waldo everywhere else.</Item>
          </Grid>
        </Body>
      </Section>

      {/* 9 · Open source */}
      <Section size="auto">
        <Header
          lines={["Built in", "the open."]}
          subtitle="Kennel is open source under Apache-2.0. Read the code, file an issue, or build with us."
          body="Good dogs share."
        />
        <Body>
          <List
            items={[
              <a key="star" className="site-link" href={KENNEL_REPO} target="_blank" rel="noreferrer">Star on GitHub →</a>,
              <a key="issues" className="site-link" href={`${KENNEL_REPO}/issues`} target="_blank" rel="noreferrer">Good first issues →</a>,
              <a key="discussions" className="site-link" href={`${KENNEL_REPO}/discussions`} target="_blank" rel="noreferrer">Discussions →</a>,
              <a key="contributing" className="site-link" href={`${KENNEL_REPO}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">How to contribute →</a>,
            ]}
          />
        </Body>
      </Section>

      {/* 10 · Questions */}
      <Section size="auto">
        <Header lines={["Before you", "clone it."]} body="No fine print. Just a readme." />
        <Body>
          <Questions
            groups={[
              {
                items: [
                  { q: "Is Kennel free?", a: "Yes. It's open source. You bring your own agent subscriptions and API keys." },
                  {
                    q: "Which agents does it work with?",
                    a: "Codex, Claude Code, Cursor, OpenCode and Pi. What each one can do depends on how you've set it up.",
                  },
                  {
                    q: "Does my code leave my Mac?",
                    a: "Kennel keeps its records on your Mac. Your agents work through your own accounts, just as they do without Kennel.",
                  },
                  {
                    q: "What does “open beta” mean?",
                    a: "It works, and people are using it, but it's still being finished. Today you build it from source. A packaged Mac app is coming. Join the list to hear first.",
                  },
                ],
              },
            ]}
          />
        </Body>
      </Section>

      {/* 11 · Close */}
      <Section>
        <Header
          lines={["More agents.", "Less for you to carry."]}
          subtitle="Tell Kennel what should become true. Your agents do the rest, with evidence, not vibes."
          actions={{
            primary: { label: "Try the beta on GitHub", href: KENNEL_REPO },
            secondary: { label: "Get the Mac app first →", href: KENNEL_WAITLIST },
          }}
        />
      </Section>
    </SiteShell>
  );
}
