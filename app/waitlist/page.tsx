import type { Metadata } from "next";

import Link from "next/link";

import { Body, Header, Questions, Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
import { WaitlistHero } from "@/components/site/waitlist-hero";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const WAITLIST_URL = `${SITE_URL}/waitlist`;
const KENNEL_REPO = "https://github.com/waldoco/Waldo-Kennel";
const WAITLIST_DESCRIPTION = "Join the Waldo waitlist. First access to Waldo for iPhone and the Kennel Mac app.";

export const metadata: Metadata = {
  title: "Let Waldo in",
  description: WAITLIST_DESCRIPTION,
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Let Waldo in | Waldo",
    description: WAITLIST_DESCRIPTION,
    url: WAITLIST_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    title: "Let Waldo in | Waldo",
    description: WAITLIST_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default async function WaitlistRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const variant = params.utm_source === "kennel" ? "kennel" : "default";

  return (
    <SiteShell>
      {/* The first screen: Waldo's notifications, the title, the form, the app rising, then the questions (docs/website/pages/waitlist.md) */}
      <WaitlistHero variant={variant} />

      {/* From Kennel only: the beta link, below the phone */}
      {variant === "kennel" ? (
        <Section size="auto">
          <Body>
            <p className="wl-aside">
              Can&apos;t wait?{" "}
              <a className="site-link" href={KENNEL_REPO} target="_blank" rel="noreferrer">
                Try the beta now →
              </a>
            </p>
          </Body>
        </Section>
      ) : null}

      {/* The questions people ask before joining. The answers are the Support page's and the homepage's own (docs/website/pages/waitlist.md). */}
      <Section size="auto">
        <Header lines={["Before you", "get in."]} center />
        <Body>
          <Questions
            groups={[
              {
                items: [
                  {
                    q: "When do I get access to Waldo?",
                    a: "We're letting people in a few at a time. Joining the list is the way in, and people who joined earlier get in earlier.",
                  },
                  {
                    q: "What can I use today?",
                    a: "Kennel for Mac is in open beta now. iPhone and messaging come next, and people on the list get in first.",
                  },
                  {
                    q: "How much will Waldo cost?",
                    a: "Free while it's in beta. We'll tell you well before anything changes, and nothing will be charged without you choosing a plan.",
                  },
                  {
                    q: "Which watches work?",
                    a: "Apple Watch works best. Oura, WHOOP, Garmin and Fitbit are coming. The full list is on the Connectors page.",
                  },
                  { q: "Is there an Android app?", a: "iPhone comes first. Android follows. Join the list to hear when." },
                  {
                    q: "I joined the waitlist but didn't get an email.",
                    a: "Check spam and promotions first. Still nothing? Write to us from the same address, and we'll sort it out.",
                  },
                  {
                    q: "How do I leave the waitlist?",
                    a: "Every email we send has an unsubscribe link. Or write to us, and we'll remove you.",
                  },
                ],
              },
            ]}
          />
        </Body>
        <Body>
          <Link href="/support" className="site-link">
            More questions →
          </Link>
        </Body>
      </Section>
    </SiteShell>
  );
}
