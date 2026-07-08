import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Practice Experience Audit | Rebel Minds OPS",
  description:
    "Practices rarely decline because of the medicine. They decline because of the phones, the follow-up, and the front desk. The Practice Experience Audit measures where your practice loses patients, classifies every leak into one of the Four Doors (eliminate, simplify, train, automate), and delivers the Leak Map. Includes a no-AI option. Free walkthrough to start.",
  alternates: {
    canonical: "/practice",
  },
  openGraph: {
    title: "The Practice Experience Audit | Rebel Minds OPS",
    description:
      "Where your practice loses patients, measured and mapped. Every leak classified into one of the Four Doors: eliminate, simplify, train, automate. No-AI option included. Free walkthrough to start.",
    url: "/practice",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Practice Experience Audit | Rebel Minds OPS",
    description:
      "Where your practice loses patients, measured and mapped. Every leak gets one of the Four Doors: eliminate, simplify, train, automate. Free walkthrough to start.",
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
