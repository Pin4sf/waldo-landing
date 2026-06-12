"use client";

import Image from "next/image";

import { Aside, SectionIntro, withHighlights } from "@/components/landing-primitives";

const guidanceBars = [
  ["Health guidance", 27.2],
  ["Professional / career", 25.9],
  ["Relationships", 12.3],
  ["Financial", 10.9],
  ["Personal development", 6.3],
  ["Legal", 4.2],
] as const;

const visionConnectors = [
  { label: "Health", initials: "HE" },
  { label: "Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
  { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
  { label: "Linear", src: "/assets/composio-connectors/linear.svg" },
  { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
  { label: "Drive", src: "/assets/composio-connectors/googledrive.svg" },
] as const;

const compatibilityItems = [
  { label: "Apple Watch", src: "/assets/health-apple-watch.png", imageClassName: "max-h-8 max-w-[58px]" },
  { label: "WHOOP", src: "/assets/health-whoop.png", imageClassName: "max-h-9 max-w-[46px]" },
  // Oura, Garmin, Samsung, and Fitbit logos are not present in the supplied assets yet.
  // Keep monochrome placeholders until the owner supplies exact logo files.
  { label: "Oura" },
  { label: "Garmin" },
  { label: "Samsung" },
  { label: "Fitbit" },
] as const;

function BarChartCard() {
  return (
    <div className="surface-card p-4" data-animate="blur-fade">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.35fr] lg:items-center">
        <div>
          <p className="type-caption text-[var(--text-tertiary)]">Anthropic research</p>
          <h3 className="type-h2 mt-3 text-[var(--ink)]">Health guidance is already happening.</h3>
          <p className="type-body tone-secondary mt-4">
            {withHighlights("Anthropic found health guidance was the largest personal-guidance category. *The demand is already here.*")}
          </p>
          <Aside className="mt-5">structure beats a loose chat window.</Aside>
        </div>

        <div className="rounded-[8px] bg-[var(--surface-t1)] p-4">
          <div className="grid gap-3">
            {guidanceBars.map(([label, value], index) => (
              <div key={label} className="grid grid-cols-[minmax(92px,150px)_1fr] items-center gap-3">
                <p className="type-caption truncate text-right text-[var(--text-secondary)]">{label}</p>
                <div className="flex items-center gap-3">
                  <div className="h-8 flex-1 rounded-[8px] bg-[var(--surface-t4)]">
                    <div
                      className={`h-full rounded-[8px] ${index === 0 ? "bg-[var(--ink)]" : "bg-[var(--text-disabled)]"}`}
                      style={{ width: `${Math.max(8, value / 27.2 * 100)}%` }}
                    />
                  </div>
                  <p className="type-data w-12 text-right text-[var(--text-secondary)]">{value.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
          <p className="type-caption mt-4 text-right text-[var(--text-tertiary)]">Source: Anthropic</p>
        </div>
      </div>
    </div>
  );
}

function ConnectorMark({ connector }: { connector: (typeof visionConnectors)[number] }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-t1)]" title={connector.label}>
      {"src" in connector ? (
        <Image src={connector.src} alt="" width={25} height={25} className="h-auto w-auto max-w-[70%]" />
      ) : (
        <span className="type-caption text-[var(--ink)]">{connector.initials}</span>
      )}
    </span>
  );
}

function VisionBlock() {
  return (
    <div className="surface-card grid gap-8 bg-[var(--surface-t2)] p-4 lg:grid-cols-[1fr_0.8fr]" data-animate="blur-fade">
      <div>
        <p className="type-caption text-[var(--text-tertiary)]">The connected version</p>
        <h3 className="type-h2 mt-3 max-w-[560px] text-[var(--ink)]">Imagine what happens when everything is connected.</h3>
        <p className="type-body tone-secondary mt-5 max-w-[62ch]">
          Your calendar knows your HRV. Your task list knows your stress. Your email knows your recovery. Your focus hours
          match your circadian peak. Not because you set it up. Because Waldo read your body and made it happen.
        </p>
        <Aside className="mt-5">the day finally has context.</Aside>
      </div>

      <div className="rounded-[8px] bg-[var(--surface-t1)] p-4">
        <div className="grid grid-cols-3 gap-3" data-animate="stagger" data-stagger="0.045">
          {visionConnectors.map((connector) => (
            <div key={connector.label} data-stagger-item className="flex flex-col items-center gap-2 rounded-[6px] bg-[var(--surface-t2)] px-3 py-4 text-center">
              <ConnectorMark connector={connector} />
              <p className="type-caption text-[var(--text-secondary)]">{connector.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompatibilityStrip() {
  return (
    <div className="surface-card-top p-4 sm:p-5" data-animate="blur-fade">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="type-caption text-[var(--text-tertiary)]">Works with</p>
        <div className="flex flex-wrap gap-3" data-animate="stagger" data-stagger="0.045">
          {compatibilityItems.map((item) => (
            <div key={item.label} data-stagger-item className="flex min-h-12 items-center gap-3 rounded-[8px] bg-[var(--surface-t2)] px-4 py-2">
              {"src" in item ? (
                <Image src={item.src} alt="" width={64} height={48} className={`h-auto w-auto ${item.imageClassName}`} />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[var(--surface-t1)]">
                  <span className="type-caption text-[var(--ink)]">{item.label.slice(0, 2).toUpperCase()}</span>
                </span>
              )}
              <p className="type-label text-[var(--ink)]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Aside className="mt-4 text-center md:text-right">bring the wearable. Waldo brings the rest.</Aside>
    </div>
  );
}

export function ValidationSection() {
  return (
    <section id="validation" className="section-shell w-full scroll-mt-28 py-6 lg:py-8">
      <div data-animate="blur-fade">
        <SectionIntro
          eyebrow="Not just promises."
          title="Proof."
          aside="honest numbers only."
        />
      </div>

      <div className="mt-10">
        <BarChartCard />
      </div>

      <div className="mt-4">
        <VisionBlock />
      </div>

      <div className="mt-4">
        <CompatibilityStrip />
      </div>
    </section>
  );
}
