import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { WaldoFace } from "./waldo-face";

import phoneMockup from "@/components/assets/iphone-mockup.png";

type FlowStyle = CSSProperties & {
  "--card-width"?: string;
  "--flow-delay"?: string;
  "--flow-y"?: string;
  "--flow-drift"?: string;
  "--flow-rotate"?: string;
  "--flow-scale"?: string;
  "--receipt-delay"?: string;
};

type SourceCard = {
  src: string;
  alt: string;
  naturalWidth: number;
  naturalHeight: number;
  width: string;
  y: string;
  delay: string;
  drift?: string;
  rotate?: string;
  scale?: string;
};

type ProcessedCard = {
  tone: "sleep" | "inbox" | "calendar" | "nutrition" | "stress" | "recovery";
  eyebrow: string;
  label: string;
  body: ReactNode;
  aside: string;
  connectors: Array<{
    label: string;
    src?: string;
  }>;
  delay: string;
};

const sourceCards: SourceCard[] = [
  {
    src: "/figma-assets/waldo-smart-flow/slack-sales-review.png",
    alt: "Slack sales review message card.",
    naturalWidth: 614,
    naturalHeight: 312,
    width: "300px",
    y: "284px",
    delay: "-35.2s",
    drift: "-10px",
    rotate: "-1.4deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/sleep-duration.png",
    alt: "Time asleep summary card.",
    naturalWidth: 636,
    naturalHeight: 319,
    width: "310px",
    y: "260px",
    delay: "-33.6s",
    drift: "8px",
    rotate: "1deg",
    scale: "0.96",
  },
  {
    src: "/figma-assets/waldo-smart-flow/slack-q1-data.png",
    alt: "Slack Q1 sales data message card.",
    naturalWidth: 614,
    naturalHeight: 330,
    width: "302px",
    y: "350px",
    delay: "-32s",
    drift: "-18px",
    rotate: "0.6deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/sleep-score.png",
    alt: "Sleep score card showing a 74 score.",
    naturalWidth: 637,
    naturalHeight: 461,
    width: "294px",
    y: "424px",
    delay: "-30.4s",
    drift: "10px",
    rotate: "1.3deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/imessage-sunday-binge.png",
    alt: "iMessage card about watching the next episodes.",
    naturalWidth: 614,
    naturalHeight: 330,
    width: "302px",
    y: "306px",
    delay: "-28.8s",
    drift: "12px",
    rotate: "1.1deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/vitals-typical.png",
    alt: "Vitals card showing typical overnight readings.",
    naturalWidth: 408,
    naturalHeight: 395,
    width: "188px",
    y: "362px",
    delay: "-27.2s",
    drift: "-14px",
    rotate: "-0.8deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/calendar-product-review.png",
    alt: "Calendar product strategy review card.",
    naturalWidth: 614,
    naturalHeight: 386,
    width: "302px",
    y: "486px",
    delay: "-25.6s",
    drift: "-6px",
    rotate: "-1deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/sleep-stages.png",
    alt: "Sleep stages card showing 6 hours and 12 minutes.",
    naturalWidth: 396,
    naturalHeight: 395,
    width: "178px",
    y: "442px",
    delay: "-24s",
    drift: "18px",
    rotate: "0.8deg",
    scale: "0.94",
  },
  {
    src: "/figma-assets/waldo-smart-flow/gmail-lifestyle-newsletter.png",
    alt: "Gmail healthy lifestyle newsletter backlog card.",
    naturalWidth: 614,
    naturalHeight: 330,
    width: "302px",
    y: "562px",
    delay: "-22.4s",
    drift: "8px",
    rotate: "0.8deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/hours-vs-need.png",
    alt: "Hours versus sleep need chart.",
    naturalWidth: 636,
    naturalHeight: 492,
    width: "318px",
    y: "532px",
    delay: "-20.8s",
    drift: "-12px",
    rotate: "-0.6deg",
    scale: "0.94",
  },
  {
    src: "/figma-assets/waldo-smart-flow/gmail-work-sales-review.png",
    alt: "Gmail work sales review meeting card.",
    naturalWidth: 614,
    naturalHeight: 312,
    width: "302px",
    y: "316px",
    delay: "-19.2s",
    drift: "-22px",
    rotate: "-0.8deg",
  },
  {
    src: "/figma-assets/waldo-smart-flow/recovery-week.png",
    alt: "Weekly recovery bar chart card.",
    naturalWidth: 450,
    naturalHeight: 372,
    width: "228px",
    y: "410px",
    delay: "-17.6s",
    drift: "6px",
    rotate: "1.6deg",
    scale: "0.9",
  },
  {
    src: "/figma-assets/waldo-smart-flow/stress-monitor.png",
    alt: "Stress monitor gauge card.",
    naturalWidth: 366,
    naturalHeight: 373,
    width: "188px",
    y: "508px",
    delay: "-16s",
    drift: "-4px",
    rotate: "-1.2deg",
    scale: "0.94",
  },
  {
    src: "/figma-assets/waldo-smart-flow/stress-heart-rate.png",
    alt: "Stress and heart rate chart card.",
    naturalWidth: 648,
    naturalHeight: 516,
    width: "324px",
    y: "460px",
    delay: "-14.4s",
    drift: "12px",
    rotate: "0.8deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/zone-5.png",
    alt: "Zone 5 activity load card.",
    naturalWidth: 648,
    naturalHeight: 256,
    width: "324px",
    y: "618px",
    delay: "-12.8s",
    drift: "-8px",
    rotate: "-0.9deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/zone-4.png",
    alt: "Zone 4 activity load card.",
    naturalWidth: 648,
    naturalHeight: 256,
    width: "324px",
    y: "282px",
    delay: "-11.2s",
    drift: "6px",
    rotate: "0.8deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/zone-3.png",
    alt: "Zone 3 activity load card.",
    naturalWidth: 648,
    naturalHeight: 256,
    width: "324px",
    y: "626px",
    delay: "-9.6s",
    drift: "10px",
    rotate: "1.1deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/zone-2.png",
    alt: "Zone 2 activity load card.",
    naturalWidth: 648,
    naturalHeight: 256,
    width: "324px",
    y: "352px",
    delay: "-8s",
    drift: "-10px",
    rotate: "-0.7deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/zone-1.png",
    alt: "Zone 1 activity load card.",
    naturalWidth: 648,
    naturalHeight: 256,
    width: "324px",
    y: "590px",
    delay: "-6.4s",
    drift: "-4px",
    rotate: "-1.2deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/net-energy.png",
    alt: "Net energy card showing minus 100 kilocalories.",
    naturalWidth: 690,
    naturalHeight: 394,
    width: "322px",
    y: "334px",
    delay: "-4.8s",
    drift: "14px",
    rotate: "0.7deg",
    scale: "0.92",
  },
  {
    src: "/figma-assets/waldo-smart-flow/nutrition-macros.png",
    alt: "Nutritional details card with fat, carbs, and protein.",
    naturalWidth: 690,
    naturalHeight: 520,
    width: "322px",
    y: "456px",
    delay: "-3.2s",
    drift: "-12px",
    rotate: "-0.8deg",
    scale: "0.9",
  },
  {
    src: "/figma-assets/waldo-smart-flow/nutrition-minerals.png",
    alt: "Nutrition minerals card showing magnesium, calcium, and vitamin D.",
    naturalWidth: 428,
    naturalHeight: 582,
    width: "196px",
    y: "298px",
    delay: "-1.6s",
    drift: "8px",
    rotate: "1deg",
    scale: "0.9",
  },
  {
    src: "/figma-assets/waldo-smart-flow/nutrition-fiber.png",
    alt: "Nutrition card showing fiber, potassium, and iron.",
    naturalWidth: 432,
    naturalHeight: 582,
    width: "196px",
    y: "536px",
    delay: "0s",
    drift: "-8px",
    rotate: "-1deg",
    scale: "0.9",
  },
];

const processedCards: ProcessedCard[] = [
  {
    tone: "sleep",
    eyebrow: "Sleep",
    label: "Brief",
    body: (
      <>
        6h 12m asleep and a 74 score. Waldo moved the <strong>9am Q1 review</strong> to the first safer window.
      </>
    ),
    aside: "you need the extra hour more than they need punctuality.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "-8.6s",
  },
  {
    tone: "inbox",
    eyebrow: "Inbox",
    label: "Pressure",
    body: (
      <>
        104 emails, 49 Slack pings, and two late asks. Waldo kept <strong>the real work</strong> and muted the rest.
      </>
    ),
    aside: "noise moved out of the way.",
    connectors: [
      { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "0.4s",
  },
  {
    tone: "recovery",
    eyebrow: "Recovery",
    label: "Load",
    body: (
      <>
        Recovery dipped, sleep need rose, and zone load stacked up. Waldo protected <strong>deep work after lunch.</strong>
      </>
    ),
    aside: "your body got veto power before the calendar did.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Linear", src: "/assets/composio-connectors/linear.svg" },
      { label: "More" },
    ],
    delay: "9.4s",
  },
  {
    tone: "stress",
    eyebrow: "Stress",
    label: "Cooldown",
    body: (
      <>
        Stress climbed while heart rate stayed noisy. Waldo delayed low-priority messages until <strong>the signal cooled.</strong>
      </>
    ),
    aside: "not another alert. a quieter afternoon.",
    connectors: [
      { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "18.4s",
  },
  {
    tone: "nutrition",
    eyebrow: "Nutrition",
    label: "Fuel",
    body: (
      <>
        Magnesium, fiber, and net energy were off. Waldo suggested a <strong>lighter lunch window</strong> before meetings resumed.
      </>
    ),
    aside: "small inputs, better afternoon.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "27.4s",
  },
];

function ConnectorIcon({ connector }: { connector: ProcessedCard["connectors"][number] }) {
  if (!connector.src) {
    return (
      <span className="waldo-smart-connector" aria-label={connector.label}>
        +
      </span>
    );
  }

  return (
    <span className="waldo-smart-connector">
      <Image src={connector.src} alt={connector.label} width={18} height={18} />
    </span>
  );
}

function SourceCardItem({ card, index }: { card: SourceCard; index: number }) {
  const style: FlowStyle = {
    "--card-width": card.width,
    "--flow-delay": card.delay,
    "--flow-y": card.y,
    "--flow-drift": card.drift ?? "0px",
    "--flow-rotate": card.rotate ?? "0deg",
    "--flow-scale": card.scale ?? "1",
  };

  return (
    <div className="waldo-smart-source-card waldo-smart-asset-card" style={style}>
      <Image
        src={card.src}
        alt={card.alt}
        width={card.naturalWidth}
        height={card.naturalHeight}
        className="h-auto w-full select-none"
        sizes="(min-width: 1024px) 340px, 190px"
        priority={index < 4}
      />
    </div>
  );
}

function ProcessedReceipt({ card }: { card: ProcessedCard }) {
  const style: FlowStyle = {
    "--receipt-delay": card.delay,
  };

  return (
    <article className="waldo-smart-receipt" data-tone={card.tone} style={style}>
      <div className="waldo-smart-receipt-tags">
        <span className="waldo-smart-receipt-dot" />
        <span>{card.eyebrow}</span>
        <span>{card.label}</span>
      </div>
      <p className="waldo-smart-receipt-body">{card.body}</p>
      <p className="waldo-smart-receipt-aside">{card.aside}</p>
      <div className="waldo-smart-connectors" aria-label="Connectors involved">
        {card.connectors.map((connector) => (
          <ConnectorIcon key={connector.label} connector={connector} />
        ))}
      </div>
    </article>
  );
}

export function MorningBriefSection() {
  return (
    <section id="brief" className="section-shell scroll-mt-28 overflow-hidden rounded-[44px] bg-[var(--surface-t2)] p-3">
      <div className="waldo-smart-panel relative overflow-hidden rounded-[32px] border border-[var(--border-default)] bg-[var(--surface-t1)] text-center">
        <div className="waldo-smart-copy" data-animate="blur-fade">
          <h2 className="type-h2 text-[var(--ink)]">You are smart, but Waldo&apos;s smarter</h2>
          <p className="type-body tone-secondary mt-5">
            Waldo reads all of your health insights. Then it does what no app has done before - it acts. Every other product shows you data, Waldo does something about it.
          </p>
        </div>

        <div className="waldo-smart-stage" data-animate="blur-fade">
          <div className="waldo-smart-source-lane" aria-hidden>
            {sourceCards.map((card, index) => (
              <SourceCardItem key={`${card.src}-${index}`} card={card} index={index} />
            ))}
          </div>

          <div className="waldo-smart-phone-wrap" aria-hidden>
            <div className="waldo-smart-phone-screen">
              <div className="waldo-smart-processing-field">
                <span />
                <span />
                <span />
              </div>
              <div className="waldo-smart-phone-output-lane">
                {processedCards.map((card) => (
                  <ProcessedReceipt key={`phone-${card.eyebrow}-${card.label}`} card={card} />
                ))}
              </div>
            </div>
            <WaldoFace />
            <Image src={phoneMockup} alt="" className="waldo-smart-phone-image relative z-40 h-auto w-full select-none" sizes="420px" priority />
          </div>

          <div className="waldo-smart-output-lane">
            {processedCards.map((card) => (
              <ProcessedReceipt key={`${card.eyebrow}-${card.label}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
