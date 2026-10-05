import type { Metadata } from "next";

import { Body, Grid, Header, Item, Placeholder, Questions, Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
import { SITE_URL } from "@/lib/site-metadata";

// Copy: docs/website/pages/support.md (v1). Answers marked "confirm" in the doc still need checking.
// Layout follows the homepage (docs/website/site-wide-pass.md): centred titles and white boxed cards; the
// question lists keep the homepage's left-aligned questions layout.

const DESCRIPTION = "Answers about getting in, your data, your account and Kennel, plus how to reach a real person.";
const KENNEL_REPO = "https://github.com/waldoco/Waldo-Kennel";

export const metadata: Metadata = {
  title: "Support",
  description: DESCRIPTION,
  alternates: { canonical: "/support" },
  openGraph: { title: "Support | Waldo", description: DESCRIPTION, url: `${SITE_URL}/support` },
};

export default function SupportPage() {
  return (
    <SiteShell>
      <Section size="open">
        <Header
          as="h1"
          lines={["How can we", "help?"]}
          subtitle="Quick answers below. If they don't cover it, a real person reads every message."
          body="No bots in the inbox. We checked that too."
          center
        />
        <Body>
          <Grid cols={4} boxed>
            <Item title="Getting in" href="#getting-in">Access, the waitlist, price.</Item>
            <Item title="Kennel" href="#kennel">Bugs, questions, setup.</Item>
            <Item title="Your data" href="#data">Download, delete, disconnect.</Item>
            <Item title="Contact us" href="#contact">A real person, by email.</Item>
          </Grid>
        </Body>
      </Section>

      <Section id="getting-in" size="auto">
        <Header lines={["Quick", "answers."]} />
        <Body>
          <Questions
            groups={[
              {
                title: "Getting in",
                items: [
                  {
                    q: "When do I get access to Waldo?",
                    a: "We're letting people in a few at a time. Joining the list is the way in, and people who joined earlier get in earlier.",
                  },
                  {
                    q: "I joined the waitlist but didn't get an email.",
                    a: "Check spam and promotions first. Still nothing? Write to us from the same address, and we'll sort it out.",
                  },
                  {
                    q: "How do I leave the waitlist?",
                    a: "Every email we send has an unsubscribe link. Or write to us, and we'll remove you.",
                  },
                  {
                    q: "How much will Waldo cost?",
                    a: "Free while it's in beta. We'll tell you well before anything changes, and nothing will be charged without you choosing a plan.",
                  },
                  { q: "Is there an Android app?", a: "iPhone comes first. Android follows. Join the list to hear when." },
                ],
              },
              {
                title: "Using Waldo",
                items: [
                  {
                    q: "Which watches work?",
                    a: "Apple Watch works best. Oura, WHOOP, Garmin and Fitbit are coming. The full list is on the Connectors page.",
                  },
                  {
                    q: "Waldo moved something I didn't want moved.",
                    a: "Undo it in one tap from the activity log. To stop it happening again, change that area to “Ask me” in your settings.",
                  },
                  {
                    q: "Waldo's gone quiet.",
                    a: "Check that your watch has synced recently (the app shows “Updated X min ago”), and that notifications are on for the channel Waldo uses to reach you.",
                  },
                  {
                    q: "How do I change where Waldo messages me?",
                    a: "Settings → Messages. Pick Telegram, the web, or (soon) WhatsApp.",
                  },
                ],
              },
            ]}
          />
        </Body>
      </Section>

      <Section id="kennel" size="auto">
        <Header
          lines={["Kennel", "for Mac."]}
          subtitle="Kennel is open source, so its help lives where the code does."
          body="Found a bug? Kennel's on GitHub, and so are we."
          center
        />
        <Body>
          {/* Was a two-column table (Need / Where): each need is now a white card that links where to go */}
          <Grid cols={3} boxed>
            <Item meta="Something's broken" title="Open an issue →" href={`${KENNEL_REPO}/issues`} />
            <Item meta="A question, or an idea" title="Discussions →" href={`${KENNEL_REPO}/discussions`} />
            <Item meta="Setting it up" title="The README →" href={KENNEL_REPO} />
          </Grid>
        </Body>
      </Section>

      <Section id="data" size="auto">
        <Header lines={["Your data", "and account."]} />
        <Body>
          <Questions
            groups={[
              {
                items: [
                  { q: "How do I download my data?", a: "Settings → Your data → Export. You'll get a file with everything Waldo holds about you." },
                  { q: "How do I delete my account?", a: "Settings → Your data → Delete account. It removes your account and the data that goes with it." },
                  {
                    q: "How do I disconnect a tool?",
                    a: "Settings → Connections → pick the tool → Disconnect. You can also revoke Waldo's access from the tool's own settings, for example your Google account's security page.",
                  },
                  { q: "What does Waldo know about me?", a: "Settings → What Waldo knows. Every item can be seen, changed or removed." },
                ],
              },
            ]}
          />
        </Body>
      </Section>

      <Section id="contact" size="auto">
        <Header
          lines={["Still stuck?", "Write to us."]}
          subtitle="A real person reads every message. We usually reply within two working days."
          body="The dog doesn't answer these. We do."
          center
        />
        <Body>
          <Placeholder>
            <strong>Support email goes here</strong> (for example support@heywaldo.in, once it exists and someone reads it).
          </Placeholder>
          <Placeholder>
            <strong>Found a security problem?</strong> Please tell us privately, not in public. Security email goes here.
            For Kennel, follow SECURITY.md in the Kennel repo.
          </Placeholder>
        </Body>
      </Section>
    </SiteShell>
  );
}
