// Morning Brief — 3-card shuffleable stack.
// Click card area to advance. Auto 8s. Hover pauses.

"use client";

import Image from "next/image";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import vectorSpot        from "@/components/assets/Vector-1.svg";
import vectorBrief       from "@/components/assets/Vector.svg";
import { useCardStack }  from "@/hooks/use-card-stack";
import { MobileDots }   from "@/components/mobile-dots";
import { EASE, DUR_SETTLE, AUTO_CARD_MS } from "@/lib/motion";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const CARDS = [
  { icon: vectorSpot,        iconW: 90,  iconH: 69, title: "The Spot",          body: "Not a trend. Not a report. One thing, clearly said. That's a Spot. Waldo found it in six weeks of Tuesdays and Thursdays that looked ordinary.\n\nYou wouldn't have found it. Spots show up when there's something worth saying. Not before.",  footnote: "something Waldo noticed." },
  { icon: goodSleepDarkMode, iconW: 89,  iconH: 66, title: "The Constellation", body: "One Spot is a data point. Twelve Spots across four months is a Constellation. The fact that your worst sleep always follows your heaviest meeting days. Waldo connected these dots for the long term goals.",                                       footnote: "on it while you sleep." },
  { icon: vectorBrief,       iconW: 112, iconH: 87, title: "Morning Wag",        body: "Morning. Bit of a rough night — your sleep was short by about 90 minutes. \n\nNudged your 9am to 10:30 & 10am to noon.\n\nNothing drastic, the rest of your day looks good. ",                                                                    footnote: "*cues World Hold On by Bob Sinclair*" },
] as const;

const BACK: { rotate: string; left: string; top: string }[] = [
  { rotate: "-14.26deg", left: "43.97px", top: "7.96px" },
  { rotate:  "12.80deg", left: "446px",   top: "15px"   },
];

const T = `all ${DUR_SETTLE}ms ${EASE}`;

export function MorningBriefSection() {
  const { slotOf, offset, frontIndex, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } = useCardStack(CARDS.length, AUTO_CARD_MS);
  const FRONT = CARDS.length - 1;
  const frontCardIdx = frontIndex;
  const frontCard = CARDS[frontCardIdx];

  return (
    <section className="flex flex-col gap-[70px] items-center py-[90px] w-full" style={{ borderRadius: "30px" }}>
      {/* Mobile: single card + swipe */}
      <div className="lg:hidden w-full px-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={onClick}>
        <div className="bg-[#fafaf8] border-[1.5px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col gap-[24px] items-start overflow-clip mx-auto" style={{ padding: "28px", borderRadius: "20px", maxWidth: "440px" }}>
          <Image src={frontCard.icon} alt="" width={frontCard.iconW} height={frontCard.iconH} unoptimized />
          <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "22px", lineHeight: 1.1, whiteSpace: "pre-wrap" }}>{frontCard.body}</p>
          <p className="font-medium italic text-[#6b6b68]" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: "14px", lineHeight: 1.3 }}>{frontCard.footnote}</p>
        </div>
        <MobileDots count={CARDS.length} current={frontCardIdx} />
      </div>

      {/* Desktop: fan stack */}
      <div
        className="hidden lg:block relative shrink-0 cursor-pointer"
        style={{ height: "562px", width: "1004px" }}
        onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        role="button" aria-label="Card stack — click to advance" tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e as unknown as React.MouseEvent); } }}
      >
        {CARDS.map((card, i) => {
          const si    = slotOf(i);
          const front = si === FRONT;
          const b     = BACK[si];
          return (
            <div key={i} className="absolute flex items-center justify-center"
              style={{ ...(front ? { left: "50%", top: "50%", transform: "translate(-50%,-50%)" } : { left: b.left, top: b.top, width: "507.436px", height: "538.752px" }), zIndex: si + 1, transition: T }}
            >
              <div style={{ transform: front ? "none" : `rotate(${b.rotate})`, opacity: front ? 1 : 0.6, filter: front ? "none" : "blur(5px)", transition: T }}>
                {front ? (
                  <div className="bg-[#fafaf8] border-[1.701px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col gap-[45.387px] items-start overflow-clip" style={{ padding: "55.793px", borderRadius: "22.687px" }}>
                    <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized />
                    <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "26.435px", lineHeight: 1.1, width: "336.414px", whiteSpace: "pre-wrap" }}>{card.body}</p>
                    <p className="font-medium italic text-[#6b6b68] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: "16.738px", lineHeight: 1.3 }}>{card.footnote}</p>
                  </div>
                ) : (
                  <div className="bg-[#fafaf8] border-[1.215px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip" style={{ height: "460.08px", width: "406px", padding: "40.5px", borderRadius: "16.2px" }}>
                    <div className="flex flex-col gap-[32.4px] items-start">
                      <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized />
                      <p className="text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", fontSize: "29.16px", lineHeight: 1.2 }}>{card.title}</p>
                      <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "18.876px", lineHeight: 1.1, width: "325.62px", whiteSpace: "pre-wrap" }}>{card.body}</p>
                    </div>
                    <p className="font-normal italic text-[#717171] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: "11.34px", lineHeight: 1.3 }}>{card.footnote}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>  {/* end desktop fan */}

      {/* Desktop nav dots */}
      <div className="hidden lg:flex gap-[8px] items-center justify-center">
        {CARDS.map((_, i) => (
          <button
            key={i}
            aria-label={`Card ${i + 1}`}
            onClick={e => { e.stopPropagation(); const steps = ((i - frontCardIdx) % CARDS.length + CARDS.length) % CARDS.length; for (let s = 0; s < steps; s++) onClick(e as unknown as React.MouseEvent); }}
            style={{ width: i === frontCardIdx ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === frontCardIdx ? "#1a1a1a" : "rgba(26,26,26,0.2)", transition: "all 0.4s ease", border: "none", padding: 0, cursor: "pointer" }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[40px] items-center w-full">
        <h2 data-animate="headline" className="text-[#1a1a1a] text-[32px] lg:text-[48px] text-center px-4 lg:px-0" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}>With Waldo, this is what{" "}<br />you wake up to instead.</h2>
        <p data-animate="fade-up" className="font-normal text-[#6b6b68] text-[14px] text-center px-6 lg:px-0" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3, maxWidth: "455px" }}>
          It reschedules meetings, reprioritises tasks, and intervenes based on HRV, sleep, and circadian patterns - without being asked. You never open a dashboard to manage health. Waldo handles it.
        </p>
        <a href="/waitlist" className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[18px] text-center px-[36px] py-[22px] hover:bg-[#333] hover:scale-[1.02] transition-all" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}>
          Get Started <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
