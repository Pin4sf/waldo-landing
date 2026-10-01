"use client";

import { type ReactNode, useId, useRef, useState } from "react";

import { titleFit } from "@/lib/title-fit";

import { Status, Visual } from "./blocks";

// Smaller features, after Linear's "Features" row: a label, then the names in two columns, each
// with a "+". Clicking one slides a panel in from the right with the detail (label, title, the
// one-line summary in dark medium text, then body text, an optional picture, and its status).
//
// The panel is a native <dialog>, so focus, Escape and the page behind it are handled by the
// browser. Its motion (and the backdrop's) lives in site.css.

export type Feature = {
  name: string;
  /** The one line that says what it is. Shown first in the panel, in dark medium text. */
  line: string;
  /** A few sentences of detail. One paragraph each. */
  detail: ReactNode[];
  status?: "today" | "next" | "planned";
  image?: string;
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
  const titleId = useId();
  // Keeps the last feature after closing, so the panel still has its content while it slides out
  const [active, setActive] = useState(0);
  const feature = features[active];
  const lines = titleLines(feature.name);

  function open(index: number) {
    setActive(index);
    dialog.current?.showModal();
  }

  return (
    <div className="site-features">
      <p className="site-label">{label}</p>
      <ul className="site-features-list" data-appear="stagger">
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
          <div className="site-sheet-body site-header-block">
            <h2 id={titleId} className="site-heading" style={titleFit(lines)}>
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="site-text">
              <strong>{feature.line}</strong>
            </p>
            {feature.detail.map((paragraph, index) => (
              <p key={index} className="site-text">
                {paragraph}
              </p>
            ))}
            {feature.status ? (
              <p className="site-sheet-status">
                <Status value={feature.status} />
              </p>
            ) : null}
            {feature.image ? <Visual wide label={feature.name} src={feature.image} /> : null}
          </div>
        </div>
      </dialog>
    </div>
  );
}
