// Hero notification stack — iPhone-style notification group.
//
// Behavior:
//   • Auto-rotates every 5s — front (largest, bottom) card slides off, others advance one slot,
//     a fresh card materializes at the back (smallest, top). Continuous loop.
//   • Click anywhere on the stack → advance one slot manually.
//   • Drag the front card downward past 60px → dismiss with momentum.
//   • Any manual interaction pauses auto-rotate for 5s, then resumes.
//
// Card dimensions are Figma-exact (Frame 5–10, file Dl0WP9uIvx6QbSzZi7cZQY, node 651:6656–651:6676).
// Stack array order: index 0 = back/smallest/top-of-stack, index 5 = front/largest/bottom.

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ── Card visual specs — the 6 "slots" in the stack, back→front ──
// Pulled directly from Figma. Front card (slot 5) is the biggest.
type Slot = {
  width: number;
  topOffset: number; // pixels from container vertical center
  padding: number;
  gap: number;
  borderRadius: number;
  borderWidth: number;
  appSize: number;
  msgSize: number;
  cmtSize: number;
  msgWidth: number; // Figma's explicit width on the message text node
};

const SLOTS: readonly Slot[] = [
  { width: 388.92, topOffset: -139.05, padding: 24.4612, gap:  9.78, borderRadius: 16.3075, borderWidth: 1.22306, appSize: 10.3019, msgSize: 14.6767, cmtSize: 10.3019, msgWidth: 340 },
  { width: 405.14, topOffset:  -82.14, padding: 25.4804, gap: 10.19, borderRadius: 16.9869, borderWidth: 1.27402, appSize: 10.7311, msgSize: 15.2882, cmtSize: 10.7311, msgWidth: 354.18 },
  { width: 422.02, topOffset:  -29.70, padding: 26.5421, gap: 10.62, borderRadius: 17.6947, borderWidth: 1.32710, appSize: 11.1782, msgSize: 15.9252, cmtSize: 11.1782, msgWidth: 368.93 },
  { width: 439.60, topOffset:   50.58, padding: 27.6480, gap: 11.06, borderRadius: 18.4320, borderWidth: 1.38240, appSize: 11.6440, msgSize: 16.5888, cmtSize: 11.6440, msgWidth: 384.31 },
  { width: 457.92, topOffset:   79.79, padding: 28.8000, gap: 11.52, borderRadius: 19.2000, borderWidth: 1.44000, appSize: 12.1292, msgSize: 17.2800, cmtSize: 12.1292, msgWidth: 400.32 },
  { width: 477.00, topOffset:  127.29, padding: 30.0000, gap: 12.00, borderRadius: 20.0000, borderWidth: 1.50000, appSize: 12.6345, msgSize: 18.0000, cmtSize: 14.0000, msgWidth: 417 },
];

// ── Notification copy — these scroll through the slots as the stack rotates ──
type Notification = { app: string; message: string; comment: string };

const NOTIFICATIONS: readonly Notification[] = [
  { app: "Slack",     message: "Suyash, need to talk about the sales review for Q1...",                                                                                                                            comment: "*Sunday, 11:43pm, really?*" },
  { app: "Slack",     message: "Hey, can I get the data for Q1 sales??? prep for the meet tomorrow, wait no actually today...",                                                                                    comment: "*it’s 3:58am. Interns just don’t sleep.*" },
  { app: "iMessage",  message: "“It was a great night, hope you did not watch the next episodes without me”",                                                                                            comment: "*you binged the season on a Sunday night, bad call...*" },
  { app: "Calendar",  message: "Hey Suyash, We don’t care if you received this mail in the best of you health. Hope you are ready for the 96th product strategy review this week. See you at 9 on a Monday!", comment: "*here we go again...*" },
  { app: "GMail",     message: "+104 emails from the healthly lifestyle newsletter you forgot you had subscribed to.",                                                                                             comment: "*sharing work email - bad idea...*" },
  { app: "GMail",     message: "10:00 AM | Q1 Sales Review  ( Deck not finalized...",                                                                                                                              comment: "*did he complete the deck without the data?*" },
];

const AUTO_INTERVAL_MS = 5000;
const RESUME_DELAY_MS  = 5000;
const DRAG_THRESHOLD   = 60;
const TRANSITION       = "all 0.55s cubic-bezier(0.32, 0.72, 0.24, 1)";

export function NotificationStack() {
  // The card displayed at the front (slot 5) is NOTIFICATIONS[(offset + 5) % 6].
  // Bumping offset by 1 advances the stack: front leaves, everyone moves up one.
  const [offset,   setOffset]   = useState(0);
  const [paused,   setPaused]   = useState(false);
  const [dragY,    setDragY]    = useState(0);
  const [dragging, setDragging] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartY  = useRef<number | null>(null);

  // Auto-advance loop
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOffset((o) => o + 1), AUTO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
  }, []);

  const advance = useCallback(() => {
    setOffset((o) => o + 1);
    pauseTemporarily();
  }, [pauseTemporarily]);

  // Drag handlers — pointer-based, work for mouse + touch
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartY.current == null) return;
    const dy = e.clientY - dragStartY.current;
    setDragY(Math.max(0, dy)); // only allow downward drag
  };
  const onPointerUp = () => {
    const triggered = dragY > DRAG_THRESHOLD;
    dragStartY.current = null;
    setDragging(false);
    setDragY(0);
    if (triggered) {
      advance();
    }
  };

  // Click — advance only if user wasn't dragging
  const onClick = () => {
    if (dragY > 0) return;
    advance();
  };

  // Cleanup timer
  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  return (
    <div
      className="relative shrink-0 select-none"
      style={{ height: "382.583px", width: "477px", touchAction: "pan-x" }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="button"
      aria-label="Notification stack — click or drag down to advance"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          advance();
        }
      }}
    >
      {NOTIFICATIONS.map((n, i) => {
        // Compute which slot this notification currently occupies.
        // After `offset` advances, NOTIFICATIONS[i] sits at slot (i - offset) mod 6.
        const slotIdx = ((i - offset) % NOTIFICATIONS.length + NOTIFICATIONS.length) % NOTIFICATIONS.length;
        const slot    = SLOTS[slotIdx];
        const isFront = slotIdx === SLOTS.length - 1;

        // Front card translates with drag; opacity fades as it's pulled down toward dismissal
        const dragTranslate = isFront ? dragY : 0;
        const dragFade      = isFront ? Math.max(0.4, 1 - dragY / 200) : 1;

        return (
          <div
            key={i}
            className="absolute bg-[#fafaf8] border-solid border-[rgba(26,26,26,0.16)] flex flex-col items-start overflow-clip"
            style={{
              left: "50%",
              top: `calc(50% + ${slot.topOffset}px)`,
              transform: `translate(-50%, calc(-50% + ${dragTranslate}px))`,
              width: `${slot.width}px`,
              padding: `${slot.padding}px`,
              gap: `${slot.gap}px`,
              borderRadius: `${slot.borderRadius}px`,
              borderWidth: `${slot.borderWidth}px`,
              opacity: dragFade,
              transition: dragging ? "none" : TRANSITION,
              zIndex: slotIdx + 1, // front (slot 5) sits above back (slot 0)
              cursor: isFront ? "grab" : "pointer",
            }}
          >
            <p
              className="font-medium text-[#1a1a1a] shrink-0 whitespace-nowrap"
              style={{
                fontFamily: "var(--font-body)",
                fontVariationSettings: "'opsz' 14",
                fontSize: `${slot.appSize}px`,
                lineHeight: 1.3,
              }}
            >
              {n.app}
            </p>
            <p
              className="text-[#1a1a1a] shrink-0"
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: `${slot.msgSize}px`,
                lineHeight: 1.1,
                width: `${slot.msgWidth}px`,
                whiteSpace: "normal",
              }}
            >
              {n.message}
            </p>
            <p
              className="font-medium italic text-[#717171] shrink-0 whitespace-nowrap"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontVariationSettings: "'opsz' 14",
                fontSize: `${slot.cmtSize}px`,
                lineHeight: 1.3,
              }}
            >
              {n.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
}
