import type { Metadata } from "next";

import { Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
import { WaitlistPanel } from "@/components/site/waitlist-panel";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const WAITLIST_URL = `${SITE_URL}/waitlist`;
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
      <Section>
        <WaitlistPanel variant={variant} />
      </Section>
    </SiteShell>
  );
}
