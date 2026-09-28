import type { Metadata } from "next";
import Link from "next/link";

import { Actions, Placeholder, Section, revealDelay } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
import { titleFit } from "@/lib/title-fit";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/why-waldo.md ("Live copy" at the top).
// The dashed boxes mark the parts only Suyash can write.

const pageTitle = "Why I'm building Waldo — a note from the founder";
const pageDescription =
  "One personal agent for a world full of agents. Why Waldo exists, what it believes, and why it starts with Kennel.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "/why-waldo" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/why-waldo`,
    type: "article",
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [OG_IMAGE_URL],
  },
};

export default function WhyWaldoPage() {
  return (
    <SiteShell>
      <Section size="auto">
        <article className="site-letter" data-reveal="load">
          <p className="site-label site-rv" style={revealDelay(0)}>
            Why Waldo
          </p>
          <h1 className="site-heading" style={titleFit(["Why I’m building", "Waldo."])}>
            <span className="site-rv" style={revealDelay(1)}>
              Why I’m building
            </span>
            <span className="site-rv" style={revealDelay(2)}>
              Waldo.
            </span>
          </h1>
          <p className="site-text site-rv" style={revealDelay(3)}>
            One personal agent, for a world full of agents.
          </p>

          <div className="site-letter-byline site-rv" style={revealDelay(4)}>
            <span className="site-letter-avatar" aria-hidden="true" data-visual="Suyash's photo" />
            <div>
              <strong>Suyash Pingale</strong>
              Founder, September 2026
            </div>
          </div>

          <div className="site-letter-body" data-appear="self">
            <Placeholder>
              <strong>The moment.</strong>{" "}
              Suyash&apos;s opening, 3–5 sentences: the day it clicked that Waldo had to
              exist. The day, the tools open, how it felt. End on the feeling, not the idea.
            </Placeholder>

            <h2>Two worlds</h2>
            <p>Here&apos;s what I kept seeing.</p>
            <p>
              AI is splitting into two worlds. On one side, personal AI keeps getting better at knowing your life: your
              messages, your calendar, your preferences. On the other, specialist agents keep getting better at doing
              work: writing code, researching, browsing, sending, analysing.
            </p>
            <p>
              Everyone&apos;s building one side or the other. I don&apos;t think people will want both separately. Nobody
              wants one AI that knows their life, and a different set of systems to manage every agent they use at work.
            </p>
            <p>
              They&apos;ll want one agent that understands them, and coordinates everything else around what they&apos;re
              actually trying to do.
            </p>
            <blockquote className="site-quote">They&apos;ll want one agent that understands them, and coordinates the rest.</blockquote>

            <h2>Done isn’t done</h2>
            <p>
              Today&apos;s agents can already finish impressive tasks. But finishing a task isn&apos;t the same as getting
              what you wanted.
            </p>
            <p>
              An agent can finish the code while the release is still blocked. A research agent can hand you a report
              while the decision is still open. An email can be drafted while the promise behind it is still unkept.
            </p>
            <p>
              So you&apos;re still the one who explains the goal, follows each run, checks what actually changed, chases
              what failed, and remembers what&apos;s unfinished.
            </p>
            <blockquote className="site-quote">We were promised assistants. We got a job managing them.</blockquote>

            <h2>The part nobody was building</h2>
            <p>Being personal isn&apos;t only about knowing who you are. It&apos;s about knowing the state you&apos;re in.</p>
            <p>
              Your meetings affect your focus. Your sleep affects your capacity. Some days you have room to take on more.
              Other days, protecting your attention is the whole job. The same request deserves a different answer on
              those two days.
            </p>
            <p>
              Your watch already knows which day it is. It&apos;s been collecting that for years, and nothing has ever
              done anything with it. Health apps give you a score and leave you to work out what it means.
            </p>
            <p>
              So Waldo uses those signals (sleep, recovery, stress, activity) as context for how it plans, what it moves,
              and when it leaves you alone. Not as another score to manage. Not to make medical decisions for you. Because
              the right plan depends on the person who has to live through it.
            </p>
            <blockquote className="site-quote">Health becomes context for your day, not another score to manage.</blockquote>

            <h2>What Waldo is</h2>
            <p>As AI gets more capable, people shouldn&apos;t have to become managers of AI.</p>
            <p>Waldo is one agent that stays with you across work and life.</p>
            <p>
              You tell it what you want to get done. It understands the context, brings in the right agents and tools,
              comes back only when a decision is genuinely yours, and stays with the outcome until something real has
              changed. When an agent says &ldquo;done,&rdquo; Waldo checks.
            </p>
            <p>
              Models will keep getting better. Agents will keep multiplying. Tools and interfaces will change. The part
              that should stay constant is the one that works for you: your context, your outcomes, and your relationship
              with Waldo.
            </p>

            <h2>Why we started with Kennel</h2>
            <p>
              We started where the problem is already loud: founders, engineers and investors who already work across
              several AI agents at once. For them, &ldquo;I&apos;m the one coordinating all of this&rdquo; isn&apos;t a
              future problem. It&apos;s Tuesday.
            </p>
            <p>
              <Link href="/kennel" className="site-link">Kennel</Link>{" "}
              is Waldo&apos;s first surface, a Mac app that runs
              your coding agents toward an outcome and shows you the proof. It&apos;s open source, and it&apos;s in open
              beta now. It&apos;s where we find out whether one personal agent can carry an outcome across many agents
              without making you the coordinator.
            </p>
            <p>From there, Waldo comes to your iPhone, where it gets to know the person behind the work.</p>

            <h2>What I believe (and what we won’t do)</h2>
            <p>A few things I hold us to:</p>
            <ul>
              <li><strong>One person, one Waldo.</strong> You shouldn&apos;t have to recreate yourself inside every new AI product.</li>
              <li><strong>Outcomes, not activity.</strong> More agent runs isn&apos;t the goal. Something real changing in your world is.</li>
              <li><strong>Done should mean something changed.</strong> A finished run is evidence, not proof.</li>
              <li><strong>Quiet by default.</strong> Waldo speaks when it&apos;s worth it, and leaves you alone when it isn&apos;t.</li>
              <li><strong>More capable AI should mean you carry less.</strong> Less re-briefing. Less supervision. Less remembering everything yourself.</li>
            </ul>
            <p>And a few things we won&apos;t do:</p>
            <ul>
              <li>We won&apos;t sell your data, or use it for ads.</li>
              <li>We won&apos;t read the words in your messages. The pattern is enough.</li>
              <li>We won&apos;t pretend to be your doctor.</li>
              <li>We won&apos;t build streaks, badges or anything designed to keep you staring at an app.</li>
            </ul>

            <h2>Where we are</h2>
            <Placeholder>
              <strong>Where we are.</strong>{" "}
              Two or three honest sentences from Suyash: who&apos;s building Waldo, where
              things stand, what&apos;s working, what&apos;s hard.
            </Placeholder>
            <p>Kennel is in open beta today. Waldo for iPhone is next. We&apos;re letting people in a few at a time.</p>

            <p style={{ marginTop: "2.4em" }}>
              If this sounds like your problem, I&apos;d love for you to try it. And whether or not you do, write to me. I
              read every reply.
            </p>
            <Placeholder>
              <strong>Reply address</strong> and <strong>signature</strong> go here.
            </Placeholder>
            <p>Suyash</p>

            <p style={{ marginTop: "2.4em" }}>
              <strong>P.S.</strong>{" "}
              You might be wondering about the Dalmatian. The spots do real work: one spot is an
              observation, enough of them make a pattern. There&apos;s a whole note about it:{" "}
              <Link href="/blogs/why-a-dalmatian" className="site-link">We put a Dalmatian on it</Link>.
            </p>
          </div>

          <div style={{ marginTop: "var(--site-row-gap)" }}>
            <p className="site-text" style={{ marginTop: 0 }}>
              <strong>One person. One Waldo.</strong>
            </p>
            <div style={{ marginTop: 32 }}>
              <Actions
                primary={{ label: "Let Waldo in →", href: "/waitlist" }}
                secondary={{ label: "See how it works", href: "/how-it-works" }}
              />
            </div>
          </div>
        </article>
      </Section>
    </SiteShell>
  );
}
