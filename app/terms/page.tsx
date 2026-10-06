import type { Metadata } from "next";
import { Body, Header, Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" }, robots: { index: false, follow: true } };
export default function Page() {
  return <SiteShell><Section size="open"><Header as="h1" lines={["Terms under review."]} center /><Body><p className="site-text">Final terms for the Waldo app have not been published here. This page is not a binding set of app terms. The website shows illustrative screens with sample data, not a live account. The app launch and account access should wait for the final terms and privacy policy.</p></Body></Section></SiteShell>;
}
