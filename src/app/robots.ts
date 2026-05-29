import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt — explicitly welcomes AI assistants and search crawlers.
 * The site also publishes /llms.txt and /llms-full.txt for AI consumption.
 */

/** AI assistant / LLM crawlers that are explicitly granted access. */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "CCBot",
  "cohere-ai",
  "YouBot",
  "Bytespider",
  "Mistral-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // /merci is excluded from the index via its own `noindex` meta tag, not
        // here — blocking it in robots would stop crawlers from ever reading
        // that tag. Only the API is disallowed.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // AI assistants are welcome to read and cite the whole public site.
        userAgent: aiCrawlers,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
