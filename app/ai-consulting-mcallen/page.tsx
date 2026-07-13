"use client";
import { useEffect, useRef, useState } from "react";
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const CITIES = [
  "McAllen",
  "Edinburg",
  "Mission",
  "Pharr",
  "Weslaco",
  "Harlingen",
  "Brownsville",
];

const FAQS = [
  {
    q: "Do you meet in person in the Rio Grande Valley?",
    a: "Yes. Rebel Minds OPS is based in McAllen and serves the Valley as a local: McAllen, Edinburg, Mission, Pharr, Weslaco, Harlingen, and Brownsville. The free Ops Scan can happen at your shop, your office, or over a call, whichever fits your day.",
  },
  {
    q: "Can the systems work for a crew that runs in Spanish?",
    a: "Yes, and this is where being from the Valley matters. We build systems your whole operation can use in English, Spanish, or both: the owner reads the dashboard in one language while the crew sends receipts through WhatsApp in the other. Nobody gets left out of the system because of the language it speaks.",
  },
  {
    q: "Do you only work with RGV businesses?",
    a: "No. The systems are forged here first, with local businesses under real pressure, and then delivered remotely to any U.S. market. Local clients get a consultant who knows the market from inside it. Remote clients get systems that already survived it.",
  },
  {
    q: "What does AI consulting cost in McAllen?",
    a: "The same honest answer we give everywhere: every operation is different, so we don't publish one-size prices. Start with the free 15-minute Ops Scan. If your operation is one we can genuinely improve, you see the proposed system, its cost, and the ROI plan side by side within a couple of days, before you commit to anything.",
  },
];

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const mcallenJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.rebelmindsops.com/ai-consulting-mcallen#localbusiness",
      name: "Rebel Minds Ops",
      description:
        "AI consulting and automation systems built in McAllen, Texas for businesses across the Rio Grande Valley and nationwide. Bilingual (English and Spanish). HIPAA-compliant systems for healthcare practices.",
      url: "https://www.rebelmindsops.com/ai-consulting-mcallen",
      telephone: "+19565204123",
      email: "hello@rebelmindsops.com",
      areaServed: CITIES.map((c) => `${c}, TX`).concat(["Rio Grande Valley, TX", "United States"]),
      availableLanguage: ["English", "Spanish"],
      knowsAbout: ["AI consulting", "AI workflow automation", "AI readiness assessment", "AI adoption training", "HIPAA-compliant automation"],
      sameAs: ["https://rebelminds.ai", "https://www.rebelmindsops.com"],
      parentOrganization: { "@id": "https://www.rebelmindsops.com/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rebelmindsops.com/ai-consulting-mcallen#faq",
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
            AI Consulting &middot; McAllen &amp; the Rio Grande Valley
          </span>
        </FadeIn>

        <FadeIn delay={80}>
          <h1 className="serif mt-5 max-w-[15ch] text-[clamp(3rem,9vw,5.9rem)] font-medium leading-[0.99] tracking-[-0.02em] text-[#e9edf4]">
            Built in the Valley.{" "}
            <em className="italic text-[#7fd7e2]">Proven&nbsp;here first.</em>
          </h1>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <FadeIn delay={160}>
            <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-[#8fa0b3]">
              Rebel Minds OPS builds AI and automation systems from McAllen,
              Texas, for businesses that run on tight margins, mixed-language
              crews, and no patience for software that doesn&rsquo;t work.{" "}
              <span className="font-medium text-[#e9edf4]">
                If a system survives here, it survives anywhere.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="flex flex-col items-start gap-3">
              <a
                href="/#book"
                className="rounded-full bg-[#7fd7e2] px-7 py-3.5 text-[0.95rem] font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
                onClick={() => trackEvent("CTA_Click", { location: "mcallen_hero", cta: "Get a Free Ops Scan" })}
              >
                Get a Free Ops Scan
              </a>
              <span className="text-sm text-[#8fa0b3]">
                15 minutes, in English or Spanish. No contracts. No jargon.
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 2. The origin story ─────────────────────────────────────────────────────

function OriginStory() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            Why the Valley
          </p>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            An AI consultant from here, not parachuted in
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-[#8fa0b3]">
            <p>
              The Rio Grande Valley is a hard market on purpose-built software:
              crews that work with their hands, offices that run bilingual,
              owners who have been burned by tools that looked great in the
              demo and died in the field. That is exactly why we build here.
            </p>
            <p>
              Our first production systems went live with Valley businesses:
              a construction company drowning in paper receipts from 15 active
              jobs now files them by snapping a photo on WhatsApp, and the
              owner got 8 to 10 hours back every week.{" "}
              <span className="font-medium text-[#e9edf4]">
                That system was designed for how the crew actually works, not
                how a vendor wished they worked.
              </span>
            </p>
            <p>
              The founder holds an M.A. in Industrial &amp; Organizational
              Psychology and publishes research on why AI systems succeed or
              fail at the human layer. That research runs the practice: read it
              at{" "}
              <a
                href="https://rebelminds.ai"
                target="_blank"
                rel="noopener"
                className="text-[#7fd7e2] underline-offset-2 hover:underline"
              >
                rebelminds.ai
              </a>
              , including{" "}
              <a
                href="https://rebelminds.ai/methodology"
                target="_blank"
                rel="noopener"
                className="text-[#7fd7e2] underline-offset-2 hover:underline"
              >
                the methodology
              </a>{" "}
              behind every system we ship.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 3. Cities strip ─────────────────────────────────────────────────────────

function CitiesStrip() {
  return (
    <section className="px-4 py-16 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mono text-center text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            Serving the Valley in person &middot; the rest of the U.S. remotely
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {CITIES.map((city) => (
              <span key={city} className="serif text-xl font-medium text-[#e9edf4] sm:text-2xl">
                {city}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4. What local businesses get ────────────────────────────────────────────

const LOCAL_POINTS = [
  {
    title: "Bilingual by design",
    desc: "Dashboards in English, WhatsApp capture in Spanish, or any mix your operation runs on. The system speaks your crew's language, both of them.",
  },
  {
    title: "Built for field crews",
    desc: "Construction, trades, logistics, home services: systems operated from a phone camera and a chat app, because that's what's in the truck.",
  },
  {
    title: "HIPAA-compliant for practices",
    desc: "Valley clinics and practices get patient intake, reminders, and review systems with compliance designed in as a system, not a feature.",
  },
  {
    title: "A local you can call",
    desc: "The free Ops Scan can happen at your shop. The person who builds your system knows Nolana traffic and answers a McAllen phone number.",
  },
];

function LocalPoints() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            What local means here
          </p>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            AI consulting that knows this market
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {LOCAL_POINTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 60} className="h-full">
              <div className="h-full rounded-xl border bg-[#141d2c] p-7" style={{ borderColor: HAIRLINE }}>
                <h3 className="text-base font-semibold text-[#e9edf4]">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#8fa0b3]">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={280}>
          <p className="mt-10 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
            Wondering what the engagement itself looks like? The full picture
            of{" "}
            <a href="/ai-consulting" className="text-[#7fd7e2] underline-offset-2 hover:underline">
              how our AI consulting works
            </a>{" "}
            covers the diagnosis, the proposal, and the four doors every
            finding walks through.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 5. FAQ ──────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Local questions, straight answers
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
        <FadeIn delay={300}>
          <div className="mt-12 flex justify-center">
            <a
              href="/#book"
              className="rounded-full bg-[#7fd7e2] px-7 py-3.5 text-[0.95rem] font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
              onClick={() => trackEvent("CTA_Click", { location: "mcallen_footer", cta: "Get a Free Ops Scan" })}
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

export default function AiConsultingMcAllenPage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mcallenJsonLd) }}
      />
      <SiteNav />
      <Hero />
      <OriginStory />
      <SectionDivider />
      <CitiesStrip />
      <SectionDivider />
      <LocalPoints />
      <SectionDivider />
      <FAQ />
      <SiteFooter />
    </div>
  );
}
