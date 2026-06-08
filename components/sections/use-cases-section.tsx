"use client";

import { Fragment } from "react";

import { Aside, SectionIntro } from "@/components/landing-primitives";
import { RailArrows, useRailScroll } from "@/components/rail-controls";

type HealthSignal = {
  key: string;
  label: string;
  glyph: string;
  headline: string;
  body: string;
  phase?: string;
  readings: string[];
};

const healthSignals: HealthSignal[] = [
  {
    key: "sleep",
    label: "Sleep",
    glyph: "SL",
    headline: "Sleep like you mean it.",
    body:
      "Your watch already knows how long you slept. Waldo knows what that means for tomorrow. Four stages tracked, sleep debt calculated on a 14-day rolling window, and bedtime consistency scored - not so you can stare at a chart, but so your 9am moves itself when last night wasn't enough. Waldo doesn't rate your sleep. It responds to it.",
    readings: ["Stages", "Debt", "Consistency"],
  },
  {
    key: "heart",
    label: "Heart",
    glyph: "HR",
    headline: "Stay close to your heart.",
    body:
      "Your heart rate tells a story every hour of the day. Waldo reads the quiet chapters - resting HR trends across weeks, HRV dips that predict bad days before they arrive, baseline shifts that take months to notice on your own. When your numbers drift from your normal, Waldo doesn't send a notification. It starts adjusting your week.",
    readings: ["Resting HR", "HRV", "Baseline"],
  },
  {
    key: "stress",
    label: "Stress",
    glyph: "ST",
    headline: "Stress caught, not managed.",
    body:
      "Most apps tell you to breathe. Waldo clears your afternoon. Real-time stress confidence - not a daily score, a live signal - cross-referenced against your calendar and circadian state. When stress sustains past a threshold, Waldo removes the cause instead of suggesting you cope with it. The difference between a notification and an intervention.",
    readings: ["Live signal", "Calendar", "Threshold"],
  },
  {
    key: "fitness",
    label: "Fitness",
    glyph: "FT",
    headline: "Motion that fits the day.",
    body:
      "Steps, active energy, VO2Max, workouts - all of it feeding into one question: what can your body handle next? A hard morning session means your afternoon needs space. Waldo identifies the post-exercise recovery window and protects it in your calendar. Your gym session stops being isolated from the rest of your day.",
    readings: ["Steps", "VO2Max", "Recovery"],
  },
  {
    key: "cycle",
    label: "Cycle",
    glyph: "CY",
    headline: "Your cycle, factored in.",
    body:
      "Hormonal fluctuations affect energy, sleep quality, stress tolerance, and cognitive performance in ways that most productivity tools completely ignore. Waldo reads cycle data from Apple Health and adjusts accordingly - lighter scheduling during predicted low-energy phases, protected recovery time during menstruation, and pattern tracking that connects cycle position to sleep quality over months. Not a separate feature. Just part of how Waldo sees your day.",
    readings: ["Energy", "Sleep quality", "Stress tolerance"],
  },
  {
    key: "mental-health",
    label: "Mental health",
    glyph: "MH",
    headline: "The check-in you don't have to start.",
    body:
      "Waldo tracks the signals you might not notice yourself - sleep fragmentation increasing over weeks, HRV trending downward, stress events clustering around the same triggers. It won't diagnose anything. But when five of six dimensions on The Slope start declining, Waldo tells you. Gently, with data, and early enough to change course.",
    readings: ["Slope", "Triggers", "Trend"],
  },
  {
    key: "health-records",
    label: "Health records",
    glyph: "LAB",
    headline: "Your labs, in the picture.",
    body:
      "Blood tests, clinical notes, biomarker reports - sitting in a PDF somewhere you'll never open again. Waldo reads them, cross-references with your wearable data, and spots the connections your doctor sees once a year and your watch sees every day. Vitamin D low and sleep quality dropping? Connected. Waldo sees both sides.",
    phase: "Phase 2",
    readings: ["Labs", "Notes", "Biomarkers"],
  },
  {
    key: "nutrition",
    label: "Nutrition",
    glyph: "NUT",
    headline: "What you ate, what it did.",
    body:
      "Caffeine at 4pm and restless sleep at midnight. Alcohol on Saturday and depleted Recovery on Sunday. Waldo connects what goes in with what comes out - not through calorie counting, but through correlation. Self-report what you consumed, and Waldo maps it to your biometric response over time. The pattern is the insight.",
    phase: "Phase 2",
    readings: ["Caffeine", "Alcohol", "Response"],
  },
];

function SignalVisual({ signal }: { signal: HealthSignal }) {
  return (
    <div className="rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-[var(--ink)] text-[var(--surface-t2)]">
          <span className="type-label">{signal.glyph}</span>
        </div>
        <div className="grid flex-1 gap-2">
          {signal.readings.map((reading, index) => (
            <div key={reading} className="grid grid-cols-[minmax(74px,0.68fr)_1fr] items-center gap-3">
              <p className="type-caption truncate text-[var(--text-tertiary)]">{reading}</p>
              <div className="h-[var(--bar-h)] overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)]">
                <div
                  className="h-full rounded-[var(--bar-radius)] bg-[var(--bar-fill-neutral)]"
                  style={{ width: `${64 + index * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
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
          eyebrow="Health signals"
          title={
            <>
              Health signals,
              <br />
              finally connected.
            </>
          }
          className="mx-0 items-start text-left"
        />

        <RailArrows
          label="health signals"
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onScroll={scrollByCard}
        />
      </div>

      <div
        ref={railRef}
        data-lenis-prevent
        data-animate="stagger"
        data-stagger="0.055"
        className="rail-fade mt-10 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Health signals"
      >
        <div className="flex w-max items-stretch">
          {healthSignals.map((signal, index) => (
            <Fragment key={signal.key}>
              <article
                id={`health-signal-${signal.key}`}
                data-rail-card="true"
                data-stagger-item
                className="surface-card flex min-h-[590px] w-[304px] shrink-0 snap-start scroll-mt-28 flex-col p-5 sm:w-[360px] lg:w-[430px]"
              >
                <SignalVisual signal={signal} />

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
                    <p className="type-caption uppercase text-[var(--text-tertiary)]">{signal.label}</p>
                  </div>
                  {signal.phase ? (
                    <span className="type-caption rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] px-3 py-1 text-[var(--text-secondary)]">
                      {signal.phase}
                    </span>
                  ) : null}
                </div>

                <h3 className="type-h3 mt-5 text-[var(--ink)]">{signal.headline}</h3>
                <p className="type-body tone-secondary mt-3">{signal.body}</p>
              </article>
              {index < healthSignals.length - 1 ? <div aria-hidden className="w-4 shrink-0" /> : null}
            </Fragment>
          ))}
        </div>
      </div>

      <Aside className="mt-6 text-center">your watch collects it. Waldo connects it. your body tells the rest.</Aside>
    </section>
  );
}
