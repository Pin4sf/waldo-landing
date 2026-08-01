import { BLOG_POSTS, readBlogMarkdown } from "@/lib/blog-posts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-metadata";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = BLOG_POSTS.map((post) => {
    const { readingTime } = readBlogMarkdown(post);
    const url = `${SITE_URL}/blogs/${post.slug}`;

    return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${new Date(`${post.datePublished}T12:00:00Z`).toUTCString()}</pubDate>
        <description>${escapeXml(`${post.dek} ${readingTime} min read.`)}</description>
      </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${SITE_NAME} notes</title>
        <link>${SITE_URL}/blogs</link>
        <description>${escapeXml(SITE_DESCRIPTION)}</description>
        <language>en</language>${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
