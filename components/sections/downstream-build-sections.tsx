"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import goodWeekDarkMode from "@/components/assets/good-week-dark-mode.svg";
import vectorSpot from "@/components/assets/Vector-1.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";
import { Aside, SectionIntro, WaldoCTA } from "@/components/landing-primitives";
import { MobileDots } from "@/components/mobile-dots";
import { useCardStack } from "@/hooks/use-card-stack";
import { AUTO_CARD_MS, DUR_SETTLE, EASE } from "@/lib/motion";

type FanCard = {
  title: string;
  icon: StaticImageData;
  iconW: number;
  iconH: number;
  body: string;
  footnote: string;
};

const fanCards: FanCard[] = [
  {
    title: "The Constellation",
    icon: goodSleepDarkMode,
    iconW: 89,
    iconH: 66,
    body: "One Spot is a data point. Twelve Spots across four months is a Constellation. The fact that your worst sleep always follows your heaviest meeting days. The fact that your focus peaks in November and dips in March - every year, without fail. Waldo connected these dots for the long term goals.",
    footnote: "on it while you sleep.",
  },
  {
    title: "The Spot",
    icon: vectorSpot,
    iconW: 90,
    iconH: 69,
    body: "Not a trend. Not a report. One thing, clearly said. That's a Spot. Waldo found it in six weeks of Tuesdays and Thursdays that looked ordinary.\n\nYou wouldn't have found it. Spots show up when there's something worth saying. Not before.",
    footnote: "something Waldo noticed.",
  },
  {
    title: "The Adjustment",
    icon: goodWeekDarkMode,
    iconW: 100,
    iconH: 77,
    body: "Not a notification asking if you want to reschedule. Moved. Done. You get a note after the fact.\n\nWaldo doesn't ask. It acts. You stay in charge - you can always undo it - but you usually won't.",
    footnote: "already moved.",
  },
  {
    title: "The Patrol",
    icon: goodDarkMode,
    iconW: 77,
    iconH: 79,
    body: "The Patrol doesn't take breaks.\nWhile you were watching those four episodes on Sunday (the ones you told no one about), The Patrol was noting the time, reading the signal, and adjusting tomorrow's plan. You only see the result.",
    footnote: "on it while you sleep.",
  },
  {
    title: "The Daily Brief",
    icon: watchingDarkMode,
    iconW: 99,
    iconH: 75,
    body: "Every morning, one message. Not a dashboard. Not a chart. Not four apps open before your coffee. Waldo tells you what last night meant for today, and what it already did about it.",
    footnote: "mornings, sorted.",
  },
];

const fanSlots = [
  { rotate: "-23.35deg", opacity: 0.6, blur: "blur(5px)", size: "small", left: "0px", top: "19px", w: "556px", h: "584px" },
  { rotate: "21.92deg", opacity: 0.6, blur: "blur(5px)", size: "small", left: "455px", top: "22px", w: "549px", h: "579px" },
  { rotate: "-9.24deg", opacity: 0.8, blur: "blur(3px)", size: "medium", left: "135px", top: "3px", w: "528px", h: "577px" },
  { rotate: "11.09deg", opacity: 0.8, blur: "blur(3px)", size: "medium", left: "370px", top: "0px", w: "511px", h: "582px" },
  { rotate: "0deg", opacity: 1, blur: "none", size: "front", left: "298px", top: "7px", w: "409px", h: "568px" },
] as const;

const cardTransition = `all ${DUR_SETTLE}ms ${EASE}`;

function FanStackCard({ card, size }: { card: FanCard; size: "small" | "medium" | "front" }) {
  const front = size === "front";
  const medium = size === "medium";

  return (
    <article
      className="flex h-full w-full flex-col justify-between overflow-hidden border border-[rgba(26,26,26,0.16)] bg-[var(--surface-t2)]"
      style={{
        borderRadius: front ? 20 : medium ? 18 : 16,
        padding: front ? 50 : medium ? 45 : 40,
      }}
    >
      <div>
        <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized className="h-auto max-h-20 w-auto" />
        <h3 className={front ? "mt-10 text-[36px] leading-[1.2] text-[var(--ink)]" : medium ? "mt-9 text-[32px] leading-[1.2] text-[var(--ink)]" : "mt-8 text-[29px] leading-[1.2] text-[var(--ink)]"}>
          {card.title}
        </h3>
        <p className={front ? "mt-7 text-[23px] leading-[1.1] text-[var(--ink)]" : medium ? "mt-6 text-[21px] leading-[1.1] text-[var(--ink)]" : "mt-5 text-[19px] leading-[1.1] text-[var(--ink)]"} style={{ whiteSpace: "pre-wrap" }}>
          {card.body}
        </p>
      </div>
      <p className={front ? "mt-8 text-[15px] font-medium italic leading-[1.3] text-[var(--text-secondary)]" : "mt-6 text-[12px] italic leading-[1.3] text-[var(--text-tertiary)]"}>
        {card.footnote}
      </p>
    </article>
  );
}

export function ActionFanSection() {
  const { slotOf, frontIndex, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useCardStack(fanCards.length, AUTO_CARD_MS);
  const frontCard = fanCards[frontIndex];

  return (
    <section id="action-fan" className="relative z-10 w-screen shrink-0 max-w-none scroll-mt-28 overflow-visible bg-[var(--surface-t3)] pt-10 pb-24 sm:pt-12 sm:pb-28 lg:pt-16 lg:pb-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-48 h-48 bg-[var(--surface-t3)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-32 h-32 bg-[var(--surface-t3)]" />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 sm:px-6 lg:gap-12 lg:px-10">
        <div className="relative z-[1]" data-animate="blur-fade">
          <SectionIntro
            title={
              <>
                Five things Waldo does
                <br />
                while you get on with your day.
              </>
            }
            aside="not just a suggestion or a notification."
          >
            <p>Cards shuffle with the same calm, tactile rhythm as the deployed build.</p>
          </SectionIntro>
        </div>

        <div className="relative z-[1] lg:hidden" data-animate="blur-fade" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={onClick}>
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
          className="relative z-[1] mx-auto hidden h-[604px] w-[1004px] max-w-full cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--action)] lg:block"
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
                className="absolute flex items-center justify-center"
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
                    width: "100%",
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
