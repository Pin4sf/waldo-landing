"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import goodWeekDarkMode from "@/components/assets/good-week-dark-mode.svg";
import roughDarkMode from "@/components/assets/rough-dark-mode.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";
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

export function ActionFanSection() {
  const { slotOf, frontIndex, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useCardStack(fanCards.length, AUTO_CARD_MS);
  const frontCard = fanCards[frontIndex];

  return (
    <section id="action-fan" className="section-shell scroll-mt-28 flex flex-col gap-8 py-6 lg:gap-10 lg:py-8">
      <div data-animate="blur-fade">
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
      </div>

      <div className="lg:hidden" data-animate="blur-fade" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={onClick}>
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
        data-animate="blur-fade"
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

export function SceneCloseSection() {
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

      <div className="relative z-[2] flex min-h-[760px] flex-col items-center justify-start px-4 pt-28 text-center" data-animate="blur-fade">
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
