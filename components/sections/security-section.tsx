"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

import { Aside, SectionIntro, withHighlights } from "@/components/landing-primitives";
import { RailArrows, useRailScroll } from "@/components/rail-controls";

type SecurityIconName = "lock" | "ban" | "shield" | "eye" | "file" | "check";

const securityCards = [
  {
    icon: "lock",
    headline: "Data stays on-device.",
    description:
      "Biometric data is processed locally where possible. Raw HealthKit data never leaves your phone unless you explicitly export.",
  },
  {
    icon: "ban",
    headline: "Never sold.",
    description: "We do not sell data. We do not share with advertisers. We do not train on your data. Period.",
  },
  {
    icon: "shield",
    headline: "Encrypted everywhere.",
    description:
      "Full encryption at rest and in transit. Your data is locked down from the moment it is created to the moment you read it.",
  },
  {
    icon: "eye",
    headline: "You see everything Waldo sees.",
    description:
      "View, edit, export, or delete your data anytime. Memory controls show exactly what Waldo remembers, and let you tell it to forget.",
  },
  {
    icon: "file",
    headline: "Metadata only for email.",
    description: "Waldo reads headers: sender, timestamp, thread depth. Never message body content. Hard line.",
  },
  {
    icon: "check",
    headline: "Nothing leaves without your tap.",
    description:
      "Emails never auto-send. Calendar invites never auto-send. Task completion always requires confirmation. Nothing goes out without you.",
  },
] satisfies Array<{
  icon: SecurityIconName;
  headline: string;
  description: string;
}>;

const autonomyLevels = [
  {
    label: "L1",
    name: "Inform",
    preview: "I'd move your 9am to 10:30. Want me to?",
    chips: ["Tell me why"],
  },
  {
    label: "L2",
    name: "Propose",
    preview: "Move your 9am to 10:30?",
    chips: ["Move it", "Keep it", "Let me think"],
  },
  {
    label: "L3",
    name: "Autonomous",
    preview: "Moved your 9am to 10:30.",
    chips: ["Undo"],
  },
] as const;

const accountBoundaryLanes = [
  {
    account: "suyash@work.com",
    badge: "WORK",
    outputs: ["Product review moved", "Linear task created"],
  },
  {
    account: "suyash@gmail.com",
    badge: "PERSONAL",
    outputs: ["Dinner block protected", "Personal email left untouched"],
  },
  {
    account: "team@company.com",
    badge: "TEAM",
    outputs: ["Team brief attached", "Shared doc kept in Drive"],
  },
] as const;

function SecurityIcon({ name }: { name: SecurityIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  return (
    <svg className="h-6 w-6 text-[var(--ink)]" viewBox="0 0 24 24" aria-hidden>
      {name === "lock" ? (
        <>
          <rect x="5.5" y="10" width="13" height="10" rx="2.5" {...common} />
          <path d="M8.5 10V7.8a3.5 3.5 0 0 1 7 0V10" {...common} />
        </>
      ) : null}
      {name === "ban" ? (
        <>
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="M7.8 7.8 16.2 16.2" {...common} />
        </>
      ) : null}
      {name === "shield" ? (
        <path d="M12 3.5 18 6v5.4c0 3.7-2.4 6.8-6 8.2-3.6-1.4-6-4.5-6-8.2V6l6-2.5Z" {...common} />
      ) : null}
      {name === "eye" ? (
        <>
          <path d="M3.5 12s3.2-5.5 8.5-5.5S20.5 12 20.5 12 17.3 17.5 12 17.5 3.5 12 3.5 12Z" {...common} />
          <circle cx="12" cy="12" r="2.3" {...common} />
        </>
      ) : null}
      {name === "file" ? (
        <>
          <path d="M7 3.8h6.2L17 7.6V20H7V3.8Z" {...common} />
          <path d="M13 4v4h4" {...common} />
          <path d="M9.6 12.2h4.8M9.6 15.4h4.8" {...common} />
        </>
      ) : null}
      {name === "check" ? (
        <>
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="m8.7 12.2 2.1 2.1 4.5-4.8" {...common} />
        </>
      ) : null}
    </svg>
  );
}

function SecurityCard({ card }: { card: (typeof securityCards)[number] }) {
  return (
    <article data-rail-card="true" data-stagger-item className="surface-card-top flex min-h-[210px] w-[280px] shrink-0 snap-start flex-col p-5 sm:w-[300px]">
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--surface-t3)]">
        <SecurityIcon name={card.icon} />
      </div>
      <h3 className="type-h3 mt-5 text-[var(--ink)]">{card.headline}</h3>
      <p className="type-body tone-secondary mt-3">{card.description}</p>
    </article>
  );
}

function AutonomyPreview({ level }: { level: (typeof autonomyLevels)[number] }) {
  return (
    <div className="rounded-[5px] bg-[var(--surface-t1)] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="type-caption text-[var(--text-tertiary)]">{level.label}</p>
          <p className="type-label mt-1 text-[var(--ink)]">{level.name}</p>
        </div>
        <span className="rounded-full bg-[var(--surface-t3)] px-3 py-1">
          <span className="type-caption text-[var(--text-secondary)]">preview</span>
        </span>
      </div>
      <p className="type-h3 mt-5 text-[var(--ink)]">{level.preview}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {level.chips.map((chip, index) => (
          <span
            key={chip}
            className={`type-caption rounded-full px-3 py-2 ${
              index === 0 && level.label !== "L1"
                ? "bg-[var(--ink)] text-[var(--surface-t2)]"
                : "bg-[var(--surface-t3)] text-[var(--text-secondary)]"
            }`}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function AutonomySlider() {
  const [level, setLevel] = useState(1);
  const current = autonomyLevels[level];

  return (
    <div className="surface-card grid gap-6 p-4 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="type-caption text-[var(--text-tertiary)]">Autonomy</p>
        <h3 className="type-h2 mt-3 text-[var(--ink)]">Your agent. Your rules.</h3>
        <p className="type-body tone-secondary mt-4">
          {withHighlights("Choose how much Waldo can do without asking. *You can change this anytime.*")}
        </p>
        <Aside className="mt-5">your keys, your car.</Aside>
      </div>

      <div className="rounded-[8px] bg-[var(--surface-t2)] p-3">
        <div className="grid grid-cols-3 gap-2">
          {autonomyLevels.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`focusable-ring rounded-[5px] px-3 py-3 text-left transition-[background-color,color] duration-150 ${
                index === level ? "bg-[var(--ink)] text-[var(--surface-t2)]" : "bg-[var(--surface-t1)] text-[var(--text-secondary)]"
              }`}
              onClick={() => setLevel(index)}
              aria-pressed={index === level}
            >
              <span className="type-caption block">{item.label}</span>
              <span className="type-label mt-1 block">{item.name}</span>
            </button>
          ))}
        </div>

        <Slider.Root
          className="relative mt-6 flex h-8 w-full touch-none select-none items-center"
          min={0}
          max={2}
          step={1}
          value={[level]}
          onValueChange={([value]) => setLevel(value ?? 0)}
          aria-label="Autonomy level"
        >
          <Slider.Track className="relative h-[var(--bar-h)] grow overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)]">
            <Slider.Range className="absolute h-full rounded-[var(--bar-radius)] bg-[var(--bar-fill-ink)]" />
          </Slider.Track>
          <Slider.Thumb className="focusable-ring block h-5 w-5 rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)]" />
        </Slider.Root>

        <div className="mt-5">
          <AutonomyPreview level={current} />
        </div>

        <p className="type-aside tone-tertiary mt-4">
          Even at Level 3, emails, calendar invites, and task completions always ask first. Some things always need a
          human.
        </p>
      </div>
    </div>
  );
}

function AccountBoundaryVisual() {
  return (
    <div className="waldo-account-boundary surface-card grid gap-4 p-4 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[16px] bg-[var(--surface-t1)] p-5">
        <p className="type-caption text-[var(--text-tertiary)]">Account boundaries</p>
        <h3 className="type-h2 mt-3 text-[var(--ink)]">Whole day, separated lanes.</h3>
        <p className="type-body tone-secondary mt-4">
          Waldo can understand the day without blending the accounts that make it up.
        </p>
        <Aside className="mt-5">context crosses the day. permissions do not.</Aside>
      </div>

      <div className="grid gap-3">
        {accountBoundaryLanes.map((lane) => (
          <article key={lane.account} className="waldo-boundary-lane rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="type-label text-[var(--ink)]">{lane.account}</p>
              <span className="type-caption rounded-full bg-[var(--ink)] px-3 py-1 text-[var(--surface-t2)]">{lane.badge}</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {lane.outputs.map((output) => (
                <div key={output} className="rounded-[10px] bg-[var(--surface-t2)] px-3 py-2">
                  <p className="type-caption text-[var(--ink)]">{output}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function SecuritySection() {
  const { railRef, canGoBack, canGoForward, scrollByCard } = useRailScroll();

  return (
    <section id="security" className="section-shell w-full scroll-mt-28 py-6 lg:py-8">
      <div data-animate="blur-fade">
        <SectionIntro
          title={
            <>
              Work and personal
              <br />
              stay separate.
            </>
          }
          aside="control travels with the account."
        >
          <p>
            Waldo can understand the whole day without blending the accounts that make it up.
          </p>
        </SectionIntro>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex justify-end">
          <RailArrows
            label="security details"
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            onScroll={scrollByCard}
          />
        </div>
        <div
          ref={railRef}
          data-animate="stagger"
          data-stagger="0.055"
          className="rail-fade flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Security commitments"
        >
          {securityCards.map((card) => (
            <SecurityCard key={card.headline} card={card} />
          ))}
        </div>
      </div>

      <div className="mt-5" data-animate="blur-fade">
        <AccountBoundaryVisual />
      </div>

      <div className="mt-4" data-animate="blur-fade">
        <AutonomySlider />
      </div>
    </section>
  );
}
