import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Automation | Rebel Minds OPS — HIPAA-Aware AI for RGV Practices",
  description:
    "Healthcare automation built where biology meets behavior — and where regulated data has always been our standard. BAA-signed infrastructure, bilingual by default, RGV-built. Free HIPAA Stack Audit.",
};

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
