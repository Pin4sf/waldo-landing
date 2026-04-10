"use client";

import { useEffect, useRef, useState } from "react";

type WaitlistState = "default" | "error" | "success";

type WaitlistContent = {
  cardClassName: string;
  illustrationClassName: string;
  illustrationSrc: string;
  illustrationAlt: string;
  headline: string[];
  body: string;
  closer?: string;
  placeholder?: string;
  buttonLabel?: string;
  formWidthClassName?: string;
  bodyWidthClassName: string;
  textBlockGapClassName: string;
};

const NAV_ITEMS = [
  {
    label: "Features",
    tooltip: "not yet. but waldo already knows you clicked this.",
  },
  {
    label: "Pricing",
    tooltip: "free to find out. when we're ready.",
  },
  {
    label: "Blog",
    tooltip: "waldo's been busy. so have we.",
  },
  {
    label: "Sign in",
    tooltip: "you're early. that's actually a good sign.",
  },
] as const;

const WAITLIST_CONTENT: Record<WaitlistState, WaitlistContent> = {
  default: {
    cardClassName:
      "w-full max-w-[523px] gap-[32px] px-[40px] py-[40px] lg:max-w-[829px] lg:gap-[50px] lg:px-[80px] lg:py-[80px]",
    illustrationClassName:
      "h-[83px] w-[107px] lg:h-[131px] lg:w-[169px]",
    illustrationSrc: "/assets/dalmatian-default.svg",
    illustrationAlt: "Waldo dalmatian illustration in default state",
    headline: ["Something's off."],
    body: "ChatGPT knows your tasks, your calendar knows your time, neither knows you slept three hours.",
    closer: "turns out someone should.",
    placeholder: "enter your email - the one you actually check",
    buttonLabel: "About time.",
    formWidthClassName: "w-full max-w-[315px] lg:max-w-[426px]",
    bodyWidthClassName: "max-w-[421px] lg:max-w-[669px]",
    textBlockGapClassName: "gap-[18px] lg:gap-[30px]",
  },
  error: {
    cardClassName:
      "w-full max-w-[489px] gap-[32px] px-[40px] py-[40px] lg:max-w-[775px] lg:gap-[50px] lg:px-[80px] lg:py-[80px]",
    illustrationClassName:
      "h-[86px] w-[100px] lg:h-[136px] lg:w-[159px]",
    illustrationSrc: "/assets/dalmatian-error.svg",
    illustrationAlt: "Waldo dalmatian illustration in error state",
    headline: ["That email", "doesn't exist."],
    body: "Waldo reads HRV, sleep debt, and circadian cycles. But typos are somehow still on you.",
    placeholder: "enter your email - the one you actually check",
    buttonLabel: "Retry",
    formWidthClassName: "w-full max-w-[315px] lg:max-w-[426px]",
    bodyWidthClassName: "max-w-[388px] lg:max-w-[615px]",
    textBlockGapClassName: "gap-[18px] lg:gap-[30px]",
  },
  success: {
    cardClassName:
      "w-full max-w-[447px] gap-[32px] px-[40px] py-[40px] lg:max-w-[709px] lg:gap-[50px] lg:px-[80px] lg:py-[80px]",
    illustrationClassName:
      "h-[73px] w-[99px] lg:h-[115px] lg:w-[157px]",
    illustrationSrc: "/assets/dalmatian-success.svg",
    illustrationAlt: "Waldo dalmatian illustration in success state",
    headline: ["Already on it."],
    body: `You're now ahead of everyone who thinks they're just "not a morning person."`,
    closer: "now is the time you get some sleep",
    bodyWidthClassName: "max-w-[346px] lg:max-w-[549px]",
    textBlockGapClassName: "gap-[18px] lg:gap-[40px]",
  },
};

const LOGO_SRC = "/assets/waldo-logo.svg";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const FADE_MS = 300;
const FADE_HALF_MS = FADE_MS / 2;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <circle
        cx="7"
        cy="7"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.37"
      />
      <line
        x1="11.1"
        y1="11.1"
        x2="14.5"
        y2="14.5"
        stroke="currentColor"
        strokeWidth="1.37"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <line
        x1="2"
        y1="8"
        x2="13"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="9.5,4 13.5,8 9.5,12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function TooltipLink({
  label,
  tooltip,
}: {
  label: string;
  tooltip: string;
}) {
  return (
    <div className="group relative flex h-full shrink-0 items-center justify-center rounded-full px-[12px] lg:px-[20px]">
      <button
        type="button"
        aria-disabled="true"
        className="waldo-nav-label font-waldo-body shrink-0 cursor-default font-medium leading-[1.3] text-[var(--waldo-nav)]"
      >
        {label}
      </button>
      <span className="pointer-events-none absolute left-1/2 top-[calc(100%+12px)] z-10 w-max max-w-[180px] -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:max-w-none">
        <span className="font-waldo-body text-center text-[13px] italic leading-[1.3] text-[var(--waldo-tooltip)]">
          {tooltip}
        </span>
      </span>
    </div>
  );
}

function WaitlistCard({
  state,
  value,
  onChange,
  onSubmit,
}: {
  state: WaitlistState;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const content = WAITLIST_CONTENT[state];

  return (
    <section
      className={`flex flex-col items-center justify-center rounded-[30px] border-[1.2px] border-[var(--waldo-border)] bg-[var(--waldo-surface)] text-center shadow-none transition-[max-width] duration-300 ${content.cardClassName}`}
    >
      <img
        src={content.illustrationSrc}
        alt={content.illustrationAlt}
        className={`${content.illustrationClassName} shrink-0`}
      />

      <h1 className="font-waldo-heading text-[44px] leading-[1.1] text-[var(--waldo-ink)] lg:text-[80px]">
        {content.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>

      <div
        className={`flex flex-col items-center ${content.textBlockGapClassName}`}
      >
        <p
          className={`font-waldo-heading text-[18px] leading-[1.1] text-[var(--waldo-ink)] lg:text-[28px] ${content.bodyWidthClassName}`}
        >
          {content.body}
        </p>
        {content.closer ? (
          <p className="font-waldo-body text-[12px] italic leading-[1.3] text-[var(--waldo-muted)] lg:text-[18px]">
            {content.closer}
          </p>
        ) : null}
      </div>

      {content.buttonLabel && content.placeholder ? (
        <form
          className={`flex flex-col items-center gap-[13px] lg:gap-[20px] ${content.formWidthClassName}`}
          onSubmit={onSubmit}
          noValidate
        >
          <label className="sr-only" htmlFor="waitlist-email">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={content.placeholder}
            className="waldo-input font-waldo-body w-full rounded-[16px] border border-[var(--waldo-border)] bg-white leading-[1.3] text-[var(--waldo-ink)] outline-none placeholder:text-[var(--waldo-placeholder)] focus:border-[rgba(26,26,26,0.18)]"
          />
          <button
            type="submit"
            className="font-waldo-heading inline-flex h-[39px] items-center justify-center gap-[10px] rounded-[12px] border border-[var(--waldo-border)] bg-[var(--waldo-ink)] px-[23px] text-[12px] leading-[1.3] text-[var(--waldo-surface)] lg:h-[60px] lg:gap-[18px] lg:px-[36px] lg:text-[18px]"
          >
            <SearchIcon className="hidden lg:block" />
            <span>{content.buttonLabel}</span>
            <ArrowRightIcon className="hidden lg:block" />
          </button>
        </form>
      ) : null}
    </section>
  );
}

export function WaldoWaitlist() {
  const [draftEmail, setDraftEmail] = useState("");
  const [renderedState, setRenderedState] = useState<WaitlistState>("default");
  const [fadedOut, setFadedOut] = useState(false);
  const nextStateRef = useRef<WaitlistState>("default");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const transitionTo = (nextState: WaitlistState) => {
    if (nextState === renderedState) {
      return;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    nextStateRef.current = nextState;
    setFadedOut(true);

    timeoutRef.current = window.setTimeout(() => {
      setRenderedState(nextStateRef.current);
      setFadedOut(false);
      timeoutRef.current = null;
    }, FADE_HALF_MS);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = draftEmail.trim();
    const nextState = EMAIL_PATTERN.test(normalizedEmail) ? "success" : "error";

    setDraftEmail("");
    transitionTo(nextState);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--waldo-bg)] px-4 pb-6 pt-5 lg:px-6 lg:pb-8 lg:pt-5">
      <nav className="mx-auto flex h-[44px] w-full max-w-[611px] items-center justify-between rounded-[50px] border border-[var(--waldo-border)] bg-[var(--waldo-surface)] px-[5px] lg:h-[54px]">
        <div className="flex h-full items-center">
          <img
            src={LOGO_SRC}
            alt="Waldo"
            className="h-[31px] w-auto lg:h-[44px]"
          />
        </div>
        <div className="flex h-full items-center gap-[4px] pr-[4px] lg:gap-[6px] lg:pr-0">
          {NAV_ITEMS.map((item) => (
            <TooltipLink
              key={item.label}
              label={item.label}
              tooltip={item.tooltip}
            />
          ))}
        </div>
      </nav>

      <div className="flex flex-1 items-center justify-center">
        <div
          className={`transition-opacity duration-[150ms] ${fadedOut ? "opacity-0" : "opacity-100"}`}
        >
          <WaitlistCard
            state={renderedState}
            value={draftEmail}
            onChange={setDraftEmail}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  );
}
