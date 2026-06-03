import Image from "next/image";
import goodDarkMode from "@/components/assets/good-dark-mode.svg";
import goodWeekDarkMode from "@/components/assets/good-week-dark-mode.svg";
import roughDarkMode from "@/components/assets/rough-dark-mode.svg";
import vectorSpot from "@/components/assets/Vector-1.svg";
import watchingDarkMode from "@/components/assets/watching-dark-mode.svg";
import { Aside, SectionIntro, withHighlights } from "@/components/landing-primitives";

const actions = [
  {
    title: "The Fetch",
    icon: roughDarkMode,
    body: "Stress climbs, *the important call stays*, the soft meeting moves.",
    metric: "3pm",
    read: "kept because it matters.",
  },
  {
    title: "The Adjustment",
    icon: goodWeekDarkMode,
    body: "A heavy week *gets lighter* before it turns into a wrecked Friday.",
    metric: "14/21",
    read: "Load is high; recovery time protected.",
  },
  {
    title: "The Patrol",
    icon: watchingDarkMode,
    body: "Background monitoring *keeps running* even when there is nothing worth saying.",
    metric: "24/7",
    read: "watching quietly, not pinging loudly.",
  },
  {
    title: "The Window",
    icon: goodDarkMode,
    body: "Your best focus hours are *found, held, and kept away* from low-value work.",
    metric: "2-4pm",
    read: "best window matched to deep work.",
  },
  {
    title: "The Spot",
    icon: vectorSpot,
    body: "A single pattern becomes *clear enough to say out loud*.",
    metric: "4 weeks",
    read: "long enough to stop guessing.",
  },
] as const;

export function FiveThingsSection() {
  return (
    <section id="actions" className="section-shell flex flex-col gap-8 py-10 lg:gap-10 lg:py-12">
      <SectionIntro
        title={
          <>
            Five things Waldo
            <br />
            does in the background.
          </>
        }
        aside="quiet, until it matters."
      >
        <p>
          These are the visible traces. Most of the work happens before you think to ask for it.
        </p>
      </SectionIntro>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {actions.map((action, index) => (
          <article
            key={action.title}
            className={`surface-card flex min-h-[280px] flex-col justify-between p-5 ${
              index === 0 || index === 1 ? "lg:col-span-2" : ""
            } ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-t1)]">
                <Image src={action.icon} alt="" width={44} height={38} unoptimized className="h-auto max-h-10 w-auto" />
              </div>
              <h3 className="type-h3 text-[var(--ink)]">{action.title}</h3>
              <p className="type-body tone-secondary mt-3">{withHighlights(action.body)}</p>
            </div>
            <div className="mt-6 rounded-[8px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="type-caption text-[var(--text-secondary)]">signal</span>
                <span className="type-data text-[var(--ink)]">{action.metric}</span>
              </div>
              <Aside className="mt-2">{action.read}</Aside>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
