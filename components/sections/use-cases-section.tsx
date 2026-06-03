"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";

import { Aside, SectionIntro } from "@/components/landing-primitives";

type ConnectorIcon = {
  label: string;
  src?: string;
  initials?: string;
};

type UseCase = {
  category: string;
  headline: string;
  description: string;
  connectors: ConnectorIcon[];
};

const iconMap = {
  calendar: { label: "Calendar", src: "/assets/composio-connectors/googlecalendar.svg" },
  drive: { label: "Drive", src: "/assets/composio-connectors/googledrive.svg" },
  figma: { label: "Figma", src: "/assets/composio-connectors/figma.svg" },
  github: { label: "GitHub", src: "/assets/composio-connectors/github.svg" },
  gmail: { label: "Gmail", src: "/assets/composio-connectors/gmail.svg" },
  health: { label: "Health", initials: "HE" },
  hubspot: { label: "HubSpot", src: "/assets/composio-connectors/hubspot.svg" },
  linear: { label: "Linear", src: "/assets/composio-connectors/linear.svg" },
  notion: { label: "Notion", src: "/assets/composio-connectors/notion.svg" },
  slack: { label: "Slack", src: "/assets/composio-connectors/slack.svg" },
  spotify: { label: "Spotify", initials: "SP" },
  tasks: { label: "Tasks", initials: "TA" },
} satisfies Record<string, ConnectorIcon>;

// The downloaded Composio set does not include generic Tasks, Health, or Spotify logos yet.
// Keep those as neutral text placeholders until the owner supplies exact assets.
const useCases: UseCase[] = [
  {
    category: "Founder",
    headline: "Monday standup prep",
    description: "Pull Linear tickets, scan Slack, check team velocity. One prompt, one brief.",
    connectors: [iconMap.linear, iconMap.slack, iconMap.calendar],
  },
  {
    category: "Engineer",
    headline: "Deep work, protected.",
    description: "Block peak circadian hours for coding. Move meetings to trough. Auto-DND.",
    connectors: [iconMap.calendar, iconMap.github, iconMap.slack],
  },
  {
    category: "Sales",
    headline: "5 minutes before the call.",
    description: "Prospect context, your Form score, talking points. Ready before you dial.",
    connectors: [iconMap.calendar, iconMap.hubspot, iconMap.gmail],
  },
  {
    category: "Designer",
    headline: "Bad Form day? Waldo noticed.",
    description: "Low-Form day? Waldo moves the client review to Thursday when you are projected higher.",
    connectors: [iconMap.figma, iconMap.calendar, iconMap.slack],
  },
  {
    category: "Student",
    headline: "Exam week mode.",
    description: "Sleep debt alarm at >3h. Focus protection on study blocks. Deadlines sequenced by energy.",
    connectors: [iconMap.calendar, iconMap.tasks, iconMap.health],
  },
  {
    category: "PM",
    headline: "Sprint retro, drafted.",
    description: "Draft retro doc from Linear data, calendar patterns, and team velocity. One prompt.",
    connectors: [iconMap.linear, iconMap.notion, iconMap.calendar],
  },
  {
    category: "Creator",
    headline: "Batch day, arranged.",
    description: "Match creative work to peak hours. Batch admin to trough. Protect the flow state.",
    connectors: [iconMap.calendar, iconMap.drive, iconMap.spotify],
  },
  {
    category: "Lawyer",
    headline: "Prepped before you arrive.",
    description: "Case prep, calendar, and stress monitoring. Waldo preps you 45 min before court.",
    connectors: [iconMap.calendar, iconMap.drive, iconMap.gmail],
  },
];

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d={direction === "next" ? "M6.5 3.5 10.5 8.5 6.5 13.5" : "M10.5 3.5 6.5 8.5 10.5 13.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UseCaseIcon({ icon }: { icon: ConnectorIcon }) {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--border-default)] bg-[var(--surface-t1)]"
      title={icon.label}
      aria-label={icon.label}
    >
      {icon.src ? (
        <Image src={icon.src} alt="" width={22} height={22} className="h-auto w-auto max-w-[70%]" />
      ) : (
        <span className="type-caption text-[var(--ink)]">{icon.initials}</span>
      )}
    </span>
  );
}

export function UseCasesSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  const updateControls = () => {
    const rail = railRef.current;
    if (!rail) return;

    setCanGoBack(rail.scrollLeft > 1);
    setCanGoForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 1);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateControls();
    rail.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      rail.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  const scrollByCard = (direction: "prev" | "next") => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>("[data-use-case-card='true']");
    if (!rail || !card) return;

    const step = card.offsetWidth + 16;
    rail.scrollBy({ left: direction === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section id="use-cases" className="section-shell w-full scroll-mt-28 overflow-hidden py-10 lg:py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionIntro
          eyebrow="Use cases"
          title={
            <>
              Every profession
              <br />
              gets their own Waldo.
            </>
          }
          aside="same body, different workday."
          className="mx-0 items-start text-left"
        >
          <p>
            These are starting points. Waldo learns your profession, your tools, your patterns. By week three, it knows
            your workflow better than you do.
          </p>
        </SectionIntro>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="focusable-ring flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] text-[var(--ink)] transition-opacity duration-150 disabled:opacity-[0.42]"
            aria-label="Previous use cases"
            disabled={!canGoBack}
            onClick={() => scrollByCard("prev")}
          >
            <ArrowIcon direction="prev" />
          </button>
          <button
            type="button"
            className="focusable-ring flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] text-[var(--ink)] transition-opacity duration-150 disabled:opacity-[0.42]"
            aria-label="Next use cases"
            disabled={!canGoForward}
            onClick={() => scrollByCard("next")}
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-10 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Use cases"
      >
        <div className="flex w-max">
          {useCases.map((useCase, index) => (
            <Fragment key={useCase.category}>
              <article
                id={`use-case-${useCase.category.toLowerCase()}`}
                data-use-case-card="true"
                className="surface-card flex min-h-[290px] w-[280px] shrink-0 snap-start scroll-mt-28 flex-col p-5 md:w-[320px]"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)]" aria-hidden />
                  <p className="type-caption text-[var(--text-tertiary)] uppercase">{useCase.category}</p>
                </div>

                <h3 className="type-h3 mt-5 text-[var(--ink)]">{useCase.headline}</h3>
                <p className="type-body tone-secondary mt-3">{useCase.description}</p>

                <div className="mt-auto flex items-end justify-between gap-4 border-t border-[var(--border-default)] pt-5">
                  <div className="flex -space-x-2">
                    {useCase.connectors.map((connector) => (
                      <UseCaseIcon key={connector.label} icon={connector} />
                    ))}
                  </div>
                  <a
                    className="type-caption focusable-ring rounded-full px-2 py-1 text-[var(--ink)]"
                    href={`#use-case-${useCase.category.toLowerCase()}`}
                  >
                    Read →
                  </a>
                </div>
              </article>
              {index < useCases.length - 1 ? <div aria-hidden className="w-4 shrink-0" /> : null}
            </Fragment>
          ))}
        </div>
      </div>
      <Aside className="mt-6 text-center">start with the role. Waldo finds the rest.</Aside>
    </section>
  );
}
