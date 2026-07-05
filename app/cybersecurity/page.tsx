"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Eye,
  FileWarning,
  MapPin,
  Wrench,
  KeyRound,
  Brain,
  HardHat,
  Truck,
  Car,
  Stethoscope,
  Scale,
  Briefcase,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

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

// ─── 4.1 Hero ─────────────────────────────────────────────────────────────────

function CyberHero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(127,215,226,0.03)] to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-4 py-2">
            <Shield className="h-4 w-4 text-[#7fd7e2]" />
            <span className="text-xs font-semibold text-[#7fd7e2]">Human Layer Security</span>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-[#e9edf4] sm:text-5xl lg:text-6xl">
            Security Workshops That Train the Human Layer
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[#8fa0b3]">
            Most breaches start with a person, not a firewall. We run security awareness
            workshops built on The Human Layer Framework and behavior science from Industrial
            and Organizational Psychology. Technical security assessments are available on
            request, scoped to your operation.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#cyber-intake"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce]"
              onClick={() => trackEvent("CTA_Click", { location: "cyber_hero_primary", cta: "Human Layer Pre-Assessment" })}
            >
              See where your human layer stands
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#workshops"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-all hover:border-white/40 hover:bg-white/5"
            >
              See the workshops
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="mt-6 text-xs text-[#8fa0b3]">
            Delivered remotely or on-site, anywhere in the US.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4.2 Problem Section ─────────────────────────────────────────────────────

function CyberWhy() {
  const problems = [
    {
      icon: Mail,
      title: "Phishing",
      desc: "Your employees receive an average of 94 phishing emails per month. Most email filters catch 70%. The other 30% land in inboxes — and it only takes one click.",
    },
    {
      icon: Eye,
      title: "Dark Web Exposure",
      desc: "Credential breaches happen constantly. If an employee\u2019s email and password appear in a leaked database, attackers can access your systems before you know anything happened.",
    },
    {
      icon: FileWarning,
      title: "Compliance Risk",
      desc: "If you handle patient data (HIPAA), payment cards (PCI), or client financials, a breach doesn\u2019t just cost money — it costs your license to operate.",
    },
  ];

  return (
    <section id="cyber-why" className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              Why the Human Layer
            </span>
            <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">
              The Person at the Keyboard Is the Entry Point
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
              Year after year, industry breach reports find that the majority of breaches
              involve a human element: a click, a reused password, a rushed reply. Training
              the person is the highest-leverage security move most small businesses never make.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(127,215,226,0.3)] hover:bg-[#141d2c] hover:shadow-[0_8px_32px_rgba(127,215,226,0.07)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(127,215,226,0.9), transparent)" }} />
                <div className="relative mb-4">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.1)]">
                    <p.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{p.title}</h3>
                <p className="text-sm text-[#8fa0b3]">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-[#6f858c]">
          Commonly cited industry estimates (Verizon DBIR, Hiscox Cyber Readiness Report). The free
          assessment shows your numbers, not the internet&apos;s.
        </p>
      </div>
    </section>
  );
}

// ─── 4.3 Human Layer Workshops ───────────────────────────────────────────────

function CyberWorkshops() {
  const covered = [
    "Phishing and social engineering recognition, with scenarios from your industry",
    "Password, MFA, and access habits that hold up under a busy week",
    "What to do in the first hour when something looks wrong",
    "Spaced follow-ups so the training changes behavior, not just awareness",
  ];

  return (
    <section id="workshops" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              The Offer
            </span>
            <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">
              Human Layer Security Workshops
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
              Live security awareness training for your team, built on{" "}
              <a
                href="https://rebelminds.ai/framework"
                target="_blank"
                rel="noopener"
                className="font-medium text-[#7fd7e2] underline-offset-2 transition-colors hover:text-[#e9edf4] hover:underline"
              >
                The Human Layer Framework
              </a>
              , our founder&apos;s framework for the human side of secure, AI-supported operations.
              Designed with behavior change science. Delivered remotely or on-site.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="rounded-2xl border border-white/10 bg-[#141d2c] p-8">
            <h3 className="mb-4 text-lg font-semibold text-[#e9edf4]">What a workshop covers</h3>
            <ul className="space-y-3">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#8fa0b3]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#8fa0b3]">
              Every workshop is scoped to your team size and risk profile. You get an estimate
              before you commit to anything.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#141d2c] p-8">
            <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">
              Technical security assessments, on request
            </h3>
            <p className="text-sm text-[#8fa0b3]">
              Need more than training? We also take on technical security work: email security
              review, exposed credential checks, MFA and access review, and vendor stack review.
              Every engagement is scoped to your operation and quoted as an estimate. We do not
              sell one-size security subscriptions.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10 text-center">
            <a
              href="#cyber-intake"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce]"
            >
              See where your human layer stands <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-[#6f858c]">Free 5-minute pre-assessment. No obligation.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4.3b Industries ─────────────────────────────────────────────────────────

function Industries() {
  const industries = [
    { icon: HardHat, title: "Construction & Trades", desc: "Crew payroll, subcontractor data, project financials" },
    { icon: Truck, title: "Logistics & Fleets", desc: "Driver records, route data, carrier agreements" },
    { icon: Car, title: "Auto Dealerships", desc: "Customer financing data, DMS access, F&I records" },
    { icon: Stethoscope, title: "Medical & Dental", desc: "Patient records, HIPAA-aware workflows, billing systems" },
    { icon: Scale, title: "Legal & Accounting", desc: "Client files, trust accounts, privileged communications" },
    { icon: Briefcase, title: "Professional Services", desc: "Contracts, invoicing, client relationship data" },
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              Who We Protect
            </span>
            <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">
              We Know What a Breach Would Cost You
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
              We build and run operational systems in these industries every day. Your workshop scenarios come from the data your business actually carries, not a generic slide deck.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#141d2c]">
            {industries.map((ind) => (
              <li key={ind.title} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-4">
                <span className="flex items-center gap-3 sm:w-52 sm:flex-shrink-0">
                  <ind.icon className="h-4 w-4 flex-shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-[#e9edf4]">{ind.title}</span>
                </span>
                <span className="pl-7 text-sm text-[#8fa0b3] sm:pl-0">{ind.desc}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4.4 How It Works ────────────────────────────────────────────────────────

function CyberHow() {
  const steps = [
    { num: "01", title: "Take the 5-minute pre-assessment below", desc: "Five questions on training, MFA, and incident readiness. No scanning, no software, no obligation." },
    { num: "02", title: "You get your human layer snapshot", desc: "A plain-English risk summary showing where your team stands today and what to fix first." },
    { num: "03", title: "We scope your workshop", desc: "Sized to your team, built around scenarios from your industry. You get an estimate before committing." },
    { num: "04", title: "We deliver the training", desc: "Live sessions, remote or at your location, designed with behavior change science so it sticks past the session." },
    { num: "05", title: "You keep the playbook", desc: "Workshop materials, follow-up guidance, and a clear picture of what to reinforce. No subscriptions required." },
  ];

  return (
    <section id="cyber-how" className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              How It Works
            </span>
            <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">
              From Pre-Assessment to Workshop
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 80}>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:border-[rgba(127,215,226,0.3)] hover:bg-[#141d2c]">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.1)] text-sm font-bold text-[#7fd7e2]">
                  {s.num}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[#e9edf4]">{s.title}</h3>
                  <p className="text-sm text-[#8fa0b3]">{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4.5 Trust Section ───────────────────────────────────────────────────────

function CyberTrust() {
  const points = [
    {
      icon: MapPin,
      title: "Forged in a Hard Market",
      desc: "Rebel Minds OPS was built in South Texas, where trust has to be earned operation by operation. That discipline travels. We bring the same standard to clients in any US market, delivered remotely or on-site.",
    },
    {
      icon: Wrench,
      title: "Systems First",
      desc: "We already build the operational infrastructure that runs your business. Protecting it is the natural next step. Our security work uses the same API-first, automation-heavy approach as everything else we build.",
    },
    {
      icon: Brain,
      title: "Behavior Science Behind the Training",
      desc: "Our founder holds an M.A. in Industrial and Organizational Psychology and designs every workshop with The Human Layer Framework and real behavior change science: spaced repetition, threat appraisal theory, psychological safety. Not compliance checkbox slides.",
      link: { label: "Learn about our science \u2192", href: "/our-science" },
    },
    {
      icon: KeyRound,
      title: "You Own It",
      desc: "No vendor lock-in and no subscriptions required. Workshop materials are yours to keep. If we do technical work for you, we hand you full documentation of every protection we put in place.",
    },
  ];

  return (
    <section id="cyber-trust" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              Why Trust Us
            </span>
            <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">
              The Same Team That Automates Your Operations Trains Your People
            </h2>
          </div>
        </FadeIn>

        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2">
          {points.map((pt, i) => (
            <FadeIn key={pt.title} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(127,215,226,0.3)] hover:bg-[#141d2c] hover:shadow-[0_8px_32px_rgba(127,215,226,0.07)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(127,215,226,0.9), transparent)" }} />
                <div className="relative mb-4">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.1)]">
                    <pt.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{pt.title}</h3>
                <p className="text-sm text-[#8fa0b3]">{pt.desc}</p>
                {pt.link && (
                  <a href={pt.link.href} className="mt-3 inline-block text-sm font-medium text-[#7fd7e2] transition-colors hover:text-[#e9edf4]">
                    {pt.link.label}
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4.6 Intake Form ─────────────────────────────────────────────────────────

type FormData = {
  companySize: string;
  industry: string;
  training: string;
  mfa: string;
  incident: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  newsletter: boolean;
};

function CardSelect({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
            value === opt.value
              ? "border-[#7fd7e2] bg-[rgba(127,215,226,0.1)] text-[#7fd7e2]"
              : "border-white/10 bg-[#141d2c] text-[#8fa0b3] hover:border-white/20 hover:bg-white/[0.06]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CyberIntake() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ riskScore: number; riskLevel: string } | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    companySize: "",
    industry: "",
    training: "",
    mfa: "",
    incident: "",
    name: "",
    businessName: "",
    email: "",
    phone: "",
    newsletter: true,
  });

  function updateField<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
    setError("");
  }

  function canAdvance1() { return form.companySize && form.industry; }
  function canAdvance2() { return form.training && form.mfa && form.incident; }

  async function handleSubmit() {
    if (!form.name || !form.businessName || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/cyber-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Submission failed");
      setResult({ riskScore: data.riskScore, riskLevel: data.riskLevel });
      trackEvent("CyberIntake_Submit", { riskLevel: data.riskLevel, riskScore: data.riskScore });
    } catch (err) {
      console.error("Submission failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <section id="cyber-intake" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <div className="rounded-2xl border border-white/10 bg-[#141d2c] p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(127,215,226,0.3)] bg-[rgba(127,215,226,0.1)]">
                <ShieldCheck className="h-8 w-8 text-[#7fd7e2]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-[#e9edf4]">Your security score is on its way.</h2>
              <p className="mb-6 text-[#8fa0b3]">
                We&apos;ll send your personalized risk summary to{" "}
                <span className="font-medium text-[#e9edf4]">{form.email}</span> within 24 business hours.
              </p>
              <div className={`mx-auto mb-6 max-w-lg rounded-xl border p-4 text-left text-sm ${
                result.riskLevel === "High" ? "border-red-500/30 bg-red-500/10 text-red-300"
                : result.riskLevel === "Medium" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                : "border-green-500/30 bg-green-500/10 text-green-300"
              }`}>
                <div className="mb-2 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  <span className="font-semibold">Risk Level: {result.riskLevel} ({result.riskScore}/10)</span>
                </div>
                {result.riskLevel === "High" && (
                  <p>Based on your answers, your business has significant exposure. We recommend a same-day conversation — reply to your email or reach out directly.</p>
                )}
                {result.riskLevel === "Medium" && (
                  <p>You have some protections in place, but meaningful gaps remain. Your report will show exactly where to focus first.</p>
                )}
                {result.riskLevel === "Low" && (
                  <p>You&apos;re ahead of most small businesses. Your report will confirm your current protections and flag any remaining gaps.</p>
                )}
              </div>
              <p className="mb-6 text-xs text-[#6f858c]">
                You&apos;re also subscribed to SMB Cyber Shield Weekly — free threat briefings every Tuesday. No spam, ever.
              </p>
              <a href="#workshops" className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce]">
                See the workshops <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="cyber-intake" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              Workshop Pre-Assessment
            </span>
            <h2 className="mb-2 text-3xl font-bold text-[#e9edf4] sm:text-4xl">
              {step === 3 ? "Where should we send your results?" : "See where your human layer stands"}
            </h2>
            {step !== 3 && (
              <p className="text-[#8fa0b3]">5 quick questions on training, MFA, and incident readiness. You get a real snapshot of where your team stands today.</p>
            )}
          </div>
        </FadeIn>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                s === step ? "bg-[#7fd7e2] text-[#0c131e]" : s < step ? "bg-[rgba(127,215,226,0.2)] text-[#7fd7e2]" : "bg-white/10 text-[#6f858c]"
              }`}>{s}</div>
              {s < 3 && <div className={`h-0.5 w-8 rounded-full transition-colors ${s < step ? "bg-[rgba(127,215,226,0.4)]" : "bg-white/10"}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-[#6f858c]">Step {step} of 3</span>
        </div>

        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-[#141d2c] p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#e9edf4]">How many people work at your company?</label>
                  <CardSelect
                    options={[{ value: "1-5", label: "1\u20135" }, { value: "6-20", label: "6\u201320" }, { value: "21-50", label: "21\u201350" }, { value: "50+", label: "50+" }]}
                    value={form.companySize}
                    onChange={(val) => updateField("companySize", val)}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#e9edf4]">What industry are you in?</label>
                  <CardSelect
                    options={[
                      { value: "Medical/Dental", label: "Medical / Dental" },
                      { value: "Legal/Accounting", label: "Legal / Accounting" },
                      { value: "Construction/Trades", label: "Construction / Trades" },
                      { value: "Retail/Restaurant", label: "Retail / Restaurant" },
                      { value: "Other", label: "Other" },
                    ]}
                    value={form.industry}
                    onChange={(val) => updateField("industry", val)}
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" disabled={!canAdvance1()} onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce] disabled:cursor-not-allowed disabled:opacity-40">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#e9edf4]">Do your employees receive cybersecurity training?</label>
                  <CardSelect
                    options={[
                      { value: "YesRegularly", label: "Yes, regularly" },
                      { value: "Occasionally", label: "Occasionally" },
                      { value: "No", label: "No" },
                      { value: "NeverThoughtAboutIt", label: "Never thought about it" },
                    ]}
                    value={form.training}
                    onChange={(val) => updateField("training", val)}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#e9edf4]">Do you have multi-factor authentication (MFA) enabled?</label>
                  <p className="mb-3 text-xs text-[#8fa0b3]">A second verification step when logging in — like a code texted to your phone.</p>
                  <CardSelect
                    options={[
                      { value: "YesEverywhere", label: "Yes, everywhere" },
                      { value: "OnSomeAccounts", label: "On some accounts" },
                      { value: "No", label: "No" },
                      { value: "NotSure", label: "Not sure" },
                    ]}
                    value={form.mfa}
                    onChange={(val) => updateField("mfa", val)}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#e9edf4]">Has your business ever had a security incident?</label>
                  <CardSelect
                    options={[
                      { value: "NoNever", label: "No, never" },
                      { value: "NotSurePossibly", label: "Not sure / possibly" },
                      { value: "MinorIssue", label: "Minor issue" },
                      { value: "YesARealBreach", label: "Yes, a real breach" },
                    ]}
                    value={form.incident}
                    onChange={(val) => updateField("incident", val)}
                  />
                </div>
                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-all hover:border-white/40 hover:bg-white/5">&larr; Back</button>
                  <button type="button" disabled={!canAdvance2()} onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce] disabled:cursor-not-allowed disabled:opacity-40">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="cyber-name" className="mb-1.5 block text-sm font-medium text-[#e9edf4]">Your name <span className="text-red-400">*</span></label>
                  <input id="cyber-name" type="text" required value={form.name} onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141d2c] px-4 py-3 text-sm text-[#e9edf4] placeholder-slate-500 outline-none transition-colors focus:border-[rgba(127,215,226,0.5)]" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="cyber-biz" className="mb-1.5 block text-sm font-medium text-[#e9edf4]">Business name <span className="text-red-400">*</span></label>
                  <input id="cyber-biz" type="text" required value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141d2c] px-4 py-3 text-sm text-[#e9edf4] placeholder-slate-500 outline-none transition-colors focus:border-[rgba(127,215,226,0.5)]" placeholder="Business name" />
                </div>
                <div>
                  <label htmlFor="cyber-email" className="mb-1.5 block text-sm font-medium text-[#e9edf4]">Email address <span className="text-red-400">*</span></label>
                  <input id="cyber-email" type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141d2c] px-4 py-3 text-sm text-[#e9edf4] placeholder-slate-500 outline-none transition-colors focus:border-[rgba(127,215,226,0.5)]" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="cyber-phone" className="mb-1.5 block text-sm font-medium text-[#e9edf4]">Phone <span className="text-xs text-[#6f858c]">(optional — only if you&apos;d like a follow-up call)</span></label>
                  <input id="cyber-phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141d2c] px-4 py-3 text-sm text-[#e9edf4] placeholder-slate-500 outline-none transition-colors focus:border-[rgba(127,215,226,0.5)]" placeholder="Phone number (optional)" />
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={form.newsletter} onChange={(e) => updateField("newsletter", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#141d2c] accent-[#7fd7e2]" />
                  <div>
                    <span className="text-sm text-[#8fa0b3]">Subscribe me to SMB Cyber Shield Weekly — free security briefings for small businesses, every Tuesday.</span>
                    <p className="mt-0.5 text-xs text-[#6f858c]">No spam. Unsubscribe anytime.</p>
                  </div>
                </label>

                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
                )}

                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-all hover:border-white/40 hover:bg-white/5">&larr; Back</button>
                  <button type="button" disabled={submitting} onClick={handleSubmit}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce] disabled:cursor-not-allowed disabled:opacity-60">
                    {submitting ? (
                      <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Calculating...</>
                    ) : (
                      <>Get my free security score <ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4.7 FAQ ─────────────────────────────────────────────────────────────────

const CYBER_FAQS = [
  { q: "Do I need to install anything on my computers?", a: "Nothing. Workshops run live over video or in person, with no software required. If you request a technical assessment, we scope any tooling with you case by case before anything touches your machines." },
  { q: "What if I already have antivirus?", a: "Keep it. Antivirus watches software, not people. Phishing, credential theft, and social engineering go through the person at the keyboard, and that is exactly what the workshops train." },
  { q: "Is this a long-term contract?", a: "No. Workshops are one-time engagements, scoped and quoted up front. If you want recurring refreshers or technical work afterward, we scope that the same way: an estimate first, no subscriptions required." },
  { q: "What industries do you focus on?", a: "Medical and dental offices (HIPAA), law firms and accounting practices, construction companies, logistics operations, and professional services firms. Workshops are delivered remotely or on-site, anywhere in the United States." },
  { q: "How are workshops delivered?", a: "Live, over video or at your location, in English, Spanish, or both. Sessions are scoped to your team size and industry, and you keep all materials afterward." },
  { q: "What is the free security assessment?", a: "You answer five quick questions about training, MFA, and incident history. We review your answers and send a plain-English risk summary showing where your human layer stands. No obligation to buy anything." },
  { q: "How is your training different from what other MSPs offer?", a: "Most security training is compliance-driven \u2014 click through slides, check the box. Our founder holds a graduate degree in Industrial-Organizational Psychology and designs training programs using The Human Layer Framework and actual behavior change science: spaced repetition, psychological safety, threat appraisal theory, and industry-specific scenarios. The goal isn\u2019t passing a quiz. It\u2019s changing what your employees do when a real phishing email lands in their inbox." },
];

function CyberFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="cyber-faq" className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">Common Questions</h2>
          </div>
        </FadeIn>
        <div className="space-y-2.5">
          {CYBER_FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141d2c] transition-all hover:border-white/20">
                <button className="flex w-full items-center justify-between px-6 py-5 text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i} aria-controls={`cyber-faq-panel-${i}`}>
                  <span className="pr-4 text-sm font-medium text-[#e9edf4] sm:text-base">{faq.q}</span>
                  <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#7fd7e2] transition-transform duration-200 ${openIdx === i ? "rotate-45" : ""}`}>
                    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                  </span>
                </button>
                {openIdx === i && (
                  <div id={`cyber-faq-panel-${i}`} className="px-6 pb-5">
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

// ─── 4.8 Footer CTA ─────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0b151a" }}>
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-bold text-[#e9edf4] sm:text-4xl">Ready to Know Where You Stand?</h2>
          <p className="mb-8 text-[#8fa0b3]">The free pre-assessment takes 5 minutes. The report tells you exactly where your human layer stands. No obligation.</p>
          <a href="#cyber-intake" className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce]">
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────

const CYBER_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CYBER_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CybersecurityPage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CYBER_FAQ_JSONLD) }}
      />
      <SiteNav />
      <CyberHero />
      <SectionDivider />
      <CyberWhy />
      <SectionDivider />
      <Industries />
      <SectionDivider />
      <CyberWorkshops />
      <SectionDivider />
      <CyberHow />
      <SectionDivider />
      <CyberTrust />
      <SectionDivider />
      <CyberIntake />
      <SectionDivider />
      <CyberFAQ />
      <SectionDivider />
      <FooterCTA />
      <SiteFooter />
    </div>
  );
}
