import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-posts";
import { LAST_CONTENT_UPDATE, SITE_URL } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_CONTENT_UPDATE);

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/how-it-works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/connectors`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/waitlist`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/why-waldo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kennel`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getBlogPosts().map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
