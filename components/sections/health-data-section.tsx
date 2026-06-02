import { Aside, SectionIntro, typeStyles } from "@/components/landing-primitives";

const logLines = [
  ["6:12am", "REM cycle ended. Light sleep began.", "rough transition; morning should start slow."],
  ["6:14am", "Resting HR: 62 bpm.", "steady, but not a full recovery signal."],
  ["6:15am", "HRV: 38ms.", "below baseline; keep the first hour quiet."],
  ["6:41am", "First movement detected.", "wake timing drifted later than usual."],
  ["7:02am", "Blood oxygen: 96%.", "normal enough; no action needed there."],
  ["7:34am", "Steps: 340. Circadian: misaligned.", "body is awake, clock is not."],
  ["7:58am", "Stress elevated.", "cause unknown; calendar pressure likely."],
  ["8:00am", "Calendar: 4 meetings.", "body is not ready for that stack."],
  ["8:01am", "No app acted on any of this.", "that is the waste."],
] as const;

const appCards = [
  ["Apple Health", "Shows you a chart."],
  ["WHOOP", "Gives you a score."],
  ["Oura", "Sends a notification."],
  ["Fitbit", "Suggests a walk."],
  ["Sleep Cycle", "Rates your night."],
] as const;

export function HealthDataSection() {
  return (
    <section id="problem" className="section-shell surface-card flex flex-col gap-8 overflow-hidden p-6 sm:p-8 lg:p-12">
      <SectionIntro
        eyebrow={<span className="type-aside">You already have everything Waldo needs.</span>}
        title={
          <>
            Months of health data.
            <br />
            Zero health decisions.
          </>
        }
        aside="Every app you own is a rearview mirror."
      />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <div className="dark-panel rounded-[24px] p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--surface-t2)]" />
            <p className="type-caption uppercase text-[var(--surface-t2)]">Live - your watch is logging</p>
          </div>
          <div className="space-y-3">
            {logLines.map(([time, event, read], index) => (
              <div
                key={`${time}-${event}`}
                className="grid gap-2 rounded-2xl border border-[var(--border-dark)] bg-[var(--dark-t2)] p-3 sm:grid-cols-[72px_1fr]"
                style={{ animation: `content-enter 500ms var(--ease-premium) ${index * 45}ms both` }}
              >
                <span className="type-data text-[var(--text-secondary)]" style={{ fontSize: "0.75rem" }}>
                  {time}
                </span>
                <div>
                  <p className="type-label text-[var(--surface-t2)]">{event}</p>
                  <p className="type-aside mt-1 text-[var(--text-tertiary)]">{read}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="type-aside mt-5 text-[var(--text-tertiary)]">
            Your watch logged <span style={typeStyles.data}>847</span> data points last week. Nothing turned them into a changed day.
          </p>
        </div>

        <div className="surface-card-top flex flex-col justify-between gap-5 p-5 sm:p-6">
          <div>
            <p className="type-label text-[var(--ink)]">You have tried the apps.</p>
            <Aside className="mt-2">useful, just not decisive.</Aside>
          </div>
          <div className="grid gap-3">
            {appCards.map(([app, verdict]) => (
              <div key={app} className="group relative min-h-[72px] overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-t2)] p-4">
                <div className="transition-[opacity,transform] duration-300 ease-[var(--ease-premium)] group-hover:-translate-y-2 group-hover:opacity-0">
                  <p className="type-label text-[var(--ink)]">{app}</p>
                  <p className="type-caption mt-2 text-[var(--text-secondary)]">data in, decision out to you.</p>
                </div>
                <div className="absolute inset-0 flex translate-y-3 items-center px-4 opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-premium)] group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="type-aside text-[var(--text-tertiary)]">{verdict}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
