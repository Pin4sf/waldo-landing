"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

import { ConnectorChip } from "@/components/connectors/connector-chip";
import { connectors, type Connector } from "@/components/connectors/connector-data";

type ProfessionCardStyle = CSSProperties & {
  "--profession-tilt"?: string;
};

type ProfessionCard = {
  title: string;
  asset: string;
  connectorIds: string[];
  tilt: string;
};

const connectorById = new Map(connectors.map((connector) => [connector.id, connector]));

const getConnector = (id: string) => connectorById.get(id) as Connector;

const professionWaveConnectors = [
  "microsoft-outlook",
  "google-calendar",
  "gmail",
  "linear",
  "slack",
  "notion",
  "figma",
  "github",
  "hubspot",
  "salesforce",
  "apple-health",
  "strava",
  "garmin",
  "whoop",
  "oura",
  "google-fit",
];

const iconWaveLoopCount = 4;
const professionWaveConnectorsWithLoop = Array.from({ length: iconWaveLoopCount }, () => professionWaveConnectors).flat();
const cardConnectorLimit = 5;

const professionCards: ProfessionCard[] = [
  {
    title: "For Consultants",
    asset: "/assets/home/profiles/profession-consultants.svg",
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
    tilt: "-1.2deg",
  },
  {
    title: "For Athletes",
    asset: "/assets/home/profiles/profession-athletes.svg",
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
    tilt: "1.4deg",
  },
  {
    title: "For Founders",
    asset: "/assets/home/profiles/profession-founders.svg",
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
    tilt: "-0.6deg",
  },
  {
    title: "For Engineers",
    asset: "/assets/home/profiles/profession-engineers.svg",
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
    tilt: "1deg",
  },
  {
    title: "For Investors",
    asset: "/assets/home/profiles/profession-investors.svg",
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
    tilt: "-1deg",
  },
];

const marqueeCardLoopCount = 3;
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

function ProfessionIconWave() {
  return (
    <div className="new-profession-icon-wave" aria-hidden="true">
      <div className="new-profession-icon-wave-track">
        {professionWaveConnectorsWithLoop.map((id, index) => (
          <span key={`${id}-${index}`} className="new-profession-icon-wave-item">
            <ConnectorChip className="new-profession-icon-wave-logo" connector={getConnector(id)} label={false} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProfessionSection() {
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeFrameRef = useRef<number | null>(null);
  const marqueePreviousFrameRef = useRef<number | null>(null);
  const marqueeOffsetRef = useRef(0);
  const marqueeLoopWidthRef = useRef(1);
  const marqueeDragStartXRef = useRef(0);
  const marqueeDragStartOffsetRef = useRef(0);
  const marqueeDraggingRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const [isUserDragging, setIsUserDragging] = useState(false);

  const syncMarqueeLoopWidth = useCallback(() => {
    const track = marqueeTrackRef.current;

    if (!track) {
      return;
    }

    marqueeLoopWidthRef.current = Math.max(1, track.scrollWidth / marqueeCardLoopCount);
  }, []);

  const writeMarqueeOffset = useCallback((offset: number) => {
    const track = marqueeTrackRef.current;
    const loopWidth = marqueeLoopWidthRef.current || 1;
    const wrappedOffset = ((offset % loopWidth) + loopWidth) % loopWidth;

    marqueeOffsetRef.current = wrappedOffset;
    track?.style.setProperty("--marquee-loop-x", `${-wrappedOffset}px`);
    track?.style.setProperty("--marquee-drag-x", "0px");
  }, []);

  const finishMarqueeDrag = useCallback(() => {
    if (!marqueeDraggingRef.current) {
      return;
    }

    marqueeDraggingRef.current = false;
    setIsUserDragging(false);
  }, []);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      prefersReducedMotionRef.current = reduceMotionQuery.matches;
    };
    const handleResize = () => {
      syncMarqueeLoopWidth();
      writeMarqueeOffset(marqueeOffsetRef.current);
    };
    const tick = (time: number) => {
      if (marqueePreviousFrameRef.current === null) {
        marqueePreviousFrameRef.current = time;
      }

      const elapsed = time - marqueePreviousFrameRef.current;
      marqueePreviousFrameRef.current = time;

      if (!marqueeDraggingRef.current && !prefersReducedMotionRef.current) {
        const speed = window.innerWidth < 735 ? 26 : 34;
        writeMarqueeOffset(marqueeOffsetRef.current + (elapsed / 1000) * speed);
      }

      marqueeFrameRef.current = requestAnimationFrame(tick);
    };
    const handleWindowPointerEnd = () => {
      finishMarqueeDrag();
    };

    syncMarqueeLoopWidth();
    updateReducedMotion();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointerup", handleWindowPointerEnd);
    window.addEventListener("pointercancel", handleWindowPointerEnd);
    reduceMotionQuery.addEventListener("change", updateReducedMotion);
    marqueePreviousFrameRef.current = null;
    marqueeFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerup", handleWindowPointerEnd);
      window.removeEventListener("pointercancel", handleWindowPointerEnd);
      reduceMotionQuery.removeEventListener("change", updateReducedMotion);

      if (marqueeFrameRef.current !== null) {
        cancelAnimationFrame(marqueeFrameRef.current);
      }
    };
  }, [finishMarqueeDrag, syncMarqueeLoopWidth, writeMarqueeOffset]);

  const handleMarqueePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    syncMarqueeLoopWidth();
    marqueeDraggingRef.current = true;
    marqueeDragStartXRef.current = event.clientX;
    marqueeDragStartOffsetRef.current = marqueeOffsetRef.current;
    setIsUserDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleMarqueePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!marqueeDraggingRef.current) {
      return;
    }

    event.preventDefault();
    writeMarqueeOffset(marqueeDragStartOffsetRef.current - (event.clientX - marqueeDragStartXRef.current));
  };

  const handleMarqueePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!marqueeDraggingRef.current) {
      return;
    }

    finishMarqueeDrag();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="new-profession-section new-home-section new-home-wide" aria-labelledby="professions-title">
      <div className="new-profession-copy-stage" data-animate="blur-fade">
        <ProfessionIconWave />
        <div className="new-profession-copy new-home-copy-stack">
          <h2 id="professions-title" className="type-h2">
            Same Waldo. Different hats.
          </h2>
          <p className="type-body tone-secondary">
            <strong>Waldo works with every profession.</strong> With the tools and playbooks already tuned for how you work; from a grandma’s bakery down the street to the C-suite - he’s got all of it handled.
          </p>
          <Link className="new-profession-link" href="/features">
            See All Applications →
          </Link>
        </div>
      </div>

      <div
        className="new-profession-marquee"
        data-animate="blur-fade"
        data-dragging={isUserDragging ? "true" : "false"}
        data-user-dragging={isUserDragging ? "true" : "false"}
        role="region"
        aria-label="Profession cards. Drag horizontally to explore."
        onPointerDown={handleMarqueePointerDown}
        onPointerMove={handleMarqueePointerMove}
        onPointerUp={handleMarqueePointerUp}
        onPointerCancel={handleMarqueePointerUp}
        onLostPointerCapture={handleMarqueePointerUp}
      >
        <div className="new-profession-marquee-track" ref={marqueeTrackRef}>
          {marqueeCardsWithLoop.map((card, index) => {
            const style: ProfessionCardStyle = {
              "--profession-tilt": card.tilt,
            };

            return (
              <article key={`${card.title}-${index}`} className="new-profession-card-shell" style={style} aria-label={card.title}>
                <Image className="new-profession-exported-card" src={card.asset} alt="" width={425} height={474} draggable={false} />
                <ProfessionLogoStack connectorIds={card.connectorIds} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
