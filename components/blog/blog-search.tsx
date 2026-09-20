"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export type BlogSearchPost = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  readingTime: number;
};

export function BlogSearch({ posts, children }: { posts: BlogSearchPost[]; children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 200);
    return () => window.clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    if (!debounced) return null;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(debounced) ||
        post.dek.toLowerCase().includes(debounced) ||
        post.category.toLowerCase().includes(debounced),
    );
  }, [debounced, posts]);

  return (
    <>
      <div role="search" className="blog-index-hero" style={{ paddingTop: 0 }}>
        <label htmlFor="blog-search-input" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles…"
          className="blog-search-field"
        />
      </div>

      {results === null ? (
        children
      ) : results.length === 0 ? (
        <p className="blog-search-empty">No articles match &ldquo;{debounced}&rdquo;.</p>
      ) : (
        <section className="blog-archive-list" aria-label="Search results">
          {results.map((post) => (
            <article key={post.slug} className="blog-archive-row">
              <div className="blog-archive-meta">
                <span>{post.category}</span>
                <span>{post.readingTime} min read</span>
              </div>
              <h3>
                <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.dek}</p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
