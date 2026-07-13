"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import goodWeekDarkMode from "@/components/assets/good-week-dark-mode.svg";
import vectorSpot from "@/components/assets/Vector-1.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";
import { SectionIntro, WaldoCTA } from "@/components/landing-primitives";
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
    title: "Read",
    icon: goodSleepDarkMode,
    iconW: 89,
    iconH: 66,
    body: "Sleep, HRV, recovery, stress, calendar, inbox, and task load. Waldo reads the raw pieces together so a number never sits alone.",
    footnote: "human context first.",
  },
  {
    title: "Decide",
    icon: vectorSpot,
    iconW: 90,
    iconH: 69,
    body: "Recovery, form, weight, signal pressure, focus window, and pattern confidence. Waldo decides what the day can handle before it touches the calendar.",
    footnote: "the read becomes a choice.",
  },
  {
    title: "Do",
    icon: goodWeekDarkMode,
    iconW: 100,
    iconH: 77,
    body: "Move meetings, block time, draft email, create task, prepare brief, update status. The homepage should leave a trail of completed work, not promises.",
    footnote: "receipts, not suggestions.",
  },
  {
    title: "Delegate",
    icon: goodDarkMode,
    iconW: 77,
    iconH: 79,
    body: "Call the research agent, ask the scheduling agent, request a writing pass, route the returned draft. Waldo gives other agents the human context they were missing.",
    footnote: "agent work with a pulse.",
  },
  {
    title: "Remember",
    icon: watchingDarkMode,
    iconW: 99,
    iconH: 75,
    body: "Spots, Constellations, undo learning, and account boundaries. Waldo remembers what helped, what annoyed you, and what should stay separated.",
    footnote: "the long game compounds.",
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

const footerLinks = [
  ["Brief", "#brief"],
  ["Actions", "#action-fan"],
  ["Security", "#security"],
  ["Pattern", "#constellation"],
] as const;

const closeHeadlineCopy = "Your health isn’t going to fix itself.";
const closePrimaryCopy = "Get Waldo. Free to start. Works with the device you own.";
const closeSecondaryCopy = "And then you'll be the one they're looking out for.";

function FooterScenePicture({
  className,
  imageClassName,
  style,
  breathing = false,
}: {
  className: string;
  imageClassName: string;
  style?: CSSProperties;
  breathing?: boolean;
}) {
  return (
    <picture className={className} style={style}>
      <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
      <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
      <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
      <img
        src="/assets/footer-bg.svg"
        alt=""
        aria-hidden="true"
        className={`${breathing ? "waldo-breathe " : ""}${imageClassName}`}
      />
    </picture>
  );
}

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
        <Image
          src={card.icon}
          alt=""
          width={card.iconW}
          height={card.iconH}
          className="waldo-mascot-consistent h-auto max-h-20 w-auto"
        />
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
            <p>Read the day, decide what can move, do the work, delegate the rest, and remember what helped.</p>
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

  const depth = 1 - progress;
  const sceneShift = depth * 18;
  const contentShift = depth * -8;

  return (
    <section
      ref={ref}
      id="scene-close"
      className="new-scene-close-section relative w-screen self-start overflow-hidden bg-[#f4f3f0] text-[var(--ink)] [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 select-none bg-[#f4f3f0]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[30svh] bg-gradient-to-b from-[#f4f3f0] via-[#f4f3f0]/70 to-transparent"
      />
      <FooterScenePicture
        className="new-scene-close-art pointer-events-none absolute inset-0 z-[2] block h-full w-full select-none"
        imageClassName="block h-full w-full"
        style={{
          transform: `translate3d(0, ${sceneShift}px, 0)`,
          willChange: "transform",
        }}
        breathing
      />

      <div
        className="new-scene-close-copy-zone relative z-[3] mx-auto flex max-w-[1200px] flex-col items-center justify-start px-4 text-center sm:px-6 lg:px-10"
        data-animate="blur-fade"
        style={{ transform: `translate3d(0, ${contentShift}px, 0)`, willChange: "transform" }}
      >
        <h2 className="new-scene-close-title text-[var(--ink)]" data-animate="headline" aria-label={closeHeadlineCopy}>
          Your health isn’t
          <br />
          going to fix itself.
        </h2>
        <p className="new-scene-close-copy">
          {closePrimaryCopy}
          <br />
          {closeSecondaryCopy}
        </p>
        <div className="new-scene-close-actions mt-6">
          <WaldoCTA />
        </div>
      </div>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] px-4 pb-5 pt-20 text-[var(--ink)] sm:px-6 sm:pb-6 lg:px-10">
        <div
          className="pointer-events-auto mx-auto grid max-w-[1200px] gap-5 border-t border-white/25 pt-4 sm:grid-cols-[1fr_auto] sm:items-end"
        >
          <div>
            <p className="type-label text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.42)]">Waldo</p>
            <p className="type-caption mt-2 max-w-[28rem] text-white/76 drop-shadow-[0_1px_2px_rgba(0,0,0,0.48)]">Quietly reads the day, changes what can move, and leaves the important work intact.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end" aria-label="Footer navigation">
            {footerLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="type-caption rounded-full border border-white/18 bg-[rgba(26,26,26,0.68)] px-3 py-2 text-white/76 backdrop-blur-[2px] transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-white/34 hover:bg-[rgba(26,26,26,0.82)] hover:text-white"
              >
                {label}
              </a>
            ))}
            <span className="type-caption rounded-full border border-white/12 bg-[rgba(26,26,26,0.48)] px-3 py-2 text-white/54 backdrop-blur-[2px]">(c) 2026</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
