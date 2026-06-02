"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";

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
    <div className="h-px bg-gradient-to-r from-transparent via-[#7DE3E6]/15 to-transparent" />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0B1220]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-24 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Image
              src="/rebelminds-icon.png"
              alt="Rebel Minds Ops"
              width={80}
              height={80}
              priority
              className="rounded-md"
            />
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight text-white">
                Rebel Minds OPS
              </div>
              <div className="text-[11px] font-medium tracking-wide text-slate-400">
                Operational Systems & Automation
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a href="/our-science" className="text-sm text-slate-400 transition-colors hover:text-white">Our Science</a>
            <a href="/healthcare" className="text-sm text-white transition-colors hover:text-white">Healthcare</a>
            <a href="/#what-we-build" className="text-sm text-slate-400 transition-colors hover:text-white">What We Build</a>
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
              >
                Services
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2" style={{ minWidth: 220 }}>
                  <div className="rounded-xl border border-white/[0.08] bg-[#0B1220] p-1.5 shadow-xl backdrop-blur-md">
                    <a href="/cybersecurity" className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Cybersecurity
                      <span className="rounded-full bg-[#7DE3E6]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#7DE3E6]">New</span>
                    </a>
                    <a href="/healthcare" className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Healthcare
                      <span className="rounded-full bg-[#F472B6]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#F472B6]">New</span>
                    </a>
                    <a href="/cybersecurity#cyber-intake" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Free Security Assessment
                    </a>
                    <a href="/healthcare#hipaa-audit" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Free HIPAA Stack Audit
                    </a>
                    <a href="/our-science" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Our Science
                    </a>
                  </div>
                </div>
              )}
            </div>
            <a
              href="/#book"
              className="glow-teal rounded-lg bg-[#7DE3E6] px-4 py-2 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
            >
              Get a Free Ops Scan
            </a>
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] bg-[#0E1A2B] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <a href="/our-science" className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
              Our Science
            </a>
            <a href="/healthcare" className="rounded-lg px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
              Healthcare
            </a>
            <a href="/#what-we-build" className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
              What We Build
            </a>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              Services
              <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-0.5 pl-4">
                <a href="/cybersecurity" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Cybersecurity
                  <span className="rounded-full bg-[#7DE3E6]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#7DE3E6]">New</span>
                </a>
                <a href="/healthcare" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Healthcare
                  <span className="rounded-full bg-[#F472B6]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#F472B6]">New</span>
                </a>
                <a href="/cybersecurity#cyber-intake" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Free Security Assessment
                </a>
                <a href="/healthcare#hipaa-audit" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Free HIPAA Stack Audit
                </a>
                <a href="/our-science" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Our Science
                </a>
              </div>
            )}
            <div className="pt-2">
              <a
                href="/#book"
                className="block rounded-lg bg-[#7DE3E6] px-4 py-2.5 text-center text-sm font-semibold text-[#0B1220]"
                onClick={() => setOpen(false)}
              >
                Get a Free Ops Scan
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6"
      style={{ backgroundColor: "#0d1117" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F472B6]/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F472B6]/25 bg-[#F472B6]/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F472B6]">
            Healthcare &middot; HIPAA-Aware
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Built where biology meets behavior — and where regulated data has always been our standard.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
            Healthcare automation designed by someone formally trained in clinical
            sciences, I-O Psychology, and the strictest tier of healthcare data
            protection. Highest academic honors. Peer-reviewed research. Published a
            219-page Texas state-funded health assessment under HHSC oversight.
            Bilingual by default. Built in the RGV.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/#book"
              className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
            >
              Schedule a 30-min Discovery Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#hipaa-audit"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              Get a Free HIPAA Stack Audit
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 2. Pain Landscape ───────────────────────────────────────────────────────

function PainLandscape() {
  const cards = [
    {
      accent: "#F472B6",
      title: "Your front desk is drowning in paperwork.",
      body: "Manual intake forms. Insurance verification on hold. Treatment plans that get presented and never followed up. The math: every untracked treatment plan that walks out the door is revenue you'll never see.",
    },
    {
      accent: "#F59E0B",
      title: "After-hours emergencies are walking to competitors.",
      body: "A patient calls at 8pm with a cracked tooth. Voicemail. Three minutes later they're Googling the next office. By 9pm they're someone else's patient. Every emergency you miss is $300–$2,000+ of revenue lost — and a referral relationship that didn't form.",
    },
    {
      accent: "#7DE3E6",
      title: "Your reputation is left to chance.",
      body: "Happy patients quietly leave. Frustrated patients post publicly. No system catches the difference. Practices with structured review systems consistently outpace competitors with similar care quality — because online perception drives new patient choice.",
    },
  ];

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F472B6]/20 bg-[#F472B6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F472B6]">
              The Reality
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              The reality at most RGV practices.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 80}>
              <div
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                style={{ borderLeftWidth: 3, borderLeftColor: c.accent }}
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{c.title}</h3>
                <p className="text-sm text-slate-400">{c.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. HIPAA Differentiator ─────────────────────────────────────────────────

function HipaaDifferentiator() {
  const goodStack = [
    {
      name: "Twilio",
      tag: "BAA-signed",
      desc: "SMS, voice, MMS for patient communication.",
    },
    {
      name: "AWS",
      tag: "BAA-signed",
      desc: "Bedrock AI, S3, RDS, Transcribe for compute and storage.",
    },
    {
      name: "Microsoft 365 / Google Workspace",
      tag: "BAA-eligible plans",
      desc: "Office workflows on enterprise tiers that include a BAA.",
    },
    {
      name: "Self-hosted infrastructure",
      tag: "Your account, your control",
      desc: "Where the data sits matters. We default to your tenancy.",
    },
  ];
  const badStack = [
    {
      name: "WhatsApp Business",
      desc: "Meta won't sign a BAA. Period.",
    },
    {
      name: "Vanilla ChatGPT / Claude APIs",
      desc: "Require Enterprise tier with executed BAA before they touch PHI.",
    },
    {
      name: "Most consumer-grade automation tools",
      desc: "Zapier free tiers, IFTTT, off-the-shelf chatbots — no BAA available.",
    },
    {
      name: "Tools that route patient data through unverified third parties",
      desc: "Free email-to-text, screen-share apps, photo-sharing apps for x-rays.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              The Trust Gate
            </span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              HIPAA isn&apos;t a checkbox. It&apos;s how we architect.
            </h2>
            <div className="mx-auto max-w-3xl space-y-4 text-left text-slate-400 sm:text-center">
              <p>
                Most &ldquo;AI for healthcare&rdquo; pitches use vendors that legally
                cannot touch patient data. Generic ChatGPT integrations. WhatsApp
                business accounts. Tools that route patient data through third parties
                without Business Associate Agreements (BAAs). It&apos;s everywhere —
                and most practice owners don&apos;t know to ask.
              </p>
              <p>
                Every system we build for a healthcare client flows through BAA-signed
                infrastructure from day one. Not because we read a checklist — because
                we know what it means when you don&apos;t.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="bg-green-500/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-green-300">
                What we build with
              </div>
              <div className="bg-red-500/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-red-300">
                What we won&apos;t touch
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="divide-y divide-white/[0.06] bg-green-500/[0.04]">
                {goodStack.map((row) => (
                  <div key={row.name} className="flex items-start gap-3 px-5 py-4">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                    <div>
                      <p className="text-sm font-semibold text-green-200">
                        {row.name}{" "}
                        <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-300">
                          {row.tag}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-green-200/70">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-white/[0.06] bg-red-500/[0.04]">
                {badStack.map((row) => (
                  <div key={row.name} className="flex items-start gap-3 px-5 py-4">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <div>
                      <p className="text-sm font-semibold text-red-200">{row.name}</p>
                      <p className="mt-1 text-xs text-red-200/70">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-8 text-center text-sm italic text-slate-500">
            Generic AI consultants can&apos;t write this table. They don&apos;t know
            what they don&apos;t know.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4. Why HIPAA has always been our standard ───────────────────────────────

function WhyHipaaStandard() {
  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
            Operational Reality
          </span>
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            We didn&apos;t add HIPAA to our pitch deck. It&apos;s been our operational reality for years.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-lg leading-relaxed text-slate-300">
            Most &ldquo;HIPAA-aware&rdquo; AI consultants learned compliance from a
            vendor&apos;s marketing page. We learned it three ways: as an academic
            discipline (pre-medical biology coursework, Addiction & Rehabilitation
            Studies — a field operating under federal protections stricter than HIPAA
            itself), as an operational responsibility (publishing population health
            data under direct Texas HHSC oversight), and as architectural design
            (every system we build today, with BAA-signed infrastructure as the only
            option). Three layers, one standard.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 5. Services ─────────────────────────────────────────────────────────────

function Services() {
  const featured = [
    {
      accent: "#F472B6",
      title: "Reputation routing & review acquisition",
      body: "Post-visit messaging that detects sentiment automatically. Happy patients get routed to your Google Business Profile. Frustrated patients get routed to private feedback — so they vent to you, not online. Bilingual from day one.",
      roi: "Protects existing rating. Compounds over time. Already running for our first dental client.",
    },
    {
      accent: "#F59E0B",
      title: "After-hours AI receptionist & voicemail triage",
      body: "Patient calls at 8pm with a cracked tooth. AI triages urgency, sends emergency alert to the on-call clinician's phone, books non-urgent for next morning. Bilingual. HIPAA-aware end to end.",
      roi: "Captures an estimated $300–$2,000+ per emergency case currently going to competitors.",
    },
    {
      accent: "#7DE3E6",
      title: "Treatment plan follow-up & patient reactivation",
      body: "30–50% of presented treatment plans never get scheduled. We systematically follow up — bilingual SMS, calibrated cadence, sentiment-aware copy — so revenue doesn't walk out the door.",
      roi: "Even a 5–10% lift in case acceptance is $20–50K/yr for a typical RGV practice.",
    },
  ];

  const additional = [
    "Internal staff knowledge bot (SOPs, fee schedules, instant Q&A — zero PHI, easiest entry point)",
    "Insurance verification automation",
    "Patient intake compressor (text-to-form, OCR-driven)",
    "Bilingual patient communications layer",
    "Daily morning brief for the doctor (production, schedule, reviews — one SMS at 8am)",
    "Post-op care follow-up sequences",
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F472B6]/20 bg-[#F472B6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F472B6]">
              Healthcare Services
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              What we build for RGV practices.
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Three featured services. More available — every system designed for the
              way your front desk actually works.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                style={{ borderLeftWidth: 3, borderLeftColor: card.accent }}
              >
                <h3 className="mb-3 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mb-4 text-sm text-slate-400">{card.body}</p>
                <p
                  className="mt-auto rounded-lg border px-3 py-2 text-xs font-medium"
                  style={{
                    borderColor: `${card.accent}30`,
                    backgroundColor: `${card.accent}10`,
                    color: card.accent,
                  }}
                >
                  {card.roi}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Also available
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {additional.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F472B6]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 6. Why Our Background Matters ───────────────────────────────────────────

function Background() {
  const blocks = [
    {
      color: "#F472B6",
      label: "Undergraduate — Summa Cum Laude (expected)",
      title: "B.S. Biology, Biological Sciences Concentration — UTRGV",
      desc: "Pre-medical-track curriculum spanning anatomy, physiology, biochemistry, microbiology, and human systems. Graduating with the highest academic distinction. The clinical workflows we automate are workflows we studied the science behind.",
    },
    {
      color: "#534AB7",
      label: "Graduate — Full Scholarship",
      title: "Industrial-Organizational Psychology — SUNY Albany",
      desc: "Doctoral-level training in organizational behavior, change adoption, training transfer, and human factors. Most healthcare automation fails because staff doesn't adopt it — not because the tech is broken. We design for how your team actually works, not how a software vendor imagines they do.",
    },
    {
      color: "#10B981",
      label: "Published Work — Regulated Health Data",
      title: "Healthcare data under Texas HHSC oversight",
      desc:
        "Published a 219-page population health assessment for Texas HHSC's Prevention Resource Center 11, covering substance use, mental health, and demographic data across 19 South Texas counties.\n\nCompliance with the strictest tier of US health data wasn't theoretical. It was the job.",
      citation: {
        text: "2023 Regional Needs Assessment available at",
        link: "https://prc11.org/data",
        linkText: "prc11.org/data",
      },
    },
    {
      color: "#7DE3E6",
      label: "Peer-Reviewed Publications",
      title: "Cognitive Psychology & I-O Psychology research",
      desc: "Published research in cognitive psychology and Industrial-Organizational Psychology — the sciences of how individuals process information and how teams behave inside organizations. The methodological discipline academic journals demand is the same discipline we bring to healthcare automation: hypothesis-driven design, evidence-based methods, measurable outcomes. Healthcare deserves nothing less.",
    },
  ];

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              The Background
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Why our background matters for your practice.
            </h2>
          </div>
        </FadeIn>

        <div className="relative space-y-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10 sm:left-[15px]" />
          {blocks.map((item, i) => (
            <FadeIn key={item.label} delay={i * 100}>
              <div className="relative flex gap-5 pl-2 sm:pl-4">
                <div
                  className="relative z-10 mt-1.5 h-5 w-5 flex-shrink-0 rounded-full border-2 sm:h-7 sm:w-7"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}20` }}
                >
                  <div
                    className="absolute inset-1 rounded-full sm:inset-1.5"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="pb-2">
                  <span
                    className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.label}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                  {item.citation && (
                    <p className="mt-2 text-xs italic text-slate-500">
                      {item.citation.text}{" "}
                      <a
                        href={item.citation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7DE3E6] underline-offset-2 hover:underline"
                      >
                        {item.citation.linkText}
                      </a>
                      .
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-slate-500">
            Most AI consultants pitching healthcare have none of this. They learn
            HIPAA from blog posts. We learned the underlying science — clinical,
            behavioral, regulatory — over a decade.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 7. Bilingual + RGV ──────────────────────────────────────────────────────

function BilingualRGV() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F472B6]/20 bg-[#F472B6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F472B6]">
              Local By Design
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Built in the RGV. Bilingual by default. Same time zone, same cultural context, same understanding of your patients.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-6 text-base leading-relaxed text-slate-300">
            <p>
              Bilingual isn&apos;t an upgrade — it&apos;s the default. Your
              Spanish-speaking patients deserve the same patient experience as your
              English-speaking ones. We design every patient-facing system bilingual
              from day one: language detection automatic, cultural calibration native,
              no extra cost, no afterthought translation.
            </p>
            <p>
              Built in the RGV, for the RGV. Same time zone. In-person discovery.
              Founder lives 20 minutes from your practice. We understand the economics
              of an RGV practice because we understand the RGV — not just the
              language but the rhythms, the cultural context, the family dynamics
              that show up in every patient interaction.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 8. How an Engagement Works ──────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Free 30-min discovery",
      body: "We map your highest-leverage automation opportunity. Practice-specific, ROI-anchored. No commitment. No sales pressure.",
    },
    {
      num: "02",
      title: "Custom build proposal",
      body: "Fixed scope, fixed price, clear timeline. You review and approve before any work starts. Most practices start with one or two systems, not all of them.",
    },
    {
      num: "03",
      title: "Build, deploy, document, train",
      body: "Typical timeline: 3–6 weeks per system. We don't disappear after deployment — we stay until your staff has actually adopted what we built. That's how I-O Psychology research changes outcomes: training transfer is the bottleneck, not technology.",
    },
  ];

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              The Engagement
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              How working with us actually works.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.05]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)",
                  }}
                />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10 text-sm font-bold text-[#7DE3E6]">
                  {s.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. Trust + Proof ────────────────────────────────────────────────────────

function TrustProof() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#10B981]/25 bg-[#10B981]/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#10B981]">
            Currently Active
          </span>
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Currently in active deployment.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-lg leading-relaxed text-slate-300">
            We&apos;re currently building out our first dedicated healthcare
            engagement with a leading RGV practice. Case study coming after the
            deployment is fully operational. Hint: there&apos;s a partnership with a
            leading AI company that informs our work — we&apos;ll have more to share
            publicly soon.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 10. HIPAA Stack Audit (Anchored) ────────────────────────────────────────

function HipaaAudit() {
  return (
    <section
      id="hipaa-audit"
      className="px-4 py-20 sm:px-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(244,114,182,0.06) 0%, rgba(11,18,32,0) 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="rounded-3xl border border-[#F472B6]/30 bg-[#0E1A2B]/80 p-8 backdrop-blur-sm sm:p-12">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F472B6]/30 bg-[#F472B6]/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F472B6]">
              Free Service · No Commitment
            </span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              Free HIPAA Stack Audit
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                Most healthcare practices don&apos;t realize how many of the tools
                they already use put patient data at risk. WhatsApp for staff
                communication. Free email-to-text services. AI assistants without
                Business Associate Agreements. Photo-sharing apps for x-rays.
              </p>
              <p>
                We&apos;ll audit your current automation, communication, and
                data-handling tools, flag what puts you at compliance risk, and give
                you a written report. Free. No commitment. Roughly 30–45 min of your
                time.
              </p>
              <p className="italic text-slate-400">
                This isn&apos;t a sales gimmick. It&apos;s a service we can provide
                quickly because we&apos;ve spent years thinking about exactly this
                problem in regulated contexts.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/#book?topic=hipaa-stack-audit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#F472B6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#EC4899]"
              >
                Request your HIPAA Stack Audit
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 11. Final CTA ───────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0d1117" }}>
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Ready to build healthcare automation right?
            </h2>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/#book"
                className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
              >
                Schedule a 30-min Discovery Call
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#hipaa-audit"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Request HIPAA Stack Audit
              </a>
            </div>
            <p className="mt-8 text-sm italic text-slate-500">
              RGV-built. HIPAA-aware. Designed for the way your practice actually works.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2.5 sm:justify-start">
              <Image
                src="/rebelminds-icon.png"
                alt="Rebel Minds Ops"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="text-sm font-bold tracking-wide text-white">
                Rebel Minds OPS
              </span>
            </div>
            <span className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Rebel Minds OPS LLC. All rights reserved.
            </span>
          </div>
          <nav className="flex flex-col flex-wrap items-center justify-center gap-3 text-sm text-slate-400 sm:items-end">
            <div className="mb-2 flex flex-wrap justify-center gap-5">
              <a href="/" className="transition-colors hover:text-white">Home</a>
              <a href="/our-science" className="transition-colors hover:text-white">Our Science</a>
              <a href="/healthcare" className="transition-colors hover:text-white">Healthcare</a>
              <a href="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</a>
            </div>
            <a
              href="/#book"
              className="font-semibold text-[#7DE3E6] transition-colors hover:text-white"
            >
              Get a Free Ops Scan
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────

export default function HealthcarePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1220]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#F472B6]/[0.04] blur-[180px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-[500px] w-[600px] rounded-full bg-[#7DE3E6]/[0.025] blur-[140px]" />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <SectionDivider />
        <PainLandscape />
        <SectionDivider />
        <HipaaDifferentiator />
        <SectionDivider />
        <WhyHipaaStandard />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Background />
        <SectionDivider />
        <BilingualRGV />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <TrustProof />
        <SectionDivider />
        <HipaaAudit />
        <SectionDivider />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
