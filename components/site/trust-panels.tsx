"use client";

import Link from "next/link";
import { type CSSProperties, type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";

import "./trust-panels.css";

// "Your context. Your call.": four pictures for the Trust carousel, all drawn with one mini-panel
// (docs/website/trust-carousel-review.md). Each panel has a short label and a state, two to four rows,
// and one control that only reveals more detail here: nothing in it connects to a service, sends,
// approves or removes anything. The words are limited to what the product code (the Waldo repo's
// oauth-google, sync-gmail, execute-proposal, invoke-agent and llm-provider functions) actually does;
// what it can't back up is listed in the review notes, not written into the panel.
//
// The panels move the way the five-card section's screens do: the rows rise in turn (phone.css,
// see-rise), a bar fills (see-fill), bubbles pop (see-pop). They play once, when the panel first
// comes into view; with less motion nothing moves. Sizes are in units of 1/480 of the frame's width,
// like the other carousel pictures, with a floor on the text so it stays readable on a phone.

const at = (n: number) => ({ "--i": n }) as CSSProperties;

function Icon({ name }: { name: string }) {
  return <span className="tp-icon" style={{ "--icon": `url(/assets/home/icons/${name}.svg)` } as CSSProperties} aria-hidden="true" />;
}

function Logo({ name }: { name: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="tp-logo" src={`/assets/connectors/${name}.svg`} alt="" aria-hidden="true" />;
}

/** The panel's frame: plays its arrival once, when it first comes into view */
function Frame({ children, tone }: { children: ReactNode; tone: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    el.setAttribute("data-armed", "");
    const watch = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.setAttribute("data-seen", "");
        watch.disconnect();
      },
      { threshold: 0.45 },
    );
    watch.observe(el);
    return () => watch.disconnect();
  }, []);
  return (
    <div className="tp" ref={root} data-tone={tone}>
      {children}
    </div>
  );
}

type Row = { key: string; label: string; value: ReactNode };

/**
  The shared panel. `control` is a button that opens `detail` below it (aria-expanded, one at a time per
  panel), or, with `href`, a plain link.
*/
function Panel({
  label,
  state,
  dot,
  who,
  rows,
  control,
  detail,
  href,
}: {
  label: string;
  state: string;
  dot: "green" | "orange" | "grey";
  who?: ReactNode;
  rows: Row[];
  control: string;
  detail?: ReactNode;
  href?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const control_ = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  let n = 0;
  const show = () => {
    setOpen(true);
    // the sheet is inert until it is open, so focus moves once it can take it
    window.setTimeout(() => close.current?.focus({ preventScroll: true }), 60);
  };
  const hide = () => {
    setOpen(false);
    control_.current?.focus({ preventScroll: true });
  };
  const keys = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    hide();
  };
  return (
    <div className="tp-panel" data-sheet={open ? "" : undefined}>
      <div className="tp-head tp-in" style={at(n++)}>
        <span className="tp-label">{label}</span>
        <span className="tp-state" data-dot={dot}>
          <i aria-hidden="true" />
          {state}
        </span>
      </div>
      {who ? <div className="tp-who tp-in" style={at(n++)}>{who}</div> : null}
      <dl className="tp-rows">
        {rows.map((row) => (
          <div key={row.key} className="tp-row tp-in" style={at(n++)}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="tp-in" style={at(n++)}>
        {href ? (
          <Link className="tp-control" href={href}>
            {control}
            <Icon name="chevron" />
          </Link>
        ) : (
          <button ref={control_} type="button" className="tp-control" aria-expanded={open} aria-controls={id} onClick={open ? hide : show}>
            {control}
            <Icon name="chevron" />
          </button>
        )}
      </div>
      {detail ? (
        <div className="tp-sheet" id={id} role="region" aria-label={control} data-open={open ? "" : undefined} inert={!open} onKeyDown={keys}>
          <div className="tp-sheet-top">
            <b>{control}</b>
            <button ref={close} type="button" className="tp-close" aria-label="Close" onClick={hide}>
              <Icon name="close" />
            </button>
          </div>
          {detail}
        </div>
      ) : null}
    </div>
  );
}

/** Card 1: what he can see */
export function AccessPanel() {
  return (
    <Frame tone="access">
      <Panel
        label="Connection"
        state="Connected"
        dot="green"
        who={
          <>
            <span className="tp-logos" aria-hidden="true">
              <Logo name="google-calendar" />
              <Logo name="gmail" />
            </span>
            <span className="tp-who-text">
              <b>Google</b>
              <small>m•••••@gmail.com</small>
            </span>
          </>
        }
        rows={[
          {
            key: "read",
            label: "Can read",
            value: (
              <ul className="tp-scopes">
                {[
                  ["Calendar", "calendar.readonly"],
                  ["Gmail", "gmail.readonly"],
                  ["Tasks", "tasks.readonly"],
                ].map(([name, scope]) => (
                  <li key={scope}>
                    <b>{name}</b>
                    <code>{scope}</code>
                  </li>
                ))}
              </ul>
            ),
          },
          { key: "change", label: "Can change", value: "Nothing. Editing is a separate permission." },
        ]}
        control="How to take access back"
        detail={
          <ol className="tp-steps">
            <li>In your Google Account, open Security, then your connections to third-party apps and services. Choose Waldo, then Remove access.</li>
            <li>Gmail access is read-only. Waldo reads when messages arrive and their labels, not subjects or text.</li>
            <li>Removing access stops new reads. What Waldo already saved is a separate step.</li>
          </ol>
        }
      />
    </Frame>
  );
}

/** Card 2: what he can do */
export function PermissionPanel() {
  return (
    <Frame tone="permission">
      <Panel
        label="Permission request"
        state="Waiting for you"
        dot="orange"
        rows={[
          {
            key: "action",
            label: "Action",
            value: (
              <>
                <b>Move Design review to Thursday, 11:00</b>
                <small>Google Calendar · one event</small>
              </>
            ),
          },
          {
            key: "limit",
            label: "Limit",
            value: (
              <>
                Needs your yes. Expires after 4 hours.
                <span className="tp-bar tp-fill" style={at(5)} aria-hidden="true">
                  <i />
                </span>
              </>
            ),
          },
          { key: "held", label: "Still held", value: "Northstar reply · prepared, not sent" },
        ]}
        control="Review the change"
        detail={
          <dl className="tp-diff">
            <div>
              <dt>Now</dt>
              <dd>Design review, today 15:00</dd>
            </div>
            <div>
              <dt>Proposed</dt>
              <dd>Design review, Thursday 11:00</dd>
            </div>
            <p>Nothing changes until you approve. You can approve or reject it.</p>
          </dl>
        }
      />
    </Frame>
  );
}

/** Card 3: what he remembers */
export function MemoryPanel() {
  return (
    <Frame tone="memory">
      <Panel
        label="Saved note"
        state="Written by Waldo"
        dot="grey"
        rows={[
          { key: "note", label: "Note", value: <b>Keeps mornings for focus work.</b> },
          { key: "kind", label: "Kind", value: "Preference · updated Tue 13 Oct" },
          { key: "use", label: "Used as", value: "Background when he plans your day or replies. Not an instruction from you." },
        ]}
        control="How to correct it"
        detail={
          <div className="tp-chat">
            <p className="tp-bubble tp-bubble--you tp-pop" style={at(0)}>Mornings are only for focus on Tuesdays and Thursdays.</p>
            <p className="tp-bubble tp-bubble--waldo tp-pop" style={at(1)}>Got it. I&rsquo;ll save that over the old note.</p>
          </div>
        }
      />
    </Frame>
  );
}

/** Card 4: where his data goes */
export function DataPanel() {
  const services: { key: string; logo: string; name: string; text: string }[] = [
    { key: "supabase", logo: "supabase", name: "Supabase", text: "Stores your account, readings, calendar and message timing, notes and chats." },
    { key: "anthropic", logo: "claude", name: "Anthropic", text: "Writes Waldo’s replies from the context each message needs." },
    { key: "telegram", logo: "telegram", name: "Telegram", text: "Carries his messages, if you chat there." },
  ];
  return (
    <Frame tone="data">
      <Panel
        label="Where it goes"
        state="Policy in draft"
        dot="grey"
        rows={[
          {
            key: "services",
            label: "Services",
            value: (
              <ul className="tp-services">
                {services.map((s) => (
                  <li key={s.key}>
                    <Logo name={s.logo} />
                    <span>
                      <b>{s.name}</b>
                      {s.text}
                    </span>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
        control="Read the Privacy page"
        href="/privacy"
      />
    </Frame>
  );
}
