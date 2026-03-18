import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cybersecurity for Small Businesses | Rebel Minds OPS — RGV",
  description:
    "Managed cybersecurity for South Texas SMBs. AI threat monitoring, behavior-based security training, phishing protection, and dark web surveillance. Plans from $299/month. Edinburg, TX.",
};

export default function CybersecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
