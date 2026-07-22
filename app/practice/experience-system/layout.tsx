import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Patient Experience System | Rebel Minds OPS",
  description:
    "Your rating is not measuring your medicine. It is measuring who bothers to speak. A HIPAA-disciplined system that asks every patient how their visit went, recovers bad experiences before they become reviews, and turns complaint patterns into staff training. No review gating. Arithmetic, not magic.",
  alternates: {
    canonical: "/practice/experience-system",
  },
  openGraph: {
    title: "The Patient Experience System | Rebel Minds OPS",
    description:
      "Every patient asked. Every bad experience heard the same day. Every pattern surfaced, and a team trained against your own evidence. No review gating, ever.",
    url: "/practice/experience-system",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Patient Experience System | Rebel Minds OPS",
    description:
      "Satisfied patients almost never leave reviews. Frustrated ones almost always do. The fix is not gaming the system. It is asking everyone.",
  },
};

export default function ExperienceSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
