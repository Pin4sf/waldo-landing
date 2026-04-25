// "With Waldo, this is what you wake up to instead."
// Three cards: The Spot + The Constellation (fanned, blurred) + main morning brief (front).

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Shared card shell for The Spot / The Constellation background cards
function BackgroundCard({
  icon,
  title,
  body,
  footnote,
}: {
  icon: string;
  title: string;
  body: string;
  footnote: string;
}) {
  return (
    <div
      className="bg-[#fafaf8] border-[1.215px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col items-start justify-between overflow-clip"
      style={{
        height: "460.08px",
        width: "406px",
        padding: "40.5px",
        borderRadius: "16.2px",
        filter: "blur(5px)",
      }}
    >
      <div className="flex flex-col gap-[32.4px] items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={icon} style={{ height: "68px", width: "90px", display: "block" }} />
        <p
          className="text-[#1a1a1a] whitespace-nowrap"
          style={{ fontFamily: "var(--font-headline)", fontSize: "29.16px", lineHeight: 1.2 }}
        >
          {title}
        </p>
        <p
          className="text-[#1a1a1a]"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "18.876px",
            lineHeight: 1.1,
            width: "325.62px",
            whiteSpace: "pre-wrap",
          }}
        >
          {body}
        </p>
      </div>
      <p
        className="font-normal italic text-[#717171] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-body)",
          fontVariationSettings: "'opsz' 14",
          fontSize: "11.34px",
          lineHeight: 1.3,
        }}
      >
        {footnote}
      </p>
    </div>
  );
}

export function MorningBriefSection() {
  return (
    <section
      className="flex flex-col gap-[70px] items-center py-[90px] w-full"
      style={{ borderRadius: "30px" }}
    >
      {/* Card fan */}
      <div className="relative shrink-0" style={{ height: "562px", width: "1004px" }}>

        {/* The Constellation — right, rotated, blurred */}
        <div
          className="absolute flex items-center justify-center"
          style={{ height: "538.752px", left: "446px", top: "15px", width: "498.469px" }}
        >
          <div style={{ transform: "rotate(12.8deg)", opacity: 0.6 }}>
            <BackgroundCard
              icon="/figma-assets/icon-constellation.png"
              title="The Constellation"
              body="One Spot is a data point. Twelve Spots across four months is a Constellation. The fact that your worst sleep always follows your heaviest meeting days. Waldo connected these dots for the long term goals."
              footnote="on it while you sleep."
            />
          </div>
        </div>

        {/* The Spot — left, rotated, blurred */}
        <div
          className="absolute flex items-center justify-center"
          style={{ height: "546.077px", left: "43.97px", top: "7.96px", width: "507.436px" }}
        >
          <div style={{ transform: "rotate(-14.26deg)", opacity: 0.6 }}>
            <BackgroundCard
              icon="/figma-assets/icon-spot.png"
              title="The Spot"
              body={`Not a trend. Not a report. One thing, clearly said. That\u2019s a Spot. Waldo found it in six weeks of Tuesdays and Thursdays that looked ordinary.\n\nYou wouldn\u2019t have found it. Spots show up when there\u2019s something worth saying. Not before.`}
              footnote="something Waldo noticed."
            />
          </div>
        </div>

        {/* Morning brief — front card */}
        <div
          className="absolute bg-[#fafaf8] border-[1.701px] border-[rgba(26,26,26,0.16)] border-solid flex flex-col gap-[45.387px] items-start overflow-clip"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: "55.793px",
            borderRadius: "22.687px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/figma-assets/icon-waldo-brief.png"
            style={{ height: "87.343px", width: "112.298px", display: "block" }}
          />
          <div
            className="text-[#1a1a1a]"
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "26.435px",
              lineHeight: 1.1,
              width: "336.414px",
              whiteSpace: "pre-wrap",
            }}
          >
            <p style={{ marginBottom: 0 }}>Morning. Bit of a rough night - your sleep was short by about 90 minutes. </p>
            <p style={{ marginBottom: 0 }}>&nbsp;</p>
            <p style={{ marginBottom: 0 }}>Nudged your 9am to 10:30{" "}<br />{"& 10am to noon."}</p>
            <p style={{ marginBottom: 0 }}>&nbsp;</p>
            <p>Nothing drastic, the rest of your day looks good. </p>
          </div>
          <p
            className="font-medium italic text-[#6b6b68] whitespace-nowrap"
            style={{
              fontFamily: "var(--font-body)",
              fontVariationSettings: "'opsz' 14",
              fontStyle: "italic",
              fontSize: "16.738px",
              lineHeight: 1.3,
            }}
          >
            *cues World Hold On by Bob Sinclair*
          </p>
        </div>
      </div>

      {/* Copy + CTA */}
      <div className="flex flex-col gap-[40px] items-center w-full">
        <h2
          className="text-[#1a1a1a] text-[48px] text-center whitespace-nowrap"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
        >
          With Waldo, this is what{" "}
          <br />
          you wake up to instead.
        </h2>
        <p
          className="font-normal text-[#6b6b68] text-[14px] text-center"
          style={{
            fontFamily: "var(--font-body)",
            fontVariationSettings: "'opsz' 14",
            lineHeight: 1.3,
            width: "455px",
          }}
        >
          It reschedules meetings, reprioritises tasks, and intervenes based on HRV, sleep, and
          circadian patterns - without being asked. You never open a dashboard to manage health.
          Waldo handles it.
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
