import { Aside } from "@/components/landing-primitives";
import { waldoLiveReceipts } from "@/components/sections/waldo-capability-data";

export function WhereIsWaldoSection() {
  const loop = [...waldoLiveReceipts, waldoLiveReceipts[0]];

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
              {loop.map((receipt, index) => (
                <div key={`${receipt.time}-${receipt.action}-${index}`} className="flex h-[88px] flex-col justify-center gap-2 sm:h-[76px] sm:flex-row sm:items-baseline sm:justify-center sm:gap-4">
                  <p className="type-h3 tone-primary">→ {receipt.action}</p>
                  <p className="type-aside tone-tertiary">
                    {receipt.time} · {receipt.detail}
                  </p>
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
