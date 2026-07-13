import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Consulting for Growing Businesses | Rebel Minds OPS",
  description:
    "AI consulting that starts with a diagnosis, not a demo. We analyze how your operation actually runs, show you where AI genuinely helps and where it does not, and build only what earns its keep. Based in McAllen, Texas; serving the Rio Grande Valley and any U.S. market. HIPAA-compliant where it matters. Free Ops Scan to start.",
  alternates: {
    canonical: "/ai-consulting",
  },
  openGraph: {
    title: "AI Consulting for Growing Businesses | Rebel Minds OPS",
    description:
      "AI consulting that starts with a diagnosis, not a demo. Where AI genuinely helps, where a simpler fix beats it, and where it does not belong. Based in McAllen, Texas; serving any U.S. market. Free Ops Scan to start.",
    url: "/ai-consulting",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting for Growing Businesses | Rebel Minds OPS",
    description:
      "AI consulting that starts with a diagnosis, not a demo. Based in McAllen, Texas; serving any U.S. market. Free Ops Scan to start.",
  },
};

export default function AiConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
