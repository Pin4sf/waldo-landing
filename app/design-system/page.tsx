import type { Metadata } from "next";
import { DesignSystemCheatsheet } from "@/components/design-system-cheatsheet";

export const metadata: Metadata = {
  title: "Waldo Visual System",
  description: "A live visual reference for Waldo surfaces, components, tokens, and motion.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  return <DesignSystemCheatsheet />;
}
