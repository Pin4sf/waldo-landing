"use client";

import Image from "next/image";
import { useRef } from "react";

import { useLive } from "./use-live";

// The first picture under "It does as much as you let it": Waldo's "Tell me" setting, shown as what
// it is: one notification on a quiet Mac. He says what he would do and asks first, once, and then
// leaves you alone. It sits in the carousel's frame, set in units of 1/480 of the frame's width like
// the other pictures, and moves with CSS alone (site.css, "Mac notifications"): it arrives, stays
// long enough to read, goes, and the desktop is quiet for a good while before it comes again. Like
// every moving picture it only plays when it is the one to watch (use-live.ts); otherwise the banner
// just sits there.

export function MacNotifications() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  return (
    <div className="mac" ref={root} data-live={live ? "" : undefined}>
      <div className="mac-bar">
        <time>Wed 9:41</time>
      </div>
      <div className="mac-note">
        <span className="mac-icon">
          <Image
            src="/logodots.svg"
            alt=""
            width={23}
            height={20}
            unoptimized
          />
        </span>
        <div className="mac-text">
          <p className="mac-head">
            <b>Waldo</b>
            <span>now</span>
          </p>
          <p className="mac-body">
            Short night. I&rsquo;d move your 9am to 10:30. Want me to?
          </p>
        </div>
      </div>
    </div>
  );
}
