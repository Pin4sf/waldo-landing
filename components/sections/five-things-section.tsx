// Five Things — 5-card shuffleable fan.
// Click card area to advance. Auto 8s. Hover pauses.

"use client";

import Image from "next/image";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import vectorSpot        from "@/components/assets/Vector-1.svg";
import goodWeekDarkMode  from "@/components/assets/good-week-dark-mode.svg";
import goodDarkMode      from "@/components/assets/good-dark-mode.svg";
import watchingDarkMode  from "@/components/assets/watching-dark-mode.svg";
import { useCardStack }  from "@/hooks/use-card-stack";
import { EASE, DUR_SETTLE, AUTO_CARD_MS } from "@/lib/motion";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const CARDS = [
  { icon: goodSleepDarkMode, iconW: 89,  iconH: 66, title: "The Constellation", body: "One Spot is a data point. Twelve Spots across four months is a Constellation. The fact that your worst sleep always follows your heaviest meeting days. The fact that your focus peaks in November and dips in March - every year, without fail. Waldo connected these dots for the long term goals.", footnote: "on it while you sleep." },
  { icon: vectorSpot,        iconW: 90,  iconH: 69, title: "The Spot",          body: "Not a trend. Not a report. One thing, clearly said. That's a Spot. Waldo found it in six weeks of Tuesdays and Thursdays that looked ordinary. \n\nYou wouldn't have found it. Spots show up when there's something worth saying. Not before.",                                                    footnote: "something Waldo noticed." },
  { icon: goodWeekDarkMode,  iconW: 100, iconH: 77, title: "The Adjustment",    body: "Not a notification asking if you want to reschedule. Moved. Done. You get a note after the fact.\n\nWaldo doesn't ask. It acts. You stay in charge - you can always undo it - but you usually won't.",                                                                                              footnote: "already moved." },
  { icon: goodDarkMode,      iconW: 77,  iconH: 79, title: "The Patrol",        body: "The Patrol doesn't take breaks.\nWhile you were watching those four episodes on Sunday (the ones you told no one about), The Patrol was noting the time, reading the signal, and adjusting tomorrow's plan.You only see the result.",                                                                 footnote: "on it while you sleep." },
  { icon: watchingDarkMode,  iconW: 99,  iconH: 75, title: "The Daily Brief",   body: "Every morning, one message. Not a dashboard. Not a chart. Not four apps open before your coffee. Waldo tells you what last night meant for today, and what it already did about it.",                                                                                                              footnote: "mornings, sorted." },
] as const;

// 5 slots (back→front). Slot 4 = front/center.
const SLOTS = [
  { rotate: "-23.35deg", opacity: 0.6, blur: "blur(5px)", size: "small",  left: "0px",       top: "19.46px", w: "555.688px", h: "583.576px" },
  { rotate:  "21.92deg", opacity: 0.6, blur: "blur(5px)", size: "small",  left: "455.34px",  top: "21.94px", w: "548.969px", h: "578.609px" },
  { rotate:  "-9.24deg", opacity: 0.8, blur: "blur(3px)", size: "medium", left: "134.54px",  top: "2.7px",   w: "527.986px", h: "577.083px" },
  { rotate:  "11.09deg", opacity: 0.8, blur: "blur(3px)", size: "medium", left: "369.5px",   top: "0px",     w: "510.77px",  h: "582.491px" },
  { rotate:  "0deg",     opacity: 1,   blur: "none",       size: "front",  left: "297.84px",  top: "7.25px",  w: "auto",      h: "auto"      },
] as const;

const T = `all ${DUR_SETTLE}ms ${EASE}`;

export function FiveThingsSection() {
  const { slotOf, offset, onClick, onMouseEnter, onMouseLeave } = useCardStack(CARDS.length, AUTO_CARD_MS);
  const FRONT = SLOTS.length - 1;
  const frontCardIdx = ((CARDS.length - 1 - (offset % CARDS.length)) + CARDS.length) % CARDS.length;

  return (
    <section className="flex flex-col gap-[20px] items-center py-[40px] w-full" style={{ borderRadius: "30px" }}>
      <div
        className="relative shrink-0 cursor-pointer"
        style={{ height: "603.034px", width: "1004.31px" }}
        onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        role="button" aria-label="Card fan — click to advance" tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(e as unknown as React.MouseEvent); } }}
      >
        {CARDS.map((card, i) => {
          const si    = slotOf(i);
          const slot  = SLOTS[si];
          const front = si === FRONT;

          return (
            <div key={i} className="absolute flex items-center justify-center"
              style={{ left: slot.left, top: slot.top, width: slot.w, height: slot.h, zIndex: si + 1, transition: T }}
            >
              <div style={{ transform: `rotate(${slot.rotate})`, opacity: slot.opacity, filter: slot.blur, transition: T }}>
                {front ? (
                  // Front card: full-size, full content, no blur
                  <div
                    className="bg-[#fafaf8] border-[1.5px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
                    style={{ height: "568px", padding: "50px", borderRadius: "20px", width: "409px" }}
                  >
                    <div className="flex flex-col gap-[40px] items-start">
                      <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized />
                      <p className="text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", fontSize: "36px", lineHeight: 1.2 }}>{card.title}</p>
                      <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "23.304px", lineHeight: 1.1, width: "100%" }}>{card.body}</p>
                    </div>
                    <p className="font-medium italic text-[#6b6b68] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: "14.756px", lineHeight: 1.3 }}>{card.footnote}</p>
                  </div>
                ) : slot.size === "medium" ? (
                  <div
                    className="bg-[#fafaf8] border-[1.35px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
                    style={{ height: "511.2px", width: "450px", padding: "45px", borderRadius: "18px" }}
                  >
                    <div className="flex flex-col gap-[36px] items-start">
                      <Image src={card.icon} alt="" width={card.iconW} height={card.iconH} unoptimized />
                      <p className="text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", fontSize: "32.4px", lineHeight: 1.2 }}>{card.title}</p>
                      <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "20.974px", lineHeight: 1.1, width: "361.8px", whiteSpace: "pre-wrap" }}>{card.body}</p>
                    </div>
                    <p className="font-normal italic text-[#717171] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: "12.6px", lineHeight: 1.3 }}>{card.footnote}</p>
                  </div>
                ) : (
                  <div
                    className="bg-[#fafaf8] border-[1.215px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
                    style={{ height: "460.08px", width: "406px", padding: "40.5px", borderRadius: "16.2px" }}
                  >
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
      </div>

      {/* Nav dots */}
      <div className="flex gap-[8px] items-center justify-center">
        {CARDS.map((_, i) => (
          <button
            key={i}
            aria-label={`Card ${i + 1}`}
            onClick={e => { e.stopPropagation(); const steps = ((i - frontCardIdx) % CARDS.length + CARDS.length) % CARDS.length; for (let s = 0; s < steps; s++) onClick(e as unknown as React.MouseEvent); }}
            style={{
              width:        i === frontCardIdx ? "20px" : "6px",
              height:       "6px",
              borderRadius: "3px",
              background:   i === frontCardIdx ? "#1a1a1a" : "rgba(26,26,26,0.2)",
              transition:   "all 0.4s ease",
              border:       "none",
              padding:      0,
              cursor:       "pointer",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[40px] items-center w-full">
        <h2 className="text-[#1a1a1a] text-[48px] text-center" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}>Five things Waldo does<br />while you get on with your day.</h2>
        <p className="text-[#1a1a1a] text-[25px] text-center whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.2 }}>Not just a suggestion or a notification.</p>
        <a href="/waitlist" className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[18px] text-center px-[36px] py-[22px] hover:bg-[#333] hover:scale-[1.02] transition-all" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}>
          Get Started <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
