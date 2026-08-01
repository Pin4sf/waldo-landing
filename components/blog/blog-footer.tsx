import Link from "next/link";

import { BLOG_POSTS } from "@/lib/blog-posts";

export function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer-inner">
        <Link href="/blogs" className="blog-footer-brand">
          Waldo notes
        </Link>
        <div className="blog-footer-copy">
          <p>Useful explanations from the people building Waldo.</p>
          <p className="blog-footer-aside">no thought leadership costume required.</p>
        </div>
        <nav aria-label="Blog footer">
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/blogs/rss.xml">RSS</Link>
          <Link href="/waitlist">Let Waldo in →</Link>
        </nav>
      </div>
      <p className="blog-footer-count">{BLOG_POSTS.length} essays, with more being noticed.</p>
    </footer>
  );
}
