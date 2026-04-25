// Hero notification stack — iPhone-style grouped notifications with CSS 3D perspective.
//
// The "converging lines" effect: all cards are 477px wide in 3D space, but CSS perspective
// projection narrows cards at greater Z-depth, making their edges converge to a vanishing point.
// This is exactly how iOS achieves the same visual — preserve-3d + translateZ.
//
// Behind cards: app-name strip only. Front card: full content.
// Auto 5s, hover pauses, click/drag-down advances.

"use client";

import { useState } from "react";
import { useCardStack } from "@/hooks/use-card-stack";
import { EASE, DUR_SETTLE, AUTO_HERO_MS } from "@/lib/motion";

// Card Z-depths. Slot 5 = z:0 (front), slot 0 = z:-250 (farthest back).
// Perspective 800px → apparent scale at slot 0 = 800/1050 ≈ 0.76 (cards visibly narrower).
const SLOTS = [
  { topOffset: -139.05, z: -250 },
  { topOffset:  -82.14, z: -200 },
  { topOffset:  -29.70, z: -150 },
  { topOffset:   50.58, z: -100 },
  { topOffset:   79.79, z:  -50 },
  { topOffset:  127.29, z:    0 },
] as const;

const CARD_W    = 477;
const PAD       = 30;
const FONT_APP  = 12.6;
const FONT_MSG  = 18;
const FONT_CMT  = 14;

const NOTIFICATIONS = [
  { app: "Slack",    message: "Suyash, need to talk about the sales review for Q1...",                                                                                                  comment: "*Sunday, 11:43pm, really?*" },
  { app: "Slack",    message: "Hey, can I get the data for Q1 sales??? prep for the meet tomorrow, wait no actually today...",                                                          comment: "*it's 3:58am. Interns just don't sleep.*" },
  { app: "iMessage", message: "“It was a great night, hope you did not watch the next episodes without me”",                                                            comment: "*you binged the season on a Sunday night, bad call...*" },
  { app: "Calendar", message: "Hey Suyash, We don't care if you received this mail in the best of you health.\n\nHope you are ready for the 96th product strategy review this week. See you at 9 on a Monday!", comment: "*here we go again...*" },
  { app: "GMail",    message: "+104 emails from the healthly lifestyle newsletter you forgot you had subscribed to.",                                                                   comment: "*sharing work email - bad idea...*" },
  { app: "GMail",    message: "10:00 AM | Q1 Sales Review  ( Deck not finalized...",                                                                                                   comment: "*did he complete the deck without the data?*" },
] as const;

const FRONT     = SLOTS.length - 1;
const TRANSITION = `all ${DUR_SETTLE}ms ${EASE}`;

export function NotificationStack() {
  const [hovered, setHovered] = useState(false);
  const { slotOf, dragDelta, onPointerDown, onPointerMove, onPointerUp, onClick, onMouseEnter, onMouseLeave } =
    useCardStack(NOTIFICATIONS.length, AUTO_HERO_MS);

  return (
    <div
      className="relative shrink-0 select-none"
      style={{
        width: "580px",
        height: "500px",
        // 3D context — perspective creates the foreshortening / converging-line effect
        perspective: "800px",
        perspectiveOrigin: "50% 50%",
      }}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => { setHovered(true);  onMouseEnter(); }}
      onMouseLeave={() => { setHovered(false); onMouseLeave(); }}
      role="button"
      aria-label="Notification stack — click to advance"
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e as unknown as React.MouseEvent); } }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {NOTIFICATIONS.map((n, i) => {
          const si    = slotOf(i);
          const slot  = SLOTS[si];
          const front = si === FRONT;

          const dragY = front ? dragDelta : 0;
          const liftY = front && hovered && !dragDelta ? -6 : 0;
          const fade  = front ? Math.max(0.4, 1 - dragDelta / 180) : 1;

          return (
            <div
              key={i}
              className="absolute bg-[#fafaf8] border-solid border-[rgba(26,26,26,0.16)] flex flex-col items-start overflow-hidden"
              style={{
                left:         "50%",
                top:          "50%",
                width:        `${CARD_W}px`,
                padding:      front
                  ? `${PAD}px`
                  : `${PAD * 0.6}px ${PAD}px`,
                borderRadius: "20px",
                borderWidth:  "1.5px",
                opacity:      fade,
                // perspective-3d transform: Y position + Z depth (creates converging effect)
                transform:    `translate(-50%, -50%) translateY(${slot.topOffset + dragY + liftY}px) translateZ(${slot.z}px)`,
                transition:   dragDelta > 0 ? "none" : TRANSITION,
                cursor:       "pointer",
                boxShadow:    front
                  ? "0 4px 24px rgba(0,0,0,0.08)"
                  : `0 ${2 + si}px ${8 + si * 2}px rgba(0,0,0,${0.03 + (FRONT - si) * 0.01})`,
              }}
            >
              <p
                className="font-medium text-[#1a1a1a] shrink-0 whitespace-nowrap"
                style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: `${FONT_APP}px`, lineHeight: 1.3 }}
              >
                {n.app}
              </p>

              {front && (
                <>
                  <p
                    className="text-[#1a1a1a] shrink-0"
                    style={{ fontFamily: "var(--font-headline)", fontSize: `${FONT_MSG}px`, lineHeight: 1.1, width: `${CARD_W - PAD * 2}px`, whiteSpace: "pre-wrap", marginTop: `${12}px`, animation: "content-enter 0.3s 0.22s both" }}
                  >
                    {n.message}
                  </p>
                  <p
                    className="font-medium italic text-[#717171] shrink-0 whitespace-nowrap"
                    style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: `${FONT_CMT}px`, lineHeight: 1.3, marginTop: `${12}px`, animation: "content-enter 0.3s 0.32s both" }}
                  >
                    {n.comment}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
