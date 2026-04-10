import type { Metadata } from "next";
import { corben, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // Brand tagline in the tab — what people see when they bookmark or share the URL
  title: "Waldo \u2014 already on it.",
  // Acquisition tagline as the meta description — what Google and social previews show
  description: "Waldo knows how you\u2019re really doing.",
  metadataBase: new URL("https://heywaldo.in"),
  icons: { icon: "/logodots.svg" },
  openGraph: {
    title: "Waldo \u2014 already on it.",
    // Layer 1 hook — what makes someone click a social share
    description:
      "Your AI knows what you need to do. Waldo knows if you can actually do it.",
    url: "https://heywaldo.in",
    siteName: "Waldo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Waldo \u2014 already on it.",
    description:
      "Your AI knows what you need to do. Waldo knows if you can actually do it.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${corben.variable} ${dmSans.variable}`}>
      <body
        className="bg-[#EDEAE3] text-[#1A1A1A] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
