import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Web app manifest — served at /manifest.webmanifest and linked automatically. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Construction & rénovation au Luxembourg`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1626",
    lang: siteConfig.lang,
    categories: ["business", "construction"],
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
