// Hero notification stack — Figma-exact 2D layout.
//
// Each card has a different width AND explicit height from Figma.
// The pyramid/converging effect comes from progressively wider cards
// stacked with the correct Y offsets — NOT from 3D perspective.
// Behind cards show only the app name; overflow:hidden clips the rest.
// Front card shows full content.
//
// Slot 0 = back/smallest/top  →  Slot 5 = front/largest/bottom.

"use client";

import { useState } from "react";
import { useCardStack } from "@/hooks/use-card-stack";
import { EASE, DUR_SETTLE, AUTO_HERO_MS } from "@/lib/motion";

type Slot = {
  width: number; height: number; topOffset: number;
  padding: number; borderRadius: number; borderWidth: number;
  appSize: number; msgSize: number; cmtSize: number; msgWidth: number;
};

// Exact Figma spec: Frames 5–10, node 236:7029
const SLOTS: readonly Slot[] = [
  { width: 388.92, height: 104.49, topOffset: -139.05, padding: 24.4612, borderRadius: 16.3075, borderWidth: 1.22306, appSize: 10.3019, msgSize: 14.6767, cmtSize: 10.3019, msgWidth: 340 },
  { width: 405.14, height: 126.35, topOffset:  -82.14, padding: 25.4804, borderRadius: 16.9869, borderWidth: 1.27402, appSize: 10.7311, msgSize: 15.2882, cmtSize: 10.7311, msgWidth: 354 },
  { width: 422.02, height: 133.32, topOffset:  -29.70, padding: 26.5421, borderRadius: 17.6947, borderWidth: 1.32710, appSize: 11.1782, msgSize: 15.9252, cmtSize: 11.1782, msgWidth: 369 },
  { width: 439.60, height: 190.41, topOffset:   50.58, padding: 27.6480, borderRadius: 18.4320, borderWidth: 1.38240, appSize: 11.6440, msgSize: 16.5888, cmtSize: 11.6440, msgWidth: 384 },
  { width: 457.92, height: 143.64, topOffset:   79.79, padding: 28.8000, borderRadius: 19.2000, borderWidth: 1.44000, appSize: 12.1292, msgSize: 17.2800, cmtSize: 12.1292, msgWidth: 400 },
  { width: 477.00, height: 130.00, topOffset:  127.29, padding: 30.0000, borderRadius: 20.0000, borderWidth: 1.50000, appSize: 12.6345, msgSize: 18.0000, cmtSize: 14.0000, msgWidth: 417 },
];

const NOTIFICATIONS = [
  { app: "Slack",    message: "Suyash, need to talk about the sales review for Q1...",                                                                                                  comment: "*Sunday, 11:43pm, really?*" },
  { app: "Slack",    message: "Hey, can I get the data for Q1 sales??? prep for the meet tomorrow, wait no actually today...",                                                          comment: "*it's 3:58am. Interns just don't sleep.*" },
  { app: "iMessage", message: "“It was a great night, hope you did not watch the next episodes without me”",                                                                  comment: "*you binged the season on a Sunday night, bad call...*" },
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
      style={{ width: "477px", height: "384px" }}
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
              transform:    `translate(-50%, calc(-50% + ${slot.topOffset + dragY + liftY}px))`,
              width:        `${slot.width}px`,
              // Behind: explicit height clips content. Front: auto so full content shows.
              height:       front ? "auto" : `${slot.height}px`,
              minHeight:    front ? `${slot.height}px` : undefined,
              padding:      `${slot.padding}px`,
              borderRadius: `${slot.borderRadius}px`,
              borderWidth:  `${slot.borderWidth}px`,
              opacity:      fade,
              transition:   dragDelta > 0 ? "none" : TRANSITION,
              zIndex:       si + 1,
              cursor:       "pointer",
            }}
          >
            {/* App label — visible on all cards */}
            <p
              className="font-medium text-[#1a1a1a] shrink-0 whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: `${slot.appSize}px`, lineHeight: 1.3 }}
            >
              {n.app}
            </p>

            {/* Full content — front card only, fades in after card settles */}
            {front && (
              <>
                <p
                  className="text-[#1a1a1a] shrink-0"
                  style={{ fontFamily: "var(--font-headline)", fontSize: `${slot.msgSize}px`, lineHeight: 1.1, width: `${slot.msgWidth}px`, whiteSpace: "pre-wrap", marginTop: "12px", animation: "content-enter 0.3s 0.22s both" }}
                >
                  {n.message}
                </p>
                <p
                  className="font-medium italic text-[#717171] shrink-0 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: `${slot.cmtSize}px`, lineHeight: 1.3, marginTop: "10px", animation: "content-enter 0.3s 0.32s both" }}
                >
                  {n.comment}
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
