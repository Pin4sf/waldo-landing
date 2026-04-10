"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Illustration } from "./illustration";
import { EmailForm } from "./email-form";

type PageState = "default" | "error" | "success";
type Phase     = "entering" | "exit" | "idle";

// Two algebraically independent irrationals (√2 and √3) guarantee x and y
// have no correlation — stars scatter evenly with no diagonal pattern.
const STARS = Array.from({ length: 90 }, (_, i) => {
  const left = ((i * 1.41421356) % 1) * 94 + 3;   // √2  → x
  const top  = ((i * 1.73205080) % 1) * 94 + 3;   // √3  → y
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

// Hover lines — Waldo is always on it, even while asleep
const WALDO_SLEEP_LINES = [
  "don't wake me. i'm working.",
  "ssh. your sleep debt is recovering.",
  "i'm right here. go to sleep.",
  "already on it. literally.",
];

function SleepingWaldo() {
  const [hovered, setHovered] = useState(false);
  const [line] = useState(
    () => WALDO_SLEEP_LINES[Math.floor(Math.random() * WALDO_SLEEP_LINES.length)]
  );

  return (
    <div
      className="relative select-none flex flex-col items-center"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Zzz — drift up-right (toward the moon), all within the centered safe zone */}
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

      {/* Speech bubble — max-w keeps it from overflowing on narrow screens */}
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
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-[7px]"
            style={{
              width: 0, height: 0,
              borderLeft:  "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop:   "7px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>
      )}

      {/* Waldo — glowing white constellation outline, tilted + gentle bob */}
      <Image
        src="/illustrations/success.svg"
        alt="Waldo sleeping"
        width={150}
        height={150}
        style={{
          filter:    "invert(1) brightness(0.65)",
          opacity:   0.72,
          animation: "sleep-bob 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function NightScreen({ onDismiss }: { onDismiss: () => void }) {
  const [leaving,    setLeaving]    = useState(false);
  const [canDismiss, setCanDismiss] = useState(false);

  // Let the entrance animations finish before accepting clicks
  useEffect(() => {
    const t = setTimeout(() => setCanDismiss(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (!canDismiss) return;
    setLeaving(true);
    // Start the main-page enter while the night sky is still mid-fade
    // → true crossfade, feels like toggling dark mode
    setTimeout(onDismiss, 350);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        cursor:     canDismiss ? "pointer" : "default",
        background: "radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0c0c24 50%, #030308 100%)",
        animation:  leaving
          ? "night-leave 650ms ease-in forwards"
          : "night-reveal 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
      }}
    >
      {/* Stars */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left:      s.left,
            top:       s.top,
            width:     s.size,
            height:    s.size,
            opacity:   s.opacity,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Moon */}
      <div
        style={{
          position:     "absolute",
          top:          "10%",
          right:        "12%",
          width:        "58px",
          height:       "58px",
          borderRadius: "50%",
          background:   "radial-gradient(circle at 36% 34%, #fffbeb, #fde68a)",
          boxShadow:    "0 0 40px rgba(253,230,138,0.25), 0 0 90px rgba(253,230,138,0.10)",
          animation:    "moon-rise 0.6s 0.45s ease-out both, moon-glow 4.5s 1.1s ease-in-out infinite",
        }}
      />

      {/* Text + Waldo — single centered column, pointer-events-none lets taps pass to dismiss */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-8 pointer-events-none">
        <p
          className="text-white/40 text-[11px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-body)", animation: "float-up 0.55s 0.50s ease-out both" }}
        >
          waldo&apos;s got the watch.
        </p>
        <h2
          className="text-white leading-none"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize:   "clamp(2.5rem, 7vw, 5rem)",
            animation:  "float-up 0.60s 0.65s ease-out both",
          }}
        >
          sleep well.
        </h2>
        <p
          className="text-white/30 text-[14px]"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle:  "italic",
            animation:  "float-up 0.55s 0.85s ease-out both",
          }}
        >
          we&apos;ll be here in the morning.
        </p>

        {/* Waldo — pointer-events-auto so hover works, clicks still propagate to dismiss */}
        <div
          className="pointer-events-auto mt-10"
          style={{ animation: "float-up 0.6s 1.05s ease-out both" }}
        >
          <SleepingWaldo />
        </div>
      </div>

      {/* Dismiss hint — fades in after all animations settle */}
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

const COPY = {
  default: {
    headline: "Something\u2019s off.",
    sublines: [
      "ChatGPT knows your tasks.",
      "Your calendar knows your time.",
      "Neither knows you slept three hours.",
    ],
    closer: "turns out someone should.",
  },
  error: {
    headline: "That email doesn\u2019t exist.",
    sublines: [
      "Waldo reads HRV, sleep debt, and circadian cycles.",
      "Typos are somehow still on you.",
    ],
    closer: null,
  },
  success: {
    headline: "Already on it.",
    sublines: [
      "You\u2019re now ahead of everyone who thinks",
      "they\u2019re just \u201cnot a morning person.\u201d",
    ],
    closer: null,
  },
};

export function WaitlistPage() {
  const [phase,        setPhase]        = useState<Phase>("entering");
  const [displayState, setDisplayState] = useState<PageState>("default");
  const [showNight,    setShowNight]    = useState(false);

  // Exit → swap content → enter
  const transitionTo = useCallback((next: PageState) => {
    setPhase("exit");
    setTimeout(() => {
      setDisplayState(next);
      setPhase("entering");
    }, 220);
  }, []);

  // Crossfade: night sky mid-fade when main content starts entering
  const handleNightDismiss = useCallback(() => {
    setShowNight(false);
    setPhase("entering");
  }, []);

  const contentStyle: React.CSSProperties =
    phase === "exit"
      ? { animation: "content-exit 220ms ease-in forwards" }
      : phase === "entering"
      ? { animation: "content-enter 340ms ease-out forwards" }
      : {};

  const copy = COPY[displayState];

  return (
    <>
      {showNight && <NightScreen onDismiss={handleNightDismiss} />}

      <main className="flex min-h-[calc(100vh-68px)] items-center justify-center px-6 py-10 lg:px-8 lg:py-0">
        <div
          className="flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
          style={contentStyle}
        >
          {/* Illustration — top on mobile, right on desktop */}
          <div className="order-1 lg:order-2">
            <Illustration state={displayState} />
          </div>

          {/* Copy — below illustration on mobile, left on desktop */}
          <div className="order-2 flex w-full max-w-lg flex-col gap-6 lg:order-1">
            <h1
              className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-bold"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {copy.headline}
            </h1>

            <div className="flex flex-col gap-1">
              {copy.sublines.map((line, i) => (
                <p
                  key={i}
                  className="text-[#6B6B68] text-[clamp(0.95rem,1.5vw,1.125rem)] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {line}
                </p>
              ))}
            </div>

            {copy.closer && (
              <p
                className="text-[#1A1A1A] text-[clamp(0.95rem,1.5vw,1.125rem)] italic leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {copy.closer}
              </p>
            )}

            {displayState === "success" ? (
              <button
                onClick={() => setShowNight(true)}
                className="w-fit cursor-pointer rounded-[12px] bg-[#F97316] px-6 py-3 text-[15px] font-medium text-white hover:opacity-90 active:scale-[0.97]"
                style={{ fontFamily: "var(--font-body)", transition: "opacity 150ms, transform 100ms" }}
              >
                Go get some sleep.
              </button>
            ) : (
              <EmailForm state={displayState} onStateChange={transitionTo} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
