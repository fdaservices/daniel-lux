import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** XML sitemap served at /sitemap.xml — referenced from robots.txt. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
