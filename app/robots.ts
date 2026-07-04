import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rebelmindsops.com";

// Explicitly welcome the AI answer-engine crawlers — blocking any of them
// means that platform can never cite us. (Allow-all already permits them;
// naming them makes the intent unambiguous and future-proof.)
const AI_BOTS = [
  "GPTBot", // OpenAI / ChatGPT (training + search)
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "ClaudeBot", // Anthropic / Claude
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended", // Gemini + Google AI Overviews
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Microsoft Copilot (via Bing)
  "Amazonbot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
