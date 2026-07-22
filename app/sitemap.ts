import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rebelmindsops.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/ai-consulting", "/ai-consulting-mcallen", "/healthcare", "/practice", "/practice/experience-system", "/our-science", "/matrix", "/privacy"];

  const priorityMap: Record<string, number> = {
    "": 1,
    "/ai-consulting": 0.9,
    "/ai-consulting-mcallen": 0.8,
    "/healthcare": 0.9,
    "/practice": 0.9,
    "/privacy": 0.3,
  };

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: priorityMap[route] ?? 0.8,
  }));
}
