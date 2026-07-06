"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Inbox,
  MessagesSquare,
  PhoneCall,
  PhoneMissed,
  Star,
  X,
} from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import ComplianceDiagram from "@/app/components/ComplianceDiagram";

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

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6"
      style={{ backgroundColor: "#0a101a" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(127,215,226,0.03)] to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <span className="mb-6 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
            Healthcare &middot; HIPAA-Aware
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 serif text-4xl font-medium leading-[1.05] text-[#e9edf4] sm:text-5xl lg:text-6xl">
            HIPAA-compliant automation for medical, dental, and behavioral-health practices.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#8fa0b3]">
            Patient intake, reminders, reviews, and secure messaging, built on
            infrastructure where every vendor that touches PHI signs a Business
            Associate Agreement. Designed by a founder trained in clinical sciences
            and I-O Psychology, with peer-reviewed research behind the methods.
            Delivered remotely, nationwide.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/?offer=hipaa#book"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
            >
              Start with a free fit check
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#hipaa-audit"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-colors hover:border-white/40 hover:bg-white/5"
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
      icon: Inbox,
      title: "Your front desk is drowning in paperwork.",
      body: "Manual intake forms. Insurance verification on hold. Treatment plans that get presented and never followed up. The math: every untracked treatment plan that walks out the door is revenue you'll never see.",
    },
    {
      icon: PhoneMissed,
      title: "After-hours emergencies are walking to competitors.",
      body: "A patient calls at 8pm with a cracked tooth. Voicemail. Three minutes later they're Googling the next office. By 9pm they're someone else's patient. Every emergency you miss is $300–$2,000+ of revenue lost, and a referral relationship that didn't form.",
    },
    {
      icon: Star,
      title: "Your reputation is left to chance.",
      body: "Happy patients quietly leave. Frustrated patients post publicly. No system catches the difference. Practices with structured review systems consistently outpace competitors with similar care quality, because online perception drives new patient choice.",
    },
  ];

  return (
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              The Reality
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              The reality at most growing practices.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:border-white/20">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}
                >
                  <c.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{c.title}</h3>
                <p className="text-sm text-[#8fa0b3]">{c.body}</p>
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
      desc: "Meta won't sign a BAA. Period. It's why our field-ops systems for contractors and our healthcare systems are deliberately different builds.",
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
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              The Trust Gate
            </span>
            <h2 className="mb-6 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              HIPAA isn&apos;t a checkbox. It&apos;s how we architect.
            </h2>
            <div className="mx-auto max-w-3xl space-y-4 text-left text-[#8fa0b3] sm:text-center">
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
          <p className="mt-8 text-center text-sm italic text-[#7d90a1]">
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
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
            Operational Reality
          </span>
          <h2 className="mb-6 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            We didn&apos;t add HIPAA to our pitch deck. It&apos;s been our operational reality for years.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="space-y-4 text-left text-lg leading-relaxed text-[#8fa0b3]">
            <p>
              Most &ldquo;HIPAA-aware&rdquo; AI consultants learned compliance from a
              vendor&apos;s marketing page. We learned it three ways.
            </p>
            <p>
              As an academic discipline: pre-medical biology coursework and Addiction
              &amp; Rehabilitation Studies, a field operating under federal protections
              stricter than HIPAA itself. As an operational responsibility: publishing
              population health data under direct Texas HHSC oversight. And as
              architectural design: every system we build today, with BAA-signed
              infrastructure as the only option.
            </p>
            <p>Three layers, one standard.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 5. Services ─────────────────────────────────────────────────────────────

function Services() {
  const featured = [
    {
      accent: "#7fd7e2",
      icon: MessagesSquare,
      title: "Reputation routing & review acquisition",
      body: "Post-visit messaging that detects sentiment automatically. Happy patients get routed to your Google Business Profile. Frustrated patients get routed to private feedback, so they vent to you, not online.",
      roi: "Protects existing rating. Compounds over time. Already running for our first dental client.",
    },
    {
      accent: "#7fd7e2",
      icon: PhoneCall,
      title: "After-hours AI receptionist & voicemail triage",
      body: "Patient calls at 8pm with a cracked tooth. AI triages urgency, sends emergency alert to the on-call clinician's phone, books non-urgent for next morning. HIPAA-aware end to end.",
      roi: "Captures an estimated $300–$2,000+ per emergency case currently going to competitors.",
    },
    {
      accent: "#7fd7e2",
      icon: CalendarClock,
      title: "Treatment plan follow-up & patient reactivation",
      body: "30–50% of presented treatment plans never get scheduled. We systematically follow up with calibrated, sentiment-aware outreach, so revenue doesn't walk out the door.",
      roi: "Even a 5 to 10% lift in case acceptance is $20 to 50K a year for a typical practice.",
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
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              Healthcare Services
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              What we build for growing practices.
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
              Three featured services. More available — every system designed for the
              way your front desk actually works.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:border-white/20">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}
                >
                  <card.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#e9edf4]">{card.title}</h3>
                <p className="mb-4 text-sm text-[#8fa0b3]">{card.body}</p>
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

        <FadeIn delay={160}>
          <p className="mt-6 text-center text-xs text-[#8fa0b3]">
            Revenue figures are illustrative ranges drawn from practice work and
            published dental industry benchmarks. Your numbers depend on volume and
            case mix.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#141d2c] p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#7d90a1]">
              Also available
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {additional.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#8fa0b3]">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7fd7e2]" />
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
      color: "#7fd7e2",
      label: "Undergraduate — In Progress",
      title: "B.S. Biology, Biological Sciences Concentration — UTRGV",
      desc: "Pre-medical-track curriculum spanning anatomy, physiology, biochemistry, microbiology, and human systems, in progress in the top GPA tier. The clinical workflows we automate are workflows we studied the science behind.",
    },
    {
      color: "#8fa0b3",
      label: "Graduate — Full Scholarship",
      title: "Industrial-Organizational Psychology — SUNY Albany",
      desc: "Doctoral-level training in organizational behavior, change adoption, training transfer, and human factors. Most healthcare automation fails because staff doesn't adopt it — not because the tech is broken. We design for how your team actually works, not how a software vendor imagines they do.",
    },
    {
      color: "#7fd7e2",
      label: "Published Work — Regulated Health Data",
      title: "Healthcare data under Texas HHSC oversight",
      desc:
        "Published a 219-page population health assessment for Texas HHSC's Prevention Resource Center 11, covering substance use, mental health, and demographic data across 19 South Texas counties.\n\nCompliance with the strictest tier of US health data wasn't theoretical. It was the job.",
      citation: {
        text: "2023 Regional Needs Assessment:",
        link: "https://prc11.org/wp-content/uploads/2024/02/BHSST_RNA-2023.pdf",
        linkText: "read the full 219-page report (PDF)",
      },
    },
    {
      color: "#7fd7e2",
      label: "Peer-Reviewed Publications",
      title: "Cognitive Psychology & I-O Psychology research",
      desc: "Published research in cognitive psychology and Industrial-Organizational Psychology. Peer review is a discipline: hypothesis-driven design, evidence-based methods, measurable outcomes. We hold our healthcare automation to the same standard.",
    },
  ];

  return (
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              The Background
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
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
                  <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{item.title}</h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-[#8fa0b3]">
                    {item.desc}
                  </p>
                  {item.citation && (
                    <p className="mt-2 text-xs italic text-[#7d90a1]">
                      {item.citation.text}{" "}
                      <a
                        href={item.citation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#7fd7e2] underline-offset-2 hover:underline"
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
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-[#7d90a1]">
            Most AI consultants pitching healthcare have none of this. They learn
            HIPAA from blog posts. We learned the underlying science (clinical,
            behavioral, regulatory) over a decade.
          </p>
        </FadeIn>

        <FadeIn delay={440}>
          <p className="mt-4 text-center text-sm text-[#8fa0b3]">
            The full research background, including the New York State
            clinical-skills engagement across 1,000+ providers, lives on{" "}
            <a
              href="/our-science"
              className="text-[#7fd7e2] underline-offset-2 hover:underline"
            >
              our science page
            </a>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 7. Remote delivery + bilingual capability ───────────────────────────────

function RemoteDelivery() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="mono mb-4 inline-block text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              Delivered remotely, built bilingual
            </span>
            <h2 className="serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Built remotely, delivered to practices anywhere in the U.S. Bilingual by default.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-6 text-base leading-relaxed text-[#8fa0b3]">
            <p>
              Bilingual isn&apos;t an upgrade, it&apos;s the default. Your
              Spanish-speaking patients deserve the same patient experience as your
              English-speaking ones. We design every patient-facing system bilingual
              from day one: language detection automatic, cultural calibration native,
              no extra cost, no afterthought translation. That is a workforce
              capability we bring to every practice, not a filter on who we serve.
            </p>
            <p>
              Discovery and rollout run over video, so your team never waits on a site
              visit. Whether you are down the street or across the country, you get the
              same strictest-domain rigor and the same responsiveness. Forged in one of
              the country&apos;s hardest markets, delivered to any U.S. market that needs it.
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
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              The Engagement
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              How working with us actually works.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(127,215,226,0.3)] hover:bg-[#141d2c]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(127,215,226,0.9), transparent)",
                  }}
                />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.1)] text-sm font-bold text-[#7fd7e2]">
                  {s.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{s.title}</h3>
                <p className="text-sm text-[#8fa0b3]">{s.body}</p>
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
          <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
            Currently Active
          </span>
          <h2 className="mb-6 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
            Currently in active deployment.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="text-lg leading-relaxed text-[#8fa0b3]">
            We&apos;re currently building out our first dedicated healthcare
            engagement with a leading practice. The case study publishes once the
            deployment is fully operational and the practice approves what we share.
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
          "linear-gradient(180deg, rgba(127,215,226,0.06) 0%, rgba(11,18,32,0) 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="rounded-3xl border border-[rgba(127,215,226,0.3)] bg-[#141d2c] p-8 sm:p-12">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              Free Service · No Commitment
            </span>
            <h2 className="mb-6 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Free HIPAA Stack Audit
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-[#8fa0b3]">
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
              <p className="italic text-[#8fa0b3]">
                This isn&apos;t a sales gimmick. It&apos;s a service we can provide
                quickly because we&apos;ve spent years thinking about exactly this
                problem in regulated contexts.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/?offer=hipaa#book"
                className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
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

// ─── Structured data ──────────────────────────────────────────────────────────

const healthcareJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.rebelmindsops.com/healthcare#webpage",
      url: "https://www.rebelmindsops.com/healthcare",
      name: "HIPAA-compliant automation for medical, dental, and behavioral-health practices",
      description:
        "Patient intake, appointment reminders, review routing, and secure patient messaging built on infrastructure where every vendor that touches PHI signs a Business Associate Agreement.",
      isPartOf: { "@id": "https://www.rebelmindsops.com/#organization" },
      author: { "@id": "https://www.rebelmindsops.com/#founder" },
      mainEntity: { "@id": "https://www.rebelmindsops.com/healthcare#service" },
    },
    {
      "@type": "Service",
      "@id": "https://www.rebelmindsops.com/healthcare#service",
      name: "HIPAA-Compliant Healthcare Practice Automation",
      serviceType: "Healthcare automation and patient experience systems",
      description:
        "Automation for medical, dental, and behavioral-health practices: patient intake, appointment reminders, review acquisition and routing, after-hours call handling, and secure messaging. Built exclusively on BAA-signed vendors (for example Twilio and AWS); consumer tools that cannot sign a BAA never touch PHI. Includes a free HIPAA Stack Audit that reviews a practice's current tools for compliance risk.",
      provider: { "@id": "https://www.rebelmindsops.com/#organization" },
      areaServed: "United States",
      audience: {
        "@type": "Audience",
        audienceType: "Medical, dental, and behavioral-health practices",
      },
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
};

// ─── 11. Final CTA ───────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-[#141d2c] p-8 text-center sm:p-12">
            <h2 className="mb-4 serif text-2xl font-medium text-[#e9edf4] sm:text-3xl">
              Ready to build healthcare automation right?
            </h2>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/?offer=hipaa#book"
                className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
              >
                Start with a free fit check
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#hipaa-audit"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-all hover:border-white/40 hover:bg-white/5"
              >
                Request HIPAA Stack Audit
              </a>
            </div>
            <p className="mt-8 text-sm italic text-[#7d90a1]">
              Delivered remotely. HIPAA-aware. Designed for the way your practice actually works.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────

export default function HealthcarePage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healthcareJsonLd) }}
      />
      <SiteNav />
      <Hero />
      <SectionDivider />
      <PainLandscape />
      <SectionDivider />
      <HipaaDifferentiator />
      <SectionDivider />
      <WhyHipaaStandard />
      <ComplianceDiagram />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Background />
      <SectionDivider />
      <RemoteDelivery />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <TrustProof />
      <SectionDivider />
      <HipaaAudit />
      <SectionDivider />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
