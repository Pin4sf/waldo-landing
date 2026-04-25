// Sunflower click effect — site-wide delight.
//
// On any click on the page background, spawn a sunflower at the click coordinates that
// scales up, rotates a quarter turn, and fades out over ~700ms. Skips clicks that originated
// on interactive elements (buttons, links, inputs) so it doesn't fire when the user is trying
// to do something. Brand-orange palette: #F97316 + accent #1A1A1A.
//
// Lightweight — pure React state + CSS transitions, no animation library, no global listeners
// when the page is unmounted.

"use client";

import { useEffect, useRef, useState } from "react";

type Bloom = {
  id: number;
  x: number;
  y: number;
  rotation: number;   // degrees, randomized per spawn
  size: number;       // px, slight variation per spawn
};

const BLOOM_LIFETIME_MS = 750;
const SIZE_MIN = 40;
const SIZE_MAX = 64;

// Skip clicks on these elements — they're "doing something else"
const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, label, [role='button'], [role='link'], [data-no-bloom]";

function Sunflower({ size }: { size: number }) {
  // 12-petal sunflower in Waldo brand orange. Center seed disc in deep ink so it reads on any background.
  const petalCount = 12;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      aria-hidden
      style={{ display: "block" }}
    >
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount;
        return (
          <ellipse
            key={i}
            cx="0"
            cy="-26"
            rx="8"
            ry="20"
            fill="#F97316"
            transform={`rotate(${angle})`}
            opacity={0.95}
          />
        );
      })}
      <circle cx="0" cy="0" r="12" fill="#1A1A1A" />
      <circle cx="0" cy="0" r="6" fill="#F97316" opacity={0.55} />
    </svg>
  );
}

export function SunflowerCursor({ children }: { children: React.ReactNode }) {
  const [blooms, setBlooms] = useState<Bloom[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(INTERACTIVE_SELECTOR)) return;

      const id  = ++idCounter.current;
      const rot = (Math.random() - 0.5) * 90;        // -45° to +45°
      const sz  = SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN);

      setBlooms((prev) => [...prev, { id, x: e.clientX, y: e.clientY, rotation: rot, size: sz }]);

      window.setTimeout(() => {
        setBlooms((prev) => prev.filter((b) => b.id !== id));
      }, BLOOM_LIFETIME_MS);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {children}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9999] overflow-visible"
        style={{ contain: "layout paint" }}
      >
        {blooms.map((b) => (
          <span
            key={b.id}
            style={
              {
                position: "fixed",
                left: b.x,
                top: b.y,
                "--start-rot": `${b.rotation}deg`,
                "--end-rot":   `${b.rotation + 180}deg`,
                animation: `bloom-pop ${BLOOM_LIFETIME_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                willChange: "transform, opacity",
              } as React.CSSProperties
            }
          >
            <Sunflower size={b.size} />
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes bloom-pop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--start-rot, 0deg)) scale(0.2);
          }
          25% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--end-rot, 180deg)) scale(1.4);
          }
        }
      `}</style>
    </>
  );
}
