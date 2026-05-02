import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Science | Rebel Minds OPS — I-O Psychology Meets Operational Systems",
  description:
    "How we apply industrial-organizational psychology, behavioral science, and biological sciences to design technology systems that staff actually adopt. Healthcare, cybersecurity, operations, and training — methodology built on graduate research, not vendor checklists.",
  alternates: {
    canonical: "/our-science",
  },
  openGraph: {
    title: "Our Science | Rebel Minds OPS",
    description:
      "I-O Psychology and behavioral science applied to operational systems and healthcare technology — methodology built on graduate research, not vendor checklists.",
    url: "/our-science",
    siteName: "Rebel Minds OPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Science | Rebel Minds OPS",
    description:
      "I-O Psychology and behavioral science applied to operational systems and healthcare technology.",
  },
};

export default function OurScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
