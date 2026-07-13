import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Consulting in McAllen, TX & the Rio Grande Valley | Rebel Minds OPS",
  description:
    "AI consulting and automation systems built in McAllen, Texas for businesses across the Rio Grande Valley: Edinburg, Mission, Pharr, Weslaco, Harlingen, and Brownsville. Bilingual systems your whole crew can use, proven with RGV businesses first, delivered nationwide. Free Ops Scan to start.",
  alternates: {
    canonical: "/ai-consulting-mcallen",
  },
  openGraph: {
    title: "AI Consulting in McAllen, TX & the Rio Grande Valley | Rebel Minds OPS",
    description:
      "AI consulting built in McAllen, Texas for businesses across the Rio Grande Valley. Bilingual systems your whole crew can use, proven with RGV businesses first. Free Ops Scan to start.",
    url: "/ai-consulting-mcallen",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting in McAllen, TX & the RGV | Rebel Minds OPS",
    description:
      "AI consulting built in McAllen, Texas for businesses across the Rio Grande Valley. Bilingual, proven locally first. Free Ops Scan to start.",
  },
};

export default function AiConsultingMcAllenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
