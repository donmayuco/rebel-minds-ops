import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Technology Consultant | Rebel Minds OPS — HIPAA-Aware AI for RGV Practices",
  description:
    "HIPAA-aware healthcare automation, patient communication, after-hours coverage, and reputation systems for Rio Grande Valley practices. Built on BAA-signed infrastructure (Twilio, AWS). Bilingual by default. Free HIPAA Stack Audit available.",
  alternates: {
    canonical: "/healthcare",
  },
  openGraph: {
    title: "Healthcare Technology Consultant | Rebel Minds OPS",
    description:
      "HIPAA-aware healthcare automation and operational systems for RGV practices. Built on BAA-signed infrastructure. Bilingual by default. Free HIPAA Stack Audit available.",
    url: "/healthcare",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Technology Consultant | Rebel Minds OPS",
    description:
      "HIPAA-aware healthcare automation for RGV practices. Built on BAA-signed infrastructure. Bilingual by default.",
  },
};

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
