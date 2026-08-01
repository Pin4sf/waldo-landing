import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { BLOG_POSTS, formatBlogDate, readBlogMarkdown } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/site-metadata";

const title = "Latest writing";
const description =
  "Plain-language essays about agents, body signals, patterns, privacy, and what Waldo is building.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blogs",
    types: { "application/rss+xml": `${SITE_URL}/blogs/rss.xml` },
  },
  openGraph: {
    title: `${title} | Waldo`,
    description,
    url: `${SITE_URL}/blogs`,
    type: "website",
  },
};

export default function BlogsPage() {
  const [featured, ...remainingPosts] = BLOG_POSTS;
  const secondaryPosts = remainingPosts.slice(0, 2);
  const archivePosts = remainingPosts.slice(2);

  return (
    <main id="blog-main" className="blog-index">
      <header className="blog-index-hero">
        <p className="blog-kicker">Latest writing</p>
        <h1 className="blog-display">
          <span>Things worth</span>
          <span>noticing.</span>
        </h1>
        <p className="blog-index-intro">
          Plain-language notes about agents, your data, and the patterns hiding inside an ordinary day.
        </p>
        <p className="blog-wit-aside">a quiet place for the things Waldo noticed.</p>
      </header>

      <section className="blog-featured" aria-label="Featured article">
        <BlogCard post={featured} featured />
      </section>

      <section className="blog-index-grid" aria-label="All articles">
        {secondaryPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>

      <section className="blog-archive" aria-labelledby="blog-archive-title">
        <h2 id="blog-archive-title">More from Waldo</h2>
        <div className="blog-archive-list">
          {archivePosts.map((post) => {
            const { readingTime } = readBlogMarkdown(post);
            return (
              <article key={post.slug} className="blog-archive-row">
                <div className="blog-archive-meta">
                  <span>{post.category}</span>
                  <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time>
                  <span>{readingTime} min read</span>
                </div>
                <h3>
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.dek}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
