"use client";

import { useEffect, useRef, useState } from "react";

import { Aside } from "@/components/landing-primitives";

// Block 2 — THE PROBLEM
// Two interactive artifacts inside the dark "machine layer" container:
// a live data ticker that reveals log lines one by one on scroll, and an
// app graveyard whose cards flip to a single dismissive verdict.

type LogLine = { time: string; text: string };

const logLines: LogLine[] = [
  { time: "6:12am", text: "REM cycle ended. Light sleep began." },
  { time: "6:14am", text: "Resting HR: 62 bpm" },
  { time: "6:15am", text: "HRV: 38ms — 12% below your baseline" },
  { time: "6:41am", text: "First movement detected" },
  { time: "7:02am", text: "Blood oxygen: 96%" },
  { time: "7:15am", text: "Stand reminder sent. Ignored." },
  { time: "7:34am", text: "Steps: 340. Circadian: misaligned." },
  { time: "7:58am", text: "Stress: elevated. Cause: unknown." },
  { time: "8:00am", text: "Calendar: 4 meetings. Body: not ready." },
  { time: "8:01am", text: "No app acted on any of this." },
];

const graveyard = [
  { app: "Apple Health", verdict: "Shows you a chart." },
  { app: "WHOOP", verdict: "Gives you a score." },
  { app: "Oura", verdict: "Sends a notification." },
  { app: "Fitbit", verdict: "Suggests a walk." },
  { app: "Sleep Cycle", verdict: "Rates your night." },
];

function DataTicker() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!node) return;

    if (reduce) {
      const frame = window.requestAnimationFrame(() => setVisible(logLines.length));
      return () => window.cancelAnimationFrame(frame);
    }

    let timer: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === null) {
          timer = setInterval(() => {
            setVisible((count) => {
              if (count >= logLines.length) {
                if (timer) clearInterval(timer);
                return count;
              }
              return count + 1;
            });
          }, 280);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="dark-card w-full overflow-hidden rounded-[10px] p-5 text-left sm:rounded-[8px] sm:p-6"
    >
      <div className="flex items-center gap-2 border-b border-[var(--panel-border)] pb-3">
        <span
          className="inline-block h-2 w-2 rounded-full bg-[var(--zone-peak)]"
          style={{ animation: "live-dot 1.8s ease-in-out infinite" }}
          aria-hidden
        />
        <span className="type-caption tone-d-tertiary uppercase">
          Live — your watch is logging
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {logLines.map((line, index) => {
          const shown = index < visible;
          const isLast = index === logLines.length - 1;
          return (
            <li
              key={line.time + line.text}
              className="type-caption flex gap-3"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 420ms ease-out, transform 420ms ease-out",
              }}
            >
              <span className="type-data shrink-0 text-[var(--text-tertiary)]">{line.time}</span>
              <span className={isLast ? "tone-d-primary" : "tone-d-secondary"}>
                {line.text}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="type-aside tone-d-tertiary mt-5 border-t border-[var(--panel-border)] pt-4">
        Your watch logged 847 data points last week. Nothing acted on a single one.
      </p>
    </div>
  );
}

function GraveyardCard({ app, verdict }: { app: string; verdict: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((value) => !value)}
      aria-label={`${app}: ${verdict}`}
      className="focusable-ring relative h-[88px] w-full rounded-[10px]"
      style={{ perspective: "800px" }}
    >
      <span
        className="relative block h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 460ms cubic-bezier(0.32, 0.72, 0.24, 1.05)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center rounded-[10px] border border-[var(--panel-border)] bg-[var(--panel-card)] px-3 text-center"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <span className="type-label text-[var(--panel-ink)]">{app}</span>
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center rounded-[10px] border border-[var(--panel-border)] bg-[var(--panel-surface)] px-3 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="type-aside tone-d-tertiary">{verdict}</span>
        </span>
      </span>
    </button>
  );
}

function AppGraveyard() {
  return (
    <div className="w-full">
      <p className="type-label tone-d-secondary mb-4 text-center">You&apos;ve tried the apps.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {graveyard.map((item) => (
          <GraveyardCard key={item.app} {...item} />
        ))}
      </div>
    </div>
  );
}

export function ProblemVisual() {
  return (
    <div className="dark-panel mt-16 w-full max-w-[820px] rounded-[30px] p-5 sm:mt-20 sm:p-7">
      <DataTicker />
      <div className="mt-7">
        <AppGraveyard />
      </div>
      <Aside className="mt-7 text-center">Every app you own is a rearview mirror.</Aside>
    </div>
  );
}
