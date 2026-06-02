import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import { WaldoFace } from "./waldo-face";

import notificationGmail from "@/components/assets/Frame 1000007147.png";
import notificationGmailWork from "@/components/assets/Frame 1000007149.png";
import notificationMessage from "@/components/assets/Frame 1000007145.png";
import notificationSlack from "@/components/assets/Frame 1000007144.png";
import notificationSlackWork from "@/components/assets/Frame 1000007138.png";
import phoneMockup from "@/components/assets/iphone-mockup.png";
import recoveryCard from "@/components/assets/Frame 1000007158-1.png";
import sleepChart from "@/components/assets/Frame 1000007156.png";
import sleepDuration from "@/components/assets/Frame 1000007150.png";
import sleepScore from "@/components/assets/Frame 1000007151.png";
import sleepStage from "@/components/assets/Frame 1000007152.png";
import stressGauge from "@/components/assets/Frame 1000007157.png";
import stressLine from "@/components/assets/Frame 1000007158.png";
import vitalsCard from "@/components/assets/Frame 1000007153.png";
import zoneOne from "@/components/assets/Frame 1000007163.png";
import zoneThree from "@/components/assets/Frame 1000007161.png";
import zoneTwo from "@/components/assets/Frame 1000007162.png";

type SourceCard = {
  asset: StaticImageData;
  className: string;
};

type Insight = {
  tone: "recovery" | "pressure" | "stress" | "form" | "pattern";
  tags: string[];
  message: string;
  aside: string;
  connectors: Array<{
    label: string;
    src?: string;
  }>;
};

type FlowScenario = {
  name: string;
  sources: SourceCard[];
  insight: Insight;
};

const scenarios: FlowScenario[] = [
  {
    name: "Sleep",
    sources: [
      { asset: sleepScore, className: "left-[2%] top-[25%] w-[300px]" },
      { asset: sleepDuration, className: "left-[8%] top-[9%] w-[300px]" },
      { asset: sleepChart, className: "left-[16%] top-[54%] w-[330px]" },
      { asset: sleepStage, className: "left-[2%] top-[49%] w-[170px]" },
      { asset: vitalsCard, className: "left-[25%] top-[23%] w-[170px]" },
    ],
    insight: {
      tone: "recovery",
      tags: ["Sleep", "Recovery", "Calendar"],
      message:
        "6 hours 12. Late bedtime pulled your Recovery to 63. Pushed the 9am product strategy review to 10:30. You need the extra hour more than they need punctuality.",
      aside: "already moved.",
      connectors: [
        { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
        { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
        { label: "More" },
      ],
    },
  },
  {
    name: "Signal pressure",
    sources: [
      { asset: notificationSlack, className: "left-[2%] top-[12%] w-[320px]" },
      { asset: notificationGmail, className: "left-[19%] top-[28%] w-[320px]" },
      { asset: notificationSlackWork, className: "left-[8%] top-[52%] w-[320px]" },
      { asset: notificationGmailWork, className: "left-[28%] top-[5%] w-[320px]" },
      { asset: notificationMessage, className: "left-[1%] top-[36%] w-[320px]" },
    ],
    insight: {
      tone: "pressure",
      tags: ["Slack", "Gmail", "Signal Pressure"],
      message:
        "104 newsletter emails archived. Two Slack threads came in after midnight. Surfaced the Q1 deck thread, batched the rest. You have 2 things that actually need you this morning, not 108.",
      aside: "inbox: handled.",
      connectors: [
        { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
        { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
        { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
      ],
    },
  },
  {
    name: "Stress",
    sources: [
      { asset: stressLine, className: "left-[4%] top-[30%] w-[340px]" },
      { asset: stressGauge, className: "left-[24%] top-[11%] w-[180px]" },
      { asset: zoneThree, className: "left-[2%] top-[12%] w-[170px]" },
      { asset: zoneTwo, className: "left-[31%] top-[56%] w-[170px]" },
      { asset: vitalsCard, className: "left-[7%] top-[58%] w-[170px]" },
    ],
    insight: {
      tone: "stress",
      tags: ["Stress", "Calendar", "Motion"],
      message:
        "Stress is sitting at medium and your morning has 3 meetings stacked. Blocked 1-2pm for recovery. If the 11:30 runs long, I'll pull it at the 45-minute mark.",
      aside: "afternoon: protected.",
      connectors: [
        { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
        { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
        { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      ],
    },
  },
  {
    name: "Form",
    sources: [
      { asset: recoveryCard, className: "left-[10%] top-[15%] w-[250px]" },
      { asset: vitalsCard, className: "left-[29%] top-[33%] w-[170px]" },
      { asset: stressGauge, className: "left-[1%] top-[38%] w-[180px]" },
      { asset: zoneOne, className: "left-[18%] top-[58%] w-[170px]" },
      { asset: sleepStage, className: "left-[2%] top-[8%] w-[170px]" },
    ],
    insight: {
      tone: "form",
      tags: ["Form", "Circadian", "Calendar"],
      message:
        "Form is at 68: steady, not great. Your best window today is 10:30am to 12pm. I've held it clear. The deck review is in there. You'll want sharp hours for that one.",
      aside: "focus: locked.",
      connectors: [
        { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
        { label: "Linear", src: "/assets/composio-connectors/linear.svg" },
        { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
      ],
    },
  },
  {
    name: "Pattern",
    sources: [
      { asset: sleepChart, className: "left-[3%] top-[48%] w-[340px]" },
      { asset: recoveryCard, className: "left-[21%] top-[16%] w-[250px]" },
      { asset: sleepDuration, className: "left-[4%] top-[8%] w-[300px]" },
      { asset: sleepScore, className: "left-[13%] top-[31%] w-[300px]" },
      { asset: vitalsCard, className: "left-[1%] top-[59%] w-[170px]" },
    ],
    insight: {
      tone: "pattern",
      tags: ["Sleep Debt", "Weekly Pattern", "Recovery"],
      message:
        "Third Sunday in a row you went to bed past 1am. Your Monday Recovery has dropped 15% each time. This is becoming a pattern.",
      aside: "the spot: sunday nights.",
      connectors: [
        { label: "Google Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
        { label: "Notion", src: "/assets/composio-connectors/notion.svg" },
        { label: "More" },
      ],
    },
  },
];

function ConnectorIcon({ connector, index }: { connector: Insight["connectors"][number]; index: number }) {
  if (!connector.src) {
    return (
      <span
        className="waldo-connector-frame flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] text-[var(--text-secondary)] shadow-[var(--shadow-card)]"
        style={{ zIndex: 20 - index }}
      >
        +
      </span>
    );
  }

  return (
    <span
      className="waldo-connector-frame flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] p-1.5 shadow-[var(--shadow-card)]"
      style={{ zIndex: 20 - index }}
    >
      <Image src={connector.src} alt={connector.label} width={24} height={24} />
    </span>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article
      className="waldo-flow-output absolute right-[2%] top-[43%] z-20 w-[min(330px,32vw)] rounded-[22px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-6 text-left shadow-[var(--shadow-floating)]"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="waldo-insight-dot" data-tone={insight.tone} />
        {insight.tags.map((tag, tagIndex) => (
          <span
            key={tag}
            className={tagIndex === 0 ? "type-label text-[var(--ink)]" : "type-label text-[var(--text-tertiary)]"}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="type-body mt-4 text-[var(--ink)]">
        {insight.message}
      </p>
      <p className="type-aside mt-5 text-[var(--text-tertiary)]">{insight.aside}</p>
      <div className="mt-5 flex items-center" aria-label="Connectors involved">
        {insight.connectors.map((connector, connectorIndex) => (
          <ConnectorIcon key={connector.label} connector={connector} index={connectorIndex} />
        ))}
      </div>
    </article>
  );
}

export function MorningBriefSection() {
  return (
    <section id="brief" className="section-shell scroll-mt-28 overflow-hidden rounded-[44px] bg-[var(--surface-t2)] p-3 shadow-[var(--shadow-card)]">
      <div className="overflow-hidden rounded-[32px] border border-[var(--border-default)] bg-[var(--surface-t1)] pt-20 text-center sm:pt-24 lg:pt-28">
        <div className="mx-auto flex max-w-[680px] flex-col items-center px-6">
          <h2 className="type-h3 text-[var(--ink)] sm:text-[1.8rem]">You are smart, but Waldo’s smarter</h2>
          <p className="type-body mt-5 max-w-[52ch] text-[var(--text-secondary)]">
            Waldo reads all of your health insights. Then it does what{" "}
            <br className="hidden sm:block" />
            no app has done before. It acts. Every other product{" "}
            <br className="hidden sm:block" />
            shows you data, Waldo does something about it.
          </p>
        </div>

        <div className="waldo-flow-stage relative mt-12 h-[560px] overflow-hidden sm:mt-16 lg:h-[640px]">
          {scenarios.map((scenario, scenarioIndex) => (
            <div
              key={scenario.name}
              aria-hidden={scenarioIndex !== 0}
              className="waldo-flow-scenario"
              data-reduced-default={scenarioIndex === 0 ? "true" : undefined}
              style={{ "--scenario-delay": `${scenarioIndex * 6}s` } as CSSProperties}
            >
              <div className="waldo-flow-inputs absolute inset-0 z-[6]">
                {scenario.sources.map((source, sourceIndex) => (
                  <div
                    key={`${scenario.name}-${sourceIndex}`}
                    className={`waldo-source-card absolute ${source.className}`}
                    style={{ "--card-delay": `${sourceIndex * 0.12}s` } as CSSProperties}
                  >
                    <Image src={source.asset} alt="" className="h-auto w-full select-none" sizes="360px" />
                  </div>
                ))}
              </div>
              <InsightCard insight={scenario.insight} />
            </div>
          ))}

          <div
            aria-hidden
            className="absolute left-1/2 top-[56px] z-10 h-[min(573px,118vw)] w-[min(360px,34vw)] min-w-[260px] -translate-x-1/2 rounded-[42px] bg-[var(--surface-t1)] sm:left-[47%]"
          />
          <div className="absolute left-1/2 top-[56px] z-30 w-[min(280px,26vw)] min-w-[210px] -translate-x-1/2 sm:left-[47%]">
            <WaldoFace />
            <Image src={phoneMockup} alt="" className="relative z-30 h-auto w-full select-none" sizes="340px" />
          </div>
        </div>
      </div>
    </section>
  );
}
