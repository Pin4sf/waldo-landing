// Where's Waldo? — The agency section.
//
// Answers the implicit question every visitor has: what is Waldo actually DOING?
// Each line reveals like an iOS picker drum tick × agent-thinking state:
// comes in from below with a blur, rotates forward, lands crisp.
// Fires once via IntersectionObserver when section enters 35% into viewport.
// "Already on it." appears last in brand orange — the conclusive beat.

"use client";

import { useEffect, useRef, useState } from "react";

const LINES: { text: string; orange?: boolean }[] = [
  { text: "Rescheduling your meeting." },
  { text: "Already on your 2am HRV dip." },
  { text: "Protecting your Friday afternoon." },
  { text: "Making sure your best hours go to your hardest work." },
  { text: "Already on it.", orange: true },
];

const STAGGER_MS   = 300;
const EXTRA_PAUSE  = 250; // extra delay before the orange line

export function WhereIsWaldoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect(); // fires once only
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`flex flex-col items-center gap-[50px] lg:gap-[60px] py-[70px] lg:py-[100px] w-full text-center${triggered ? " waldo-roll-triggered" : ""}`}
      style={{
        perspective:       "500px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Headline */}
      <h2
        className="text-[#1a1a1a] text-[36px] lg:text-[48px] px-4"
        style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
      >
        Where&apos;s Waldo?
      </h2>

      {/* Activity lines */}
      <div className="flex flex-col gap-[18px] lg:gap-[22px] items-center px-6 lg:px-0">
        {LINES.map((line, i) => {
          const isOrange = line.orange;
          // Each regular line staggered 300ms; orange line gets extra 250ms on top
          const delay = i < LINES.length - 1
            ? i * STAGGER_MS
            : (LINES.length - 1) * STAGGER_MS + EXTRA_PAUSE;

          return (
            <p
              key={i}
              className="waldo-roll-line"
              style={
                {
                  fontFamily:   "var(--font-headline)",
                  fontSize:     isOrange ? "clamp(22px, 4vw, 28px)" : "clamp(18px, 3.5vw, 26px)",
                  lineHeight:   1.2,
                  color:        isOrange ? "#FB943F" : "#1A1A1A",
                  fontWeight:   isOrange ? 600 : 400,
                  maxWidth:     "640px",
                  "--roll-delay": `${delay}ms`,
                } as React.CSSProperties
              }
            >
              {line.text}
            </p>
          );
        })}
      </div>
    </section>
  );
}
