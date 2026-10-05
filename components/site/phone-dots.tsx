"use client";

import type { CSSProperties } from "react";

// The page dots under the phone, after the carousel control on apple.com/in (measured from a
// screen recording): a row of small dots, the current one stretched into a pill with a dark fill
// running across it while it waits its turn. When there are more slides than fit, only seven dots
// show and the row slides along; the dots at the ends shrink on the side that has more beyond it.
// Sizes are the recording's (7px dots, 20px apart, a 26px pill) made 15% smaller, with the end dots
// at 75% and 50%.

const VISIBLE = 7;
/** How the dots nearest each end shrink, outermost first. */
const EDGE = [0.5, 0.75];
/** A dot and the gap after it, in px (CSS: --dot and --dot-gap in site.css). */
const PITCH = 17;

export function PhoneDots({
  count,
  active,
  running,
  done,
  duration,
  stamp,
  label,
  names,
  onSelect,
  onDone,
}: {
  count: number;
  /** Index of the current dot */
  active: number;
  /** The fill is running (it pauses when the phone is off screen) */
  running: boolean;
  /** The last one is reached: the pill stays full and nothing follows */
  done: boolean;
  /** How long the fill takes to cross, in ms */
  duration: number;
  /** Changes whenever the fill should start again from the left */
  stamp: number;
  label: string;
  /** What each dot is called for assistive tech (default: "Show step 3 of 7") */
  names?: string[];
  onSelect: (index: number) => void;
  /** The fill has crossed */
  onDone: () => void;
}) {
  const start = Math.min(Math.max(active - 3, 0), Math.max(0, count - VISIBLE));
  const more = { left: start > 0, right: start + VISIBLE < count };

  return (
    <div
      className="site-loop-dots"
      role="group"
      aria-label={label}
      data-live={running ? "" : undefined}
      style={{ "--dots-ms": `${duration}ms`, "--dots-n": Math.min(count, VISIBLE) } as CSSProperties}
    >
      <div className="site-loop-dots-window">
        <div
          className="site-loop-dots-track"
          style={{ transform: `translateX(${-start * PITCH}px)` }}
        >
          {Array.from({ length: count }, (_, i) => {
            const at = i - start;
            let scale = 1;
            if (more.left && at >= 0 && at < EDGE.length) scale = EDGE[at];
            if (more.right && at < VISIBLE && at >= VISIBLE - EDGE.length)
              scale = EDGE[VISIBLE - 1 - at];
            const on = i === active;
            return (
              <button
                key={i}
                type="button"
                className="site-loop-dot"
                data-active={on ? "" : undefined}
                aria-label={names?.[i] ? `${names[i]}, ${i + 1} of ${count}` : `Show step ${i + 1} of ${count}`}
                aria-current={on ? "true" : undefined}
                onClick={() => onSelect(i)}
              >
                <span
                  className="site-loop-dot-shape"
                  style={{ transform: `scale(${scale})` }}
                >
                  {on ? (
                    <i
                      key={stamp}
                      className="site-loop-dot-fill"
                      data-done={done ? "" : undefined}
                      onAnimationEnd={onDone}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
