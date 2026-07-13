"use client";
import { useEffect, useRef, useState } from "react";
import {
  ClipboardCheck,
  GraduationCap,
  Route,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import { trackEvent } from "@/lib/analytics";

const HAIRLINE = "rgba(233,237,244,0.10)";

// ─── Shared Components ───────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-[rgba(127,215,226,0.15)] to-transparent" />
  );
}

// ─── FAQ data (rendered on page AND emitted as FAQPage schema) ────────────────

const FAQS = [
  {
    q: "What does an AI consultant do?",
    a: "An AI consultant studies how your business actually runs and tells you where AI genuinely helps, where a simpler fix beats it, and where it does not belong at all. At Rebel Minds OPS that means an operations analysis first: we map your workflows, score each one for impact against risk, and only then propose systems. The deliverable is not a tool recommendation. It is a plan for your operation, with the cost and the expected return shown side by side before you commit to anything.",
  },
  {
    q: "What does AI consulting cost?",
    a: "Every operation is different, so we don't publish one-size prices. The process protects you instead. The free 15-minute Ops Scan is a fit check: we see whether your operation is one we can genuinely improve. If it is, we analyze how you actually work, and within a couple of days you see the proposed system, its cost, and the ROI plan beside it, before you commit to anything. A good portion of our systems in production pay for themselves.",
  },
  {
    q: "Do we need technical staff to work with you?",
    a: "No. We design around the tools your team already uses daily: WhatsApp, email, mobile cameras. We build the system, train your people on it, and either manage it for you monthly or hand you the keys. Nothing we ship requires a developer on your payroll.",
  },
  {
    q: "How long does an AI project take?",
    a: "Automation modules like expense tracking or patient review systems take 2 to 3 weeks. Complex multi-system architectures take a month or more, broken into launch phases so you see working pieces early instead of waiting for a big reveal.",
  },
  {
    q: "Can AI systems work in a HIPAA environment?",
    a: "Yes, when compliance is designed in as a system rather than bolted on as a feature. We build HIPAA-compliant patient intake, appointment reminders, review routing, and secure communication workflows for clinics and practices. Healthcare is one of our primary verticals.",
  },
  {
    q: "What if AI is the wrong answer for our problem?",
    a: "Then we say so, and the diagnosis still leaves you better off. Every finding in our analysis gets one of four treatments: eliminate the step, simplify it, train for it, or automate it. Automation is one door out of four. Some of the most valuable findings we deliver are the steps a business should stop doing entirely, and no software purchase fixes those.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const aiConsultingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.rebelmindsops.com/ai-consulting#service",
      name: "AI Consulting",
      serviceType: ["AI Consulting", "AI Workflow Automation", "AI Readiness Assessment", "AI Adoption Training", "Custom AI Systems (HIPAA-Compliant)"],
      description:
        "AI consulting that starts with a diagnosis, not a demo: an operations analysis that shows where AI genuinely helps, where a simpler fix beats it, and where it does not belong. Based in McAllen, Texas; delivered remotely to any U.S. market. Bilingual (English and Spanish).",
      url: "https://www.rebelmindsops.com/ai-consulting",
      areaServed: ["McAllen, TX", "Edinburg, TX", "Mission, TX", "Pharr, TX", "Weslaco, TX", "Harlingen, TX", "Brownsville, TX", "Texas", "United States"],
      availableLanguage: ["English", "Spanish"],
      provider: {
        "@type": "ProfessionalService",
        "@id": "https://www.rebelmindsops.com/#organization",
        name: "Rebel Minds Ops",
        url: "https://www.rebelmindsops.com",
        telephone: "+19565204123",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rebelmindsops.com/ai-consulting#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-16 sm:pt-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16">
        <FadeIn>
          <span className="mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
            Service &middot; AI Consulting
          </span>
        </FadeIn>

        <FadeIn delay={80}>
          <h1 className="serif mt-5 max-w-[15ch] text-[clamp(3rem,9vw,5.9rem)] font-medium leading-[0.99] tracking-[-0.02em] text-[#e9edf4]">
            AI consulting that starts with{" "}
            <em className="italic text-[#7fd7e2]">a&nbsp;diagnosis.</em>
          </h1>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <FadeIn delay={160}>
            <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-[#8fa0b3]">
              Most AI engagements start with a tool and go looking for a
              problem. Ours start with your operation: what to automate, what
              to simplify, and what to leave alone.{" "}
              <span className="font-medium text-[#e9edf4]">
                Then we build only what earns its keep.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="flex flex-col items-start gap-3">
              <a
                href="/#book"
                className="rounded-full bg-[#7fd7e2] px-7 py-3.5 text-[0.95rem] font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
                onClick={() => trackEvent("CTA_Click", { location: "ai_consulting_hero", cta: "Get a Free Ops Scan" })}
              >
                Get a Free Ops Scan
              </a>
              <span className="text-sm text-[#8fa0b3]">
                15 minutes to see if we&rsquo;re a fit. No contracts. No jargon.
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 2. What an AI consultant does ───────────────────────────────────────────

function Definition() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            The job, plainly
          </p>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            What an AI consultant actually does
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-[#8fa0b3]">
            <p>
              An AI consultant studies how your business actually runs, then
              tells you three things: where AI genuinely helps, where a simpler
              fix beats it, and where it does not belong at all. The third
              answer is the one most vendors never give you, because they are
              paid to sell the tool, not the diagnosis.
            </p>
            <p>
              We are paid for the diagnosis. Every engagement starts with an
              operations analysis: we map the workflows that eat your team&rsquo;s
              hours, score each one for impact against risk, and put the
              proposed system, its cost, and its ROI plan in front of you side
              by side.{" "}
              <span className="font-medium text-[#e9edf4]">
                You decide with the numbers on the table, before anything gets
                built.
              </span>
            </p>
            <p>
              The method is grounded in the founder&rsquo;s research on the human
              side of AI adoption: systems fail at the human layer far more
              often than at the technical one, so adoption is designed in from
              the first sketch. The research lives at{" "}
              <a
                href="https://rebelminds.ai/methodology"
                target="_blank"
                rel="noopener"
                className="text-[#7fd7e2] underline-offset-2 hover:underline"
              >
                rebelminds.ai
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 3. How the engagement works ─────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "The Ops Scan",
    desc: "A free 15-minute fit check. We hear how your operation runs and tell you honestly whether we can improve it. No contracts, no jargon.",
  },
  {
    n: "02",
    title: "The diagnosis",
    desc: "We map your workflows with the Impact vs. Risk Matrix: what to eliminate, what to simplify, what to train for, and what to automate.",
  },
  {
    n: "03",
    title: "The proposal",
    desc: "Within a couple of days you see the proposed system, its cost, and the ROI plan beside it. You commit to nothing until then.",
  },
  {
    n: "04",
    title: "Build, train, run",
    desc: "We build the system, train your crew on tools they already use, and either manage it monthly or hand you the keys. You own everything.",
  },
];

function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            The engagement
          </p>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            Diagnosis before tools, every time
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: HAIRLINE }}>
          {STEPS.map((s, i) => (
            <FadeIn key={s.n} delay={i * 80} className="h-full">
              <div className="h-full bg-[#0a101a] p-7">
                <span className="mono text-[0.75rem] text-[#7fd7e2]">{s.n}</span>
                <h3 className="serif mt-3 text-xl font-medium text-[#e9edf4]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8fa0b3]">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. What we build ────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "AI Workflow Automation",
    desc: "Receipts, scheduling, follow-ups, intake, compliance docs: the repetitive work that eats your office, handled by systems your crew runs from WhatsApp, email, and a phone camera.",
    icon: Workflow,
  },
  {
    title: "AI Readiness Assessment",
    desc: "A structured audit of where your operation stands before you spend a dollar on AI: which workflows are ready, which need fixing first, and which should be left alone.",
    icon: ClipboardCheck,
  },
  {
    title: "AI Adoption Training",
    desc: "Systems fail at the human layer more often than the technical one. We train your team on the system in the tools they already know, in English, Spanish, or both.",
    icon: GraduationCap,
  },
  {
    title: "Custom AI Systems, HIPAA-Compliant",
    desc: "For clinics and practices: patient intake, appointment reminders, review routing, and secure communication built with compliance as a system, not a feature.",
    icon: ShieldCheck,
  },
  {
    title: "Ongoing Management",
    desc: "One-time builds or monthly managed support. Most clients start with a project and move to a monthly plan once the first system pays for itself.",
    icon: Route,
  },
];

function WhatWeBuild() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            The services
          </p>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            What AI consulting covers here
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 60} className="h-full">
              <div className="h-full rounded-xl border bg-[#141d2c] p-7" style={{ borderColor: HAIRLINE }}>
                <s.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                <h3 className="mt-4 text-base font-semibold text-[#e9edf4]">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#8fa0b3]">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. The honesty block ────────────────────────────────────────────────────

function NotAlwaysAI() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            The part vendors skip
          </p>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            Sometimes the answer is not AI
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-[#8fa0b3]">
            <p>
              Every finding in our analysis gets exactly one of four
              treatments: <span className="font-medium text-[#e9edf4]">eliminate</span> the
              step, <span className="font-medium text-[#e9edf4]">simplify</span> it,{" "}
              <span className="font-medium text-[#e9edf4]">train</span> for it, or{" "}
              <span className="font-medium text-[#e9edf4]">automate</span> it.
              Automation is one door out of four.
            </p>
            <p>
              Some of the most valuable findings we deliver are the steps a
              business should stop doing entirely. No software purchase fixes
              those, and an AI consultant who cannot say &ldquo;don&rsquo;t buy
              this&rdquo; is a salesperson with a better title.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 6. FAQ ──────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              AI consulting, asked and answered
            </h2>
          </div>
        </FadeIn>
        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 50}>
              <div className="overflow-hidden rounded-xl border bg-[#141d2c]" style={{ borderColor: HAIRLINE }}>
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="pr-4 text-sm font-medium text-[#e9edf4] sm:text-base">{faq.q}</span>
                  <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#7fd7e2] transition-transform duration-200 ${openIdx === i ? "rotate-45" : ""}`}>
                    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </span>
                </button>
                <div id={`faq-panel-${i}`} className="px-6 pb-5" hidden={openIdx !== i}>
                  <p className="text-sm leading-relaxed text-[#8fa0b3]">{faq.a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. Local strip + CTA ────────────────────────────────────────────────────

function LocalStrip() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            Built in McAllen. Delivered anywhere.
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed text-[#8fa0b3]">
            Rebel Minds OPS works from McAllen, Texas, serving the Rio Grande
            Valley in person and every U.S. market remotely. If you&rsquo;re
            local, start with{" "}
            <a
              href="/ai-consulting-mcallen"
              className="text-[#7fd7e2] underline-offset-2 hover:underline"
            >
              AI consulting in McAllen and the RGV
            </a>
            .
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/#book"
              className="rounded-full bg-[#7fd7e2] px-7 py-3.5 text-[0.95rem] font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
              onClick={() => trackEvent("CTA_Click", { location: "ai_consulting_footer", cta: "Get a Free Ops Scan" })}
            >
              Get a Free Ops Scan
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AiConsultingPage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiConsultingJsonLd) }}
      />
      <SiteNav />
      <Hero />
      <Definition />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <WhatWeBuild />
      <SectionDivider />
      <NotAlwaysAI />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <LocalStrip />
      <SiteFooter />
    </div>
  );
}
