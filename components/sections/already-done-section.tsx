"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

import { useElementInView } from "@/hooks/use-element-in-view";
import dots01Patrol from "@/public/figma-assets/health-carousel/dots-01-patrol.webp";
import dots02Spot from "@/public/figma-assets/health-carousel/dots-02-spot.webp";
import dots03Constellation from "@/public/figma-assets/health-carousel/dots-03-constellation.webp";
import dots04Readiness from "@/public/figma-assets/health-carousel/dots-04-readiness.webp";
import dots05WednesdayProtected from "@/public/figma-assets/health-carousel/dots-05-wednesday-protected.webp";
import edge01StressElevated from "@/public/figma-assets/health-carousel/edge-01-stress-elevated.webp";
import edge02ContextGraph from "@/public/figma-assets/health-carousel/edge-02-context-graph.webp";
import edge03RunPlan from "@/public/figma-assets/health-carousel/edge-03-run-plan.webp";
import edge04FormSpike from "@/public/figma-assets/health-carousel/edge-04-form-spike.webp";
import edge05CalendarAction from "@/public/figma-assets/health-carousel/edge-05-calendar-action.webp";
import gut01SleepSignal from "@/public/figma-assets/health-carousel/gut-01-sleep-signal.webp";
import gut02HeartRate from "@/public/figma-assets/health-carousel/gut-02-heart-rate.webp";
import gut03StressAction from "@/public/figma-assets/health-carousel/gut-03-stress-action.webp";
import gut04RecoveryCheck from "@/public/figma-assets/health-carousel/gut-04-recovery-check.webp";
import gut05MotionContext from "@/public/figma-assets/health-carousel/gut-05-motion-context.webp";
import habits01DeepDive from "@/public/figma-assets/health-carousel/habits-01-deep-dive.webp";
import habits02DreamingMode from "@/public/figma-assets/health-carousel/habits-02-dreaming-mode.webp";
import habits03Corrections from "@/public/figma-assets/health-carousel/habits-03-corrections.webp";
import habits04Slope from "@/public/figma-assets/health-carousel/habits-04-slope.webp";
import habits05RunIt from "@/public/figma-assets/health-carousel/habits-05-run-it.webp";
import mornings01Action from "@/public/figma-assets/health-carousel/mornings-01-action.webp";
import mornings02HrvWatch from "@/public/figma-assets/health-carousel/mornings-02-hrv-watch.webp";
import mornings03RestingState from "@/public/figma-assets/health-carousel/mornings-03-resting-state.webp";
import mornings04Sleep from "@/public/figma-assets/health-carousel/mornings-04-sleep.webp";
import mornings05SleepDebt from "@/public/figma-assets/health-carousel/mornings-05-sleep-debt.webp";

const AUTO_DWELL_MS = 6150;
const AUTO_SCROLL_MS = 1000;
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
};

type FeaturePanel = {
  label: string;
  title: string;
  body: string;
  tone: HealthTone;
  metric: string;
  visual: HealthCardVisual;
};

type ShowcaseSlide = {
  tab: string;
  headline: string;
  aside: string;
  visual: VisualKind;
  badge?: string;
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
    panels: [
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Recovery at 63 and a 9am meeting? Pushed to 10:30. Recovery at 85? Your calendar stays untouched. *You wake up to the result, not the reasoning.*",
        tone: "recovery",
        metric: "morning moved",
        visual: {
          image: mornings01Action,
          alt: "Full Waldo morning frame showing an orange calendar surface and a recovery-driven 9am meeting move.",
          nodeId: "1686558135",
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
          image: mornings02HrvWatch,
          alt: "Full Waldo morning frame showing an Apple Watch HRV card with 65ms rising.",
          nodeId: "1686558130",
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
          image: mornings03RestingState,
          alt: "Full Waldo morning frame showing resting-state health signals over a phone screen.",
          nodeId: "1686558133",
        },
      },
      {
        label: "Sleep, stage by stage.",
        title: "Sleep, stage by stage.",
        body:
          "Waldo tracks deep, REM, light, and awake. Duration alone does not tell you much. *Deep sleep in a short night can beat light sleep in a long one.* Waldo knows the difference.",
        tone: "sleep",
        metric: "stages read",
        visual: {
          image: mornings04Sleep,
          alt: "Full Waldo morning frame showing a Sleep screen with required sleep and sleep schedule context.",
          nodeId: "1686558134",
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
          image: mornings05SleepDebt,
          alt: "Full Waldo morning frame showing a sleep-debt chart and next-day adjustment context.",
          nodeId: "1686558132",
        },
      },
    ],
  },
  {
    tab: "The edge, taken off.",
    headline: "The edge, taken off.",
    aside: "you didn't ask. you didn't need to.",
    visual: "stress",
    panels: [
      {
        label: "Stress confidence.",
        title: "Stress confidence, not stress score.",
        body:
          "Most apps give you a number. Waldo watches confidence: how certain the signal is that stress is sustained. *When the read is strong enough to trust, Waldo moves.*",
        tone: "stress",
        metric: "confidence rising",
        visual: {
          image: edge01StressElevated,
          alt: "Full Waldo edge frame showing an elevated stress gauge over a Health Stats phone screen.",
          nodeId: "1686558136",
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
          image: edge02ContextGraph,
          alt: "Full Waldo edge frame showing connected health signals and a recovery action card.",
          nodeId: "1686558138",
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
          image: edge03RunPlan,
          alt: "Full Waldo edge frame showing blurred context and a prompt asking whether to run the plan.",
          nodeId: "1686558140",
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
          image: edge04FormSpike,
          alt: "Full Waldo edge frame showing a phone Form chart with a stress spike and contextual action.",
          nodeId: "1686558141",
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
          image: edge05CalendarAction,
          alt: "Full Waldo edge frame showing a calendar where lower-priority work is moved while important calls stay protected.",
          nodeId: "1686558142",
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
        visual: {
          image: dots01Patrol,
          alt: "Full Waldo Connecting the Dots frame showing a Patrol timeline with Brief, Fetch, and Adjustment entries.",
          nodeId: "1686558143",
        },
      },
      {
        label: "Spots are single observations.",
        title: "Spots are single observations.",
        body:
          "\"Your worst sleep follows your heaviest meeting days.\" One data point. One sentence. Waldo surfaces it when confidence is high enough, not before. *Small, useful, restrained.*",
        tone: "sleep",
        metric: "Spot found",
        visual: {
          image: dots02Spot,
          alt: "Full Waldo Connecting the Dots frame showing the Spot card: Tuesdays are expensive.",
          nodeId: "1686558144",
        },
      },
      {
        label: "Constellations connect the dots.",
        title: "Constellations connect the dots.",
        body:
          "Multiple Spots link into a named behavioral pattern. The Tuesday Crash becomes something Waldo can name, track, and act on. *Coming soon.*",
        tone: "heart",
        metric: "pattern named",
        visual: {
          image: dots03Constellation,
          alt: "Full Waldo Connecting the Dots frame showing a Tuesday Crash constellation graph.",
          nodeId: "1686558146",
        },
      },
      {
        label: "Pre-activity readiness.",
        title: "Pre-activity readiness.",
        body:
          "Before a high-stakes meeting, Waldo checks your Form score, context from last week, attendee list, and duration. *Not a generic reminder. A readiness check grounded in your actual data.*",
        tone: "motion",
        metric: "ready check",
        visual: {
          image: dots04Readiness,
          alt: "Full Waldo Connecting the Dots frame showing investor call readiness with calendar and Form context.",
          nodeId: "1686558147",
        },
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "Patterns are not useful if nothing changes. Tuesday overload causing Wednesday depletion? *Waldo starts protecting Wednesday mornings before the cycle repeats.*",
        tone: "recovery",
        metric: "cycle broken",
        visual: {
          image: dots05WednesdayProtected,
          alt: "Full Waldo Connecting the Dots frame showing a calendar heatmap with next Wednesday mornings protected.",
          nodeId: "1686558148",
        },
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
        visual: {
          image: gut01SleepSignal,
          alt: "Full Waldo gut feeling frame showing sleep and recovery charts with an explanatory Waldo card.",
          nodeId: "1686558149",
        },
      },
      {
        label: "Heart rate that means something.",
        title: "Heart rate that means something.",
        body:
          "HRV trends, resting HR, and baseline tracking are not notifications. A dip below your 7-day average becomes a trigger. *Waldo connects the signal to your calendar.*",
        tone: "heart",
        metric: "HRV read",
        visual: {
          image: gut02HeartRate,
          alt: "Full Waldo gut feeling frame showing a Recovery phone screen with heart-rate context.",
          nodeId: "1686558150",
        },
      },
      {
        label: "Stress you do not manage.",
        title: "Stress you do not manage.",
        body:
          "Real-time confidence scoring is not a daily summary. It is a live signal that triggers The Fetch when it sustains too long. *Waldo catches it before you feel it.*",
        tone: "stress",
        metric: "Fetch armed",
        visual: {
          image: gut03StressAction,
          alt: "Full Waldo gut feeling frame comparing no-Waldo and Waldo action states for elevated HR.",
          nodeId: "1686558151",
        },
      },
      {
        label: "Recovery drives the day.",
        title: "Recovery drives the day.",
        body:
          "Sleep, HRV, and resting state combine into one score. The score powers The Brief. The Brief powers your morning. *One signal, end to end.*",
        tone: "recovery",
        metric: "Brief ready",
        visual: {
          image: gut04RecoveryCheck,
          alt: "Full Waldo gut feeling frame showing recovery and watch readiness checks with cleared evening context.",
          nodeId: "1686558152",
        },
      },
      {
        label: "Motion with context.",
        title: "Motion with context.",
        body:
          "Steps, exercise, VO2 Max, and active energy are more than counts. *A hard workout at 7am means your 9am needs to be light.*",
        tone: "motion",
        metric: "load softened",
        visual: {
          image: gut05MotionContext,
          alt: "Full Waldo gut feeling frame showing load and motion context with protected windows.",
          nodeId: "1686558153",
        },
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
        label: "Deep dives compound.",
        title: "Deep dives compound.",
        body:
          "Waldo turns a pattern into a readable deep dive: what happened, what changed, and what to do next. *It stops being a chart and becomes memory you can act on.*",
        tone: "heart",
        metric: "memory linked",
        visual: {
          image: habits01DeepDive,
          alt: "Full Waldo old habits frame showing a deep dive phone screen about sleep and circadian mismatch.",
          nodeId: "1686558165",
        },
      },
      {
        label: "Dreaming Mode.",
        title: "Dreaming Mode.",
        body:
          "At 2am, Waldo consolidates. It promotes patterns, merges related memories, and pre-builds tomorrow's Brief. *By the time you wake up, it already knows what kind of day is waiting.*",
        tone: "sleep",
        metric: "2am pass",
        visual: {
          image: habits02DreamingMode,
          alt: "Full Waldo old habits frame showing overnight Dreaming Mode consolidation.",
          nodeId: "1686558166",
        },
      },
      {
        label: "Corrections sharpen it.",
        title: "Corrections sharpen it.",
        body:
          "Undo a Fetch? Waldo learns. Keep a meeting it tried to move? Noted. *The first week has friction. The third week feels quietly familiar.*",
        tone: "recovery",
        metric: "model tuned",
        visual: {
          image: habits03Corrections,
          alt: "Full Waldo old habits frame showing corrections, undo and decline states, and pattern confirmation.",
          nodeId: "1686558167",
        },
      },
      {
        label: "The Slope watches trajectory.",
        title: "The Slope watches the trajectory.",
        body:
          "Four weeks of data across recovery, form, demand, meeting load, communication pressure, and task pileup. *When the whole picture declines, Waldo escalates.*",
        tone: "motion",
        metric: "4-week slope",
        visual: {
          image: habits04Slope,
          alt: "Full Waldo old habits frame showing The Slope and a four-week trajectory comparison.",
          nodeId: "1686558168",
        },
      },
      {
        label: "What Waldo does about it.",
        title: "What Waldo does about it.",
        body:
          "When The Tuesday Crash repeats, Waldo does not just tell you. *It starts protecting Wednesdays, then keeps doing it.*",
        tone: "stress",
        metric: "Wednesday held",
        visual: {
          image: habits05RunIt,
          alt: "Full Waldo old habits frame showing a Tuesday Crash run-it prompt with protected outcomes.",
          nodeId: "1686558169",
        },
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

function PillPaddleIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" aria-hidden>
      <path
        d={direction === "next" ? "M5.25 4.5 10.25 10 5.25 15.5" : "M9.75 4.5 4.75 10l5 5.5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
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
  const itemRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const openMeasureRef = useRef<HTMLDivElement>(null);
  const [pillMetrics, setPillMetrics] = useState<{ closed: number; open: number; height: number } | null>(null);

  useEffect(() => {
    const measure = measureRef.current;
    const openMeasure = openMeasureRef.current;
    const item = itemRef.current;
    if (!measure || !openMeasure) return undefined;
    let mounted = true;

    const updateMetrics = () => {
      if (!mounted) return;
      const closed = Math.ceil(measure.getBoundingClientRect().width);
      const mobile = window.matchMedia("(max-width: 734px)").matches;
      const slideWidth = item?.closest<HTMLElement>(".waldo-health-slide-content")?.clientWidth ?? window.innerWidth;
      const available = item?.parentElement?.clientWidth ?? 440;
      const open = mobile
        ? Math.max(280, Math.min(348, Math.floor(slideWidth - 16)))
        : Math.max(closed, Math.min(440, Math.floor(available)));
      openMeasure.style.width = `${open}px`;
      const height = Math.max(52, Math.ceil(openMeasure.scrollHeight));
      setPillMetrics({ closed, open, height });
    };

    const frame = window.requestAnimationFrame(updateMetrics);
    const observer = new ResizeObserver(updateMetrics);
    if (item) observer.observe(item);
    if (item?.parentElement) observer.observe(item.parentElement);
    void document.fonts?.ready.then(updateMetrics);
    window.addEventListener("resize", updateMetrics);

    return () => {
      mounted = false;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [cleanBody, panel.title]);

  const itemStyle = pillMetrics
    ? ({
      "--closed-inline-size": `${pillMetrics.closed}px`,
      "--open-inline-size": `${pillMetrics.open}px`,
      "--open-block-size": `${pillMetrics.height}px`,
    } as CSSProperties)
    : undefined;

  return (
    <Accordion.Item ref={itemRef} value={`${index}`} className="waldo-panel-pill" style={itemStyle}>
      <span
        ref={measureRef}
        className="waldo-panel-measure flex items-center gap-3 px-4 py-2.5"
        aria-hidden
        style={{
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          visibility: "hidden",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        <span className="h-6 w-6 shrink-0" />
        <span className="type-label whitespace-nowrap">{panel.title}</span>
      </span>
      <div
        ref={openMeasureRef}
        className="waldo-panel-open-measure"
        aria-hidden
        style={{
          left: 0,
          opacity: 0,
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          visibility: "hidden",
          width: pillMetrics ? `${pillMetrics.open}px` : "440px",
        }}
      >
        <div className="waldo-panel-open-measure-header px-4 py-2.5">
          <span className="type-label whitespace-nowrap">{panel.title}</span>
        </div>
        <div className="waldo-panel-open-measure-card px-5 pb-3.5 pt-0">
          <p className="waldo-panel-body type-body text-[var(--text-secondary)]">{cleanBody}</p>
        </div>
      </div>
      <Accordion.Header>
        <Accordion.Trigger
          id={panelId}
          className="waldo-panel-trigger focusable-ring flex items-center gap-3 px-4 py-2.5 text-left text-[var(--ink)]"
          aria-controls={panelContentId}
        >
          <span className="waldo-panel-plus flex items-center justify-center rounded-full border border-[var(--border-default)] bg-transparent text-[var(--ink)]" aria-hidden>
            <span className="relative h-3 w-3">
              <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 rounded-full bg-current" />
            </span>
          </span>
          <span className="type-label whitespace-nowrap">{panel.title}</span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        id={panelContentId}
        className="waldo-panel-content grid overflow-hidden"
      >
        <div className="waldo-panel-card overflow-hidden px-5 pb-3.5 pt-0">
          <p className="waldo-panel-body type-body text-[var(--text-secondary)]">{cleanBody}</p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function SlideContent({
  slide,
  openPanel,
  isActive,
  onPanelChange,
  onPanelInteraction,
}: {
  slide: ShowcaseSlide;
  openPanel: number;
  isActive: boolean;
  onPanelChange: (panelIndex: number) => void;
  onPanelInteraction: () => void;
}) {
  const panel = slide.panels[openPanel] ?? slide.panels[0];
  const canGoBack = openPanel > 0;
  const canGoForward = openPanel < slide.panels.length - 1;
  const goToAdjacentPanel = (direction: "previous" | "next") => {
    onPanelInteraction();
    onPanelChange(openPanel + (direction === "next" ? 1 : -1));
  };

  return (
    <div
      className="waldo-health-slide-content relative h-full min-h-0 overflow-hidden"
      data-active-panel={openPanel}
    >
      <Image
        key={panel.visual.nodeId}
        src={panel.visual.image}
        alt={panel.visual.alt}
        fill
        sizes="(min-width: 1280px) 1260px, (min-width: 735px) 87.5vw, 92vw"
        className="waldo-health-frame-image select-none"
        fetchPriority={isActive ? "high" : "auto"}
        loading={isActive ? "eager" : "lazy"}
        draggable={false}
        unoptimized
      />
      <div aria-hidden className="waldo-health-frame-scrim" />

      <div className="waldo-health-frame-overlay">
        <div className="waldo-health-frame-heading">
          <h3 className="type-h2 text-[var(--ink)]">{slide.headline}</h3>
        </div>
        <Accordion.Root
          type="single"
          value={`${openPanel}`}
          onValueChange={(value) => onPanelChange(value === "" ? 0 : Number(value))}
          className="waldo-health-pill-rail"
          style={{ "--active-panel": openPanel } as CSSProperties}
        >
          {slide.panels.map((item, index) => (
            <PanelPill
              key={item.label}
              panel={item}
              index={index}
            />
          ))}
        </Accordion.Root>
        <div className="waldo-health-pill-paddles">
          <button
            type="button"
            className="waldo-health-pill-nav waldo-health-pill-nav--previous focusable-ring"
            aria-label={`Previous ${slide.tab} detail`}
            disabled={!canGoBack}
            onPointerDown={(event) => {
              event.stopPropagation();
              onPanelInteraction();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goToAdjacentPanel("previous");
            }}
          >
            <PillPaddleIcon direction="previous" />
          </button>
          <button
            type="button"
            className="waldo-health-pill-nav waldo-health-pill-nav--next focusable-ring"
            aria-label={`Next ${slide.tab} detail`}
            disabled={!canGoForward}
            onPointerDown={(event) => {
              event.stopPropagation();
              onPanelInteraction();
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goToAdjacentPanel("next");
            }}
          >
            <PillPaddleIcon direction="next" />
          </button>
        </div>
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
  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const lastProgressTickRef = useRef<number | null>(null);
  const scrollSnapTypeRef = useRef<string | null>(null);
  const programmaticScrollRef = useRef(false);
  const dragStateRef = useRef<CarouselDragState | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [isScrollAnimating, setIsScrollAnimating] = useState(false);
  const [isDraggingTrack, setIsDraggingTrack] = useState(false);
  const [openPanels, setOpenPanels] = useState<Record<number, number>>({});
  const sectionInView = useElementInView(sectionRef);

  const shouldTickProgress = playing && !ended && !reducedMotion && !interactionPaused && !documentHidden && !isScrollAnimating && sectionInView;
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
    scrollToSlide(nearest, false);
  }, [getNearestSlideIndex, restoreDragSideEffects, scrollToSlide]);

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
    state.currentScrollLeft = nextScrollLeft;

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
          const openPanel = openPanels[index] ?? 0;

          return (
            <article
              key={slide.tab}
              id={`health-feature-card-${index}`}
              aria-label={slide.tab}
              aria-current={isActive}
              data-stagger-item
              className="waldo-health-frame-card h-[var(--slide-height)] w-[var(--slide-width)] snap-center overflow-hidden rounded-[24px] bg-[var(--surface-t1)] max-[734px]:snap-start"
            >
              <SlideContent
                slide={slide}
                openPanel={openPanel}
                isActive={isActive}
                onPanelInteraction={() => {
                  cancelScrollAnimation();
                  setPlaying(false);
                  setEnded(false);
                }}
                onPanelChange={(panelIndex) => {
                  cancelScrollAnimation();
                  setPlaying(false);
                  setEnded(false);
                  const nextPanel = clamp(panelIndex, 0, slide.panels.length - 1);
                  setOpenPanels((current) => ({ ...current, [index]: nextPanel }));
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
          aria-label={ended ? "Replay carousel" : playing ? "Pause carousel" : "Play carousel"}
          onClick={() => {
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
