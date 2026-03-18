import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Science | Rebel Minds OPS — I-O Psychology Applied to Business",
  description:
    "I-O Psychology meets operations and cybersecurity. Summa Cum Laude UTRGV, full scholarship SUNY. We understand why people use systems wrong — and how to fix it. Serving South Texas for 30 years.",
};

export default function OurScienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
