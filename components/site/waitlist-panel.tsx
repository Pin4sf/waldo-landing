"use client";

import Link from "next/link";
import { useState } from "react";

import { submitEmail } from "@/actions/submit-email";
import { ArrowLabel, revealDelay } from "@/components/site/blocks";
import { waldoSignal } from "@/components/site/waldo-pings";
import { titleFit } from "@/lib/title-fit";
import { readUtmParams } from "@/lib/utm";
import { isValidEmail } from "@/lib/validate-email";

// Copy: docs/website/pages/waitlist.md ("Live copy" at the top). One calm column: default → error → success.
// The headline rises in on load, and again whenever the state changes. A wrong email nudges the form.
// The form is one pill, the box and the button in it (after Soonix). Flat and minimal: no picture above the title,
// no gradients. Waldo's notifications at the top of the page (waldo-pings.tsx) hear when the box is first used
// and when you've joined. The small print stays under the form; everything else is below the phone (page.tsx).

type Variant = "default" | "kennel";
type ErrorKind = "invalid" | "disposable" | "server";

export const WAITLIST_EMAIL_ID = "waitlist-email";

const ERRORS: Record<ErrorKind, { lines: string[]; body: string }> = {
  invalid: { lines: ["That email", "looks off."], body: "Check for a typo and try again. We'll wait." },
  disposable: {
    lines: ["We need an inbox", "you’ll check."],
    body: "Throwaway addresses can't get the invite. Your real one's safe with us.",
  },
  server: { lines: ["That one’s", "on us."], body: "It didn't go through on our end. Give it a minute and try again." },
};

export function WaitlistPanel({ variant }: { variant: Variant }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<ErrorKind | null>(null);
  const [joined, setJoined] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);
  const [bounce, setBounce] = useState(false);

  function fail(kind: ErrorKind) {
    setError(kind);
    setChanged(true);
    setBounce(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!isValidEmail(email)) {
      fail("invalid");
      return;
    }
    for (const [key, value] of Object.entries(readUtmParams())) {
      if (value) data.set(key, value);
    }
    setPending(true);
    const result = await submitEmail(data);
    setPending(false);
    if (result.success) {
      setJoined(email.toLowerCase());
      setError(null);
      waldoSignal("joined");
      return;
    }
    fail(result.error === "disposable_email" ? "disposable" : result.error === "invalid_email" ? "invalid" : "server");
  }

  if (joined) {
    return (
      <div className="site-header-block wl-copy" data-reveal="now">
        <h1 className="site-heading" style={titleFit(["Already on it."])}>
          <span className="site-rv" style={revealDelay(0)}>
            Already on it.
          </span>
        </h1>
        <p className="site-text site-rv" style={revealDelay(1)}>
          You&apos;re on the list. We&apos;ll write to <strong>{joined}</strong> when it&apos;s your turn. Check your inbox
          for a note from us, and your promotions tab, just in case.
        </p>
        <div className="wl-wait site-rv" style={revealDelay(3)}>
          <p className="site-label">While you wait</p>
          <ul>
            <li>
              <Link className="wl-wait-link" href="/how-it-works">
                <ArrowLabel label="See how Waldo works →" />
              </Link>
            </li>
            <li>
              <Link className="wl-wait-link" href="/kennel">
                <ArrowLabel label="Try Kennel for Mac, in open beta →" />
              </Link>
            </li>
            <li>
              <Link className="wl-wait-link" href="/blogs">
                <ArrowLabel label="Read the blog →" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const heading = error
    ? ERRORS[error].lines
    : variant === "kennel"
      ? ["Get the Mac app", "the day it ships."]
      : ["Waldo handles it.", "Get in line early."];
  const formDelay = revealDelay(heading.length + 2);

  return (
    <div className="site-header-block wl-copy" data-reveal={changed ? "now" : "load"}>
      {/* Keyed on the state, so the headline rises again when it changes. The form below keeps what was typed. */}
      <div key={error ?? "default"} className="wl-head">
        <h1 className="site-heading" style={titleFit(heading)}>
          {heading.map((line, index) => (
            <span key={line} className="site-rv" style={revealDelay(index)}>
              {line}
            </span>
          ))}
        </h1>
        {/* The title carries the message on its own; only a problem with the email gets a line under it */}
        {error ? (
          <p className="site-text site-rv" style={revealDelay(heading.length)}>
            {ERRORS[error].body}
          </p>
        ) : null}
      </div>

      <div className={changed ? "wl-act" : "wl-act site-rv"} style={changed ? undefined : formDelay}>
        <form
          className="wl-form"
          onSubmit={handleSubmit}
          noValidate
          data-bounce={bounce ? "" : undefined}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setBounce(false);
          }}
        >
          <input
            id={WAITLIST_EMAIL_ID}
            className="wl-input"
            name="email"
            type="email"
            placeholder="enter your email — the one you actually check"
            aria-label="Your email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            disabled={pending}
            onFocus={() => waldoSignal("focus")}
          />
          <button type="submit" className="site-button site-button--primary wl-submit" disabled={pending}>
            {pending ? "Sending…" : error ? "Try again" : <ArrowLabel label="Let Waldo in →" />}
          </button>
        </form>

        <p className="site-note">
          Your email goes to Loops for waitlist updates. By joining, you request those updates. App terms and privacy details are still under review.{" "}
          <Link href="/privacy">Read the current information</Link>.
        </p>
      </div>
    </div>
  );
}
