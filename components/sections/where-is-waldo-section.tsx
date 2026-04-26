// Where's Waldo? — Word-flipper / cycling text rotator.
//
// One phrase at a time in a fixed viewport window:
//   enter from below → stay 2.2s → exit to top → next enters from below
// Classic "Claude thinking state" / word-flipper pattern used by Linear, Vercel, Arc.
// Ends with "Already on it." sliding in and staying permanently in brand orange.
// Micro-interactions: pulsing orange dot (thinking indicator) + progress bar.

"use client";

import { useEffect, useRef, useState } from "react";

const ACTIVITIES = [
  "Rescheduling your meeting.",
  "Already on your 2am HRV dip.",
  "Protecting your Friday afternoon.",
  "Making sure your best hours go to your hardest work.",
];

const ENTER_MS      = 480;
const VISIBLE_MS    = 2200;
const EXIT_MS       = 360;
const EASE_IN       = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_OUT      = "cubic-bezier(0.55, 0, 1, 0.45)";

type Phase = "idle" | "thinking" | "entering" | "visible" | "exiting" | "done";

export function WhereIsWaldoSection() {
  const sectionRef                          = useRef<HTMLElement>(null);
  const [started,   setStarted]             = useState(false);
  const [idx,       setIdx]                 = useState(0);
  const [phase,     setPhase]               = useState<Phase>("idle");
  const [progressKey, setProgressKey]       = useState(0);

  // Fire once when 30% of section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // State machine: idle → thinking → entering → visible → exiting → (loop or done)
  useEffect(() => {
    if (!started || phase === "done") return;
    const go = (next: Phase, delay: number) => {
      const t = setTimeout(() => setPhase(next), delay);
      return () => clearTimeout(t);
    };

    if (phase === "idle")     return go("thinking", 400);
    if (phase === "thinking") return go("entering",  600); // show dot 600ms then word enters
    if (phase === "entering") {
      const t = setTimeout(() => {
        setPhase("visible");
        setProgressKey(k => k + 1); // reset progress bar
      }, ENTER_MS);
      return () => clearTimeout(t);
    }
    if (phase === "visible")  return go("exiting", VISIBLE_MS);
    if (phase === "exiting") {
      const t = setTimeout(() => {
        const next = idx + 1;
        if (next >= ACTIVITIES.length) {
          setPhase("done");
        } else {
          setIdx(next);
          setPhase("thinking");
        }
      }, EXIT_MS);
      return () => clearTimeout(t);
    }
  }, [started, phase, idx]);

  // ── phrase transform ─────────────────────────────────────────
  const isIn  = phase === "entering" || phase === "visible";
  const isOut = phase === "exiting";

  const phraseTransform =
    isOut ? "translateY(-120%) scale(0.97)" :
    isIn  ? "translateY(0)     scale(1)"    :
            "translateY(120%)  scale(0.97)";

  const phraseStyle: React.CSSProperties = {
    transform:  phraseTransform,
    opacity:    phase === "visible" ? 1 : 0,
    filter:     phase === "visible" ? "blur(0)" : "blur(6px)",
    transition: `transform ${isOut ? EXIT_MS : ENTER_MS}ms ${isOut ? EASE_OUT : EASE_IN},
                 opacity   ${isOut ? EXIT_MS : ENTER_MS}ms ease,
                 filter    ${isOut ? EXIT_MS : ENTER_MS}ms ease`,
    transformOrigin: "center",
  };

  // ── final phrase ─────────────────────────────────────────────
  const [showFinal, setShowFinal] = useState(false);
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => setShowFinal(true), 150);
    return () => clearTimeout(t);
  }, [phase]);

  const finalStyle: React.CSSProperties = {
    transform:  showFinal ? "translateY(0) scale(1)" : "translateY(60%) scale(0.96)",
    opacity:    showFinal ? 1 : 0,
    filter:     showFinal ? "blur(0)" : "blur(4px)",
    transition: `transform 600ms ${EASE_IN}, opacity 600ms ease, filter 600ms ease`,
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center gap-[48px] lg:gap-[64px] py-[80px] lg:py-[120px] w-full text-center"
    >
      {/* Headline */}
      <h2
        className="text-[#1a1a1a] text-[36px] lg:text-[56px] px-4"
        style={{ fontFamily: "var(--font-headline)", lineHeight: 1.05 }}
      >
        Where&apos;s Waldo?
      </h2>

      {/* Word-flipper window */}
      <div className="flex flex-col items-center gap-[28px] w-full px-6 lg:px-0">

        {/* Fixed viewport — one phrase visible at a time */}
        <div
          style={{
            width:    "100%",
            maxWidth: "720px",
            height:   "clamp(80px, 15vw, 160px)",
            overflow: "hidden",
            position: "relative",
            display:  "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Thinking dot — visible during "thinking" phase */}
          {phase === "thinking" && (
            <span
              style={{
                display:      "block",
                width:        "10px",
                height:       "10px",
                borderRadius: "50%",
                background:   "#FB943F",
                animation:    "hint-pulse 0.6s ease-in-out infinite",
                position:     "absolute",
              }}
              aria-hidden
            />
          )}

          {/* The phrase */}
          {phase !== "done" && phase !== "idle" && phase !== "thinking" && (
            <p
              style={{
                ...phraseStyle,
                fontFamily: "var(--font-headline)",
                fontSize:   "clamp(26px, 5.5vw, 60px)",
                lineHeight: 1.1,
                color:      "#1A1A1A",
                maxWidth:   "720px",
              }}
            >
              {ACTIVITIES[idx]}
            </p>
          )}
        </div>

        {/* Progress bar — fills while phrase is visible */}
        {phase !== "done" && phase !== "idle" && (
          <div
            style={{
              width:        "100%",
              maxWidth:     "200px",
              height:       "2px",
              background:   "rgba(26,26,26,0.1)",
              borderRadius: "1px",
              overflow:     "hidden",
            }}
          >
            {phase === "visible" && (
              <div
                key={progressKey}
                style={{
                  height:    "100%",
                  background: "#1A1A1A",
                  animation: `waldo-progress ${VISIBLE_MS}ms linear forwards`,
                }}
              />
            )}
          </div>
        )}

        {/* "Already on it." — final state, stays permanently */}
        {(phase === "done") && (
          <p
            style={{
              ...finalStyle,
              fontFamily: "var(--font-headline)",
              fontSize:   "clamp(28px, 6vw, 64px)",
              lineHeight: 1.05,
              color:      "#FB943F",
              maxWidth:   "720px",
            }}
          >
            Already on it.
          </p>
        )}
      </div>
    </section>
  );
}
