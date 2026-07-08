import type { MetadataRoute } from "next";
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
      url: `${SITE_URL}/waitlist`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/features`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
