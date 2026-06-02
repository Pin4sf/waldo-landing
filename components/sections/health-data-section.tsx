import Image, { type StaticImageData } from "next/image";

import appleHealthLogo from "@/components/assets/health-apple -watch.png";
import whoopLogo from "@/components/assets/health-whoop.png";

const logLines = [
  ["6:12am", "REM cycle ended. Light sleep began."],
  ["6:14am", "Resting HR: 62 bpm"],
  ["6:15am", "HRV: 38ms — 12% below your baseline"],
  ["6:41am", "First movement detected"],
  ["7:02am", "Blood oxygen: 96%"],
  ["7:15am", "Stand reminder sent. Ignored."],
  ["7:34am", "Steps: 340. Circadian: misaligned."],
  ["7:58am", "Stress: elevated. Cause: unknown."],
  ["8:00am", "Calendar: 4 meetings. Body: not ready."],
  ["8:01am", "No app acted on any of this."],
] as const;

type AppCard = {
  name: string;
  verdict: string;
  logo?: StaticImageData;
};

// Owner needs to supply real Oura, Fitbit, and Sleep Cycle logos; use text-only placeholders until those assets exist in the repo.
const appCards: AppCard[] = [
  { name: "Apple Health", verdict: "Shows you a chart.", logo: appleHealthLogo },
  { name: "WHOOP", verdict: "Gives you a score.", logo: whoopLogo },
  { name: "Oura", verdict: "Sends a notification." },
  { name: "Fitbit", verdict: "Suggests a walk." },
  { name: "Sleep Cycle", verdict: "Rates your night." },
];

export function HealthDataSection() {
  return (
    <section id="problem" className="section-shell surface-card flex scroll-mt-28 flex-col gap-8 overflow-hidden rounded-[36px] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
        <p className="type-aside text-[var(--text-tertiary)]">You already have everything Waldo needs.</p>
        <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
          Months of health data.
          <br />
          Zero health decisions.
        </h2>
      </div>

      <div className="rounded-[20px] bg-[var(--ink)] p-4 text-[var(--surface-t2)] shadow-[var(--shadow-elevated)] sm:p-6 lg:p-8">
        <div className="mb-5 flex items-center gap-2 border-b border-[var(--border-dark)] pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--zone-peak)] opacity-40 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--zone-peak)]" />
            </span>
            <p className="type-caption uppercase text-[var(--surface-t2)]">LIVE — YOUR WATCH IS LOGGING</p>
          </div>
        </div>

        <ol className="grid gap-2.5">
          {logLines.map(([time, event], index) => (
            <li
              key={`${time}-${event}`}
              className="grid gap-2 rounded-xl border border-[var(--border-dark)] bg-[var(--dark-t2)] px-3 py-2.5 motion-safe:animate-[content-enter_500ms_var(--ease-premium)_both] sm:grid-cols-[80px_1fr] sm:items-baseline sm:px-4"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="type-data type-caption text-[var(--text-tertiary)]">{time}</span>
              <span className="type-data type-label text-[var(--surface-t2)]">{event}</span>
            </li>
          ))}
        </ol>

        <p className="type-aside mt-5 border-t border-[var(--border-dark)] pt-4 text-[var(--text-tertiary)]">
          Your watch logged <span className="type-data">847</span> data points last week. Nothing acted on a single one.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="type-label text-center text-[var(--ink)]">You've tried the apps.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {appCards.map((app) => (
            <details key={app.name} className="group/app min-h-[148px] [perspective:900px]">
              <summary className="focusable-ring h-full cursor-pointer list-none rounded-[16px] outline-none [&::-webkit-details-marker]:hidden">
                <div className="relative h-full min-h-[148px] transition-transform duration-300 ease-[var(--ease-premium)] [transform-style:preserve-3d] group-open/app:[transform:rotateY(180deg)] motion-safe:group-hover/app:[transform:rotateY(180deg)]">
                  <div className="surface-card-top absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center [backface-visibility:hidden]">
                    {app.logo ? (
                      <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[var(--surface-t2)]">
                        <Image src={app.logo} alt="" className="h-full w-full object-contain" sizes="56px" />
                      </span>
                    ) : (
                      <span className="type-label flex h-14 min-w-14 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-t2)] px-3 text-[var(--ink)]">
                        {app.name}
                      </span>
                    )}
                    <span className="type-label text-[var(--ink)]">{app.name}</span>
                  </div>
                  <div className="surface-card-top absolute inset-0 flex rotate-y-180 items-center justify-center p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="type-aside text-[var(--text-tertiary)]">{app.verdict}</p>
                  </div>
                </div>
              </summary>
            </details>
          ))}
        </div>
      </div>

      <p className="type-aside text-center text-[var(--text-tertiary)]">Every app you own is a rearview mirror.</p>
    </section>
  );
}
