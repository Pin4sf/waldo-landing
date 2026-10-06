import type { Metadata } from "next";
import { Body, Header, Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
export const metadata: Metadata = { title: "Support", alternates: { canonical: "/support" }, robots: { index: false, follow: true } };
export default function Page() {
  return <SiteShell><Section size="open"><Header as="h1" lines={["Support information."]} center /><Body><p className="site-text">A verified Waldo support and security contact has not been published here yet. Please do not send personal account data or security reports to an address guessed from this domain. For Kennel, use the support and security guidance in its GitHub repository.</p></Body><Body><a className="site-link" href="https://github.com/waldoco/Waldo-Kennel">Kennel on GitHub</a></Body></Section></SiteShell>;
}
