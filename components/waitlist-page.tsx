"use client";

import { useState, useCallback } from "react";
import { Illustration } from "./illustration";
import { EmailForm } from "./email-form";

type PageState = "default" | "error" | "success";

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

  const transition = useCallback((next: PageState) => {
    setVisible(false);
    setTimeout(() => {
      setDisplayState(next);
      setVisible(true);
    }, 300);
  }, []);

  const copy = COPY[displayState];

  return (
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
  );
}
