"use client";

import Image from "next/image";
import { useRef } from "react";

import { useLive } from "./use-live";

// The pictures for How it works' "Done before you're up" (docs/website/site-wide-pass.md): each of Waldo's
// moments in a day as what you'd actually see, his message arriving on the lock screen at that time. The words
// in the message are the page's own (they were the "What it looks like" column of the table this replaced).
// The card is the lock screen, edge to edge, no phone frame. Moves with CSS alone (site-pages.css, "lock"): the
// message comes up, stays long enough to read, goes, and comes again. Only the card in the middle of the row
// plays (use-live.ts); the others rest with the message showing.

export function LockMoment({
  day,
  time,
  title,
  text,
  evening = false,
}: {
  day: string;
  time: string;
  /** The notification's title: the name of what Waldo did */
  title: string;
  text: string;
  /** Dark lock screen, for the evening */
  evening?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  return (
    <div className="lock" ref={root} data-live={live ? "" : undefined} data-tone={evening ? "evening" : undefined}>
      <p className="lock-date">{day}</p>
      <p className="lock-time">{time}</p>
      <div className="lock-stack">
        <div className="lock-note">
          <span className="lock-icon">
            <Image src="/logodots.svg" alt="" width={23} height={20} unoptimized />
          </span>
          <div className="lock-text">
            <p className="lock-head">
              <b>{title}</b>
              <span>now</span>
            </p>
            <p className="lock-body">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
