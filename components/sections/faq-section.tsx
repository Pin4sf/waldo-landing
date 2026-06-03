"use client";

import { useState } from "react";

import { SectionIntro, withHighlights } from "@/components/landing-primitives";

// Block 7 — FAQ
// Real objections in Waldo's voice, Headspace-style bordered accordion.
// No CTA here — the user is reading, not converting.

const faqs = [
  {
    q: "Does Waldo actually move my meetings?",
    a: "If you set it to. During onboarding *you choose your autonomy level* — Waldo can just tell you what it would do, suggest changes for your approval, or move things on its own. You can change this anytime.",
  },
  {
    q: "What if I don't wear my watch one day?",
    a: "Waldo works with whatever data it has. No watch today means it *leans more on your calendar, tasks, and historical patterns*. It's less precise, not broken.",
  },
  {
    q: "Can Waldo see my messages?",
    a: "Only the tools you connect. Waldo never reads message content — it reads *metadata: volume, timing, urgency signals*. Your private messages stay private.",
  },
  {
    q: "How is this different from WHOOP or Oura?",
    a: "They show you data. *Waldo acts on it.* WHOOP tells you your recovery is 42%. Waldo tells you your recovery is 42% and already pushed your morning meetings.",
  },
  {
    q: "What if Waldo gets it wrong?",
    a: "*You undo it. One tap.* Waldo learns from corrections — it gets more accurate the longer you use it. The first week is calibration. By week three, it knows your patterns better than you do.",
  },
  {
    q: "Is my health data safe?",
    a: "Your biometric data *stays on-device and in your private Waldo instance*. Waldo doesn't sell data, doesn't train on your data, doesn't share it with third parties. Full encryption at rest and in transit.",
  },
  {
    q: "Do I need an Apple Watch?",
    a: "Apple Watch is the best-supported device right now. Oura, WHOOP, Garmin, and Fitbit are supported through their APIs. An iPhone alone gives Waldo basic data (steps, screen time) but the *full experience requires a wearable*.",
  },
] as const;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell scroll-mt-28 flex flex-col gap-10 py-4">
      <SectionIntro
        title={
          <>
            You&apos;re going to
            <br />
            ask these.
          </>
        }
      />

      <div className="surface-card mx-auto w-full max-w-[760px] overflow-hidden p-2 sm:p-3">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <div
              key={item.q}
              className={index > 0 ? "border-t border-[var(--border-default)]" : ""}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="focusable-ring flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-5 text-left sm:px-6"
                >
                  <span className="type-h3 text-[var(--ink)]">{item.q}</span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[var(--text-tertiary)]"
                    style={{
                      transition: "transform 320ms cubic-bezier(0.32, 0.72, 0.24, 1.05)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      fontSize: "1.5rem",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-4 pb-5 sm:px-6"
              >
                <p className="type-body tone-secondary max-w-[60ch]">{withHighlights(item.a)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
