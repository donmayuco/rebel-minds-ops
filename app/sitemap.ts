import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rebelmindsops.com";

/**
 * Per-route last-modified dates.
 *
 * These are deliberately hand-maintained rather than `new Date()`. Reporting the
 * build timestamp for every URL tells crawlers that all ten pages changed on
 * every deploy, which is never true — and Google discounts `lastmod` entirely
 * once it stops being specific. Accurate dates are what make passive recrawling
 * work without hand-submitting anything.
 *
 * Update the date for a page when its content materially changes. Cosmetic or
 * dependency-only changes do not count.
 */
const lastModified: Record<string, string> = {
  "": "2026-07-22",
  "/ai-consulting": "2026-07-13",
  "/ai-consulting-mcallen": "2026-07-13",
  "/healthcare": "2026-07-23",
  "/practice": "2026-07-23",
  "/practice/experience-system": "2026-07-23",
  "/practice/reputation-read": "2026-07-23",
  "/our-science": "2026-07-23",
  "/matrix": "2026-07-05",
  "/privacy": "2026-07-05",
};

const priorityMap: Record<string, number> = {
  "": 1,
  "/ai-consulting": 0.9,
  "/ai-consulting-mcallen": 0.8,
  "/healthcare": 0.9,
  "/practice": 0.9,
  "/privacy": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(lastModified).map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(`${lastModified[route]}T12:00:00Z`),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priorityMap[route] ?? 0.8,
  }));
}
