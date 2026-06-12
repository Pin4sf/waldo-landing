"use client";

import * as Accordion from "@radix-ui/react-accordion";

import { SectionIntro, withHighlights } from "@/components/landing-primitives";

const faqs = [
  {
    q: "What actually is Waldo?",
    a: "A personal AI agent that reads your health wearable 24/7, understands what the data means for your day, and acts: rescheduling meetings, blocking focus time, drafting emails, creating tasks, and more. *Not another readout. Not a loose chat window.* An agent that happens to know how your body is doing.",
  },
  {
    q: "Does Waldo actually move my meetings?",
    a: "If you want it to. During setup you pick your autonomy level: Waldo can just tell you what it would do, suggest changes for your approval, or act on its own. *You can change this anytime.*",
  },
  {
    q: "Can Waldo draft emails?",
    a: "It drafts them. It never sends them. Every email goes to your drafts folder. You review, you send. *Even at the highest autonomy level, outbound communication always requires your tap.*",
  },
  {
    q: "Can I talk to Waldo?",
    a: "Text or voice. Ask about your health, your schedule, your tasks. Give commands. Or ask why it did what it did. But you do not have to. *Waldo works without being asked.*",
  },
  {
    q: "What if I don't wear my watch one day?",
    a: "Waldo works with whatever data it has. No watch today means it leans more on your calendar, tasks, and historical patterns. *Less precise, not broken.*",
  },
  {
    q: "How is this different from WHOOP or Oura?",
    a: "They show you data. *Waldo acts on it.* WHOOP tells you your recovery is 42%. Waldo tells you your recovery is 42% and already pushed your morning meetings.",
  },
  {
    q: "What if Waldo gets it wrong?",
    a: "You undo it. One tap. Waldo learns from corrections and gets more accurate the longer you use it. The first week is calibration. *By week three, it knows your patterns better than you do.*",
  },
  {
    q: "Is my health data safe?",
    a: "Biometric data stays on-device where possible. We do not sell it, do not train on it, do not share it. Emails are metadata-only. *We never read message body content.* Full encryption at rest and in transit.",
  },
  {
    q: "Do I need an Apple Watch?",
    a: "Apple Watch is best-supported. Oura, WHOOP, Garmin, and Fitbit work through their APIs. An iPhone alone gives basic data, but *the full experience requires a wearable.*",
  },
  {
    q: "How much does Waldo do on its own?",
    a: "You choose. Three levels: Inform, Propose, or Autonomous. Certain actions like sending emails always ask first, regardless of your level. *Some things always need a human.*",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="section-shell w-full scroll-mt-28 flex flex-col gap-10 py-6 lg:py-8">
      <div data-animate="blur-fade">
        <SectionIntro
          title={
            <>
              You&apos;re going to
              <br />
              ask these.
            </>
          }
          aside="the fair objections."
        />
      </div>

      <div className="mx-auto w-full max-w-[880px]">
        <Accordion.Root type="single" collapsible data-animate="stagger" data-stagger="0.045">
          {faqs.map((item, index) => (
            <Accordion.Item
              key={item.q}
              value={`faq-${index}`}
              data-stagger-item
              className="border-b border-[var(--border-default)]"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group focusable-ring flex w-full items-center justify-between gap-6 rounded-[12px] px-1 py-6 text-left sm:py-7">
                  <span className="type-h3 text-[var(--ink)]">{item.q}</span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[var(--ink)] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-data-[state=open]:rotate-45"
                    style={{ fontSize: "1.4rem", lineHeight: 1 }}
                  >
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-premium)] data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100">
                <div className="overflow-hidden">
                  <p className="type-body tone-secondary max-w-[72ch] px-1 pb-6">{withHighlights(item.a)}</p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
