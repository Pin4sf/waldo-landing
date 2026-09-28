import type { Metadata } from "next";

import { Body, DraftNotice, Header, List, Placeholder, Section, Table } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
import { SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/terms.md (v1). Plain summaries only; the binding legal text is written by a lawyer.

const DESCRIPTION = "The rules for using Waldo, in plain words first.";

export const metadata: Metadata = {
  title: "Terms",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms | Waldo", description: DESCRIPTION, url: `${SITE_URL}/terms` },
  robots: { index: false, follow: true },
};

const SECTIONS: [string, string][] = [
  ["Who we are and what this covers", "These terms are between you and Waldo's company. They cover the website, the waitlist and the Waldo app."],
  ["Who can use Waldo", "You need to be 18 or over."],
  ["Beta", "Waldo is in beta. Features may change, pause or disappear, and it may not always work."],
  ["Not medical advice", "Waldo uses health signals as context for planning your day. It isn't a medical device, it doesn't diagnose or treat anything, and it's no replacement for a doctor. If you're worried about your health, talk to one."],
  ["What Waldo does for you", "Waldo can take actions for you, like moving meetings, blocking time or updating tools, but only the kinds you've allowed, and you can undo them. You're still responsible for your calendar, your commitments and anything sent in your name."],
  ["Connected tools", "When you connect a tool (Google, Slack, a watch), you're also using that company's service, under their terms. You can disconnect any time."],
  ["Your data", "You own your data. You let us use it only to run Waldo for you, as the Privacy page describes."],
  ["Using Waldo fairly", "Don't break the law with Waldo, don't try to break Waldo, and don't connect accounts or data that aren't yours to connect."],
  ["Price", "Waldo is free during beta. If that changes, we'll tell you first, and you won't be charged unless you choose a plan."],
  ["Kennel for Mac", "Kennel is open source under the Apache-2.0 licence. That licence covers the Kennel code. Your agents run through your own accounts, under those companies' terms."],
  ["Our stuff", "The Waldo name, the Dalmatian, the design and the writing belong to us. Please don't copy them."],
  ["Ending things", "You can leave any time by deleting your account. We may suspend accounts that break these terms, and we'll tell you why when we can."],
  ["Limits on our responsibility", "We work hard to get things right, but we can't promise Waldo will be perfect, and there are limits to what we're responsible for."],
  ["Changes to these terms", "If we change these terms in a way that matters, we'll tell you before it takes effect."],
];

export default function TermsPage() {
  return (
    <SiteShell>
      <Section size="auto">
        <Header
          as="h1"
          lines={["The terms.", "Readable ones."]}
          subtitle="Each section starts with the plain version. The legal version follows, and it's the one that counts."
          body="We tried to make this the least boring legal page you'll read today."
        />
        <DraftNotice>Draft. The plain summaries are here. The legal text is being written and reviewed.</DraftNotice>
      </Section>

      <Section size="auto">
        <Header lines={["The short", "version."]} />
        <Body>
          <List
            items={[
              <><strong>Waldo is in beta.</strong> It works, but it&apos;s still being finished. Things may change or break.</>,
              <><strong>Waldo isn&apos;t a doctor.</strong> It uses health signals to plan your day. It doesn&apos;t diagnose or treat anything.</>,
              <><strong>You&apos;re in charge of what Waldo can do.</strong> You choose what it connects to and how much it does on its own, and you can undo what it does.</>,
              <><strong>Your data is yours.</strong> How we handle it is on the Privacy page.</>,
              <><strong>Be decent.</strong> Don&apos;t misuse Waldo, other people&apos;s data, or our systems.</>,
              <><strong>Kennel is open source</strong> under its own licence (Apache-2.0).</>,
            ]}
          />
        </Body>
      </Section>

      <Section size="auto">
        <Header lines={["Section by", "section."]} />
        <Body>
          <Table columns={["Section", "In plain words"]} rows={SECTIONS.map(([title, plain], index) => [`${index + 1}. ${title}`, plain])} />
        </Body>
        <Body>
          <Placeholder>
            <strong>Legal text, section by section,</strong> written by a lawyer, plus the governing law and a contact for
            questions about these terms.
          </Placeholder>
        </Body>
      </Section>
    </SiteShell>
  );
}
