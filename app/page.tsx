"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle,
  Clock,
  Globe,
  MapPin,
  HardHat,
  Home as HomeIcon,
  KeyRound,
  LayoutDashboard,
  MessageCircle,
  Package,
  Receipt,
  ScanLine,
  Truck,
  Users,
  Workflow,
  Zap,
  Scale,
  HeartPulse,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import IPNotice from "@/app/components/IPNotice";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import WiringDiagram from "@/app/components/WiringDiagram";

const HAIRLINE = "rgba(233,237,244,0.10)";

// ─── Utility: scroll reveal (reduced-motion neutralized globally) ──────────────
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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
      {children}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>AI consulting &amp; operations systems, built by operators</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h1 className="serif mt-5 max-w-[13ch] text-[clamp(3rem,9vw,5.9rem)] font-medium leading-[0.99] tracking-[-0.02em] text-[#e9edf4]">
            Protect your focus.{" "}
            <em className="italic text-[#7fd7e2]">Automate the&nbsp;rest.</em>
          </h1>
        </FadeIn>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <FadeIn delay={160}>
            <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-[#8fa0b3]">
              We build and manage the systems that run growing businesses: receipts,
              scheduling, follow-ups, compliance.{" "}
              <span className="font-medium text-[#e9edf4]">
                Forged in McAllen, in Texas&rsquo;s hardest market, delivered remotely
                to any U.S. market.
              </span>{" "}
              You own the keys.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="flex flex-col items-start gap-3">
              <a
                href="#book"
                className="rounded-full bg-[#7fd7e2] px-7 py-3.5 text-[0.95rem] font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
                onClick={() => trackEvent("CTA_Click", { location: "hero_primary", cta: "Get a Free Ops Scan" })}
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
      <FadeIn delay={320} className="mt-6 sm:mt-8">
        <WiringDiagram hero />
      </FadeIn>
    </section>
  );
}

// ─── JPC Proof (promoted to hero position) ────────────────────────────────────
function JPCProof() {
  return (
    <section id="case-studies">
      <div className="mx-auto max-w-6xl">
        <div className="grid border-t md:grid-cols-2" style={{ borderColor: HAIRLINE }}>
          <div
            className="border-b px-4 py-10 sm:px-8 md:border-b-0 md:border-r"
            style={{ borderColor: HAIRLINE }}
          >
            <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
              Case study 01 · J. Peña Construction
            </p>
            <p className="serif mt-3.5 text-[2rem] font-medium leading-tight text-[#e9edf4]">
              8 to 10 hours back, every week
            </p>
            <p className="mt-3 max-w-[44ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Receipts from 15 active jobs used to eat the office alive. Now crews snap a
              photo on WhatsApp and the system files vendor, amount, date, and category on
              its own.
            </p>
          </div>
          <div className="px-4 py-10 sm:px-8">
            <p className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
              In the owner&rsquo;s words
            </p>
            <p className="serif mt-3.5 text-[1.5rem] font-medium italic leading-snug text-[#e9edf4]">
              &ldquo;I can finally focus on my jobs.&rdquo;
            </p>
            <p className="mt-4 text-[0.82rem] text-[#8fa0b3]">
              <span className="font-semibold text-[#e9edf4]">Jose Peña</span> · Owner, J.
              Peña Construction
            </p>
          </div>
        </div>
        <div
          className="border-t px-4 py-6 sm:px-8"
          style={{ borderColor: HAIRLINE }}
        >
          <span className="mono text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            Named case studies are published with the owner&rsquo;s permission · most
            clients stay unnamed
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Who It's For ─────────────────────────────────────────────────────────────
function WhoItsFor() {
  const industries = [
    { title: "Healthcare & Clinics", desc: "Patient intake, appointment reminders, review routing, and HIPAA-aware messaging, so your staff focuses on care, not paperwork.", icon: HeartPulse },
    { title: "Legal Offices", desc: "Document workflows, client onboarding, billing automation, and secure communication, so your billable hours stay billable.", icon: Scale },
    { title: "Construction & Trades", desc: "Receipt automation, job costing, mobile field capture, and project tracking, built for crews that work with their hands, not keyboards.", icon: HardHat },
    { title: "Logistics & Transport", desc: "Rate con analysis, compliance docs, expense tracking, and driver-facing tools your drivers actually use.", icon: Truck },
    { title: "Professional Services", desc: "Workspace setup, team communication, cloud systems, and client portals, streamlined so your back office keeps up with your front office.", icon: Briefcase },
    { title: "Home Services", desc: "Lead capture, dispatch coordination, invoicing, and customer follow-up, so you never lose a job to a missed call.", icon: HomeIcon },
  ];

  return (
    <section id="for-who" className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12">
            <Kicker>Who it&rsquo;s for</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Built for operators, wherever you operate
            </h2>
            <p className="mt-4 max-w-xl text-[#8fa0b3]">
              We partner with businesses that have outgrown their spreadsheets and paper
              forms. If your team is spending hours on data entry, it&rsquo;s time for a
              system. Every system we build is designed, delivered, and supported remotely,
              for operators anywhere in the U.S.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
          {industries.map((ind, i) => (
            <FadeIn key={ind.title} delay={i * 60}>
              <div className="h-full bg-[#141d2c] px-6 py-5">
                <div className="flex items-center gap-3">
                  <ind.icon className="h-4.5 w-4.5 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                  <h3 className="text-base font-semibold leading-tight text-[#e9edf4]">{ind.title}</h3>
                </div>
                <p className="mt-2 pl-[1.875rem] text-sm leading-relaxed text-[#8fa0b3]">{ind.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What We Build ────────────────────────────────────────────────────────────
function WhatWeBuild() {
  const systems = [
    { title: "Expense & Receipt Automation", desc: "WhatsApp-based receipt capture with AI extraction. Your crews snap a photo, the system does the rest: vendor, amount, date, category, all organized automatically.", icon: Receipt },
    { title: "Workspace & Communication", desc: "Microsoft 365, Google Workspace, Slack, or Teams, deployed and configured correctly. Proper channels, permissions, and security from day one.", icon: MessageCircle },
    { title: "Network & Connectivity", desc: "WiFi that actually works. We audit, fix, and set up routers, access points, VPNs, and firewalls for offices, clinics, and job sites.", icon: Globe },
    { title: "Business Data & Cloud Systems", desc: "Database design, data migration from spreadsheets, cloud hosting, and automated backups. Your business data: organized, secure, and accessible from anywhere.", icon: Package },
    { title: "Patient Experience Systems", desc: "Patient intake, automated appointment reminders, review collection and routing, and HIPAA-aware communication workflows.", icon: HeartPulse },
    { title: "Document & Contract Analysis", desc: "Send a PDF via WhatsApp. AI reads the full document, extracts key data, flags risks, and sends you a summary in seconds. Built for rate cons, invoices, and contracts.", icon: ScanLine },
    { title: "Human Layer Security Workshops", desc: "Security awareness training built on behavior science: phishing recognition, password and MFA habits, incident reporting. Technical hardening like 2FA rollout and email security available on request.", icon: KeyRound },
    { title: "Custom Dashboards & Reporting", desc: "Real-time KPI visualization built for ownership. See what matters (revenue, job costs, team performance) without digging through spreadsheets.", icon: LayoutDashboard },
  ];

  const pipelineSteps = ["Request", "Route", "Review", "Approve", "Archive"];

  return (
    <section id="what-we-build" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12">
            <Kicker>What we build</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Modular systems, connected to what you run
            </h2>
            <p className="mt-4 max-w-xl text-[#8fa0b3]">
              We don&rsquo;t sell bloated software. We build focused modules connected
              seamlessly via APIs and webhooks.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
          {systems.map((sys, i) => (
            <FadeIn key={sys.title} delay={i * 40}>
              <div className="h-full bg-[#141d2c] px-6 py-5">
                <div className="flex items-center gap-3">
                  <sys.icon className="h-4.5 w-4.5 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                  <h3 className="text-[1.02rem] font-semibold leading-tight text-[#e9edf4]">{sys.title}</h3>
                </div>
                <p className="mt-2 pl-[1.875rem] text-sm leading-relaxed text-[#8fa0b3]">{sys.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="mt-px flex flex-col gap-6 rounded-xl border bg-[#141d2c] p-6 lg:flex-row lg:items-center" style={{ borderColor: HAIRLINE }}>
            <div className="lg:w-1/2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border" style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}>
                <Workflow className="h-6 w-6 text-[#7fd7e2]" aria-hidden="true" />
              </div>
              <span className="mono mb-2 inline-block text-[0.7rem] uppercase tracking-[0.16em] text-[#7fd7e2]">
                Most requested
              </span>
              <h3 className="mb-2 serif text-xl font-medium text-[#e9edf4]">Approval Pipelines</h3>
              <p className="text-sm leading-relaxed text-[#8fa0b3]">
                Multi-step conditional routing for POs, vacations, and large expenses.
                Custom logic, any tool stack, no rigid SaaS limits.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:w-1/2">
              {pipelineSteps.map((label, idx, arr) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="rounded-md border px-3 py-2 text-xs font-semibold text-[#8fa0b3]" style={{ borderColor: HAIRLINE }}>
                    {label}
                  </div>
                  {idx < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-[#5f6e85]" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Featured System: ExpenseOps ──────────────────────────────────────────────
function FeaturedSystem() {
  const outcomes = [
    "Reduce manual data entry by 70 to 90%",
    "Improve expense visibility across teams and jobs",
    "Support more accurate job costing and margin tracking",
    "Clean data for accounting and tax prep",
  ];

  return (
    <section id="featured-system" className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-10">
            <Kicker>Featured proof module</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              ExpenseOps&trade;
            </h2>
            <p className="mt-4 max-w-xl text-[#8fa0b3]">
              A real-world example of what we build: a dedicated system designed to end
              expense documentation chaos for field-heavy teams.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-xl border bg-[#141d2c] p-8" style={{ borderColor: HAIRLINE }}>
            <h3 className="mb-6 serif text-xl font-medium text-[#e9edf4]">
              ExpenseOps&trade; workflow &amp; outcomes
            </h3>
            <ul className="space-y-4">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#8fa0b3]">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <IPNotice />
            <div className="mt-8">
              <a
                href="#book"
                className="inline-block rounded-full border px-6 py-3 text-sm font-semibold text-[#7fd7e2] transition-colors hover:bg-[rgba(127,215,226,0.08)]"
                style={{ borderColor: "rgba(127,215,226,0.3)" }}
                onClick={() => trackEvent("CTA_Click", { location: "featured_system", cta: "Discuss ExpenseOps Integration" })}
              >
                Discuss an ExpenseOps&trade; integration
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Case Studies (detailed) ─────────────────────────────────────────────────
function CaseStudyBlock({
  header,
  intro,
  pains,
  outcomes,
  quote,
  logo,
  logoAlt,
  who,
  role,
}: {
  header: string;
  intro: string;
  pains: string[];
  outcomes: string[];
  quote: string;
  logo: string;
  logoAlt: string;
  who: string;
  role: string;
}) {
  return (
    <>
      <FadeIn>
        <div className="mb-10">
          <h2 className="serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">{header}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[#8fa0b3]">{intro}</p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mb-6 rounded-xl border bg-[#141d2c] p-8" style={{ borderColor: HAIRLINE }}>
          <p className="mono mb-4 text-[0.7rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            The operational cost, before
          </p>
          <div className="space-y-4">
            {pains.map((p, i) => (
              <div key={i} className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-[#8fa0b3]">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border p-8" style={{ borderColor: "rgba(127,215,226,0.2)", backgroundColor: "rgba(127,215,226,0.04)" }}>
            <p className="mono mb-4 text-[0.7rem] uppercase tracking-[0.16em] text-[#7fd7e2]">
              After Rebel Minds OPS
            </p>
            <div className="space-y-4">
              {outcomes.map((o, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-[#8fa0b3]">{o}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col justify-between rounded-xl border bg-[#141d2c] p-8" style={{ borderColor: HAIRLINE }}>
            <p className="serif text-xl font-medium italic leading-relaxed text-[#e9edf4]">
              {quote}
            </p>
            <div className="mt-6 border-t pt-6" style={{ borderColor: HAIRLINE }}>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-white px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo} alt={logoAlt} className="h-14 w-auto object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#e9edf4]">{who}</p>
                  <p className="mt-0.5 text-xs text-[#8fa0b3]">{role}</p>
                </div>
              </div>
              <span className="mono mt-4 inline-block rounded-full border px-3 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-[#7fd7e2]" style={{ borderColor: "rgba(127,215,226,0.3)" }}>
                Active case study partner
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
}

function CaseStudies() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-12">
            <Kicker>Real work. Real clients.</Kicker>
          </div>
        </FadeIn>

        <CaseStudyBlock
          header="What happens when every open transaction finally lives in one place."
          intro="Abolengo Properties is a real estate brokerage running multiple active transactions in parallel, own listings and co-op deals. Each closing has dozens of moving parts. We built Leslie a system so none of them slip."
          pains={[
            "With multiple active transactions running at once, deal information was scattered across email threads, paper folders, PDFs, and group texts. There was no single place to see, at a glance, the real-time status of every open deal.",
            "Closing day depends on dozens of small steps: utilities transferred, MLS updated, lock box removed, alarm codes released, keys delivered. Manual checklists rely on memory and discipline alone, and even one missed item erodes the professional polish that defines the brand.",
            "Vendor and party info (lender, title, inspector, surveyor, co-broker, buyer and seller IDs) lived in different inboxes and phones. Onboarding an assistant or a new team member meant rebuilding the rolodex from scratch every time.",
          ]}
          outcomes={[
            "Every active transaction lives on one intelligent dashboard. Address, key dates, parties, vendors, and live closing-day checklist progress, all in a single view, shared across the team.",
            "Buyer and seller info, including securely stored copies of identification, is captured inside each transaction. The team stops chasing texts for documents and protects sensitive client data behind authentication.",
            "Yard signs become live lead capture. A buyer scans the QR, talks to a stateful WhatsApp bot that qualifies their interest, and only real, qualified buyers ping Leslie&rsquo;s phone, with the listing and contact info already attached.",
            "A persistent business contacts directory replaces scattered phone lists. New deals pull from a trusted pool of vendors. Onboarding new staff takes minutes, not weeks.",
          ]}
          quote="&ldquo;Every deal in one place. Every closing under control.&rdquo;"
          logo="/Abolengo_logo.jpg"
          logoAlt="Abolengo Properties"
          who="Leslie De Leon"
          role="Owner, Abolengo Properties"
        />

        <div className="mt-10">
          <IPNotice />
        </div>

        <FadeIn delay={300}>
          <div className="mt-12 text-center">
            <p className="serif text-2xl font-medium text-[#e9edf4] sm:text-3xl">Protect your focus.</p>
            <p className="serif text-2xl font-medium italic text-[#7fd7e2] sm:text-3xl">Automate the rest.</p>
            <p className="mt-3 text-sm text-[#8fa0b3]">
              That&rsquo;s not a tagline. That&rsquo;s what we actually build.
            </p>
            <div className="mt-8">
              <a
                href="#book"
                className="inline-block rounded-full bg-[#7fd7e2] px-7 py-3.5 text-sm font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
              >
                Start with a free fit check
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Why Rebel Minds Ops ──────────────────────────────────────────────────────
function WhyRebelMindsOps() {
  const points = [
    { title: "Forged in a hard market", desc: "Bicultural. Bilingual. Over 25 years operating in South Texas, where relationships, language, and trust have to be earned the hard way. We bring that discipline to every client, in every market we serve.", icon: MapPin },
    { title: "Industrial & organizational psychology lens", desc: "Cognitive overload kills adoption. We design every system around the humans who have to use it daily, because a tool your team resists is just expensive shelf furniture.", icon: Brain },
    { title: "Business ownership", desc: "We're not just coders; we are operators who have built and run businesses.", icon: HardHat },
    { title: "Modern architecture", desc: "We utilize API-first toolchains and serverless functions to keep overhead low.", icon: Zap },
    { title: "You own the workflow", desc: "No vendor lock-in. We build it, secure it, and hand you the keys.", icon: KeyRound },
  ];

  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <FadeIn>
              <Kicker>Our credibility</Kicker>
              <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
                Why Rebel Minds OPS
              </h2>
              <p className="mt-4 max-w-md text-[#8fa0b3]">
                Other automation companies sell you a tool and disappear. We start with how
                your business actually operates (the friction, the cognitive overload, the
                habits your team already has) and we build around all of it.
              </p>
            </FadeIn>
          </div>

          <div>
            {points.map((pt, i) => (
              <FadeIn key={pt.title} delay={i * 60}>
                <div className={`grid grid-cols-[3rem_1fr] gap-4 py-7 ${i > 0 ? "border-t" : "pt-0 lg:pt-2"}`} style={i > 0 ? { borderColor: HAIRLINE } : undefined}>
                  <span className="mono pt-1 text-sm font-semibold text-[#7fd7e2]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{pt.title}</h3>
                    <p className="text-sm leading-relaxed text-[#8fa0b3]">{pt.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Security Workshops Teaser ────────────────────────────────────────────────
function CyberTeaser() {
  return (
    <section id="cybersecurity" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Kicker>Security workshops</Kicker>
          <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            Most breaches start with a person. So does prevention.
          </h2>
          <p className="mt-4 max-w-2xl text-[#8fa0b3]">
            The systems we build store sensitive data and connect your whole team, and the
            biggest risk to any of it is a rushed click on a convincing email. Our security
            awareness workshops train the human layer using{" "}
            <a
              href="https://rebelminds.ai/framework"
              target="_blank"
              rel="noopener"
              className="font-medium text-[#7fd7e2] underline-offset-2 transition-colors hover:text-[#e9edf4] hover:underline"
            >
              The Human Layer Framework
            </a>{" "}
            and behavior science, so your team knows what to do when a real phishing attempt
            lands. Delivered remotely or on-site, anywhere in the U.S.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-[#7d90a1]">
            Technical security assessments are also available on request, scoped to your
            operation.
          </p>
          <a
            href="/cybersecurity"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
          >
            Explore the security workshops
            <ArrowRight className="h-4 w-4" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Shared form field styles ─────────────────────────────────────────────────
const inputCls =
  "w-full rounded-lg border bg-[#0c131e] px-4 py-3 text-sm text-[#e9edf4] placeholder-[#5f6e85] outline-none transition focus:border-[rgba(127,215,226,0.5)]";
const inputStyle = { borderColor: HAIRLINE };

// ─── Connect (single bilingual form — /api/connect contract FROZEN) ───────────
const CONNECT_T = {
  en: {
    kicker: "Start here",
    heading: "Get your Free Ops Scan",
    hipaaHeading: "Request your HIPAA Stack Audit",
    practiceHeading: "Request your practice walkthrough",
    sub: "Tell us about your business and we’ll set up a 15-minute fit check. If we’re a match, we analyze how your operation actually works and come back within days with the proposed system, its cost, and the ROI plan beside it.",
    hipaaSub: "Tell us about your practice and we’ll set up a 15-minute fit check. If we’re a match, we map your patient-data flow, vendor by vendor, and come back within days with the compliant architecture, its cost, and the ROI plan beside it.",
    practiceSub: "Tell us about your practice and we’ll set up the walkthrough: about an hour on site, free. We call your office as patients before we come, walk the practice with you, and give you an honest read on the spot.",
    modeGroup: "Choose how to reach out",
    modeFull: "Guided form",
    modeSimple: "Don’t like forms? Just write to us",
    bizFull: "Business Name",
    bizSimple: "Your name or business",
    bizPhFull: "e.g. Acme Construction LLC",
    bizPhSimple: "Who are we talking to?",
    msgLabel: "How can we help?",
    msgPh: "No structure needed. Tell us what's going on in your operation, in whatever words come naturally. We read every message personally.",
    typeLabel: "Type of Business",
    typePh: "Select your industry…",
    prioLabel: "What would you most like to improve right now?",
    prioPh: "Select the area causing the most friction...",
    prioHint: "Not sure where to start? That’s exactly what the call is for.",
    phoneLabel: "Phone Number",
    optional: "(optional)",
    emailLabel: "Email Address",
    emailPh: "you@company.com",
    submit: "Get My Free Ops Scan",
    hipaaSubmit: "Request the HIPAA Stack Audit",
    practiceSubmit: "Request the walkthrough",
    sending: "Sending…",
    foot: "The Ops Scan is a free 15-minute fit check. If we’re a match, you see the proposed system, its cost, and the ROI plan within days. No obligation.",
    successTitle: "Request received.",
    successSub: "We’ll call you shortly.",
    again: "Submit another request",
    errSimple: "Please add your name, email, and a few words about what you need.",
    errFull: "Please fill in all fields before submitting.",
    errGeneric: "Something went wrong. Please try again.",
    langToggle: "Español",
  },
  es: {
    kicker: "Empieza aquí",
    heading: "Solicita tu Ops Scan gratis",
    hipaaHeading: "Solicita tu auditoría de stack HIPAA",
    practiceHeading: "Solicita el recorrido de tu consultorio",
    sub: "Cuéntanos de tu negocio y agendamos una llamada de 15 minutos para ver si somos el equipo indicado. Si lo somos, analizamos cómo funciona tu operación y en unos días te mostramos el sistema propuesto, su costo y el plan de retorno, todo junto.",
    hipaaSub: "Cuéntanos de tu consultorio y agendamos una llamada de 15 minutos. Si somos el equipo indicado, mapeamos tu flujo de datos de pacientes, proveedor por proveedor, y en unos días te mostramos la arquitectura, su costo y el plan de retorno.",
    practiceSub: "Cuéntanos de tu consultorio y agendamos el recorrido: una hora en sitio, gratis. Llamamos a tu oficina como pacientes antes de ir, recorremos la práctica contigo y te damos una lectura honesta en el momento.",
    modeGroup: "Elige cómo contactarnos",
    modeFull: "Formulario guiado",
    modeSimple: "¿No te gustan los formularios? Solo escríbenos",
    bizFull: "Nombre del negocio",
    bizSimple: "Tu nombre o negocio",
    bizPhFull: "Ej. Construcciones Peña LLC",
    bizPhSimple: "¿Con quién hablamos?",
    msgLabel: "¿Cómo te podemos ayudar?",
    msgPh: "Sin estructura. Cuéntanos qué está pasando en tu operación, con tus propias palabras. Leemos cada mensaje personalmente.",
    typeLabel: "Tipo de negocio",
    typePh: "Selecciona tu industria…",
    prioLabel: "¿Qué te gustaría mejorar?",
    prioPh: "Selecciona el área con más fricción...",
    prioHint: "¿No sabes por dónde empezar? Para eso es exactamente la llamada.",
    phoneLabel: "Teléfono",
    optional: "(opcional)",
    emailLabel: "Correo electrónico",
    emailPh: "tu@negocio.com",
    submit: "Solicitar mi Ops Scan gratis",
    hipaaSubmit: "Solicitar la auditoría HIPAA",
    practiceSubmit: "Solicitar el recorrido",
    sending: "Enviando…",
    foot: "El Ops Scan es una llamada gratis de 15 minutos para ver si somos el equipo indicado. Si lo somos, en unos días ves el sistema propuesto, su costo y el plan de retorno. Sin compromiso.",
    successTitle: "Solicitud recibida.",
    successSub: "Te llamamos pronto.",
    again: "Enviar otra solicitud",
    errSimple: "Por favor agrega tu nombre, correo y unas palabras sobre lo que necesitas.",
    errFull: "Por favor llena todos los campos antes de enviar.",
    errGeneric: "Algo salió mal. Por favor intenta de nuevo.",
    langToggle: "English",
  },
} as const;

const INDUSTRY_OPTS: [string, string, string][] = [
  ["construction", "Construction / Trades", "Construcción / Oficios"],
  ["logistics", "Logistics / Transport", "Logística / Transporte"],
  ["home-services", "Home Services", "Servicios del Hogar"],
  ["professional-services", "Professional Services", "Servicios Profesionales"],
  ["healthcare", "Healthcare / Medical", "Salud / Médico"],
  ["other", "Other", "Otro"],
];

const PRIORITY_OPTS: [string, string, string][] = [
  ["Organize receipts and expenses for better accounting", "Organize receipts and expenses for better accounting", "Organizar recibos y gastos para contabilidad"],
  ["Improve project visibility and tracking", "Improve project visibility and tracking", "Mejorar la visibilidad y seguimiento de proyectos"],
  ["Reduce manual data entry and paperwork", "Reduce manual data entry and paperwork", "Reducir captura manual de datos y papeleo"],
  ["Respond to leads faster and track inquiries", "Respond to leads faster and track inquiries", "Responder a prospectos más rápido"],
  ["Simplify scheduling and team coordination", "Simplify scheduling and team coordination", "Simplificar horarios y coordinación del equipo"],
  ["Set up or improve IT infrastructure (WiFi, email, workspace tools)", "Set up or improve IT infrastructure", "Configurar o mejorar infraestructura de TI"],
  ["Healthcare patient systems (intake, reviews, HIPAA messaging)", "Healthcare patient systems", "Sistemas para pacientes (formularios, reseñas, mensajería HIPAA)"],
  ["Patient experience and front-office operations (practice walkthrough)", "Patient experience & front-office operations", "Experiencia del paciente y operación del consultorio"],
  ["Not sure yet — show me what’s possible", "Not sure yet, show me what’s possible", "No estoy seguro, muéstrame qué es posible"],
];

function Connect() {
  const emptyForm = {
    business: "",
    type: "",
    phone: "",
    email: "",
    priorityArea: "",
    message: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [mode, setMode] = useState<"full" | "simple">("full");
  const [lang, setLang] = useState<"en" | "es">("en");
  const [offer, setOffer] = useState<"scan" | "hipaa" | "practice">("scan");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const t = CONNECT_T[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lang") === "es") setLang("es");
    if (params.get("offer") === "hipaa") {
      setOffer("hipaa");
      setForm((prev) => ({
        ...prev,
        type: "healthcare",
        priorityArea: "Healthcare patient systems (intake, reviews, HIPAA messaging)",
      }));
    }
    if (params.get("offer") === "practice") {
      setOffer("practice");
      setForm((prev) => ({
        ...prev,
        type: "healthcare",
        priorityArea: "Patient experience and front-office operations (practice walkthrough)",
      }));
    }
    const onLang = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "es" || detail === "en") setLang(detail);
    };
    window.addEventListener("rmops:lang", onLang);
    return () => window.removeEventListener("rmops:lang", onLang);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const simple = mode === "simple";
    if (simple) {
      if (!form.business || !form.email || !form.message) {
        setError(t.errSimple);
        return;
      }
    } else if (
      !form.business ||
      !form.type ||
      !form.priorityArea ||
      !form.phone ||
      !form.email
    ) {
      setError(t.errFull);
      return;
    }

    const source =
      offer === "hipaa"
        ? "Website · HIPAA audit request"
        : offer === "practice"
        ? "Website · Practice walkthrough request"
        : simple
          ? lang === "es"
            ? "Website · quick note (ES)"
            : "Website · quick note"
          : lang === "es"
            ? "Spanish Form"
            : "Website";

    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          simple
            ? {
                business: form.business,
                type: "",
                phone: form.phone,
                email: form.email,
                priorityArea: "",
                notes: form.message,
                source,
              }
            : { ...form, source }
        ),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.details || data?.error || "Request failed");
      }

      setSuccess(true);
      setForm({ ...emptyForm });
    } catch (err) {
      console.error("Submission failed:", err);
      setError(t.errGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="book" className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <Kicker>{t.kicker}</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              {offer === "hipaa" ? t.hipaaHeading : offer === "practice" ? t.practiceHeading : t.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#8fa0b3]">
              {offer === "hipaa" ? t.hipaaSub : offer === "practice" ? t.practiceSub : t.sub}
            </p>
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="mt-4 rounded-full border px-3.5 py-1.5 text-xs font-semibold text-[#8fa0b3] transition-colors hover:text-[#e9edf4]"
              style={{ borderColor: "rgba(233,237,244,0.15)" }}
            >
              {t.langToggle}
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="rounded-xl border bg-[#141d2c] p-8" style={{ borderColor: HAIRLINE }}>
            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: "rgba(127,215,226,0.3)", backgroundColor: "rgba(127,215,226,0.1)" }}>
                  <CheckCircle className="h-7 w-7 text-[#7fd7e2]" />
                </div>
                <p className="text-lg font-semibold text-[#e9edf4]">{t.successTitle}</p>
                <p className="text-[#8fa0b3]">{t.successSub}</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs text-[#8fa0b3] underline hover:text-[#e9edf4]"
                >
                  {t.again}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex flex-wrap gap-2" role="group" aria-label={t.modeGroup}>
                  <button
                    type="button"
                    aria-pressed={mode === "full"}
                    onClick={() => { setMode("full"); setError(""); }}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      mode === "full"
                        ? "border-[#7fd7e2] bg-[rgba(127,215,226,0.1)] text-[#7fd7e2]"
                        : "border-[rgba(233,237,244,0.15)] text-[#8fa0b3] hover:text-[#e9edf4]"
                    }`}
                  >
                    {t.modeFull}
                  </button>
                  <button
                    type="button"
                    aria-pressed={mode === "simple"}
                    onClick={() => { setMode("simple"); setError(""); }}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      mode === "simple"
                        ? "border-[#7fd7e2] bg-[rgba(127,215,226,0.1)] text-[#7fd7e2]"
                        : "border-[rgba(233,237,244,0.15)] text-[#8fa0b3] hover:text-[#e9edf4]"
                    }`}
                  >
                    {t.modeSimple}
                  </button>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-business">
                    {mode === "simple" ? t.bizSimple : t.bizFull}{" "}
                    <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <input
                    id="connect-business"
                    name="business"
                    type="text"
                    required
                    placeholder={mode === "simple" ? t.bizPhSimple : t.bizPhFull}
                    value={form.business}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                {mode === "simple" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-message">
                      {t.msgLabel} <span className="text-[#7fd7e2]">*</span>
                    </label>
                    <textarea
                      id="connect-message"
                      name="message"
                      required
                      rows={5}
                      placeholder={t.msgPh}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputCls} resize-y`}
                      style={inputStyle}
                    />
                  </div>
                )}

                {mode === "full" && (<>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-type">
                    {t.typeLabel} <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <select
                    id="connect-type"
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>{t.typePh}</option>
                    {INDUSTRY_OPTS.map(([v, en, es]) => (
                      <option key={v} value={v}>{lang === "es" ? es : en}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#8fa0b3]">
                    {t.prioLabel} <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <select
                    name="priorityArea"
                    required
                    value={form.priorityArea}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>{t.prioPh}</option>
                    {PRIORITY_OPTS.map(([v, en, es]) => (
                      <option key={v} value={v}>{lang === "es" ? es : en}</option>
                    ))}
                  </select>
                  <p className="text-xs text-[#8fa0b3]">
                    {t.prioHint}
                  </p>
                </div>
                </>)}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-phone">
                      {t.phoneLabel}{" "}
                      {mode === "simple" ? (
                        <span className="text-[#8fa0b3]">{t.optional}</span>
                      ) : (
                        <span className="text-[#7fd7e2]">*</span>
                      )}
                    </label>
                    <input
                      id="connect-phone"
                      name="phone"
                      type="tel"
                      required={mode === "full"}
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-email">
                      {t.emailLabel} <span className="text-[#7fd7e2]">*</span>
                    </label>
                    <input
                      id="connect-email"
                      name="email"
                      type="email"
                      required
                      placeholder={t.emailPh}
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-[#7fd7e2] px-6 py-3.5 text-sm font-semibold text-[#0c131e] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t.sending : offer === "hipaa" ? t.hipaaSubmit : offer === "practice" ? t.practiceSubmit : t.submit}
                </button>
                <p className="mt-3 text-center text-xs text-[#8fa0b3]">
                  {t.foot}
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Spanish Section (compact — feeds the single bilingual Connect form) ──────
function SpanishSection() {
  const proofs = [
    "Sistemas que tu equipo puede usar desde el día uno, en español, en inglés, o en los dos.",
    "La consulta, la capacitación y el soporte en tu idioma, si así lo prefieres.",
    "Más de 25 años operando en el sur de Texas. Esa disciplina viaja con nosotros a cualquier mercado.",
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-10">
            <Kicker>Sistemas en Español</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              ¿Tu equipo trabaja en español? Tus sistemas también pueden.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="divide-y rounded-xl border" style={{ borderColor: HAIRLINE }}>
            {proofs.map((p) => (
              <p key={p} className="px-6 py-4 text-sm leading-relaxed text-[#8fa0b3]" style={{ borderColor: HAIRLINE }}>
                {p}
              </p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#book"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("rmops:lang", { detail: "es" }));
                trackEvent("CTA_Click", { location: "spanish_section", cta: "Ops Scan ES" });
              }}
              className="rounded-full bg-[#7fd7e2] px-7 py-3.5 text-sm font-semibold text-[#0c131e] transition-opacity hover:opacity-90"
            >
              Solicita tu Ops Scan gratis
            </a>
            <p className="text-sm text-[#8fa0b3]">
              ¿Primero quieres auditar por tu cuenta?{" "}
              <a
                href="/matrix?lang=es"
                className="border-b border-[#7fd7e2] pb-0.5 font-medium text-[#7fd7e2] transition-colors hover:text-[#e9edf4]"
              >
                Descarga gratis La Matrix de Impacto vs. Riesgo
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Do you only do automation, or do you handle general IT too?", a: "Both. We started in automation and operational systems, but we now offer full IT consulting: workspace setup (Microsoft 365, Google Workspace, Slack), network and WiFi management, cybersecurity, cloud systems, and ongoing IT support. Think of us as your full IT department, without the full-time salary." },
  { q: "Do you work with healthcare businesses?", a: "Yes. Healthcare is one of our primary verticals. We build HIPAA-aware patient intake systems, appointment reminders, review routing, and secure communication workflows. Our founder has a pre-medical sciences background and peer-reviewed research in cognitive psychology, which informs how we design systems for clinical environments." },
  { q: "Do my crews or staff need to install new apps?", a: "Usually no. We design around the tools your team already uses daily: WhatsApp, email, mobile cameras. Zero learning curve. That's how we prevent adoption friction." },
  { q: "How fast can we go live with a new system?", a: "IT services like workspace setup or network fixes can be done in days. Automation modules like expense tracking or patient review systems take 2 to 3 weeks. Complex multi-system architectures take a month or more, broken into launch phases." },
  { q: "Do you offer ongoing support or just setup?", a: "Both. We offer one-time project work (network setup, workspace migration, automation builds) and monthly managed support (IT help desk, system monitoring, automation maintenance). Most clients start with a project and then move to a monthly plan." },
  { q: "What does a system cost?", a: "Every operation is different, so we don't publish one-size prices. The process protects you instead. The free 15-minute Ops Scan is a fit check: we see whether your operation is one we can genuinely improve. If it is, we analyze how you actually work, and within a couple of days you see the proposed system, its cost, and the ROI plan beside it, before you commit to anything. A good portion of our systems in production pay for themselves." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Frequently asked questions
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

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function Home() {
  const businessDescription =
    "AI consulting and human-centered automation systems, built in McAllen, Texas and delivered nationwide. Reduce manual work, improve visibility, and streamline operations with practical systems built for real businesses under real pressure.";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@rebelmindsops.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+19565204123";

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": "https://www.rebelmindsops.com/#organization",
          name: "Rebel Minds Ops",
          url: "https://www.rebelmindsops.com",
          description: businessDescription,
          areaServed: ["McAllen, TX", "Edinburg, TX", "Mission, TX", "Pharr, TX", "Weslaco, TX", "Harlingen, TX", "Brownsville, TX", "Austin, TX", "San Antonio, TX", "Houston, TX", "Dallas, TX", "Arizona", "California", "United States"],
          knowsAbout: ["AI consulting", "AI workflow automation", "AI readiness assessment", "AI adoption training", "HIPAA-compliant automation", "industrial and organizational psychology"],
          sameAs: ["https://rebelminds.ai"],
          founder: { "@id": "https://www.rebelmindsops.com/#founder" },
          contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: contactEmail, telephone: contactPhone, areaServed: "US" }],
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://www.rebelmindsops.com/#service",
          name: "Rebel Minds Ops",
          url: "https://www.rebelmindsops.com",
          description: businessDescription,
          areaServed: ["McAllen, TX", "Edinburg, TX", "Mission, TX", "Pharr, TX", "Weslaco, TX", "Harlingen, TX", "Brownsville, TX", "Austin, TX", "San Antonio, TX", "Houston, TX", "Dallas, TX", "Arizona", "California", "United States"],
          serviceType: ["AI Consulting", "AI Workflow Automation", "AI Readiness Assessment", "AI Adoption Training", "Custom AI Systems (HIPAA-Compliant)"],
          sameAs: ["https://rebelminds.ai"],
          provider: { "@id": "https://www.rebelmindsops.com/#organization" },
          contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: contactEmail, telephone: contactPhone, areaServed: "US" }],
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.rebelmindsops.com/#faq",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        {
          "@type": "Person",
          "@id": "https://www.rebelmindsops.com/#founder",
          name: "Mario L. Arredondo",
          url: "https://rebelminds.ai",
          jobTitle: "AI Adoption Strategist & Systems Builder",
          description:
            "M.A., Industrial & Organizational Psychology. Builds the AI automation systems and researches the human layer of AI adoption.",
          worksFor: { "@id": "https://www.rebelmindsops.com/#organization" },
          sameAs: [
            "https://orcid.org/0000-0002-2340-9250",
            "https://scholar.google.com/citations?user=zgzsfsAAAAAJ",
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
    }),
    [businessDescription, contactEmail, contactPhone]
  );

  useEffect(() => {
    const sectionIds = ["for-who", "what-we-build", "featured-system", "book"];
    const tracked = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionId = entry.target.id;
          if (!sectionId || tracked.has(sectionId)) return;
          tracked.add(sectionId);
          trackEvent("Section_View", { section: sectionId });
        });
      },
      { threshold: 0.45 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <Hero />
      <JPCProof />
      <WhoItsFor />
      <WhatWeBuild />
      <FeaturedSystem />
      <CaseStudies />
      <WhyRebelMindsOps />
      <Connect />
      <SpanishSection />
      <CyberTeaser />
      <FAQ />
      <SiteFooter />
    </div>
  );
}
