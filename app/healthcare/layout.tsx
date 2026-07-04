import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HIPAA-Aware Healthcare Automation | Rebel Minds OPS",
  description:
    "HIPAA-aware healthcare automation, patient communication, after-hours coverage, and reputation systems for medical, dental, and behavioral-health practices anywhere in the United States. Built on BAA-signed infrastructure (Twilio, AWS). Patient communication in English, Spanish, or both. Free HIPAA Stack Audit available.",
  alternates: {
    canonical: "/healthcare",
  },
  openGraph: {
    title: "HIPAA-Aware Healthcare Automation | Rebel Minds OPS",
    description:
      "HIPAA-aware automation and operational systems for medical, dental, and behavioral-health practices across the United States. Built on BAA-signed infrastructure. Free HIPAA Stack Audit available.",
    url: "/healthcare",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HIPAA-Aware Healthcare Automation | Rebel Minds OPS",
    description:
      "HIPAA-aware healthcare automation for practices anywhere in the US. Built on BAA-signed infrastructure. Patient communication in English, Spanish, or both.",
  },
};

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
