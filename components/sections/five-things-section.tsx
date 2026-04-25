// "Five things Waldo does while you get on with your day."
// Five cards in a fanned/stacked arrangement — The Daily Brief is front and center.

import Image from "next/image";
import goodSleepDarkMode from "@/components/assets/good-sleep-dark-mode.svg";
import vectorSpot from "@/components/assets/Vector-1.svg";
import roughDarkMode from "@/components/assets/rough-dark-mode.svg";
import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SmallBackCard({ icon, iconW, iconH, title, body, footnote }: { icon: string; iconW: number; iconH: number; title: string; body: string; footnote: string }) {
  return (
    <div
      className="bg-[#fafaf8] border-[1.215px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
      style={{ height: "460.08px", width: "406px", padding: "40.5px", borderRadius: "16.2px", filter: "blur(5px)" }}
    >
      <div className="flex flex-col gap-[32.4px] items-start">
        <Image src={icon} alt="" width={iconW} height={iconH} unoptimized />
        <p className="text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", fontSize: "29.16px", lineHeight: 1.2 }}>{title}</p>
        <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "18.876px", lineHeight: 1.1, width: "325.62px" }}>{body}</p>
      </div>
      <p className="font-normal italic text-[#717171] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: "11.34px", lineHeight: 1.3 }}>{footnote}</p>
    </div>
  );
}

function MediumBackCard({ icon, iconW, iconH, title, body, footnote }: { icon: string; iconW: number; iconH: number; title: string; body: string; footnote: string }) {
  return (
    <div
      className="bg-[#fafaf8] border-[1.35px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
      style={{ height: "511.2px", width: "450px", padding: "45px", borderRadius: "18px", filter: "blur(3px)" }}
    >
      <div className="flex flex-col gap-[36px] items-start">
        <Image src={icon} alt="" width={iconW} height={iconH} unoptimized />
        <p className="text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", fontSize: "32.4px", lineHeight: 1.2 }}>{title}</p>
        <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "20.974px", lineHeight: 1.1, width: "361.8px", whiteSpace: "pre-wrap" }}>{body}</p>
      </div>
      <p className="font-normal italic text-[#717171] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: "12.6px", lineHeight: 1.3 }}>{footnote}</p>
    </div>
  );
}

export function FiveThingsSection() {
  return (
    <section className="flex flex-col gap-[40px] items-center py-[90px] w-full" style={{ borderRadius: "30px" }}>

      {/* Fanned cards */}
      <div className="relative shrink-0" style={{ height: "603.034px", width: "1004.31px" }}>

        {/* The Constellation — far right */}
        <div className="absolute flex items-center justify-center" style={{ height: "578.609px", left: "455.34px", top: "21.94px", width: "548.969px" }}>
          <div style={{ transform: "rotate(21.92deg)", opacity: 0.6 }}>
            <SmallBackCard icon={goodSleepDarkMode} iconW={89} iconH={66} title="The Constellation" body="One Spot is a data point. Twelve Spots across four months is a Constellation. The fact that your worst sleep always follows your heaviest meeting days." footnote="on it while you sleep." />
          </div>
        </div>

        {/* The Spot — far left */}
        <div className="absolute flex items-center justify-center" style={{ height: "583.576px", left: 0, top: "19.46px", width: "555.688px" }}>
          <div style={{ transform: "rotate(-23.35deg)", opacity: 0.6 }}>
            <SmallBackCard icon={vectorSpot} iconW={90} iconH={69} title="The Spot" body={`Not a trend. Not a report. One thing, clearly said. That\u2019s a Spot. Waldo found it in six weeks of Tuesdays and Thursdays that looked ordinary.\n\nYou wouldn\u2019t have found it.`} footnote="something Waldo noticed." />
          </div>
        </div>

        {/* The Adjustment — left of center */}
        <div className="absolute flex items-center justify-center" style={{ height: "577.083px", left: "134.54px", top: "2.7px", width: "527.986px" }}>
          <div style={{ transform: "rotate(-9.24deg)", opacity: 0.8 }}>
            <MediumBackCard icon={roughDarkMode} iconW={100} iconH={77} title="The Adjustment" body={`Not a notification asking if you want to reschedule. Moved. Done. You get a note after the fact.\n\nWaldo doesn\u2019t ask. It acts. You stay in charge - you can always undo it - but you usually won\u2019t.`} footnote="already moved." />
          </div>
        </div>

        {/* The Patrol — right of center */}
        <div className="absolute flex items-center justify-center" style={{ height: "582.491px", left: "369.5px", top: 0, width: "510.77px" }}>
          <div style={{ transform: "rotate(11.09deg)", opacity: 0.8 }}>
            <MediumBackCard icon={goodDarkMode} iconW={77} iconH={79} title="The Patrol" body={`The Patrol doesn\u2019t take breaks.\nWhile you were watching those four episodes on Sunday (the ones you told no one about), The Patrol was noting the time, reading the signal, and adjusting tomorrow\u2019s plan.`} footnote="on it while you sleep." />
          </div>
        </div>

        {/* The Daily Brief — front card */}
        <div
          className="absolute bg-[#fafaf8] border-[1.5px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
          style={{ height: "568px", left: "297.84px", top: "7.25px", padding: "50px", borderRadius: "20px" }}
        >
          <div className="flex flex-col gap-[40px] items-start">
            <Image src={watchingDarkMode} alt="" width={99} height={75} unoptimized />
            <p className="text-[#1a1a1a] whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", fontSize: "36px", lineHeight: 1.2 }}>The Daily Brief</p>
            <p className="text-[#1a1a1a]" style={{ fontFamily: "var(--font-headline)", fontSize: "23.304px", lineHeight: 1.1, width: "347px" }}>
              Every morning, one message. Not a dashboard. Not a chart. Not four apps open before your coffee. Waldo tells you what last night meant for today, and what it already did about it.
            </p>
          </div>
          <p className="font-medium italic text-[#6b6b68] whitespace-nowrap" style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "italic", fontSize: "14.756px", lineHeight: 1.3 }}>
            mornings, sorted.
          </p>
        </div>
      </div>

      {/* Copy + CTA */}
      <div className="flex flex-col gap-[40px] items-center w-full">
        <h2 className="text-[#1a1a1a] text-[48px] text-center" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}>
          Five things Waldo does<br />while you get on with your day.
        </h2>
        <p className="text-[#1a1a1a] text-[25px] text-center whitespace-nowrap" style={{ fontFamily: "var(--font-headline)", lineHeight: 1.2 }}>
          Not just a suggestion or a notification.
        </p>
        <a
          href="/waitlist"
          className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[18px] text-center px-[36px] py-[22px] hover:bg-[#333] transition-colors"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}
        >
          Get Started
          <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
