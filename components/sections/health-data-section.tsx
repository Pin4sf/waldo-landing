import Image from "next/image";

import sectionTwoAsset from "@/components/assets/section-2.png";

export function HealthDataSection() {
  return (
    <section
      id="problem"
      className="section-shell scroll-mt-28 overflow-hidden rounded-[44px] border border-[var(--border-default)] bg-[var(--surface-t2)] p-3"
    >
      <div className="flex min-h-[620px] flex-col items-center overflow-hidden rounded-[32px] border border-[var(--border-default)] bg-[var(--surface-t1)] px-5 pt-14 pb-12 text-center sm:min-h-[720px] sm:px-10 sm:pt-24 sm:pb-16 lg:min-h-[760px] lg:px-16 lg:pt-28">
        <div className="mx-auto flex max-w-[760px] flex-col items-center" data-animate="blur-fade">
          <p className="type-aside tone-tertiary">You already have everything Waldo needs.</p>

          <h2 className="type-h1 mt-10 text-[var(--ink)]" data-animate="headline">
            Months of health data.
            <br />
            Zero health decisions.
          </h2>

          <p className="type-body tone-secondary mt-8 max-w-[68ch]">
            Your watch has been collecting sleep, HRV, recovery, and stress data every single
            <br className="hidden md:block" />
            day. While you slept. While you worked. While you ignored it. That data has been
            <br className="hidden md:block" />
            sitting in an app you open twice a year. Waldo reads every day of it.
          </p>
        </div>

        <div className="mt-auto flex w-full justify-center pt-12 sm:pt-20" data-animate="blur-fade">
          <Image
            src={sectionTwoAsset}
            alt=""
            sizes="(min-width: 1024px) 980px, (min-width: 640px) 86vw, 118vw"
            className="h-auto w-[118vw] max-w-none select-none sm:w-[86vw] sm:max-w-[900px] lg:w-[980px] lg:max-w-none"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
