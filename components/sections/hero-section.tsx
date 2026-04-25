// Hero — "Your health didn't sign up for any of this."
// Headline + interactive notification stack (auto-rotating, drag/click to advance).

import { NotificationStack } from "@/components/notification-stack";

export function HeroSection() {
  return (
    <section
      className="flex flex-col gap-[80px] items-center px-[250px] py-[70px] w-full"
      style={{ borderRadius: "30px" }}
    >
      <h1
        className="text-[#1a1a1a] text-[48px] text-center"
        style={{
          fontFamily: "var(--font-headline)",
          lineHeight: 1.1,
        }}
      >
        Your health didn&apos;t{" "}
        <br />
        sign up for any of this.
      </h1>

      <NotificationStack />
    </section>
  );
}
