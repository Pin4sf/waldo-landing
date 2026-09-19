"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { BuildSiteNav } from "@/components/build-site-nav";

const GITHUB_URL = "https://github.com/Pin4sf/Waldo-Kennel";

const BODY_STYLE = { fontSize: "17.1px", lineHeight: "1.4" } as const;

function SectionHeader({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: { label: string; href?: string };
}) {
  const actionClass = "shrink-0 text-[13.5px] font-medium text-[#FAFAF8]/50 transition-colors hover:text-[#FAFAF8]";
  return (
    <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
      <div className="max-w-[640px]">
        <h2 className="type-h2 text-[#FAFAF8]" style={{ letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        <p className="type-body mt-4 text-[#FAFAF8]/60" style={BODY_STYLE}>
          {body}
        </p>
      </div>
      {action.href ? (
        <a href={action.href} className={actionClass}>
          {action.label}
        </a>
      ) : (
        <span className={`${actionClass} cursor-default hover:text-[#FAFAF8]/50`}>{action.label}</span>
      )}
    </div>
  );
}

function DarkCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[30px] bg-[#161616] ${className}`}
      style={{ border: "0.5px solid rgba(255, 255, 255, 0.08)", ...style }}
    >
      {children}
    </div>
  );
}

function CardCopy({ title, body, className = "" }: { title: string; body: string; className?: string }) {
  return (
    <div className={`px-8 pb-8 pt-6 ${className}`}>
      <h3 className="text-[17.1px] font-medium leading-[1.4] text-[#FAFAF8]">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-[1.5] text-[#FAFAF8]/55">{body}</p>
    </div>
  );
}

const outcomeCards = [
  {
    src: "/build/kennel/outcome-first.svg",
    width: 440,
    height: 454,
    title: "Outcome first.",
    body: "What the project should look like in the end. Not the steps, the end state. That's the outcome, and it's the only thing Kennel measures against.",
  },
  {
    src: "/build/kennel/contracts-from-outcome.svg",
    width: 440,
    height: 454,
    title: "Contracts come from the outcome.",
    body: "Kennel breaks the outcome into contracts for agents. Right slice, right hands, each one small enough for a single session to finish and prove.",
  },
  {
    src: "/build/kennel/waldo-holds.svg",
    width: 443,
    height: 454,
    title: "Waldo holds it together.",
    body: "Waldo shapes the outcome up front, keeps every contract in step, and catches anything that drifts from the plan before it reaches you.",
  },
];

const jobCards = [
  {
    title: "Stop babysitting your agents.",
    body: "You approve the outcome, Kennel handles the rest. Each agent gets the context it needs and a contract for what's expected. No re-explaining, no tab hopping.",
  },
  {
    title: "Done means proven.",
    body: "Every contract carries its own verification. Kennel checks the work against it before it reaches you. What's marked done is done.",
  },
  {
    title: "Gets the best out of what you have.",
    body: "Kennel routes each contract to the model that fits it. Your subscriptions, your keys, and the right model for the job.",
  },
];

export default function KennelPage() {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#111111";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  return (
    <main id="main-content" className="kennel-page min-h-screen" style={{ backgroundColor: "#111111" }}>
      <BuildSiteNav variant="dark" />

      {/* Hero — exception: uses its own fixed grid, not the shared kennelContainer, so it never moves when the container definition changes */}
      <section className="mx-auto w-full max-w-[1436px] px-6 pt-32 md:px-20">
        <div className="relative mx-auto w-[990px] max-w-full">
          <div className="relative z-[3] ml-[10px] flex items-end justify-between gap-8">
            <div className="max-w-[560px]">
              <h1
                className="type-h1 text-[#FAFAF8]"
                style={{
                  fontSize: "clamp(1.8rem, 1.485rem + 0.81vw, 2.25rem)",
                  lineHeight: "1.3",
                  letterSpacing: "-0.02em",
                }}
              >
                Kennel for Mac
              </h1>
              <p className="type-body mt-5 text-[#FAFAF8]/60" style={BODY_STYLE}>
                Kennel understands your build, and takes your agent outputs to the intended outcome.
              </p>
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="w-fit shrink-0 rounded-full bg-[#FAFAF8] px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-opacity hover:opacity-90"
            >
              Opensource on GitHub
            </a>
          </div>

          {/* kn-hero-shot-viewport: full-width clipping viewport for the fixed-size frame (frame width 990px + 80px desktop gutters = 1150px breakpoint) */}
          <div className="relative mt-16 w-full overflow-hidden">
            <div
              className="kn-hero-shot relative mx-auto overflow-hidden"
              style={{ width: "990px", maxWidth: "none", aspectRatio: "1399 / 897", background: "#111", isolation: "isolate" }}
            >
              <Image
                src="/build/kennel-hero-asset-3.svg"
                alt="Kennel app window showing a project's work queue"
                width={1399}
                height={897}
                unoptimized
                priority
                className="h-auto max-w-none"
                style={{ width: "990px" }}
              />
              <div
                aria-hidden
                className="kn-bottom-fade pointer-events-none absolute inset-x-0 bottom-0"
                style={{
                  zIndex: 2,
                  height: "20%",
                  background: "linear-gradient(in oklab to bottom, transparent 0%, rgba(17, 17, 17, 0.12) 45%, #111 100%)",
                  backdropFilter: "blur(1.5px)",
                  WebkitBackdropFilter: "blur(1.5px)",
                }}
              />
            </div>

            {/* kn-hero-edge-fade: shown only below the 1150px breakpoint, where the frame is clipped on the right */}
            <div
              aria-hidden
              className="kn-hero-edge-fade pointer-events-none absolute inset-y-0 right-0 hidden max-[1150px]:block"
              style={{
                width: "139px",
                zIndex: 3,
                background: "linear-gradient(in oklab to right, transparent 0%, rgba(17, 17, 17, 0.18) 55%, #111 100%)",
              }}
            />

            {/* subtle noise to dither the gradient bands above */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                zIndex: 4,
                opacity: 0.025,
                backgroundImage: "url(/noise.png)",
                backgroundRepeat: "repeat",
                mixBlendMode: "soft-light",
              }}
            />
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-32">
        <div className="section2-inner">
          <SectionHeader
            title="Agent finished is not “done.”"
            body="An output is what the session produced. An outcome is what you wanted. Every agent tool measures the outputs. Kennel is built around the outcome."
            action={{ label: "Learn More", href: GITHUB_URL }}
          />
        </div>

        {/* section2-rail-viewport: contained + 3-up grid at 1200px+; below that, bleeds to the viewport's right edge as a snap-scrolling rail, left edge pinned to the same grid as the heading */}
        <div className="section2-rail-viewport">
          <div className="section2-rail">
            {outcomeCards.map((card) => (
              <DarkCard key={card.title} className="section2-card flex flex-col">
                <div className="section2-art w-full flex-none overflow-hidden">
                  <Image
                    src={card.src}
                    alt=""
                    width={card.width}
                    height={card.height}
                    unoptimized
                    className="block h-auto w-full max-w-none"
                    style={{ objectFit: "contain", objectPosition: "top left", margin: 0, transform: "none" }}
                  />
                </div>
                <CardCopy title={card.title} body={card.body} className="mt-auto" />
              </DarkCard>
            ))}
          </div>
        </div>

        <style jsx global>{`
          /*
            --content-left / --content-right replicate the hero copy's own left/right offsets exactly
            (outer 1436px container + inner 990px column + the row's 10px nudge), so section 2 locks to
            the same x-coordinates as "Kennel for Mac" / the hero CTA without touching the hero itself.
          */
          .kennel-page {
            --content-left: 34px;
            --content-right: 24px;
          }
          @media (min-width: 768px) {
            .kennel-page {
              --content-left: max(90px, calc((100vw - 970px) / 2));
              --content-right: max(80px, calc((100vw - 990px) / 2));
            }
          }

          .section2-inner {
            margin-left: var(--content-left);
            margin-right: var(--content-right);
          }

          .section2-rail-viewport {
            margin-left: var(--content-left);
            margin-right: var(--content-right);
            width: calc(100vw - var(--content-left) - var(--content-right));
          }
          .section2-rail {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }
          @media (max-width: 1199px) {
            .section2-rail-viewport {
              margin-right: 0;
              width: calc(100vw - var(--content-left));
              overflow-x: auto;
              overscroll-behavior-x: contain;
              scroll-snap-type: x mandatory;
              scrollbar-width: none;
            }
            .section2-rail-viewport::-webkit-scrollbar {
              display: none;
            }
            .section2-rail {
              display: flex;
              width: max-content;
              gap: 12px;
              padding-right: 24px;
            }
            .section2-card {
              flex: 0 0 clamp(320px, 78vw, 520px);
              scroll-snap-align: start;
            }
          }
          @media (max-width: 767px) {
            .section2-card {
              flex-basis: 84vw;
            }
          }

          /* Shared grid for every section after section 2, reusing the same --content-left/--content-right
             defined above. (Next only allows one <style jsx> per component, so this lives in the same
             block as section 2's rules rather than a second tag further down.) */
          .kennel-inner {
            margin-left: var(--content-left);
            margin-right: var(--content-right);
          }
          /* Approve-without-switching section only: true centered full-bleed breakout, edge-to-edge
             both sides. Below the min-width floor the image stops shrinking and crops symmetrically
             instead, so the menu-bar detail stays legible. */
          .full-bleed-asset {
            position: relative;
            left: 50%;
            width: 100vw;
            margin-left: -50vw;
            overflow: hidden;
          }
          .full-bleed-asset img {
            display: block;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            min-width: 640px;
            height: auto;
            object-fit: cover;
            object-position: center top;
          }
        `}</style>
      </section>

      {/* Intent to outcome */}
      <section className="py-32">
        <div className="kennel-inner">
          <SectionHeader
            title="Turns your intent into an outcome."
            body="Waldo reads what the project already knows, and turns a loose sentence into a contract you can check."
            action={{ label: "Learn More", href: GITHUB_URL }}
          />
          {/* intent-outcome-viewport: full-width clipping viewport for the fixed-size asset (asset width
              980px + gutters = 1150px breakpoint, same flush point as the hero's kn-hero-shot-viewport) */}
          <div className="relative w-full overflow-hidden" style={{ height: "574.7px" }}>
            <div className="absolute inset-y-0 right-0 overflow-hidden" style={{ width: "980px", maxWidth: "none", isolation: "isolate" }}>
              <Image
                src="/build/kennel/intent-to-outcome.svg"
                alt="Kennel turning a loose intent into a checkable contract"
                width={1383}
                height={811}
                unoptimized
                className="h-auto max-w-none"
                style={{ width: "980px" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0"
                style={{
                  zIndex: 2,
                  height: "20%",
                  background: "linear-gradient(in oklab to bottom, transparent 0%, rgba(17, 17, 17, 0.12) 45%, #111 100%)",
                  backdropFilter: "blur(1.5px)",
                  WebkitBackdropFilter: "blur(1.5px)",
                }}
              />
            </div>

            {/* left edge fade: shown only below 1150px, where the frame clips on the left. Capped at 42%
                width so it never crosses into the "Fix session resume race condition" card (which starts
                at 49.7% of the asset's width). */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden max-[1150px]:block"
              style={{
                zIndex: 3,
                width: "42%",
                background: "linear-gradient(in oklab to left, transparent 0%, rgba(17, 17, 17, 0.18) 55%, #111 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Many hands */}
      <section className="py-32">
        <div className="kennel-inner">
          <SectionHeader
            title="One outcome. Many hands."
            body="Contracts flow to agents and subagents in dependency order – each hands off to the next and reports against the same outcome."
            action={{ label: "Learn More", href: GITHUB_URL }}
          />
          {/* many-hands-viewport: mirrors the intent-outcome section's fixed-size clipping viewport, but
              anchored left so the crop (and its fade) happens on the right instead. */}
          <div className="relative w-full overflow-hidden" style={{ height: "312.1px" }}>
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: "980px", maxWidth: "none", isolation: "isolate" }}>
              <Image
                src="/build/kennel/many-hands-2.svg"
                alt="Contracts moving between agents, a status list, and a contract card"
                width={1366}
                height={435}
                unoptimized
                className="h-auto max-w-none"
                style={{ width: "980px" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0"
                style={{
                  zIndex: 2,
                  height: "20%",
                  background: "linear-gradient(in oklab to bottom, transparent 0%, rgba(17, 17, 17, 0.12) 45%, #111 100%)",
                  backdropFilter: "blur(1.5px)",
                  WebkitBackdropFilter: "blur(1.5px)",
                }}
              />
            </div>

            {/* right edge fade: shown only below 1150px, where the frame clips on the right. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 hidden max-[1150px]:block"
              style={{
                zIndex: 3,
                width: "40%",
                background: "linear-gradient(in oklab to right, transparent 0%, rgba(17, 17, 17, 0.18) 55%, #111 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Read the card */}
      <section className="py-32">
        <div className="kennel-inner">
          <SectionHeader
            title="Read the card, not the log."
            body="Every session summarizes itself – what it did, what it's doing, what comes next. The full transcript is one click away."
            action={{ label: "Learn More", href: GITHUB_URL }}
          />
          {/* read-card-viewport: mirrors the intent-outcome section's fixed-size clipping viewport,
              anchored right so the crop (and its fade) happens on the left. */}
          <div className="relative w-full overflow-hidden" style={{ height: "482.6px" }}>
            <div className="absolute inset-y-0 right-0 overflow-hidden" style={{ width: "980px", maxWidth: "none", isolation: "isolate" }}>
              <Image
                src="/build/kennel/read-card-2.svg"
                alt="Kennel's work board with a session brief card"
                width={1385}
                height={682}
                unoptimized
                className="h-auto max-w-none"
                style={{ width: "980px" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0"
                style={{
                  zIndex: 2,
                  height: "20%",
                  background: "linear-gradient(in oklab to bottom, transparent 0%, rgba(17, 17, 17, 0.12) 45%, #111 100%)",
                  backdropFilter: "blur(1.5px)",
                  WebkitBackdropFilter: "blur(1.5px)",
                }}
              />
            </div>

            {/* left edge fade: shown only below 1150px, where the frame clips on the left. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden max-[1150px]:block"
              style={{
                zIndex: 3,
                width: "40%",
                background: "linear-gradient(in oklab to left, transparent 0%, rgba(17, 17, 17, 0.18) 55%, #111 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Island — heading stays on the shared gutters; the screenshot breaks out to a true centered full-bleed (edge-to-edge both sides) */}
      <section className="py-32">
        <div className="kennel-inner">
          <SectionHeader
            title="Approve without switching."
            body="Island puts questions, approvals, and Home – every project, what moved, what needs you – in the menu bar. Answer, and the run continues."
            action={{ label: "Coming Soon" }}
          />
        </div>
        <div className="full-bleed-asset">
          <Image
            src="/build/kennel/island-2.svg"
            alt="Kennel Island in the macOS menu bar"
            width={1440}
            height={536}
            unoptimized
            className="block h-auto w-full"
          />
        </div>
      </section>

      {/* Three things */}
      <section className="py-32">
        <div className="kennel-inner">
          <SectionHeader
            title="Three things stop being your job."
            body="Ferrying context. Picking the model. Checking the work. Kennel takes the coordinating, the checking, and the routing. You keep the decisions."
            action={{ label: "Learn More", href: GITHUB_URL }}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {jobCards.map((card) => (
              <DarkCard key={card.title} className="flex min-h-[560px] flex-col justify-end">
                <CardCopy title={card.title} body={card.body} />
              </DarkCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA — full-width background kept; inner CTA block stays centered by design (not left-aligned like the other sections), but its max-width now matches the shared guide-to-guide width */}
      <section className="bg-[#FFD351]">
        <div className="kennel-inner flex flex-col items-center py-32 text-center">
          <Image src="/build/kennel/waldo-bit.svg" alt="" width={175} height={90} unoptimized className="h-auto w-[140px]" />
          <h2
            className="type-h1 mt-10 text-[#1A1A1A]"
            style={{
              fontSize: "clamp(1.8rem, 1.485rem + 0.81vw, 2.25rem)",
              lineHeight: "1.3",
              letterSpacing: "-0.02em",
            }}
          >
            More intelligence.
            <br />
            Less for you to carry.
          </h2>
          <p className="type-body mt-4 max-w-[520px] text-[#1A1A1A]/70" style={BODY_STYLE}>
            Kennel understands your build, and takes your agent outputs to the intended outcome.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#1A1A1A] px-6 py-3 text-[13.5px] font-medium text-[#FAFAF8] transition-opacity hover:opacity-90"
            >
              Download for Mac
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[13.5px] font-medium text-[#1A1A1A] transition-opacity hover:opacity-70"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
