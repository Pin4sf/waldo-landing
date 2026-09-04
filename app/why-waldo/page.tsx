import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NewHomeNav } from "@/components/home/new-home-nav";
import { SceneCloseSection } from "@/components/sections/downstream-build-sections";
import { ScrollAnimations } from "@/components/scroll-animations";
import { SmoothScroll } from "@/components/smooth-scroll";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const pageTitle = "Why Waldo — One personal agent for a world full of agents";
const pageDescription =
  "Waldo is a personal agent across work and life that understands you, coordinates specialist AI agents and tools, and carries outcomes from intent to resolution.";

const sectionHeadingStyle = {
  fontSize: "clamp(2rem, 1.52rem + 1.8vw, 3.1rem)",
  lineHeight: 1.05,
};

const calloutStyle = {
  fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.15rem)",
  lineHeight: 1.16,
};

const bodyClassName =
  "max-w-[68ch] space-y-5 text-[clamp(1rem,.965rem+.18vw,1.125rem)] leading-[1.65] tracking-[-0.012em] text-[var(--text-secondary)]";

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

function ThesisSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-black/[0.08] py-[clamp(4.75rem,7.5vw,8.5rem)]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-9 px-[clamp(1.25rem,3vw,3.5rem)] lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.55fr)] lg:gap-20 xl:gap-24">
        <div className="lg:pr-4">
          {eyebrow ? (
            <p className="type-caption text-[var(--text-tertiary)]">{eyebrow}</p>
          ) : null}
          <h2 className="type-h1 mt-4 max-w-[16ch] text-[var(--ink)]" style={sectionHeadingStyle}>
            {title}
          </h2>
        </div>
        <div className={bodyClassName}>{children}</div>
      </div>
    </section>
  );
}

function ThesisCallout({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 border-l-2 border-[var(--accent)] pl-5 sm:pl-6">
      <p className="type-h2 max-w-[26ch] text-[var(--ink)]" style={calloutStyle}>
        {children}
      </p>
    </div>
  );
}

function Principle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="border-t border-black/[0.08] pt-6 sm:pt-7">
      <h3 className="font-[var(--font-body)] text-[clamp(1.12rem,1.03rem+.35vw,1.35rem)] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--ink)]">
        {title}
      </h3>
      <div className="mt-4 max-w-[54ch] space-y-3 text-[clamp(.98rem,.95rem+.12vw,1.08rem)] leading-[1.62] tracking-[-0.01em] text-[var(--text-secondary)]">
        {children}
      </div>
    </article>
  );
}

const coordinationBurden = [
  "explain the larger goal",
  "coordinate different agents and tools",
  "follow multiple agent runs",
  "review the results",
  "decide what should happen next",
  "verify what actually changed",
  "follow up when something fails",
  "remember what is still unfinished",
];

const outcomeState = [
  "what you originally wanted",
  "what has actually happened",
  "what changed",
  "what still needs your judgment",
  "what failed",
  "what remains unresolved",
];

const carryLess = [
  "Less re-briefing.",
  "Less supervision.",
  "Less context switching.",
  "Less remembering everything yourself.",
];

export default function WhyWaldoPage() {
  return (
    <div className="new-home min-h-screen bg-[var(--surface-t3)] text-[var(--ink)]">
      <SmoothScroll />
      <ScrollAnimations />
      <a
        href="#why-waldo-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--surface-t2)]"
      >
        Skip to content
      </a>
      <NewHomeNav />

      <main id="why-waldo-main">
        <header className="mx-auto w-full max-w-[1180px] px-[clamp(1.25rem,3vw,3.5rem)] pb-[clamp(6rem,10vw,10rem)] pt-[clamp(8rem,14vw,12rem)]">
          <div className="max-w-[940px]">
            <p className="type-caption text-[var(--text-tertiary)]">Why Waldo</p>
            <h1
              className="type-display mt-6 max-w-[920px] text-[var(--ink)]"
              style={{
                fontSize: "clamp(3rem, 2rem + 4.4vw, 6rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
              }}
            >
              <span className="block">One personal agent</span>
              <span className="block">for a world full of agents.</span>
            </h1>

            <div className="mt-9 max-w-[760px] space-y-4 text-[clamp(1.06rem,1rem+.3vw,1.25rem)] leading-[1.58] tracking-[-0.012em] text-[var(--text-secondary)] sm:mt-10">
              <p>Tell Waldo what you want to get done.</p>
              <p>
                Waldo understands your context, coordinates the right AI agents and tools, brings you in when your judgment matters, and carries the work until the outcome is actually resolved.
              </p>
              <p>As AI becomes more capable, people should not have to become managers of AI.</p>
            </div>

            <div className="mt-10 max-w-[760px] border-l-2 border-[var(--accent)] pl-5 sm:mt-12 sm:pl-6">
              <p
                className="type-h2 text-[var(--ink)]"
                style={{ fontSize: "clamp(1.7rem,1.3rem+1.35vw,2.55rem)", lineHeight: 1.1 }}
              >
                Waldo turns intent into outcomes.
              </p>
            </div>
          </div>
        </header>

        <ThesisSection eyebrow="01" title="Why Waldo">
          <p>AI is splitting into two worlds.</p>
          <p>
            Personal AI is getting better at understanding your messages, calendar, preferences, memory, and daily life.
          </p>
          <p>
            At the same time, specialist agents are becoming much better at doing specific kinds of work like coding, research, browsing, communication, analysis, and operations.
          </p>
          <p>We believe these two worlds will come together.</p>
          <p>
            People will not want one AI that knows their life and a separate collection of systems for managing every agent they use at work.
          </p>
          <p>
            They will want one agent that understands them and coordinates the rest around what they actually want to accomplish.
          </p>
          <p className="font-medium text-[var(--ink)]">That is Waldo.</p>
        </ThesisSection>

        <ThesisSection eyebrow="02" title="The problem">
          <p>Today&apos;s AI agents can already perform increasingly complex tasks.</p>
          <p className="font-medium text-[var(--ink)]">
            But completing a task is not the same as delivering the outcome you wanted.
          </p>

          <div className="my-8 space-y-4 rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 text-[var(--ink)] sm:rounded-[28px] sm:p-8">
            <p>An agent can finish writing the code while the release is still blocked.</p>
            <p>A research agent can return a report while the decision is still unresolved.</p>
            <p>An email can be drafted while the commitment behind it is still open.</p>
          </div>

          <p>The person still has to:</p>
          <ul className="grid gap-x-10 gap-y-2.5 pl-5 md:grid-cols-2">
            {coordinationBurden.map((item) => (
              <li key={item} className="list-disc marker:text-[var(--text-tertiary)]">
                {item}
              </li>
            ))}
          </ul>

          <ThesisCallout>
            <span className="block">Agents execute tasks.</span>
            <span className="block">The person still carries the outcome.</span>
          </ThesisCallout>
          <p>Waldo is built to change that.</p>
        </ThesisSection>

        <ThesisSection eyebrow="03" title="How Waldo works">
          <p>You start with what you want to accomplish.</p>

          <div className="my-8 space-y-3 rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 text-[var(--ink)] sm:rounded-[28px] sm:p-8">
            <p className="font-medium">Ship this release by Friday.</p>
            <p className="font-medium">Research these options and help me make the decision.</p>
            <p className="font-medium">Plan my week around everything I need to finish.</p>
          </div>

          <p>Waldo keeps the larger outcome in view.</p>
          <p>
            It can break the work down, coordinate the right specialist agents and tools, follow what happens, and bring you back when a meaningful decision requires you.
          </p>
          <p>But Waldo does not treat an agent saying &quot;done&quot; as the end.</p>
          <p>It keeps track of:</p>
          <ul className="grid gap-x-10 gap-y-2.5 pl-5 md:grid-cols-2">
            {outcomeState.map((item) => (
              <li key={item} className="list-disc marker:text-[var(--text-tertiary)]">
                {item}
              </li>
            ))}
          </ul>
          <p>An outcome may be completed, reopened, deferred, transferred, or consciously dropped.</p>
          <p>Either way, it does not silently disappear when an agent session ends.</p>
          <ThesisCallout>Waldo stays with the outcome from intent to resolution.</ThesisCallout>
        </ThesisSection>

        <ThesisSection
          eyebrow="04"
          title={
            <>
              <span className="block">Agents work on tasks.</span>
              <span className="block">Waldo carries outcomes.</span>
            </>
          }
        >
          <p>A coding agent can write code.</p>
          <p>A research agent can gather information.</p>
          <p>A browser agent can complete an action.</p>
          <p>A communication agent can draft or send a message.</p>
          <p>Those are pieces of work.</p>
          <p>
            Waldo keeps track of how those pieces connect to what you actually wanted to accomplish.
          </p>
          <p>Specialist agents can change underneath it.</p>
          <p className="font-medium text-[var(--ink)]">
            Your context, your outcome, and your relationship with Waldo remain.
          </p>
        </ThesisSection>

        <ThesisSection
          eyebrow="05"
          title={
            <>
              <span className="block">One Waldo across</span>
              <span className="block">work and life</span>
            </>
          }
        >
          <p>The person using AI at work is the same person living the rest of their life.</p>
          <div className="my-8 grid gap-3 sm:grid-cols-2">
            {[
              "Your meetings affect your focus.",
              "Your health affects your capacity.",
              "Your commitments affect your priorities.",
              "Your work affects your day.",
            ].map((line) => (
              <p
                key={line}
                className="rounded-[18px] border border-black/[0.08] bg-[var(--surface-t2)] px-5 py-4 leading-[1.5] text-[var(--ink)] sm:rounded-[20px]"
              >
                {line}
              </p>
            ))}
          </div>
          <p>Most software treats these as separate worlds.</p>
          <p className="font-medium text-[var(--ink)]">Waldo does not.</p>
          <p>
            We believe a truly personal agent needs a continuing understanding of the person across these boundaries.
          </p>
          <ThesisCallout>
            Being personal is not only about knowing who you are. It is also about understanding the state you are in.
          </ThesisCallout>
          <p>
            Your priorities change. Your capacity changes. New commitments appear. Work becomes blocked. Plans move. Some days you have room to take on more; on others, protecting your attention matters more.
          </p>
          <p>
            A personal agent should understand that changing state and adapt how it plans, prioritizes, delegates, interrupts, or leaves you alone.
          </p>
          <p>
            Waldo is designed as one continuing relationship across work and life, instead of a different assistant for every part of you.
          </p>
        </ThesisSection>

        <ThesisSection eyebrow="06" title="Health-aware by design">
          <p>A truly personal agent should understand more than your inbox, calendar, and stored preferences.</p>
          <p>
            It should have some understanding of the human behind them and how that person&apos;s state is changing over time.
          </p>
          <p>
            With your permission, Waldo can use signals such as sleep, recovery, stress, activity, and changing capacity as part of that understanding.
          </p>
          <div className="my-8 space-y-1 border-l-2 border-[var(--accent)] pl-5 text-[var(--ink)] sm:pl-6">
            <p>Not as another health dashboard.</p>
            <p>Not to make medical decisions for you.</p>
          </div>
          <p>But because the right plan can change depending on the person behind it.</p>
          <p>
            A low-recovery day may mean protecting focus, moving lower-priority work, delegating more, or reducing unnecessary interruptions.
          </p>
          <p>A high-capacity day may look different.</p>
          <p className="font-medium text-[var(--ink)]">Health is one part of understanding your state.</p>
          <p>
            It gives Waldo context that most software does not have: not just what needs to happen, but something about the person who has to live through it.
          </p>
          <p className="font-medium text-[var(--ink)]">
            Health becomes context for agency, not another score for you to manage.
          </p>
        </ThesisSection>

        <section className="border-t border-black/[0.08] py-[clamp(4.75rem,7.5vw,8.5rem)]">
          <div className="mx-auto w-full max-w-[1180px] px-[clamp(1.25rem,3vw,3.5rem)]">
            <p className="type-caption text-[var(--text-tertiary)]">07</p>
            <h2 className="type-h1 mt-4 max-w-[18ch] text-[var(--ink)]" style={sectionHeadingStyle}>
              The Waldo ecosystem
            </h2>
            <p className="mt-6 max-w-[58ch] text-[clamp(1rem,.965rem+.18vw,1.125rem)] leading-[1.65] tracking-[-0.012em] text-[var(--text-secondary)]">
              There is one Waldo, expressed through different surfaces.
            </p>

            <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
              <article className="rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
                <p className="type-caption text-[var(--text-tertiary)]">Work</p>
                <h3 className="type-h2 mt-3 text-[var(--ink)]" style={{ fontSize: "clamp(1.5rem,1.3rem+.7vw,2rem)" }}>
                  Kennel
                </h3>
                <div className="mt-5 space-y-4 text-[clamp(.98rem,.95rem+.12vw,1.08rem)] leading-[1.62] tracking-[-0.01em] text-[var(--text-secondary)]">
                  <p>Kennel is Waldo&apos;s Mac work surface.</p>
                  <p>
                    It is where you can see the outcomes Waldo is carrying, the specialist agents working underneath them, what has changed, what needs your judgment, and what remains unfinished.
                  </p>
                  <p className="font-medium text-[var(--ink)]">What needs me, and what can Waldo keep handling?</p>
                  <p>
                    We are starting here because founders, engineers, and investors working across multiple AI agents already feel this coordination problem.
                  </p>
                </div>
              </article>

              <article className="rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
                <p className="type-caption text-[var(--text-tertiary)]">Personal</p>
                <h3 className="type-h2 mt-3 text-[var(--ink)]" style={{ fontSize: "clamp(1.5rem,1.3rem+.7vw,2rem)" }}>
                  Mobile
                </h3>
                <div className="mt-5 space-y-4 text-[clamp(.98rem,.95rem+.12vw,1.08rem)] leading-[1.62] tracking-[-0.01em] text-[var(--text-secondary)]">
                  <p>Mobile becomes the personal side of Waldo.</p>
                  <p>
                    It is where your day, communication, health context, priorities, decisions, and ongoing commitments come together.
                  </p>
                  <p>
                    It gives Waldo a better understanding of the person behind the work and gives you a simple place to make decisions, see what matters, and stay connected to the outcomes Waldo is carrying.
                  </p>
                </div>
              </article>

              <article className="rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
                <p className="type-caption text-[var(--text-tertiary)]">Everywhere else</p>
                <h3 className="type-h2 mt-3 text-[var(--ink)]" style={{ fontSize: "clamp(1.5rem,1.3rem+.7vw,2rem)" }}>
                  Messaging and browser
                </h3>
                <div className="mt-5 space-y-4 text-[clamp(.98rem,.95rem+.12vw,1.08rem)] leading-[1.62] tracking-[-0.01em] text-[var(--text-secondary)]">
                  <p>Waldo should also be reachable where you already work and communicate.</p>
                  <p>
                    Messaging and browser interfaces become lightweight ways to talk to the same Waldo rather than creating another separate assistant.
                  </p>
                  <p>
                    Underneath every surface is the same shared understanding of you, your permissions, your ongoing outcomes, and what remains.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.08] py-[clamp(4.75rem,7.5vw,8.5rem)]">
          <div className="mx-auto w-full max-w-[1180px] px-[clamp(1.25rem,3vw,3.5rem)]">
            <p className="type-caption text-[var(--text-tertiary)]">08</p>
            <h2 className="type-h1 mt-4 max-w-[18ch] text-[var(--ink)]" style={sectionHeadingStyle}>
              Our product philosophy
            </h2>

            <div className="mt-10 grid gap-x-10 gap-y-11 md:grid-cols-2 lg:mt-12 lg:gap-x-14 lg:gap-y-14">
              <Principle title="One person, one Waldo">
                <p>You should not have to recreate yourself inside every new AI product.</p>
                <p>Waldo should remain the persistent relationship while models, tools, and specialist agents change underneath it.</p>
              </Principle>

              <Principle title="Agents work for tasks. Waldo works for you.">
                <p>A coding agent may own a coding task. A research agent may own a research task. A browser agent may own an action.</p>
                <p>Waldo keeps track of why that work matters to you, how it connects to the larger outcome, and what needs to happen after those agents stop.</p>
              </Principle>

              <Principle title="Outcomes, not activity">
                <p>More agent runs are not the goal.</p>
                <p>More tasks completed are not necessarily the goal either.</p>
                <p>The goal is for something meaningful in your world to become true.</p>
                <p>Waldo begins with what you want to accomplish and works backward from there.</p>
              </Principle>

              <Principle title="Done should mean something actually changed">
                <p>A successful tool call, finished agent run, commit, document, or message may be evidence of progress.</p>
                <p>None of them automatically mean your outcome is complete.</p>
                <p>Waldo keeps the difference visible.</p>
              </Principle>

              <Principle title="Personal means understanding the person">
                <p>Memory is part of being personal, but it is not enough.</p>
                <p>
                  A truly personal agent should understand both <strong className="font-medium text-[var(--ink)]">who you are</strong> and <strong className="font-medium text-[var(--ink)]">the state you are in</strong>.
                </p>
                <p>
                  Your priorities, commitments, relationships, preferences, corrections, capacity, unfinished work, and changing circumstances all shape what the right action is.
                </p>
                <p>The same request may deserve a different response on two different days.</p>
                <p>
                  Waldo should understand enough of that changing context to plan, prioritize, delegate, interrupt, or leave you alone appropriately.
                </p>
              </Principle>

              <Principle title="More intelligence should create more human agency">
                <p>The purpose of Waldo is not to maximize the number of agents running around you.</p>
                <p>It is to help you carry less.</p>
                <div className="space-y-1">
                  {carryLess.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
                <p className="font-medium text-[var(--ink)]">More time and attention for the decisions that actually need you.</p>
              </Principle>
            </div>
          </div>
        </section>

        <ThesisSection eyebrow="09" title="Where we are starting">
          <p>
            We are starting with people already living in the agentic future: founders, engineers, and investors whose work already spans multiple AI agents, tools, and information streams.
          </p>
          <p>Kennel gives Waldo a focused starting point where the problem is already visible.</p>
          <ThesisCallout>
            Can one personal agent carry an outcome across multiple agents without making you the coordinator?
          </ThesisCallout>
          <p>
            From there, Waldo grows into the broader personal agent: one agent that understands the person, coordinates the intelligence around them, and stays with what matters across work and life.
          </p>
        </ThesisSection>

        <section className="border-t border-black/[0.08] py-[clamp(6rem,10vw,10rem)]">
          <div className="mx-auto w-full max-w-[1180px] px-[clamp(1.25rem,3vw,3.5rem)]">
            <div className="max-w-[920px]">
              <p className="type-caption text-[var(--text-tertiary)]">The long-term idea</p>
              <div className="mt-7 space-y-1 text-[clamp(1.9rem,1.45rem+1.8vw,3.45rem)] leading-[1.08] tracking-[-0.03em] text-[var(--ink)] sm:mt-8">
                <p>Models will keep getting better.</p>
                <p>Specialist agents will keep multiplying.</p>
                <p>Tools will change.</p>
                <p>Interfaces will change.</p>
              </div>

              <p className="mt-10 max-w-[64ch] text-[clamp(1rem,.965rem+.18vw,1.125rem)] leading-[1.65] tracking-[-0.012em] text-[var(--text-secondary)] sm:mt-12">
                The part that should remain constant is the agent that works for you.
              </p>

              <h2
                className="type-display mt-8 max-w-[760px] text-[var(--ink)] sm:mt-10"
                style={{
                  fontSize: "clamp(2.6rem, 2rem + 2.6vw, 4.6rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
              >
                One person. One Waldo.
              </h2>

              <p className="mt-6 max-w-[700px] text-[clamp(1.08rem,1rem+.3vw,1.32rem)] leading-[1.58] tracking-[-0.012em] text-[var(--text-secondary)]">
                An agent that understands you, coordinates the intelligence around you, and carries your outcomes to completion.
              </p>

              <p className="mt-8 text-[clamp(1rem,.965rem+.18vw,1.125rem)] font-medium leading-[1.6] text-[var(--ink)]">
                That is Waldo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SceneCloseSection />
    </div>
  );
}