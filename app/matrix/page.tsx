import type { Metadata } from "next";
import { Suspense } from "react";
import MatrixClient from "./MatrixClient";

export const metadata: Metadata = {
  title: "The Impact vs. Risk Matrix — free AI audit worksheet | Rebel Minds OPS",
  description:
    "One page, four steps: map a process, score impact against risk, and know what to automate, what to run hybrid, and what to simplify. Free printable worksheet, English and Spanish. La Matrix de Impacto vs. Riesgo.",
  alternates: { canonical: "/matrix" },
  openGraph: {
    title: "The Impact vs. Risk Matrix — audit before you automate",
    description:
      "The one-page diagnostic most people skip before buying or building AI. Free download, EN + ES.",
  },
};

export default function MatrixPage() {
  return (
    <Suspense>
      <MatrixClient />
    </Suspense>
  );
}
