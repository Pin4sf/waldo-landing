import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

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

export type BlogPost = {
  slug: string;
  sourceFile: string;
  status: "draft" | "published";
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
  artCredit: string;
  sources: BlogSource[];
};

type BlogPostSeed = Omit<
  BlogPost,
  "status" | "title" | "datePublished" | "dateModified"
>;

type BlogFrontmatter = {
  status?: BlogPost["status"];
  title?: string;
  published?: string;
  created?: string;
  updated?: string;
};

const CONTENT_DIRECTORY = join(process.cwd(), "content", "blogs");

export const DEFAULT_BLOG_AUTHOR: BlogAuthor = {
  name: "Waldo team",
  role: "Product and engineering",
  bio: "Notes from the people turning body signals and the shape of your day into useful action.",
  image: "/logodots.svg",
};

const HEALTH_SYSTEMS_AUTHOR: BlogAuthor = {
  ...DEFAULT_BLOG_AUTHOR,
  role: "Product and health systems",
  bio: "The team working on how wearable signals become careful, inspectable actions in an ordinary day.",
};

const BRAND_AUTHOR: BlogAuthor = {
  ...DEFAULT_BLOG_AUTHOR,
  role: "Brand and product",
  bio: "The team responsible for how Waldo behaves, explains itself, and earns a place in your day.",
};

const CONTINUITY_AUTHOR: BlogAuthor = {
  ...DEFAULT_BLOG_AUTHOR,
  role: "Product and continuity",
  bio: "The team connecting individual Spots into patterns that remain understandable and correctable.",
};

const CONNECTORS_AUTHOR: BlogAuthor = {
  ...DEFAULT_BLOG_AUTHOR,
  role: "Product and connectors",
  bio: "The team making Waldo useful across the tools and working rhythms people already have.",
};

const PRIVACY_AUTHOR: BlogAuthor = {
  ...DEFAULT_BLOG_AUTHOR,
  role: "Product and privacy",
  bio: "The team defining what Waldo may access, what it must explain, and where the boundaries stay firm.",
};

const BLOG_POST_SEEDS: BlogPostSeed[] = [
  {
    slug: "what-is-a-cli-agent",
    sourceFile: "01-what-is-a-cli-agent.md",
    titleLines: ["What a CLI agent actually is,", "explained like you are five"],
    dek: "The difference between a chatbot that talks and an agent that can actually do the work.",
    excerpt:
      "A plain-language tour of command lines, agent loops, and why useful software needs more than a mouth.",
    aside: "the mouth was never the point.",
    category: "Agents",
    author: DEFAULT_BLOG_AUTHOR,
    image: "/assets/blogs/cli-agent.webp",
    imageAlt: "A warm editorial illustration of a command line becoming an open doorway",
    artCredit: "Waldo, made with OpenAI",
    sources: [
      {
        label: "Apple Terminal User Guide, current documentation",
        href: "https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac",
      },
      {
        label: "Microsoft Learn: What is a command shell?, updated July 2025",
        href: "https://learn.microsoft.com/en-us/powershell/scripting/what-is-a-command-shell?view=powershell-7.6",
      },
      {
        label: "OpenAI Codex CLI overview, current documentation",
        href: "https://help.openai.com/en/articles/11096431",
      },
      { label: "Waldo product architecture, May 2026", href: "/features" },
    ],
  },
  {
    slug: "health-apps-are-mirrors",
    sourceFile: "02-how-waldo-cares-about-your-health.md",
    titleLines: ["Your health app is a mirror.", "Mirrors do not catch you."],
    dek: "Your wearable already knows when the day is too heavy. The missing part is an agent willing to act.",
    excerpt:
      "Health software is good at recording yesterday. Waldo is built around what should happen next.",
    aside: "mirrors, with a little follow-through.",
    category: "Health data",
    author: HEALTH_SYSTEMS_AUTHOR,
    image: "/assets/blogs/health-app-mirror.webp",
    imageAlt: "A spotted orange trail crossing from a mirror into a protected day",
    artCredit: "Waldo, made with OpenAI",
    sources: [
      {
        label: "Adjust mobile app retention benchmarks for 2023",
        href: "https://www.adjust.com/blog/get-the-mobile-app-retention-benchmarks-for-2023/",
      },
      { label: "Waldo product architecture, May 2026", href: "/features" },
    ],
  },
  {
    slug: "why-a-dalmatian",
    sourceFile: "03-why-a-dalmatian.md",
    titleLines: ["We put a Dalmatian on it,", "and we would like to explain ourselves"],
    dek: "Spots, patterns, and a dog that makes the product easier to understand without saying a word.",
    excerpt:
      "The mascot is not decoration. It is a compact explanation of how Waldo notices and connects what others miss.",
    aside: "the spots were doing useful work.",
    category: "Inside Waldo",
    author: BRAND_AUTHOR,
    image: "/assets/blogs/why-a-dalmatian.webp",
    imageAlt: "A resting Dalmatian studying a constellation made from its own spots",
    artCredit: "Waldo, made with OpenAI",
    sources: [
      {
        label: "American Kennel Club: Dalmatian history, current article",
        href: "https://www.akc.org/expert-advice/dog-breeds/dalmatian-history/",
      },
      { label: "Waldo brand and product story, May 2026", href: "/" },
    ],
  },
  {
    slug: "patterns-your-ai-cannot-see",
    sourceFile: "04-the-patterns.md",
    titleLines: ["You are stuck in a loop", "and your AI cannot tell"],
    dek: "A single Tuesday looks ordinary. A run of them can tell you exactly what keeps going wrong.",
    excerpt:
      "The useful pattern is rarely one dramatic event. It is the ordinary thing that keeps happening together.",
    aside: "Tuesday has been trying to tell you.",
    category: "Patterns",
    author: CONTINUITY_AUTHOR,
    image: "/assets/blogs/patterns.webp",
    imageAlt: "A run of calendar pages connected by a quiet constellation of spots",
    artCredit: "Waldo, made with OpenAI",
    sources: [{ label: "Waldo pattern architecture, May 2026", href: "/features" }],
  },
  {
    slug: "explain-your-job-to-a-computer",
    sourceFile: "05-connectors-and-professions.md",
    titleLines: ["Nobody wants to explain their job", "to a computer every morning"],
    dek: "The useful agent understands the shape of your work without making you describe it every day.",
    excerpt:
      "Calendar, mail, and work tools make a day legible. The point is not more data. It is better timing.",
    aside: "less explaining, more handling.",
    category: "Connectors",
    author: CONNECTORS_AUTHOR,
    image: "/assets/blogs/connectors-and-professions.webp",
    imageAlt: "Different working days connected into one clear and protected window",
    artCredit: "Waldo, made with OpenAI",
    sources: [{ label: "Waldo connector architecture, May 2026", href: "/features" }],
  },
  {
    slug: "what-we-do-with-your-data",
    sourceFile: "06-what-we-actually-do-with-your-data.md",
    titleLines: ["What we actually do with your data,", "explained to your grandmother"],
    dek: "A plain-language account of what Waldo may access, what stays private, and what you control.",
    excerpt:
      "You choose the connections. Waldo should explain what it touched and keep the boundaries visible.",
    aside: "the boundary is part of the product.",
    category: "Privacy",
    author: PRIVACY_AUTHOR,
    image: "/assets/blogs/your-data.webp",
    imageAlt: "A small protected archive translating private signals into a simple note",
    artCredit: "Waldo, made with OpenAI",
    sources: [
      {
        label: "European Commission guide to individual data rights",
        href: "https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en",
      },
      { label: "Waldo data and autonomy commitments, May 2026", href: "/features" },
    ],
  },
];

function readSourceFile(sourceFile: string) {
  return readFileSync(join(CONTENT_DIRECTORY, sourceFile), "utf8");
}

function readFrontmatter(sourceFile: string): BlogFrontmatter {
  const block = readSourceFile(sourceFile).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const values = Object.fromEntries(
    block.split("\n").flatMap((line) => {
      const separator = line.indexOf(":");
      if (separator < 0) return [];
      return [[line.slice(0, separator).trim(), line.slice(separator + 1).trim()]];
    }),
  );

  return values as BlogFrontmatter;
}

function hydrateBlogPost(seed: BlogPostSeed): BlogPost {
  const frontmatter = readFrontmatter(seed.sourceFile);
  if (!frontmatter.title || !frontmatter.status) {
    throw new Error(`Missing title or status in ${seed.sourceFile}`);
  }

  const datePublished = frontmatter.published ?? frontmatter.created;
  const dateModified = frontmatter.updated ?? datePublished;
  if (!datePublished || !dateModified) {
    throw new Error(`Missing publication dates in ${seed.sourceFile}`);
  }

  if (seed.titleLines.join(" ") !== frontmatter.title) {
    throw new Error(`Title lines do not match frontmatter in ${seed.sourceFile}`);
  }

  return {
    ...seed,
    status: frontmatter.status,
    title: frontmatter.title,
    datePublished,
    dateModified,
  };
}

export const BLOG_POSTS: BlogPost[] = BLOG_POST_SEEDS.map(hydrateBlogPost).filter(
  (post) => post.status === "published",
);

export function findBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
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
