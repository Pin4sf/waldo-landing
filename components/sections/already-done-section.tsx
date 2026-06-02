import { NotificationStack } from "@/components/notification-stack";
import { Aside, Readout, SectionIntro, WaldoCTA } from "@/components/landing-primitives";

const handledReads = [
  { label: "Sleep", value: "5h 42m", read: "short night; morning load cut." },
  { label: "HRV", value: "38ms", read: "below baseline; pace slowed." },
  { label: "Calendar", value: "4 meetings", read: "too dense; first block moved." },
];

export function AlreadyDoneSection() {
  return (
    <section id="already-handled" className="section-shell flex flex-col gap-8 py-4 lg:gap-10">
      <SectionIntro
        title={
          <>
            Not a chart.
            <br />
            Not a nudge.
            <br />
            Already handled.
          </>
        }
      >
        <p>
          Waldo reads what your wearable collects, understands what your body is actually saying, and handles the rest.
        </p>
      </SectionIntro>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="surface-card flex min-h-[440px] flex-col justify-center p-6 sm:p-8">
          <p className="type-label mb-6 text-center text-[var(--text-secondary)]">The old way</p>
          <NotificationStack />
          <Aside className="mt-5 text-center">everything noticed, nothing handled.</Aside>
        </div>

        <div className="dark-panel flex min-h-[440px] flex-col justify-between rounded-[30px] p-5 sm:p-6">
          <div className="dark-card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="type-label text-[var(--surface-t2)]">Waldo</p>
              <span className="type-caption rounded-full border border-[var(--border-dark)] bg-[var(--dark-t1)] px-3 py-1 text-[var(--text-secondary)]">
                handled
              </span>
            </div>

            <div className="mt-6 rounded-[18px] border border-[var(--border-dark)] bg-[var(--dark-t1)] p-5">
              <p className="type-body text-[var(--surface-t2)]">
                Rough morning. Your 9am moved to 10:30, the low-priority follow-up shifted to noon, and focus stays protected until lunch.
              </p>
              <p className="type-aside mt-4 text-[var(--text-tertiary)]">warm enough to start slowly.</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {handledReads.map((read) => (
                <Readout key={read.label} {...read} dark />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <WaldoCTA />
      </div>
    </section>
  );
}
