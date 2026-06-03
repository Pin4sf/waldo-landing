"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { Aside } from "@/components/landing-primitives";

const AUTO_MS = 7000;
const PAUSE_AFTER_INTERACTION_MS = 9000;

type VisualKind = "morning" | "stress" | "patterns" | "long-game";
type HealthTone = "sleep" | "heart" | "stress" | "recovery" | "motion";

type FeatureSlide = {
  kind: "feature";
  tab: string;
  headline: string;
  description: string;
  aside: string;
  visual: VisualKind;
  badge?: string;
};

type HealthSlide = {
  kind: "health";
  tab: string;
  intro: string;
  cards: Array<{
    tone: HealthTone;
    headline: string;
    body: string;
  }>;
};

type ShowcaseSlide = FeatureSlide | HealthSlide;

const slides: ShowcaseSlide[] = [
  {
    kind: "feature",
    tab: "Mornings",
    headline: "Wake up to what changed.",
    description:
      "Every morning, one message. Not another screen. Not a chart. Not four apps open before your coffee. Waldo tells you what last night meant for today, and what it already did about it.",
    aside: "mornings, sorted.",
    visual: "morning",
  },
  {
    kind: "feature",
    tab: "Stress",
    headline: "Your stress, handled.",
    description:
      "When your stress climbs past a threshold and stays there, Waldo intervenes. Pulls low-priority meetings. Blocks recovery time. Adds a cooldown so it does not nag.",
    aside: "you didn't ask. you didn't need to.",
    visual: "stress",
  },
  {
    kind: "feature",
    tab: "Patterns",
    headline: "See what you're too close to see.",
    description:
      "Waldo scans your signals throughout the day. Most of the time, nothing happens. But when it notices a pattern across days, weeks, or months, it tells you. Small observations that compound into a pattern you can act on.",
    aside: "about seventy scans a day. you never notice.",
    visual: "patterns",
  },
  {
    kind: "health",
    tab: "Your health",
    intro:
      "Your watch tracks 15+ health signals. Other apps show you all of them. Waldo reads all of them and acts on the ones that matter today.",
    cards: [
      {
        tone: "sleep",
        headline: "Sleep like you mean it.",
        body: "Track stages, duration, debt, and bedtime consistency. When sleep runs short, Waldo adjusts tomorrow before you wake up.",
      },
      {
        tone: "heart",
        headline: "Stay close to your heart.",
        body: "HRV trends, resting heart rate, baseline tracking. Waldo flags when your numbers drop below your baseline, then changes the day around it.",
      },
      {
        tone: "stress",
        headline: "Your stress, in real time.",
        body: "Not a chart you check later. Real-time stress confidence triggers The Fetch when it climbs too high. Waldo catches it before you feel it.",
      },
      {
        tone: "recovery",
        headline: "Recovery is not a number.",
        body: "Sleep, HRV, and resting state combine into one score. The score is not the point; what Waldo does with it is.",
      },
      {
        tone: "motion",
        headline: "Motion with meaning.",
        body: "Steps, exercise, VO2 Max, active energy. Waldo identifies post-exercise recovery windows and protects them in your calendar.",
      },
    ],
  },
  {
    kind: "feature",
    tab: "Long game",
    badge: "Coming soon",
    headline: "The longer it runs, the more Waldo learns.",
    description:
      "Six weeks of Tuesdays and Thursdays looked ordinary, until they did not. The fact that your worst sleep always follows your heaviest meeting days. You were too close to see it. Waldo wasn't.",
    aside: "patterns you can't see from the inside.",
    visual: "long-game",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M6.5 4.25v9.5M11.5 4.25v9.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M6.75 4.7v8.6l6.2-4.3-6.2-4.3Z" fill="currentColor" />
    </svg>
  );
}

function HealthIcon({ tone }: { tone: HealthTone }) {
  const common = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (tone === "sleep") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M16.5 14.5A7 7 0 0 1 7.5 5.5 7.5 7.5 0 1 0 16.5 14.5Z" {...common} />
      </svg>
    );
  }

  if (tone === "heart") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 18s-6.5-3.8-6.5-8.4A3.6 3.6 0 0 1 11 7.4a3.6 3.6 0 0 1 6.5 2.2C17.5 14.2 11 18 11 18Z" {...common} />
      </svg>
    );
  }

  if (tone === "stress") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M11 3.5v6l4 2.5M5.5 17.5a8 8 0 1 0 11-11" {...common} />
      </svg>
    );
  }

  if (tone === "recovery") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path d="M17 7.5A6.5 6.5 0 1 0 18 12M18 4.5v4h-4" {...common} />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M12.5 3.5 5.5 12h5L9.5 18.5l7-8.5h-5l1-6.5Z" {...common} />
    </svg>
  );
}

function MockupShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4 shadow-[var(--shadow-card)] sm:min-h-[360px] sm:p-5 lg:min-h-[430px]">
      <div className="absolute inset-x-8 bottom-[-56px] h-28 rounded-[999px] bg-[var(--surface-t3)] blur-2xl" aria-hidden />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function PhonePlaceholder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto h-[330px] w-[174px] rounded-[34px] border-[7px] border-[var(--ink)] bg-[var(--dark-t3)] p-3 shadow-[var(--shadow-floating)] sm:h-[390px] sm:w-[206px] ${className}`}
    >
      <div className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-[var(--dark-t4)]" />
      <div className="mt-8 flex h-[calc(100%-2rem)] flex-col gap-3 overflow-hidden rounded-[20px] bg-[var(--dark-t2)] p-3 text-[var(--surface-t2)]">
        {children}
      </div>
    </div>
  );
}

function VisualPlaceholder({ kind }: { kind: VisualKind }) {
  if (kind === "stress") {
    return (
      <MockupShell>
        <div className="grid h-full gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-center gap-3">
            {["Investor call stays", "Low-priority sync moved", "Recovery block protected"].map((item, index) => (
              <div key={item} className="rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
                <p className="type-label text-[var(--ink)]">{item}</p>
                <p className="type-aside mt-1">handled quietly.</p>
                <div className="mt-3 h-2 rounded-full bg-[var(--surface-t4)]">
                  <div className="h-full rounded-full bg-[var(--action)]" style={{ width: `${76 - index * 16}%` }} />
                </div>
              </div>
            ))}
          </div>
          <PhonePlaceholder className="lg:translate-y-5">
            <p className="type-caption text-[var(--text-tertiary)]">stress read</p>
            <div className="mt-2 rounded-[18px] border border-[var(--border-dark)] bg-[var(--dark-t1)] p-4">
              <p className="type-h3 text-[var(--surface-t2)]">Fetch</p>
              <Aside className="mt-2">afternoon protected.</Aside>
            </div>
            <div className="mt-auto grid gap-2">
              <div className="h-12 rounded-[14px] bg-[var(--dark-t1)]" />
              <div className="h-12 rounded-[14px] bg-[var(--dark-t1)]" />
            </div>
          </PhonePlaceholder>
        </div>
      </MockupShell>
    );
  }

  if (kind === "patterns") {
    return (
      <MockupShell>
        <div className="relative h-full min-h-[360px]">
          {["heavy meeting day", "late bedtime", "low recovery", "quiet Friday", "better window"].map((label, index) => (
            <div
              key={label}
              className="absolute rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] px-4 py-3 shadow-[var(--shadow-card)]"
              style={{
                left: `${12 + (index % 3) * 28}%`,
                top: `${18 + Math.floor(index / 3) * 38 + (index % 2) * 8}%`,
              }}
            >
              <p className="type-caption text-[var(--text-secondary)]">{label}</p>
            </div>
          ))}
          <svg className="absolute inset-0 h-full w-full text-[var(--border-focus)]" viewBox="0 0 560 360" fill="none" aria-hidden>
            <path d="M112 116 C180 90 250 190 315 146 C360 116 416 170 452 252" stroke="currentColor" strokeWidth="2" strokeDasharray="7 8" />
            <path d="M198 260 C230 202 300 220 356 120" stroke="currentColor" strokeWidth="2" strokeDasharray="7 8" />
          </svg>
          <div className="absolute bottom-5 left-5 right-5 rounded-[20px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-5 shadow-[var(--shadow-card)]">
            <p className="type-label text-[var(--ink)]">Pattern found</p>
            <p className="type-body mt-2 text-[var(--text-secondary)]">Your worst sleep follows the heaviest meeting days.</p>
          </div>
        </div>
      </MockupShell>
    );
  }

  if (kind === "long-game") {
    return (
      <MockupShell>
        <div className="flex h-full min-h-[360px] flex-col justify-between">
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-[10px] border border-[var(--border-default)] bg-[var(--surface-t2)]"
                style={{ opacity: index % 7 === 0 || index % 11 === 0 ? 1 : 0.45 }}
              />
            ))}
          </div>
          <div className="rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-5 shadow-[var(--shadow-card)]">
            <p className="type-label text-[var(--ink)]">The Tuesday Crash</p>
            <p className="type-body mt-2 text-[var(--text-secondary)]">A weekly dip, caught before it becomes the week.</p>
          </div>
        </div>
      </MockupShell>
    );
  }

  return (
    <MockupShell>
      <div className="grid h-full gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <PhonePlaceholder className="lg:-rotate-2 lg:translate-y-5">
          <p className="type-caption text-[var(--text-tertiary)]">morning brief</p>
          <div className="rounded-[18px] border border-[var(--border-dark)] bg-[var(--dark-t1)] p-4">
            <p className="type-body text-[var(--surface-t2)]">Rough night. Your morning moved. Lunch stays clear.</p>
            <Aside className="mt-3">already moved.</Aside>
          </div>
          <div className="mt-auto space-y-2">
            <div className="h-10 rounded-[14px] bg-[var(--dark-t1)]" />
            <div className="h-10 rounded-[14px] bg-[var(--dark-t1)]" />
            <div className="h-10 rounded-[14px] bg-[var(--dark-t1)]" />
          </div>
        </PhonePlaceholder>
        <div className="flex flex-col justify-center gap-3">
          {["Calendar softened", "Focus held", "Sleep debt noticed"].map((item) => (
            <div key={item} className="rounded-[18px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-4 shadow-[var(--shadow-card)]">
              <p className="type-label text-[var(--ink)]">{item}</p>
              <p className="type-aside mt-1">one less thing to decide.</p>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

function HealthCard({ tone, headline, body }: HealthSlide["cards"][number]) {
  return (
    <article className="flex min-h-[190px] flex-col justify-between rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--surface-t2)] text-[var(--ink)]">
        <HealthIcon tone={tone} />
      </div>
      <div className="mt-5">
        <h4 className="type-h3 text-[var(--ink)]">{headline}</h4>
        <p className="type-caption mt-3 text-[var(--text-secondary)]">{body}</p>
      </div>
    </article>
  );
}

function FeatureContent({ slide }: { slide: FeatureSlide }) {
  return (
    <div className="grid h-full gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
      <div className="flex flex-col justify-center p-2 sm:p-4 lg:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="type-eyebrow text-[var(--text-tertiary)]">{slide.tab}</p>
          {slide.badge ? (
            <span className="type-caption rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] px-3 py-1 text-[var(--text-secondary)]">
              {slide.badge}
            </span>
          ) : null}
        </div>
        <h3 className="type-h2 text-[var(--ink)]">{slide.headline}</h3>
        <p className="type-body mt-5 max-w-[48ch] text-[var(--text-secondary)]">{slide.description}</p>
        <Aside className="mt-5">{slide.aside}</Aside>
      </div>
      <VisualPlaceholder kind={slide.visual} />
    </div>
  );
}

function HealthContent({ slide }: { slide: HealthSlide }) {
  return (
    <div className="grid h-full gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
      <div className="p-2 sm:p-4 lg:p-6">
        <p className="type-eyebrow mb-5 text-[var(--text-tertiary)]">{slide.tab}</p>
        <h3 className="type-h2 text-[var(--ink)]">Your health, read in context.</h3>
        <p className="type-body mt-5 max-w-[46ch] text-[var(--text-secondary)]">{slide.intro}</p>
        <Aside className="mt-5">the signal is only useful when it moves something.</Aside>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slide.cards.map((card) => (
          <HealthCard key={card.headline} {...card} />
        ))}
      </div>
    </div>
  );
}

export function AlreadyDoneSection() {
  const reducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [manualPauseUntil, setManualPauseUntil] = useState(0);

  const shouldAutoPlay = playing && !reducedMotion;

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (!shouldAutoPlay) return;

    const timer = window.setInterval(() => {
      if (Date.now() < manualPauseUntil) return;
      scrollToSlide((active + 1) % slides.length);
    }, AUTO_MS);

    return () => window.clearInterval(timer);
  }, [active, manualPauseUntil, shouldAutoPlay]);

  const activeSlide = slides[active];
  const activeLabel = activeSlide.tab;

  const scrollToSlide = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const nextIndex = (index + slides.length) % slides.length;
    const card = track?.children[nextIndex] as HTMLElement | undefined;

    setActive(nextIndex);
    if (!track || !card) return;

    const left = card.offsetLeft - Math.max(0, (track.clientWidth - card.clientWidth) / 2);
    track.scrollTo({ left, behavior: reducedMotion ? "auto" : behavior });
  };

  const goTo = (index: number) => {
    setManualPauseUntil(Date.now() + PAUSE_AFTER_INTERACTION_MS);
    scrollToSlide(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);

      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });

    setActive(nearest);
  };

  return (
    <section id="already-handled" className="section-shell scroll-mt-28 overflow-hidden py-10 lg:py-14">
      <div className="mb-8 flex flex-col gap-6 px-1 sm:px-2 lg:mb-10">
        <div>
          <p className="type-eyebrow mb-4 text-[var(--text-tertiary)]">Health features</p>
          <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
            This is what your day
            <br />
            looks like with Waldo.
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:gap-5 sm:px-6 lg:-mx-10 lg:gap-6 lg:px-10 [&::-webkit-scrollbar]:hidden"
        aria-live="polite"
        aria-label={`Showing ${activeLabel}`}
        onScroll={handleScroll}
        onPointerDown={() => setManualPauseUntil(Date.now() + PAUSE_AFTER_INTERACTION_MS)}
        onTouchStart={() => setManualPauseUntil(Date.now() + PAUSE_AFTER_INTERACTION_MS)}
      >
        {slides.map((slide, index) => (
          <article
            key={slide.tab}
            id={`health-feature-card-${index}`}
            aria-label={slide.tab}
            className="min-h-[690px] w-[calc(100%-56px)] max-w-[980px] shrink-0 snap-center rounded-[34px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-5 shadow-[var(--shadow-card)] transition-[opacity,transform] duration-300 ease-[var(--ease-premium)] sm:min-h-[650px] sm:p-7 lg:min-h-[620px] lg:p-8"
            style={{ opacity: active === index ? 1 : 0.52, transform: active === index ? "scale(1)" : "scale(0.965)" }}
          >
            {slide.kind === "feature" ? <FeatureContent slide={slide} /> : <HealthContent slide={slide} />}
          </article>
        ))}
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="flex items-center gap-2 rounded-full bg-[var(--surface-t4)] p-2">
          {slides.map((slide, index) => (
            <button
              key={slide.tab}
              type="button"
              aria-label={`Show ${slide.tab}`}
              className={`focusable-ring relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-premium)] ${
                active === index ? "w-16 bg-[var(--border-focus)]" : "w-2 bg-[var(--border-focus)]"
              }`}
              onClick={() => goTo(index)}
            >
              {active === index ? (
                <span
                  key={`${active}-${playing ? "playing" : "paused"}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--ink)]"
                  style={{
                    animation: shouldAutoPlay ? `section-four-progress ${AUTO_MS}ms linear both` : "none",
                    width: shouldAutoPlay ? undefined : "100%",
                  }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="focusable-ring flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-t4)] text-[var(--ink)] transition-[background-color,transform] duration-200 hover:bg-[var(--surface-t2)] active:scale-[0.97]"
          aria-label={playing ? "Pause carousel" : "Play carousel"}
          onClick={() => {
            setPlaying((current) => !current);
            setManualPauseUntil(0);
          }}
        >
          <PlayPauseIcon playing={playing && !reducedMotion} />
        </button>
      </div>
    </section>
  );
}
