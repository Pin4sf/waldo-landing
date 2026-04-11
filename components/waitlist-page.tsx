"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Illustration } from "./illustration";
import { EmailForm } from "./email-form";

type PageState   = "default" | "error" | "success";
type Phase       = "entering" | "exit" | "idle";
type TimePeriod  = "morning" | "afternoon" | "evening" | "night";

// ── Time detection ──────────────────────────────────────────────
function getTimePeriod(): TimePeriod {
  const h = new Date().getHours(); // user's local time
  if (h >= 5  && h < 11) return "morning";
  if (h >= 11 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

// ── Per-period config ───────────────────────────────────────────
const TIME_CONFIG = {
  morning: {
    background:    "linear-gradient(to bottom, #0f172a 0%, #1e3a5f 18%, #92400e 45%, #ea580c 65%, #fbbf24 100%)",
    label:         "waldo checked your night.",
    headline:      "your window is open.",
    closer:        "cortisol's peaking. best time to think hard.",
    triggerText:   "go make the most of your morning",
    triggerEmoji:  "☀️",
    waldoFilter:   "sepia(0.4) saturate(1.3) brightness(0.85)",
    waldoLines: [
      "already scanned your night. not bad.",
      "hrv looking steady this morning.",
      "cortisol is peaking. use this window.",
      "go. i'll watch the rest.",
      "today's score: yours to set.",
    ],
    celestial: {
      style: {
        position:     "absolute" as const,
        bottom:       "12%",
        left:         "50%",
        marginLeft:   "-36px",
        width:        "72px",
        height:       "72px",
        borderRadius: "50%",
        background:   "radial-gradient(circle at 38% 38%, #fef9c3, #fbbf24, #f97316)",
        animation:    "sun-rise 0.7s 0.4s ease-out both, sun-glow 5s 1.2s ease-in-out infinite",
      },
    },
    hasStars: false,
  },
  afternoon: {
    background:    "linear-gradient(to bottom, #0f172a 0%, #1e3a8a 25%, #1d4ed8 55%, #60a5fa 100%)",
    label:         "waldo's tracking your energy.",
    headline:      "peak window.",
    closer:        "this is your cognitive peak. make it count.",
    triggerText:   "go. deep work window is open",
    triggerEmoji:  "🎯",
    waldoFilter:   "hue-rotate(200deg) brightness(0.9) saturate(0.8)",
    waldoLines: [
      "focus window: open.",
      "tabs closed?",
      "this is your cognitive peak.",
      "already on it.",
      "block the noise. i've got the rest.",
    ],
    celestial: {
      style: {
        position:     "absolute" as const,
        top:          "8%",
        right:        "12%",
        width:        "64px",
        height:       "64px",
        borderRadius: "50%",
        background:   "radial-gradient(circle at 38% 38%, #fef9c3, #fbbf24)",
        animation:    "sun-rise 0.7s 0.4s ease-out both, sun-glow 5s 1.2s ease-in-out infinite",
      },
    },
    hasStars: false,
  },
  evening: {
    background:    "linear-gradient(to bottom, #0f172a 0%, #3b0764 18%, #831843 42%, #c2410c 65%, #f59e0b 100%)",
    label:         "waldo noticed a long one.",
    headline:      "wind it down.",
    closer:        "protect tonight. it determines tomorrow's score.",
    triggerText:   "start winding down",
    triggerEmoji:  "🌅",
    waldoFilter:   "sepia(0.3) saturate(1.1) brightness(0.85)",
    waldoLines: [
      "tomorrow starts tonight.",
      "sleep debt compounds. just saying.",
      "already adjusting tomorrow's schedule.",
      "recovery window: open.",
      "the patrol catches everything. rest.",
    ],
    celestial: {
      style: {
        position:     "absolute" as const,
        bottom:       "-8%",
        left:         "50%",
        marginLeft:   "-44px",
        width:        "88px",
        height:       "88px",
        borderRadius: "50%",
        background:   "radial-gradient(circle at 38% 30%, #fef3c7, #f97316, #dc2626)",
        animation:    "sun-rise 0.7s 0.4s ease-out both, sun-glow 5s 1.2s ease-in-out infinite",
        opacity:      0.85,
      },
    },
    hasStars: true,   // early stars appearing at dusk
  },
  night: {
    background:    "radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0c0c24 50%, #030308 100%)",
    label:         "waldo's got the watch.",
    headline:      "sleep well.",
    closer:        "we'll be here in the morning.",
    triggerText:   "now is the time you get some sleep",
    triggerEmoji:  "🌙",
    waldoFilter:   "invert(1) brightness(0.65)",
    waldoLines: [
      "don't wake me. i'm working.",
      "ssh. your sleep debt is recovering.",
      "hrv looking better already. see?",
      "already on it. literally.",
      "the patrol never sleeps. even when waldo does.",
      "still here. always.",
    ],
    celestial: {
      style: {
        position:     "absolute" as const,
        top:          "10%",
        right:        "12%",
        width:        "58px",
        height:       "58px",
        borderRadius: "50%",
        background:   "radial-gradient(circle at 36% 34%, #fffbeb, #fde68a)",
        boxShadow:    "0 0 40px rgba(253,230,138,0.25), 0 0 90px rgba(253,230,138,0.10)",
        animation:    "moon-rise 0.6s 0.45s ease-out both, moon-glow 4.5s 1.1s ease-in-out infinite",
      },
    },
    hasStars: true,
  },
} as const;

// ── Stars (night + evening) ─────────────────────────────────────
const STARS = Array.from({ length: 90 }, (_, i) => {
  const left = ((i * 1.41421356) % 1) * 94 + 3;
  const top  = ((i * 1.73205080) % 1) * 94 + 3;
  const large  = i % 7  === 0;
  const bright = i % 11 === 0;
  return {
    id:       i,
    left:     `${left.toFixed(2)}%`,
    top:      `${top.toFixed(2)}%`,
    size:     `${(large ? 2.8 : bright ? 1.9 : 1.3).toFixed(1)}px`,
    opacity:  bright ? 0.90 : large ? 0.70 : 0.50,
    delay:    `${((i * 0.41) % 7).toFixed(2)}s`,
    duration: `${(3 + (i % 6) * 0.55).toFixed(2)}s`,
  };
});

// Shooting stars — only at night
const SHOOTING_STARS = Array.from({ length: 5 }, (_, i) => ({
  id:     i,
  top:    `${8 + i * 13}%`,
  left:   `${5 + i * 17}%`,
  width:  `${65 + i * 18}px`,
  delay:  `${1.5 + i * 3.8}s`,
  period: `${8 + i * 2.5}s`,
}));

// ── Waldo overlay ───────────────────────────────────────────────
function WaldoDisplay({ period, config }: { period: TimePeriod; config: typeof TIME_CONFIG[TimePeriod] }) {
  const [hovered, setHovered] = useState(false);
  const [line] = useState(
    () => config.waldoLines[Math.floor(Math.random() * config.waldoLines.length)]
  );
  const isNight = period === "night";

  return (
    <div
      className="relative select-none flex flex-col items-center"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Zzz — only at night */}
      {isNight && (
        <div className="pointer-events-none absolute" style={{ top: "-38px", left: "80px" }}>
          {(["z", "z", "Z"] as const).map((letter, i) => (
            <span
              key={i}
              className="absolute font-bold text-white"
              style={{
                fontSize:  `${11 + i * 3}px`,
                left:      `${i * 10}px`,
                top:       `${i * -10}px`,
                animation: `zzz-float 3.2s ${i * 0.9}s ease-in infinite`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      )}

      {/* Speech bubble */}
      {hovered && (
        <div
          className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 max-w-[220px] w-max rounded-xl px-4 py-2 text-center text-[12px] italic text-white/80"
          style={{
            background:     "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            border:         "1px solid rgba(255,255,255,0.12)",
            animation:      "float-up 0.2s ease-out both",
            fontFamily:     "var(--font-body)",
          }}
        >
          {line}
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-[7px]"
            style={{ width: 0, height: 0, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "7px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      )}

      <Image
        src={isNight || period === "evening" ? "/illustrations/success.svg" : "/illustrations/default.svg"}
        alt="Waldo"
        width={150}
        height={150}
        style={{
          filter:    config.waldoFilter,
          opacity:   isNight ? 0.72 : 0.85,
          animation: isNight ? "sleep-bob 4s ease-in-out infinite" : "day-bob 3.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ── Time screen ─────────────────────────────────────────────────
function TimeScreen({ period, onDismiss }: { period: TimePeriod; onDismiss: () => void }) {
  const [leaving,    setLeaving]    = useState(false);
  const [canDismiss, setCanDismiss] = useState(false);
  const config = TIME_CONFIG[period];

  useEffect(() => {
    const t = setTimeout(() => setCanDismiss(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (!canDismiss) return;
    setLeaving(true);
    setTimeout(onDismiss, 550);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        cursor:     canDismiss ? "pointer" : "default",
        background: config.background,
        animation:  leaving
          ? "night-leave 550ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
          : "night-reveal 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      }}
    >
      {/* Stars (night + dusk) */}
      {config.hasStars && STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left:      s.left,
            top:       s.top,
            width:     s.size,
            height:    s.size,
            opacity:   period === "evening" ? s.opacity * 0.5 : s.opacity,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Shooting stars (night only) */}
      {period === "night" && SHOOTING_STARS.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none"
          style={{
            top:          s.top,
            left:         s.left,
            width:        s.width,
            height:       "1.5px",
            borderRadius: "1px",
            background:   "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
            transform:    "rotate(-28deg)",
            animation:    `shoot ${s.period} ${s.delay} linear infinite`,
          }}
        />
      ))}

      {/* Celestial body (sun or moon) */}
      <div style={config.celestial.style} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-8 pointer-events-none">
        <p
          className="text-white/40 text-[11px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-body)", animation: "float-up 0.55s 0.50s ease-out both" }}
        >
          {config.label}
        </p>
        <h2
          className="text-white leading-none"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize:   "clamp(2.5rem, 7vw, 5rem)",
            animation:  "float-up 0.60s 0.65s ease-out both",
          }}
        >
          {config.headline}
        </h2>
        <p
          className="text-white/30 text-[14px] max-w-[280px]"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle:  "italic",
            animation:  "float-up 0.55s 0.85s ease-out both",
          }}
        >
          {config.closer}
        </p>

        {/* Waldo */}
        <div
          className="pointer-events-auto mt-10"
          style={{ animation: "float-up 0.6s 1.05s ease-out both" }}
        >
          <WaldoDisplay period={period} config={config} />
        </div>
      </div>

      {canDismiss && (
        <p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-[11px] tracking-[0.2em] uppercase pointer-events-none select-none"
          style={{ fontFamily: "var(--font-body)", animation: "float-up 0.5s ease-out both" }}
        >
          tap anywhere to return
        </p>
      )}
    </div>
  );
}

// ── Copy ────────────────────────────────────────────────────────
const COPY = {
  default: {
    headline: "Something\u2019s off.",
    subtext:  "ChatGPT knows your tasks, your calendar knows your time, neither knows you slept three hours.",
    closer:   "turns out someone should.",
  },
  error: {
    headline: "That email doesn\u2019t exist.",
    subtext:  "Waldo reads HRV, sleep debt, and circadian cycles. But typos are somehow still on you.",
    closer:   null,
  },
  success: {
    headline: "Already on it.",
    subtext:  "You\u2019re now ahead of everyone who thinks they\u2019re just \u201cnot a morning person.\u201d",
    closer:   null,
  },
};

// ── Page ────────────────────────────────────────────────────────
export function WaitlistPage() {
  const [phase,        setPhase]        = useState<Phase>("entering");
  const [displayState, setDisplayState] = useState<PageState>("default");
  const [showTime,     setShowTime]     = useState(false);
  // Computed once on mount — user's local time
  const [timePeriod]                    = useState<TimePeriod>(() => getTimePeriod());

  const transitionTo = useCallback((next: PageState) => {
    setPhase("exit");
    setTimeout(() => {
      setDisplayState(next);
      setPhase("entering");
    }, 220);
  }, []);

  const handleDismiss = useCallback(() => {
    setShowTime(false);
    setPhase("entering");
  }, []);

  const cardStyle: React.CSSProperties =
    phase === "exit"
      ? { animation: "content-exit 220ms ease-in forwards" }
      : phase === "entering"
      ? { animation: "content-enter 340ms ease-out forwards" }
      : {};

  const copy          = COPY[displayState];
  const periodConfig  = TIME_CONFIG[timePeriod];

  return (
    <>
      {showTime && <TimeScreen period={timePeriod} onDismiss={handleDismiss} />}

      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-[440px] rounded-3xl bg-white px-8 py-10 flex flex-col items-center gap-5 text-center shadow-[0_2px_20px_rgba(0,0,0,0.07)]"
          style={cardStyle}
        >
          <Illustration state={displayState} className="w-24 h-24" />

          <h1
            className="text-[2.5rem] leading-[1.1] font-bold"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {copy.headline}
          </h1>

          <p
            className="text-[#6B6B68] text-[15px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {copy.subtext}
          </p>

          {copy.closer && (
            <p
              className="text-[#6B6B68] text-[13px] italic leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {copy.closer}
            </p>
          )}

          {/* Time-aware trigger — only shown in success state */}
          {displayState === "success" && (
            <button
              onClick={() => setShowTime(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#1A1A1A]/[0.08] text-[12px] italic text-[#1A1A1A]/40 hover:border-[#1A1A1A]/20 hover:text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/[0.02] active:scale-[0.97] transition-all cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                animation:  "hint-pulse 3s ease-in-out infinite",
              }}
            >
              {periodConfig.triggerText}
              <span className="not-italic text-[15px] leading-none">{periodConfig.triggerEmoji}</span>
            </button>
          )}

          {displayState !== "success" && (
            <EmailForm state={displayState} onStateChange={transitionTo} />
          )}
        </div>
      </main>
    </>
  );
}
