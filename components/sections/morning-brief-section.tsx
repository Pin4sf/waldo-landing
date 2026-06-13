import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { WaldoFace } from "./waldo-face";

import phoneMockup from "@/components/assets/iphone-mockup.png";
import recoveryCard from "@/components/assets/Frame 1000007158-1.png";
import sleepChart from "@/components/assets/Frame 1000007156.png";
import sleepDuration from "@/components/assets/Frame 1000007150.png";
import sleepScore from "@/components/assets/Frame 1000007151.png";
import vitalsCard from "@/components/assets/Frame 1000007153.png";
import zoneOne from "@/components/assets/Frame 1000007163.png";

type FlowStyle = CSSProperties & {
  "--card-width"?: string;
  "--flow-delay"?: string;
  "--flow-y"?: string;
  "--flow-drift"?: string;
  "--flow-rotate"?: string;
  "--flow-scale"?: string;
  "--receipt-delay"?: string;
};

type SourceCard =
  | {
      type: "note";
      source: string;
      meta?: string;
      body: string;
      aside: string;
      tone: "slack" | "message" | "calendar" | "gmail";
      width: string;
      y: string;
      delay: string;
      drift?: string;
      rotate?: string;
      scale?: string;
    }
  | {
      type: "metric";
      asset: StaticImageData;
      width: string;
      y: string;
      delay: string;
      drift?: string;
      rotate?: string;
      scale?: string;
    };

type ProcessedCard = {
  tone: "sleep" | "inbox" | "calendar";
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
    type: "note",
    source: "Slack",
    meta: "+49",
    body: "Need to talk about the sales review for Q1...",
    aside: "*Sunday, 11:43pm, really?*",
    tone: "slack",
    width: "220px",
    y: "308px",
    delay: "-13.8s",
    drift: "-10px",
    rotate: "-1.4deg",
  },
  {
    type: "metric",
    asset: sleepDuration,
    width: "250px",
    y: "288px",
    delay: "-11.9s",
    drift: "8px",
    rotate: "1deg",
    scale: "0.96",
  },
  {
    type: "note",
    source: "iMessage",
    meta: "+201",
    body: "It was a great night, hope you did not watch the next episodes without me.",
    aside: "*you binged the season on a Sunday night, bad call...*",
    tone: "message",
    width: "238px",
    y: "394px",
    delay: "-9.9s",
    drift: "12px",
    rotate: "1.1deg",
  },
  {
    type: "metric",
    asset: vitalsCard,
    width: "150px",
    y: "356px",
    delay: "-8.2s",
    drift: "-14px",
    rotate: "-0.8deg",
    scale: "0.92",
  },
  {
    type: "note",
    source: "Calendar",
    body: "96th product strategy review this week. See you at 9 on Monday.",
    aside: "*here we go again...*",
    tone: "calendar",
    width: "244px",
    y: "486px",
    delay: "-6.4s",
    drift: "-6px",
    rotate: "-1deg",
  },
  {
    type: "metric",
    asset: sleepScore,
    width: "248px",
    y: "454px",
    delay: "-4.7s",
    drift: "10px",
    rotate: "1.3deg",
  },
  {
    type: "note",
    source: "GMail",
    meta: "+104",
    body: "Health newsletter backlog, work nudges, and one meeting that actually matters.",
    aside: "*Waldo can ignore most of this.*",
    tone: "gmail",
    width: "232px",
    y: "574px",
    delay: "-2.8s",
    drift: "8px",
    rotate: "0.8deg",
  },
  {
    type: "metric",
    asset: sleepChart,
    width: "288px",
    y: "536px",
    delay: "-1.1s",
    drift: "-12px",
    rotate: "-0.6deg",
    scale: "0.94",
  },
  {
    type: "metric",
    asset: recoveryCard,
    width: "196px",
    y: "408px",
    delay: "0s",
    drift: "6px",
    rotate: "1.6deg",
    scale: "0.9",
  },
  {
    type: "metric",
    asset: zoneOne,
    width: "260px",
    y: "620px",
    delay: "1.6s",
    drift: "-8px",
    rotate: "-1.2deg",
    scale: "0.92",
  },
];

const processedCards: ProcessedCard[] = [
  {
    tone: "sleep",
    eyebrow: "Sleep",
    label: "Recovery",
    body: (
      <>
        Late bedtime pulled your <strong>Recovery to 63.</strong> Pushed the 9am product strategy review to 10:30.
      </>
    ),
    aside: "you need the extra hour more than they need punctuality.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "1.2s",
  },
  {
    tone: "inbox",
    eyebrow: "Inbox",
    label: "Pressure",
    body: (
      <>
        Batched 104 emails and 49 Slack pings. Left <strong>two real asks</strong> for the morning brief.
      </>
    ),
    aside: "noise moved out of the way.",
    connectors: [
      { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
      { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      { label: "More" },
    ],
    delay: "6.8s",
  },
  {
    tone: "calendar",
    eyebrow: "Calendar",
    label: "Action",
    body: (
      <>
        Found the dense block and <strong>moved the review</strong> before your recovery window was gone.
      </>
    ),
    aside: "calendar changed, receipt logged.",
    connectors: [
      { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Linear", src: "/assets/composio-connectors/linear.svg" },
      { label: "More" },
    ],
    delay: "12.4s",
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

  if (card.type === "metric") {
    return (
      <div className="waldo-smart-source-card waldo-smart-metric-card" style={style}>
        <Image src={card.asset} alt="" className="h-auto w-full select-none" sizes="300px" priority={index < 2} />
      </div>
    );
  }

  return (
    <div className="waldo-smart-source-card waldo-smart-note-card" data-tone={card.tone} style={style}>
      <div className="waldo-smart-note-meta">
        <span className="waldo-smart-source-dot" />
        <span>{card.source}</span>
        {card.meta ? <span className="waldo-smart-source-muted">{card.meta}</span> : null}
      </div>
      <p className="waldo-smart-note-body">{card.body}</p>
      <p className="waldo-smart-note-aside">{card.aside}</p>
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
              <SourceCardItem key={`${card.type}-${index}`} card={card} index={index} />
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
