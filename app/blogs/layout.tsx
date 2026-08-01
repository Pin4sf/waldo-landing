import type { ReactNode } from "react";

import { BlogFooter } from "@/components/blog/blog-footer";
import { NewHomeNav } from "@/components/home/new-home-nav";

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-shell">
      <a className="blog-skip-link" href="#blog-main">
        Skip to article content
      </a>
      <NewHomeNav />
      {children}
      <BlogFooter />
    </div>
  );
}
