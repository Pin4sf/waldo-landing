import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("blog index and article routes are available at the plural /blogs path", () => {
  assert.equal(existsSync("app/blogs/page.tsx"), true);
  assert.equal(existsSync("app/blogs/[slug]/page.tsx"), true);

  const index = read("app/blogs/page.tsx");
  const article = read("app/blogs/[slug]/page.tsx");

  assert.match(index, /Latest writing/);
  assert.match(index, /BLOG_POSTS/);
  assert.match(article, /generateStaticParams/);
  assert.match(article, /ReactMarkdown/);
  assert.match(article, /CopyLinkButton/);
});

test("both navigation systems enable Blog and point to /blogs", () => {
  for (const path of ["components/home/new-home-nav.tsx", "components/navbar.tsx"]) {
    const nav = read(path);
    assert.match(
      nav,
      /\{ label: "Blog", tooltip: "waldo's been busy\. so have we\.", href: "\/blogs" \}/,
    );
  }
});

test("the six published essays are local content with explicit metadata", () => {
  const files = readdirSync("content/blogs").filter((file) => file.endsWith(".md"));
  assert.equal(files.length, 6);

  const data = read("lib/blog-posts.ts");
  assert.match(data, /export const BLOG_POSTS/);
  assert.match(data, /author: DEFAULT_BLOG_AUTHOR/);
  assert.match(data, /name: "Waldo team"/);
  assert.match(data, /artCredit: "Waldo, made with OpenAI"/);
  assert.doesNotMatch(data, /Corben/i);

  for (const file of files) {
    const source = read(`content/blogs/${file}`);
    assert.match(source, /^---/);
    assert.match(source, /^title:/m);
    assert.match(source, /^status: published/m);
    assert.match(source, /^published: 2026-08-01/m);
  }
});

test("every article has a generated hero asset and sitemap entry", () => {
  const expectedAssets = [
    "cli-agent.webp",
    "health-app-mirror.webp",
    "why-a-dalmatian.webp",
    "patterns.webp",
    "connectors-and-professions.webp",
    "your-data.webp",
  ];

  for (const asset of expectedAssets) {
    assert.equal(existsSync(`public/assets/blogs/${asset}`), true);
  }

  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /BLOG_POSTS/);
  assert.match(sitemap, /\/blogs/);
});

test("blog styling uses the current Mottle headline token and Every-inspired reading details", () => {
  const globals = read("app/globals.css");
  const article = read("app/blogs/[slug]/page.tsx");

  assert.match(globals, /\.blog-display\s*\{[^}]*font-family:\s*var\(--font-headline\)/s);
  assert.match(globals, /\.blog-prose\s*\{[^}]*max-width:\s*680px/s);
  assert.match(article, /artCredit/);
  assert.match(article, /readingTime/);
  assert.match(article, /dateModified/);
  assert.match(article, /Waldo team/);
  assert.match(article, /blog-heading-anchor/);
  assert.match(article, /relatedPosts = \[1, 2\]/);
  assert.match(read("app/blogs/layout.tsx"), /Skip to article content/);
  assert.equal(existsSync("app/blogs/rss.xml/route.ts"), true);
});

test("draft gating is enforced before posts reach the index or feed", () => {
  const data = read("lib/blog-posts.ts");
  assert.match(data, /post\.status === "published"/);

  const feed = read("app/blogs/rss.xml/route.ts");
  assert.match(feed, /BLOG_POSTS\.map/);
  assert.match(feed, /application\/rss\+xml/);
});
