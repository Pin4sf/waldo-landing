// Waldo logo click effect — site-wide delight.
//
// On any click on the page background, the Waldo logo splash-blooms at the click point:
// 7 petals start clustered at the logo center, fly outward to their natural positions
// with rotational variance, hold for a beat, then fade outward (~700ms total).
// Skips clicks on interactive elements so it never blocks an action.
//
// Implementation note on SVG transforms:
//   CSS pixel transforms on SVG elements behave like HTML — pixel = CSS pixel.
//   By rendering the SVG at its natural 195×199 viewBox size (via CSS px), pixel
//   translations map cleanly to user-units. The wrapper then `scale()`s the whole
//   SVG to the desired display size. This avoids the "transforms in the wrong unit"
//   pitfall that hits inline-SVG animation.

"use client";

import { useEffect, useRef, useState } from "react";

type Bloom = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number; // overall rotation jitter for organic variety
};

const BLOOM_LIFETIME_MS = 700;
const SIZE_MIN = 56;
const SIZE_MAX = 88;

// Skip clicks on interactive elements
const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, label, [role='button'], [role='link'], [data-no-bloom]";

// ── Logo geometry ─────────────────────────────────────────────────────────
// Each petal's `d` is the original Figma path. `cx, cy` is the petal's
// approximate visual center in the 195×199 viewBox; used to compute the
// translate-to-center offset for the burst start state.
const LOGO_VIEWBOX = { w: 195, h: 199, cx: 100, cy: 100 };

const PETALS: { d: string; cx: number; cy: number }[] = [
  { d: "M105.107 86.4265C81.571 89.3821 68.9744 40.4184 94.0459 31.2918C119.445 28.4777 130.141 79.0354 105.107 86.4265Z", cx: 99,  cy: 59  },
  { d: "M79.9086 102.061C68.3123 125.496 17.4838 108.985 24.559 80.5855C37.4045 55.5118 88.4934 74.6938 79.9086 102.061Z", cx: 52,  cy: 90  },
  { d: "M133.65 97.4584C117.74 81.3178 139.319 48.0464 159.825 62.3265C176.77 79.9275 153.1 112.556 133.65 97.4584Z",     cx: 147, cy: 80  },
  { d: "M142.596 120.58C145.942 105.726 176.556 107.868 176.401 124.885C172.576 140.839 141.459 137.227 142.596 120.58Z",  cx: 159, cy: 122 },
  { d: "M124.679 134.593C132.31 129.131 148.648 154.176 141.969 163.302C133.643 168.988 117.592 142.752 124.679 134.593Z", cx: 133, cy: 149 },
  { d: "M107.796 142.31C115.982 143.084 115.132 163.865 105.794 165.449C96.9988 164.463 98.6496 143.198 107.796 142.31Z",  cx: 106, cy: 154 },
  { d: "M78.8035 147.117C72.9944 149.199 67.222 150.007 61.26 147.984C55.433 146.07 51.678 140.481 54.103 134.435C56.1195 129.408 60.8072 126.183 65.589 124.105C88.9014 114.17 103.742 136.894 78.8035 147.117Z", cx: 77, cy: 132 },
];

function WaldoLogoBurst({ size }: { size: number }) {
  const scale = size / LOGO_VIEWBOX.w;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <svg
        width={LOGO_VIEWBOX.w}
        height={LOGO_VIEWBOX.h}
        viewBox={`0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          overflow: "visible",
        }}
      >
        {PETALS.map((p, i) => {
          const tx = LOGO_VIEWBOX.cx - p.cx; // translate to logo center for burst start
          const ty = LOGO_VIEWBOX.cy - p.cy;
          const startRot = (Math.random() - 0.5) * 80; // jitter -40°…+40°
          const endRot   = (Math.random() - 0.5) * 30;
          return (
            <path
              key={i}
              d={p.d}
              fill="#FB943F"
              style={
                {
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  "--tx":        `${tx}px`,
                  "--ty":        `${ty}px`,
                  "--rot-start": `${startRot}deg`,
                  "--rot-end":   `${endRot}deg`,
                  animation: `petal-burst ${BLOOM_LIFETIME_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 30}ms both`,
                  willChange: "transform, opacity",
                } as React.CSSProperties
              }
            />
          );
        })}
      </svg>
    </div>
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
      const sz  = SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN);
      const rot = (Math.random() - 0.5) * 30;

      setBlooms((prev) => [...prev, { id, x: e.clientX, y: e.clientY, size: sz, rotation: rot }]);

      window.setTimeout(() => {
        setBlooms((prev) => prev.filter((b) => b.id !== id));
      }, BLOOM_LIFETIME_MS + 300);
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
            style={{
              position: "fixed",
              left: b.x,
              top: b.y,
              transform: `translate(-50%, -50%) rotate(${b.rotation}deg)`,
              willChange: "transform, opacity",
            }}
          >
            <WaldoLogoBurst size={b.size} />
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes petal-burst {
          0% {
            transform: translate(var(--tx, 0), var(--ty, 0)) scale(0) rotate(var(--rot-start, 0deg));
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          55% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(0, 0) scale(1.35) rotate(var(--rot-end, 0deg));
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
