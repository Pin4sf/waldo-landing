import type { Metadata } from "next";
import { corben, dmSans } from "@/lib/fonts";
import { SunflowerCursor } from "@/components/sunflower-cursor";
import "./globals.css";

const SITE_URL = "https://heywaldo.in";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Waldo — AI Health Agent for WHOOP & Apple Watch",
  description:
    "Waldo reads your wearable data — HRV, sleep, recovery — and acts before you burn out. Personal AI health agent. Already on it.",
  keywords: [
    "AI health agent", "burnout prevention", "WHOOP integration",
    "Apple Watch health", "HRV monitoring", "wearable data AI",
    "personal health assistant", "recovery monitoring", "health AI",
  ],

  alternates: { canonical: SITE_URL },

  icons: {
    icon: "/logodots.svg",
    shortcut: "/logodots.svg",
    apple: "/logodots.svg",
  },

  openGraph: {
    title: "Waldo — Already on it.",
    description:
      "Your AI knows what you need to do. Waldo knows if you can actually do it.",
    url: SITE_URL,
    siteName: "Waldo",
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Waldo — AI Health Agent" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Waldo — Already on it.",
    description:
      "Your AI knows what you need to do. Waldo knows if you can actually do it.",
    images: [OG_IMAGE],
    creator: "@heywaldo",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, noimageindex: false },
  },

  authors: [{ name: "Waldo", url: SITE_URL }],
  category: "Health & Wellness",
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
        "Waldo is your personal AI health agent that reads wearable data and proactively acts before you burn out.",
      sameAs: ["https://twitter.com/heywaldo"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Waldo",
      description: "Personal AI health agent powered by wearable data.",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Waldo — AI Health Agent",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${corben.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-[#EDEAE3] text-[#1A1A1A] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <SunflowerCursor>{children}</SunflowerCursor>
      </body>
    </html>
  );
}
