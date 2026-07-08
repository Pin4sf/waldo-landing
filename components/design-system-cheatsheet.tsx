"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WaldoLogoFull } from "@/components/waldo-logo-full";

type Lens = {
  id: "recovery" | "form" | "weight";
  label: string;
  question: string;
  score: number;
  color: string;
  soft: string;
  note: string;
  segments: Array<{ label: string; value: number; max: number; color: string }>;
  chips: string[];
  connectors: string[];
  action: string;
  aside: string;
};

type AsyncState = "idle" | "loading" | "done";
type ThemeMode = "light" | "dark";

const lenses: Lens[] = [
  {
    id: "recovery",
    label: "Recovery",
    question: "What did last night give you?",
    score: 63,
    color: "#22C55E",
    soft: "rgba(34, 197, 94, 0.12)",
    note: "Usable morning, lighter first block.",
    segments: [
      { label: "Sleep", value: 28, max: 50, color: "#22C55E" },
      { label: "HRV", value: 14, max: 25, color: "#16A34A" },
      { label: "Resting State", value: 21, max: 25, color: "#86EFAC" },
    ],
    chips: ["Sleep 5h 42m - first block moved", "HRV 38ms - below baseline", "Resting HR 62 - steady"],
    connectors: ["Apple Health read", "Calendar changed", "Slack status set"],
    action: "Rough night. The 9am moved to 10:30. The afternoon stays open enough to work.",
    aside: "mornings, sorted.",
  },
  {
    id: "form",
    label: "Form",
    question: "What can you handle right now?",
    score: 76,
    color: "#FB943F",
    soft: "rgba(251, 148, 63, 0.12)",
    note: "Clear enough for the important call.",
    segments: [
      { label: "Circadian", value: 27, max: 34, color: "#FB943F" },
      { label: "Motion", value: 23, max: 33, color: "#F97316" },
      { label: "Stress", value: 26, max: 33, color: "#FDBF8C" },
    ],
    chips: ["Circadian aligned - keep deep work", "Stress climbing - watch 4pm", "Motion 4,200 - enough signal"],
    connectors: ["Health stream live", "Calendar watched", "Gmail pressure read"],
    action: "Stress is rising. The investor call stays. The low-priority 4:30 is out.",
    aside: "you did not ask. you did not need to.",
  },
  {
    id: "weight",
    label: "Weight",
    question: "What is today asking of you?",
    score: 84,
    color: "#F43F5E",
    soft: "rgba(244, 63, 94, 0.12)",
    note: "Heavy day, future time protected.",
    segments: [
      { label: "Stack", value: 28, max: 34, color: "#F43F5E" },
      { label: "Signal Pressure", value: 24, max: 33, color: "#FB7185" },
      { label: "Task Pileup", value: 18, max: 21, color: "#FDA4AF" },
      { label: "Load", value: 14, max: 21, color: "#BE123C" },
    ],
    chips: ["Stack 6 meetings - too dense", "Signal Pressure high - triage only", "Load 14/21 - no extra strain"],
    connectors: ["Calendar moved", "Linear reprioritised", "Gmail scanned"],
    action: "This week is heavy. Friday afternoon is cleared. Retro moves to Monday.",
    aside: "already moved.",
  },
];

const navItems = [
  ["showcase", "Showcase"],
  ["tokens", "Tokens"],
  ["controls", "Controls"],
  ["behavior", "Behavior"],
  ["blocks", "Blocks"],
  ["motion", "Motion"],
  ["rules", "Rules"],
];

const colorTokens = [
  ["Surface T1", "#FFFFFF", "top-most"],
  ["Surface T2", "#FAFAF8", "card"],
  ["Canvas T3", "#F4F3F0", "page"],
  ["Sunken T4", "#E8E6E0", "pressed"],
  ["Ink", "#1A1A1A", "text"],
  ["Accent", "#FB943F", "brand"],
  ["Action", "#2388FF", "selected"],
  ["Flag", "#F43F5E", "intervene"],
];

const typeTokens = [
  ["Display", "Corben", "36-62", "Hero claim"],
  ["H1", "Corben", "32-48", "Section title"],
  ["H2", "Corben", "24-32", "Sub-headline"],
  ["H3", "SF Pro Rounded", "20", "Card title"],
  ["Body", "SF Pro Rounded", "16", "Paragraph"],
  ["Label", "SF Pro Rounded", "14", "Controls"],
  ["Aside", "SF Pro Rounded italic", "13", "Waldo close"],
];

const actionCards = [
  ["The Brief", "/figma-assets/icon-daily-brief.webp", "Morning read, plain language, actions already made.", "Recovery"],
  ["The Fetch", "/assets/home/mascots/Vector.svg", "Stress intervention that protects the next useful block.", "Form"],
  ["The Adjustment", "/figma-assets/icon-adjustment.webp", "End-of-week load management across future time.", "Weight"],
  ["The Patrol", "/figma-assets/icon-patrol.webp", "Background monitoring log for what Waldo noticed.", "Always on"],
  ["The Spot", "/figma-assets/icon-spot.webp", "A single pattern observation, kept short and useful.", "Pattern"],
  ["The Constellation", "/figma-assets/icon-constellation.webp", "Several Spots connected into a named behavior pattern.", "Long game"],
  ["The Window", "/figma-assets/logo-small.webp", "Best focus hours protected from calendar pressure.", "Focus"],
  ["The Heads-Up", "/figma-assets/icon-arrow-right.webp", "Early warning before a likely crash lands.", "Prediction"],
  ["The Close", "/figma-assets/footer-illustration.webp", "End-of-day account of what changed and what is next.", "Daily close"],
  ["The Handoff", "/assets/home/mascots/Vector.svg", "Logged transfer into another connected tool.", "Connector"],
];

const motionLines = [
  "Rescheduled 9am to 10:30",
  "Logged 2am HRV dip",
  "Protected Friday afternoon",
  "Matched best hours to deep work",
  "Moved retro to Monday",
];

const behaviorCards = [
  {
    name: "Floating Cards",
    source: "Dia",
    trigger: "Auto-rotate, then hover.",
    motion: "Cards drift at 1-2 degrees, lift by 1px on hover, and deepen shadow.",
    fallback: "On touch, stack the important cards. On reduced motion, freeze rotation.",
    preview: ["state rotates", "hover raises", "shadow deepens"],
  },
  {
    name: "Data Ticker",
    source: "Smallest",
    trigger: "Scroll into view.",
    motion: "Lines reveal in order with a 600ms rhythm and a soft status pulse.",
    fallback: "Render all lines immediately when reduced motion is requested.",
    preview: ["6:12am signal read", "6:15am body not ready", "8:01am no app acted"],
  },
  {
    name: "Hover Flip",
    source: "Waldo",
    trigger: "Hover or tap.",
    motion: "Front verdict fades and scales into the back face in 250ms.",
    fallback: "Tap toggles the card. Keyboard focus exposes the same verdict.",
    preview: ["front: app icon", "back: single verdict", "focus: same state"],
  },
  {
    name: "Async Button",
    source: "Shilp Sutra",
    trigger: "Click once.",
    motion: "Idle moves to loading, then success, then rests. The label stays centered.",
    fallback: "Never remove the label. Disabled state uses opacity, not layout shift.",
    preview: ["save", "saving", "saved"],
  },
  {
    name: "Accordion",
    source: "Headspace",
    trigger: "Click row.",
    motion: "One answer opens at a time. The plus rotates as height expands.",
    fallback: "Rows remain readable when everything is collapsed.",
    preview: ["closed row", "open row", "previous closes"],
  },
  {
    name: "Autonomy Slider",
    source: "Waldo",
    trigger: "Drag or select a step.",
    motion: "Three positions update a preview card: inform, suggest, act.",
    fallback: "Use segmented buttons below 640px. Always expose undo for action states.",
    preview: ["inform", "suggest", "act"],
  },
];

const css = `
  .ds-card {
    border: 1px solid rgba(26,26,26,.08);
  }

  .ds-elevated {
    border: 1px solid rgba(26,26,26,.08);
  }

  .ds-preview-float {
    animation: ds-float 6s cubic-bezier(0.19, 1, 0.22, 1) infinite;
  }

  .ds-preview-float:nth-child(2) {
    animation-delay: -1.2s;
  }

  .ds-preview-float:nth-child(3) {
    animation-delay: -2.4s;
  }

  .ds-pulse {
    animation: ds-pulse 2.4s ease-in-out infinite;
  }

  .ds-node {
    animation: ds-node 2.8s ease-in-out infinite;
  }

  .ds-node:nth-of-type(2n) {
    animation-delay: .7s;
  }

  .ds-march {
    background-image: linear-gradient(90deg, rgba(35,136,255,.35) 50%, transparent 50%);
    background-size: 16px 2px;
    animation: ds-march 900ms linear infinite;
  }

  .ds-spin {
    animation: ds-spin 900ms linear infinite;
  }

  .ds-ticker-track {
    animation: ds-ticker 12s cubic-bezier(0.19, 1, 0.22, 1) infinite;
  }

  .ds-bar {
    transform-origin: bottom;
    animation: ds-bar 900ms cubic-bezier(0.19, 1, 0.22, 1) both;
  }

  .ds-behavior-line {
    animation: ds-behavior-line 520ms cubic-bezier(0.19, 1, 0.22, 1) both;
  }

  @keyframes ds-float {
    0%, 100% { transform: translateY(0) rotate(var(--rotate, 0deg)); }
    50% { transform: translateY(-10px) rotate(var(--rotate, 0deg)); }
  }

  @keyframes ds-pulse {
    0%, 100% { opacity: .52; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes ds-node {
    0%, 100% { r: 4; opacity: .75; }
    50% { r: 6; opacity: 1; }
  }

  @keyframes ds-march {
    to { background-position: 16px 0; }
  }

  @keyframes ds-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes ds-ticker {
    0%, 15% { transform: translateY(0); }
    20%, 35% { transform: translateY(-20%); }
    40%, 55% { transform: translateY(-40%); }
    60%, 75% { transform: translateY(-60%); }
    80%, 95% { transform: translateY(-80%); }
    100% { transform: translateY(0); }
  }

  @keyframes ds-bar {
    from { transform: scaleY(.18); opacity: .5; }
    to { transform: scaleY(1); opacity: 1; }
  }

  @keyframes ds-behavior-line {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .ds-preview-float,
    .ds-pulse,
    .ds-node,
    .ds-march,
    .ds-spin,
    .ds-ticker-track,
    .ds-bar,
    .ds-behavior-line {
      animation: none;
    }
  }
`;

function SectionTitle({
  kicker,
  lines,
  aside,
  dark = false,
}: {
  kicker: string;
  lines: string[];
  aside: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className={`mb-3 text-[13px] ${dark ? "text-[#9A9A96]" : "text-[#6B6B68]"}`}>
        {kicker}
      </p>
      <h2
        className={`text-[32px] leading-[1.1] sm:text-[40px] lg:text-[48px] ${dark ? "text-[#FAFAF8]" : "text-[#1A1A1A]"}`}
        style={{ fontFamily: "var(--font-headline)", letterSpacing: 0 }}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className={`mt-4 text-[13px] italic ${dark ? "text-[#6B6B68]" : "text-[#9A9A96]"}`}>
        {aside}
      </p>
    </div>
  );
}

function DonutRing({ lens }: { lens: Lens }) {
  const radius = 42;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const arcs = lens.segments.reduce<
    Array<{ segment: Lens["segments"][number]; dash: number; offset: number }>
  >((acc, segment) => {
    const dash = (segment.value / 100) * circumference;
    const previous = acc.at(-1);
    const offset = previous ? previous.offset + previous.dash : 0;
    return [...acc, { segment, dash, offset }];
  }, []);

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(26,26,26,.08)"
          strokeWidth={stroke}
        />
        {arcs.map(({ segment, dash, offset }) => (
          <circle
            key={segment.label}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 80 80)"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[34px] font-medium tabular-nums text-[#1A1A1A]">{lens.score}</span>
        <span className="text-[12px] text-[#6B6B68]">of 100</span>
      </div>
    </div>
  );
}

function ThemeShell({
  theme,
  children,
}: {
  theme: ThemeMode;
  children: React.ReactNode;
}) {
  const dark = theme === "dark";
  return (
    <div
      className="rounded-[24px] p-4 transition-colors duration-300"
      style={{
        background: dark ? "#1C1B1A" : "#F4F3F0",
        color: dark ? "#FAFAF8" : "#1A1A1A",
      }}
    >
      {children}
    </div>
  );
}

function AsyncButton({
  state,
  onRun,
}: {
  state: AsyncState;
  onRun: () => void;
}) {
  const label = state === "done" ? "Saved" : state === "loading" ? "Saving" : "Save changes";
  return (
    <button
      type="button"
      onClick={onRun}
      disabled={state === "loading"}
      className="relative flex h-12 min-w-[168px] items-center justify-center rounded-full bg-[#1A1A1A] px-6 text-[14px] font-medium text-[#FAFAF8] transition duration-300 hover:-translate-y-px active:scale-[0.98] disabled:cursor-wait disabled:opacity-90"
    >
      <span className="absolute left-5 flex h-4 w-4 items-center justify-center">
        {state === "loading" && (
          <span className="ds-spin h-4 w-4 rounded-full border-2 border-[#FAFAF8]/35 border-t-[#FAFAF8]" />
        )}
        {state === "done" && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#22C55E] text-[10px] text-[#FAFAF8]">
            ✓
          </span>
        )}
      </span>
      <span>{label}</span>
    </button>
  );
}

export function DesignSystemCheatsheet() {
  const [activeLens, setActiveLens] = useState(0);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [asyncState, setAsyncState] = useState<AsyncState>("idle");
  const [tab, setTab] = useState("System");
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("suggest");
  const [menuOpen, setMenuOpen] = useState(false);
  const [behaviorIndex, setBehaviorIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const timer = window.setInterval(() => {
      setActiveLens((current) => (current + 1) % lenses.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (asyncState === "idle") return;
    const timer = window.setTimeout(
      () => setAsyncState(asyncState === "loading" ? "done" : "idle"),
      asyncState === "loading" ? 1050 : 1400,
    );
    return () => window.clearTimeout(timer);
  }, [asyncState]);

  const lens = lenses[activeLens];
  const dark = theme === "dark";
  const behavior = behaviorCards[behaviorIndex];

  const tickerItems = useMemo(() => [...motionLines, motionLines[0]], []);

  return (
    <main className="min-h-screen bg-[#F4F3F0] text-[#1A1A1A]" style={{ fontFamily: "var(--font-body)" }}>
      <style>{css}</style>

      <header className="sticky top-0 z-50 border-b border-[rgba(26,26,26,.08)] bg-[#FAFAF8]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Waldo home">
            <WaldoLogoFull wagging={false} width={104} />
            <span className="rounded-full border border-[rgba(26,26,26,.08)] px-3 py-1 text-[12px] text-[#6B6B68]">
              visual system v3
            </span>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" aria-label="Design system sections">
            {navItems.map(([href, label]) => (
              <a
                key={href}
                href={`#${href}`}
                className="whitespace-nowrap rounded-full border border-[rgba(26,26,26,.08)] bg-[#FFFFFF] px-3 py-2 text-[13px] font-medium text-[#6B6B68] transition hover:-translate-y-px hover:text-[#1A1A1A]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-[13px] italic text-[#9A9A96]">built from the frozen doc, shaped for the build.</p>
          <h1
            className="text-[42px] leading-[1.06] sm:text-[56px] lg:text-[62px]"
            style={{ fontFamily: "var(--font-headline)", letterSpacing: 0 }}
          >
            <span className="block">Every Waldo surface</span>
            <span className="block">component state</span>
            <span className="block">in motion.</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-7 text-[#6B6B68]">
            A live reference for colors, type, surfaces, controls, product cards, and motion states. Use it to compare spacing, states, and behavior before a section lands in the main build.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/waitlist"
              className="flex h-14 items-center justify-center rounded-full bg-[#1A1A1A] px-7 text-[16px] font-medium text-[#FAFAF8] transition duration-300 hover:-translate-y-px active:scale-[0.98]"
            >
              Let Waldo in →
            </Link>
            <a
              href="https://shilp-sutra.devalok.in"
              className="flex h-12 items-center justify-center rounded-full border border-[rgba(26,26,26,.08)] bg-[#FAFAF8] px-5 text-[14px] font-medium text-[#6B6B68] transition hover:-translate-y-px hover:text-[#1A1A1A]"
            >
              Structure reference →
            </a>
          </div>
          <p className="mt-5 text-[13px] italic text-[#9A9A96]">same rules, fewer guesses.</p>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-[rgba(26,26,26,.08)] bg-[#FAFAF8] p-5 ds-elevated">
          <div className="absolute inset-x-5 top-5 flex items-center justify-between">
            <span className="rounded-full bg-[#1A1A1A] px-3 py-1 text-[12px] text-[#FAFAF8]">live preview</span>
            <span className="text-[12px] text-[#9A9A96]">rotates every 4.6s</span>
          </div>
          <div className="mt-16 grid gap-4">
            <div
              className="ds-preview-float rounded-[24px] border border-[rgba(26,26,26,.08)] bg-[#FFFFFF] p-5"
              style={{ "--rotate": "-1deg" } as React.CSSProperties}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium text-[#6B6B68]">{lens.label}</p>
                  <p className="text-[20px] font-medium text-[#1A1A1A]">{lens.question}</p>
                </div>
                <span className="h-3 w-3 rounded-full ds-pulse" style={{ background: lens.color }} />
              </div>
              <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                <DonutRing lens={lens} />
                <div className="flex flex-col justify-center gap-3">
                  <p className="text-[14px] leading-6 text-[#6B6B68]">{lens.action}</p>
                  <p className="text-[13px] italic text-[#9A9A96]">{lens.aside}</p>
                </div>
              </div>
            </div>

            <div
              className="ds-preview-float rounded-[24px] bg-[#1A1A1A] p-5 text-[#FAFAF8]"
              style={{ "--rotate": "1deg" } as React.CSSProperties}
            >
              <p className="mb-4 text-[13px] text-[#9A9A96]">signal chips</p>
              <div className="grid gap-2">
                {lens.chips.map((chip) => (
                  <div key={chip} className="flex items-center gap-3 rounded-full bg-[#272725] px-4 py-3 text-[13px]">
                    <span className="h-2 w-2 rounded-full" style={{ background: lens.color }} />
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="ds-preview-float rounded-[24px] border border-[rgba(26,26,26,.08)] p-5"
              style={{ background: lens.soft, "--rotate": "-.5deg" } as React.CSSProperties}
            >
              <p className="mb-4 text-[13px] font-medium text-[#6B6B68]">connector states</p>
              <div className="grid gap-2">
                {lens.connectors.map((connector) => (
                  <div key={connector} className="flex items-center justify-between rounded-[16px] bg-[#FAFAF8] px-4 py-3 text-[13px]">
                    <span>{connector}</span>
                    <span className="text-[#9A9A96]">handled</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="showcase" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="showcase"
          lines={["One system", "three live lenses."]}
          aside="the score changes, the structure stays put."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {lenses.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveLens(index)}
              className="rounded-[24px] border border-[rgba(26,26,26,.08)] bg-[#FAFAF8] p-5 text-left transition duration-300 hover:-translate-y-1"
              style={{
                borderColor: activeLens === index ? item.color : "rgba(26,26,26,.08)",
              }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#1A1A1A]">{item.label}</span>
                <span className="rounded-full px-3 py-1 text-[12px]" style={{ background: item.soft, color: item.color }}>
                  {item.score}/100
                </span>
              </div>
              <p className="text-[20px] font-medium leading-snug text-[#1A1A1A]">{item.question}</p>
              <p className="mt-3 text-[14px] leading-6 text-[#6B6B68]">{item.note}</p>
            </button>
          ))}
        </div>
      </section>

      <section id="tokens" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="tokens"
          lines={["The foundation", "before the card."]}
          aside="small decisions, visible everywhere."
        />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="grid gap-3 rounded-[36px] bg-[#FAFAF8] p-5 ds-card sm:grid-cols-2 lg:grid-cols-4">
            {colorTokens.map(([label, hex, usage]) => (
              <div key={label} className="rounded-[20px] border border-[rgba(26,26,26,.08)] bg-[#FFFFFF] p-4">
                <div className="mb-4 h-20 rounded-[16px] border border-[rgba(26,26,26,.08)]" style={{ background: hex }} />
                <p className="text-[13px] font-medium text-[#1A1A1A]">{label}</p>
                <p className="mt-1 font-mono text-[12px] text-[#6B6B68]">{hex}</p>
                <p className="mt-2 text-[12px] text-[#9A9A96]">{usage}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[36px] bg-[#1A1A1A] p-5 text-[#FAFAF8] ds-card">
            <p className="mb-5 text-[13px] text-[#9A9A96]">surface ladder</p>
            <div className="rounded-[28px] bg-[#F4F3F0] p-5 text-[#1A1A1A]">
              <p className="mb-4 text-[13px] font-medium">T3 page canvas</p>
              <div className="rounded-[24px] border border-[rgba(26,26,26,.08)] bg-[#FAFAF8] p-4">
                <p className="mb-4 text-[13px] font-medium">T2 card surface</p>
                <div className="rounded-[12px] bg-[#FFFFFF] p-4">
                  <p className="text-[13px] font-medium">T1 nested surface</p>
                  <div className="mt-3 rounded-full bg-[#E8E6E0] px-4 py-3 text-[12px] text-[#6B6B68]">
                    T4 appears only as a pressed or active control.
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-5 text-[13px] italic text-[#6B6B68]">higher means lighter.</p>
          </div>
        </div>

        <div className="mt-6 rounded-[36px] bg-[#FAFAF8] p-5 ds-card">
          <div className="grid gap-3 lg:grid-cols-7">
            {typeTokens.map(([token, font, size, usage]) => (
              <div key={token} className="rounded-[20px] border border-[rgba(26,26,26,.08)] bg-[#FFFFFF] p-4">
                <p
                  className={token === "Display" || token === "H1" || token === "H2" ? "text-[28px] leading-none" : "text-[18px] font-medium"}
                  style={{ fontFamily: font === "Corben" ? "var(--font-headline)" : "var(--font-body)", letterSpacing: 0 }}
                >
                  Aa
                </p>
                <p className="mt-5 text-[13px] font-medium">{token}</p>
                <p className="mt-1 text-[12px] text-[#6B6B68]">{font}</p>
                <p className="mt-1 text-[12px] text-[#9A9A96]">{size}px · {usage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="controls" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="controls"
          lines={["Every control", "has a state."]}
          aside="click the boring bits."
        />
        <div className="mb-4 flex flex-wrap gap-2">
          {(["light", "dark"] as ThemeMode[]).map((mode) => (
            <button
              type="button"
              key={mode}
              onClick={() => setTheme(mode)}
              className="rounded-full border border-[rgba(26,26,26,.08)] px-4 py-2 text-[13px] font-medium transition hover:-translate-y-px"
              style={{
                background: theme === mode ? "#1A1A1A" : "#FAFAF8",
                color: theme === mode ? "#FAFAF8" : "#6B6B68",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <ThemeShell theme={theme}>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-[24px] p-5" style={{ background: dark ? "#1D1D1B" : "#FAFAF8", border: `1px solid ${dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)"}` }}>
              <p className="mb-5 text-[13px]" style={{ color: dark ? "#9A9A96" : "#6B6B68" }}>button states</p>
              <div className="flex flex-col gap-3">
                <AsyncButton state={asyncState} onRun={() => setAsyncState("loading")} />
                <button
                  type="button"
                  className="flex h-12 items-center justify-center rounded-full border px-6 text-[14px] font-medium transition hover:-translate-y-px active:scale-[0.98]"
                  style={{
                    background: dark ? "#272725" : "#FFFFFF",
                    color: dark ? "#FAFAF8" : "#1A1A1A",
                    borderColor: dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)",
                  }}
                >
                  Secondary →
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Primary icon"
                    className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#FB943F] text-[20px] text-[#FAFAF8] transition hover:-translate-y-px active:scale-[0.98]"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    className="flex h-12 min-w-[88px] items-center justify-center rounded-full border px-5 text-[14px] tabular-nums transition hover:-translate-y-px active:scale-[0.98]"
                    style={{ borderColor: dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)" }}
                  >
                    63
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] p-5" style={{ background: dark ? "#1D1D1B" : "#FAFAF8", border: `1px solid ${dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)"}` }}>
              <p className="mb-5 text-[13px]" style={{ color: dark ? "#9A9A96" : "#6B6B68" }}>forms and selection</p>
              <label className="mb-2 block text-[12px]" style={{ color: dark ? "#9A9A96" : "#6B6B68" }}>Connector</label>
              <div
                className="mb-4 flex h-12 items-center gap-3 rounded-[12px] border px-4"
                style={{
                  background: dark ? "#272725" : "#FFFFFF",
                  borderColor: dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)",
                }}
              >
                <span className="h-2 w-2 rounded-full bg-[#2388FF]" />
                <span className="text-[14px]" style={{ color: dark ? "#FAFAF8" : "#1A1A1A" }}>Apple Health</span>
                <span className="ml-auto text-[12px]" style={{ color: dark ? "#6B6B68" : "#9A9A96" }}>connected</span>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setChecked((value) => !value)}
                  className="flex items-center gap-3 text-[14px]"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-[6px] border text-[12px] text-[#FFFFFF]"
                    style={{ background: checked ? "#2388FF" : "transparent", borderColor: checked ? "#2388FF" : dark ? "rgba(250,250,248,.16)" : "rgba(26,26,26,.16)" }}
                  >
                    {checked ? "✓" : ""}
                  </span>
                  Waldo can move low-priority blocks
                </button>
                {["suggest", "act"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setRadio(item)}
                    className="flex items-center gap-3 text-[14px]"
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full border"
                      style={{ borderColor: radio === item ? "#2388FF" : dark ? "rgba(250,250,248,.16)" : "rgba(26,26,26,.16)", background: radio === item ? "#2388FF" : "transparent" }}
                    >
                      {radio === item && <span className="h-2 w-2 rounded-full bg-[#FFFFFF]" />}
                    </span>
                    {item === "suggest" ? "Suggest first" : "Act on its own"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-[24px] p-5" style={{ background: dark ? "#1D1D1B" : "#FAFAF8", border: `1px solid ${dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)"}` }}>
              <p className="mb-5 text-[13px]" style={{ color: dark ? "#9A9A96" : "#6B6B68" }}>tabs and menu</p>
              <div className="mb-5 flex rounded-full p-1" style={{ background: dark ? "#171616" : "#E8E6E0" }}>
                {["System", "Product", "Motion"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setTab(item)}
                    className="h-9 flex-1 rounded-full text-[13px] font-medium transition"
                    style={{ background: tab === item ? (dark ? "#272725" : "#FFFFFF") : "transparent", color: tab === item ? (dark ? "#FAFAF8" : "#1A1A1A") : (dark ? "#9A9A96" : "#6B6B68") }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="flex h-12 w-full items-center justify-between rounded-[12px] border px-4 text-[14px]"
                style={{ background: dark ? "#272725" : "#FFFFFF", borderColor: dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)" }}
              >
                Select action
                <span>⌄</span>
              </button>
              {menuOpen && (
                <div
                  className="absolute inset-x-5 top-[170px] z-10 rounded-[16px] border p-2 ds-elevated"
                  style={{ background: dark ? "#272725" : "#FFFFFF", borderColor: dark ? "rgba(250,250,248,.08)" : "rgba(26,26,26,.08)" }}
                >
                  {["Protect focus", "Move meeting", "Set status"].map((item, index) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left text-[13px]"
                      style={{ background: index === 0 ? "rgba(35,136,255,.1)" : "transparent", color: dark ? "#FAFAF8" : "#1A1A1A" }}
                    >
                      {item}
                      {index === 0 && <span className="h-2 w-2 rounded-full bg-[#2388FF]" />}
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-4 text-[13px] italic" style={{ color: dark ? "#6B6B68" : "#9A9A96" }}>
                active states use action blue, not orange.
              </p>
            </div>
          </div>
        </ThemeShell>
      </section>

      <section id="behavior" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="behavior"
          lines={["The forensics", "become rules."]}
          aside="what it does matters as much as how it looks."
        />
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {behaviorCards.map((card, index) => (
              <button
                type="button"
                key={card.name}
                onClick={() => setBehaviorIndex(index)}
                className="rounded-[24px] border bg-[#FAFAF8] p-5 text-left transition duration-300 hover:-translate-y-1"
                style={{
                  borderColor: behaviorIndex === index ? "#2388FF" : "rgba(26,26,26,.08)",
                }}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="text-[15px] font-medium text-[#1A1A1A]">{card.name}</span>
                  <span className="rounded-full bg-[#FFFFFF] px-3 py-1 text-[12px] text-[#6B6B68]">{card.source}</span>
                </div>
                <p className="text-[13px] font-medium text-[#1A1A1A]">{card.trigger}</p>
                <p className="mt-2 text-[13px] leading-6 text-[#6B6B68]">{card.motion}</p>
              </button>
            ))}
          </div>

          <div className="rounded-[36px] bg-[#1A1A1A] p-5 text-[#FAFAF8] ds-card">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[13px] text-[#9A9A96]">active behavior</p>
                <h3 className="mt-1 text-[24px] font-medium">{behavior.name}</h3>
              </div>
              <span className="rounded-full bg-[#272725] px-3 py-1 text-[12px] text-[#9A9A96]">
                source: {behavior.source}
              </span>
            </div>

            <div className="grid gap-3">
              {behavior.preview.map((line, index) => (
                <div
                  key={`${behavior.name}-${line}`}
                  className="ds-behavior-line flex items-center gap-3 rounded-[18px] bg-[#272725] px-4 py-4"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2388FF] text-[12px] font-medium text-[#FAFAF8]">
                    {index + 1}
                  </span>
                  <span className="text-[14px]">{line}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="rounded-[20px] bg-[#171616] p-4">
                <p className="text-[12px] text-[#9A9A96]">interaction</p>
                <p className="mt-2 text-[14px] leading-6">{behavior.trigger}</p>
              </div>
              <div className="rounded-[20px] bg-[#171616] p-4">
                <p className="text-[12px] text-[#9A9A96]">fallback</p>
                <p className="mt-2 text-[14px] leading-6">{behavior.fallback}</p>
              </div>
            </div>

            <p className="mt-5 text-[13px] italic text-[#6B6B68]">borrow the behavior, keep the Waldo skin.</p>
          </div>
        </div>
      </section>

      <section id="blocks" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="blocks"
          lines={["Product pieces", "ready to match."]}
          aside="one artifact per action."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {actionCards.map(([name, icon, description, meta]) => (
            <article key={name} className="rounded-[24px] border border-[rgba(26,26,26,.08)] bg-[#FAFAF8] p-4 transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#1A1A1A]">
                <Image src={icon} alt="" width={34} height={34} className="max-h-9 w-auto object-contain" />
              </div>
              <p className="text-[15px] font-medium text-[#1A1A1A]">{name}</p>
              <p className="mt-2 min-h-[72px] text-[13px] leading-6 text-[#6B6B68]">{description}</p>
              <p className="mt-4 text-[12px] text-[#9A9A96]">{meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="motion" className="bg-[#1A1A1A] px-4 py-20 text-[#FAFAF8] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <SectionTitle
            kicker="motion"
            lines={["Motion should", "explain state."]}
            aside="quiet, useful, alive."
            dark
          />
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="rounded-[36px] bg-[#1D1D1B] p-5 ds-card">
              <p className="mb-5 text-[13px] text-[#9A9A96]">ticker cadence</p>
              <div className="h-[64px] overflow-hidden rounded-[20px] bg-[#171616] px-5">
                <div className="ds-ticker-track">
                  {tickerItems.map((line, index) => (
                    <div key={`${line}-${index}`} className="flex h-[64px] items-center text-[20px] font-medium">
                      → {line}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#272725]">
                <div className="ds-march h-full w-full" />
              </div>
              <p className="mt-5 text-[13px] italic text-[#6B6B68]">work is visible without shouting.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[36px] bg-[#1D1D1B] p-5">
                <p className="mb-5 text-[13px] text-[#9A9A96]">constellation pulse</p>
                <svg viewBox="0 0 260 180" className="h-56 w-full" role="img" aria-label="Pattern map motion sample">
                  <path d="M42 132 L94 82 L140 116 L204 56 L224 126" fill="none" stroke="rgba(250,250,248,.18)" strokeWidth="2" />
                  <circle className="ds-node" cx="42" cy="132" r="4" fill="#FAFAF8" />
                  <circle className="ds-node" cx="94" cy="82" r="4" fill="#FB943F" />
                  <circle className="ds-node" cx="140" cy="116" r="4" fill="#FAFAF8" />
                  <circle className="ds-node" cx="204" cy="56" r="4" fill="#2388FF" />
                  <circle className="ds-node" cx="224" cy="126" r="4" fill="#F43F5E" />
                </svg>
              </div>
              <div className="rounded-[36px] bg-[#1D1D1B] p-5">
                <p className="mb-5 text-[13px] text-[#9A9A96]">numbers that settle</p>
                <div className="flex h-56 items-end gap-3 rounded-[24px] bg-[#171616] p-4">
                  {[42, 68, 55, 84, 61, 76, 49].map((height, index) => (
                    <div
                      key={height}
                      className="ds-bar flex-1 rounded-t-[10px]"
                      style={{
                        height: `${height}%`,
                        background: index === 3 ? "#FB943F" : "#FAFAF8",
                        animationDelay: `${index * 70}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rules" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="rules"
          lines={["Build rules", "worth pinning."]}
          aside="less drift, warmer pages."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Type", "Corben for display and section heads. SF Pro Rounded for everything else."],
            ["Surfaces", "T3 canvas, T2 panels, T1 nested surfaces. T4 is only pressed or active."],
            ["Color", "Orange is brand emphasis. Action blue carries selected and on states."],
            ["Numbers", "No raw number appears without Waldo's plain-language read beside it."],
            ["Motion", "Use the premium ease, keep movement state-driven, honor reduced motion."],
            ["Responsive", "Check 375, 768, 1024, 1280, and 1440 before shipping a section."],
            ["Copy", "Warm, dry, capable, restrained. Close blocks with an italic aside."],
            ["Mascot", "Always doing something. Resting pose for landing contexts. No speech bubble."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-[24px] border border-[rgba(26,26,26,.08)] bg-[#FAFAF8] p-5">
              <p className="text-[15px] font-medium text-[#1A1A1A]">{title}</p>
              <p className="mt-3 text-[13px] leading-6 text-[#6B6B68]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[rgba(26,26,26,.08)] bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[18px] font-medium text-[#1A1A1A]">Waldo visual system</p>
            <p className="mt-2 text-[13px] italic text-[#9A9A96]">your watch has been waiting for this.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="flex h-12 items-center justify-center rounded-full border border-[rgba(26,26,26,.08)] px-5 text-[14px] font-medium text-[#6B6B68] transition hover:-translate-y-px hover:text-[#1A1A1A]">
              Open landing page →
            </Link>
            <Link href="/waitlist" className="flex h-12 items-center justify-center rounded-full bg-[#1A1A1A] px-5 text-[14px] font-medium text-[#FAFAF8] transition hover:-translate-y-px active:scale-[0.98]">
              Let Waldo in →
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
