"use client";

import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { ToolMark, WaldoFace } from "./connector-mark";
import { useLive } from "./use-live";

import "./health-reading.css";

// How it works, Health ("Your health, without the homework."): the whole idea as one picture that plays by itself,
// with next to no words. Three beats in one box:
// 0 · A typical health app's summary: twelve numbers, each with its own chart and its change since last week.
// 1 · The numbers fold into Waldo's three rings: Recovery, Form, Weight, each with what it's made of.
// 2 · The rings rise, and today's calendar appears under them. The design review slides later (a dashed ghost stays
//     where it was), the sync after the board call slides off to Thursday, a breather drops in after the call, and
//     a note at the foot says what changed, with Undo.
// The dots under the box pick a beat. It only plays while it's the picture nearest the middle of the window
// (use-live.ts). v2 of 2026-10-12 (Suyash: "make it a bit more detailed and realistic"). Numbers, times and names
// are illustrative.

const BEAT_MS = [3800, 3600, 7000];

type Chart =
  | { kind: "line"; points: number[]; base?: number }
  | { kind: "bars"; points: number[]; last?: boolean }
  | { kind: "stages" }
  | { kind: "gauge"; value: number };

type Metric = { name: string; value: string; unit?: string; delta: string; down?: boolean; hue: string; ring: number; chart: Chart };

/** A typical health app's summary. `ring` is the ring each folds into (0 Recovery, 1 Form, 2 Weight) */
const NUMBERS: Metric[] = [
  { name: "Sleep", value: "5h 12", unit: "m", delta: "1h 34m under", down: true, hue: "#8b7cf6", ring: 0, chart: { kind: "stages" } },
  { name: "HRV", value: "38", unit: "ms", delta: "12% vs avg", down: true, hue: "#14b8a6", ring: 0, chart: { kind: "line", points: [52, 49, 50, 46, 47, 41, 38], base: 45 } },
  { name: "Resting HR", value: "61", unit: "bpm", delta: "4 vs avg", hue: "#f05d6c", ring: 0, chart: { kind: "line", points: [56, 57, 56, 58, 57, 59, 61], base: 57 } },
  { name: "Readiness", value: "68", delta: "Fair", hue: "#e3a008", ring: 0, chart: { kind: "gauge", value: 0.68 } },
  { name: "Sleep score", value: "71", delta: "9 vs avg", down: true, hue: "#8b7cf6", ring: 0, chart: { kind: "bars", points: [82, 79, 85, 77, 80, 84, 71], last: true } },
  { name: "Blood oxygen", value: "96", unit: "%", delta: "Normal", hue: "#3b82f6", ring: 0, chart: { kind: "line", points: [97.2, 96.9, 97.1, 96.8, 96.9, 96.4, 96.1], base: 97 } },
  { name: "Breathing", value: "15.2", unit: "/min", delta: "0.6 vs avg", hue: "#06b6d4", ring: 1, chart: { kind: "line", points: [14.4, 14.6, 14.5, 14.7, 14.6, 14.9, 15.2], base: 14.6 } },
  { name: "Wrist temp", value: "+0.4", unit: "°C", delta: "Above range", hue: "#f97366", ring: 1, chart: { kind: "line", points: [0, 0.1, -0.1, 0.1, 0.2, 0.3, 0.4], base: 0 } },
  { name: "Stress", value: "58", delta: "Rising", hue: "#f59e0b", ring: 1, chart: { kind: "bars", points: [22, 28, 35, 31, 44, 52, 58], last: true } },
  { name: "Energy", value: "42", delta: "18 since 9am", down: true, hue: "#22c55e", ring: 1, chart: { kind: "line", points: [70, 66, 61, 57, 52, 47, 42] } },
  { name: "Strain", value: "14.2", delta: "High for a Tuesday", hue: "#3b82f6", ring: 2, chart: { kind: "gauge", value: 14.2 / 21 } },
  { name: "Steps", value: "3,214", delta: "52% of goal", down: true, hue: "#22c55e", ring: 2, chart: { kind: "bars", points: [4, 18, 30, 6, 12, 22, 8, 3, 2, 14], last: false } },
];

const RINGS = [
  { name: "Recovery", score: 63, hue: "#e3a008", word: "Fair", from: ["Sleep 5h 12m", "HRV −12%", "RHR +4"] },
  { name: "Form", score: 76, hue: "#22c55e", word: "Steady", from: ["Circadian on time", "Motion low", "Stress rising"] },
  { name: "Weight", score: 84, hue: "#ef5f7a", word: "Heavy", from: ["6 meetings", "41 unread", "Load 14.2"] },
];

/** Today, 7am to 6pm */
type Event = {
  name: string;
  at: number;
  long: number;
  hue: string;
  /** Waldo moves it later (hours), or off to Thursday */
  to?: number | "thu";
  /** Waldo adds it */
  added?: boolean;
  /** Waldo leaves it alone, but read it */
  note?: string;
};
const DAY: Event[] = [
  { name: "Morning run", at: 7, long: 0.75, hue: "#22c55e" },
  { name: "Standup", at: 9, long: 0.33, hue: "#3b82f6" },
  { name: "Design review", at: 9.5, long: 1, hue: "#8b7cf6", to: 11.5 },
  { name: "Lunch", at: 12.75, long: 0.5, hue: "#a8a29e" },
  { name: "Board call", at: 14, long: 1, hue: "#f05d6c" },
  { name: "Breather", at: 15, long: 0.33, hue: "#14b8a6", added: true },
  { name: "Weekly sync", at: 15.5, long: 0.75, hue: "#3b82f6", to: "thu" },
  { name: "1:1 with Priya", at: 16.5, long: 0.5, hue: "#3b82f6" },
];
const START = 7;
const SPAN = 11;
const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const NOW = 14 + 41 / 60;

const clock = (t: number) => {
  const h = Math.floor(t);
  const m = Math.round((t - h) * 60);
  return `${h > 12 ? h - 12 : h}:${String(m).padStart(2, "0")}`;
};
const hourLabel = (h: number) => (h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`);

function ChartArt({ chart, hue }: { chart: Chart; hue: string }) {
  if (chart.kind === "stages") {
    // A night's hypnogram: awake, REM, light, deep, top to bottom
    const steps = [2, 3, 3, 2, 1, 2, 3, 2, 0, 2, 1, 2, 3, 2, 1, 1, 2, 0];
    const w = 100 / steps.length;
    return (
      <svg className="hv-chart" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
        {steps.map((s, i) => (
          <rect key={i} x={i * w + 0.4} y={s * 6.5 + 1} width={w - 0.8} height={6} rx={1.5} fill={hue} opacity={s === 0 ? 0.25 : 0.35 + s * 0.2} />
        ))}
      </svg>
    );
  }
  if (chart.kind === "gauge") {
    const r = 11;
    const len = Math.PI * r;
    return (
      <svg className="hv-chart hv-chart--gauge" viewBox="0 0 30 16" aria-hidden="true">
        <path d="M4 14 A11 11 0 0 1 26 14" fill="none" stroke="#ecebe7" strokeWidth="3" strokeLinecap="round" />
        <path d="M4 14 A11 11 0 0 1 26 14" fill="none" stroke={hue} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${len * chart.value} ${len}`} />
      </svg>
    );
  }
  const max = Math.max(...chart.points);
  const min = chart.kind === "bars" ? 0 : Math.min(...chart.points, chart.base ?? Infinity);
  const range = max - min || 1;
  const y = (v: number) => 25 - ((v - min) / range) * 21;
  if (chart.kind === "bars") {
    const w = 100 / chart.points.length;
    return (
      <svg className="hv-chart" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
        {chart.points.map((v, i) => (
          <rect
            key={i}
            x={i * w + w * 0.18}
            y={y(v)}
            width={w * 0.64}
            height={27 - y(v)}
            rx={1.5}
            fill={hue}
            opacity={chart.last && i === chart.points.length - 1 ? 1 : 0.35}
          />
        ))}
      </svg>
    );
  }
  const step = 100 / (chart.points.length - 1);
  const pts = chart.points.map((v, i) => `${(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = chart.points.length - 1;
  return (
    <svg className="hv-chart" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
      {chart.base !== undefined ? <line x1="0" x2="100" y1={y(chart.base)} y2={y(chart.base)} className="hv-base" /> : null}
      <polyline points={`0,28 ${pts} 100,28`} fill={hue} opacity={0.1} stroke="none" />
      <polyline points={pts} fill="none" stroke={hue} strokeWidth={1.4} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle cx={last * step} cy={y(chart.points[last])} r={2.2} fill={hue} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const R = 42;
const C = 2 * Math.PI * R;

export function HealthReading() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [beat, setBeat] = useState(0);
  const [held, setHeld] = useState(false);
  const [moves, setMoves] = useState<{ x: number; y: number }[]>([]);

  // Where each number has to travel to land in its ring. Measured while the wall is showing.
  const measure = useCallback(() => {
    const box = stage.current;
    if (!box || beat !== 0) return;
    const wall = box.querySelector<HTMLElement>(".hv-wall")?.getBoundingClientRect();
    const tiles = box.querySelectorAll<HTMLElement>("[data-tile]");
    const rings = box.querySelectorAll<HTMLElement>("[data-ring]");
    if (!wall) return;
    // Tiles by their layout box (offsets), since they may still be sliding home from the rings
    setMoves(
      NUMBERS.map((n, i) => {
        const a = tiles[i];
        const b = rings[n.ring]?.getBoundingClientRect();
        if (!a || !b) return { x: 0, y: 0 };
        return {
          x: b.left + b.width / 2 - (wall.left + a.offsetLeft + a.offsetWidth / 2),
          y: b.top + b.height / 2 - (wall.top + a.offsetTop + a.offsetHeight / 2),
        };
      }),
    );
  }, [beat]);

  useLayoutEffect(() => {
    measure();
    const box = stage.current;
    if (!box) return;
    const watch = new ResizeObserver(measure);
    watch.observe(box);
    // Again once the rings have eased back to the middle
    const settle = window.setTimeout(measure, 900);
    return () => {
      watch.disconnect();
      window.clearTimeout(settle);
    };
  }, [measure]);

  useEffect(() => {
    if (!live || held) return;
    const timer = window.setTimeout(() => setBeat((b) => (b + 1) % BEAT_MS.length), BEAT_MS[beat]);
    return () => window.clearTimeout(timer);
  }, [live, held, beat]);

  return (
    <div className="hv" ref={root}>
      <div className="hv-stage" ref={stage} data-beat={beat} aria-hidden="true">
        <div className="hv-top">
          <p className="hv-who" data-on={beat === 0 ? "" : undefined}>
            <b>Summary</b>
            <span>Tue 14 Oct · synced 7:02</span>
          </p>
          <p className="hv-who" data-on={beat === 1 ? "" : undefined}>
            <WaldoFace size={18} />
            <b>Waldo</b>
            <span>Tue 7:02 AM</span>
          </p>
          <p className="hv-who" data-on={beat === 2 ? "" : undefined}>
            <ToolMark name="Google Calendar" size={18} />
            <b>Tuesday 14</b>
            <span>2:41 PM</span>
          </p>
          <span className="hv-kind">{beat === 0 ? "A typical health app" : "With Waldo"}</span>
        </div>

        <div className="hv-wall">
          {NUMBERS.map((n, i) => (
            <div
              key={n.name}
              className="hv-tile"
              data-tile=""
              style={
                {
                  "--tx": `${moves[i]?.x ?? 0}px`,
                  "--ty": `${moves[i]?.y ?? 0}px`,
                  "--d": `${i * 28}ms`,
                  "--hue": n.hue,
                } as CSSProperties
              }
            >
              <small>
                <i />
                {n.name}
              </small>
              <b>
                {n.value}
                {n.unit ? <em>{n.unit}</em> : null}
              </b>
              <ChartArt chart={n.chart} hue={n.hue} />
              <span className="hv-delta" data-down={n.down ? "" : undefined}>
                {n.delta}
              </span>
            </div>
          ))}
        </div>

        <div className="hv-rings">
          {RINGS.map((ring, i) => (
            <div key={ring.name} className="hv-ring-wrap" style={{ "--d": `${i * 90}ms`, "--hue": ring.hue } as CSSProperties}>
              <div className="hv-ring" data-ring="">
                <svg viewBox="0 0 100 100">
                  <circle className="hv-track" cx="50" cy="50" r={R} />
                  <circle
                    className="hv-arc"
                    cx="50"
                    cy="50"
                    r={R}
                    strokeDasharray={C}
                    style={{ "--off": C * (1 - ring.score / 100), "--c": C } as CSSProperties}
                  />
                </svg>
                <b>{ring.score}</b>
                <small>{ring.word}</small>
              </div>
              <p className="hv-ring-name">{ring.name}</p>
              <ul className="hv-ring-from">
                {ring.from.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hv-day">
          {HOURS.map((h) => (
            <span key={h} className="hv-hour" style={{ "--t": (h - START) / SPAN } as CSSProperties}>
              {hourLabel(h)}
            </span>
          ))}
          <span className="hv-now" style={{ "--t": (NOW - START) / SPAN } as CSSProperties} />
          {DAY.map((e) =>
            e.to !== undefined ? (
              <div
                key={`${e.name}-ghost`}
                className="hv-ghost"
                data-move={e.to === "thu" ? "away" : "later"}
                style={{ "--t": (e.at - START) / SPAN, "--len": e.long / SPAN } as CSSProperties}
              >
                {e.to === "thu" ? "Moved to Thu, 3:30" : `Moved to ${clock(e.to)}`}
              </div>
            ) : null,
          )}
          {DAY.map((e) => (
            <div
              key={e.name}
              className="hv-event"
              data-move={e.to === "thu" ? "away" : e.to ? "later" : undefined}
              data-added={e.added ? "" : undefined}
              data-short={e.long <= 0.5 ? "" : undefined}
              style={
                {
                  "--t": (e.at - START) / SPAN,
                  "--len": e.long / SPAN,
                  "--to": typeof e.to === "number" ? (e.to - e.at) / SPAN : 0,
                  "--hue": e.hue,
                } as CSSProperties
              }
            >
              <b>{e.name}</b>
              {typeof e.to === "number" ? (
                <span className="hv-times">
                  <span className="hv-was">
                    {clock(e.at)} – {clock(e.at + e.long)}
                  </span>
                  <span className="hv-is">
                    {clock(e.to)} – {clock(e.to + e.long)}
                  </span>
                </span>
              ) : (
                <span className="hv-times">
                  {clock(e.at)} – {clock(e.at + e.long)}
                </span>
              )}
              {e.to !== undefined || e.added ? (
                <span className="hv-paw">
                  <WaldoFace size={14} />
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <p className="hv-toast">
          <WaldoFace size={20} />
          <span>
            <b>2 moved, 1 added</b> Short night, heavy afternoon.
          </span>
          <em>Undo</em>
        </p>
      </div>

      <div className="hv-dots">
        {["The numbers", "Three rings", "Your day"].map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-pressed={beat === i}
            onClick={() => {
              setHeld(true);
              setBeat(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
