import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Your Rating Is Costing You | Rebel Minds OPS",
  description:
    "A practice reputation read: enter your providers, patient value, and current rating to see the estimated revenue your Google-rating gap quietly costs you each year, and the exact arithmetic of recovering it. Directional estimate, not a promise. No rating or revenue guaranteed.",
  alternates: {
    canonical: "/practice/reputation-read",
  },
  openGraph: {
    title: "What Your Rating Is Costing You | Rebel Minds OPS",
    description:
      "Enter your practice's numbers. See the estimated dollars a rating gap costs you each year, and what recovery actually takes. Arithmetic, not magic.",
    url: "/practice/reputation-read",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Your Rating Is Costing You | Rebel Minds OPS",
    description:
      "A reputation read for practices: the invisible cost of a rating gap, and the honest arithmetic of closing it.",
  },
};

export default function ReputationReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
