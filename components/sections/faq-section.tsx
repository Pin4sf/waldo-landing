"use client";

import * as Accordion from "@radix-ui/react-accordion";

import { SectionIntro } from "@/components/landing-primitives";

const faqs = [
  {
    q: "My watch already gives me numbers. What does Waldo bring to the table?",
    a: "Your wearable measures. Waldo's the doctor who actually explains the report; no guessing what a number means, and no googling for the symptoms at 2am.",
  },
  {
    q: "Does Waldo just tell me what's wrong, or fix it too?",
    a: "Both. A low score doesn't just turn red - Waldo tells you why, and what actually fixes it. A lighter session, a different dinner, a reason. Before you had to ask.",
  },
  {
    q: "How is this different from a WHOOP or Oura dashboard?",
    a: "They hand you the numbers and the jargon, then leave the room. Waldo keeps the jargon to itself and only brings it up when it's actually doing something about it - explained like a person, not a lab report.",
  },
  {
    q: "Why not just paste my data into ChatGPT or Claude?",
    a: "They're great at planning. Waldo's the one that actually moves things -x before you've asked. You'll feel the difference more than you can explain it.",
  },
  {
    q: "What if I don't wear my watch one day?",
    a: "Waldo isn't reading today. It's reading you. One skipped day barely moves the picture.",
  },
  {
    q: "Do I need an Apple Watch?",
    a: "No. Oura, WHOOP, Garmin, Fitbit, Samsung - if it's already reading your body, Waldo already speaks its language.",
  },
  {
    q: "Can Waldo help with work - drafting emails, arranging meetings, the boring stuff?",
    a: "Drafts that don't read like a robot wrote them. Reschedules the meeting when your day's overloaded, and tells the room - so you're never the one asking for grace. The boring stuff, handled.",
  },
  {
    q: "I don't want another AI tool I have to keep up with. Isn't this just more setup?",
    a: "Waldo lives in the background. Tell it about your life once - it figures out the rest. That's the whole setup.",
  },
  {
    q: "How does Waldo keep my data safe?",
    a: "Your data stays in your hands. Waldo keeps what your numbers mean, not the numbers themselves - nothing sold, nothing shared, ever.",
  },
  {
    q: "Is Waldo free?",
    a: "Free to start, and free stays useful. Pro's for people who want more of Waldo, not because the free version is a trap.",
  },
  {
    q: "What are the long-term benefits?",
    a: "Waldo stops reacting and starts predicting. The Tuesday that always falls apart gets caught before it does - patterns you'd never sit still long enough to find yourself. Weeks in, it's not just answering you. It's nudging you first, and closing each day with what you actually got done.",
  },
] as const;

function syncScrollLayer() {
  window.dispatchEvent(new Event("waldo:sync-scroll"));
}

function syncScrollLayerAfterLayout() {
  syncScrollLayer();
  requestAnimationFrame(syncScrollLayer);
  window.setTimeout(syncScrollLayer, 280);
}

export function FaqSection() {
  return (
    <section id="faq" className="new-faq-section section-shell w-full scroll-mt-28 flex flex-col gap-10 py-6 lg:py-8">
      <div data-animate="blur-fade">
        <SectionIntro
          className="new-faq-intro"
          title="You're going to ask these."
          aside="the fair objections."
        />
      </div>

      <div className="new-faq-list mx-auto w-full">
        <Accordion.Root type="single" collapsible data-animate="stagger" data-stagger="0.045" onValueChange={syncScrollLayerAfterLayout}>
          {faqs.map((item, index) => (
            <Accordion.Item
              key={item.q}
              value={`faq-${index}`}
              data-stagger-item
              className="border-b border-[var(--border-default)]"
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className="waldo-faq-trigger group focusable-ring flex w-full items-center justify-between gap-6 rounded-[12px] px-1 py-6 text-left sm:py-7"
                  onPointerDownCapture={syncScrollLayer}
                >
                  <span className="type-h3 min-w-0 flex-1 text-[#1A1A1A]">{item.q}</span>
                  <span aria-hidden className="waldo-faq-icon shrink-0 text-[#1A1A1A]" style={{ fontSize: "1.4rem", lineHeight: 1 }}>
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="waldo-faq-content">
                <div className="waldo-faq-content-inner">
                  <p className="type-body w-full px-1 pb-6 font-normal text-[#1A1A1A]/60">{item.a}</p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
