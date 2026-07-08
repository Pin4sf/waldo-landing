"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef } from "react";

type AssetCard = {
  type: "asset";
  src: string;
  width: number;
  height: number;
};

type AssetPair = {
  type: "pair";
  cards: [AssetCard, AssetCard];
};

type DataCard = AssetCard | AssetPair;

const healthAsset = (name: string, width: number, height: number): AssetCard => ({
  type: "asset",
  src: `/assets/home/health-infographic/${name}.webp`,
  width,
  height,
});

const leftColumn: DataCard[] = [
  healthAsset("slack-q1-prep", 307, 165),
  healthAsset("imessage-binge", 307, 165),
  healthAsset("nutrition-details", 345, 260),
  healthAsset("net-energy", 345, 197),
  {
    type: "pair",
    cards: [healthAsset("micronutrients-left", 216, 291), healthAsset("micronutrients-right", 214, 291)],
  },
];

const middleColumn: DataCard[] = [
  healthAsset("gmail-newsletter", 307, 165),
  healthAsset("slack-sales-short", 307, 156),
  healthAsset("time-asleep", 318, 160),
  {
    type: "pair",
    cards: [healthAsset("sleep-mini", 198, 198), healthAsset("vitals-mini", 204, 198)],
  },
  healthAsset("sleep-score", 319, 231),
  healthAsset("hours-vs-need", 318, 246),
];

const rightColumn: DataCard[] = [
  healthAsset("calendar-strategy", 307, 193),
  healthAsset("gmail-q1-review", 307, 156),
  healthAsset("zone-5", 324, 128),
  healthAsset("zone-4", 324, 128),
  healthAsset("zone-3", 324, 128),
  healthAsset("zone-2", 324, 128),
  healthAsset("zone-1", 324, 128),
  {
    type: "pair",
    cards: [healthAsset("stress-monitor", 183, 187), healthAsset("recovery", 225, 186)],
  },
  healthAsset("stress-heart-rate", 324, 258),
];

const wearableDevices = [
  { src: "/assets/home/devices/apple-watchface.svg", alt: "Apple Watch", width: 30, height: 44 },
  { src: "/assets/home/devices/wearable-band.svg", alt: "Wearable band", width: 29, height: 42 },
  { src: "/assets/home/devices/wearable-ring.svg", alt: "Smart ring", width: 43, height: 43 },
  { src: "/assets/home/devices/analog-watch-check.svg", alt: "Garmin watch", width: 31, height: 44 },
  { src: "/assets/home/devices/wearable-tilted-ring.svg", alt: "Oura ring", width: 50, height: 52 },
  { src: "/assets/home/devices/analog-watch.svg", alt: "Samsung Watch", width: 32, height: 44 },
];

function canUseFinePointer() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function AssetCardView({ card }: { card: AssetCard }) {
  return (
    <article className="new-data-asset-card">
      <Image src={card.src} alt="" width={card.width} height={card.height} draggable={false} />
    </article>
  );
}

function AssetPairView({ pair }: { pair: AssetPair }) {
  return (
    <div className="new-data-asset-pair">
      {pair.cards.map((card) => (
        <AssetCardView key={card.src} card={card} />
      ))}
    </div>
  );
}

function DataCardView({ card }: { card: DataCard }) {
  if (card.type === "pair") {
    return <AssetPairView pair={card} />;
  }

  return <AssetCardView card={card} />;
}

function DataColumn({ cards, direction }: { cards: DataCard[]; direction: "up" | "down" }) {
  return (
    <div className="new-data-column" data-direction={direction}>
      <div className="new-data-marquee-track">
        {[0, 1].map((set) => (
          <div key={set} className="new-data-marquee-set">
            {cards.map((card, index) => (
              <DataCardView key={`${set}-${card.type}-${index}`} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TooMuchDataSection() {
  const waldoRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const applyPointer = useCallback(() => {
    frameRef.current = null;
    const { x, y } = pointerRef.current;

    if (waldoRef.current) {
      waldoRef.current.style.transform = `translate3d(calc(-50% + ${x * 8}px), calc(-50% + ${y * 5}px), 0) rotate(${x * 1.2}deg)`;
    }
  }, []);

  const updatePointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!canUseFinePointer()) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(applyPointer);
    }
  }, [applyPointer]);

  const resetPointer = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    pointerRef.current = { x: 0, y: 0 };

    if (waldoRef.current) {
      waldoRef.current.style.transform = "";
    }
  }, []);

  useEffect(() => resetPointer, [resetPointer]);

  return (
    <section className="new-too-much-data-section" aria-labelledby="too-much-data-title">
      <h2 id="too-much-data-title" className="sr-only">
        Waldo reads the scattered data you already have.
      </h2>
      <div
        className="new-too-much-data-card"
        data-animate="blur-fade"
        onPointerLeave={resetPointer}
        onPointerMove={updatePointer}
      >
        <div className="new-too-much-data-inner" aria-hidden="true">
          <DataColumn cards={leftColumn} direction="up" />
          <DataColumn cards={middleColumn} direction="down" />
          <DataColumn cards={rightColumn} direction="up" />
        </div>
        <div ref={waldoRef} className="new-too-much-data-waldo">
          <Image src="/assets/home/mascots/rough-dark-mode.svg" alt="" width={198} height={127} draggable={false} />
          <p>oof, thats a lot of data</p>
        </div>
      </div>
      <div className="new-too-much-data-story">
        <div className="new-too-much-data-copy" data-animate="blur-fade">
          <h2>You already have everything Waldo needs.</h2>
          <p>
            <strong>Months of health data, sitting idle.</strong> From the calendar you live by to the inbox you fight
            with. Waldo takes what you already have and puts it to work - no buying, no building, no complex setup.
          </p>
        </div>
        <div className="new-wearable-device-row" aria-label="Wearables Waldo can read" data-animate="blur-fade">
          {wearableDevices.map((device) => (
            <span key={device.src} className="new-wearable-device">
              <Image src={device.src} alt={device.alt} width={device.width} height={device.height} draggable={false} />
            </span>
          ))}
        </div>
        <p className="new-wearable-copy" data-animate="blur-fade">
          <strong>Got a wearable? Thats all Waldo needs.</strong>{" "}
          Apple Watch, WHOOP, OURA ring, Samsung Watch,
          FitBit, and Garmin. if it&apos;s reading your body, Waldo already speaks its language.
        </p>
      </div>
    </section>
  );
}
