import type { ReactNode } from "react";

import { SiteShell } from "@/components/site/site-shell";

// The blog uses the same menu and footer as every other page.
export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell ownMain>
      <a className="site-skip" href="#blog-main">
        Skip to article content
      </a>
      {children}
    </SiteShell>
  );
}
