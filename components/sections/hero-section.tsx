// Hero — "Your health didn't sign up for any of this."
// Desktop: pyramid notification stack. Mobile: single card, swipe left/right.

import { NotificationStack } from "@/components/notification-stack";

export function HeroSection() {
  return (
    <section
      className="flex flex-col gap-[40px] lg:gap-[80px] items-center px-4 lg:px-[250px] py-[40px] lg:py-[70px] w-full"
      style={{ borderRadius: "30px" }}
    >
      <h1
        data-animate="headline"
        className="text-[#1a1a1a] text-[36px] sm:text-[42px] lg:text-[48px] text-center"
        style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
      >
        Your health didn&apos;t{" "}
        <br />
        sign up for any of this.
      </h1>

      <NotificationStack />
    </section>
  );
}
