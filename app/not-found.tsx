import type { Metadata } from "next";

import { Body, Grid, Header, Item, Section, Visual } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/site-shell";

// Copy: docs/website/pages/404.md ("Live copy" at the top)

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <Section>
        <Header
          as="h1"
          lines={["Wrong turn.", "Waldo’s not here."]}
          subtitle="This page doesn't exist, or it's moved. The rest of the site is right where we left it."
          body="Usually where the work is."
        />
        <Body>
          <Visual label="Waldo, looking off somewhere else" src="/assets/home/mascots/watching-dark-mode.svg" eager />
          <Grid cols={4}>
            <Item title="Home" href="/">Start from the top.</Item>
            <Item title="How it works" href="/how-it-works">Everything Waldo does.</Item>
            <Item title="Kennel for Mac" href="/kennel">In open beta now.</Item>
            <Item title="Blog" href="/blogs">Things worth noticing.</Item>
          </Grid>
        </Body>
      </Section>
    </SiteShell>
  );
}
