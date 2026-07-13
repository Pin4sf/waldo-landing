"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import { ConnectorChip } from "@/components/connectors/connector-chip";
import { connectors, type Connector } from "@/components/connectors/connector-data";

type ProfessionCard = {
  title: string;
  body: string;
  asset: string;
  ink: string;
  connectorIds: string[];
};

type ProfessionCardStyle = CSSProperties & {
  "--profession-card-ink": string;
};

const connectorById = new Map(connectors.map((connector) => [connector.id, connector]));

const getConnector = (id: string) => connectorById.get(id) as Connector;

const cardConnectorLimit = 5;

const professionCards: ProfessionCard[] = [
  {
    title: "For Consultants",
    body: "Waldo reads load across every account and won't let a call start over last call's residue; the meets you'd normally suffer through now get 10 mins of runway first.",
    asset: "/assets/home/profiles/profession-consultants.svg",
    ink: "#4E301F",
    connectorIds: [
      "zoom",
      "microsoft-outlook",
      "gmail",
      "google-calendar",
      "google-drive",
      "notion",
      "dropbox",
      "calendly",
      "quickbooks",
      "intercom",
      "shopify",
      "hubspot",
    ],
  },
  {
    title: "For Athletes",
    body: "Waldo reads past your training calendar; the heavy sessions that would have landed on a depleted day, are moved to where they actually compound.",
    asset: "/assets/home/profiles/profession-athletes.svg",
    ink: "#531421",
    connectorIds: [
      "strava",
      "garmin",
      "apple-health",
      "fitbit",
      "whoop",
      "oura",
      "google-fit",
      "google-health-connect",
      "whatsapp",
      "google-calendar",
    ],
  },
  {
    title: "For Founders",
    body: "Waldo reads your state before you check your phone; the snappy reply to your co-founder after three back-to-back calls is now gone for good.",
    asset: "/assets/home/profiles/profession-founders.svg",
    ink: "#3F345D",
    connectorIds: [
      "gmail",
      "google-calendar",
      "slack",
      "hubspot",
      "stripe",
      "shopify",
      "asana",
      "linear",
      "notion",
      "github",
      "intercom",
      "airtable",
    ],
  },
  {
    title: "For Engineers",
    body: "Waldo reads when your HRV says you're sharpest and hands that hour to the hard problem; the standup that used to eat it is now booked somewhere else.",
    asset: "/assets/home/profiles/profession-engineers.svg",
    ink: "#F6A6D2",
    connectorIds: [
      "github",
      "linear",
      "jira",
      "vercel",
      "supabase",
      "figma",
      "slack",
      "atlassian",
      "google-calendar",
      "discord",
    ],
  },
  {
    title: "For Investors",
    body: "Waldo spaces your pitches to a rhythm your recovery can actually sustain; the founder you'd have half-heard at pitch five now gets your pitch-one attention.",
    asset: "/assets/home/profiles/profession-investors.svg",
    ink: "#B1E080",
    connectorIds: [
      "linkedin",
      "salesforce",
      "hubspot",
      "stripe",
      "airtable",
      "dropbox",
      "gmail",
      "google-calendar",
      "notion",
      "zoom",
      "calendly",
    ],
  },
];

const marqueeCardLoopCount = 5;
const marqueeCardsWithLoop = Array.from({ length: marqueeCardLoopCount }, () => professionCards).flat();

function ProfessionLogoStack({ connectorIds }: { connectorIds: string[] }) {
  return (
    <div className="new-profession-card-logos" aria-label="Connected tools">
      {connectorIds.slice(0, cardConnectorLimit).map((id) => (
        <ConnectorChip key={id} connector={getConnector(id)} label={false} />
      ))}
    </div>
  );
}

export function ProfessionSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeLoopWidthRef = useRef(1);
  const marqueeIsWrappingRef = useRef(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const syncMarqueeLoopWidth = useCallback(() => {
    const track = marqueeTrackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.children[0] as HTMLElement | undefined;
    const nextLoopFirstCard = track.children[professionCards.length] as HTMLElement | undefined;
    const measuredLoopWidth = firstCard && nextLoopFirstCard ? nextLoopFirstCard.offsetLeft - firstCard.offsetLeft : track.scrollWidth / marqueeCardLoopCount;

    marqueeLoopWidthRef.current = Math.max(1, measuredLoopWidth);
  }, []);

  const centerMarqueeLoop = useCallback(() => {
    const marquee = marqueeRef.current;

    if (!marquee) {
      return;
    }

    syncMarqueeLoopWidth();
    marquee.scrollLeft = marqueeLoopWidthRef.current * Math.floor(marqueeCardLoopCount / 2);
  }, [syncMarqueeLoopWidth]);

  const handleMarqueeScroll = useCallback(() => {
    const marquee = marqueeRef.current;

    if (!marquee || marqueeIsWrappingRef.current) {
      return;
    }

    const loopWidth = marqueeLoopWidthRef.current || 1;
    const wrapDistance = loopWidth * Math.floor(marqueeCardLoopCount / 2);
    const minScroll = loopWidth * 0.5;
    const maxScroll = loopWidth * (marqueeCardLoopCount - 1.5);

    if (marquee.scrollLeft < minScroll || marquee.scrollLeft > maxScroll) {
      marqueeIsWrappingRef.current = true;
      marquee.scrollLeft += marquee.scrollLeft < minScroll ? wrapDistance : -wrapDistance;
      window.setTimeout(() => {
        marqueeIsWrappingRef.current = false;
      }, 0);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      syncMarqueeLoopWidth();
    };

    centerMarqueeLoop();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [centerMarqueeLoop, syncMarqueeLoopWidth]);

  return (
    <section className="new-profession-section new-home-section new-home-wide" aria-labelledby="professions-title">
      <div className="new-profession-copy-stage" data-animate="blur-fade">
        <div className="new-profession-copy new-home-copy-stack">
          <h2 id="professions-title" className="type-h2">
            Same Waldo. Different hats.
          </h2>
          <p className="type-body tone-secondary">
            <strong>Waldo works with every profession.</strong> With the tools and playbooks already tuned for how you work; from a grandma’s bakery down the street to the C-suite - he’s got all of it handled.
          </p>
        </div>
      </div>

      <div
        className="new-profession-marquee"
        data-animate="blur-fade"
        role="region"
        aria-label="Profession cards in an infinite loop."
        ref={marqueeRef}
        onScroll={handleMarqueeScroll}
      >
        <div className="new-profession-marquee-track" ref={marqueeTrackRef}>
          {marqueeCardsWithLoop.map((card, index) => {
            const cardId = `${card.title}-${index}`;
            const isBodyVisible = activeCardId === cardId;
            const cardStyle: ProfessionCardStyle = {
              "--profession-card-ink": card.ink,
            };

            return (
              <button
                key={cardId}
                aria-controls={`profession-card-body-${index}`}
                aria-expanded={isBodyVisible}
                aria-label={isBodyVisible ? `${card.title}: hide details` : `${card.title}: show details`}
                className="new-profession-card-shell"
                data-body-visible={isBodyVisible}
                onClick={() => {
                  setActiveCardId((currentCardId) => (currentCardId === cardId ? null : cardId));
                }}
                style={cardStyle}
                type="button"
              >
                <Image className="new-profession-exported-card" src={card.asset} alt="" width={425} height={474} draggable={false} />
                <p id={`profession-card-body-${index}`} className="new-profession-card-body" aria-hidden={!isBodyVisible}>
                  {card.body}
                </p>
                <ProfessionLogoStack connectorIds={card.connectorIds} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
