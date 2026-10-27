"use client";

import type { CSSProperties, ReactNode } from "react";

import { Header } from "./blocks";
import { type Feature, useFeatureSheet } from "./feature-sheet";

import "./coming-close.css";

// How it works, the close (2026-10-12). Was two sections: "New tricks, coming soon." with four names in a list,
// then "Now you know. Let it work." in its own box. Now one section, no box: the close's title and button, then
// the four planned features as cards, each a small thread showing the feature at work. A card
// opens the same side panel the list did (feature-sheet.tsx), so nothing from the old list is lost.

type Row = {
  from: "waldo" | "you";
  who?: string;
  react?: string;
  children: ReactNode;
};

/** A run of messages in a card. Same shapes as the Day thread (day-moments.tsx), smaller. */
function Thread({ stamp, rows }: { stamp: string; rows: Row[] }) {
  return (
    <span className="cc-thread" aria-hidden="true">
      <span className="cc-stamp">{stamp}</span>
      {rows.map((row, index) => (
        <span
          key={index}
          className="cc-row"
          data-from={row.from}
          data-react={row.react ? "" : undefined}
          style={{ "--n": index } as CSSProperties}
        >
          {row.who ? <span className="cc-who">{row.who}</span> : null}
          <span className="cc-msg">
            {row.children}
            {row.react ? <span className="cc-react">{row.react}</span> : null}
          </span>
        </span>
      ))}
    </span>
  );
}

const BARS = [3, 5, 8, 6, 9, 7, 4, 6, 8, 5, 3, 6, 9, 7, 5, 4, 6, 3];

function Voice({ length, bars = BARS.length }: { length: string; bars?: number }) {
  return (
    <span className="cc-voice">
      <svg viewBox="0 0 10 12" width="9" height="11">
        <path d="M1 1l8 5-8 5z" fill="currentColor" />
      </svg>
      <span className="cc-bars">
        {BARS.slice(0, bars).map((h, n) => (
          <i key={n} style={{ height: `${h * 10}%`, "--b": n } as CSSProperties} />
        ))}
      </span>
      <small>{length}</small>
    </span>
  );
}

// Each card's line: shorter than the panel's, so it stays within two lines at every width
const SCENES: Record<string, { blurb: string; stamp: string; rows: Row[] }> = {
  Voice: {
    blurb: "Ask out loud on the go, and hear your Brief read back to you.",
    stamp: "Tue 7:12 AM",
    rows: [
      { from: "you", children: <Voice length="0:04" bars={12} /> },
      {
        from: "waldo",
        children: <span className="cc-p">Here’s your Brief.</span>,
      },
      { from: "waldo", children: <Voice length="0:48" /> },
    ],
  },
  "Your own routines": {
    blurb: "Write a weekly request once. Waldo runs it on schedule.",
    stamp: "Sun 6:00 PM",
    rows: [
      {
        from: "you",
        children: <span className="cc-p">Every Sunday evening, tell me how next week looks.</span>,
      },
      {
        from: "waldo",
        react: "👍",
        children: (
          <span className="cc-p">
            Done. <b>Sundays, 6 PM</b>, until you change it.
          </span>
        ),
      },
    ],
  },
  "Tomorrow, today": {
    blurb: "See how tomorrow will feel the night before, and move things.",
    stamp: "Mon 9:40 PM",
    rows: [
      {
        from: "waldo",
        children: <span className="cc-p">Tomorrow looks heavy. Short night likely.</span>,
      },
      {
        from: "waldo",
        children: (
          <>
            <span className="cc-p">Move the 8:00 review to 11:00?</span>
            <span className="cc-choices">
              <span data-on="">Move it</span>
              <span>Keep</span>
            </span>
          </>
        ),
      },
    ],
  },
  "Other agents ask Waldo": {
    blurb: "Your other agents check how you’re doing before they book.",
    stamp: "Wed 4:15 PM",
    rows: [
      {
        from: "you",
        who: "Your scheduling agent",
        children: <span className="cc-p">Is 8am tomorrow a good time?</span>,
      },
      {
        from: "waldo",
        children: <span className="cc-p">Short night likely. After 10:30 works better.</span>,
      },
    ],
  },
};

export function ComingClose({
  lines,
  body,
  action,
  features,
}: {
  lines: string[];
  body: ReactNode;
  action: { label: string; href: string };
  features: Feature[];
}) {
  const { open, sheet } = useFeatureSheet("What’s coming", features);

  return (
    <div className="cc">
      <Header lines={lines} body={body} actions={{ primary: action }} center />

      <ul className="cc-cards" data-appear="stagger">
        {features.map((feature, index) => {
          const scene = SCENES[feature.name];
          return (
            <li key={feature.name}>
              <button type="button" className="cc-card" aria-haspopup="dialog" onClick={() => open(index)}>
                <span className="cc-card-head">
                  <span className="cc-card-name">{feature.name}</span>
                  <svg className="cc-card-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="cc-card-line">{scene?.blurb ?? feature.line}</span>
                {scene ? (
                  <span className="cc-scene">
                    <Thread {...scene} />
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      {sheet}
    </div>
  );
}
