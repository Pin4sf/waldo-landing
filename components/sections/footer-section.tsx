// Footer — "Your health isn't going to fix itself."
// Text in normal flow, illustration full-width at bottom in normal flow.
// Gradient covers the whole footer as a background.

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(255,140,0,0.9) 0%, rgba(255,185,5,0.85) 18%, rgba(255,242,0,0) 72%), #f4f3f0",
      }}
    >
      {/* Copy + CTA — centered, sits above the illustration */}
      <div className="flex flex-col gap-[60px] items-center pt-[140px] pb-[60px] px-4">
        <div className="flex flex-col gap-[50px] items-center w-full">
          <p
            className="font-medium italic text-[#6b6b68] text-[14px] whitespace-nowrap"
            style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
          >
            you&apos;re not the first. you&apos;re also not too late. yet.
          </p>

          <div
            className="flex flex-col gap-[40px] items-center text-[#1a1a1a] text-center"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            <p className="text-[48px] max-w-[422px]" style={{ lineHeight: 1.1 }}>
              Your health isn&apos;t going to fix itself.
            </p>
            <div className="text-[25px]" style={{ lineHeight: 1.2 }}>
              <p style={{ marginBottom: 0 }}>Waldo already knows what&apos;s wrong.</p>
              <p>You just have to let it in.</p>
            </div>
          </div>

          <a
            href="/waitlist"
            className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[18px] px-[36px] py-[22px] hover:bg-[#333] transition-colors whitespace-nowrap"
            style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}
          >
            Get Started
            <ArrowRightIcon />
          </a>
        </div>

        {/* Legal links */}
        <div
          className="flex gap-[30px] items-start font-normal text-[#6b6b68] text-[10px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          <span>[Privacy Policy]</span>
          <span>[Contact]</span>
          <span>© 2026 Waldo</span>
        </div>
      </div>

      {/* Illustration — full-width, anchored to bottom in normal flow */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/footer-bg.svg"
        alt=""
        aria-hidden="true"
        className="w-full block pointer-events-none select-none"
        style={{ display: "block", marginBottom: 0 }}
      />
    </footer>
  );
}
