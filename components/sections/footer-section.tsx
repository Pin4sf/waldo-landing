"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Aside, WaldoCTA } from "@/components/landing-primitives";

type Period = "morning" | "afternoon" | "evening" | "night";

function getPeriod(): Period {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const backgrounds: Record<Period, string> = {
  morning:
    "radial-gradient(ellipse 90% 70% at 50% 100%, color-mix(in srgb, var(--accent) 26%, transparent) 0%, transparent 68%), linear-gradient(180deg, var(--surface-t2) 0%, var(--surface-t3) 100%)",
  afternoon:
    "radial-gradient(ellipse 90% 70% at 50% 100%, color-mix(in srgb, var(--action) 14%, transparent) 0%, transparent 68%), linear-gradient(180deg, var(--surface-t2) 0%, var(--surface-t3) 100%)",
  evening:
    "radial-gradient(ellipse 100% 80% at 50% 100%, color-mix(in srgb, var(--accent) 32%, transparent) 0%, transparent 70%), linear-gradient(180deg, var(--surface-t3) 0%, var(--surface-t2) 100%)",
  night:
    "radial-gradient(ellipse 90% 70% at 50% 100%, color-mix(in srgb, var(--surface-t2) 16%, transparent) 0%, transparent 68%), linear-gradient(180deg, var(--surface-t3) 0%, var(--surface-t2) 100%)",
};

const footerLinks = [
  ["Brief", "#brief"],
  ["Actions", "#actions"],
  ["Now", "#where"],
  ["Pattern", "#constellation"],
] as const;

export function FooterSection() {
  const [period, setPeriod] = useState<Period>("afternoon");

  useEffect(() => {
    setPeriod(getPeriod());
  }, []);

  return (
    <footer
      className="relative min-h-[760px] overflow-hidden text-[var(--ink)]"
      style={{ background: backgrounds[period] }}
    >
      <div className="mx-auto flex min-h-[760px] max-w-[1200px] flex-col items-center justify-between px-4 pb-8 pt-24 text-center sm:px-6 lg:px-10">
        <div className="flex flex-col items-center gap-6" data-animate="blur-fade">
          <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
            You&apos;re not the first.
            <br />
            You&apos;re also not
            <br />
            too late. Yet.
          </h2>
          <WaldoCTA />
          <Aside>Your watch has been waiting for this.</Aside>
        </div>

        <div className="relative flex w-full flex-col items-center" data-animate="blur-fade">
          <Image
            src="/illustrations/default.svg"
            alt="Waldo resting"
            width={220}
            height={171}
            className="waldo-breathe mb-8 h-auto w-[180px] sm:w-[220px]"
          />

          <div
            className="grid w-full gap-6 rounded-[24px] border border-[var(--border-default)] p-5 text-left backdrop-blur-md sm:grid-cols-[1fr_auto] sm:items-end"
            style={{ background: "color-mix(in srgb, var(--surface-t2) 82%, transparent)" }}
          >
            <div>
              <p className="type-label text-[var(--ink)]">Product</p>
              <div className="mt-3 flex flex-wrap gap-3" data-animate="stagger" data-stagger="0.045">
                {footerLinks.map(([label, href]) => (
                  <a key={label} href={href} data-stagger-item className="type-caption tone-secondary rounded-full border border-[var(--border-default)] bg-[var(--surface-t1)] px-3 py-2 transition-[color,border-color] duration-150 hover:border-[var(--border-focus)] hover:text-[var(--ink)]">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <p className="type-caption tone-tertiary">© 2026 Waldo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
