import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Layer Security Workshops | Rebel Minds OPS",
  description:
    "Security awareness workshops that train the human layer, built on The Human Layer Framework and behavior science from Industrial and Organizational Psychology. Delivered remotely or on-site, anywhere in the US, in English, Spanish, or both. Technical security assessments available on request.",
};

export default function CybersecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
