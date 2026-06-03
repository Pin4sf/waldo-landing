"use client";

import { MobileDots } from "@/components/mobile-dots";
import { Aside, typeStyles } from "@/components/landing-primitives";
import { useCardStack } from "@/hooks/use-card-stack";
import { AUTO_HERO_MS } from "@/lib/motion";
import type { MouseEvent } from "react";

const NOTIFICATIONS = [
  {
    app: "Apple Health",
    message: "HRV: 38ms.",
    read: "below baseline; nothing changed.",
  },
  {
    app: "Sleep Cycle",
    message: "Sleep: 5h 42m.",
    read: "short night; your 9am stayed put.",
  },
  {
    app: "WHOOP",
    message: "Recovery is low.",
    read: "score delivered; day still yours to fix.",
  },
  {
    app: "Oura",
    message: "Stress elevated.",
    read: "signal noticed; no time protected.",
  },
  {
    app: "Calendar",
    message: "4 meetings before noon.",
    read: "demand visible; body ignored.",
  },
] as const;

const STACK = [
  { y: -42, scale: 0.88, opacity: 0.44, width: "84%" },
  { y: -22, scale: 0.94, opacity: 0.68, width: "92%" },
  { y: 0, scale: 1, opacity: 1, width: "100%" },
] as const;

export function NotificationStack() {
  const { frontIndex, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useCardStack(NOTIFICATIONS.length, AUTO_HERO_MS);

  return (
    <div
      className="w-full select-none"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="button"
      aria-label="Passive notification stack. Click to advance."
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(event as unknown as MouseEvent);
        }
      }}
    >
      <div className="relative mx-auto h-[236px] w-full max-w-[440px]">
        {STACK.map((slot, index) => {
          const itemIndex = (frontIndex - (STACK.length - 1 - index) + NOTIFICATIONS.length) % NOTIFICATIONS.length;
          const item = NOTIFICATIONS[itemIndex];
          const front = index === STACK.length - 1;

          return (
            <div
              key={`${item.app}-${index}`}
              className="surface-card absolute bottom-0 left-1/2 min-h-[152px] p-5 transition-[opacity,transform,width] duration-500 ease-[var(--ease-premium)]"
              style={{
                opacity: slot.opacity,
                transform: `translateX(-50%) translateY(${slot.y}px) scale(${slot.scale})`,
                transformOrigin: "bottom center",
                width: slot.width,
                zIndex: index + 1,
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="type-label text-[var(--ink)]">{item.app}</p>
                <span className="type-caption rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] px-3 py-1 text-[var(--text-secondary)]">
                  passive
                </span>
              </div>
              <p className="mt-4 text-[var(--ink)]" style={{ ...typeStyles.h3 }}>
                {item.message}
              </p>
              {front ? <Aside className="mt-3">{item.read}</Aside> : null}
            </div>
          );
        })}
      </div>
      <MobileDots count={NOTIFICATIONS.length} current={frontIndex} />
    </div>
  );
}
