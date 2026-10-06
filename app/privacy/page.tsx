import type { Metadata } from "next";
import { Body, Header, Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" }, robots: { index: false, follow: true } };
export default function Page() {
  return <SiteShell><Section size="open"><Header as="h1" lines={["Privacy information."]} center /><Body><p className="site-text">The website waitlist sends your email and any campaign tags in the link to Loops to record your signup and request updates. Waldo app data practices, provider details, retention, export and deletion controls are still being reviewed. This page is not a final privacy policy. Do not connect personal accounts based on the illustrative screens on this website.</p></Body></Section></SiteShell>;
}
