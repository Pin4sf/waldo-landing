"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import goodWeekDarkMode from "@/components/assets/good-week-dark-mode.svg";
import roughDarkMode from "@/components/assets/rough-dark-mode.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";
import { CinematicVideo } from "@/components/cinematic-video";
import { Aside, SectionIntro, WaldoCTA, withHighlights } from "@/components/landing-primitives";
import { MobileDots } from "@/components/mobile-dots";
import { useCardStack } from "@/hooks/use-card-stack";
import { AUTO_CARD_MS, DUR_SETTLE, EASE } from "@/lib/motion";

type FanCard = {
  title: string;
  icon: StaticImageData;
  iconW: number;
  iconH: number;
  body: string;
  metric: string;
  read: string;
};

const fanCards: FanCard[] = [
  {
    title: "The Fetch",
    icon: roughDarkMode,
    iconW: 100,
    iconH: 77,
    body: "Stress climbs, *the important call stays*, the soft meeting moves. The afternoon changes before the crash arrives.",
    metric: "3pm",
    read: "kept because it matters.",
  },
  {
    title: "The Adjustment",
    icon: goodWeekDarkMode,
    iconW: 100,
    iconH: 77,
    body: "The heavy parts of the week *get moved* before Friday turns into a tax on the body.",
    metric: "14/21",
    read: "Load is high; recovery time protected.",
  },
  {
    title: "The Patrol",
    icon: watchingDarkMode,
    iconW: 99,
    iconH: 75,
    body: "Most of the work *stays in the background*. Nothing gets said unless something is worth saying.",
    metric: "24/7",
    read: "watching quietly, not pinging loudly.",
  },
  {
    title: "The Window",
    icon: goodDarkMode,
    iconW: 77,
    iconH: 79,
    body: "The best hours *get held* before the calendar fills them with work that could wait.",
    metric: "2-4pm",
    read: "useful hours held.",
  },
  {
    title: "The Heads-Up",
    icon: goodSleepDarkMode,
    iconW: 89,
    iconH: 66,
    body: "The pattern is *called early*, while there is still enough room to change the day.",
    metric: "45 min",
    read: "early enough to matter.",
  },
];

const fanSlots = [
  { rotate: "-18deg", opacity: 0.54, blur: "blur(5px)", size: "small", left: "0px", top: "48px", w: "392px", h: "430px" },
  { rotate: "16deg", opacity: 0.54, blur: "blur(5px)", size: "small", left: "620px", top: "52px", w: "392px", h: "430px" },
  { rotate: "-8deg", opacity: 0.78, blur: "blur(2px)", size: "medium", left: "150px", top: "18px", w: "430px", h: "460px" },
  { rotate: "8deg", opacity: 0.78, blur: "blur(2px)", size: "medium", left: "460px", top: "18px", w: "430px", h: "460px" },
  { rotate: "0deg", opacity: 1, blur: "none", size: "front", left: "320px", top: "0px", w: "420px", h: "500px" },
] as const;

const cardTransition = `transform ${DUR_SETTLE}ms ${EASE}, opacity ${DUR_SETTLE}ms ${EASE}, filter ${DUR_SETTLE}ms ${EASE}`;

const liveLines = [
  "Rescheduled your 9am to 10:30",
  "Logged your 2am HRV dip",
  "Protecting your Friday afternoon",
  "Matching your best hours to deep work",
  "Scanning 14 email threads for urgency",
  "Blocking 2-4pm for recovery",
  "Moving the retro to Monday",
];

const finalLine = "Already on it.";
const wordMs = 70;

type Status = "queued" | "active" | "done";

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="2.8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M6.5 6.5 9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SidebarItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-t4)] text-[var(--ink)]">
        {icon}
      </span>
      <span className="type-caption whitespace-nowrap text-[var(--ink)]">{label}</span>
    </div>
  );
}

function SpinningPawIcon() {
  return (
    <span className="waldo-loading-spin inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <svg width="16" height="16" viewBox="-0.5 -1 24 22" fill="none" aria-hidden>
        <path d="M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z" fill="var(--accent)" />
        <path d="M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z" fill="var(--accent)" />
        <path d="M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z" fill="var(--accent)" />
        <path d="M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z" fill="var(--accent)" />
        <path d="M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z" fill="var(--accent)" />
        <path d="M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z" fill="var(--accent)" />
        <path d="M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z" fill="var(--accent)" />
      </svg>
    </span>
  );
}

function FanStackCard({ card, size }: { card: FanCard; size: "small" | "medium" | "front" }) {
  const front = size === "front";
  const medium = size === "medium";

  return (
    <article
      className="flex h-full w-full flex-col justify-between overflow-hidden border border-[var(--border-default)] bg-[var(--surface-t2)] shadow-[var(--shadow-floating)]"
      style={{
        borderRadius: front ? 24 : medium ? 21 : 18,
        padding: front ? 42 : medium ? 34 : 30,
      }}
    >
      <div>
        <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized className="h-auto max-h-20 w-auto" />
        <h3 className={front ? "type-h2 mt-8 text-[var(--ink)]" : "type-h3 mt-7 text-[var(--ink)]"}>{card.title}</h3>
        <p className={front ? "type-body tone-secondary mt-4" : "type-caption tone-secondary mt-4"}>
          {withHighlights(card.body)}
        </p>
      </div>

      <div className="mt-6 rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="type-caption text-[var(--text-secondary)]">signal</span>
          <span className="type-data text-[var(--ink)]">{card.metric}</span>
        </div>
        <Aside className="mt-2">{card.read}</Aside>
      </div>
    </article>
  );
}

function ConsoleAddOn() {
  return (
    <section id="console-proof" className="section-shell scroll-mt-28 flex flex-col gap-8 py-4 lg:gap-10">
      <SectionIntro
        title={
          <>
            The work is visible.
            <br />
            When it needs to be.
          </>
        }
        aside="proof, without another screen to manage."
      >
        <p>
          {withHighlights("A quiet console for *what changed*, what moved, and what Waldo is still watching.")}
        </p>
      </SectionIntro>

      <div className="surface-card hidden w-full overflow-hidden bg-[var(--surface-t3)] p-1.5 lg:flex">
        <aside className="flex w-[170px] flex-col gap-5 rounded-l-[20px] bg-[var(--surface-t3)] p-5">
          <Image src="/logo.svg" alt="Waldo" width={74} height={18} unoptimized className="h-auto w-[74px]" />
          <div className="flex flex-col gap-2">
            <SidebarItem icon={<PlusIcon />} label="New chat" />
            <SidebarItem icon={<SearchIcon />} label="Connectors" />
          </div>
          <div className="h-px w-full bg-[var(--border-focus)]" />
          <div className="flex flex-col gap-2">
            <SidebarItem icon={<SearchIcon />} label="Fetches" />
            <SidebarItem icon={<SearchIcon />} label="Constellations" />
          </div>
          <div className="h-px w-full bg-[var(--border-focus)]" />
          <div className="flex flex-col gap-2">
            <p className="type-caption text-[var(--ink)]">Recents</p>
            <p className="type-caption text-[var(--text-secondary)]">Morning load review</p>
            <p className="type-caption text-[var(--text-secondary)]">Friday afternoon</p>
            <p className="type-caption text-[var(--text-secondary)]">Tuesday pattern</p>
          </div>
        </aside>

        <CinematicVideo
          src="/waldo_demo.mp4"
          containerClassName="flex-1 overflow-hidden bg-[var(--surface-t3)]"
          containerStyle={{ height: "560px", borderRadius: "18px" }}
        />
      </div>
    </section>
  );
}

function ActionFanAddOn() {
  const { slotOf, frontIndex, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useCardStack(fanCards.length, AUTO_CARD_MS);
  const frontCard = fanCards[frontIndex];

  return (
    <section id="action-fan" className="section-shell scroll-mt-28 flex flex-col gap-8 py-10 lg:gap-10 lg:py-12">
      <SectionIntro
        title={
          <>
            The moves stack up.
            <br />
            You see the useful one.
          </>
        }
        aside="quiet, until it matters."
      >
        <p>
          {withHighlights("The same agent work, shown as a *moving stack* instead of a grid.")}
        </p>
      </SectionIntro>

      <div className="lg:hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={onClick}>
        <div className="relative mx-auto w-full max-w-[420px] px-4 pt-5">
          <div className="absolute inset-x-8 top-0 h-full rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t2)] opacity-50" />
          <div className="absolute inset-x-6 top-2 h-full rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t2)] opacity-70" />
          <div className="relative z-10 min-h-[430px]">
            <FanStackCard card={frontCard} size="front" />
          </div>
        </div>
        <MobileDots count={fanCards.length} current={frontIndex} />
      </div>

      <div
        className="relative mx-auto hidden h-[520px] w-full max-w-[1020px] cursor-pointer lg:block"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="button"
        aria-label="Agent action cards. Click to advance."
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick(event as unknown as MouseEvent);
          }
        }}
      >
        {fanCards.map((card, index) => {
          const slotIndex = slotOf(index);
          const slot = fanSlots[slotIndex];

          return (
            <div
              key={card.title}
              className="absolute"
              style={{
                left: slot.left,
                top: slot.top,
                width: slot.w,
                height: slot.h,
                zIndex: slotIndex + 1,
                transition: cardTransition,
              }}
            >
              <div
                style={{
                  height: "100%",
                  opacity: slot.opacity,
                  filter: slot.blur,
                  transform: `rotate(${slot.rotate})`,
                  transition: cardTransition,
                }}
              >
                <FanStackCard card={card} size={slot.size === "front" ? "front" : slot.size === "medium" ? "medium" : "small"} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LiveLogAddOn() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordCountsRef = useRef<number[]>(liveLines.map(() => 0));
  const [started, setStarted] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>(liveLines.map(() => "queued"));
  const [wordCounts, setWordCounts] = useState<number[]>(liveLines.map(() => 0));
  const [finalWords, setFinalWords] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const timers: Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = [];

    function advanceToTask(index: number) {
      if (index >= liveLines.length) {
        setShowCursor(false);
        streamFinal();
        return;
      }

      setStatuses((current) => current.map((status, statusIndex) => (statusIndex === index ? "active" : status)));
      setShowCursor(true);
      streamTask(index);
    }

    function streamTask(taskIndex: number) {
      const words = liveLines[taskIndex].split(" ");
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        wordCountsRef.current = wordCountsRef.current.map((wordCount, index) => (index === taskIndex ? count : wordCount));
        setWordCounts([...wordCountsRef.current]);

        if (count >= words.length) {
          clearInterval(interval);
          const doneTimer = setTimeout(() => {
            setStatuses((current) => current.map((status, index) => (index === taskIndex ? "done" : status)));
            setShowCursor(false);
            const nextTimer = setTimeout(() => advanceToTask(taskIndex + 1), 180);
            timers.push(nextTimer);
          }, 320);
          timers.push(doneTimer);
        }
      }, wordMs);
      timers.push(interval);
    }

    function streamFinal() {
      const words = finalLine.split(" ");
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setFinalWords(count);
        if (count >= words.length) clearInterval(interval);
      }, wordMs + 20);
      timers.push(interval);
    }

    const startTimer = setTimeout(() => advanceToTask(0), 360);
    timers.push(startTimer);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [started]);

  const visibleWords = (index: number) => liveLines[index].split(" ").slice(0, wordCounts[index]).join(" ");
  const finalText = finalLine.split(" ").slice(0, finalWords).join(" ");

  return (
    <section id="live-log" ref={sectionRef} className="section-shell surface-card scroll-mt-28 overflow-hidden p-6 sm:p-8 lg:p-12">
      <div className="mx-auto flex max-w-[820px] flex-col items-center text-center">
        <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
          The work keeps moving.
          <br />
          One line at a time.
        </h2>

        <div className="mt-8 w-full max-w-[620px] rounded-[24px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-6 text-left sm:p-8">
          <p className="type-aside mb-6">live agent log</p>
          <div className="flex flex-col gap-4">
            {liveLines.map((line, index) => {
              const status = statuses[index];
              const isActive = status === "active";
              const isDone = status === "done";
              const isQueued = status === "queued";

              return (
                <div key={line} className="grid grid-cols-[18px_1fr] gap-3 transition-opacity duration-300" style={{ opacity: isQueued ? 0.28 : 1 }}>
                  {isActive ? (
                    <SpinningPawIcon />
                  ) : (
                    <span className={isDone ? "type-caption text-[var(--text-tertiary)]" : "type-caption text-[var(--text-disabled)]"}>
                      {isDone ? "✓" : "·"}
                    </span>
                  )}
                  <p className={isDone ? "type-body tone-tertiary" : "type-body tone-primary"}>
                    {isQueued || isDone ? line : visibleWords(index)}
                    {isActive && showCursor && (
                      <span className="ml-1 inline-block h-[1em] w-0.5 align-text-top" style={{ background: "var(--accent)", animation: "hint-pulse 0.7s ease-in-out infinite" }} aria-hidden />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="type-h2 overflow-hidden text-[var(--accent)] transition-[max-height,margin-top,opacity] duration-500 ease-[var(--ease-premium)]" style={{ maxHeight: finalWords > 0 ? 72 : 0, marginTop: finalWords > 0 ? 32 : 0, opacity: finalWords > 0 ? 1 : 0 }}>
            {finalText}
          </p>
        </div>
        <Aside className="mt-6">the answer is always an action.</Aside>
      </div>
    </section>
  );
}

function DevicePatternAddOn() {
  return (
    <section id="device-pattern" className="section-shell dark-panel scroll-mt-28 overflow-hidden rounded-[30px] p-6 sm:p-8 lg:p-12">
      <SectionIntro
        dark
        title={
          <>
            The pattern gets
            <br />
            another angle.
          </>
        }
        aside="proof with shape, not noise."
      >
        <p>
          {withHighlights("The same long-range read, backed by *the health screens that made the signal visible*.")}
        </p>
      </SectionIntro>

      <div className="dark-card relative mt-8 min-h-[420px] overflow-hidden rounded-[8px] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="type-label text-[var(--panel-ink)]">The Constellation</p>
            <p className="type-aside mt-1 text-[var(--text-tertiary)]">The Tuesday Crash.</p>
          </div>
          <span className="type-caption rounded-full border border-[var(--panel-border)] bg-[var(--panel-card)] px-3 py-1 text-[var(--panel-muted)]">
            device read
          </span>
        </div>

        <div className="relative mt-8 hidden h-[260px] overflow-hidden lg:block">
          <div className="absolute left-[7%] top-[72px] w-[136px]">
            <Image src="/figma-assets/health-iphone-left.png" alt="" width={272} height={450} className="h-auto w-full" />
          </div>
          <div className="absolute left-[21%] top-0 w-[520px]">
            <Image src="/figma-assets/health-ipad.png" alt="" width={1042} height={633} className="h-auto w-full" />
          </div>
          <div className="absolute right-[2%] top-[82px] w-[244px]">
            <Image src="/figma-assets/health-iphone-right.png" alt="" width={486} height={410} className="h-auto w-full" />
          </div>
          <div className="absolute left-0 top-[142px] w-[62px]">
            <Image src="/figma-assets/health-watch.png" alt="" width={120} height={128} className="h-auto w-full" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--panel-surface)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function SceneCloseAddOn() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (viewportHeight - rect.top) / viewportHeight)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const sceneShift = (1 - progress) * 42;

  return (
    <section ref={ref} id="scene-close" className="section-shell relative min-h-[760px] overflow-hidden rounded-[30px] bg-[var(--surface-t3)]">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-[1] w-full select-none"
        style={{ transform: `translate3d(0, ${sceneShift}px, 0)`, willChange: "transform" }}
      >
        <picture>
          <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
          <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
          <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
          <img src="/assets/footer-bg.svg" alt="" className="waldo-breathe block w-full" />
        </picture>
      </div>

      <div className="relative z-[2] flex min-h-[760px] flex-col items-center justify-start px-4 pt-28 text-center">
        <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
          You&apos;re not the first.
          <br />
          You&apos;re also not
          <br />
          too late. Yet.
        </h2>
        <div className="mt-6">
          <WaldoCTA />
        </div>
        <Aside className="mt-5">Your watch has been waiting for this.</Aside>
      </div>
    </section>
  );
}

export function DownstreamBuildSections() {
  return (
    <>
      <ConsoleAddOn />
      <ActionFanAddOn />
      <LiveLogAddOn />
      <DevicePatternAddOn />
      <SceneCloseAddOn />
    </>
  );
}
