"use client";

import { Fragment } from "react";

import { Aside, SectionIntro } from "@/components/landing-primitives";
import { RailArrows, useRailScroll } from "@/components/rail-controls";

type RoleCard = {
  key: string;
  role: string;
  glyph: string;
  headline: string;
  signals: string[];
  apps: string[];
  job: string;
  receipt: string;
};

const roleCards: RoleCard[] = [
  {
    key: "founder",
    role: "Founder",
    glyph: "FO",
    headline: "Fewer decisions before the first decision.",
    signals: ["Recovery 63", "6 meetings", "104 emails"],
    apps: ["Calendar", "Gmail", "Linear"],
    job: "Move the review, surface two threads, hold the deck window.",
    receipt: "9am moved. Two threads surfaced. Deck prep waiting.",
  },
  {
    key: "product",
    role: "Product lead",
    glyph: "PL",
    headline: "Roadmap work gets the sharp hours.",
    signals: ["Form 76", "circadian peak", "deck task"],
    apps: ["Linear", "Drive", "Calendar"],
    job: "Pull context, block the review window, attach the prior notes.",
    receipt: "Focus block held. Ticket and notes attached.",
  },
  {
    key: "operator",
    role: "Operator",
    glyph: "OP",
    headline: "Busy days get routed before they pile up.",
    signals: ["task carryover", "late Slack", "meeting stack"],
    apps: ["Slack", "Todoist", "Calendar"],
    job: "Batch low-priority threads, create the real follow-ups, move soft meetings.",
    receipt: "Two tasks created. Slack batch queued.",
  },
  {
    key: "gtm",
    role: "GTM",
    glyph: "GT",
    headline: "Pipeline follow-up without the morning scramble.",
    signals: ["short sleep", "call block", "inbox pressure"],
    apps: ["Gmail", "HubSpot", "Calendar"],
    job: "Draft the follow-up, protect call prep, leave send for approval.",
    receipt: "Follow-up drafted. Prep slot protected.",
  },
  {
    key: "creator",
    role: "Creator",
    glyph: "CR",
    headline: "Creative work gets a cleaner runway.",
    signals: ["stress rising", "best window", "draft backlog"],
    apps: ["Notion", "Drive", "Calendar"],
    job: "Clear the deep-work slot and gather the source material.",
    receipt: "Writing window held. Source docs stacked.",
  },
  {
    key: "student",
    role: "Student",
    glyph: "ST",
    headline: "Study blocks fit the body, not just the calendar.",
    signals: ["sleep debt", "exam week", "task load"],
    apps: ["Calendar", "Todoist", "Gmail"],
    job: "Shift the hard session to the stronger window and protect recovery.",
    receipt: "Study block moved. Recovery window kept.",
  },
];

function RoleVisual({ card }: { card: RoleCard }) {
  return (
    <div className="rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-[var(--ink)] text-[var(--surface-t2)]">
          <span className="type-label">{card.glyph}</span>
        </div>
        <div className="grid flex-1 gap-2">
          {card.signals.map((signal, index) => (
            <div key={signal} className="grid grid-cols-[minmax(96px,0.78fr)_1fr] items-center gap-3">
              <p className="type-caption truncate text-[var(--text-tertiary)]">{signal}</p>
              <div className="h-[var(--bar-h)] overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)]">
                <div
                  className="h-full rounded-[var(--bar-radius)] bg-[var(--bar-fill-neutral)]"
                  style={{ width: `${58 + index * 14}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {card.apps.map((app) => (
          <span key={app} className="type-caption rounded-full bg-[var(--surface-t3)] px-3 py-1.5 text-[var(--text-secondary)]">
            {app}
          </span>
        ))}
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const { railRef, canGoBack, canGoForward, scrollByCard } = useRailScroll();

  return (
    <section id="use-cases" className="section-shell w-full scroll-mt-28 overflow-hidden py-6 lg:py-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-animate="blur-fade">
        <SectionIntro
          eyebrow="Workflows"
          title={
            <>
              Built for
              <br />
              how you work.
            </>
          }
          className="mx-0 items-start text-left"
        />

        <RailArrows
          label="workflows"
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onScroll={scrollByCard}
        />
      </div>

      <div
        ref={railRef}
        data-animate="stagger"
        data-stagger="0.055"
        className="rail-fade mt-10 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Waldo workflow cards"
      >
        <div className="flex w-max items-stretch">
          {roleCards.map((card, index) => (
            <Fragment key={card.key}>
              <article
                id={`workflow-${card.key}`}
                data-rail-card="true"
                data-stagger-item
                className="surface-card flex min-h-[590px] w-[304px] shrink-0 snap-start scroll-mt-28 flex-col p-5 sm:w-[360px] lg:w-[430px]"
              >
                <RoleVisual card={card} />

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
                  <p className="type-caption uppercase text-[var(--text-tertiary)]">{card.role}</p>
                </div>

                <h3 className="type-h3 mt-5 text-[var(--ink)]">{card.headline}</h3>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-[12px] bg-[var(--surface-t1)] p-3">
                    <p className="type-caption text-[var(--text-tertiary)]">Job done</p>
                    <p className="type-caption mt-1 text-[var(--ink)]">{card.job}</p>
                  </div>
                  <div className="rounded-[12px] bg-[var(--surface-t1)] p-3">
                    <p className="type-caption text-[var(--text-tertiary)]">Receipt</p>
                    <p className="type-caption mt-1 text-[var(--ink)]">{card.receipt}</p>
                  </div>
                </div>
              </article>
              {index < roleCards.length - 1 ? <div aria-hidden className="w-4 shrink-0" /> : null}
            </Fragment>
          ))}
        </div>
      </div>

      <Aside className="mt-6 text-center">signals read. apps touched. work finished.</Aside>
    </section>
  );
}
