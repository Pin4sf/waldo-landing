"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Aside, withHighlights } from "@/components/landing-primitives";
import { IconButton } from "@/components/rail-controls";
import appsAccountsAgents from "@/public/waldo-web-assets/agent-features/apps-accounts-agents.webp";
import contextThread from "@/public/waldo-web-assets/agent-features/context-thread.webp";

const SCROLL_DURATION_MS = 1000;

type AgentVisualAsset = {
  src: StaticImageData;
  alt: string;
  nodeId: string;
};

type AgentSlide = {
  label: string;
  headline: string;
  description: string;
  wide?: boolean;
  aside?: string;
  visual?: ReactNode;
  visualAsset?: AgentVisualAsset;
};

const overnightLog = [
  ["11:14pm", "The Close: day summary delivered"],
  ["11:15pm", "Patrol: quiet hours activated"],
  ["2:00am", "Dreaming Mode: consolidated 14 memories"],
  ["2:01am", 'Promoted pattern: "Tuesday crashes" (3+ occurrences)'],
  ["2:02am", "Pre-computed tomorrow's Brief (2.3 seconds)"],
  ["6:12am", "Patrol: scanned overnight HRV"],
  ["6:14am", "Brief ready. Waiting for your alarm."],
] as const;

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

function easeInOutQuad(progress: number) {
  return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d={direction === "next" ? "M6.5 3.5 10.5 8.5 6.5 13.5" : "M10.5 3.5 6.5 8.5 10.5 13.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DraftsVisual() {
  const drafts = [
    ["Document", "Q3 Engineering Retro", "Based on: Linear tickets, Calendar, team velocity", "Export to Drive"],
    ["Email", "Re: Product strategy review", '"Hey Suyash, We do not care if you received..."', "Send requires your tap"],
    ["Task", "Review deck before Friday", "Priority: High, Due: Thu, Source: Calendar follow-up", "Created in Todoist"],
  ] as const;

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {drafts.map(([type, title, body, action]) => (
        <div key={title} className="rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="type-caption text-[var(--text-tertiary)]">{type}</p>
            <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
          </div>
          <p className="type-label mt-3 text-[var(--ink)]">{title}</p>
          <p className="type-caption tone-secondary mt-2">{body}</p>
          <p className="type-aside tone-tertiary mt-3">{action}</p>
        </div>
      ))}
    </div>
  );
}

function OvernightVisual() {
  return (
    <div className="flex h-full flex-col justify-center rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--zone-peak)]" aria-hidden />
        <p className="type-caption uppercase text-[var(--text-tertiary)]">Overnight patrol</p>
      </div>
      <div className="grid gap-2">
        {overnightLog.map(([time, line]) => (
          <div key={time + line} className="grid grid-cols-[62px_1fr] gap-3 rounded-[10px] bg-[var(--surface-t2)] px-3 py-2">
            <p className="type-data text-[var(--text-tertiary)]">{time}</p>
            <p className="type-caption text-[var(--ink)]">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const slides: AgentSlide[] = [
  {
    label: "Constellation",
    headline: "Every app, account, and agent.",
    description:
      "Waldo connects the accounts, calendars, inboxes, documents, deployment tools, and specialist agents around one human context. Work, personal, and team surfaces resolve into one day, not four competing versions of it.",
    wide: true,
    aside: "one orbit around the day.",
    visualAsset: {
      src: appsAccountsAgents,
      alt: "Waldo connecting apps, accounts, and agents around one central context graph.",
      nodeId: "agent-apps-accounts",
    },
  },
  {
    label: "Context thread",
    headline: "Ask why. Waldo carries the context.",
    description:
      "Waldo keeps the thread attached to the body data underneath it. Sleep, recovery, circadian timing, and the follow-up question stay in one explanation, so an agent can act with context instead of another prompt.",
    wide: true,
    aside: "there when you want the why.",
    visualAsset: {
      src: contextThread,
      alt: "Waldo explaining sleep and recovery context in a conversation thread.",
      nodeId: "agent-context-thread",
    },
  },
  {
    label: "Drafts",
    headline: "Waldo drafts. You approve.",
    description:
      "Emails, documents, tasks, spreadsheet entries. Waldo creates them. You review them. *Emails never auto-send.* Tasks never auto-complete. Some things always need a human.",
    aside: "hands off until your tap.",
    visual: <DraftsVisual />,
  },
  {
    label: "Overnight",
    headline: "Waldo works while you sleep.",
    description:
      "At 2am, Waldo dreams. It consolidates what it learned, finds patterns, and pre-builds your morning. *By the time your alarm goes off, it is already done.* Other agents wait for your prompt. Waldo's prompt is your pulse - updated every 15 minutes, running even at 2am.",
    aside: "start a task. take a nap. come back to it handled.",
    visual: <OvernightVisual />,
  },
];

export function AgentFeaturesSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const offsetsRef = useRef<number[]>([]);
  const animationRef = useRef<number | null>(null);
  const scrollSnapTypeRef = useRef<string | null>(null);
  const scrollDebounceRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const measureOffsets = () => {
    const firstOffset = itemRefs.current[0]?.offsetLeft ?? 0;
    offsetsRef.current = itemRefs.current.map((item) => Math.max(0, (item?.offsetLeft ?? firstOffset) - firstOffset));
  };

  useEffect(() => {
    measureOffsets();
    window.addEventListener("resize", measureOffsets);
    return () => window.removeEventListener("resize", measureOffsets);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);
      if (scrollDebounceRef.current) window.clearTimeout(scrollDebounceRef.current);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const setActiveValue = (index: number) => {
    activeRef.current = index;
    setActive(index);
  };

  const finishAnimation = () => {
    const viewport = viewportRef.current;
    if (viewport && scrollSnapTypeRef.current !== null) {
      viewport.style.scrollSnapType = scrollSnapTypeRef.current;
      scrollSnapTypeRef.current = null;
    }
    animationRef.current = null;
  };

  const animateTo = (index: number) => {
    const viewport = viewportRef.current;
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const to = offsetsRef.current[nextIndex] ?? 0;
    setActiveValue(nextIndex);

    if (!viewport) return;
    if (animationRef.current !== null) window.cancelAnimationFrame(animationRef.current);

    const from = viewport.scrollLeft;
    const distance = to - from;

    if (reducedMotion || Math.abs(distance) < 1) {
      viewport.scrollLeft = to;
      return;
    }

    let startTime: number | null = null;
    scrollSnapTypeRef.current = viewport.style.scrollSnapType || window.getComputedStyle(viewport).scrollSnapType;
    viewport.style.scrollSnapType = "none";

    const step = (now: number) => {
      startTime ??= now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / SCROLL_DURATION_MS);
      viewport.scrollLeft = from + distance * easeInOutQuad(progress);

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(step);
        return;
      }

      viewport.scrollLeft = to;
      finishAnimation();
    };

    animationRef.current = window.requestAnimationFrame(step);
  };

  const updateActiveFromScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nearest = offsetsRef.current.reduce(
      (best, offset, index) => {
        const distance = Math.abs(viewport.scrollLeft - offset);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: active, distance: Number.POSITIVE_INFINITY },
    ).index;

    if (nearest !== active) setActiveValue(nearest);
  };

  const handleScroll = () => {
    if (scrollDebounceRef.current) window.clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = window.setTimeout(updateActiveFromScroll, 200);
  };

  return (
    <section ref={sectionRef} id="agent-features" className="waldo-agent-gallery relative z-20 isolate min-h-[100svh] w-screen max-w-none scroll-mt-0 overflow-hidden bg-[var(--surface-t3)] pt-32 pb-8 lg:pt-36 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[var(--surface-t3)] lg:h-56" />
      <div className="px-[var(--agent-side-padding)]" data-animate="blur-fade">
        <p className="type-eyebrow mb-4 text-[var(--text-tertiary)]">Apps, accounts, agents</p>
        <h2 className="type-h1 max-w-[760px] text-[var(--ink)]" data-animate="headline">
          Every app, account, and agent.
        </h2>
        <p className="type-body tone-secondary mt-5 max-w-[620px]">
          Agents can act. Waldo tells them what kind of day the human is having.
        </p>
      </div>

      <div
        ref={viewportRef}
        data-animate="stagger"
        data-stagger="0.08"
        className="mt-12 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "var(--agent-side-padding)" }}
        aria-label="Agent features gallery"
        onScroll={handleScroll}
      >
        <ul
          role="list"
          className="grid w-fit grid-flow-col gap-[var(--agent-card-gap)] px-[var(--agent-side-padding)]"
        >
          {slides.map((slide, index) => (
            <li
              key={slide.label}
              data-stagger-item
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className={`${slide.wide ? "w-[var(--agent-wide-card-width)]" : "w-[var(--agent-card-width)]"} scroll-ml-0 snap-start`}
              aria-current={active === index}
            >
              <article className="h-full">
                <div
                  className={`${slide.visualAsset ? "waldo-agent-media-card border-transparent bg-transparent p-0" : "h-[var(--agent-card-height)] border-[var(--border-default)] bg-[var(--surface-t2)] p-4"} overflow-hidden rounded-[24px] border`}
                >
                  {slide.visualAsset ? (
                    <div
                      key={slide.visualAsset.nodeId}
                      className="waldo-agent-visual-shell waldo-agent-visual-shell--frame relative flex h-full items-center justify-center overflow-hidden rounded-[24px] bg-[var(--surface-t1)]"
                      data-node-id={slide.visualAsset.nodeId}
                    >
                      <Image
                        src={slide.visualAsset.src}
                        alt={slide.visualAsset.alt}
                        sizes={slide.wide ? "(min-width: 1024px) 764px, 92vw" : "(min-width: 1024px) 372px, 82vw"}
                        className="waldo-agent-frame-image h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    slide.visual
                  )}
                </div>
                <div className="mt-[var(--agent-card-block-top)] px-[var(--agent-card-block-inline)]">
                  <h3 className="type-h2 text-[var(--ink)]">{slide.headline}</h3>
                  <p className="type-body tone-secondary mt-4">{withHighlights(slide.description)}</p>
                  {slide.aside ? <Aside className="mt-4">{slide.aside}</Aside> : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-end px-[var(--agent-side-padding)] max-[480px]:justify-center">
        <div className="flex items-center gap-3">
          <div
            className="waldo-carousel-controls flex h-14 w-[200px] items-center justify-center gap-3 rounded-full bg-[var(--surface-t2)] px-4 sm:w-[216px] sm:gap-4"
            aria-label="Agent feature progress"
          >
            {slides.map((slide, index) => {
              const fillWidth = index <= active ? 1 : 0;

              return (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  className="focusable-ring flex h-11 w-6 items-center justify-center rounded-full"
                  onClick={() => animateTo(index)}
                >
                  <span
                    className="relative block h-2 shrink-0 overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)] transition-[width,background-color] duration-[250ms] ease-[var(--ease-premium)]"
                    style={{
                      width: index === active ? "var(--active-dot-width)" : "8px",
                      boxShadow: "var(--bar-track-inset)",
                    }}
                  >
                    <span
                      className="absolute inset-y-0 left-0 rounded-[var(--bar-radius)] bg-[var(--bar-fill-ink)]"
                      style={{ width: `${fillWidth * 100}%` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <IconButton aria-label="Previous agent feature" disabled={active === 0} onClick={() => animateTo(active - 1)}>
            <ArrowIcon direction="prev" />
          </IconButton>
          <IconButton
            aria-label="Next agent feature"
            disabled={active === slides.length - 1}
            onClick={() => animateTo(active + 1)}
          >
            <ArrowIcon direction="next" />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
