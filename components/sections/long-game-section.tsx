import { SectionIntro, withHighlights } from "@/components/landing-primitives";

const constellationNodes = [
  [108, 86, "Late messages"],
  [265, 140, "Short sleep"],
  [452, 82, "Meeting stack"],
  [156, 268, "Lower recovery"],
  [338, 264, "Task carryover"],
  [514, 252, "Agent handoff"],
  [332, 338, "Wednesday protected"],
] as const;

export function LongGameSection() {
  return (
    <section id="constellation" className="section-shell dark-panel overflow-hidden rounded-[24px] p-5 sm:p-6 lg:p-8">
      <div data-animate="blur-fade">
        <SectionIntro
          className="[&_.type-body]:max-w-[46ch] [&_.type-body]:text-left sm:[&_.type-body]:text-center"
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
      </div>

      <div className="mt-8" data-animate="fade-up">
        <div className="dark-card relative mx-auto min-h-[420px] w-full max-w-[860px] overflow-hidden rounded-[8px] p-5 sm:p-6 lg:p-7">
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
              <line x1="108" y1="86" x2="265" y2="140" />
              <line x1="265" y1="140" x2="452" y2="82" />
              <line x1="265" y1="140" x2="156" y2="268" />
              <line x1="265" y1="140" x2="338" y2="264" />
              <line x1="338" y1="264" x2="514" y2="252" />
              <line x1="338" y1="264" x2="332" y2="338" />
              <line x1="156" y1="268" x2="332" y2="338" />
            </g>
            {constellationNodes.map(([x, y, label]) => (
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
      </div>
    </section>
  );
}
