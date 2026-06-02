import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const type = {
  label: {
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  caption: {
    fontFamily: "var(--font-body)",
    fontSize: "0.75rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  aside: {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontStyle: "oblique 10deg",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.3,
  },
  body: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
  },
  data: {
    fontFamily: "var(--font-body)",
    fontVariantNumeric: "tabular-nums",
    fontWeight: 500,
    letterSpacing: "-0.01em",
  },
} satisfies Record<string, CSSProperties>;

function SlackCard() {
  return (
    <div className="absolute left-[6%] top-[18%] z-20 hidden w-[236px] -rotate-[9deg] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] px-5 py-4 shadow-[0_22px_46px_rgba(26,26,26,0.16)] md:block">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#1A1A1A]/25" />
        <span className="text-[#6B6B68]" style={type.label}>
          Slack
        </span>
        <span className="ml-auto text-[#9A9A96]" style={{ ...type.data, fontSize: "0.75rem", lineHeight: 1.3 }}>
          +49
        </span>
      </div>
      <p className="mt-3 text-[#1A1A1A]" style={type.label}>
        Q1 review thread arrived late.
      </p>
      <p className="mt-2 text-[#9A9A96]" style={type.aside}>
        low urgency; morning stays protected.
      </p>
    </div>
  );
}

function RecoveryBadge() {
  const size = 126;
  const radius = 48;
  const stroke = 12;
  const value = 63;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="absolute left-1/2 top-[12%] z-20 block w-[184px] -translate-x-1/2 rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-4 shadow-[0_22px_46px_rgba(26,26,26,0.16)] sm:left-[58%] sm:top-[10%] lg:left-auto lg:right-[20%] lg:top-[8%] lg:translate-x-0">
      <div className="mx-auto flex h-[126px] w-[126px] items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(26,26,26,0.08)]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Recovery 63 percent, rested enough to push today.">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#22C55E"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
            strokeWidth={stroke}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <circle cx={size / 2} cy={size / 2} r={30} fill="#FAFAF8" stroke="rgba(26,26,26,0.08)" strokeWidth="1" />
          <text
            x={size / 2}
            y={size / 2 - 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#1A1A1A"
            style={{ ...type.data, fontSize: "1.5rem", lineHeight: 1 }}
          >
            63%
          </text>
          <text
            x={size / 2}
            y={size / 2 + 22}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#6B6B68"
            style={{ ...type.caption, fontWeight: 500 }}
          >
            Recovery
          </text>
        </svg>
      </div>
      <p className="mt-3 text-center text-[#9A9A96]" style={type.aside}>
        rested enough to push today.
      </p>
    </div>
  );
}

function FormTile() {
  return (
    <div className="absolute right-[13.8%] top-[13.2%] z-20 hidden w-[132px] rotate-[13deg] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-4 shadow-[0_18px_36px_rgba(26,26,26,0.14)] lg:block">
      <p className="text-[#6B6B68]" style={type.label}>
        Form
      </p>
      <p className="mt-2 text-[#1A1A1A]" style={{ ...type.data, fontSize: "1.5rem", lineHeight: 1.1 }}>
        76
      </p>
      <p className="mt-2 text-[#9A9A96]" style={type.aside}>
        steady; keep the 3pm.
      </p>
    </div>
  );
}

function StressTile() {
  const points = "4,36 16,31 24,18 34,23 44,12 53,18 64,10";

  return (
    <div className="absolute right-[5.8%] top-[10.2%] z-20 hidden w-[116px] -rotate-[5deg] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] p-3 shadow-[0_18px_36px_rgba(26,26,26,0.14)] lg:block">
      <svg viewBox="0 0 70 46" className="h-[46px] w-full" aria-hidden="true">
        {[12, 24, 36, 48, 60].map((x) => (
          <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="44" stroke="rgba(26,26,26,0.08)" strokeWidth="1" />
        ))}
        {[11, 22, 33].map((y) => (
          <line key={`h-${y}`} x1="0" x2="70" y1={y} y2={y} stroke="rgba(26,26,26,0.08)" strokeWidth="1" />
        ))}
        <polyline points={points} fill="none" stroke="#6B6B68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="text-[#6B6B68]" style={type.label}>
          Stress
        </span>
        <span className="text-[#1A1A1A]" style={{ ...type.data, fontSize: "0.875rem", lineHeight: 1.2 }}>
          0.58
        </span>
      </div>
      <p className="mt-1 text-[#9A9A96]" style={type.aside}>
        climb watched.
      </p>
    </div>
  );
}

function ActivityCard() {
  const bars = [12, 22, 15, 30, 36, 18, 42, 24, 38, 28, 44, 18, 32, 52, 24, 39, 20, 45, 36, 30, 48, 18];

  return (
    <div className="absolute right-[6.5%] top-[25.5%] z-20 hidden w-[206px] rotate-[10deg] rounded-[24px] border border-[rgba(26,26,26,0.08)] bg-[#FAFAF8] px-4 py-3 shadow-[0_22px_46px_rgba(26,26,26,0.16)] sm:block lg:hidden xl:block">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[#6B6B68]" style={type.label}>
          Motion
        </p>
        <p className="text-[#1A1A1A]" style={{ ...type.data, fontSize: "1.25rem", lineHeight: 1.1 }}>
          4,200
        </p>
      </div>
      <p className="mt-1 text-[#9A9A96]" style={type.aside}>
        enough movement; no pull.
      </p>
      <div className="mt-3 grid h-[44px] grid-cols-[repeat(22,minmax(0,1fr))] items-end gap-[2px] border-b border-[rgba(26,26,26,0.08)]">
        {bars.map((height, index) => (
          <span
            key={index}
            className="rounded-t-[2px]"
            style={{
              height,
              backgroundColor: index % 3 === 0 ? "#C4C3BF" : index % 3 === 1 ? "#9A9A96" : "#E8E6E0",
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[#9A9A96]" style={type.caption}>
        <span>morning</span>
        <span>midday</span>
        <span>evening</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-[760px] overflow-hidden bg-[#F4F3F0] sm:min-h-[820px] lg:min-h-0"
      style={{
        aspectRatio: "1440 / 989",
        borderRadius: 0,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        width: "100vw",
      }}
    >
      <Image
        src="/assets/hero-bg.svg"
        alt=""
        fill
        priority
        sizes="(max-width: 1440px) calc(100vw - 40px), 1440px"
        className="pointer-events-none select-none object-fill"
      />

      <SlackCard />
      <RecoveryBadge />
      <FormTile />
      <StressTile />
      <ActivityCard />

      <div className="absolute left-1/2 top-[30.5%] z-20 w-[8.2%] min-w-[86px] max-w-[134px] -translate-x-1/2 lg:top-[24%] xl:top-[30.5%]">
        <Image
          src="/illustrations/default.svg"
          alt="Waldo"
          width={169}
          height={131}
          priority
          className="h-auto w-full drop-shadow-[0_7px_0_rgba(255,255,255,0.68)]"
        />
      </div>

      <div className="absolute left-1/2 top-[42%] z-20 flex w-[min(86%,780px)] -translate-x-1/2 flex-col items-center text-center sm:top-[50%] lg:top-[38%] xl:top-[48%]">
        <h1
          data-animate="headline"
          className="text-[#1A1A1A]"
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(2.25rem,1rem + 5vw,3.875rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.06,
          }}
        >
          The first app that knows
          <br />
          how you feel and does
          <br />
          something about it.
        </h1>

        <div className="mt-6 max-w-[58ch] text-[#6B6B68] sm:mt-8" style={type.body}>
          <p>Waldo monitors your health wearable 24/7 and understands what your body is actually telling you.</p>
          <p className="mt-1 font-medium text-[#1A1A1A]">Then it does something about it.</p>
          <p className="mt-3 text-[#9A9A96]" style={type.aside}>
            Your schedule. Your meals. Your sleep. Your stress. All of it.
          </p>
        </div>

        <Link
          href="/waitlist"
          className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#1A1A1A] px-9 text-[16px] font-medium text-[#FAFAF8] shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.05)] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-px hover:bg-[#272725] active:scale-[0.98] sm:mt-10"
          style={{ fontFamily: "var(--font-body)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
        >
          Let Waldo in →
        </Link>
      </div>
    </section>
  );
}
