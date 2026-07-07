import type { Metadata } from "next";

import { NewHomePage } from "@/components/home/new-home-page";
import { OG_DESCRIPTION, OG_IMAGE_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function Home() {
  return <NewHomePage />;
}
