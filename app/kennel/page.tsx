import type { Metadata } from "next";

import KennelPage from "@/components/kennel/kennel-page";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/site-metadata";

const KENNEL_URL = `${SITE_URL}/kennel`;
const KENNEL_TITLE = "Kennel for Mac | Stop managing agent sessions. Manage outcomes.";
const KENNEL_DESCRIPTION =
  "Kennel is Waldo's open-source Mac app for supervising coding agents. Tell it what should become true, approve the plan, and let Codex, Claude Code, Cursor, OpenCode, or Pi earn it; with evidence, not vibes.";

export const metadata: Metadata = {
  title: { absolute: KENNEL_TITLE },
  description: KENNEL_DESCRIPTION,
  alternates: { canonical: "/kennel" },
  openGraph: {
    title: KENNEL_TITLE,
    description: KENNEL_DESCRIPTION,
    url: KENNEL_URL,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: KENNEL_TITLE,
    description: KENNEL_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function Page() {
  return <KennelPage />;
}
