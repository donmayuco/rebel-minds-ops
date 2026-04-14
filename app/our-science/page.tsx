"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  Shield,
  Users,
  Zap,
  BookOpen,
  GraduationCap,
  MapPin,
  Target,
  AlertTriangle,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import IPNotice from "@/app/components/IPNotice";

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
            <a href="/#for-who" className="text-sm text-slate-400 transition-colors hover:text-white">For who</a>
            <a href="/#what-we-build" className="text-sm text-slate-400 transition-colors hover:text-white">What we build</a>
            <a href="/#how" className="text-sm text-slate-400 transition-colors hover:text-white">How we work</a>
            <a href="/#featured-system" className="text-sm text-slate-400 transition-colors hover:text-white">Example</a>
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
                    <a href="/our-science" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Our Science
                    </a>
                    <a href="/cybersecurity" className="flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Cybersecurity
                      <span className="rounded-full bg-[#7DE3E6]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#7DE3E6]">New</span>
                    </a>
                    <a href="/cybersecurity#cyber-intake" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Free Security Assessment
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
            {[
              { label: "For who", href: "/#for-who" },
              { label: "What we build", href: "/#what-we-build" },
              { label: "How we work", href: "/#how" },
              { label: "Example", href: "/#featured-system" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
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
                <a href="/our-science" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Our Science
                </a>
                <a href="/cybersecurity" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Cybersecurity
                  <span className="rounded-full bg-[#7DE3E6]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#7DE3E6]">New</span>
                </a>
                <a href="/cybersecurity#cyber-intake" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Free Security Assessment
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

// ─── 3.1 Hero ────────────────────────────────────────────────────────────────

function ScienceHero() {
  const credentials = [
    "I-O Psychology — UTRGV, Summa Cum Laude",
    "Full Scholarship — SUNY Graduate Program",
    "Bicultural \u00B7 Bilingual \u00B7 30+ Years RGV Business Operations",
  ];

  return (
    <section className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6" style={{ backgroundColor: "#0d1117" }}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#7DE3E6]/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
            Our Science
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Most consultants sell tools.<br />
            We understand why people use them wrong.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
            Behind every failed software rollout, every phishing click, every operational
            bottleneck is a human behavior problem — not a technology problem. We bring
            the science of how people think, work, and change to everything we build and
            every team we protect.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {credentials.map((cred) => (
              <span
                key={cred}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300"
              >
                {cred}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 3.2 The Discipline ──────────────────────────────────────────────────────

function Discipline() {
  const concepts = [
    {
      num: "01",
      title: "Organizational behavior",
      desc: "How teams, hierarchies, and culture shape the way people actually act — versus how they say they act. Every system we build accounts for real human workflow, not ideal workflow.",
    },
    {
      num: "02",
      title: "Behavior change science",
      desc: "Spaced repetition, threat appraisal, psychological safety, and social proof are how you get employees to actually change security habits — not annual training videos.",
    },
    {
      num: "03",
      title: "Human factors & risk",
      desc: "91% of breaches start with human error. We understand the psychological vulnerabilities — authority bias, urgency response, social engineering — that attackers exploit.",
    },
  ];

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              The Discipline
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              What is Industrial-Organizational Psychology?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              I-O Psychology is the science of human behavior in organizations — how people
              are motivated, how they form habits, how they resist change, and what actually
              makes training stick. It sits at the intersection of psychology, business, and
              data. It is the reason our systems get adopted and our training changes
              behavior, while most consultants&apos; work collects dust.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {concepts.map((c, i) => (
            <FadeIn key={c.num} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.05] hover:shadow-[0_8px_32px_rgba(125,227,230,0.07)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)" }} />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10 text-sm font-bold text-[#7DE3E6]">
                  {c.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{c.title}</h3>
                <p className="text-sm text-slate-400">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3.3 Why Training Fails ──────────────────────────────────────────────────

function WhyTrainingFails() {
  const rows = [
    {
      bad: "Annual compliance training — one session, forgotten in days",
      good: "Spaced micro-learning — 5 min/week, behavior change in 30 days",
    },
    {
      bad: "Generic \u201Cdon\u2019t click phishing\u201D slides with no context",
      good: "Industry-specific scenarios your employees actually encounter",
    },
    {
      bad: "Fear-based training that creates anxiety without agency",
      good: "Psychological safety framing that builds confidence and reporting culture",
    },
    {
      bad: "One-size-fits-all rollout ignoring team culture and resistance",
      good: "Culture assessment first — training designed for how your team works",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              The Problem We Solve
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Why most cybersecurity training fails
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              It is not a content problem. Employees know phishing is dangerous. They click
              anyway. That is a behavior design problem — and it requires a behavioral
              science solution.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_1fr] text-center text-xs font-semibold uppercase tracking-wider">
              <div className="bg-red-500/10 px-4 py-3 text-red-300">What most companies do</div>
              <div className="flex items-center bg-white/[0.03] px-3 text-slate-500">vs</div>
              <div className="bg-green-500/10 px-4 py-3 text-green-300">What we do</div>
            </div>
            {/* Rows */}
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] border-t border-white/[0.06]">
                <div className="bg-red-500/[0.04] px-5 py-4 text-sm text-red-200/80">{row.bad}</div>
                <div className="flex items-center bg-white/[0.02] px-3 text-slate-600 text-xs">vs</div>
                <div className="bg-green-500/[0.04] px-5 py-4 text-sm text-green-200/80">{row.good}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 3.4 Where the Science Applies ───────────────────────────────────────────

function Applied() {
  const cards = [
    {
      accent: "#534AB7",
      badge: "Cybersecurity",
      title: "Security culture, not security compliance",
      desc: "We assess your organization\u2019s psychological relationship with risk before designing your training program. Employees who feel psychologically safe reporting mistakes catch more threats than those who hide errors out of fear. We build that culture intentionally.",
    },
    {
      accent: "#7DE3E6",
      badge: "Operations",
      title: "Systems built for human adoption",
      desc: "The #1 reason automation projects fail is change resistance — not bad technology. We map how your team actually works, identify adoption barriers before they become problems, and design onboarding that makes new systems feel natural, not imposed.",
    },
    {
      accent: "#F59E0B",
      badge: "Training design",
      title: "Spaced repetition + retrieval practice",
      desc: "The forgetting curve is real. Information without reinforcement disappears within 48 hours. Our training programs use evidence-based spacing — short sessions distributed over time — because that is what the research consistently shows drives retention.",
    },
    {
      accent: "#534AB7",
      badge: "Risk perception",
      title: "Why employees click phishing emails",
      desc: "Attackers exploit predictable cognitive biases — authority bias, urgency response, social proof, reciprocity. We teach your team to recognize these manipulation patterns as they happen, not just after the fact. That is threat appraisal theory applied to your inbox.",
    },
  ];

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              Applied to Your Business
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Where the science shows up in our work
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              This is not academic theory. These are the mechanisms we use every day to build
              systems that get adopted and training programs that actually change behavior.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                style={{ borderLeftWidth: 3, borderLeftColor: card.accent }}
              >
                <span
                  className="mb-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: `${card.accent}15`, color: card.accent }}
                >
                  {card.badge}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-slate-400">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3.5 Credentials ─────────────────────────────────────────────────────────

function Credentials() {
  const items = [
    {
      color: "#534AB7",
      label: "Graduate — Full Scholarship",
      title: "State University of New York (SUNY) — Industrial-Organizational Psychology",
      desc: "Selected for a full-ride graduate scholarship to one of the nation\u2019s leading I-O Psychology programs. Studied organizational behavior, psychometrics, training design, and human factors research at the graduate level.",
    },
    {
      color: "#F472B6",
      label: "Pre-Medical Sciences",
      title: "Pre-Medical Studies — Biology, Chemistry, Anatomy & Physiology",
      desc: "Completed pre-medical coursework building a foundation in clinical sciences, medical terminology, and human systems. This background shapes how we approach healthcare technology — we understand patient workflows, clinical data sensitivity, and why HIPAA compliance isn\u2019t just a checkbox but a design requirement.",
    },
    {
      color: "#7DE3E6",
      label: "Undergraduate — Summa Cum Laude",
      title: "University of Texas Rio Grande Valley (UTRGV) — Psychology",
      desc: "Graduated with the highest academic distinction from our own Valley university. Research focus on organizational psychology, human performance, and behavioral systems. UTRGV alumni building systems for UTRGV businesses.",
    },
    {
      color: "#7DE3E6",
      label: "Peer-Reviewed Researcher",
      title: "Published Research — Cognitive Psychology & Behavioral Systems",
      desc: "Author of peer-reviewed publications in cognitive psychology and a published thesis examining human behavior and decision-making. This research discipline is the foundation of every system we design — because technology that ignores how people actually think and behave doesn\u2019t get adopted. It gets abandoned.",
    },
    {
      color: "#F59E0B",
      label: "Practitioner — 30 Years in the Valley",
      title: "Rebel Minds OPS — Founder & Systems Architect",
      desc: "Bicultural and bilingual by lived experience — not by geography alone. The RGV has its own identity, its own rhythm, and its own relationship between owner, crew, and client. Over 30 years of operating in this market means we understand not just the business problems, but the human context surrounding every one of them. That context is what makes our systems get adopted instead of abandoned.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              The Background
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Credentials that matter in the real world
            </h2>
          </div>
        </FadeIn>

        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10 sm:left-[15px]" />

          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 100}>
              <div className="relative flex gap-5 pl-2 sm:pl-4">
                {/* Dot */}
                <div
                  className="relative z-10 mt-1.5 h-5 w-5 flex-shrink-0 rounded-full border-2 sm:h-7 sm:w-7"
                  style={{ borderColor: item.color, backgroundColor: `${item.color}20` }}
                >
                  <div
                    className="absolute inset-1 rounded-full sm:inset-1.5"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                {/* Content */}
                <div className="pb-2">
                  <span
                    className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.label}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3.6 Stats + CTA ────────────────────────────────────────────────────────

function StatsCTA() {
  const stats = [
    { value: "91%", label: "of cyberattacks start with human error — the problem is behavioral, not technical" },
    { value: "70%", label: "of software implementations fail due to change resistance and poor adoption design" },
    { value: "4x", label: "better retention from spaced training vs. single-session compliance" },
  ];

  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0d1117" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 80}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm">
                <div className="mb-3 text-4xl font-bold text-[#7DE3E6]">{stat.value}</div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mx-auto mb-12 max-w-3xl">
          <IPNotice />
        </div>

        <FadeIn delay={300}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Ready to work with someone who actually understands your team?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-slate-400">
              Most consultants hand you software and leave. We stay until your
              people have adopted it, your security culture has shifted, and your systems
              are running without you having to think about them.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/#book"
                className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
              >
                Get a Free Ops Scan
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/cybersecurity"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                See our cybersecurity plans
              </a>
            </div>
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
            <div className="mb-2 flex gap-5">
              <a href="/" className="transition-colors hover:text-white">Home</a>
              <a href="/our-science" className="transition-colors hover:text-white">Our Science</a>
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

export default function OurSciencePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1220]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#7DE3E6]/[0.04] blur-[180px]" />
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
        <ScienceHero />
        <SectionDivider />
        <Discipline />
        <SectionDivider />
        <WhyTrainingFails />
        <SectionDivider />
        <Applied />
        <SectionDivider />
        <Credentials />
        <SectionDivider />
        <StatsCTA />
        <Footer />
      </div>
    </div>
  );
}
