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
          <Kicker>Operations &amp; IT systems, built by operators</Kicker>
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
                Forged in Texas&rsquo;s hardest market, delivered remotely to any U.S.
                market.
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
                A 15-minute workflow review. No contracts. No jargon.
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
            <p className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
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
            <p className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
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
          className="flex flex-wrap items-baseline justify-between gap-3.5 border-t px-4 py-6 sm:px-8"
          style={{ borderColor: HAIRLINE }}
        >
          <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
            Named case studies are published with the owner&rsquo;s permission · most
            clients stay unnamed
          </span>
          <span className="text-[0.85rem] text-[#8fa0b3]">
            Also on the bench right now:{" "}
            <span className="text-[#e9edf4]">
              patient intake for a clinical practice · dispatch boards for a service fleet
              · books cleanup for a professional firm
            </span>
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
              <div className="h-full bg-[#141d2c] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border" style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}>
                  <ind.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-semibold leading-tight text-[#e9edf4]">{ind.title}</h3>
                <p className="text-sm leading-relaxed text-[#8fa0b3]">{ind.desc}</p>
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

        <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
          {systems.map((sys, i) => (
            <FadeIn key={sys.title} delay={i * 50}>
              <div className="h-full bg-[#141d2c] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border" style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}>
                  <sys.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-[1.05rem] font-semibold leading-tight text-[#e9edf4]">{sys.title}</h3>
                <p className="text-sm leading-relaxed text-[#8fa0b3]">{sys.desc}</p>
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
              <span className="mono mb-2 inline-block text-[0.62rem] uppercase tracking-[0.16em] text-[#7fd7e2]">
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
          <p className="mono mb-4 text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa0b3]">
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
            <p className="mono mb-4 text-[0.66rem] uppercase tracking-[0.16em] text-[#7fd7e2]">
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
              <span className="mono mt-4 inline-block rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-[#7fd7e2]" style={{ borderColor: "rgba(127,215,226,0.3)" }}>
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
          header="What happens when a growing business finally stops chasing its own paperwork."
          intro="J. Peña Construction runs 5 to 15 active jobs at a time. Like any serious operation at that scale, every hour of focused time is a business asset. We helped them get more of it back."
          pains={[
            "With up to 15 active jobs running simultaneously, job cost documentation was coming in constantly, from crews, suppliers, and sites. Keeping up manually meant Sandra was spending 8 to 10 hours every week on back-office work that should have been running itself.",
            "Every gap in the documentation trail was a potential deduction lost at tax time. With multiple jobs running at once, even small inconsistencies added up to real money left on the table, year after year.",
            "Tax season meant handing their accountant months of unstructured records to organize manually. It worked, but it cost time, created stress, and left the back office carrying a burden that belonged in a system.",
          ]}
          outcomes={[
            "Sandra recovered 8 to 10 hours every week, time previously absorbed by manual back-office work across active jobs.",
            "Financial records arrive organized and accounting-ready, automatically. Their accountant receives clean data. Tax season is no longer a project.",
            "Pepe focuses on running jobs. Sandra focuses on running the business. The system handles the rest, exactly the way it should work.",
          ]}
          quote="&ldquo;I can finally focus on my jobs.&rdquo;"
          logo="/JPC_logo.png"
          logoAlt="J. Peña Construction"
          who="Jose Peña"
          role="Owner, J. Peña Construction"
        />

        <FadeIn delay={250}>
          <div className="my-16 flex items-center gap-4">
            <div className="h-px flex-1" style={{ backgroundColor: HAIRLINE }} />
            <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#6f858c]">Next client</span>
            <div className="h-px flex-1" style={{ backgroundColor: HAIRLINE }} />
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
          who="Leslie De León"
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
                See if your business qualifies
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
          <p className="mt-4 max-w-2xl text-sm text-[#6f858c]">
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

// ─── Connect (EN form — /api/connect contract FROZEN) ─────────────────────────
function Connect() {
  const emptyForm = {
    business: "",
    type: "",
    phone: "",
    email: "",
    priorityArea: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.business ||
      !form.type ||
      !form.priorityArea ||
      !form.phone ||
      !form.email
    ) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.details || data?.error || "Request failed");
      }

      setSuccess(true);
      setForm({ ...emptyForm });
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="book" className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <Kicker>Start here</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Get your Free Ops Scan
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#8fa0b3]">
              Tell us about your business and we&rsquo;ll reach out to map your operational
              workflow and show you what can be systemized today.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="rounded-xl border bg-[#141d2c] p-8" style={{ borderColor: HAIRLINE }}>
            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: "rgba(127,215,226,0.3)", backgroundColor: "rgba(127,215,226,0.1)" }}>
                  <CheckCircle className="h-7 w-7 text-[#7fd7e2]" />
                </div>
                <p className="text-lg font-semibold text-[#e9edf4]">Request received.</p>
                <p className="text-[#8fa0b3]">We&rsquo;ll call you shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs text-[#6f858c] underline hover:text-[#8fa0b3]"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-business">
                    Business Name <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <input
                    id="connect-business"
                    name="business"
                    type="text"
                    required
                    placeholder="e.g. Acme Construction LLC"
                    value={form.business}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-type">
                    Type of Business <span className="text-[#7fd7e2]">*</span>
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
                    <option value="" disabled>Select your industry&hellip;</option>
                    <option value="construction">Construction / Trades</option>
                    <option value="logistics">Logistics / Transport</option>
                    <option value="home-services">Home Services</option>
                    <option value="professional-services">Professional Services</option>
                    <option value="healthcare">Healthcare / Medical</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#8fa0b3]">
                    What would you most like to improve right now? <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <select
                    name="priorityArea"
                    required
                    value={form.priorityArea}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select the area causing the most friction...</option>
                    <option value="Organize receipts and expenses for better accounting">Organize receipts and expenses for better accounting</option>
                    <option value="Improve project visibility and tracking">Improve project visibility and tracking</option>
                    <option value="Reduce manual data entry and paperwork">Reduce manual data entry and paperwork</option>
                    <option value="Respond to leads faster and track inquiries">Respond to leads faster and track inquiries</option>
                    <option value="Simplify scheduling and team coordination">Simplify scheduling and team coordination</option>
                    <option value="Set up or improve IT infrastructure (WiFi, email, workspace tools)">Set up or improve IT infrastructure</option>
                    <option value="Healthcare patient systems (intake, reviews, HIPAA messaging)">Healthcare patient systems</option>
                    <option value="Not sure yet — show me what’s possible">Not sure yet, show me what&rsquo;s possible</option>
                  </select>
                  <p className="text-xs text-[#6f858c]">
                    Not sure where to start? That&rsquo;s exactly what the call is for.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-phone">
                      Phone Number <span className="text-[#7fd7e2]">*</span>
                    </label>
                    <input
                      id="connect-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="connect-email">
                      Email Address <span className="text-[#7fd7e2]">*</span>
                    </label>
                    <input
                      id="connect-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
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
                  {submitting ? "Sending…" : "Get My Free Ops Scan"}
                </button>
                <p className="mt-3 text-center text-xs text-[#8fa0b3]">
                  The Ops Scan is a free 15-minute workflow review. No obligation.
                </p>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Spanish Section (ES form — /api/connect contract FROZEN) ─────────────────
function SpanishSection() {
  const cards = [
    { icon: Users, title: "Diseñado para tu equipo, no para Silicon Valley", desc: "Sabemos que tus crews hablan español. Construimos sistemas que pueden usar desde el primer día, sin capacitación complicada." },
    { icon: MessageCircle, title: "La consulta es en español", desc: "Explicamos cada sistema en tu idioma. Sin tecnicismos, sin malentendidos, sin necesidad de traductores." },
    { icon: Globe, title: "Forjado en un mercado exigente", desc: "Más de 25 años operando en el sur de Texas, donde las relaciones, el idioma y la confianza se ganan a pulso. Esa disciplina viaja con nosotros a cada cliente, en cualquier mercado." },
  ];

  const emptyForm = {
    business: "",
    type: "",
    phone: "",
    email: "",
    priorityArea: "",
    source: "Spanish Form",
  };

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.business ||
      !form.type ||
      !form.priorityArea ||
      !form.phone ||
      !form.email
    ) {
      setError("Por favor completa todos los campos antes de enviar.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.details || data?.error || "Request failed");
      }

      setSuccess(true);
      setForm({ ...emptyForm });
    } catch {
      setError("Algo salió mal. Por favor intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12">
            <Kicker>Sistemas en Español</Kicker>
            <h2 className="serif mt-3 text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              ¿Tu equipo trabaja en español? Tus sistemas también pueden.
            </h2>
            <p className="mt-4 max-w-2xl text-[#8fa0b3]">
              Los sistemas que construimos funcionan en español y en inglés desde el primer
              día. La consulta, la capacitación y el soporte también, si así lo prefieres. No
              necesitas un intérprete para modernizar tu negocio.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3" style={{ borderColor: HAIRLINE, backgroundColor: HAIRLINE }}>
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 60}>
              <div className="h-full bg-[#141d2c] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border" style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}>
                  <card.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-semibold leading-tight text-[#e9edf4]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#8fa0b3]">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="mx-auto mt-10 max-w-2xl rounded-xl border bg-[#141d2c] p-8" style={{ borderColor: HAIRLINE }}>
            <p className="mono mb-6 text-center text-[0.66rem] uppercase tracking-[0.16em] text-[#7fd7e2]">
              Solicita tu Ops Scan gratis. Cuéntanos de tu negocio.
            </p>
            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border" style={{ borderColor: "rgba(127,215,226,0.3)", backgroundColor: "rgba(127,215,226,0.1)" }}>
                  <CheckCircle className="h-7 w-7 text-[#7fd7e2]" />
                </div>
                <p className="text-lg font-semibold text-[#e9edf4]">Solicitud recibida.</p>
                <p className="text-[#8fa0b3]">Te llamamos pronto.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs text-[#6f858c] underline hover:text-[#8fa0b3]"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="es-business">
                    Nombre del negocio <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <input
                    id="es-business"
                    name="business"
                    type="text"
                    required
                    placeholder="Ej. Construcciones Peña LLC"
                    value={form.business}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="es-type">
                    Tipo de negocio <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <select
                    id="es-type"
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Selecciona tu industria&hellip;</option>
                    <option value="construction">Construcción / Oficios</option>
                    <option value="logistics">Logística / Transporte</option>
                    <option value="home-services">Servicios del Hogar</option>
                    <option value="professional-services">Servicios Profesionales</option>
                    <option value="healthcare">Salud / Médico</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#8fa0b3]">
                    ¿Qué te gustaría mejorar? <span className="text-[#7fd7e2]">*</span>
                  </label>
                  <select
                    name="priorityArea"
                    required
                    value={form.priorityArea}
                    onChange={handleChange}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="" disabled>Selecciona el área con más fricción...</option>
                    <option value="Organize receipts and expenses for better accounting">Organizar recibos y gastos para contabilidad</option>
                    <option value="Improve project visibility and tracking">Mejorar la visibilidad y seguimiento de proyectos</option>
                    <option value="Reduce manual data entry and paperwork">Reducir captura manual de datos y papeleo</option>
                    <option value="Respond to leads faster and track inquiries">Responder a prospectos más rápido</option>
                    <option value="Simplify scheduling and team coordination">Simplificar horarios y coordinación del equipo</option>
                    <option value="Set up or improve IT infrastructure (WiFi, email, workspace tools)">Configurar o mejorar infraestructura de TI</option>
                    <option value="Healthcare patient systems (intake, reviews, HIPAA messaging)">Sistemas para pacientes (formularios, reseñas, mensajería HIPAA)</option>
                    <option value="Not sure yet — show me what's possible">No estoy seguro, muéstrame qué es posible</option>
                  </select>
                  <p className="text-xs text-[#6f858c]">
                    ¿No sabes por dónde empezar? Para eso es exactamente la llamada.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="es-phone">
                      Teléfono <span className="text-[#7fd7e2]">*</span>
                    </label>
                    <input
                      id="es-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#8fa0b3]" htmlFor="es-email">
                      Correo electrónico <span className="text-[#7fd7e2]">*</span>
                    </label>
                    <input
                      id="es-email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@negocio.com"
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
                  {submitting ? "Enviando…" : "Solicitar mi Ops Scan gratis"}
                </button>
                <p className="mt-3 text-center text-xs text-[#8fa0b3]">
                  El Ops Scan es una revisión gratuita de 15 minutos de tu flujo de trabajo.
                  Sin compromiso.
                </p>
              </form>
            )}
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
  { q: "What does pricing depend on?", a: "For one-time projects: scope and complexity. For monthly support: number of users and services included. We estimate everything during a free 15-minute Ops Scan. No surprises." },
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
                {openIdx === i && (
                  <div id={`faq-panel-${i}`} className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-[#8fa0b3]">{faq.a}</p>
                  </div>
                )}
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
    "Reduce manual work, improve visibility, and streamline operations with practical automation systems built for real businesses under real pressure.";
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
          areaServed: ["United States", "Austin, TX", "San Antonio, TX", "Houston, TX", "Dallas, TX", "Arizona", "California"],
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
          areaServed: ["United States", "Austin, TX", "San Antonio, TX", "Houston, TX", "Dallas, TX", "Arizona", "California"],
          sameAs: ["https://rebelminds.ai"],
          provider: { "@id": "https://www.rebelmindsops.com/#organization" },
          contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: contactEmail, telephone: contactPhone, areaServed: "US" }],
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
