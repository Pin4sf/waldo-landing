import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://heywaldo.in/sitemap.xml",
    host: "https://heywaldo.in",
  };
}
