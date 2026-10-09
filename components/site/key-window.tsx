"use client";

import { useEffect, useRef, useState } from "react";

import { ToolMark, WaldoFace } from "./connector-mark";
import { useLive } from "./use-live";

// Connectors, "Connect anything. Disconnect anytime." (docs/website/pages/connectors.md): the four promises (same
// words as before) beside one window, Waldo's own list of connections. Each promise lights the part of the window it
// is about: the ask before a tool connects, the switch that lets Waldo change things, the access you can review,
// and the button that disconnects. Point at or pick a promise to see it; while nobody does, they take turns, but
// only while this is the picture nearest the middle of the window (use-live.ts). Replaces the four separate cards.

const PROMISES = [
  { strong: "You approve every tool.", text: "Nothing connects on its own." },
  { strong: "Read only, unless you say so.", text: "Each tool shows whether Waldo can change anything there." },
  { strong: "Review access first.", text: "Email access depends on the permissions you grant. App data details are under review." },
  { strong: "One tap to disconnect.", text: "What Waldo learned from that tool goes with it." },
];

const TURN_MS = 3600;

export function KeyWindow() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [at, setAt] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!live || held) return;
    const timer = window.setInterval(() => setAt((i) => (i + 1) % PROMISES.length), TURN_MS);
    return () => window.clearInterval(timer);
  }, [live, held]);

  return (
    <div className="kw" ref={root} onMouseLeave={() => setHeld(false)}>
      <ol className="kw-list">
        {PROMISES.map((promise, index) => (
          <li key={promise.strong}>
            <button
              type="button"
              aria-pressed={index === at}
              onMouseEnter={() => {
                setHeld(true);
                setAt(index);
              }}
              onFocus={() => setAt(index)}
              onClick={() => {
                setHeld(true);
                setAt(index);
              }}
            >
              <span className="kw-num">{index + 1}</span>
              <span>
                <strong>{promise.strong}</strong> {promise.text}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="kw-win" data-at={at} aria-hidden="true">
        <p className="kw-bar">
          <span className="kw-lights">
            <i />
            <i />
            <i />
          </span>
          <WaldoFace size={18} />
          <b>Connections</b>
        </p>

        <div className="kw-body">
          {/* 1 · Asked first */}
          <div className="kw-row" data-lit={at === 0 ? "" : undefined}>
            <ToolMark name="Oura" size={22} />
            <span className="kw-name">
              <b>Oura</b>
              <small>Not connected</small>
            </span>
            <span className="kw-btn">Connect</span>
            <div className="kw-ask">
              <p>
                <b>Connect Oura?</b> Waldo would see your sleep and readiness. Nothing else.
              </p>
              <p className="kw-ask-actions">
                <span className="kw-btn kw-btn--quiet">Not now</span>
                <span className="kw-btn kw-btn--go">Allow</span>
              </p>
            </div>
          </div>

          {/* 2 · Read only, unless you say so */}
          <div className="kw-row" data-lit={at === 1 ? "" : undefined}>
            <ToolMark name="Google Calendar" size={22} />
            <span className="kw-name">
              <b>Google Calendar</b>
              <small>Connected</small>
            </span>
            <span className="kw-tag">{at === 1 ? "Read and change" : "Read only"}</span>
            <div className="kw-more">
              <p>
                See events <i className="kc-switch" data-on="" />
              </p>
              <p>
                Move events <i className="kc-switch" data-on={at === 1 ? "" : undefined} />
              </p>
            </div>
          </div>

          {/* 3 · Review access */}
          <div className="kw-row" data-lit={at === 2 ? "" : undefined}>
            <ToolMark name="Gmail" size={22} />
            <span className="kw-name">
              <b>Gmail</b>
              <small>Connected</small>
            </span>
            <span className="kw-tag">As you granted</span>
            <div className="kw-more">
              <p>
                Access <em>The permissions you chose</em>
              </p>
              <p>
                Changes <em>Batches and flags</em>
              </p>
            </div>
          </div>

          {/* 4 · Disconnect */}
          <div className="kw-row" data-lit={at === 3 ? "" : undefined} data-off={at === 3 ? "" : undefined}>
            <ToolMark name="Google Tasks" size={22} />
            <span className="kw-name">
              <b>Google Tasks</b>
              <small>{at === 3 ? "Disconnected" : "Connected"}</small>
            </span>
            <span className="kw-btn kw-btn--off">{at === 3 ? "Gone" : "Disconnect"}</span>
            <div className="kw-more">
              <p className="kw-gone">What Waldo learned from it goes too.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
