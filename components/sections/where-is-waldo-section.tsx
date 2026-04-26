// Where's Waldo? — The agency section.
//
// Lines appear ONE BY ONE, 700ms apart, like an agent activity log being written.
// A blinking cursor sits after the last visible line while the next one is loading.
// "Already on it." lands last in orange after a deliberate pause.
// Each line triggers a fresh roll-in animation (iOS picker × agent-thinking feel)
// because it's mounted fresh to the DOM — not just a CSS class toggle.

"use client";

import { useEffect, useRef, useState } from "react";

const ACTIVITIES = [
  "Rescheduling your meeting.",
  "Already on your 2am HRV dip.",
  "Protecting your Friday afternoon.",
  "Making sure your best hours go to your hardest work.",
];

const STEP_MS      = 700;  // gap between each activity line appearing
const START_MS     = 400;  // delay after section enters view before first line
const FINAL_GAP_MS = 900;  // extra pause before "Already on it."

export function WhereIsWaldoSection() {
  const sectionRef                     = useRef<HTMLElement>(null);
  const [started,    setStarted]       = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showFinal,  setShowFinal]     = useState(false);
  const [showCursor, setShowCursor]    = useState(false);

  // Trigger once when 30% of section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential reveal once started
  useEffect(() => {
    if (!started) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Show cursor immediately, then add lines one by one
    timers.push(setTimeout(() => setShowCursor(true), START_MS - 200));

    ACTIVITIES.forEach((_, i) => {
      const t = START_MS + i * STEP_MS;
      timers.push(setTimeout(() => setVisibleCount(i + 1), t));
    });

    // After last activity: hide cursor, pause, show "Already on it."
    const finalStart = START_MS + ACTIVITIES.length * STEP_MS;
    timers.push(setTimeout(() => setShowCursor(false), finalStart));
    timers.push(setTimeout(() => setShowFinal(true),   finalStart + FINAL_GAP_MS));

    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center gap-[40px] lg:gap-[56px] py-[70px] lg:py-[100px] w-full text-center"
      style={{ perspective: "500px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Headline */}
      <h2
        className="text-[#1a1a1a] text-[36px] lg:text-[48px] px-4"
        style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
      >
        Where&apos;s Waldo?
      </h2>

      {/* Activity log */}
      <div className="flex flex-col gap-[16px] lg:gap-[20px] items-center px-6 lg:px-0 min-h-[220px] lg:min-h-[260px]">

        {/* Visible activity lines — each mounts fresh so roll-in animation fires */}
        {ACTIVITIES.slice(0, visibleCount).map((text, i) => (
          <p
            key={i}
            className="waldo-roll-line waldo-roll-triggered"
            style={{
              fontFamily:        "var(--font-headline)",
              fontSize:          "clamp(17px, 3vw, 24px)",
              lineHeight:        1.25,
              color:             "#1A1A1A",
              maxWidth:          "600px",
              "--roll-delay":    "0ms",
            } as React.CSSProperties}
          >
            {text}
          </p>
        ))}

        {/* Blinking cursor — shows between lines while agent "thinks" */}
        {showCursor && !showFinal && (
          <span
            style={{
              display:   "inline-block",
              width:     "6px",
              height:    "6px",
              borderRadius: "50%",
              background: "#1A1A1A",
              animation: "hint-pulse 0.8s ease-in-out infinite",
            }}
            aria-hidden
          />
        )}

        {/* "Already on it." — the conclusive beat */}
        {showFinal && (
          <p
            className="waldo-roll-line waldo-roll-triggered"
            style={{
              fontFamily:     "var(--font-headline)",
              fontSize:       "clamp(20px, 3.5vw, 28px)",
              lineHeight:     1.2,
              color:          "#FB943F",
              maxWidth:       "600px",
              "--roll-delay": "0ms",
            } as React.CSSProperties}
          >
            Already on it.
          </p>
        )}
      </div>
    </section>
  );
}
