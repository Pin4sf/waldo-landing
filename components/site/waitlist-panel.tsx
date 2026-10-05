"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { submitEmail } from "@/actions/submit-email";
import { ArrowLabel, revealDelay } from "@/components/site/blocks";
import { titleFit } from "@/lib/title-fit";
import { readUtmParams } from "@/lib/utm";
import { isValidEmail } from "@/lib/validate-email";

// Copy: docs/website/pages/waitlist.md ("Live copy" at the top). One calm column: default → error → success.
// The headline rises in on load, and again whenever the state changes. A wrong email nudges the form.

type Variant = "default" | "kennel";
type ErrorKind = "invalid" | "disposable" | "server";

const KENNEL_REPO = "https://github.com/waldoco/Waldo-Kennel";

const ERRORS: Record<ErrorKind, { lines: string[]; body: string }> = {
  invalid: { lines: ["That email", "looks off."], body: "Check for a typo and try again. We'll wait." },
  disposable: {
    lines: ["We need an inbox", "you’ll check."],
    body: "Throwaway addresses can't get the invite. Your real one's safe with us.",
  },
  server: { lines: ["That one’s", "on us."], body: "It didn't go through on our end. Give it a minute and try again." },
};

// Waldo above each state, from the older build's mascots. Calm on the way in, pleased once you're
// on the list, and alert (never upset) when something needs fixing.
function Mascot({ src }: { src: string }) {
  return <Image className="site-mascot site-rv" style={revealDelay(0)} src={src} alt="" width={96} height={72} unoptimized />;
}

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
      return;
    }
    fail(result.error === "disposable_email" ? "disposable" : result.error === "invalid_email" ? "invalid" : "server");
  }

  if (joined) {
    return (
      <div className="site-header-block" data-reveal="now">
        <Mascot src="/illustrations/success.svg" />
        <h1 className="site-heading" style={titleFit(["Already on it."])}>
          <span className="site-rv" style={revealDelay(0)}>
            Already on it.
          </span>
        </h1>
        <p className="site-text site-rv" style={revealDelay(1)}>
          You&apos;re on the list. We&apos;ll write to <strong>{joined}</strong> when it&apos;s your turn. Check your inbox
          for a note from us, and your promotions tab, just in case.
        </p>
        <div className="site-body site-rv" style={revealDelay(4.5)}>
          <p className="site-label">While you wait</p>
          <ul className="site-list">
            <li>
              <Link className="site-link" href="/how-it-works">
                <ArrowLabel label="See how Waldo works →" />
              </Link>
            </li>
            <li>
              <Link className="site-link" href="/kennel">
                <ArrowLabel label="Try Kennel for Mac, in open beta →" />
              </Link>
            </li>
            <li>
              <Link className="site-link" href="/blogs">
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
      ? ["Get the Mac app", "first."]
      : ["The line is short.", "For now."];
  const showList = !error && variant !== "kennel";
  const formDelay = revealDelay(heading.length + (showList ? 3 : 2) + 1.5);

  return (
    <div className="site-header-block" data-reveal={changed ? "now" : "load"}>
      {/* Keyed on the state, so the headline rises again when it changes. The form below keeps what was typed. */}
      <div key={error ?? "default"}>
        <Mascot src={error ? "/assets/home/mascots/watching-dark-mode.svg" : "/assets/home/mascots/good-week-dark-mode.svg"} />
        <p className="site-label site-rv" style={revealDelay(0)}>
          Let Waldo in
        </p>
        <h1 className="site-heading" style={titleFit(heading)}>
          {heading.map((line, index) => (
            <span key={line} className="site-rv" style={revealDelay(index + 1)}>
              {line}
            </span>
          ))}
        </h1>

        {error ? (
          <p className="site-text site-rv" style={revealDelay(heading.length + 1)}>
            {ERRORS[error].body}
          </p>
        ) : variant === "kennel" ? (
          <p className="site-text site-rv" style={revealDelay(heading.length + 1)}>
            Kennel is in open beta on GitHub today. Join the list, and you&apos;ll get the packaged Mac app the day it
            ships.
          </p>
        ) : (
          <>
            <p className="site-text site-rv" style={revealDelay(heading.length + 1)}>
              Waldo is letting people in a few at a time. Leave your email, and you&apos;ll hear the moment it&apos;s
              your turn.
            </p>
            <ul className="site-list site-rv" style={{ marginTop: 32, ...revealDelay(heading.length + 2) }}>
              <li>First access to Waldo for iPhone</li>
              <li>The Kennel for Mac app when it ships (it&apos;s in open beta now)</li>
              <li>A note when something ships. Nothing else.</li>
            </ul>
          </>
        )}
      </div>

      <div className={changed ? undefined : "site-rv"} style={changed ? undefined : formDelay}>
        <form
          className="site-form"
          style={{ marginTop: 48 }}
          onSubmit={handleSubmit}
          noValidate
          data-bounce={bounce ? "" : undefined}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setBounce(false);
          }}
        >
          <input
            className="site-input"
            name="email"
            type="email"
            placeholder="enter your email — the one you actually check"
            aria-label="Your email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            disabled={pending}
          />
          <button type="submit" className="site-button site-button--primary" disabled={pending}>
            {pending ? "Sending…" : error ? "Try again" : <ArrowLabel label="Let Waldo in →" />}
          </button>
        </form>

        <p className="site-text" style={{ marginTop: 24 }}>
          About time.
        </p>

        {variant === "kennel" && !error ? (
          <p className="site-note">
            Can&apos;t wait?{" "}
            <a href={KENNEL_REPO} target="_blank" rel="noreferrer">
              Try the beta now →
            </a>
          </p>
        ) : null}

        <p className="site-note">
          One email when you&apos;re in, and the odd update. Unsubscribe anytime. By joining, you agree to our{" "}
          <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
