"use client";

import { useState, useCallback } from "react";
import { Illustration } from "./illustration";
import { EmailForm } from "./email-form";

type PageState = "default" | "error" | "success";

// Generated once at module load — stable, no hydration issues
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: `${(((i * 137.508) % 100) + Math.sin(i) * 3 + 1).toFixed(2)}%`,
  top: `${(((i * 97.3) % 100) + Math.cos(i) * 3 + 1).toFixed(2)}%`,
  size: `${((i % 3) * 0.7 + 0.9).toFixed(1)}px`,
  delay: `${((i * 0.37) % 6).toFixed(2)}s`,
  duration: `${(2.5 + (i % 7) * 0.5).toFixed(2)}s`,
}));

function NightScreen() {
  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0a0a1f 55%, #030308 100%)",
        animation: "night-in 0.9s ease-out forwards",
      }}
    >
      {/* Star field */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute"
        style={{
          top: "10%",
          right: "12%",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #fffbeb, #fde68a)",
          boxShadow:
            "0 0 40px rgba(253, 230, 138, 0.25), 0 0 80px rgba(253, 230, 138, 0.1)",
        }}
      />

      {/* Message */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-8"
        style={{ animation: "float-up 1s 0.3s ease-out both" }}
      >
        <p
          className="text-white/40 text-[11px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          waldo&apos;s got the watch.
        </p>
        <h2
          className="text-white leading-none"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
          }}
        >
          sleep well.
        </h2>
        <p
          className="text-white/30 text-[14px]"
          style={{ fontFamily: "var(--font-body)", fontStyle: "italic" }}
        >
          we&apos;ll be here in the morning.
        </p>
      </div>
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
  const [visible, setVisible] = useState(true);
  const [displayState, setDisplayState] = useState<PageState>("default");
  const [showNight, setShowNight] = useState(false);

  const transition = useCallback((next: PageState) => {
    setVisible(false);
    setTimeout(() => {
      setDisplayState(next);
      setVisible(true);
    }, 300);
  }, []);

  const copy = COPY[displayState];

  return (
    <>
      {showNight && <NightScreen />}

      <main className="flex h-[calc(100vh-68px)] items-center justify-center px-8">
        <div
          className="flex w-full max-w-5xl items-center justify-between gap-16 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* Left column — copy */}
          <div className="flex max-w-lg flex-col gap-6">
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
                className="w-fit cursor-pointer rounded-[12px] bg-[#F97316] px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Go get some sleep.
              </button>
            ) : (
              <EmailForm state={displayState} onStateChange={transition} />
            )}
          </div>

          {/* Right column — illustration */}
          <div className="hidden lg:block">
            <Illustration state={displayState} />
          </div>
        </div>
      </main>
    </>
  );
}
