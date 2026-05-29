import type { Metadata } from "next";
import { siteConfig } from "./site";

/** Branded Open Graph image (1200×630) reused across every page. */
export const ogImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — construction et rénovation au Luxembourg`,
};

/**
 * Builds a complete `openGraph` block. Next.js replaces (does not merge) the
 * `openGraph` object per segment, so `images` must be included every time.
 */
export function buildOpenGraph(opts: {
  path: string;
  title: string;
  description: string;
}): Metadata["openGraph"] {
  return {
    type: "website",
    url: opts.path,
    title: opts.title,
    description: opts.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [ogImage],
  };
}

/** Matching Twitter/X card. */
export function buildTwitter(opts: {
  title: string;
  description: string;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [ogImage.url],
  };
}
