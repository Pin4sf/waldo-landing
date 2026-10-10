"use client";

import Link from "next/link";
import { type KeyboardEvent, type ReactNode, useId, useLayoutEffect, useRef, useState } from "react";

import "./hats-tabs.css";

// "Same Waldo. Different hats." as one picture at a time, after "Right where you need it" on
// chatgpt.com/features/dots (2026-10-10): a row of pills over one big frame, and the name and one line
// under it. Picking a pill swaps the scene in the frame (it starts again from its first exchange) and
// slides the pill's highlight across. After the last pill, "More" goes to every job on the Connectors
// page ("Pick your job."), to say these five aren't the only ones.
//
// Only the chosen scene is mounted, so use-live.ts has one picture to play. The frame itself stays
// put; only what is inside it fades in, so the white box never blinks.

export type Hat = {
  /** The pill's label */
  tab: string;
  /** The name under the frame */
  title: string;
  /** What the picture shows, for anyone who can't see it */
  visual: string;
  scene: ReactNode;
  children: ReactNode;
};

export function HatsTabs({ hats, label, more }: { hats: Hat[]; label: string; more?: { label: string; href: string } }) {
  const [at, setAt] = useState(0);
  const id = useId();
  const row = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const hat = hats[at];

  // The highlight sits under the chosen pill, and slides to the next one (no slide on the first paint)
  useLayoutEffect(() => {
    const tab = tabs.current[at];
    const el = pill.current;
    if (!tab || !el) return;
    const place = () => {
      el.style.width = `${tab.offsetWidth}px`;
      el.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    place();
    requestAnimationFrame(() => el.setAttribute("data-ready", ""));
    // keep the chosen pill in view when the row is wider than a phone
    const list = row.current;
    if (list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
    }
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [at]);

  const pick = (i: number) => {
    if (i !== at) setAt(i);
  };

  // Arrow keys move between pills (and pick them), Home and End go to the ends
  const keys = (event: KeyboardEvent) => {
    const last = hats.length - 1;
    const next =
      event.key === "ArrowRight" ? (at === last ? 0 : at + 1)
      : event.key === "ArrowLeft" ? (at === 0 ? last : at - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    pick(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="hats-tabs">
      <div className="hats-tabs-row" ref={row}>
        <div className="hats-tabs-list" role="tablist" aria-label={label} onKeyDown={keys}>
          <span className="hats-tabs-pill" ref={pill} aria-hidden="true" />
          {hats.map((h, i) => (
            <button
              key={h.tab}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === at}
              aria-controls={`${id}-panel`}
              tabIndex={i === at ? 0 : -1}
              className="hats-tabs-tab"
              onClick={() => pick(i)}
            >
              {h.tab}
            </button>
          ))}
        </div>
        {more ? (
          <Link href={more.href} className="hats-tabs-tab hats-tabs-more">
            {more.label}
            <svg width="7" height="11" viewBox="0 0 9 14" fill="none" aria-hidden="true">
              <path d="M1.5 1.5L7 7l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : null}
      </div>

      <div className="hats-tabs-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${at}`}>
        <div className="hats-tabs-stage">
          <div className="site-visual site-visual--image site-visual--plain site-visual--scene hats-tabs-frame" data-visual={hat.visual}>
            <div key={at} className="hats-tabs-scene" role="img" aria-label={hat.visual}>
              {hat.scene}
            </div>
          </div>
        </div>

        <div key={at} className="hats-tabs-caption">
          <h3>{hat.title}</h3>
          <p>{hat.children}</p>
        </div>
      </div>
    </div>
  );
}
