// Hero notification stack — iPhone-style grouped notifications.
// Behind cards: app-name strip only. Front card: full content.
// Auto 5s, hover pauses, click/drag advances.

"use client";

import { useState } from "react";
import { useCardStack } from "@/hooks/use-card-stack";
import { EASE, DUR_SETTLE, AUTO_HERO_MS } from "@/lib/motion";

type Slot = { width: number; topOffset: number; padding: number; gap: number; borderRadius: number; borderWidth: number; appSize: number; msgSize: number; cmtSize: number; msgWidth: number; };

const SLOTS: readonly Slot[] = [
  { width: 388.92, topOffset: -139.05, padding: 24.4612, gap:  9.78, borderRadius: 16.3075, borderWidth: 1.22306, appSize: 10.3019, msgSize: 14.6767, cmtSize: 10.3019, msgWidth: 340 },
  { width: 405.14, topOffset:  -82.14, padding: 25.4804, gap: 10.19, borderRadius: 16.9869, borderWidth: 1.27402, appSize: 10.7311, msgSize: 15.2882, cmtSize: 10.7311, msgWidth: 354 },
  { width: 422.02, topOffset:  -29.70, padding: 26.5421, gap: 10.62, borderRadius: 17.6947, borderWidth: 1.32710, appSize: 11.1782, msgSize: 15.9252, cmtSize: 11.1782, msgWidth: 369 },
  { width: 439.60, topOffset:   50.58, padding: 27.6480, gap: 11.06, borderRadius: 18.4320, borderWidth: 1.38240, appSize: 11.6440, msgSize: 16.5888, cmtSize: 11.6440, msgWidth: 384 },
  { width: 457.92, topOffset:   79.79, padding: 28.8000, gap: 11.52, borderRadius: 19.2000, borderWidth: 1.44000, appSize: 12.1292, msgSize: 17.2800, cmtSize: 12.1292, msgWidth: 400 },
  { width: 477.00, topOffset:  127.29, padding: 30.0000, gap: 12.00, borderRadius: 20.0000, borderWidth: 1.50000, appSize: 12.6345, msgSize: 18.0000, cmtSize: 14.0000, msgWidth: 417 },
];

const NOTIFICATIONS = [
  { app: "Slack",    message: "Suyash, need to talk about the sales review for Q1...",                                                                                                  comment: "*Sunday, 11:43pm, really?*" },
  { app: "Slack",    message: "Hey, can I get the data for Q1 sales??? prep for the meet tomorrow, wait no actually today...",                                                          comment: "*it’s 3:58am. Interns just don’t sleep.*" },
  { app: "iMessage", message: "“It was a great night, hope you did not watch the next episodes without me”",                                                        comment: "*you binged the season on a Sunday night, bad call...*" },
  { app: "Calendar", message: "Hey Suyash, We don’t care if you received this mail in the best of you health.\n\nHope you are ready for the 96th product strategy review this week. See you at 9 on a Monday!", comment: "*here we go again...*" },
  { app: "GMail",    message: "+104 emails from the healthly lifestyle newsletter you forgot you had subscribed to.",                                                                   comment: "*sharing work email - bad idea...*" },
  { app: "GMail",    message: "10:00 AM | Q1 Sales Review  ( Deck not finalized...",                                                                                                   comment: "*did he complete the deck without the data?*" },
] as const;

export function NotificationStack() {
  const [hovered, setHovered] = useState(false);
  const { slotOf, dragDelta, onPointerDown, onPointerMove, onPointerUp, onClick, onMouseEnter, onMouseLeave } =
    useCardStack(NOTIFICATIONS.length, AUTO_HERO_MS);

  const FRONT = SLOTS.length - 1;
  const T     = `all ${DUR_SETTLE}ms ${EASE}`;

  return (
    <div
      className="relative shrink-0 select-none"
      style={{ height: "382.583px", width: "477px", touchAction: "pan-x" }}
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
        const si     = slotOf(i);
        const slot   = SLOTS[si];
        const front  = si === FRONT;
        const dragY  = front ? dragDelta : 0;
        const liftY  = front && hovered && !dragDelta ? -6 : 0;
        const fade   = front ? Math.max(0.4, 1 - dragDelta / 180) : 1;

        return (
          <div
            key={i}
            className="absolute bg-[#fafaf8] border-solid border-[rgba(26,26,26,0.16)] flex flex-col items-start overflow-hidden"
            style={{
              left:         "50%",
              top:          `calc(50% + ${slot.topOffset}px)`,
              transform:    `translate(-50%, calc(-50% + ${dragY + liftY}px))`,
              width:        `${slot.width}px`,
              padding:      front ? `${slot.padding}px` : `${slot.padding}px ${slot.padding}px ${slot.padding * 0.5}px`,
              borderRadius: `${slot.borderRadius}px`,
              borderWidth:  `${slot.borderWidth}px`,
              opacity:      fade,
              transition:   dragDelta > 0 ? "none" : T,
              zIndex:       si + 1,
              cursor:       "pointer",
            }}
          >
            <p
              className="font-medium text-[#1a1a1a] shrink-0 whitespace-nowrap"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: `${slot.appSize}px`, lineHeight: 1.3 }}
            >
              {n.app}
            </p>
            {front && (
              <>
                <p
                  className="text-[#1a1a1a] shrink-0"
                  style={{ fontFamily: "var(--font-headline)", fontSize: `${slot.msgSize}px`, lineHeight: 1.1, width: `${slot.msgWidth}px`, whiteSpace: "pre-wrap", marginTop: `${slot.gap}px`, animation: "content-enter 0.3s 0.22s both" }}
                >
                  {n.message}
                </p>
                <p
                  className="font-medium italic text-[#717171] shrink-0 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: `${slot.cmtSize}px`, lineHeight: 1.3, marginTop: `${slot.gap}px`, animation: "content-enter 0.3s 0.32s both" }}
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
