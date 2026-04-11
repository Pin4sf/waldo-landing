"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Illustration } from "./illustration";
import { EmailForm } from "./email-form";

type PageState = "default" | "error" | "success";
type Phase     = "entering" | "exit" | "idle";

// √2 and √3 — algebraically independent, no diagonal star pattern
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

// Deterministic shooting stars — different positions, speeds, timing
const SHOOTING_STARS = Array.from({ length: 5 }, (_, i) => ({
  id:       i,
  top:      `${8 + i * 13}%`,
  left:     `${5 + i * 17}%`,
  width:    `${65 + i * 18}px`,
  delay:    `${1.5 + i * 3.8}s`,
  period:   `${8 + i * 2.5}s`,  // total loop duration — star shoots briefly then waits
}));

const WALDO_SLEEP_LINES = [
  "don't wake me. i'm working.",
  "ssh. your sleep debt is recovering.",
  "i'm right here. go to sleep.",
  "already on it. literally.",
  "hrv looking better already. see?",
  "still here. always.",
  "the patrol never sleeps. even when waldo does.",
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
      {/* Zzz letters */}
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

      {/* Waldo — white constellation silhouette, gently bobbing */}
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

  useEffect(() => {
    const t = setTimeout(() => setCanDismiss(true), 1600);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (!canDismiss) return;
    setLeaving(true);
    setTimeout(onDismiss, 550);   // matches night-leave duration
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        cursor:     canDismiss ? "pointer" : "default",
        background: "radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0c0c24 50%, #030308 100%)",
        animation:  leaving
          ? "night-leave 550ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
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

      {/* Shooting stars */}
      {SHOOTING_STARS.map((s) => (
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

      {/* Content — staggered float-up */}
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

        {/* Sleeping Waldo */}
        <div
          className="pointer-events-auto mt-10"
          style={{ animation: "float-up 0.6s 1.05s ease-out both" }}
        >
          <SleepingWaldo />
        </div>
      </div>

      {/* Dismiss hint */}
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
    closer:   "now is the time you get some sleep",
  },
};

export function WaitlistPage() {
  const [phase,        setPhase]        = useState<Phase>("entering");
  const [displayState, setDisplayState] = useState<PageState>("default");
  const [showNight,    setShowNight]    = useState(false);

  const transitionTo = useCallback((next: PageState) => {
    setPhase("exit");
    setTimeout(() => {
      setDisplayState(next);
      setPhase("entering");
    }, 220);
  }, []);

  const handleNightDismiss = useCallback(() => {
    setShowNight(false);
    setPhase("entering");
  }, []);

  const cardStyle: React.CSSProperties =
    phase === "exit"
      ? { animation: "content-exit 220ms ease-in forwards" }
      : phase === "entering"
      ? { animation: "content-enter 340ms ease-out forwards" }
      : {};

  const copy = COPY[displayState];

  return (
    <>
      {showNight && <NightScreen onDismiss={handleNightDismiss} />}

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

          {/* Closer text — plain in default, interactive night trigger in success */}
          {copy.closer && displayState !== "success" && (
            <p
              className="text-[#6B6B68] text-[13px] italic leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {copy.closer}
            </p>
          )}

          {/* Night sky trigger — visible pill button in success state */}
          {displayState === "success" && (
            <button
              onClick={() => setShowNight(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#1A1A1A]/[0.08] text-[12px] italic text-[#1A1A1A]/40 hover:border-[#1A1A1A]/20 hover:text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/[0.02] active:scale-[0.97] transition-all cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                animation:  "hint-pulse 3s ease-in-out infinite",
              }}
            >
              {copy.closer}
              <span className="not-italic text-[15px] leading-none">🌙</span>
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
