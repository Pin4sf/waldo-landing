import Image from "next/image";
import type { CSSProperties } from "react";

type PositionedItem = {
  className: string;
  label: string;
};

type EventChip = PositionedItem & {
  icon?: "caffeine" | "load" | "weight";
  src?: string;
  width?: number;
  height?: number;
};

type LongGameSpotDot = {
  cx: number;
  cy: number;
  opacity?: number;
  r: number;
};

const longGameCategoryChips: PositionedItem[] = [
  { label: "Cognitive Stress", className: "new-long-game-category-cognitive" },
  { label: "Sleep Pattern", className: "new-long-game-category-sleep" },
  { label: "Training Style", className: "new-long-game-category-training" },
  { label: "Work Flow", className: "new-long-game-category-work" },
  { label: "Meals", className: "new-long-game-category-meals" },
];

const longGameEventChips: EventChip[] = [
  {
    label: "Stress shot up",
    className: "new-long-game-event-stress",
    src: "/assets/home/long-game-stress-shot-up.svg",
    width: 120,
    height: 29,
  },
  {
    label: "Sleep Compromised",
    className: "new-long-game-event-sleep",
    src: "/assets/home/long-game-sleep-compromised.svg",
    width: 155,
    height: 29,
  },
  {
    label: "HRV Dipped",
    className: "new-long-game-event-hrv",
    src: "/assets/home/long-game-hrv-dipped.svg",
    width: 106,
    height: 29,
  },
  { label: "Load Collapsed", className: "new-long-game-event-load", icon: "load" },
  { label: "Weight Intensified", className: "new-long-game-event-weight", icon: "weight" },
  {
    label: "Form Crash",
    className: "new-long-game-event-form",
    src: "/assets/home/long-game-form-crash.svg",
    width: 103,
    height: 29,
  },
  { label: "Excess Caffeine", className: "new-long-game-event-caffeine", icon: "caffeine" },
];

const longGameSpotDots: LongGameSpotDot[] = [
  { cx: 504.5, cy: 208.8, r: 5.2, opacity: 0.4 },
  { cx: 515.8, cy: 209.9, r: 3.2, opacity: 0.4 },
  { cx: 499.4, cy: 218.8, r: 3.2, opacity: 0.4 },
  { cx: 451.1, cy: 209.4, r: 5.8 },
  { cx: 400, cy: 203.6, r: 5.8, opacity: 0.4 },
  { cx: 403, cy: 178.8, r: 5.8, opacity: 0.4 },
  { cx: 420.4, cy: 162.8, r: 5.8, opacity: 0.4 },
  { cx: 458.4, cy: 170, r: 5.8, opacity: 0.4 },
  { cx: 426.6, cy: 191, r: 12.1, opacity: 0.4 },
  { cx: 451.1, cy: 187.5, r: 5.8 },
  { cx: 415.3, cy: 210.1, r: 3.6 },
  { cx: 448.9, cy: 227.6, r: 3.6, opacity: 0.4 },
  { cx: 441.6, cy: 169.3, r: 3.6, opacity: 0.4 },
  { cx: 462, cy: 198.4, r: 3.6, opacity: 0.4 },
  { cx: 405.1, cy: 160.6, r: 3.6, opacity: 0.4 },
  { cx: 435.7, cy: 156.2, r: 3.6, opacity: 0.4 },
  { cx: 408, cy: 223.2, r: 3.6, opacity: 0.4 },
  { cx: 813.4, cy: 322, r: 3.2, opacity: 0.4 },
  { cx: 801.2, cy: 325.8, r: 3.2, opacity: 0.4 },
  { cx: 686, cy: 212.9, r: 3.2, opacity: 0.4 },
  { cx: 950.4, cy: 338.4, r: 5.8, opacity: 0.4 },
  { cx: 906.6, cy: 311.6, r: 5.8, opacity: 0.4 },
  { cx: 919.7, cy: 290.3, r: 5.8 },
  { cx: 942.3, cy: 283.2, r: 5.8, opacity: 0.4 },
  { cx: 933.9, cy: 309.3, r: 12.1, opacity: 0.4 },
  { cx: 918.4, cy: 324.7, r: 3.6, opacity: 0.4 },
  { cx: 941.5, cy: 354.7, r: 3.6, opacity: 0.4 },
  { cx: 930.1, cy: 275.4, r: 3.6, opacity: 0.4 },
  { cx: 959.7, cy: 284.4, r: 3.6 },
  { cx: 393, cy: 355, r: 3.2, opacity: 0.4 },
  { cx: 522.7, cy: 404.5, r: 3.2, opacity: 0.4 },
  { cx: 737, cy: 499.3, r: 3.2, opacity: 0.4 },
  { cx: 587.1, cy: 623.7, r: 3.2, opacity: 0.4 },
  { cx: 590.2, cy: 610.4, r: 3.2, opacity: 0.4 },
  { cx: 603.4, cy: 614.8, r: 3.2, opacity: 0.4 },
  { cx: 853.2, cy: 599.8, r: 5.8, opacity: 0.4 },
  { cx: 904.3, cy: 593.9, r: 5.8, opacity: 0.4 },
  { cx: 901.3, cy: 569.2, r: 5.8, opacity: 0.4 },
  { cx: 923.6, cy: 540.6, r: 5.8, opacity: 0.4 },
  { cx: 881.8, cy: 513.1, r: 5.8, opacity: 0.4 },
  { cx: 898.1, cy: 534.5, r: 5.8, opacity: 0.4 },
  { cx: 934.8, cy: 608.9, r: 5.8, opacity: 0.4 },
  { cx: 833.9, cy: 618.1, r: 5.8, opacity: 0.4 },
  { cx: 826.8, cy: 544.7, r: 5.8 },
  { cx: 849.2, cy: 535.5, r: 5.8 },
  { cx: 883.9, cy: 553.1, r: 5.8, opacity: 0.4 },
  { cx: 845.9, cy: 560.4, r: 5.8, opacity: 0.4 },
  { cx: 877.7, cy: 581.4, r: 12.1, opacity: 0.4 },
  { cx: 853.2, cy: 577.9, r: 5.8, opacity: 0.4 },
  { cx: 872.2, cy: 608.5, r: 5.8, opacity: 0.4 },
  { cx: 889, cy: 600.5, r: 3.6, opacity: 0.4 },
  { cx: 916.6, cy: 644.4, r: 3.6, opacity: 0.4 },
  { cx: 858.5, cy: 644.4, r: 3.6, opacity: 0.4 },
  { cx: 801.6, cy: 579.6, r: 3.6 },
  { cx: 819.6, cy: 565.6, r: 3.6 },
  { cx: 819.8, cy: 595.5, r: 3.6, opacity: 0.4 },
  { cx: 851.4, cy: 509.9, r: 3.6 },
  { cx: 913.6, cy: 515, r: 3.6, opacity: 0.4 },
  { cx: 924.8, cy: 571, r: 3.6, opacity: 0.4 },
  { cx: 886.1, cy: 640.3, r: 3.6, opacity: 0.4 },
  { cx: 855.4, cy: 618, r: 3.6, opacity: 0.4 },
  { cx: 835, cy: 574.2, r: 3.6, opacity: 0.4 },
  { cx: 862.7, cy: 559.7, r: 3.6 },
  { cx: 842.3, cy: 588.8, r: 3.6, opacity: 0.4 },
  { cx: 899.2, cy: 550.9, r: 3.6, opacity: 0.4 },
  { cx: 868.6, cy: 546.6, r: 3.6, opacity: 0.4 },
  { cx: 896.3, cy: 613.6, r: 3.6, opacity: 0.4 },
  { cx: 255, cy: 586.5, r: 5.8, opacity: 0.4 },
  { cx: 295.1, cy: 546.7, r: 5.8, opacity: 0.4 },
  { cx: 277.7, cy: 592.6, r: 5.8, opacity: 0.4 },
  { cx: 279.4, cy: 568.1, r: 12.1, opacity: 0.4 },
  { cx: 255, cy: 564.7, r: 5.8, opacity: 0.4 },
  { cx: 290.7, cy: 587.2, r: 3.6, opacity: 0.4 },
  { cx: 257.2, cy: 604.7, r: 3.6, opacity: 0.4 },
  { cx: 304.1, cy: 575.1, r: 3.6, opacity: 0.4 },
  { cx: 264.5, cy: 546.4, r: 3.6, opacity: 0.4 },
  { cx: 244.1, cy: 575.6, r: 3.6, opacity: 0.4 },
  { cx: 298, cy: 600.4, r: 3.6, opacity: 0.4 },
  { cx: 207.4, cy: 374.6, r: 12.1, opacity: 0.4 },
  { cx: 182.9, cy: 371.1, r: 5.8, opacity: 0.4 },
  { cx: 245.1, cy: 384.7, r: 5.8, opacity: 0.4 },
  { cx: 230.9, cy: 364.3, r: 5.8, opacity: 0.4 },
  { cx: 192.4, cy: 352.9, r: 3.6, opacity: 0.4 },
  { cx: 248, cy: 371.2, r: 3.6, opacity: 0.4 },
];

const longGameAnchors = [
  { cx: 600.7, cy: 163, r: 5.2 },
  { cx: 756.8, cy: 241.7, r: 5.2 },
  { cx: 822.4, cy: 420.1, r: 5.2 },
  { cx: 687.3, cy: 668, r: 5.2 },
  { cx: 447.3, cy: 563.1, r: 5.2 },
  { cx: 362.2, cy: 431.9, r: 5.2 },
  { cx: 452.5, cy: 296.5, r: 5.2 },
  { cx: 614.5, cy: 412.8, r: 11 },
];

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
      <path d="M8 1.7v2.5M8 11.8v2.5M3.56 3.56l1.77 1.77M10.67 10.67l1.77 1.77M1.7 8h2.5M11.8 8h2.5M3.56 12.44l1.77-1.77M10.67 5.33l1.77-1.77" />
    </svg>
  );
}

function EventIcon({ icon }: { icon: NonNullable<EventChip["icon"]> }) {
  if (icon === "caffeine") {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false" data-tone="green">
        <path d="M5.2 2.4v11.2M9.8 2.4v11.2M3.4 2.9c.9 1 .9 2.2 0 3.3m8.9-3.3c-.9 1-.9 2.2 0 3.3M4 8h8" />
      </svg>
    );
  }

  if (icon === "weight") {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false" data-tone="lime">
        <path d="M5.2 5.3V4a2.8 2.8 0 0 1 5.6 0v1.3M4.4 5.3h7.2l.8 7.7H3.6l.8-7.7Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false" data-tone="orange">
      <path d="M8.4 2.3 5.5 7.7h2.6l-.5 6 3-6.6H8l.4-4.8Z" />
    </svg>
  );
}

function CategoryChip({ className, label }: PositionedItem) {
  return (
    <span className={`new-long-game-chip new-long-game-category ${className}`}>
      <SparkIcon />
      {label}
    </span>
  );
}

function EventChip({ className, height = 29, icon, label, src, width = 128 }: EventChip) {
  if (src) {
    return <Image className={`new-long-game-event-image ${className}`} src={src} alt={label} width={width} height={height} />;
  }

  return (
    <span className={`new-long-game-chip new-long-game-event ${className}`}>
      <EventIcon icon={icon ?? "load"} />
      {label}
    </span>
  );
}

export function LongGameSection() {
  return (
    <section className="new-long-game-section new-home-section" aria-labelledby="long-game-title">
      <div className="new-long-game-copy new-home-copy-stack new-home-center" data-animate="blur-fade">
        <h2 id="long-game-title" className="type-h2">
          Longer he learns, smarter he gets.
        </h2>
        <p className="type-body tone-secondary">
          <strong>Months in, Waldo gets to know you, more than you do.</strong> It finds the patterns. Shows how you can compound. No tool has all of it.
        </p>
      </div>

      <div className="new-long-game-map" data-animate="blur-fade">
        <span className="new-long-game-soft-field" aria-hidden="true" />
        <svg className="new-long-game-orbit-lines" viewBox="0 0 1240 780" aria-hidden="true" focusable="false">
          <path d="M600.7 163 C604 244 610 333 614.5 412.8 C640 505 671 600 687.3 668" />
          <path d="M362.2 431.9 C438 398 535 401 614.5 412.8 C692 424 768 432 822.4 420.1" />
          <path d="M452.5 296.5 C532 229 594 290 614.5 412.8" />
          <path d="M600.7 163 C695 162 809 213 756.8 241.7 C710 267 661 323 614.5 412.8" />
          <path d="M756.8 241.7 C872 267 972 364 935 462 C902 548 790 545 822.4 420.1" />
          <path d="M452.5 296.5 C356 298 320 360 362.2 431.9" />
          <path d="M362.2 431.9 C252 470 196 551 211 622 C226 702 331 720 447.3 563.1 C512 506 564 455 614.5 412.8" />
          <path d="M447.3 563.1 C520 620 614 668 687.3 668" />
          {longGameSpotDots.map((dot, index) => (
            <circle
              key={`long-game-spot-${index}`}
              className="new-long-game-spot-dot"
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              style={{ "--spot-opacity": dot.opacity ?? 1 } as CSSProperties}
            />
          ))}
          {longGameAnchors.map((anchor, index) => (
            <circle key={`long-game-anchor-${index}`} className="new-long-game-anchor-dot" cx={anchor.cx} cy={anchor.cy} r={anchor.r} />
          ))}
        </svg>

        {longGameCategoryChips.map((chip) => (
          <CategoryChip key={chip.label} {...chip} />
        ))}

        {longGameEventChips.map((chip) => (
          <EventChip key={chip.label} {...chip} />
        ))}

        <Image className="new-long-game-waldo" src="/assets/home/mascots/Vector-1.svg" alt="" width={199} height={154} />
        <span className="new-long-game-chip new-long-game-primary-chip">
          <SparkIcon />
          Tuesday Crash
        </span>
      </div>
    </section>
  );
}
