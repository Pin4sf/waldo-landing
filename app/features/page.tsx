import type { Metadata } from "next";

import { PageLayout } from "@/components/page-layout";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const FEATURES_URL = `${SITE_URL}/features`;
const FEATURES_DESCRIPTION =
  "See how Waldo reads recovery, form, demand, stress, memory, and tool context to decide what moves, what stays, and what gets protected.";

export const metadata: Metadata = {
  title: "Features",
  description: FEATURES_DESCRIPTION,
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Features | Waldo",
    description: FEATURES_DESCRIPTION,
    url: FEATURES_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    title: "Features | Waldo",
    description: FEATURES_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function FeaturesPage() {
  return <PageLayout />;
}
