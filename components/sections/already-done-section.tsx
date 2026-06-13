"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import edgeCircadianContext from "@/public/figma-assets/waldo-cards/edge-circadian-context.png";
import edgeCooldown from "@/public/figma-assets/waldo-cards/edge-cooldown.png";
import edgeDefaultState from "@/public/figma-assets/waldo-cards/edge-default-state.png";
import edgeFetchMidday from "@/public/figma-assets/waldo-cards/edge-fetch-midday.png";
import edgePhoneStress from "@/public/figma-assets/waldo-cards/edge-phone-stress.png";
import edgeWaldoAction from "@/public/figma-assets/waldo-cards/edge-waldo-action.png";
import morningLockscreenIpad from "@/public/figma-assets/waldo-cards/morning-lockscreen-ipad.png";
import morningOverview from "@/public/figma-assets/waldo-cards/morning-overview.png";
import morningPhoneRestingState from "@/public/figma-assets/waldo-cards/morning-phone-resting-state.png";
import morningPhoneSleepDebt from "@/public/figma-assets/waldo-cards/morning-phone-sleep-debt.png";
import morningSleepStage from "@/public/figma-assets/waldo-cards/morning-sleep-stage.png";
import morningWatchHrv from "@/public/figma-assets/waldo-cards/morning-watch-hrv.png";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const AUTO_DWELL_MS = 6150;
const AUTO_SCROLL_MS = 1000;
const PINNED_SCROLL_QUERY = "(min-width: 1100px) and (min-height: 820px)";
const DRAG_START_THRESHOLD_PX = 8;
const SCROLLBAR_GUTTER_PX = 18;
const INTERACTIVE_CAROUSEL_SELECTOR = [
  "a",
  "button",
  "input",
  "label",
  "select",
  "summary",
  "textarea",
  "[contenteditable='true']",
  "[role='button']",
  "[role='link']",
].join(",");

function appleGalleryEase(progress: number) {
  const x1 = 0.2;
  const y1 = 0;
  const x2 = 0;
  const y2 = 1;
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  let t = progress;

  for (let i = 0; i < 5; i += 1) {
    const x = ((ax * t + bx) * t + cx) * t - progress;
    const dx = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(dx) < 0.0001) break;
    t = Math.max(0, Math.min(1, t - x / dx));
  }

  return ((ay * t + by) * t + cy) * t;
}

type VisualKind = "recovery" | "stress" | "patterns" | "body" | "longGame";
type HealthTone = "sleep" | "heart" | "stress" | "recovery" | "motion";

type HealthCardVisual = {
  image: StaticImageData;
  alt: string;
  nodeId: string;
  shape?: "cluster" | "network" | "phone" | "tablet" | "watch";
  backdrop?: {
    image: StaticImageData;
    alt: string;
    nodeId: string;
    shape?: "cluster" | "network" | "phone" | "tablet" | "watch";
  };
};

type FeaturePanel = {
  label: string;
  title: string;
  body: string;
  tone: HealthTone;
  metric: string;
  visual?: HealthCardVisual;
};

type ShowcaseSlide = {
  tab: string;
  headline: string;
  aside: string;
  visual: VisualKind;
  badge?: string;
  defaultVisual?: HealthCardVisual;
  panels: FeaturePanel[];
};

type CarouselDragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startScrollLeft: number;
  currentScrollLeft: number;
  maxScroll: number;
  isDragging: boolean;
  snapType: string | null;
  previousBodyCursor: string;
  previousBodyUserSelect: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function isInteractiveCarouselTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest(INTERACTIVE_CAROUSEL_SELECTOR));
}

function isScrollbarGutterPointer(event: ReactPointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return false;

  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientY >= rect.bottom - SCROLLBAR_GUTTER_PX;
}

const slides: ShowcaseSlide[] = [
  {
    tab: "Mornings, sorted.",
    headline: "Mornings, sorted.",
    aside: "already on it.",
    visual: "recovery",
    defaultVisual: {
      image: morningOverview,
      alt: "Waldo morning health feature card showing recovery, sleep, and resting-state signals.",
      nodeId: "1309:10627",
      shape: "phone",
    },
    panels: [
      {
        label: "Sleep, stage by stage.",
        title: "Sleep, stage by stage.",
        body:
          "Waldo tracks deep, REM, light, and awake. Duration alone does not tell you much. *Deep sleep in a short night can beat light sleep in a long one.* Waldo knows the difference.",
        tone: "sleep",
        metric: "stages read",
        visual: {
          image: morningSleepStage,
          alt: "Waldo sleep stages card exported from Figma.",
          nodeId: "1315:7427",
          shape: "phone",
        },
      },
      {
        label: "HRV tells the real story.",
        title: "HRV tells the real story.",
        body:
          "Heart rate variability is the closest thing to a readiness signal your body produces. Waldo checks RMSSD against your 7-day baseline. *When it dips, Waldo acts on it.*",
        tone: "heart",
        metric: "baseline checked",
        visual: {
          image: morningWatchHrv,
          alt: "Waldo HRV Apple Watch card exported from Figma.",
          nodeId: "1315:7928",
          shape: "watch",
        },
      },
      {
        label: "Resting state, quietly watched.",
        title: "Resting state, quietly watched.",
        body:
          "Resting heart rate, respiratory rate, wrist temperature, and blood oxygen paint one picture: how recovered your nervous system actually is. *Waldo reads all four every night.*",
        tone: "recovery",
        metric: "4 signals",
        visual: {
          image: morningPhoneRestingState,
          alt: "Waldo resting-state phone card exported from Figma.",
          nodeId: "1305:22308",
          shape: "cluster",
        },
      },
      {
        label: "Sleep debt does not lie.",
        title: "Sleep debt does not lie.",
        body:
          "A 14-day weighted average tracks how much sleep you owe yourself. One bad night is recoverable. Four in a row is a pattern. *Waldo adjusts your week before the crash lands.*",
        tone: "sleep",
        metric: "14-day debt",
        visual: {
          image: morningPhoneSleepDebt,
          alt: "Waldo sleep-debt phone card exported from Figma.",
          nodeId: "1309:7908",
          shape: "phone",
        },
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Recovery at 63 and a 9am meeting? Pushed to 10:30. Recovery at 85? Your calendar stays untouched. *You wake up to the result, not the reasoning.*",
        tone: "recovery",
        metric: "morning moved",
        visual: {
          image: morningLockscreenIpad,
          alt: "Waldo morning lock-screen action card exported from Figma.",
          nodeId: "1309:9685",
          shape: "tablet",
        },
      },
    ],
  },
  {
    tab: "The edge, taken off.",
    headline: "The edge, taken off.",
    aside: "you didn't ask. you didn't need to.",
    visual: "stress",
    defaultVisual: {
      image: edgeDefaultState,
      alt: "Waldo edge default state card showing recovery, resting-state, and health signal context.",
      nodeId: "edge-default-state",
      shape: "network",
    },
    panels: [
      {
        label: "Stress confidence.",
        title: "Stress confidence, not stress score.",
        body:
          "Most apps give you a number. Waldo watches confidence: how certain the signal is that stress is sustained. *When the read is strong enough to trust, Waldo moves.*",
        tone: "stress",
        metric: "confidence rising",
        visual: {
          image: edgePhoneStress,
          alt: "Waldo stress confidence phone card exported from Figma.",
          nodeId: "1309:10094",
          shape: "cluster",
        },
      },
      {
        label: "The Fetch fires mid-day.",
        title: "The Fetch fires mid-day.",
        body:
          "The moment stress sustains above threshold, Waldo pulls low-priority meetings from your afternoon and blocks recovery time. *No prompt asking if you are okay. Just cleared space.*",
        tone: "stress",
        metric: "space cleared",
        visual: {
          image: edgeFetchMidday,
          alt: "Waldo Fetch mid-day stress card exported from Figma.",
          nodeId: "1315:13117",
          shape: "network",
        },
      },
      {
        label: "Cooldown built in.",
        title: "Cooldown built in.",
        body:
          "Dismiss a Fetch and Waldo backs off. It does not nag. It waits, watches, and only fires again if the signal re-escalates after the cooldown. *Quiet by design.*",
        tone: "recovery",
        metric: "cooldown active",
        visual: {
          image: edgeCooldown,
          alt: "Waldo stress cooldown card exported from Figma.",
          nodeId: "1322:7921",
          shape: "network",
          backdrop: {
            image: edgeFetchMidday,
            alt: "Blurred Waldo Fetch mid-day stress context behind the cooldown handoff.",
            nodeId: "1315:13117",
            shape: "network",
          },
        },
      },
      {
        label: "Circadian context matters.",
        title: "Circadian context matters.",
        body:
          "A stress spike in the morning means something different than one after lunch. Waldo checks stress against circadian position and Form before deciding whether to intervene. *Context keeps it from overreacting.*",
        tone: "motion",
        metric: "context checked",
        visual: {
          image: edgeCircadianContext,
          alt: "Waldo circadian stress context card exported from Figma.",
          nodeId: "1322:7682",
          shape: "network",
        },
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Stress climbing and your investor call matters? That stays. The low-priority 4:30? Pulled. *Waldo moves what you would cancel yourself and keeps what you would not.*",
        tone: "stress",
        metric: "meeting pulled",
        visual: {
          image: edgeWaldoAction,
          alt: "Waldo calendar action card showing Form-aware meeting protection.",
          nodeId: "edge-waldo-action",
          shape: "network",
        },
      },
    ],
  },
  {
    tab: "Connecting the Dots",
    headline: "Connecting the Dots",
    aside: "~70 scans a day. you never notice.",
    visual: "patterns",
    panels: [
      {
        label: "The Patrol keeps watch.",
        title: "The Patrol keeps watch.",
        body:
          "Waldo scans your biometric signals against your calendar, tasks, and communication load throughout the day. Most scans find nothing notable. *The useful ones get logged.*",
        tone: "recovery",
        metric: "quiet scan",
      },
      {
        label: "Spots are single observations.",
        title: "Spots are single observations.",
        body:
          "\"Your worst sleep follows your heaviest meeting days.\" One data point. One sentence. Waldo surfaces it when confidence is high enough, not before. *Small, useful, restrained.*",
        tone: "sleep",
        metric: "Spot found",
      },
      {
        label: "Constellations connect dots.",
        title: "Constellations connect the dots.",
        body:
          "Multiple Spots link into a named behavioral pattern. The Tuesday Crash becomes something Waldo can name, track, and act on. *Coming soon.*",
        tone: "heart",
        metric: "pattern named",
      },
      {
        label: "Pre-activity readiness.",
        title: "Pre-activity readiness.",
        body:
          "Before a high-stakes meeting, Waldo checks your Form score, context from last week, attendee list, and duration. *Not a generic reminder. A readiness check grounded in your actual data.*",
        tone: "motion",
        metric: "ready check",
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Patterns are not useful if nothing changes. Tuesday overload causing Wednesday depletion? *Waldo starts protecting Wednesday mornings before the cycle repeats.*",
        tone: "recovery",
        metric: "cycle broken",
      },
    ],
  },
  {
    tab: "Gut Feeling, verified",
    headline: "Gut Feeling, verified",
    aside: "your watch tracks it. Waldo does something with it.",
    visual: "body",
    panels: [
      {
        label: "Sleep that changes tomorrow.",
        title: "Sleep that changes tomorrow.",
        body:
          "Stages, duration, debt, bedtime consistency. The point is not the data. *Short night? Your morning adjusts. Debt accumulating? Your week shifts before the crash.*",
        tone: "sleep",
        metric: "tomorrow adjusted",
      },
      {
        label: "Heart rate that means something.",
        title: "Heart rate that means something.",
        body:
          "HRV trends, resting HR, and baseline tracking are not notifications. A dip below your 7-day average becomes a trigger. *Waldo connects the signal to your calendar.*",
        tone: "heart",
        metric: "HRV read",
      },
      {
        label: "Stress you do not manage.",
        title: "Stress you do not manage.",
        body:
          "Real-time confidence scoring is not a daily summary. It is a live signal that triggers The Fetch when it sustains too long. *Waldo catches it before you feel it.*",
        tone: "stress",
        metric: "Fetch armed",
      },
      {
        label: "Recovery drives the day.",
        title: "Recovery drives the day.",
        body:
          "Sleep, HRV, and resting state combine into one score. The score powers The Brief. The Brief powers your morning. *One signal, end to end.*",
        tone: "recovery",
        metric: "Brief ready",
      },
      {
        label: "Motion with context.",
        title: "Motion with context.",
        body:
          "Steps, exercise, VO2 Max, and active energy are more than counts. *A hard workout at 7am means your 9am needs to be light.*",
        tone: "motion",
        metric: "load softened",
      },
    ],
  },
  {
    tab: "old habits new endings",
    headline: "old habits new endings",
    aside: "patterns you can't see from the inside.",
    visual: "longGame",
    badge: "Coming soon",
    panels: [
      {
        label: "Memory that compounds.",
        title: "Memory that compounds.",
        body:
          "Waldo remembers facts, events, discoveries, preferences, and advice. It does not just remember your HRV. *It remembers what usually causes it to drop.*",
        tone: "heart",
        metric: "memory linked",
      },
      {
        label: "Dreaming Mode.",
        title: "Dreaming Mode.",
        body:
          "At 2am, Waldo consolidates. It promotes patterns, merges related memories, and pre-builds tomorrow's Brief. *By the time you wake up, it already knows what kind of day is waiting.*",
        tone: "sleep",
        metric: "2am pass",
      },
      {
        label: "Corrections sharpen it.",
        title: "Corrections sharpen it.",
        body:
          "Undo a Fetch? Waldo learns. Keep a meeting it tried to move? Noted. *The first week has friction. The third week feels quietly familiar.*",
        tone: "recovery",
        metric: "model tuned",
      },
      {
        label: "The Slope watches trajectory.",
        title: "The Slope watches the trajectory.",
        body:
          "Four weeks of data across recovery, form, demand, meeting load, communication pressure, and task pileup. *When the whole picture declines, Waldo escalates.*",
        tone: "motion",
        metric: "4-week slope",
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "When The Tuesday Crash repeats, Waldo does not just tell you. *It starts protecting Wednesdays, then keeps doing it.*",
        tone: "stress",
        metric: "Wednesday held",
      },
    ],
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

function PlayPauseIcon({ playing, ended }: { playing: boolean; ended: boolean }) {
  if (ended) {
    return (
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden>
        <path d="M15.4 8.8a5.8 5.8 0 1 1-1.8-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M15.5 3.4v4.1h-4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

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

function PanelPill({
  panel,
  index,
}: {
  panel: FeaturePanel;
  index: number;
}) {
  const panelId = `${panel.label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${index}`;
  const panelContentId = `${panelId}-content`;
  const cleanBody = panel.body.replaceAll("*", "");

  return (
    <Accordion.Item value={`${index}`} className="waldo-panel-pill w-full max-w-[440px]">
      <Accordion.Header>
        <Accordion.Trigger
          id={panelId}
          className="waldo-panel-trigger focusable-ring flex w-fit max-w-full items-center gap-3 overflow-hidden rounded-full border border-[var(--border-default)] bg-transparent px-4 py-3 text-left text-[var(--ink)] transition-[max-height,padding,border-color,background-color,opacity,transform] duration-[420ms] ease-[var(--ease-premium)] hover:bg-[var(--surface-t3)] data-[state=open]:max-h-0 data-[state=open]:pointer-events-none data-[state=open]:border-transparent data-[state=open]:py-0 data-[state=open]:opacity-0 data-[state=open]:scale-[0.98] data-[state=closed]:max-h-16 data-[state=closed]:opacity-100 data-[state=closed]:scale-100"
          aria-controls={panelContentId}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] bg-transparent text-[var(--ink)]" aria-hidden>
            <span className="relative h-3 w-3">
              <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 rounded-full bg-current" />
            </span>
          </span>
          <span className="type-label">{panel.title}</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        id={panelContentId}
        className="waldo-panel-content grid overflow-hidden transition-[grid-template-rows,opacity,filter,transform] duration-[520ms] ease-[var(--ease-premium)] data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=closed]:blur-[5px] data-[state=closed]:-translate-y-1.5 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 data-[state=open]:blur-0 data-[state=open]:translate-y-0"
      >
        <div className="overflow-hidden">
          <article className="waldo-panel-card rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t2)] px-5 py-4">
          <p className="type-body text-[var(--text-secondary)]">
            <span className="font-medium text-[var(--ink)]">{panel.title}</span> {cleanBody}
          </p>
          </article>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function HealthFeatureVisualStage({
  slide,
  panel,
  activePanel,
}: {
  slide: ShowcaseSlide;
  panel: FeaturePanel;
  activePanel: number | null;
}) {
  const visual = activePanel === null
    ? slide.defaultVisual ?? panel.visual
    : panel.visual ?? slide.defaultVisual;

  if (!visual) {
    return (
      <div className="waldo-health-visual-stage pointer-events-none relative z-0 flex h-full min-h-[260px] items-end justify-center overflow-hidden md:min-h-[420px] lg:min-h-[300px]">
        <div className="relative mb-[-132px] h-[440px] w-[230px] rounded-[48px] border-[7px] border-[var(--ink)] bg-[var(--surface-t1)] sm:h-[500px] sm:w-[260px] lg:mb-[-150px] lg:h-[700px] lg:w-[366px]">
          <div className="absolute left-8 top-8 type-label text-[var(--ink)]">9:41</div>
          <div className="absolute left-1/2 top-7 h-7 w-28 -translate-x-1/2 rounded-full bg-[var(--ink)]" />
          <Image
            src="/illustrations/default.svg"
            alt=""
            width={112}
            height={112}
            aria-hidden
            draggable={false}
            className="absolute left-1/2 top-[56%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 object-contain lg:h-28 lg:w-28"
          />
        </div>
      </div>
    );
  }

  const isCornerIpadVisual = visual.nodeId === "1309:9685";
  const stageClassName = [
    "waldo-health-visual-stage pointer-events-none relative z-0 flex h-full min-h-[260px] overflow-visible md:min-h-[420px] lg:min-h-[300px]",
    isCornerIpadVisual
      ? "waldo-health-visual-stage--corner-ipad items-end justify-end"
      : "items-center justify-center",
  ].join(" ");

  if (visual.backdrop) {
    return (
      <div className={stageClassName}>
        <div aria-hidden className="waldo-card-visual-glow absolute inset-x-[12%] bottom-[8%] h-[32%] rounded-full bg-[var(--accent-subtle)] blur-3xl" />
        <div
          key={`${visual.nodeId}-${visual.backdrop.nodeId}-${activePanel ?? "default"}`}
          className="waldo-card-visual-shell waldo-card-visual-shell--layered relative"
          data-node-id={visual.nodeId}
          data-visual-shape={visual.shape ?? "cluster"}
          data-visual-composite="blurred-backdrop"
        >
          <Image
            src={visual.backdrop.image}
            alt={visual.backdrop.alt}
            sizes="(min-width: 1024px) 640px, (min-width: 640px) 70vw, 96vw"
            className="waldo-card-visual-layer waldo-card-visual-layer--backdrop select-none"
            loading="eager"
            draggable={false}
            unoptimized
          />
          <Image
            src={visual.image}
            alt={visual.alt}
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 54vw, 86vw"
            className="waldo-card-visual-layer waldo-card-visual-layer--foreground select-none"
            loading="eager"
            draggable={false}
            unoptimized
          />
        </div>
      </div>
    );
  }

  return (
    <div className={stageClassName}>
      <div aria-hidden className="waldo-card-visual-glow absolute inset-x-[12%] bottom-[8%] h-[32%] rounded-full bg-[var(--accent-subtle)] blur-3xl" />
      <div
        key={`${visual.nodeId}-${activePanel ?? "default"}`}
        className="waldo-card-visual-shell relative"
        data-node-id={visual.nodeId}
        data-visual-shape={visual.shape ?? "cluster"}
      >
        <Image
          src={visual.image}
          alt={visual.alt}
          sizes="(min-width: 1024px) 580px, (min-width: 640px) 64vw, 92vw"
          className="waldo-card-visual-image select-none"
          fetchPriority={activePanel === null ? "high" : "auto"}
          loading="eager"
          draggable={false}
          unoptimized
        />
      </div>
    </div>
  );
}

function SlideContent({
  slide,
  openPanel,
  onPanelChange,
}: {
  slide: ShowcaseSlide;
  openPanel: number | null;
  onPanelChange: (panelIndex: number | null) => void;
}) {
  const panel = slide.panels[openPanel ?? 0] ?? slide.panels[0];

  return (
    <div className="waldo-health-slide-content relative grid h-full min-h-0 grid-rows-[auto_minmax(280px,1fr)] gap-6 overflow-hidden p-5 sm:p-6 md:grid-cols-[minmax(240px,0.86fr)_minmax(260px,1fr)] md:grid-rows-1 md:items-center md:gap-4 lg:grid-cols-[minmax(300px,0.82fr)_minmax(400px,1.4fr)] lg:p-8">
      {openPanel !== null ? (
        <button
          type="button"
          aria-label="Collapse expanded field"
          className="focusable-ring absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] text-[var(--ink)] transition-[background-color] duration-150 ease-[var(--ease-premium)] hover:bg-[var(--surface-t2)] sm:right-5 sm:top-5"
          onClick={() => onPanelChange(null)}
        >
          <span aria-hidden className="relative h-3 w-3 rotate-45">
            <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 rounded-full bg-current" />
            <span className="absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 rounded-full bg-current" />
          </span>
        </button>
      ) : null}

      <div className="waldo-health-slide-copy relative z-10 flex min-h-0 flex-col justify-start pl-0 sm:pl-4 md:justify-center lg:pl-8">
        <div className="mb-8 pr-12 sm:pr-14">
          <h3 className="type-h2 max-w-[16ch] text-[var(--ink)]">{slide.headline}</h3>
        </div>

        <div className="waldo-health-mobile-stage md:hidden">
          <HealthFeatureVisualStage slide={slide} panel={panel} activePanel={openPanel} />
        </div>

        <Accordion.Root
          type="single"
          collapsible
          value={openPanel === null ? "" : `${openPanel}`}
          onValueChange={(value) => onPanelChange(value === "" ? null : Number(value))}
          className="space-y-3 pr-1 lg:min-h-0 lg:max-h-[400px] lg:overflow-y-auto"
          data-lenis-prevent
        >
          {slide.panels.map((item, index) => (
            <PanelPill
              key={item.label}
              panel={item}
              index={index}
            />
          ))}
        </Accordion.Root>
      </div>

      <div className="hidden h-full min-h-0 md:block">
        <HealthFeatureVisualStage slide={slide} panel={panel} activePanel={openPanel} />
      </div>
    </div>
  );
}

export function AlreadyDoneSection() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const progressAnimationRef = useRef<number | null>(null);
  const pinnedTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);
  const wheelIntentRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const lastProgressTickRef = useRef<number | null>(null);
  const scrollSnapTypeRef = useRef<string | null>(null);
  const programmaticScrollRef = useRef(false);
  const scrollDrivenRef = useRef(false);
  const dragStateRef = useRef<CarouselDragState | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [isScrollAnimating, setIsScrollAnimating] = useState(false);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);
  const [scrollDriven, setScrollDriven] = useState(false);
  const [openPanels, setOpenPanels] = useState<Record<number, number | null>>({});

  const shouldTickProgress = playing && !ended && !reducedMotion && !scrollDriven && !interactionPaused && !documentHidden && !isScrollAnimating;
  const activeSlide = slides[active];
  const activeLabel = activeSlide.tab;

  const setProgressValue = useCallback((value: number) => {
    const bounded = Math.max(0, Math.min(1, value));
    progressRef.current = bounded;
    setProgress(bounded);
  }, []);

  const setActiveValue = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    const handleVisibility = () => setDocumentHidden(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) window.cancelAnimationFrame(scrollAnimationRef.current);
      if (progressAnimationRef.current !== null) window.cancelAnimationFrame(progressAnimationRef.current);
    };
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(PINNED_SCROLL_QUERY, () => {
      let maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      if (maxScroll < 8) return undefined;

      scrollDrivenRef.current = true;
      const pinnedSnapType = track.style.scrollSnapType || window.getComputedStyle(track).scrollSnapType;
      track.style.scrollSnapType = "none";
      setScrollDriven(true);
      setPlaying(false);
      setEnded(false);
      lastProgressTickRef.current = null;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${maxScroll + window.innerHeight * 0.5}`,
        pin: true,
        pinSpacing: "margin",
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        },
        onUpdate: (self) => {
          if (dragStateRef.current?.isDragging) return;

          const rawIndex = self.progress * (slides.length - 1);
          const nextIndex = Math.max(0, Math.min(slides.length - 1, Math.round(rawIndex)));
          const localProgress = nextIndex >= slides.length - 1 ? self.progress : rawIndex - Math.floor(rawIndex);
          const nextScrollLeft = maxScroll * self.progress;

          programmaticScrollRef.current = true;
          if (Math.abs(track.scrollLeft - nextScrollLeft) > 0.5) {
            track.scrollLeft = nextScrollLeft;
          }
          window.requestAnimationFrame(() => {
            programmaticScrollRef.current = false;
          });

          if (nextIndex !== activeRef.current) setActiveValue(nextIndex);
          if (Math.abs(progressRef.current - localProgress) > 0.018 || self.progress <= 0.001 || self.progress >= 0.999) {
            setProgressValue(self.progress >= 0.999 ? 1 : localProgress);
          }
          setEnded((current) => {
            const nextEnded = self.progress >= 0.999;
            return current === nextEnded ? current : nextEnded;
          });
        },
      });
      pinnedTriggerRef.current = trigger;

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
        if (pinnedTriggerRef.current === trigger) pinnedTriggerRef.current = null;
        scrollDrivenRef.current = false;
        track.style.scrollSnapType = pinnedSnapType;
        setScrollDriven(false);
        programmaticScrollRef.current = false;
      };
    });

    return () => mm.revert();
  }, [reducedMotion, setActiveValue, setProgressValue]);

  const cancelScrollAnimation = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    if (trackRef.current && scrollSnapTypeRef.current !== null) {
      trackRef.current.style.scrollSnapType = scrollSnapTypeRef.current;
      scrollSnapTypeRef.current = null;
    }
    programmaticScrollRef.current = false;
    setIsScrollAnimating(false);
  }, []);

  const scrollToSlide = useCallback((index: number, auto = false) => {
    const track = trackRef.current;
    const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    const card = track?.children[nextIndex] as HTMLElement | undefined;

    cancelScrollAnimation();
    lastProgressTickRef.current = null;
    setProgressValue(0);
    setEnded(false);
    setActiveValue(nextIndex);
    if (!track || !card) return;

    const pinnedTrigger = pinnedTriggerRef.current;
    if (scrollDrivenRef.current && pinnedTrigger) {
      const targetProgress = slides.length <= 1 ? 0 : nextIndex / (slides.length - 1);
      const targetScrollTop = pinnedTrigger.start + (pinnedTrigger.end - pinnedTrigger.start) * targetProgress;

      window.scrollTo({
        top: targetScrollTop,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      return;
    }

    const paddingStart = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    const left = card.offsetLeft - paddingStart;
    const startLeft = track.scrollLeft;
    const distance = left - startLeft;

    if (reducedMotion || Math.abs(distance) < 1) {
      track.scrollLeft = left;
      return;
    }

    const duration = auto ? AUTO_SCROLL_MS : AUTO_SCROLL_MS;
    let startTime: number | null = null;

    programmaticScrollRef.current = true;
    scrollSnapTypeRef.current = track.style.scrollSnapType || window.getComputedStyle(track).scrollSnapType;
    track.style.scrollSnapType = "none";
    setIsScrollAnimating(true);

    const step = (now: number) => {
      startTime ??= now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      track.scrollLeft = startLeft + distance * appleGalleryEase(progress);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
        return;
      }

      track.scrollLeft = left;
      track.style.scrollSnapType = scrollSnapTypeRef.current ?? "";
      scrollSnapTypeRef.current = null;
      scrollAnimationRef.current = null;
      programmaticScrollRef.current = false;
      setIsScrollAnimating(false);
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  }, [cancelScrollAnimation, reducedMotion, setActiveValue, setProgressValue]);

  useEffect(() => {
    if (!shouldTickProgress) {
      lastProgressTickRef.current = null;
      return;
    }

    const tick = (now: number) => {
      const last = lastProgressTickRef.current ?? now;
      const delta = now - last;
      lastProgressTickRef.current = now;
      const next = Math.min(1, progressRef.current + delta / AUTO_DWELL_MS);

      setProgressValue(next);

      if (next >= 1) {
        lastProgressTickRef.current = null;
        if (active < slides.length - 1) {
          setProgressValue(0);
          scrollToSlide(active + 1, true);
        } else {
          setEnded(true);
          setPlaying(false);
        }
        return;
      }

      progressAnimationRef.current = window.requestAnimationFrame(tick);
    };

    progressAnimationRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (progressAnimationRef.current !== null) {
        window.cancelAnimationFrame(progressAnimationRef.current);
        progressAnimationRef.current = null;
      }
    };
  }, [active, scrollToSlide, setProgressValue, shouldTickProgress]);

  const goTo = (index: number) => {
    setPlaying(false);
    setEnded(false);
    scrollToSlide(index, false);
  };

  const handleWheelIntent = useCallback((event: globalThis.WheelEvent) => {
    if (!scrollDrivenRef.current) return;
    if (Math.abs(event.deltaX) < 18 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

    if (event.cancelable) event.preventDefault();
    const now = window.performance.now();
    if (wheelIntentRef.current !== null && now - wheelIntentRef.current < 520) return;

    wheelIntentRef.current = now;
    setPlaying(false);
    setEnded(false);
    setInteractionPaused(true);
    scrollToSlide(activeRef.current + (event.deltaX > 0 ? 1 : -1), false);
    window.setTimeout(() => setInteractionPaused(false), 520);
  }, [scrollToSlide]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    track.addEventListener("wheel", handleWheelIntent, { passive: false });
    return () => track.removeEventListener("wheel", handleWheelIntent);
  }, [handleWheelIntent]);

  const getNearestSlideIndex = useCallback((scrollLeft: number) => {
    const track = trackRef.current;
    if (!track) return activeRef.current;

    const trackCenter = scrollLeft + track.clientWidth / 2;
    let nearest = activeRef.current;
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

    return nearest;
  }, []);

  const restoreDragSideEffects = useCallback((track: HTMLDivElement, state: CarouselDragState) => {
    if (state.snapType !== null) {
      track.style.scrollSnapType = state.snapType;
    }
    document.body.style.cursor = state.previousBodyCursor;
    document.body.style.userSelect = state.previousBodyUserSelect;
    setIsDraggingTrack(false);
  }, []);

  const finishPointerDrag = useCallback((event?: ReactPointerEvent<HTMLDivElement>, snapToNearest = true) => {
    const state = dragStateRef.current;
    const track = trackRef.current;

    if (!state) {
      setInteractionPaused(false);
      return;
    }

    dragStateRef.current = null;

    if (event?.currentTarget.hasPointerCapture(state.pointerId)) {
      event.currentTarget.releasePointerCapture(state.pointerId);
    }

    if (track && state.isDragging) {
      restoreDragSideEffects(track, state);
    }

    setInteractionPaused(false);

    if (!track || !state.isDragging || !snapToNearest) return;

    const nearest = getNearestSlideIndex(state.currentScrollLeft);
    const card = track.children[nearest] as HTMLElement | undefined;
    const pinnedTrigger = pinnedTriggerRef.current;

    if (scrollDrivenRef.current && pinnedTrigger && card) {
      const paddingStart = parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
      const left = clamp(card.offsetLeft - paddingStart, 0, state.maxScroll);
      const targetProgress = left / Math.max(1, state.maxScroll);
      const targetScrollTop = pinnedTrigger.start + (pinnedTrigger.end - pinnedTrigger.start) * targetProgress;

      track.scrollLeft = left;
      setActiveValue(nearest);
      setProgressValue(0);
      setEnded(nearest >= slides.length - 1);
      window.scrollTo({ top: targetScrollTop, behavior: "auto" });
      return;
    }

    scrollToSlide(nearest, false);
  }, [getNearestSlideIndex, restoreDragSideEffects, scrollToSlide, setActiveValue, setProgressValue]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isInteractiveCarouselTarget(event.target) || isScrollbarGutterPointer(event)) return;

    cancelScrollAnimation();
    setPlaying(false);
    setEnded(false);
    setInteractionPaused(true);

    if (event.pointerType === "touch") return;

    const track = event.currentTarget;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    if (maxScroll < 4) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: track.scrollLeft,
      currentScrollLeft: track.scrollLeft,
      maxScroll,
      isDragging: false,
      snapType: null,
      previousBodyCursor: document.body.style.cursor,
      previousBodyUserSelect: document.body.style.userSelect,
    };

    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state || event.pointerId !== state.pointerId) return;

    const track = event.currentTarget;
    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (!state.isDragging) {
      if (absX < DRAG_START_THRESHOLD_PX) return;
      if (absX <= absY * 1.15) return;

      state.isDragging = true;
      state.snapType = track.style.scrollSnapType || window.getComputedStyle(track).scrollSnapType;
      track.style.scrollSnapType = "none";
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      setIsDraggingTrack(true);
    }

    event.preventDefault();

    const nextScrollLeft = clamp(state.startScrollLeft - deltaX, 0, state.maxScroll);
    const pinnedTrigger = pinnedTriggerRef.current;
    state.currentScrollLeft = nextScrollLeft;

    if (scrollDrivenRef.current && pinnedTrigger) {
      const targetProgress = nextScrollLeft / Math.max(1, state.maxScroll);
      const targetScrollTop = pinnedTrigger.start + (pinnedTrigger.end - pinnedTrigger.start) * targetProgress;

      track.scrollLeft = nextScrollLeft;
      const rawIndex = targetProgress * (slides.length - 1);
      const nextIndex = Math.max(0, Math.min(slides.length - 1, Math.round(rawIndex)));
      const localProgress = nextIndex >= slides.length - 1 ? targetProgress : rawIndex - Math.floor(rawIndex);

      if (nextIndex !== activeRef.current) setActiveValue(nextIndex);
      setProgressValue(targetProgress >= 0.999 ? 1 : localProgress);
      setEnded(targetProgress >= 0.999);
      window.scrollTo({ top: targetScrollTop, behavior: "auto" });
      return;
    }

    track.scrollLeft = nextScrollLeft;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) {
      setInteractionPaused(false);
      return;
    }

    finishPointerDrag(event, true);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state || state.pointerId !== event.pointerId) {
      setInteractionPaused(false);
      return;
    }

    finishPointerDrag(event, true);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    if (scrollDrivenRef.current) return;
    if (programmaticScrollRef.current) return;

    const nearest = getNearestSlideIndex(track.scrollLeft);

    if (nearest !== activeRef.current) {
      setActiveValue(nearest);
      setProgressValue(0);
      setEnded(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="already-handled"
      className="waldo-highlights relative z-10 isolate min-h-[100svh] w-screen max-w-none scroll-mt-0 overflow-hidden bg-[var(--surface-t3)] pt-32 pb-8 lg:pt-36 lg:pb-12"
    >
      <div className="mb-8 flex w-full flex-col gap-6 px-[var(--slide-padding)] lg:mb-10" data-animate="blur-fade">
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
        data-lenis-prevent
        data-animate="stagger"
        data-stagger="0.08"
        className={[
          "grid w-full auto-cols-[var(--slide-width)] grid-flow-col snap-x snap-mandatory scroll-pl-0 gap-[var(--slide-gap)] overflow-x-auto px-[var(--slide-padding)] pb-2 [scrollbar-width:none] max-[734px]:scroll-pl-[var(--slide-padding)] [&::-webkit-scrollbar]:hidden",
          isDraggingTrack
            ? "cursor-grabbing select-none [&_*]:cursor-grabbing"
            : "cursor-grab [&_a]:cursor-pointer [&_button]:cursor-pointer",
        ].join(" ")}
        aria-live="polite"
        aria-label={`Showing ${activeLabel}`}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handlePointerCancel}
        onDragStart={(event) => event.preventDefault()}
      >
        {slides.map((slide, index) => {
          const isActive = active === index;
          const openPanel = Object.prototype.hasOwnProperty.call(openPanels, index) ? openPanels[index] ?? null : null;

          return (
            <article
              key={slide.tab}
              id={`health-feature-card-${index}`}
              aria-label={slide.tab}
              aria-current={isActive}
              data-stagger-item
              className="h-[var(--slide-height)] w-[var(--slide-width)] snap-center overflow-y-auto rounded-[24px] bg-[var(--surface-t1)] [scrollbar-width:none] max-[734px]:snap-start lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
            >
              <SlideContent
                slide={slide}
                openPanel={openPanel}
                onPanelChange={(panelIndex) => {
                  setPlaying(false);
                  setEnded(false);
                  setOpenPanels((current) => ({ ...current, [index]: panelIndex }));
                }}
              />
            </article>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div
          className="waldo-carousel-controls flex h-14 w-[200px] items-center justify-center gap-3 rounded-full bg-[var(--surface-t2)] px-4 sm:w-[216px] sm:gap-4"
          style={{ animation: "waldo-carousel-control-in 740ms var(--ease-premium) both" }}
          onFocusCapture={() => setInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
          }}
        >
          {slides.map((slide, index) => {
            const isCurrent = active === index;
            const isComplete = index < active || (ended && index <= active);
            const fillWidth = isCurrent ? progress : isComplete ? 1 : 0;
            const fillClass = isComplete && !isCurrent ? "bg-[var(--bar-fill-neutral)]" : "";
            const fillBackground = isCurrent && !reducedMotion
              ? "linear-gradient(90deg, var(--bar-fill-ink) 0%, var(--bar-fill-ink) calc(100% - 12px), color-mix(in srgb, var(--bar-fill-ink) 30%, transparent) 100%)"
              : isCurrent
              ? "var(--bar-fill-ink)"
              : undefined;

            return (
              <button
                key={slide.tab}
                type="button"
                aria-label={`Show ${slide.tab}`}
                className="focusable-ring flex h-11 w-6 items-center justify-center rounded-full"
                onClick={() => goTo(index)}
              >
                <span
                  className="relative block h-2 shrink-0 overflow-hidden rounded-[var(--bar-radius)] bg-[var(--bar-track)] transition-[width,background-color] duration-[250ms] ease-[var(--ease-premium)]"
                  style={{
                    width: isCurrent ? "var(--active-dot-width)" : "8px",
                    boxShadow: "var(--bar-track-inset)",
                  }}
                >
                  <span
                    className={`absolute inset-y-0 left-0 rounded-[var(--bar-radius)] ${fillClass}`}
                    style={{
                      width: `${fillWidth * 100}%`,
                      background: fillBackground,
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="waldo-carousel-controls focusable-ring flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-t2)] text-[var(--ink)] transition-[background-color] duration-150 ease-[var(--ease-premium)] hover:bg-[var(--surface-t1)]"
          style={{ animation: "waldo-carousel-control-in 940ms var(--ease-premium) both" }}
          aria-label={scrollDriven ? "Carousel follows page scroll" : ended ? "Replay carousel" : playing ? "Pause carousel" : "Play carousel"}
          disabled={scrollDriven}
          onClick={() => {
            if (scrollDriven) return;
            if (ended) {
              scrollToSlide(0, false);
              setPlaying(true);
              return;
            }
            setPlaying((current) => !current);
          }}
        >
          <PlayPauseIcon playing={playing && !reducedMotion} ended={ended} />
        </button>
      </div>
    </section>
  );
}
