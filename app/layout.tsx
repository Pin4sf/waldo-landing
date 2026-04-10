import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const corben = localFont({
  src: "./fonts/corben-400.ttf",
  variable: "--font-corben",
  display: "swap",
});

const dmSans = localFont({
  src: [
    {
      path: "./fonts/dm-sans-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans-400-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waldo Waitlist",
  description: "heywaldo.in waitlist page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${corben.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
