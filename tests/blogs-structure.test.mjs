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
  const files = readdirSync("content/blogs")
    .filter((file) => file.endsWith(".md"))
    .sort();
  assert.equal(files.length, 6);
  const publicationDates = [
    "2026-07-20",
    "2026-07-23",
    "2026-07-25",
    "2026-07-28",
    "2026-07-30",
    "2026-08-01",
  ];

  const data = read("lib/blog-posts.ts");
  assert.match(data, /export const BLOG_POSTS/);
  assert.match(data, /author: DEFAULT_BLOG_AUTHOR/);
  assert.match(data, /name: "Waldo team"/);
  assert.match(data, /artCredit: "Waldo, made with OpenAI"/);
  assert.doesNotMatch(data, /Corben/i);

  for (const [index, file] of files.entries()) {
    const source = read(`content/blogs/${file}`);
    assert.match(source, /^---/);
    assert.match(source, /^title:/m);
    assert.match(source, /^status: published/m);
    assert.match(source, new RegExp(`^created: ${publicationDates[index]}$`, "m"));
    assert.match(source, new RegExp(`^published: ${publicationDates[index]}$`, "m"));
    assert.match(source, new RegExp(`^updated: ${publicationDates[index]}$`, "m"));
  }

  for (let index = 1; index < publicationDates.length; index += 1) {
    const gap =
      (new Date(`${publicationDates[index]}T12:00:00Z`) -
        new Date(`${publicationDates[index - 1]}T12:00:00Z`)) /
      86_400_000;
    assert.ok(gap === 2 || gap === 3, `expected a 2–3 day gap, received ${gap}`);
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

test("articles include an accessible New Yorker-inspired listen control", () => {
  assert.equal(existsSync("components/blog/article-listen-player.tsx"), true);

  const article = read("app/blogs/[slug]/page.tsx");
  const player = read("components/blog/article-listen-player.tsx");
  const globals = read("app/globals.css");

  assert.match(article, /ArticleListenPlayer/);
  assert.match(article, /src=\{post\.audio\}/);
  assert.match(player, /<audio/);
  assert.match(player, /preload="metadata"/);
  assert.match(player, /onPlay/);
  assert.match(player, /onPause/);
  assert.match(player, /onError/);
  assert.match(player, /Loading audio/);
  assert.match(player, /Pause/);
  assert.match(player, /Resume/);
  assert.match(player, /aria-live="polite"/);
  assert.match(player, /Article narration progress/);
  assert.match(player, /Skip back 15 seconds/);
  assert.match(player, /Skip forward 15 seconds/);
  assert.match(player, /Playback speed/);
  assert.match(player, /setPlaybackRate/);
  assert.match(globals, /\.blog-listen-player/);

  const audioFiles = readdirSync("public/assets/blogs/audio").filter((file) => file.endsWith(".m4a"));
  assert.equal(audioFiles.length, 6);
});

test("draft gating is enforced before posts reach the index or feed", () => {
  const data = read("lib/blog-posts.ts");
  assert.match(data, /post\.status === "published"/);
  assert.match(data, /b\.datePublished\.localeCompare\(a\.datePublished\)/);

  const feed = read("app/blogs/rss.xml/route.ts");
  assert.match(feed, /BLOG_POSTS\.map/);
  assert.match(feed, /application\/rss\+xml/);
});
