import type { Metadata } from "next";
import { Suspense } from "react";
import MatrixClient from "./MatrixClient";

const siteUrl = "https://www.rebelmindsops.com";

export const metadata: Metadata = {
  title: "The Impact vs. Risk Matrix — free AI audit worksheet | Rebel Minds OPS",
  description:
    "One page, four steps: map a process, score impact against risk, and know what to automate, what to run hybrid, and what to simplify. Free printable worksheet, English and Spanish. La Matrix de Impacto vs. Riesgo.",
  alternates: {
    canonical: "/matrix",
    languages: {
      en: "/matrix",
      es: "/matrix?lang=es",
    },
  },
  openGraph: {
    title: "The Impact vs. Risk Matrix — audit before you automate",
    description:
      "The one-page diagnostic most people skip before buying or building AI. Free download, EN + ES.",
  },
};

// Entity graph aligned with the homepage schema: same #organization and
// #founder @ids so AI engines resolve this page to the same entities.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/matrix#webpage`,
      url: `${siteUrl}/matrix`,
      name: "The Impact vs. Risk Matrix — free AI audit worksheet",
      description:
        "A free one-page worksheet for auditing a business process before automating it: map the steps, score impact against risk, and decide between automation, a hybrid model, or simplification.",
      inLanguage: ["en", "es"],
      isPartOf: { "@id": `${siteUrl}/#organization` },
      author: { "@id": `${siteUrl}/#founder` },
      mainEntity: { "@id": `${siteUrl}/matrix#method` },
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/matrix#method`,
      name: "How to audit a business process before automating it with AI",
      alternateName: "The Impact vs. Risk Matrix (ES: La Matrix de Impacto vs. Riesgo)",
      description:
        "A four-step diagnostic that decides whether a process should be automated, run as a human-in-the-loop hybrid, or simplified — before any AI tool is bought or built. Rationale: most AI pilots fail because they start from the tool instead of the operation.",
      inLanguage: "en",
      author: { "@id": `${siteUrl}/#founder` },
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Map the process",
          text: "Pick one process that consumes time every week and write it out step by step, the way it really works: who does each step and what happens.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Score impact against risk",
          text: "Rate each step 1 to 5 on impact (time, errors, revenue, visibility if solved) and 1 to 5 on risk (what happens if the machine gets it wrong: customer, money, brand, trust), then place it in one of four quadrants.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Apply the decision rule",
          text: "High impact plus low risk: automate first. High impact plus high risk: hybrid, where AI prepares and a human approves; never blind automation. Low impact: no AI — simplify it, eliminate it, or leave it manual.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Define the return before building",
          text: "Write one concrete, measurable success signal before anything is built, for example: recover 5 hours a week, cut data-entry errors 30%, or respond to every lead in under 5 minutes.",
        },
      ],
    },
    {
      "@type": "DigitalDocument",
      "@id": `${siteUrl}/matrix#worksheet-en`,
      name: "The Impact vs. Risk Matrix (worksheet, English)",
      url: `${siteUrl}/downloads/the-impact-vs-risk-matrix.pdf`,
      encodingFormat: "application/pdf",
      inLanguage: "en",
      isAccessibleForFree: true,
      author: { "@id": `${siteUrl}/#founder` },
      about: { "@id": `${siteUrl}/matrix#method` },
    },
    {
      "@type": "DigitalDocument",
      "@id": `${siteUrl}/matrix#worksheet-es`,
      name: "La Matrix de Impacto vs. Riesgo (hoja de auditoría, español)",
      url: `${siteUrl}/downloads/la-matrix-de-impacto-vs-riesgo.pdf`,
      encodingFormat: "application/pdf",
      inLanguage: "es",
      isAccessibleForFree: true,
      author: { "@id": `${siteUrl}/#founder` },
      about: { "@id": `${siteUrl}/matrix#method` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Mario L. Arredondo",
      url: "https://rebelminds.ai",
      jobTitle: "AI Adoption Strategist & Systems Builder",
      description:
        "M.A., Industrial & Organizational Psychology. Builds the AI automation systems and researches the human layer of AI adoption.",
      worksFor: { "@id": `${siteUrl}/#organization` },
      sameAs: [
        "https://www.linkedin.com/in/mario-arredondo-romo/",
        "https://www.youtube.com/@rebelmindsai",
        "https://www.youtube.com/@mentesrebeldesia",
        "https://rebelminds.ai",
        "https://doi.org/10.54014/DKAX-FS1S",
        "https://doi.org/10.1080/17470218.2016.1222446",
        "https://doi.org/10.1080/17470218.2016.1256416",
      ],
    },
  ],
};

export default function MatrixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense>
        <MatrixClient />
      </Suspense>
    </>
  );
}
