import "server-only";

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Every post is one Markdown file in content/blogs. Its frontmatter holds everything the
// site needs; nothing else has to be edited to publish. Files starting with "_" (like
// _TEMPLATE.md) are ignored. The writing guide lives in docs/website/blog-system.md.

export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type BlogSource = {
  label: string;
  href: string;
};

export type BlogStatus = "draft" | "review" | "published";

export type BlogPost = {
  slug: string;
  sourceFile: string;
  status: BlogStatus;
  title: string;
  titleLines: string[];
  dek: string;
  excerpt: string;
  aside: string;
  category: string;
  datePublished: string;
  dateModified: string;
  author: BlogAuthor;
  image: string;
  imageAlt: string;
  audio: string;
  artCredit: string;
  sources: BlogSource[];
};

const CONTENT_DIRECTORY = join(process.cwd(), "content", "blogs");
const PUBLIC_DIRECTORY = join(process.cwd(), "public");

const TEAM_AUTHOR: BlogAuthor = {
  name: "Waldo team",
  role: "Product and engineering",
  bio: "Notes from the people turning body signals and the shape of your day into useful action.",
  image: "/logodots.svg",
};

// The value of `author:` in a post's frontmatter picks one of these.
export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  team: TEAM_AUTHOR,
  "team-health": {
    ...TEAM_AUTHOR,
    role: "Product and health systems",
    bio: "The team working on how wearable signals become careful, inspectable actions in an ordinary day.",
  },
  "team-brand": {
    ...TEAM_AUTHOR,
    role: "Brand and product",
    bio: "The team responsible for how Waldo behaves, explains itself, and earns a place in your day.",
  },
  "team-continuity": {
    ...TEAM_AUTHOR,
    role: "Product and continuity",
    bio: "The team connecting individual Spots into patterns that remain understandable and correctable.",
  },
  "team-connectors": {
    ...TEAM_AUTHOR,
    role: "Product and connectors",
    bio: "The team making Waldo useful across the tools and working rhythms people already have.",
  },
  "team-privacy": {
    ...TEAM_AUTHOR,
    role: "Product and privacy",
    bio: "The team defining what Waldo may access, what it must explain, and where the boundaries stay firm.",
  },
};

// The value of `category:` must be one of these.
export const BLOG_CATEGORIES = [
  "Agents",
  "Health data",
  "Inside Waldo",
  "Patterns",
  "Connectors",
  "Privacy",
] as const;

const STATUSES: BlogStatus[] = ["draft", "review", "published"];
const REQUIRED_FIELDS = [
  "status",
  "slug",
  "title",
  "dek",
  "excerpt",
  "aside",
  "category",
  "author",
  "published",
  "image",
  "imageAlt",
  "artCredit",
] as const;

// Style rules from AGENTS.md. These only warn; they never block a build.
const BANNED_PHRASES = [
  "wellness",
  "mindfulness",
  "holistic",
  "optimise",
  "optimize",
  "hustle",
  "grind",
  "peak performance",
  "ai-powered",
  "ai-driven",
  "smart",
  "unlock your potential",
  "empower",
  "journey",
  "waldo ai",
  "meet waldo",
  "dashboard",
];

type Frontmatter = Record<string, string> & { sources?: string[] };

function readSourceFile(sourceFile: string) {
  return readFileSync(join(CONTENT_DIRECTORY, sourceFile), "utf8");
}

function readFrontmatter(sourceFile: string): Frontmatter {
  const block = readSourceFile(sourceFile).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const values: Frontmatter = {};
  let listKey: string | null = null;

  for (const line of block.split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey === "sources") {
      values.sources = [...(values.sources ?? []), item[1].trim()];
      continue;
    }

    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    listKey = value === "" ? key : null;
    if (value !== "") values[key] = value;
  }

  return values;
}

function parseSources(items: string[] | undefined, problems: string[]): BlogSource[] {
  return (items ?? []).map((item) => {
    const separator = item.lastIndexOf(" | ");
    if (separator < 0) {
      problems.push(`a source is missing its link. Write it as "Label | https://link": ${item}`);
      return { label: item, href: "" };
    }
    return { label: item.slice(0, separator).trim(), href: item.slice(separator + 3).trim() };
  });
}

function publicFileExists(path: string) {
  return path.startsWith("/") && existsSync(join(PUBLIC_DIRECTORY, path));
}

function checkStyle(sourceFile: string, frontmatter: Frontmatter) {
  const warnings: string[] = [];
  for (const field of ["title", "dek", "excerpt", "aside"] as const) {
    const value = frontmatter[field] ?? "";
    if (value.includes("!")) warnings.push(`${field} has an exclamation mark`);
    const lower = value.toLowerCase();
    for (const phrase of BANNED_PHRASES) {
      if (new RegExp(`\\b${phrase}\\b`).test(lower)) warnings.push(`${field} uses the banned word "${phrase}"`);
    }
  }
  if ((frontmatter.dek ?? "").length > 160) warnings.push("dek is longer than 160 characters");
  if ((frontmatter.excerpt ?? "").length > 220) warnings.push("excerpt is longer than 220 characters");

  if (warnings.length > 0) {
    console.warn(`[blog] Style notes for content/blogs/${sourceFile}:\n  - ${warnings.join("\n  - ")}`);
  }
}

function loadBlogPost(sourceFile: string): BlogPost {
  const frontmatter = readFrontmatter(sourceFile);
  const problems: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) problems.push(`"${field}" is missing`);
  }

  const status = frontmatter.status as BlogStatus;
  if (frontmatter.status && !STATUSES.includes(status)) {
    problems.push(`status must be one of: ${STATUSES.join(", ")}`);
  }
  if (frontmatter.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(frontmatter.slug)) {
    problems.push("slug must be lowercase words joined by hyphens, like my-first-post");
  }
  if (frontmatter.category && !(BLOG_CATEGORIES as readonly string[]).includes(frontmatter.category)) {
    problems.push(`category must be one of: ${BLOG_CATEGORIES.join(", ")}`);
  }
  if (frontmatter.author && !BLOG_AUTHORS[frontmatter.author]) {
    problems.push(`author must be one of: ${Object.keys(BLOG_AUTHORS).join(", ")}`);
  }

  const datePublished = frontmatter.published ?? frontmatter.created;
  const dateModified = frontmatter.updated ?? datePublished;
  for (const [label, date] of [["published", datePublished], ["updated", dateModified]]) {
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) problems.push(`${label} date must look like 2026-10-05`);
  }

  if (frontmatter.image && !publicFileExists(frontmatter.image)) {
    problems.push(`image file not found in public${frontmatter.image}`);
  }
  if (frontmatter.audio && !publicFileExists(frontmatter.audio)) {
    problems.push(`audio file not found in public${frontmatter.audio}`);
  }

  const sources = parseSources(frontmatter.sources, problems);

  if (problems.length > 0) {
    throw new Error(
      `[blog] content/blogs/${sourceFile} can't be published yet:\n  - ${problems.join("\n  - ")}`,
    );
  }

  checkStyle(sourceFile, frontmatter);

  // "First line / second line" sets where the headline breaks.
  const titleLines = frontmatter.title.split(" / ").map((line) => line.trim());

  return {
    slug: frontmatter.slug,
    sourceFile,
    status,
    title: titleLines.join(" "),
    titleLines,
    dek: frontmatter.dek,
    excerpt: frontmatter.excerpt,
    aside: frontmatter.aside,
    category: frontmatter.category,
    datePublished: datePublished!,
    dateModified: dateModified!,
    author: BLOG_AUTHORS[frontmatter.author],
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    audio: frontmatter.audio ?? "",
    artCredit: frontmatter.artCredit,
    sources,
  };
}

function loadAllBlogPosts() {
  const files = readdirSync(CONTENT_DIRECTORY).filter(
    (file) => file.endsWith(".md") && !file.startsWith("_"),
  );
  const posts = files.map(loadBlogPost);

  const seen = new Map<string, string>();
  for (const post of posts) {
    const other = seen.get(post.slug);
    if (other) throw new Error(`[blog] ${post.sourceFile} and ${other} both use the slug "${post.slug}"`);
    seen.set(post.slug, post.sourceFile);
  }

  return posts;
}

// Read fresh on every call so a new or edited file shows up in dev without a restart.
// Production pages are static, so this runs once per build.
export function getBlogPosts(): BlogPost[] {
  return loadAllBlogPosts()
    .filter((post) => post.status === "published")
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function findBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function readBlogMarkdown(post: BlogPost) {
  const raw = readSourceFile(post.sourceFile);
  const content = raw
    .replace(/^---[\s\S]*?---\s*/, "")
    .replace(/^# .+\n+/, "")
    .replace(/\n## Backlinks[\s\S]*$/, "")
    .trim();

  const wordCount = content
    .replace(/[`#*_[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => ({
    label: match[1].replace(/[`*_]/g, ""),
    id: slugifyHeading(match[1]),
  }));

  return {
    content,
    headings,
    readingTime: Math.max(1, Math.ceil(wordCount / 220)),
  };
}
