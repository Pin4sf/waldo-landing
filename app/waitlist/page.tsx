import type { Metadata } from "next";

import { PageLayout } from "@/components/waitlist-layout";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const WAITLIST_URL = `${SITE_URL}/waitlist`;
const WAITLIST_DESCRIPTION =
  "Join Waldo and be first in line for the action layer that reads body signals, context, and memory to protect the human day.";

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

export default function WaitlistRoute() {
  return <PageLayout />;
}
