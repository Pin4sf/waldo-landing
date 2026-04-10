import localFont from "next/font/local";

export const corben = localFont({
  src: "../public/fonts/Corben-Regular.ttf",
  variable: "--font-headline",
  display: "swap",
});

export const dmSans = localFont({
  src: [
    { path: "../public/fonts/DMSans-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "../public/fonts/DMSans-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});
