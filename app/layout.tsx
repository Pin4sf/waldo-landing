import type { Metadata } from "next";
import { AssetProtection } from "@/components/asset-protection";
import { mottle, sfProRounded } from "@/lib/fonts";
import {
  BRAND_POSITIONING,
  HAPPY_WALDO_IMAGE_URL,
  LOGO_IMAGE_URL,
  OG_DESCRIPTION,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site-metadata";
import { SunflowerCursor } from "@/components/sunflower-cursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: SITE_KEYWORDS,

  alternates: { canonical: SITE_URL },

  icons: {
    icon: "/logodots.svg",
    shortcut: "/logodots.svg",
    apple: "/logodots.svg",
  },

  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Happy Waldo beside the action layer for the human day",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Happy Waldo beside the action layer for the human day",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, noimageindex: false },
  },

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Software",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_IMAGE_URL },
      image: { "@type": "ImageObject", url: HAPPY_WALDO_IMAGE_URL },
      description: BRAND_POSITIONING,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "Personal agent",
      operatingSystem: "iOS, web",
      description: BRAND_POSITIONING,
      image: HAPPY_WALDO_IMAGE_URL,
      url: SITE_URL,
      featureList: [
        "Reads body signals alongside calendar, task, communication, learning, and memory context",
        "Helps decide what moves, what stays, and what gets protected",
        "Turns repeated daily signals into patterns over time",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#software` },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE_URL },
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mottle.variable} ${sfProRounded.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[var(--surface-t3)] text-[var(--ink)] antialiased"
      >
        <AssetProtection />
        <SunflowerCursor>{children}</SunflowerCursor>
      </body>
    </html>
  );
}
