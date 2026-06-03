import { Aside, SectionIntro, withHighlights } from "@/components/landing-primitives";

const dimensions = [
  ["Recovery", "down", "last night *gave less*."],
  ["Form", "uneven", "capacity *keeps moving*."],
  ["Weight", "up", "day is *asking more*."],
  ["The Stack", "dense", "meetings *keep clustering*."],
  ["Signal Pressure", "high", "volume is *shaping the day*."],
  ["Task Pileup", "rising", "unfinished work is *carrying over*."],
] as const;

export function SmarterSection() {
  return (
    <section id="constellation" className="section-shell dark-panel overflow-hidden rounded-[30px] p-6 sm:p-8 lg:p-12">
      <SectionIntro
        dark
        title={
          <>
            The longer it runs,
            <br />
            the more Waldo sees.
          </>
        }
        aside="patterns you cannot see from the inside."
      >
        <p>
          {withHighlights("Tuesdays and Thursdays looked ordinary until the pattern had enough shape. *Your worst sleep follows the heaviest meeting days.* You were too close to see it. Waldo was not.")}
        </p>
      </SectionIntro>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="dark-card relative min-h-[420px] overflow-hidden rounded-[8px] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="type-label text-[var(--panel-ink)]">The Constellation</p>
              <p className="type-aside mt-1 text-[var(--text-tertiary)]">The Tuesday Crash.</p>
            </div>
            <span className="type-caption rounded-full border border-[var(--panel-border)] bg-[var(--panel-card)] px-3 py-1 text-[var(--panel-muted)]">
              4-week map
            </span>
          </div>

          <svg viewBox="0 0 640 360" className="mt-6 h-auto w-full" role="img" aria-label="Pattern map showing heavy meetings connected to short sleep and lower recovery.">
            <g stroke="var(--panel-border-focus)" strokeWidth="1.5">
              <line x1="130" y1="90" x2="315" y2="160" />
              <line x1="315" y1="160" x2="500" y2="90" />
              <line x1="315" y1="160" x2="450" y2="270" />
              <line x1="315" y1="160" x2="170" y2="268" />
              <line x1="170" y1="268" x2="450" y2="270" />
            </g>
            {[
              [130, 90, "Meeting stack"],
              [315, 160, "Short sleep"],
              [500, 90, "Late messages"],
              [170, 268, "Lower recovery"],
              [450, 270, "Next-day drift"],
            ].map(([x, y, label]) => (
              <g key={label as string}>
                <circle cx={x as number} cy={y as number} r="28" fill="var(--panel-card)" stroke="var(--panel-border-focus)" />
                <circle cx={x as number} cy={y as number} r="10" fill="var(--panel-ink)" opacity="0.9" />
                <text x={x as number} y={(y as number) + 52} textAnchor="middle" fill="var(--panel-muted)" style={{ fontFamily: "var(--font-body)", fontSize: 13 }}>
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="grid gap-3">
          {dimensions.map(([label, value, read]) => (
            <div key={label} className="rounded-[8px] border border-[var(--panel-border)] bg-[var(--panel-surface)] p-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="type-label text-[var(--panel-ink)]">{label}</p>
                <p className="type-data text-[var(--panel-ink)]">{value}</p>
              </div>
              <p className="type-caption tone-d-secondary mt-2">{withHighlights(read)}</p>
            </div>
          ))}
          <div className="rounded-[8px] border border-[var(--panel-border)] bg-[var(--panel-card)] p-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="type-label text-[var(--panel-ink)]">6 dimensions</p>
              <p className="type-data text-[var(--panel-ink)]">watched</p>
            </div>
            <Aside className="mt-2 text-[var(--text-tertiary)]">enough angles to stop guessing.</Aside>
          </div>
        </div>
      </div>
    </section>
  );
}
