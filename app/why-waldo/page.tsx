import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { NewHomeNav } from "@/components/home/new-home-nav";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const pageTitle = "Why Waldo — One personal agent for a world full of agents";
const pageDescription =
  "Waldo is a personal agent across work and life that understands you, coordinates specialist AI agents and tools, and carries outcomes from intent to resolution.";

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
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-black/[0.08] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-[clamp(1rem,.5rem+3vw,2.5rem)] lg:grid-cols-[minmax(0,280px)_minmax(0,720px)] lg:gap-20">
        <div>
          {eyebrow ? (
            <p className="type-caption text-[var(--text-tertiary)]">{eyebrow}</p>
          ) : null}
          <h2 className="mt-3 font-[var(--font-headline)] text-[clamp(1.75rem,1.35rem+1.8vw,2.6rem)] font-normal leading-[1.12] tracking-[-0.02em] text-[var(--ink)]">
            {title}
          </h2>
        </div>
        <div className="space-y-5 type-body text-[var(--text-secondary)]">{children}</div>
      </div>
    </section>
  );
}

function Principle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="border-t border-black/[0.08] pt-6">
      <h3 className="font-[var(--font-body)] text-lg font-medium tracking-[-0.01em] text-[var(--ink)]">
        {title}
      </h3>
      <div className="mt-3 space-y-3 type-body text-[var(--text-secondary)]">{children}</div>
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
      <a
        href="#why-waldo-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--surface-t2)]"
      >
        Skip to content
      </a>
      <NewHomeNav />

      <main id="why-waldo-main">
        <header className="mx-auto w-full max-w-[1200px] px-[clamp(1rem,.5rem+3vw,2.5rem)] pb-24 pt-28 sm:pb-28 sm:pt-36 lg:pb-36 lg:pt-44">
          <div className="max-w-[900px]">
            <p className="type-caption text-[var(--text-tertiary)]">Why Waldo</p>
            <h1 className="type-display mt-5 max-w-[860px]">
              <span className="block">One personal agent</span>
              <span className="block">for a world full of agents.</span>
            </h1>
            <p className="mt-8 max-w-[660px] type-body text-[var(--text-secondary)]">
              Tell Waldo what you want to get done.
            </p>
            <p className="mt-3 max-w-[720px] type-body text-[var(--text-secondary)]">
              Waldo understands your context, coordinates the right AI agents and tools, brings you in when your judgment matters, and carries the work until the outcome is actually resolved.
            </p>
            <p className="mt-3 max-w-[720px] type-body text-[var(--text-secondary)]">
              As AI becomes more capable, people should not have to become managers of AI.
            </p>
            <div className="mt-10 max-w-[720px] border-l-2 border-[var(--accent)] pl-5">
              <p className="font-[var(--font-headline)] text-[clamp(1.4rem,1.15rem+1.2vw,2rem)] leading-[1.2] tracking-[-0.01em] text-[var(--ink)]">
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
          <div className="my-7 rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
            <p>An agent can finish writing the code while the release is still blocked.</p>
            <p className="mt-3">A research agent can return a report while the decision is still unresolved.</p>
            <p className="mt-3">An email can be drafted while the commitment behind it is still open.</p>
          </div>
          <p>The person still has to:</p>
          <ul className="grid gap-x-8 gap-y-2 pl-5 sm:grid-cols-2">
            {coordinationBurden.map((item) => (
              <li key={item} className="list-disc marker:text-[var(--text-tertiary)]">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-l-2 border-[var(--accent)] pl-5">
            <p className="font-medium text-[var(--ink)]">Agents execute tasks.</p>
            <p className="font-medium text-[var(--ink)]">The person still carries the outcome.</p>
          </div>
          <p>Waldo is built to change that.</p>
        </ThesisSection>

        <ThesisSection eyebrow="03" title="How Waldo works">
          <p>You start with what you want to accomplish.</p>
          <div className="my-7 space-y-2 rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
            <p className="font-medium text-[var(--ink)]">Ship this release by Friday.</p>
            <p className="font-medium text-[var(--ink)]">Research these options and help me make the decision.</p>
            <p className="font-medium text-[var(--ink)]">Plan my week around everything I need to finish.</p>
          </div>
          <p>Waldo keeps the larger outcome in view.</p>
          <p>
            It can break the work down, coordinate the right specialist agents and tools, follow what happens, and bring you back when a meaningful decision requires you.
          </p>
          <p>But Waldo does not treat an agent saying &quot;done&quot; as the end.</p>
          <p>It keeps track of:</p>
          <ul className="grid gap-x-8 gap-y-2 pl-5 sm:grid-cols-2">
            {outcomeState.map((item) => (
              <li key={item} className="list-disc marker:text-[var(--text-tertiary)]">
                {item}
              </li>
            ))}
          </ul>
          <p>
            An outcome may be completed, reopened, deferred, transferred, or consciously dropped.
          </p>
          <p>Either way, it does not silently disappear when an agent session ends.</p>
          <p className="font-medium text-[var(--ink)]">Waldo stays with the outcome from intent to resolution.</p>
        </ThesisSection>

        <ThesisSection eyebrow="04" title="Agents work on tasks. Waldo carries outcomes.">
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

        <ThesisSection eyebrow="05" title="One Waldo across work and life">
          <p>The person using AI at work is the same person living the rest of their life.</p>
          <div className="my-7 grid gap-3 sm:grid-cols-2">
            {["Your meetings affect your focus.", "Your health affects your capacity.", "Your commitments affect your priorities.", "Your work affects your day."].map((line) => (
              <p key={line} className="rounded-[20px] border border-black/[0.08] bg-[var(--surface-t2)] px-5 py-4 text-[var(--ink)]">
                {line}
              </p>
            ))}
          </div>
          <p>Most software treats these as separate worlds.</p>
          <p className="font-medium text-[var(--ink)]">Waldo does not.</p>
          <p>
            Waldo is designed as one continuing relationship across work and life, instead of a different assistant for every part of you.
          </p>
        </ThesisSection>

        <ThesisSection eyebrow="06" title="Health-aware by design">
          <p>A truly personal agent should understand more than your inbox and calendar.</p>
          <p>
            With your permission, Waldo can use personal context such as sleep, recovery, stress, activity, and changing capacity to better understand how to help.
          </p>
          <div className="my-7 border-l-2 border-[var(--accent)] pl-5">
            <p>Not as another health dashboard.</p>
            <p>Not to make medical decisions for you.</p>
          </div>
          <p>But because the right plan can change depending on the person behind it.</p>
          <p>
            A low-recovery day may mean protecting focus, moving lower-priority work, delegating more, or reducing unnecessary interruptions.
          </p>
          <p>A high-capacity day may look different.</p>
          <p className="font-medium text-[var(--ink)]">
            Health becomes part of understanding you, not another score for you to manage.
          </p>
        </ThesisSection>

        <section className="border-t border-black/[0.08] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1rem,.5rem+3vw,2.5rem)]">
            <p className="type-caption text-[var(--text-tertiary)]">07</p>
            <h2 className="mt-3 max-w-[720px] font-[var(--font-headline)] text-[clamp(1.75rem,1.35rem+1.8vw,2.6rem)] font-normal leading-[1.12] tracking-[-0.02em]">
              The Waldo ecosystem
            </h2>
            <p className="mt-5 max-w-[720px] type-body text-[var(--text-secondary)]">
              There is one Waldo, expressed through different surfaces.
            </p>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <article className="rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
                <p className="type-caption text-[var(--text-tertiary)]">Work</p>
                <h3 className="mt-3 font-[var(--font-headline)] text-2xl font-normal tracking-[-0.01em]">Kennel</h3>
                <div className="mt-5 space-y-4 type-body text-[var(--text-secondary)]">
                  <p>Kennel is Waldo&apos;s Mac work surface.</p>
                  <p>
                    It is where you can see the outcomes Waldo is carrying, the specialist agents working underneath them, what has changed, what needs your judgment, and what remains unfinished.
                  </p>
                  <p className="font-medium text-[var(--ink)]">What needs me, and what can Waldo keep handling?</p>
                  <p>
                    We are starting here because founders and engineers already using multiple AI agents feel this coordination problem first.
                  </p>
                </div>
              </article>

              <article className="rounded-[24px] border border-black/[0.08] bg-[var(--surface-t2)] p-6 sm:p-8">
                <p className="type-caption text-[var(--text-tertiary)]">Personal</p>
                <h3 className="mt-3 font-[var(--font-headline)] text-2xl font-normal tracking-[-0.01em]">Mobile</h3>
                <div className="mt-5 space-y-4 type-body text-[var(--text-secondary)]">
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
                <h3 className="mt-3 font-[var(--font-headline)] text-2xl font-normal tracking-[-0.01em]">Messaging and browser</h3>
                <div className="mt-5 space-y-4 type-body text-[var(--text-secondary)]">
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

        <section className="border-t border-black/[0.08] py-20 sm:py-24 lg:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1rem,.5rem+3vw,2.5rem)]">
            <p className="type-caption text-[var(--text-tertiary)]">08</p>
            <h2 className="mt-3 max-w-[720px] font-[var(--font-headline)] text-[clamp(1.75rem,1.35rem+1.8vw,2.6rem)] font-normal leading-[1.12] tracking-[-0.02em]">
              Our product philosophy
            </h2>

            <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
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

              <Principle title="Personal means more than memory">
                <p>Remembering your favorite airline or writing style is useful.</p>
                <p>But understanding your priorities, capacity, commitments, preferences, corrections, and changing circumstances is what makes an agent meaningfully personal.</p>
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
            We are starting with people already living in the agentic future: founders and engineers using multiple AI agents in their daily work.
          </p>
          <p>Kennel gives Waldo a focused starting point where the problem is already visible.</p>
          <div className="my-7 border-l-2 border-[var(--accent)] pl-5">
            <p className="font-medium text-[var(--ink)]">
              Can one personal agent help someone carry an outcome across multiple agents without forcing them to become the coordinator?
            </p>
          </div>
          <p>
            From there, Waldo grows into the broader personal agent: one agent that understands the person, coordinates the intelligence around them, and stays with what matters across work and life.
          </p>
        </ThesisSection>

        <section className="border-t border-black/[0.08] py-24 sm:py-32 lg:py-40">
          <div className="mx-auto w-full max-w-[1200px] px-[clamp(1rem,.5rem+3vw,2.5rem)]">
            <div className="max-w-[900px]">
              <p className="type-caption text-[var(--text-tertiary)]">The long-term idea</p>
              <div className="mt-6 space-y-2 font-[var(--font-headline)] text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-[1.14] tracking-[-0.02em]">
                <p>Models will keep getting better.</p>
                <p>Specialist agents will keep multiplying.</p>
                <p>Tools will change.</p>
                <p>Interfaces will change.</p>
              </div>
              <p className="mt-10 max-w-[760px] type-body text-[var(--text-secondary)]">
                The part that should remain constant is the agent that works for you.
              </p>
              <p className="mt-6 max-w-[860px] font-[var(--font-headline)] text-[clamp(1.5rem,1.1rem+1.7vw,2.6rem)] leading-[1.18] tracking-[-0.02em]">
                One personal agent that understands you, represents your intent, coordinates the intelligence around you, and carries your outcomes from what you want to what actually becomes true.
              </p>
              <p className="mt-8 type-body font-medium text-[var(--ink)]">That is Waldo.</p>

              <div className="mt-12 flex flex-wrap gap-3">
                <Link
                  href="/waitlist"
                  className="focusable-ring type-label inline-flex h-12 items-center justify-center rounded-full bg-[var(--ink)] px-6 text-[var(--surface-t2)] transition-transform duration-300 hover:-translate-y-px active:scale-[0.98]"
                >
                  Let Waldo in →
                </Link>
                <Link
                  href="/"
                  className="focusable-ring type-label inline-flex h-12 items-center justify-center rounded-full border border-black/[0.08] bg-[var(--surface-t2)] px-6 text-[var(--ink)] transition-transform duration-300 hover:-translate-y-px active:scale-[0.98]"
                >
                  Back to Waldo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
