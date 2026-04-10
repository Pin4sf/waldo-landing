import type { Metadata } from "next";
import { corben, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waldo \u2014 something\u2019s off.",
  description:
    "ChatGPT knows your tasks. Your calendar knows your time. Neither knows you slept three hours.",
  metadataBase: new URL("https://heywaldo.in"),
  openGraph: {
    title: "Waldo \u2014 something\u2019s off.",
    description:
      "ChatGPT knows your tasks. Your calendar knows your time. Neither knows you slept three hours.",
    url: "https://heywaldo.in",
    siteName: "Waldo",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Waldo \u2014 something\u2019s off.",
    description:
      "ChatGPT knows your tasks. Your calendar knows your time. Neither knows you slept three hours.",
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
        className="bg-[#FAFAF8] text-[#1A1A1A] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
