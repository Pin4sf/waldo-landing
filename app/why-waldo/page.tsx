import type { Metadata } from "next";
import { Body, Header, Section } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";
export const metadata: Metadata = { title: "Why Waldo", alternates: { canonical: "/why-waldo" }, robots: { index: false, follow: true } };
export default function Page() {
  return <SiteShell><Section size="open"><Header as="h1" lines={["Why Waldo."]} center /><Body><p className="site-text">One personal agent, for a world full of agents. The founder story is being prepared. We will publish it when it is ready, rather than present unfinished notes as a letter from the founder.</p></Body></Section></SiteShell>;
}
