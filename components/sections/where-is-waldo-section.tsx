// Where's Waldo? — Agent-UI card with streaming task log.
//
// A card that looks like Waldo's actual interface, dropped into the marketing page.
// Tasks stream in word-by-word (agent log feel). Status icons:
//   ✓  done — gray, muted
//   →  active — orange, cursor ▍ blinks at end while typing
//   ·  queued — very faded
// "Already on it." streams last in orange Corben — the agent's conclusion.
// Fires once on IntersectionObserver. Never loops.

"use client";

import { useEffect, useRef, useState } from "react";

// Inline the paw mark as a square SVG so CSS rotation is always clean.
// A non-square <img> tag wobbles when rotated; a square SVG spins perfectly.
function SpinningPawIcon() {
  return (
    <span
      className="waldo-loading-spin"
      style={{
        display:         "inline-flex",
        width:           "18px",
        height:          "18px",
        alignItems:      "center",
        justifyContent:  "center",
        flexShrink:      0,
        transformOrigin: "center",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="-0.5 -1 24 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z" fill="#FB943F"/>
        <path d="M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z" fill="#FB943F"/>
        <path d="M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z" fill="#FB943F"/>
        <path d="M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z" fill="#FB943F"/>
        <path d="M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z" fill="#FB943F"/>
        <path d="M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z" fill="#FB943F"/>
        <path d="M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z" fill="#FB943F"/>
      </svg>
    </span>
  );
}

const TASK_LINES = [
  "Rescheduled your 9am to 10:30am",
  "Logged your 2am HRV dip",
  "Protecting your Friday afternoon",
  "Matching your best hours to deep work",
];
const FINAL_LINE = "Already on it.";
const WORD_MS    = 75;   // ms per word while streaming

type Status = "queued" | "active" | "done";

export function WhereIsWaldoSection() {
  const sectionRef                         = useRef<HTMLElement>(null);
  const [started,    setStarted]           = useState(false);
  const [statuses,   setStatuses]          = useState<Status[]>(TASK_LINES.map(() => "queued"));
  const [wordCounts, setWordCounts]        = useState<number[]>(TASK_LINES.map(() => 0));
  const [activeIdx,  setActiveIdx]         = useState<number>(-1);
  const [finalWords, setFinalWords]        = useState(0);
  const [showCursor, setShowCursor]        = useState(false);
  const activeIdxRef  = useRef(-1);
  const wordCountsRef = useRef<number[]>(TASK_LINES.map(() => 0));

  // Trigger once
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Main streaming engine
  useEffect(() => {
    if (!started) return;

    // Start task 0 after a brief pause
    const startDelay = setTimeout(() => advanceToTask(0), 400);
    return () => clearTimeout(startDelay);

    function advanceToTask(idx: number) {
      if (idx >= TASK_LINES.length) {
        // All tasks done — stream "Already on it."
        setShowCursor(false);
        streamFinal();
        return;
      }
      activeIdxRef.current = idx;
      setActiveIdx(idx);
      setStatuses(s => s.map((st, i) => i === idx ? "active" : st));
      setShowCursor(true);
      streamTask(idx);
    }

    function streamTask(taskIdx: number) {
      const words = TASK_LINES[taskIdx].split(" ");
      let w = 0;
      const interval = setInterval(() => {
        w++;
        wordCountsRef.current = wordCountsRef.current.map((c, i) => i === taskIdx ? w : c);
        setWordCounts([...wordCountsRef.current]);
        if (w >= words.length) {
          clearInterval(interval);
          // Brief hold then mark done and move to next
          setTimeout(() => {
            setStatuses(s => s.map((st, i) => i === taskIdx ? "done" : st));
            setShowCursor(false);
            setTimeout(() => advanceToTask(taskIdx + 1), 200);
          }, 350);
        }
      }, WORD_MS);
    }

    function streamFinal() {
      const words = FINAL_LINE.split(" ");
      let w = 0;
      const interval = setInterval(() => {
        w++;
        setFinalWords(w);
        if (w >= words.length) clearInterval(interval);
      }, WORD_MS + 20);
    }
  }, [started]);

  const taskWords = (idx: number) =>
    TASK_LINES[idx].split(" ").slice(0, wordCounts[idx]).join(" ");

  const finalText = FINAL_LINE.split(" ").slice(0, finalWords).join(" ");

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center gap-[32px] lg:gap-[48px] py-[70px] lg:py-[100px] w-full"
    >
      {/* Section headline — matches all other section H2s */}
      <h2
        data-animate="headline"
        className="text-[#1a1a1a] text-[32px] lg:text-[48px] text-center px-4"
        style={{ fontFamily: "var(--font-headline)", lineHeight: 1.05 }}
      >
        Where&apos;s Waldo?
      </h2>

      {/* Agent UI card */}
      <div
        className="w-full px-4 lg:px-0"
        style={{
          maxWidth:     "560px",
          background:   "#fafaf8",
          border:       "1.5px solid rgba(26,26,26,0.10)",
          borderRadius: "24px",
          padding:      "clamp(28px, 5vw, 44px)",
        }}
      >
        {/* Card label */}
        <p
          className="font-normal italic text-[#6b6b68] text-[12px] lg:text-[13px] mb-[24px]"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          Right now, Waldo is handling
        </p>

        {/* Task list */}
        <div className="flex flex-col gap-[14px] lg:gap-[16px]">
          {TASK_LINES.map((line, i) => {
            const status = statuses[i];
            const visible = taskWords(i);
            const words   = line.split(" ");
            const isActive = status === "active";
            const isDone   = status === "done";
            const isQueued = status === "queued";

            return (
              <div
                key={i}
                className="flex items-start gap-[10px]"
                style={{ opacity: isQueued ? 0.28 : 1, transition: "opacity 0.3s ease" }}
              >
                {/* Status icon */}
                {isActive ? (
                  <SpinningPawIcon />
                ) : (
                  <span
                    style={{
                      fontFamily:  "var(--font-body)",
                      fontSize:    "14px",
                      lineHeight:  "1.5",
                      flexShrink:  0,
                      width:       "16px",
                      color:       isDone ? "#aaa" : "#bbb",
                      transition:  "color 0.3s ease",
                      fontStyle:   "normal",
                    }}
                  >
                    {isDone ? "✓" : "·"}
                  </span>
                )}

                {/* Task text */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontVariationSettings: "'opsz' 14",
                    fontSize:   "clamp(14px, 2.5vw, 16px)",
                    lineHeight: 1.5,
                    color:      isDone ? "#9a9a97" : "#1A1A1A",
                    transition: "color 0.4s ease",
                    minHeight:  "1.5em",
                  }}
                >
                  {isQueued
                    ? line                           // show full line faded
                    : isDone
                    ? line                           // full line, grayed
                    : visible                        // streaming — partial
                  }
                  {isActive && showCursor && (
                    <span
                      style={{
                        display:    "inline-block",
                        width:      "2px",
                        height:     "1em",
                        background: "#FB943F",
                        marginLeft: "2px",
                        verticalAlign: "text-top",
                        animation:  "hint-pulse 0.7s ease-in-out infinite",
                      }}
                      aria-hidden
                    />
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* "Already on it." — always rendered; maxHeight/marginTop animate in so card grows smoothly */}
        <p
          style={{
            fontFamily:  "var(--font-headline)",
            fontSize:    "clamp(22px, 4vw, 32px)",
            lineHeight:  1.1,
            color:       "#FB943F",
            overflow:    "hidden",
            maxHeight:   finalWords > 0 ? "80px"  : "0px",
            marginTop:   finalWords > 0 ? "clamp(28px, 4vw, 36px)" : "0px",
            opacity:     finalWords > 0 ? 1 : 0,
            transition:  "max-height 0.45s ease, margin-top 0.45s ease, opacity 0.35s ease",
          }}
        >
          {finalText}
          {finalWords > 0 && finalWords < FINAL_LINE.split(" ").length && (
            <span
              style={{
                display:       "inline-block",
                width:         "2px",
                height:        "0.85em",
                background:    "#FB943F",
                marginLeft:    "3px",
                verticalAlign: "text-top",
                animation:     "hint-pulse 0.7s ease-in-out infinite",
              }}
              aria-hidden
            />
          )}
        </p>
      </div>
    </section>
  );
}
