// Where's Waldo? — Continuous ticker drum.
//
// Hierarchy:
//   "Where's Waldo?"       ← section headline
//   "Right now, Waldo is"  ← eyebrow context label
//   [ rotating phrase ]    ← the focal point — large, always cycling
//   "Already on it."       ← permanent brand promise below
//
// Animation: pure CSS drum roll — 5 items (4 phrases + duplicate first for
// seamless loop), translateY cycling through positions. Each phrase shows
// ~2.5s, transitions in ~0.5s. No dramatic reveals — quietly always working.

"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "Rescheduling your meeting.",
  "Already on your 2am HRV dip.",
  "Protecting your Friday afternoon.",
  "Making sure your best hours go to your hardest work.",
];

// Seamless loop: 4 phrases + first phrase repeated at end
const TRACK = [...PHRASES, PHRASES[0]];

// Duration: (2.52s visible + 0.48s scroll) × 4 phrases = 12s
const DURATION_S = 12;

export function WhereIsWaldoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animating, setAnimating] = useState(false);

  // Start animation when section enters viewport (plays paused until then)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimating(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center gap-[32px] lg:gap-[48px] py-[80px] lg:py-[120px] w-full text-center"
    >
      {/* ── Headline ─────────────────────────────────────── */}
      <div className="flex flex-col gap-[12px] items-center px-4">
        <p
          className="font-normal italic text-[#6b6b68] text-[13px] lg:text-[14px]"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          Right now, Waldo is
        </p>
        <h2
          className="text-[#1a1a1a] text-[36px] lg:text-[56px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.05 }}
        >
          Where&apos;s Waldo?
        </h2>
      </div>

      {/* ── Ticker drum ──────────────────────────────────── */}
      {/* Window: overflow hidden, sized to one phrase height */}
      <div
        className="w-full px-4 lg:px-0"
        style={{
          maxWidth:    "760px",
          overflow:    "hidden",
          // Height fits the tallest phrase at the largest font size
          // Tallest phrase wraps to ~2 lines on mobile. Clamp guards smaller sizes.
          height:      "clamp(72px, 18vw, 160px)",
          position:    "relative",
        }}
      >
        {/* Subtle gradient masks top/bottom for drum-edge feel */}
        <div
          aria-hidden
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to bottom, #f4f3f0 0%, transparent 30%, transparent 70%, #f4f3f0 100%)",
            zIndex:     2,
            pointerEvents: "none",
          }}
        />

        {/* The track — 5 items stacked, scrolling upward */}
        <div
          style={{
            display:               "flex",
            flexDirection:         "column",
            // Track height = 5 × window height (20% each)
            height:                "500%",
            animationName:         animating ? "waldo-ticker" : "none",
            animationDuration:     `${DURATION_S}s`,
            animationTimingFunction: "cubic-bezier(0.45, 0, 0.55, 1)",
            animationIterationCount: "infinite",
            animationFillMode:     "both",
          }}
        >
          {TRACK.map((phrase, i) => (
            <div
              key={i}
              style={{
                height:          "20%",         // 1/5 of track = 1 window-height
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                padding:         "0 16px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize:   "clamp(24px, 5vw, 56px)",
                  lineHeight: 1.1,
                  color:      "#1A1A1A",
                  maxWidth:   "720px",
                  textAlign:  "center",
                }}
              >
                {phrase}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Brand promise — always visible ───────────────── */}
      <p
        style={{
          fontFamily: "var(--font-headline)",
          fontSize:   "clamp(20px, 3.5vw, 32px)",
          lineHeight: 1.1,
          color:      "#FB943F",
        }}
      >
        Already on it.
      </p>
    </section>
  );
}
