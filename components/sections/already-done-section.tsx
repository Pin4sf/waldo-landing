// "Already done." — Waldo chat UI mockup + copy about autonomous action.

import type { ReactNode } from "react";
import Image from "next/image";

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="4" cy="4" r="2.8" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M6.5 6.5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function SidebarItem({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex gap-[7.279px] items-center">
      <div
        className="flex items-center overflow-clip p-[3.882px] rounded-[14.559px] shrink-0"
        style={{ background: "rgba(26,26,26,0.06)" }}
      >
        <div className="size-[9.706px] flex items-center justify-center text-[#1a1a1a]">
          {icon}
        </div>
      </div>
      <span
        className="font-normal text-[#1a1a1a] text-[8.735px] whitespace-nowrap"
        style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
      >
        {label}
      </span>
    </div>
  );
}

export function AlreadyDoneSection() {
  return (
    <section className="flex flex-col gap-[50px] items-center pb-[30px] w-full">
      {/* Waldo chat UI mockup — desktop only */}
      <div
        data-animate="fade-up"
        className="hidden lg:flex bg-[#fafaf8] border-2 border-[rgba(26,26,26,0.08)] border-solid flex-col items-center overflow-clip pt-[70px] w-full"
        style={{ height: "750px", borderRadius: "30px" }}
      >
        {/* Scaled mockup of Waldo interface */}
        <div
          className="bg-[#f4f3f0] flex items-start shrink-0"
          style={{ padding: "4.853px", borderRadius: "19.412px" }}
        >
          {/* Sidebar */}
          <div
            className="bg-[#f4f3f0] flex flex-col gap-[19.412px] items-start self-stretch shrink-0"
            style={{
              padding: "19.412px",
              borderRadius: "14.559px 0 0 14.559px",
              width: "153.838px",
            }}
          >
            {/* Logo */}
            <Image src="/logo.svg" alt="Waldo" width={44} height={11} unoptimized style={{ height: "10.676px", width: "44.162px" }} />

            {/* Top nav items */}
            <div className="flex flex-col gap-[7.279px] items-start w-full">
              <SidebarItem icon={<PlusIcon />} label="New Chat" />
              <SidebarItem icon={<SearchIcon />} label="Connectors" />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[rgba(26,26,26,0.12)]" />

            {/* Secondary nav */}
            <div className="flex flex-col gap-[7.279px] items-start">
              <SidebarItem icon={<SearchIcon />} label="Fetches" />
              <SidebarItem icon={<SearchIcon />} label="Constellations" />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[rgba(26,26,26,0.12)]" />

            {/* Your chats */}
            <div className="flex flex-col gap-[7.279px] items-start">
              <SidebarItem icon={<PlusIcon />} label="Your Chats" />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[rgba(26,26,26,0.12)]" />

            {/* Recents */}
            <div
              className="flex flex-col gap-[7.279px] items-start font-normal"
              style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontSize: "5.824px", lineHeight: 1.3 }}
            >
              <span className="text-[#1a1a1a]">Recents</span>
              <span className="text-[#6b6b68]">Client Onboarding Workflow</span>
              <span className="text-[#6b6b68]">Content Review for Social ...</span>
              <span className="text-[#6b6b68]">SPN Branding</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[rgba(26,26,26,0.12)]" />

            {/* User */}
            <div className="flex gap-[7.279px] items-center">
              <div
                className="flex items-center overflow-clip p-[3.882px] rounded-[14.559px] shrink-0 bg-[#b00c0c]"
                style={{ width: "21.353px", height: "21.353px" }}
              />
              <div
                className="flex flex-col gap-[2.426px] items-start font-normal whitespace-nowrap"
                style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
              >
                <span className="text-[#1a1a1a] text-[8.735px]">Suyash Pingale</span>
                <span className="text-[#6b6b68] text-[5.824px]">SPN Branding</span>
              </div>
            </div>
          </div>

          {/* Main content area — Waldo explainer video */}
          <div
            className="border-[0.485px] border-[rgba(26,26,26,0.16)] border-solid bg-[#fafaf8] overflow-hidden"
            style={{ height: "592.542px", width: "707.557px", borderRadius: "13.588px" }}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/waldo-explainer.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-[24px] lg:gap-[30px] items-center text-center w-full px-4 lg:px-0">
        <h2
          data-animate="headline"
          className="text-[#1a1a1a] text-[32px] lg:text-[48px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
        >
          Already done.
        </h2>
        <p
          data-animate="fade-up"
          className="text-[#1a1a1a] text-[18px] lg:text-[25px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.2 }}
        >
          Not just a suggestion or a notification.
        </p>
        <p
          data-animate="fade-up"
          className="font-normal text-[#717171] text-[14px]"
          style={{
            fontFamily: "var(--font-body)",
            fontVariationSettings: "'opsz' 14",
            lineHeight: 1.3,
            maxWidth: "455px",
            width: "100%",
          }}
        >
          Every other health app shows you the data and leaves the rest to you. Waldo reads your
          signals, makes the call, and sends you a note after the fact. You&apos;re always in charge.
          You just rarely need to be.
        </p>
      </div>
    </section>
  );
}
