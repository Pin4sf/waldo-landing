"use client";

import { type CSSProperties, type ReactNode, useId, useRef, useState } from "react";

import { titleFit } from "@/lib/title-fit";

import { Status } from "./blocks";
import { Wire, type WireName } from "./feature-wires";

// Smaller features, after Linear's "Features" row: a label on the left, the names in two columns on the
// right, each with a "+". Clicking one slides a panel in from the right, laid out like Linear's sheets: the
// title, its status, the one line that says what it does for you (dark, medium), a few sentences on how,
// a wireframe of where it shows up with a caption, then a short "how it helps" table.
//
// The panel is a native <dialog>, so focus, Escape and the page behind it are handled by the
// browser. Its motion (and the backdrop's) lives in site.css; the wireframes in feature-wires.tsx.

export type Feature = {
  name: string;
  /** What it does for you, in one line. Shown first in the panel, in dark medium text. */
  line: string;
  /** How it does it, and why that helps. One paragraph each. */
  detail: ReactNode[];
  status?: "today" | "next" | "planned";
  /** The wireframe (feature-wires.tsx), and the line under it, which also describes it to screen readers */
  wire?: { name: WireName; caption: string };
  /** A short table: a heading, its two column names, then rows of [first column, second column] */
  helps?: { heading: string; columns: [string, string]; rows: [string, string][] };
};

/** Long names go over two lines (at a comma, or the space nearest the middle), so the title stays large. */
function titleLines(name: string) {
  if (name.length <= 16) return [name];
  const comma = name.indexOf(", ");
  if (comma > 0) return [name.slice(0, comma + 1), name.slice(comma + 2)];
  const spaces = [...name.matchAll(/ /g)].map((match) => match.index ?? 0);
  const middle = spaces.reduce((best, index) => (Math.abs(index - name.length / 2) < Math.abs(best - name.length / 2) ? index : best));
  return [name.slice(0, middle), name.slice(middle + 1)];
}

export function FeatureList({ label = "Also", section, features }: { label?: string; section: string; features: Feature[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Keeps the last feature after closing, so the panel still has its content while it slides out
  const [active, setActive] = useState(0);
  const feature = features[active];
  const lines = titleLines(feature.name);

  function open(index: number) {
    setActive(index);
    // Each feature starts at the top, even if the last one was scrolled
    body.current?.scrollTo({ top: 0 });
    dialog.current?.showModal();
  }

  return (
    <div className="site-features">
      <p className="site-label">{label}</p>
      {/* Read down the first column, then the second (as Linear's list does) */}
      <ul className="site-features-list" data-appear="stagger" style={{ "--rows": Math.ceil(features.length / 2) } as CSSProperties}>
        {features.map((item, index) => (
          <li key={item.name}>
            <button type="button" className="site-feature-button" aria-haspopup="dialog" onClick={() => open(index)}>
              {item.name}
              <span className="site-feature-plus" aria-hidden="true">
                +
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="site-sheet"
        aria-labelledby={titleId}
        onClick={(event) => {
          // A click on the dimmed page behind the panel lands on the dialog itself
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="site-sheet-inner">
          <header className="site-sheet-header">
            <p className="site-label">{section}</p>
            <button type="button" className="site-sheet-close" aria-label="Close" onClick={() => dialog.current?.close()}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          <div ref={body} className="site-sheet-body">
            <h2 id={titleId} className="site-heading" style={titleFit(lines)}>
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            {feature.status ? (
              <p className="site-sheet-meta">
                <Status value={feature.status} />
              </p>
            ) : null}
            <p className="site-text">
              <strong>{feature.line}</strong>
            </p>
            {feature.detail.map((paragraph, index) => (
              <p key={index} className="site-text">
                {paragraph}
              </p>
            ))}
            {feature.wire ? (
              <figure className="site-sheet-figure">
                <Wire key={feature.wire.name} name={feature.wire.name} label={feature.wire.caption} />
                <figcaption className="site-label">{feature.wire.caption}</figcaption>
              </figure>
            ) : null}
            {feature.helps ? (
              <section className="site-sheet-facts" aria-label={feature.helps.heading}>
                <p className="site-text">
                  <strong>{feature.helps.heading}</strong>
                </p>
                <table className="site-sheet-table">
                  <thead>
                    <tr>
                      <th scope="col">{feature.helps.columns[0]}</th>
                      <th scope="col">{feature.helps.columns[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feature.helps.rows.map(([first, second]) => (
                      <tr key={first}>
                        <td>{first}</td>
                        <td>{second}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}
          </div>
        </div>
      </dialog>
    </div>
  );
}
