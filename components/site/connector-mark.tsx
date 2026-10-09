"use client";

import { type RefObject, useEffect, useState } from "react";

import { logoOf } from "./connector-tools";
import "./connectors.css";

/** A tool's mark: its logo, or its first letter on a soft tile when there's no logo yet */
export function ToolMark({ name, size = 20 }: { name: string; size?: number }) {
  const src = logoOf(name);
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="cn-mark" src={src} alt="" width={size} height={size} draggable={false} />;
  }
  return (
    <span className="cn-mark cn-mark--letter" style={{ width: size, height: size, fontSize: size * 0.5 }} aria-hidden="true">
      {name[0]}
    </span>
  );
}

/** Waldo's own picture, as his notifications show it */
export function WaldoFace({ size = 22 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="cn-waldo" src="/assets/home/mascots/waldo-card.svg" alt="" width={size} height={Math.round(size * 0.78)} draggable={false} />;
}

/** True once the element has scrolled into view (and stays true), so a picture plays from its start when seen */
export function useSeen(root: RefObject<HTMLElement | null>, margin = "0px 0px -12% 0px") {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el || seen) return;
    const eye = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          eye.disconnect();
        }
      },
      { rootMargin: margin },
    );
    eye.observe(el);
    return () => eye.disconnect();
  }, [root, margin, seen]);
  return seen;
}

/**
 * Before and after, in turn, while a picture is live (use-live.ts): the tool as it was, then what Waldo did in it.
 * At rest (not live, or less motion) it shows the after, so a still picture still tells the whole story.
 */
export function useBeforeAfter(live: boolean, beforeMs = 1600, afterMs = 4600) {
  const [after, setAfter] = useState(true);
  useEffect(() => {
    if (!live) return;
    let on = true;
    let timer = window.setTimeout(function flip() {
      on = !on;
      setAfter(on);
      timer = window.setTimeout(flip, on ? afterMs : beforeMs);
    }, 500);
    return () => {
      window.clearTimeout(timer);
      setAfter(true);
    };
  }, [live, beforeMs, afterMs]);
  return after;
}
