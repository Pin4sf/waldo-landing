"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";

import { ConnectorChip } from "@/components/connectors/connector-chip";
import { connectors, type Connector } from "@/components/connectors/connector-data";

type AutonomyKey = "inform" | "propose" | "autonomous";

type AutonomyLevel = {
  key: AutonomyKey;
  label: string;
  level: "L1" | "L2" | "L3";
  mode: string;
  body: ReactNode;
  primaryAction: string;
  secondaryAction: string;
};

const connectorById = new Map(connectors.map((connector) => [connector.id, connector]));
const informMoveCopy = "I'd move your 9am to 10:30";

function getConnector(id: string): Connector {
  const connector = connectorById.get(id);

  if (!connector) {
    throw new Error(`Missing connector: ${id}`);
  }

  return connector;
}

const autonomyLevels: AutonomyLevel[] = [
  {
    key: "inform",
    label: "Inform",
    level: "L1",
    mode: "Inform first",
    body: (
      <>
        I am seeing some movement in vitals, <strong>{informMoveCopy}.</strong> Do you want me to?
      </>
    ),
    primaryAction: "Walk me through it first",
    secondaryAction: "Chat",
  },
  {
    key: "propose",
    label: "Propose",
    level: "L2",
    mode: "Propose Changes",
    body: (
      <>
        I can move your 9am to 10:30, send the room a note, and keep the deck review where it is.
      </>
    ),
    primaryAction: "Approve change",
    secondaryAction: "Adjust",
  },
  {
    key: "autonomous",
    label: "Autonomous",
    level: "L3",
    mode: "Full agency",
    body: (
      <>
        Vitals moved enough, so <strong>I moved your 9am to 10:30</strong> and sent the room the new plan.
      </>
    ),
    primaryAction: "View handoff",
    secondaryAction: "Undo",
  },
];

const accountConnectors = [
  { id: "gmail", initials: "SP", label: "sp@waldo.in" },
  { id: "gmail", initials: "S", label: "suyash@gmail.com" },
  { id: "github", initials: "D", label: "deployment" },
];

const mapConnectors = ["gmail", "google-calendar", "apple-health", "google-health-connect"];

export function DataAloneSection() {
  const [activeLevel, setActiveLevel] = useState<AutonomyKey>("inform");
  const activeAutonomyLevel = autonomyLevels.find((level) => level.key === activeLevel) ?? autonomyLevels[0];

  return (
    <section className="new-data-alone-section new-home-section new-home-wide" aria-labelledby="data-alone-title">
      <div className="new-data-alone-copy new-home-copy-stack new-home-center" data-animate="blur-fade">
        <Image
          className="new-data-alone-waldo"
          src="/assets/home/mascots/good-week-dark-mode.svg"
          alt=""
          width={198}
          height={147}
        />
        <h2 id="data-alone-title" className="type-h2">
          The data? Yours alone.
        </h2>
        <p className="type-body tone-secondary">
          <strong>Your health data stays in your hands.</strong> We do not sell data. We do not share with advertisers. The wheel is always in your hands.
        </p>
      </div>

      <div className="new-data-alone-stage" data-animate="blur-fade">
        <svg className="new-data-alone-line-svg" viewBox="0 0 1080 548" fill="none" aria-hidden="true">
          <defs>
            <clipPath id="new-data-alone-map-clip">
              <circle cx="244" cy="244" r="242" />
            </clipPath>
          </defs>
          <path
            className="new-data-alone-line new-data-alone-line-handoff"
            data-flow-line
            d="M486 266 H558 C582 266 594 282 594 306 V356 C594 382 610 398 636 398 H666"
          />
          <g clipPath="url(#new-data-alone-map-clip)">
            <path
              className="new-data-alone-line new-data-alone-line-map"
              data-flow-line
              d="M204 128 H398 C445 128 468 152 468 198 V270 C468 316 444 340 398 340 H306 C278 340 262 356 262 386 V420"
            />
            <path
              className="new-data-alone-line new-data-alone-line-map"
              data-flow-line
              d="M146 190 C174 218 206 220 252 220 H386 C426 220 446 240 446 280 V304 C446 332 426 348 388 348 H286"
            />
            <path
              className="new-data-alone-line new-data-alone-line-map"
              data-flow-line
              d="M172 282 V322 C172 360 194 382 236 382 H334 C374 382 396 402 396 438"
            />
            <path
              className="new-data-alone-line new-data-alone-line-map"
              data-flow-line
              d="M356 282 V322 C356 360 378 382 424 382 H466"
            />
            <circle className="new-data-alone-line-node" cx="204" cy="128" r="4.5" />
            <circle className="new-data-alone-line-node" cx="146" cy="190" r="4.5" />
            <circle className="new-data-alone-line-node" cx="262" cy="420" r="4.5" />
            <circle className="new-data-alone-line-node" cx="396" cy="438" r="4.5" />
          </g>
        </svg>

        <div className="new-data-alone-map" aria-label="The part only Waldo needs to worry about">
          <div className="new-data-alone-map-inner">
            <div className="new-data-alone-account-row" aria-hidden="true">
              {accountConnectors.map((account, index) => (
                <span className="new-data-alone-account-chip" key={`${account.label}-${index}`}>
                  <span className="new-data-alone-avatar">{account.initials}</span>
                  <span>{account.label}</span>
                  <ConnectorChip connector={getConnector(account.id)} label={false} />
                </span>
              ))}
            </div>

            <div className="new-data-alone-chart-row">
              <Image
                className="new-data-alone-chart"
                src="/assets/home/data-alone/readiness-chart.svg"
                alt=""
                width={260}
                height={86}
              />
              <Image
                className="new-data-alone-chart"
                src="/assets/home/data-alone/load-chart.svg"
                alt=""
                width={260}
                height={86}
              />
            </div>

            <div className="new-data-alone-signal-row">
              <span className="new-data-alone-signal-chip">
                <span>HRV</span>
                <em>-18ms</em>
              </span>
              <span className="new-data-alone-signal-chip">
                <ConnectorChip connector={getConnector("gmail")} label={false} />
                <span>GMail</span>
                <em>+52 Mails</em>
              </span>
              <span className="new-data-alone-signal-chip">
                <ConnectorChip connector={getConnector("google-calendar")} label={false} />
                <span>Calendar</span>
                <em>+6 Meets</em>
              </span>
            </div>

            <div className="new-data-alone-score-row">
              <span className="new-data-alone-score-chip">
                <span>Form</span>
                <em>up</em>
              </span>
              <span className="new-data-alone-score-chip">
                <span>Weight</span>
                <em>up</em>
              </span>
            </div>

            <p>The part only Waldo needs to worry about.</p>
          </div>

          <div className="new-data-alone-map-connectors" aria-hidden="true">
            {mapConnectors.map((id, index) => (
              <ConnectorChip
                className="new-data-alone-map-chip"
                connector={getConnector(id)}
                key={id}
                label={false}
                style={{ "--map-chip-index": index } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <article className="new-data-alone-handoff-card" data-level={activeAutonomyLevel.key} key={activeAutonomyLevel.key}>
          <div className="new-data-alone-handoff-meta">
            <span>{activeAutonomyLevel.level}</span>
            <span>{activeAutonomyLevel.mode}</span>
          </div>
          <div className="new-data-alone-handoff-title">
            <span>Readiness check for</span>
            <strong>
              Weekly team Sync - 9:00
              <span className="new-data-alone-handoff-icons" aria-hidden="true">
                <ConnectorChip connector={getConnector("google-calendar")} label={false} />
                <ConnectorChip connector={getConnector("gmail")} label={false} />
              </span>
            </strong>
          </div>
          <p>{activeAutonomyLevel.body}</p>
          <div className="new-data-alone-handoff-actions">
            <button type="button">{activeAutonomyLevel.primaryAction}</button>
            <button type="button">{activeAutonomyLevel.secondaryAction}</button>
          </div>
        </article>

        <div className="new-data-alone-toggle" role="tablist" aria-label="Autonomy level">
          {autonomyLevels.map((level) => (
            <button
              aria-label={`${level.level}: ${level.mode}`}
              aria-pressed={activeLevel === level.key}
              className="new-data-alone-toggle-button"
              data-active={activeLevel === level.key ? "true" : "false"}
              key={level.key}
              onClick={() => setActiveLevel(level.key)}
              type="button"
            >
              <span>{level.label}</span>
              <em>{level.level}</em>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
