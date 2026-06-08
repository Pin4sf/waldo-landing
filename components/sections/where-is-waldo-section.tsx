import { Aside } from "@/components/landing-primitives";

const tickerItems = [
  ["Moved your 9am to 10:30", "slow start protected."],
  ["Logged your 2am HRV dip", "rough night carried into the plan."],
  ["Protecting Friday afternoon", "heavy week gets an exit."],
  ["Matching 2-4pm to deep work", "useful hours held."],
  ["Scanning 14 email threads", "metadata only, urgency checked."],
  ["Blocking 2-4pm for recovery", "body gets room."],
  ["Moving the retro to Monday", "low-value pressure moved."],
] as const;

export function WhereIsWaldoSection() {
  const loop = [...tickerItems, tickerItems[0]];

  return (
    <section id="where" className="section-shell surface-card overflow-hidden p-6 sm:p-8 lg:p-12">
      <div className="mx-auto flex max-w-[820px] flex-col items-center text-center" data-animate="blur-fade">
        <h2 className="type-h1 text-[var(--ink)]" data-animate="headline">
          Where&apos;s Waldo?
          <br />
          Right now, handling —
        </h2>
        <div className="mt-8 w-full max-w-[720px] overflow-hidden rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-t1)] p-4 sm:p-5" data-animate="blur-fade">
          <div className="ticker-window h-[88px] overflow-hidden sm:h-[76px]">
            <div className="where-ticker-track">
              {loop.map(([action, read], index) => (
                <div key={`${action}-${index}`} className="flex h-[88px] flex-col justify-center gap-2 sm:h-[76px] sm:flex-row sm:items-baseline sm:justify-center sm:gap-4">
                  <p className="type-h3 tone-primary">→ {action}</p>
                  <p className="type-aside tone-tertiary">{read}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Aside className="mt-6">the answer is always an action.</Aside>
      </div>
    </section>
  );
}
