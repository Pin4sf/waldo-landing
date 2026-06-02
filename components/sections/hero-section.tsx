"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Aside, Readout, WaldoCTA, typeStyles } from "@/components/landing-primitives";

type HeroState = {
  lens: string;
  score: string;
  value: number;
  question: string;
  ring: string;
  headline: string;
  message: string;
  aside: string;
  signals: Array<{ label: string; value: string; read: string }>;
  connectors: Array<{ label: string; value: string; read: string }>;
};

const HERO_STATES: HeroState[] = [
  {
    lens: "Recovery",
    score: "63/100",
    value: 63,
    question: "What did last night give you?",
    ring: "var(--zone-peak)",
    headline: "Rough night, handled.",
    message:
      "Morning. About 5h 40m of sleep and HRV is sitting below baseline. Your 9am moved to 10:30. The afternoon stays open.",
    aside: "already on it.",
    signals: [
      { label: "Sleep", value: "5h 42m", read: "short night; morning gets lighter." },
      { label: "HRV", value: "38ms", read: "below baseline; pace adjusted." },
      { label: "Resting HR", value: "62 bpm", read: "steady enough for the afternoon." },
    ],
    connectors: [
      { label: "Apple Health", value: "6:12am", read: "read after wake." },
      { label: "Calendar", value: "2 moved", read: "morning pressure reduced." },
      { label: "Slack", value: "focus set", read: "team gets the quiet version." },
    ],
  },
  {
    lens: "Form",
    score: "76/100",
    value: 76,
    question: "What can you handle right now?",
    ring: "var(--accent)",
    headline: "The 3pm stays.",
    message:
      "Stress climbed after lunch, but the investor call matters. The low-priority block after it moved. Your afternoon has room again.",
    aside: "you did not ask. you did not need to.",
    signals: [
      { label: "Circadian", value: "aligned", read: "the useful window is open." },
      { label: "Stress", value: "climbing", read: "watching the next hour." },
      { label: "Motion", value: "4,200", read: "enough movement; no extra nudge." },
    ],
    connectors: [
      { label: "Apple Health", value: "flagged", read: "stress crossed the watch line." },
      { label: "Calendar", value: "1 pulled", read: "low-value time removed." },
      { label: "Gmail", value: "14 read", read: "metadata only; urgency checked." },
    ],
  },
  {
    lens: "Weight",
    score: "84/100",
    value: 84,
    question: "What is today asking of you?",
    ring: "var(--zone-heavy)",
    headline: "The week was heavy.",
    message:
      "Meeting load is high and your Load is 14/21. Friday afternoon cleared. The retro shifted away from the recovery window.",
    aside: "already moved.",
    signals: [
      { label: "The Stack", value: "6 meetings", read: "dense day; room reclaimed." },
      { label: "Signal Pressure", value: "high", read: "only urgent threads surface." },
      { label: "Load", value: "14/21", read: "physical strain is part of the plan." },
    ],
    connectors: [
      { label: "Calendar", value: "3 moved", read: "demand pushed down." },
      { label: "Linear", value: "3 tasks", read: "non-urgent work slipped." },
      { label: "Gmail", value: "14 read", read: "volume counted, content untouched." },
    ],
  },
];

function DonutRing({ state }: { state: HeroState }) {
  const size = 136;
  const radius = 52;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="surface-card hero-floating-card w-[188px] p-4" style={{ "--card-rotate": "1.5deg" } as CSSProperties}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${state.lens} ${state.score}. ${state.question}`}
        className="mx-auto block"
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-default)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={state.ring}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - state.value / 100)}
          strokeWidth={stroke}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <circle cx={size / 2} cy={size / 2} r={32} fill="var(--surface-t1)" stroke="var(--border-default)" />
        <text x={size / 2} y={size / 2 - 3} textAnchor="middle" dominantBaseline="middle" fill="var(--ink)" style={{ ...typeStyles.data, fontSize: "1.55rem", lineHeight: 1 }}>
          {state.score.split("/")[0]}
        </text>
        <text x={size / 2} y={size / 2 + 22} textAnchor="middle" dominantBaseline="middle" fill="var(--text-secondary)" style={{ ...typeStyles.caption, fontWeight: 500 }}>
          {state.lens}
        </text>
      </svg>
      <Aside className="mt-3 text-center">{state.question}</Aside>
    </div>
  );
}

function ActionCard({ state }: { state: HeroState }) {
  return (
    <div className="surface-card hero-floating-card w-full max-w-[352px] p-5 sm:p-6" style={{ "--card-rotate": "-1.4deg" } as CSSProperties}>
      <div className="flex items-center justify-between gap-4">
        <p className="type-label text-[var(--text-secondary)]">{state.lens}</p>
        <span className="type-caption rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] px-3 py-1 text-[var(--text-secondary)]">
          live read
        </span>
      </div>
      <h3 className="type-h3 mt-4 text-[var(--ink)]">{state.headline}</h3>
      <p className="type-body mt-3 text-[var(--text-secondary)]">{state.message}</p>
      <Aside className="mt-4">{state.aside}</Aside>
    </div>
  );
}

function ConnectorStrip({ state }: { state: HeroState }) {
  return (
    <div className="surface-card hero-floating-card hidden w-[292px] gap-3 p-4 lg:grid" style={{ "--card-rotate": "2deg" } as CSSProperties}>
      {state.connectors.map((connector) => (
        <div key={connector.label} className="surface-card-top p-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="type-caption text-[var(--text-secondary)]">{connector.label}</span>
            <span className="type-data text-[var(--ink)]" style={{ fontSize: "0.75rem" }}>
              {connector.value}
            </span>
          </div>
          <p className="type-aside mt-1 text-[var(--text-tertiary)]">{connector.read}</p>
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const [active, setActive] = useState(0);
  const state = HERO_STATES[active];

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % HERO_STATES.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const mobileReads = useMemo(() => state.signals.slice(0, 2), [state]);

  return (
    <section
      id="hero"
      className="relative min-h-[1100px] overflow-hidden bg-[var(--surface-t3)] sm:min-h-[1120px] xl:min-h-[920px]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        width: "100vw",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden" style={{ aspectRatio: "1440 / 720" }}>
        <Image
          src="/assets/hero-bg.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-bottom"
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[128px] z-20 w-[104px] -translate-x-1/2 sm:top-[132px] sm:w-[124px] lg:top-[118px]">
        <Image
          src="/illustrations/default.svg"
          alt="Waldo"
          width={169}
          height={131}
          priority
          className="h-auto w-full drop-shadow-[0_7px_0_rgba(250,250,248,0.68)]"
        />
      </div>

      <div className="absolute left-1/2 top-[255px] z-20 flex w-[min(90vw,780px)] -translate-x-1/2 flex-col items-center text-center sm:top-[310px] lg:top-[292px] xl:top-[310px]">
        <h1 className="type-display text-[var(--ink)]" data-animate="headline">
          <span className="hero-title-mobile">
            The first app that
            <br />
            knows how you feel
            <br />
            and does something
            <br />
            about it.
          </span>
          <span className="hero-title-desktop">
            The first app that knows
            <br />
            how you feel and does
            <br />
            something about it.
          </span>
        </h1>

        <div className="type-body mt-6 max-w-[58ch] text-[var(--text-secondary)] sm:mt-8">
          <p>Waldo monitors your health wearable 24/7 and understands what your body is actually telling you.</p>
          <p className="mt-1 font-medium text-[var(--ink)]">Then it does something about it.</p>
          <Aside className="mt-3">Your schedule. Your meals. Your sleep. Your stress. All of it.</Aside>
        </div>

        <WaldoCTA className="mt-8 sm:mt-10" />
      </div>

      <div className="absolute left-1/2 top-[720px] z-20 grid w-[min(92vw,420px)] -translate-x-1/2 gap-3 sm:top-[760px] xl:hidden">
        <ActionCard state={state} />
        <div className="grid grid-cols-2 gap-3">
          {mobileReads.map((read) => (
            <Readout key={read.label} {...read} />
          ))}
        </div>
      </div>

      <div className="absolute left-[max(32px,calc(50vw-560px))] top-[56px] z-20 hidden xl:block">
        <ActionCard state={state} />
      </div>
      <div className="absolute right-[max(40px,calc(50vw-520px))] top-[72px] z-20 hidden xl:block">
        <DonutRing state={state} />
      </div>
      <div className="absolute right-[max(32px,calc(50vw-560px))] top-[532px] z-20 hidden xl:block">
        <ConnectorStrip state={state} />
      </div>
      <div className="absolute left-[max(40px,calc(50vw-520px))] top-[748px] z-20 hidden grid-cols-3 gap-3 xl:grid">
        {state.signals.map((signal) => (
          <div key={signal.label} className="surface-card hero-floating-card w-[150px] p-4" style={{ "--card-rotate": "-0.8deg" } as CSSProperties}>
            <p className="type-caption text-[var(--text-secondary)]">{signal.label}</p>
            <p className="type-data mt-2 text-[var(--ink)]" style={{ fontSize: "1.125rem", lineHeight: 1.1 }}>
              {signal.value}
            </p>
            <Aside className="mt-2">{signal.read}</Aside>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {HERO_STATES.map((item, index) => (
          <button
            key={item.lens}
            type="button"
            aria-label={`Show ${item.lens}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className="focusable-ring h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-premium)]"
            style={{
              width: active === index ? "24px" : "8px",
              background: active === index ? "var(--ink)" : "var(--border-focus)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
