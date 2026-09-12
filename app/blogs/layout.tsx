import type { ReactNode } from "react";

import { BlogFooter } from "@/components/blog/blog-footer";
import { BuildSiteNav } from "@/components/build-site-nav";

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-shell">
      <a className="blog-skip-link" href="#blog-main">
        Skip to article content
      </a>
      <BuildSiteNav />
      {children}
      <BlogFooter />
    </div>
  );
}
