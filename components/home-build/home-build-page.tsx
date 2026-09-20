"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { HandledCardsSection } from "@/components/home/handled-cards-section";
import { BuildSiteNav } from "@/components/build-site-nav";

type ProductCard = {
  icon: string;
  iconHeight: number;
  lead: string;
  line1Rest: string;
  line2: string;
  line3: string;
  cta: "try-now" | "coming-soon";
};

const productCards: ProductCard[] = [
  {
    icon: "/build/kennel-icon.svg",
    iconHeight: 73,
    lead: "Kennel for Mac.",
    line1Rest: "",
    line2: "Lives in the notch.",
    line3: "Manages your work & AI.",
    cta: "try-now",
  },
  {
    icon: "/build/plugins-icon.svg",
    iconHeight: 57,
    lead: "Plugins.",
    line1Rest: " For WhatsApp, Slack,",
    line2: "Linear, Claude, Codex, or",
    line3: "wherever you already are",
    cta: "coming-soon",
  },
  {
    icon: "/build/ios-icon.svg",
    iconHeight: 65,
    lead: "Waldo for iOS.",
    line1Rest: " Health &",
    line2: "personal context. Manages you",
    line3: "as a person.",
    cta: "coming-soon",
  },
];

type QuoteCard = {
  quote: string;
  name: string;
  source: string;
  sourceHref?: string;
  bg: string;
  textColor: string;
  x: number;
  y: number;
  rotate: number;
};

const quoteCards: QuoteCard[] = [
  {
    quote: "The model can change, your context should compound.",
    name: "Garry Tan",
    source: "Y Combinator",
    bg: "#2DB9FF",
    textColor: "#213453",
    x: -400,
    y: -10,
    rotate: -8,
  },
  {
    quote: "AI users want more — but only if they can trust it.",
    name: "6,118 respondents",
    source: "Notion x Qualtrics",
    sourceHref: "https://x.com/NotionHQ/status/2085089677535780922",
    bg: "#3E5035",
    textColor: "#B1E080",
    x: -196,
    y: 20,
    rotate: 4,
  },
  {
    quote: "Creating another review pile doesn't remove the person's responsibility.",
    name: "Andrew Chen",
    source: "LinkedIn, 2026",
    bg: "#3F345D",
    textColor: "#F6A6D2",
    x: 0,
    y: -41,
    rotate: -2,
  },
  {
    quote: "27% of people talking to AI are asking about their health.",
    name: "Societal Impact report",
    source: "Anthropic",
    bg: "#FFD351",
    textColor: "#4E301F",
    x: 192,
    y: 16,
    rotate: 1,
  },
  {
    quote: "Using an AI agent requires skills similar to managing a junior employee.",
    name: "Josh Miller",
    source: "Via X",
    bg: "#FF4B4D",
    textColor: "#531421",
    x: 404,
    y: -19,
    rotate: 5,
  },
];

function FooterScenePicture({
  className,
  imageClassName,
  style,
}: {
  className: string;
  imageClassName: string;
  style?: CSSProperties;
}) {
  return (
    <picture className={className} style={style}>
      <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
      <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
      <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
      <img src="/build/footer-scene.svg" alt="" aria-hidden="true" className={imageClassName} />
    </picture>
  );
}

function GithubMark() {
  return (
    <svg width="23" height="23" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  );
}

const KENNEL_GITHUB_URL = "https://github.com/Pin4sf/Waldo-Kennel";

function revealDelay(index: number): CSSProperties {
  return { "--reveal-delay": `${index * 90}ms` } as CSSProperties;
}

export default function HomeBuildPage() {
  const [bannerOpen, setBannerOpen] = useState(true);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-fade");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main id="main-content" className="build-page min-h-screen" style={{ backgroundColor: "#F4F3F0" }}>
      <BuildSiteNav />

      {bannerOpen && (
        <div
          className="relative flex h-[calc(25vh/0.9)] w-full flex-col items-center justify-center gap-[19px] px-6"
          style={{ backgroundColor: "#FFD351", animation: "bannerIn 0.5s cubic-bezier(.22,1,.36,1) both" }}
        >
          <button
            type="button"
            aria-label="Close announcement"
            onClick={() => setBannerOpen(false)}
            className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-[#1A1A1A]/70 hover:bg-black/5 hover:text-[#1A1A1A]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>

          <Image
            src="/build/banner-kennel-icon.svg"
            alt=""
            width={160}
            height={106}
            unoptimized
            className="h-[77px] w-auto"
            style={{ transform: "translateX(-10px)" }}
          />

          <p
            className="type-body text-center whitespace-nowrap"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-[#1A1A1A]">Introducing Kennel.</span>
            <span className="font-normal text-[#1A1A1A]/60"> Waldo&apos;s first surface, for</span>
            <br />
            <span className="font-normal text-[#1A1A1A]/60">managing multiple sessions and their outcomes.</span>
          </p>

          <Link
            href="/kennel"
            className="rounded-full bg-[#1A1A1A] px-6 py-3 text-[13.5px] font-medium text-[#FAFAF8] transition-opacity hover:opacity-90"
          >
            Try now
          </Link>
        </div>
      )}

      <section
        className="hero-stack flex flex-col items-center justify-center gap-5 px-6 pt-24"
        style={{ minHeight: "calc(75vh / 0.9 - 2.25rem)" }}
      >
        <h1
          className="type-h1 reveal reveal-in w-fit text-center text-[#1A1A1A]"
          style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
        >
          Life happens. Waldo handles it.
        </h1>

        <p
          className="type-body reveal reveal-in mx-auto w-fit text-center text-[#6B6B68]"
          style={{ fontSize: "17.1px", lineHeight: "1.4", ...revealDelay(1) }}
        >
          Waldo is the one assistant that plans like Sherlock, thinks like Einstein
          <br />
          and moves like the Flash — all in the body of a friendly dalmatian.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/waitlist"
            className="rounded-full bg-[#1A1A1A] px-6 py-3 text-[13.5px] font-medium text-[#FAFAF8] transition-opacity hover:opacity-90"
          >
            Early Access
          </Link>
          <Link
            href="/blogs"
            className="rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
          >
            Learn More
          </Link>
        </div>

        <div className="hero-cards-only -mt-1 w-full">
          <HandledCardsSection />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-[10px] px-[10px] pb-0 pt-10 md:grid-cols-3">
        {productCards.map((card, index) => {
          const content = (
            <>
              <div className="flex h-[109px] w-full items-center justify-center">
                <Image
                  src={card.icon}
                  alt=""
                  width={160}
                  height={106}
                  unoptimized
                  className="w-auto"
                  style={{ height: `${card.iconHeight}px` }}
                />
              </div>

              <p
                className="type-body whitespace-nowrap"
                style={{ fontSize: "17.1px", lineHeight: "1.4" }}
              >
                <span className="font-medium text-[#1A1A1A]">{card.lead}</span>
                <span className="font-normal text-[#6B6B68]">{card.line1Rest}</span>
                <br />
                <span className="font-normal text-[#6B6B68]">{card.line2}</span>
                <br />
                <span className="font-normal text-[#6B6B68]">{card.line3}</span>
              </p>

              <div className="mt-6">
                {card.cta === "try-now" ? (
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1A1A1A] text-white">
                      <GithubMark />
                    </span>
                    <span className="rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-colors group-hover:bg-black/5">
                      Learn More
                    </span>
                  </div>
                ) : (
                  <span className="rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A]">
                    Coming Soon
                  </span>
                )}
              </div>
            </>
          );

          if (card.cta === "try-now") {
            return (
              <a
                key={card.lead}
                href={KENNEL_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card reveal group relative flex flex-col items-center gap-6 bg-[#FFFFFF] px-8 py-10 text-center"
                style={revealDelay(index)}
              >
                <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 -translate-y-2 whitespace-nowrap rounded-full bg-[#1A1A1A] px-3 py-1.5 text-[11.7px] font-medium text-[#FAFAF8] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  Open source on GitHub
                </span>
                {content}
              </a>
            );
          }

          return (
            <div
              key={card.lead}
              className="product-card reveal flex flex-col items-center gap-6 bg-[#FFFFFF] px-8 py-10 text-center"
              style={revealDelay(index)}
            >
              {content}
            </div>
          );
        })}
      </section>

      <section className="px-[10px] py-[10px]">
        <div className="product-card reveal relative flex min-h-[calc(90vh/0.9)] flex-col items-center overflow-hidden bg-[#FFFFFF] px-8 pb-0 pt-16">
          <h2
            className="w-fit text-center text-[#1A1A1A]"
            style={{
              fontFamily: "var(--font-headline)",
              fontWeight: "var(--mottle-display-weight)" as unknown as number,
              fontSize: "clamp(1.33488rem, 1.101276rem + 0.600696vw, 1.6686rem)",
              lineHeight: "1.3",
              letterSpacing: "-0.02em",
            }}
          >
            Work &amp; Life, balanced.
          </h2>

          <p
            className="type-body mt-6 whitespace-nowrap text-center text-[#6B6B68]"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            Waldo reads, Waldo does, Waldo closes. He doesn&apos;t
            <br />
            just pile up context. He puts it to use for you.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/blogs"
              className="rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
            >
              Learn More
            </Link>
          </div>

          <div className="relative mt-12 flex w-full max-w-[500px] flex-1 flex-col justify-end">
            <Image
              src="/build/phone-mockup.png"
              alt=""
              width={628}
              height={1236}
              className="mx-auto h-auto w-full"
            />

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
              style={{
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-[10px] px-[10px] pb-[10px] md:grid-cols-2">
        <div className="product-card reveal flex flex-col items-center gap-14 bg-[#FFFFFF] px-8 pb-20 pt-20" style={revealDelay(0)}>
          <div className="flex h-[330px] w-full items-center justify-center">
            <Image
              src="/build/understands-illustration.svg"
              alt=""
              width={473}
              height={337}
              unoptimized
              className="h-[330px] w-auto"
            />
          </div>

          <p
            className="type-body whitespace-nowrap text-center"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-[#1A1A1A]">Understands</span>
            <span className="font-normal text-[#6B6B68]"> your intended outcome,</span>
            <br />
            <span className="font-normal text-[#6B6B68]">the context it needs, your constraints,</span>
            <br />
            <span className="font-normal text-[#6B6B68]">priorities and current capacity.</span>
          </p>
        </div>

        <div className="product-card reveal flex flex-col items-center gap-14 bg-[#FFFFFF] px-8 pb-20 pt-20" style={revealDelay(1)}>
          <div className="flex h-[330px] w-full items-center justify-center">
            <Image
              src="/build/coordinates-illustration.svg"
              alt=""
              width={322}
              height={336}
              unoptimized
              className="h-[330px] w-auto"
            />
          </div>

          <p
            className="type-body whitespace-nowrap text-center"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-[#1A1A1A]">Coordinates</span>
            <span className="font-normal text-[#6B6B68]"> the work across the</span>
            <br />
            <span className="font-normal text-[#6B6B68]">agents, tools and apps you already use,</span>
            <br />
            <span className="font-normal text-[#6B6B68]">under authority you granted explicitly.</span>
          </p>
        </div>
      </section>

      <div className="bg-[#161616]">
      <section className="grid grid-cols-1 gap-[10px] px-[10px] pb-[10px] md:grid-cols-2">
        <div className="product-card reveal flex flex-col items-center gap-14 bg-[#1A1A1A] px-8 pb-20 pt-20" style={revealDelay(0)}>
          <div className="flex h-[523px] w-full items-center justify-center">
            <Image
              src="/build/verifies-illustration.svg"
              alt=""
              width={375}
              height={447}
              unoptimized
              className="h-[523px] w-auto"
            />
          </div>

          <p
            className="type-body whitespace-nowrap text-center"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-white">Returns</span>
            <span className="font-normal text-white/60"> only for consequential</span>
            <br />
            <span className="font-normal text-white/60">judgment. Quiet by default; interrupts</span>
            <br />
            <span className="font-normal text-white/60">when it&apos;s genuinely yours to decide.</span>
          </p>
        </div>

        <div className="product-card reveal flex flex-col items-center gap-14 bg-[#1A1A1A] px-8 pb-20 pt-20" style={revealDelay(1)}>
          <div className="flex h-[523px] w-full items-center justify-center">
            <Image
              src="/build/returns-illustration.svg"
              alt=""
              width={465}
              height={453}
              unoptimized
              className="h-[523px] w-auto"
            />
          </div>

          <p
            className="type-body whitespace-nowrap text-center"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-white">Verifies &amp; checks</span>
            <span className="font-normal text-white/60"> what actually</span>
            <br />
            <span className="font-normal text-white/60">became true, and carries forward</span>
            <br />
            <span className="font-normal text-white/60">what&apos;s still open.</span>
          </p>
        </div>
      </section>

      <section className="product-card reveal mx-[10px] mb-[10px] flex min-h-[calc(90vh/0.9)] flex-col items-center gap-6 overflow-hidden bg-[#1A1A1A] px-6 pb-0 pt-20 text-center">
        <h2
          className="type-h1 w-fit text-white"
          style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
        >
          Longer he learns, smarter he gets.
        </h2>

        <p
          className="type-body mx-auto w-fit text-center text-white/60"
          style={{ fontSize: "17.1px", lineHeight: "1.4" }}
        >
          Months in, Waldo gets to know you, more than you do.
          <br />
          He finds the patterns &amp; how you can compound.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/blogs"
            className="rounded-full border border-white/20 px-6 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-white/5"
          >
            Learn More
          </Link>
        </div>

        <div className="relative mt-12 flex w-full max-w-[1030px] flex-1 flex-col justify-end">
          <Image
            src="/build/network-graph.svg"
            alt=""
            width={1030}
            height={515}
            unoptimized
            className="h-auto w-full"
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[112px]"
            style={{
              background: "linear-gradient(to bottom, rgba(26,26,26,0) 0%, rgba(26,26,26,1) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[112px]"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-[10px] px-[10px] pb-[10px] md:grid-cols-2">
        <div className="product-card reveal relative flex flex-col items-center gap-6 overflow-hidden bg-[#1A1A1A] px-8 pb-0 pt-20 text-center" style={revealDelay(0)}>
          <h2
            className="type-h1 w-fit text-white"
            style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
          >
            Same Waldo. Different hats.
          </h2>

          <p
            className="type-body mx-auto w-fit max-w-[420px] text-center"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-white">Waldo works with every profession.</span>
            <span className="font-normal text-white/60"> With the tools and playbooks already tuned for how you work.</span>
          </p>

          <Link
            href="/blogs"
            className="rounded-full border border-white/20 px-6 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-white/5"
          >
            Learn More
          </Link>

          <div className="relative -mx-[22px] mt-12 flex w-[calc(100%+44px)] flex-1 flex-col justify-end">
            <Image
              src="/build/professions-illustration.svg"
              alt=""
              width={684}
              height={540}
              unoptimized
              className="h-auto w-full"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[288px]"
            style={{
              background: "linear-gradient(to bottom, rgba(26,26,26,0) 0%, rgba(26,26,26,1) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[288px]"
            style={{
              backdropFilter: "blur(8.4px)",
              WebkitBackdropFilter: "blur(8.4px)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>

        <div className="product-card reveal relative flex flex-col items-center gap-6 overflow-hidden bg-[#1A1A1A] px-8 pb-0 pt-20 text-center" style={revealDelay(1)}>
          <h2
            className="type-h1 w-fit text-white"
            style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
          >
            Cares for you &amp; your health.
          </h2>

          <p
            className="type-body mx-auto w-fit max-w-[420px] text-center"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            <span className="font-medium text-white">Watches how you're actually doing.</span>
            <span className="font-normal text-white/60"> Then shapes the day around what your body can actually handle.</span>
          </p>

          <Link
            href="/blogs"
            className="rounded-full border border-white/20 px-6 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-white/5"
          >
            Learn More
          </Link>

          <div className="relative -mx-[22px] mt-12 flex w-[calc(100%+44px)] flex-1 flex-col justify-end">
            <Image
              src="/build/health-illustration.svg"
              alt=""
              width={685}
              height={623}
              unoptimized
              className="h-auto w-full"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[154px]"
            style={{
              background: "linear-gradient(to bottom, rgba(26,26,26,0) 0%, rgba(26,26,26,1) 89.2%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[154px]"
            style={{
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            }}
          />
        </div>
      </section>
      </div>

      <section className="product-card mx-[10px] mb-[10px] mt-[10px] flex h-[calc(75vh/0.9)] items-center justify-center bg-[#FFFFFF] p-[10px] text-center">
      <div className="flex flex-col items-center gap-20">
        <h2
          className="type-h1 w-fit text-[#1A1A1A]"
          style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
        >
          AI is smart, but not accountable.
        </h2>

        <div className="quote-cluster reveal-fade relative h-[420px] w-full max-w-[1200px]">
          {quoteCards.map((card, index) => (
            <div
              key={card.name}
              className="quote-card absolute left-1/2 top-1/2 flex h-[340px] w-[260px] flex-col justify-between rounded-[20px] px-7 py-9 text-left"
              style={
                {
                  backgroundColor: card.bg,
                  "--qx": `${card.x}px`,
                  "--qy": `${card.y}px`,
                  "--qr": `${card.rotate}deg`,
                  zIndex: index + 1,
                } as CSSProperties
              }
            >
              <p
                style={{
                  color: card.textColor,
                  fontFamily: "var(--font-headline)",
                  fontWeight: "var(--mottle-display-weight)" as unknown as number,
                  fontSize: "19.8px",
                  lineHeight: "1.3",
                  letterSpacing: "-0.02em",
                }}
              >
                {card.quote}
              </p>

              <div className="type-body" style={{ color: card.textColor, fontSize: "17.1px", lineHeight: "1.4" }}>
                <p className="font-medium">{card.name}</p>
                {card.sourceHref ? (
                  <a
                    href={card.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline opacity-80"
                    style={{ color: card.textColor }}
                  >
                    {card.source}
                  </a>
                ) : (
                  <p className="opacity-80">{card.source}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/blogs"
          className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
        >
          Learn More
        </Link>
      </div>
      </section>

      <section className="product-card reveal relative mx-[10px] mb-[40px] flex h-[calc(75vh/0.9)] flex-col items-center overflow-hidden bg-[#FFFFFF] px-[10px] pb-0 pt-[10px] text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <h2
            className="type-h1 w-fit text-[#1A1A1A]"
            style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
          >
            Kennel for Mac
          </h2>

          <p
            className="type-body mx-auto w-fit max-w-[480px] text-center text-[#6B6B68]"
            style={{ fontSize: "17.1px", lineHeight: "1.4" }}
          >
            Waldo&apos;s first surface. Free and open source, for
            <br />
            managing multiple sessions and their outcomes.
          </p>

          <Link
            href="/kennel"
            className="rounded-full bg-[#1A1A1A] px-6 py-3 text-[13.5px] font-medium text-[#FAFAF8] transition-opacity hover:opacity-90"
          >
            Try now
          </Link>
        </div>

        <div className="-mx-[22px] w-[calc(100%+44px)]">
          <Image
            src="/build/menubar-illustration.svg"
            alt=""
            width={1419}
            height={419}
            unoptimized
            className="h-auto w-full"
          />
        </div>
      </section>

      <section
        className="new-scene-close-section relative w-[calc(100vw/0.9)] self-start overflow-hidden bg-[#f4f3f0] text-[var(--ink)] [margin-left:calc(50%-50vw/0.9)] [margin-right:calc(50%-50vw/0.9)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 select-none bg-[#f4f3f0]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[calc(30svh/0.9)] bg-gradient-to-b from-[#f4f3f0] via-[#f4f3f0]/70 to-transparent"
        />
        <FooterScenePicture
          className="new-scene-close-art pointer-events-none absolute inset-0 z-[2] block h-full w-full select-none"
          imageClassName="block h-full w-full"
        />

        <div className="new-scene-close-copy-zone relative z-[3] mx-auto flex max-w-[815px] flex-col items-center justify-start px-4 text-center sm:px-6 lg:px-10">
          <h2 className="new-scene-close-title text-[var(--ink)]">
            Your agents aren&apos;t
            <br />
            going to fix your life.
          </h2>
          <p className="new-scene-close-copy" style={{ marginTop: "20px" }}>
            One Waldo across work and life, coordinating the intelligence
            <br />
            around you and carrying what matters.
          </p>
          <div className="new-scene-close-actions flex items-center gap-3" style={{ marginTop: "28px" }}>
            <Link href="/waitlist" className="waldo-cta focusable-ring">
              Early Access
            </Link>
            <Link
              href="/kennel"
              className="rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
            >
              Start with Kennel
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        html {
          zoom: 0.9;
        }
        .build-page .build-site-nav {
          zoom: calc(1 / 0.9);
        }
        .hero-cards-only .new-handled-cta-panel {
          display: none;
        }
        .hero-cards-only .new-handled-section {
          gap: 0;
          padding: 0;
        }
        .hero-cards-only .new-handled-deck-stage {
          margin-top: -19px;
        }
        .hero-cards-only .new-handled-card-button[data-card-state="dock"] {
          transform: translate3d(var(--handled-card-left), calc(var(--handled-card-top) - 28px), 0) rotate(var(--handled-card-rotate)) scale(calc(var(--handled-card-scale) * 0.9));
        }
        .build-page .type-h1 {
          font-size: clamp(1.8rem, 1.485rem + 0.81vw, 2.25rem);
        }
        .build-page .new-scene-close-title {
          font-size: clamp(2.25rem, 1.98rem + 0.81vw, 2.8125rem);
        }
        .build-page .new-scene-close-section {
          aspect-ratio: 1440 / 1060;
        }
        .build-page .new-scene-close-copy-zone {
          padding-top: clamp(90px, 14svh, 180px);
        }
        /* Desktop / landscape: show the whole illustration edge to edge,
           anchored to the bottom, instead of cover-cropping it. */
        @media (min-width: 1025px), (orientation: landscape) {
          .build-page .new-scene-close-art img {
            object-fit: contain;
            object-position: center bottom;
          }
        }
        .build-page .new-scene-close-copy {
          font-size: 17.1px;
        }
        .build-page .waldo-cta {
          font-size: 13.5px;
          height: auto;
          padding: 12px 24px;
        }
        .product-card {
          border-radius: 20px;
          corner-shape: superellipse(4);
        }

        @keyframes bannerIn {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .build-page button[aria-label="Close announcement"] svg {
          transition: transform 0.2s ease;
        }
        .build-page button[aria-label="Close announcement"]:hover svg {
          transform: rotate(90deg);
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
          transition-delay: var(--reveal-delay, 0ms);
        }
        .reveal.reveal-in {
          opacity: 1;
          transform: translateY(0);
        }

        .quote-card {
          transform: translate(-50%, -50%) translate(var(--qx), var(--qy)) rotate(var(--qr));
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
        }
        .quote-cluster {
          filter: blur(8px);
          opacity: 0;
          transform: translate3d(0, 88px, 0) scale(0.86);
        }
        .quote-cluster.reveal-in {
          animation: quote-cluster-enter 640ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes quote-cluster-enter {
          from {
            filter: blur(8px);
            opacity: 0;
            transform: translate3d(0, 88px, 0) scale(0.86);
          }
          to {
            filter: blur(0);
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        .quote-card:hover {
          transform: translate(-50%, -50%) translate(var(--qx), var(--qy)) rotate(var(--qr)) scale(1.06) !important;
          box-shadow: 0 20px 45px rgba(0,0,0,0.2);
          z-index: 50 !important;
        }

        .build-page a[class*="rounded-full"],
        .build-page .waldo-cta {
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .build-page a[class*="rounded-full"]:hover,
        .build-page .waldo-cta:hover {
          transform: translateY(-2px);
        }
        .build-page a[class*="rounded-full"]:active,
        .build-page .waldo-cta:active {
          transform: translateY(0) scale(0.96);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .quote-cluster {
            animation: none !important;
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .quote-card, a[class*="rounded-full"], .waldo-cta {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}
