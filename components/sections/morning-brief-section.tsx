import Image from "next/image";
import { Aside, Readout, SectionIntro } from "@/components/landing-primitives";

const reads = [
  { label: "Sleep", value: "5h 42m", read: "short night; morning moved later." },
  { label: "HRV", value: "38ms", read: "below baseline; pressure reduced." },
  { label: "Resting HR", value: "62 bpm", read: "steady enough for a normal afternoon." },
];

export function MorningBriefSection() {
  return (
    <section id="brief" className="section-shell surface-card grid gap-8 overflow-hidden p-6 sm:p-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-10 lg:p-12">
      <SectionIntro
        className="items-start text-left lg:pt-6"
        title={
          <>
            The Brief arrives
            <br />
            before the day does.
          </>
        }
        aside="mornings, sorted."
      >
        <p>
          Every morning. One message. What happened, what changed, and what you do not need to worry about.
        </p>
      </SectionIntro>

      <div className="dark-panel rounded-[30px] p-4 sm:p-5">
        <div className="dark-card p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--dark-t1)]">
              <Image src="/illustrations/default.svg" alt="" width={38} height={30} className="h-auto w-[38px]" />
            </div>
            <div>
              <p className="type-label text-[var(--surface-t2)]">Morning</p>
              <p className="type-caption text-[var(--text-secondary)]">sent after wake</p>
            </div>
          </div>

          <div className="mt-6 rounded-[18px] border border-[var(--border-dark)] bg-[var(--dark-t1)] p-5">
            <p className="type-body text-[var(--surface-t2)]">
              Rough night. About 5h 40m of sleep, and HRV is sitting below baseline. Your 9am moved to 10:30 and the 10am shifted to noon. The afternoon looks fine.
            </p>
            <p className="type-aside mt-4 text-[var(--text-tertiary)]">already on it.</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {reads.map((read) => (
              <Readout key={read.label} {...read} dark />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
