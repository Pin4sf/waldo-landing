import type { Metadata } from "next";
import { corben, sfProRounded } from "@/lib/fonts";
import { SunflowerCursor } from "@/components/sunflower-cursor";
import "./globals.css";

const SITE_URL = "https://heywaldo.in";
// Absolute OG image URL — required for WhatsApp, Telegram, LinkedIn, iMessage, Slack
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Browser tab + Google headline (~60 chars)
  title: "Waldo — Already on it.",

  // Google snippet + fallback description (~155 chars)
  description:
    "Waldo reads your wearable, understands what last night means for today, then moves the parts of your day that should move.",

  keywords: [
    "wearable data", "Apple Watch", "WHOOP integration",
    "HRV monitoring", "sleep signals", "calendar protection",
    "personal agent", "recovery signals", "stress detection",
  ],

  alternates: { canonical: SITE_URL },

  icons: {
    icon: "/logodots.svg",
    shortcut: "/logodots.svg",
    apple: "/logodots.svg",
  },

  // ── Open Graph — used by WhatsApp, LinkedIn, Slack, iMessage, Telegram, Facebook ──
  openGraph: {
    title: "Waldo — Already on it.",
    // Hook for social shares — seen under the headline on link previews
    description:
      "Your wearable has been collecting HRV, sleep, and stress data every night. Waldo reads all of it and moves the day before you have to.",
    url: SITE_URL,
    siteName: "Waldo",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Waldo reads wearable data and handles the day before it gets heavy",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card — summary_large_image shows the full banner ──
  twitter: {
    card: "summary_large_image",
    title: "Waldo — Already on it.",
    // Twitter descriptions can be punchier / shorter
    description:
      "HRV dipped. Sleep was short. Meeting load is high. Waldo already moved your 9am and blocked your afternoon. You didn't ask. Already on it.",
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Waldo — Already on it",
      },
    ],
    creator: "@heywaldo",
    site: "@heywaldo",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, noimageindex: false },
  },

  authors: [{ name: "Waldo", url: SITE_URL }],
  category: "Software",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Waldo",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
      description:
        "Waldo reads wearable data and handles the day before it gets heavy.",
      sameAs: ["https://twitter.com/heywaldo"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Waldo",
      description: "A personal agent built around wearable data.",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Waldo — Already on it",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${corben.variable} ${sfProRounded.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[var(--surface-t3)] text-[var(--ink)] antialiased"
      >
        <SunflowerCursor>{children}</SunflowerCursor>
      </body>
    </html>
  );
}
