import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cybersecurity for Small Businesses | Rebel Minds OPS",
  description:
    "Managed cybersecurity for small businesses anywhere in the United States. AI threat monitoring, behavior-based security training, phishing protection, and dark web surveillance. Plans from $299/month. Delivered remotely, nationwide.",
};

export default function CybersecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
