"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type AccountPill = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  avatar: string;
  avatarColor: string;
  appIcon?: string;
  appLabel?: string;
  float: number;
};

type AppNode = {
  id: string;
  x: number;
  y: number;
  icon?: string;
  label: string;
  className?: string;
  delay: number;
};

const CANVAS_WIDTH = 1014;
const CANVAS_HEIGHT = 651;

const accountsGraphPills: AccountPill[] = [
  {
    id: "deployment",
    label: "deployment",
    x: 128,
    y: 326,
    width: 214,
    avatar: "D",
    avatarColor: "#2938D3",
    appIcon: "/assets/connectors/github.svg",
    appLabel: "GitHub",
    float: 0,
  },
  {
    id: "suyashp",
    label: "suyashp",
    x: 279,
    y: 170,
    width: 176,
    avatar: "S",
    avatarColor: "#EEEDE7",
    appIcon: "/assets/connectors/notion.svg",
    appLabel: "Notion",
    float: 1,
  },
  {
    id: "suyash-notion",
    label: "suyash",
    x: 654,
    y: 88,
    width: 168,
    avatar: "S",
    avatarColor: "#8299FF",
    appIcon: "/assets/connectors/linear.svg",
    appLabel: "Linear",
    float: 2,
  },
  {
    id: "administrator",
    label: "administrator",
    x: 676,
    y: 166,
    width: 218,
    avatar: "A",
    avatarColor: "#8BD913",
    appIcon: "/assets/connectors/linear.svg",
    appLabel: "Linear",
    float: 3,
  },
  {
    id: "cloudflare-admin",
    label: "Admin",
    x: 248,
    y: 486,
    width: 156,
    avatar: "A",
    avatarColor: "#8BD913",
    appLabel: "Cloudflare",
    float: 4,
  },
  {
    id: "cloudflare-user",
    label: "User",
    x: 252,
    y: 558,
    width: 158,
    avatar: "U",
    avatarColor: "#FFB13B",
    appLabel: "Cloudflare",
    float: 5,
  },
  {
    id: "sp-work",
    label: "sp@waldo.in",
    x: 826,
    y: 255,
    width: 216,
    avatar: "SP",
    avatarColor: "#10BEE8",
    appIcon: "/assets/connectors/gmail.svg",
    appLabel: "Gmail",
    float: 1,
  },
  {
    id: "suyash-gmail",
    label: "suyash@gmail.com",
    x: 846,
    y: 327,
    width: 260,
    avatar: "S",
    avatarColor: "#4793F5",
    appIcon: "/assets/connectors/gmail.svg",
    appLabel: "Gmail",
    float: 2,
  },
  {
    id: "contact-waldo",
    label: "contact@waldo.in",
    x: 816,
    y: 399,
    width: 230,
    avatar: "",
    avatarColor: "#FF8A31",
    appIcon: "/assets/connectors/gmail.svg",
    appLabel: "Gmail",
    float: 3,
  },
  {
    id: "team-jira",
    label: "Team",
    x: 640,
    y: 537,
    width: 134,
    avatar: "T",
    avatarColor: "#7C37EA",
    appLabel: "Jira",
    float: 4,
  },
];

const accountsGraphApps: AppNode[] = [
  { id: "github", x: 316, y: 326, icon: "/assets/connectors/github.svg", label: "GitHub", delay: 0 },
  { id: "notion", x: 413, y: 216, icon: "/assets/connectors/notion.svg", label: "Notion", delay: 1 },
  { id: "linear", x: 554, y: 240, icon: "/assets/connectors/linear.svg", label: "Linear", delay: 2 },
  { id: "gmail", x: 600, y: 326, icon: "/assets/connectors/gmail.svg", label: "Gmail", delay: 3 },
  { id: "cloudflare", x: 400, y: 414, label: "Cloudflare", className: "new-accounts-cloudflare-icon", delay: 4 },
  { id: "jira", x: 546, y: 413, label: "Jira", className: "new-accounts-jira-icon", delay: 5 },
];

const connectorPaths = [
  "M444 326H613M444 326L553 243M444 326L417 216M444 326H319H232M444 326L367 442M444 326L511 425",
  "M600 326H753M767 399H653C635 399 625 399 618 395C612 392 607 386 603 380C600 373 600 364 600 345V326L600 309C600 290 600 281 603 274C607 267 612 262 618 259C625 255 635 255 653 255H771",
  "M551 240H530C511 240 501 240 494 236C488 233 483 228 480 222C476 214 476 205 476 186V162M556 86H530C511 86 501 86 494 90C488 93 483 98 480 105C476 112 476 121 476 140V162M476 162H559",
  "M413 216C413 204 413 198 412 194C409 183 400 175 390 171C385 170 379 170 367 170H305",
  "M382 427H373C363 427 358 427 353 428C342 431 333 440 330 452C328 456 328 461 328 472M328 472H255M328 472V493C328 508 328 515 326 521C323 530 316 537 307 540C301 542 294 542 279 542",
  "M527 427C534 427 538 427 541 427C555 430 565 441 568 454C568 457 568 461 568 469V477C568 489 568 494 570 499C573 510 581 518 592 521C597 523 603 523 615 523",
];

function percent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function positionedStyle(x: number, y: number, extra?: Record<string, string | number>): CSSProperties {
  return {
    "--x": percent(x, CANVAS_WIDTH),
    "--y": percent(y, CANVAS_HEIGHT),
    ...extra,
  } as CSSProperties;
}

function CloudflareGlyph() {
  return (
    <span className="new-accounts-cloudflare-mark" aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}

function JiraGlyph() {
  return (
    <span className="new-accounts-jira-mark" aria-hidden>
      <span />
      <span />
    </span>
  );
}

function ServiceBadge({ pill }: { pill: AccountPill }) {
  if (pill.appIcon) {
    return (
      <span className="new-accounts-service-badge">
        <Image src={pill.appIcon} alt="" width={14} height={14} />
      </span>
    );
  }

  return (
    <span className="new-accounts-service-badge" aria-label={pill.appLabel}>
      {pill.appLabel === "Cloudflare" ? <CloudflareGlyph /> : <JiraGlyph />}
    </span>
  );
}

function AccountAvatar({ pill }: { pill: AccountPill }) {
  return (
    <span className="new-accounts-avatar" style={{ "--avatar-color": pill.avatarColor } as CSSProperties}>
      {pill.id === "contact-waldo" ? (
        <Image src="/assets/home/mascots/Vector.svg" alt="" width={34} height={26} />
      ) : (
        pill.avatar
      )}
    </span>
  );
}

function AccountPillView({ pill }: { pill: AccountPill }) {
  return (
    <span
      className="new-accounts-pill"
      style={positionedStyle(pill.x, pill.y, {
        "--pill-width": percent(pill.width, CANVAS_WIDTH),
        "--float-delay": `${pill.float * 140}ms`,
      })}
    >
      <span className="new-accounts-pill-avatar-wrap">
        <AccountAvatar pill={pill} />
        <ServiceBadge pill={pill} />
      </span>
      <span className="new-accounts-pill-label">{pill.label}</span>
    </span>
  );
}

function AppNodeView({ node }: { node: AppNode }) {
  return (
    <span
      className={`new-accounts-app-node ${node.className ?? ""}`}
      style={positionedStyle(node.x, node.y, { "--node-delay": `${node.delay * 130}ms` })}
      aria-label={node.label}
    >
      {node.icon ? <Image src={node.icon} alt="" width={26} height={26} /> : node.id === "cloudflare" ? <CloudflareGlyph /> : <JiraGlyph />}
    </span>
  );
}

function AccountsGraphCard() {
  return (
    <div className="new-accounts-graph-card">
      <svg className="new-accounts-connector-lines" viewBox="0 0 1014 651" aria-hidden>
        {connectorPaths.map((path) => (
          <path key={path} d={path} />
        ))}
      </svg>

      <span className="new-accounts-center-node" style={positionedStyle(444, 326)}>
        <Image src="/logodots.svg" alt="" width={36} height={36} />
      </span>

      {accountsGraphApps.map((node) => (
        <AppNodeView key={node.id} node={node} />
      ))}

      {accountsGraphPills.map((pill) => (
        <AccountPillView key={pill.id} pill={pill} />
      ))}
    </div>
  );
}

type AgentSvgVisualProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className: string;
};

function AgentSvgVisual({ src, alt = "", width, height, className }: AgentSvgVisualProps) {
  return (
    <div className={`new-agent-visual-card new-agent-exported-visual ${className}`}>
      <Image className="new-agent-exported-image" src={src} alt={alt} width={width} height={height} />
    </div>
  );
}

function AskThreadCard() {
  return <AgentSvgVisual src="/assets/home/agent-ask-thread.svg" width={1014} height={651} className="new-agent-exported-ask" />;
}

function PatrolCard() {
  return <AgentSvgVisual src="/assets/home/agent-patrol.svg" width={627} height={651} className="new-agent-exported-patrol" />;
}

function ApprovalCard() {
  return <AgentSvgVisual src="/assets/home/agent-approval.svg" width={565} height={625} className="new-agent-exported-approval" />;
}

export function AccountsGraphSection() {
  const slides = [
    {
      id: "accounts",
      label: "Accounts",
      className: "new-agent-accounts-card",
      visual: <AccountsGraphCard />,
      copy: (
        <>
          <strong>All your accounts, one you.</strong>{" "}
          Waldo holds your work inbox, personal inbox, calendars, docs, tools, team accounts - as a single picture instead of a dozen logins that don&apos;t talk.
        </>
      ),
    },
    {
      id: "ask",
      label: "Ask",
      className: "new-agent-ask-card",
      visual: <AskThreadCard />,
      copy: (
        <>
          <strong>Ask about any of it.</strong>{" "}
          Pin a card, ask a follow-up, build a thread around the one thing you want to understand and Waldo answers with your body data already attached.
        </>
      ),
    },
    {
      id: "patrol",
      label: "Patrol",
      className: "new-agent-patrol-card",
      visual: <PatrolCard />,
      copy: (
        <>
          <strong>The engine never clocks off.</strong>{" "}
          It reads the night, catches patterns, and builds your morning before the alarm. You wake up to a day that&apos;s already done.
        </>
      ),
    },
    {
      id: "approval",
      label: "Approval",
      className: "new-agent-approval-card",
      visual: <ApprovalCard />,
      copy: (
        <>
          <strong>It asks when it matters.</strong>{" "}
          Small stuff, handled by sub-agents. The email to the investor is where Waldo waits for your approval, Waldo knows the difference between which is which.
        </>
      ),
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const lastSlide = slides.length - 1;

  useLayoutEffect(() => {
    const activeSlideElement = slideRefs.current[activeSlide];

    if (!activeSlideElement) {
      return;
    }

    const updateHeight = () => {
      setCarouselHeight(Math.ceil(activeSlideElement.getBoundingClientRect().height));
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(activeSlideElement);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [activeSlide]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current === 0 ? lastSlide : current - 1));
  };

  const showNextSlide = () => {
    setActiveSlide((current) => (current === lastSlide ? 0 : current + 1));
  };

  return (
    <section className="new-accounts-section new-home-section new-home-band" aria-labelledby="accounts-title">
      <h2 id="accounts-title" className="sr-only">
        Waldo account and agent cards
      </h2>
      <div className="new-accounts-showcase" data-animate="blur-fade">
        <div className="new-accounts-carousel-frame">
          <button className="new-accounts-carousel-button new-accounts-carousel-button-prev" type="button" onClick={showPreviousSlide} aria-label="Show previous Waldo card">
            ‹
          </button>
          <div className="new-accounts-carousel-window" aria-live="polite" style={carouselHeight ? ({ "--carousel-height": `${carouselHeight}px` } as CSSProperties) : undefined}>
            <div className="new-accounts-carousel-track" style={{ "--active-slide": activeSlide } as CSSProperties}>
              {slides.map((slide, index) => (
                <article
                  className={`new-agent-showcase-card ${slide.className}`}
                  data-active={activeSlide === index}
                  aria-hidden={activeSlide !== index}
                  key={slide.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                >
                  {slide.visual}
                  <p className="new-accounts-copy type-body tone-secondary new-home-center">{slide.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <button className="new-accounts-carousel-button new-accounts-carousel-button-next" type="button" onClick={showNextSlide} aria-label="Show next Waldo card">
            ›
          </button>
        </div>
        <div className="new-accounts-carousel-dots" aria-label="Waldo card slides">
          {slides.map((slide, index) => (
            <button type="button" aria-current={activeSlide === index} aria-label={`Show ${slide.label} card`} key={slide.id} onClick={() => setActiveSlide(index)} />
          ))}
        </div>
      </div>
    </section>
  );
}
