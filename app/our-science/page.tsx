"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  HeartPulse,
  MousePointerClick,
  ShieldCheck,
  Workflow,
} from "lucide-react";
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

// ─── 3.1 Hero ────────────────────────────────────────────────────────────────

function ScienceHero() {
  const credentials = [
    "Two Summa Cum Laude degrees · UTRGV",
    "Graduate I-O Psychology, SUNY Albany (full scholarship)",
    "Bicultural \u00B7 Bilingual \u00B7 25+ Years Operating Real Businesses",
  ];

  return (
    <section className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(127,215,226,0.02)] to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
            Our Science
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 serif text-4xl font-medium leading-tight text-[#e9edf4] sm:text-5xl lg:text-6xl">
            Most consultants sell tools.<br />
            We understand why people use them wrong.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#8fa0b3]">
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
                className="rounded-full border border-white/10 bg-[#141d2c] px-4 py-2 text-xs font-medium text-[#8fa0b3]"
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
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              The Discipline
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              What is Industrial-Organizational Psychology?
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
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
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(127,215,226,0.3)] hover:bg-[#141d2c] hover:shadow-[0_8px_32px_rgba(127,215,226,0.07)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(127,215,226,0.9), transparent)" }} />
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.1)] text-sm font-bold text-[#7fd7e2]">
                  {c.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{c.title}</h3>
                <p className="text-sm text-[#8fa0b3]">{c.desc}</p>
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
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              The Problem We Solve
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Why most cybersecurity training fails
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
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
              <div className="flex items-center bg-[#141d2c] px-3 text-[#6f858c]">vs</div>
              <div className="bg-green-500/10 px-4 py-3 text-green-300">What we do</div>
            </div>
            {/* Rows */}
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] border-t border-white/[0.06]">
                <div className="bg-red-500/[0.04] px-5 py-4 text-sm text-red-200">{row.bad}</div>
                <div className="flex items-center bg-[#141d2c] px-3 text-[#5f6e85] text-xs">vs</div>
                <div className="bg-green-500/[0.04] px-5 py-4 text-sm text-green-200">{row.good}</div>
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
      accent: "#8fa0b3",
      icon: ShieldCheck,
      badge: "Cybersecurity",
      title: "Security culture, not security compliance",
      desc: "We assess your organization\u2019s psychological relationship with risk before designing your training program. Employees who feel psychologically safe reporting mistakes catch more threats than those who hide errors out of fear. We build that culture intentionally.",
    },
    {
      accent: "#7fd7e2",
      icon: HeartPulse,
      badge: "Healthcare",
      title: "Clinical workflows designed for the humans who run them",
      desc: "Pre-medical coursework taught us what\u2019s at stake when clinical data moves through a system. I-O Psychology taught us why most healthcare software gets ignored by the front desk that\u2019s supposed to use it. We design patient communication systems, intake automations, and reputation tools that actually get adopted \u2014 and that handle PHI through BAA-signed infrastructure (Twilio, AWS) from day one.",
    },
    {
      accent: "#7fd7e2",
      icon: Workflow,
      badge: "Operations",
      title: "Systems built for human adoption",
      desc: "The #1 reason automation projects fail is change resistance — not bad technology. We map how your team actually works, identify adoption barriers before they become problems, and design onboarding that makes new systems feel natural, not imposed.",
    },
    {
      accent: "#7fd7e2",
      icon: GraduationCap,
      badge: "Training design",
      title: "Spaced repetition + retrieval practice",
      desc: "The forgetting curve is real. Information without reinforcement disappears within 48 hours. Our training programs use evidence-based spacing — short sessions distributed over time — because that is what the research consistently shows drives retention.",
    },
    {
      accent: "#8fa0b3",
      icon: MousePointerClick,
      badge: "Risk perception",
      title: "Why employees click phishing emails",
      desc: "Attackers exploit predictable cognitive biases — authority bias, urgency response, social proof, reciprocity. We teach your team to recognize these manipulation patterns as they happen, not just after the fact. That is threat appraisal theory applied to your inbox.",
    },
  ];

  return (
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              Applied to Your Business
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Where the science shows up in our work
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
              This is not academic theory. These are the mechanisms we use every day to build
              systems that get adopted and training programs that actually change behavior.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-[#141d2c] p-6 transition-all duration-300 hover:border-white/20">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border"
                    style={{ borderColor: "rgba(127,215,226,0.25)", backgroundColor: "rgba(127,215,226,0.08)" }}
                  >
                    <card.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                  </div>
                  <span
                    className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ backgroundColor: `${card.accent}15`, color: card.accent }}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{card.title}</h3>
                <p className="text-sm text-[#8fa0b3]">{card.desc}</p>
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
      color: "#8fa0b3",
      label: "Graduate — Full Scholarship",
      title: "State University of New York (SUNY) — Industrial-Organizational Psychology",
      desc: "Selected for a full-ride graduate scholarship to one of the nation\u2019s leading I-O Psychology programs. Studied organizational behavior, psychometrics, training design, and human factors research at the graduate level.",
    },
    {
      color: "#7fd7e2",
      label: "Applied \u2014 New York State",
      title: "NY OPWDD Workforce-Retention Engagement \u2014 via the SUNY Albany I-O Lab",
      desc: "When the New York State Office for People With Developmental Disabilities needed help with clinical workforce retention, the engagement ran through the SUNY Albany I-O Psychology lab Mario managed. Co-led with his PhD advisor, the work applied organizational psychology to direct-care staff turnover inside a state clinical system. Real stakes in a behavioral-health workforce: the same discipline we bring to private practices today.",
    },
    {
      color: "#7fd7e2",
      label: "Undergraduate — Summa Cum Laude (expected)",
      title: "B.S. Biology, Biological Sciences Concentration — UTRGV",
      desc: "Pre-medical-track curriculum spanning anatomy, physiology, biochemistry, microbiology, and human systems. Graduating with the highest academic distinction — Summa Cum Laude requires the top GPA tier of the graduating class.\n\nThis is more than a credential. It’s the lens we bring to healthcare technology. We understand patient workflows because we studied the science behind them. We know HIPAA isn’t a checkbox because we know what’s encoded in the data it protects.",
    },
    {
      color: "#7fd7e2",
      label: "Undergraduate — Summa Cum Laude",
      title: "University of Texas Rio Grande Valley (UTRGV) — Psychology",
      desc: "Graduated with the highest academic distinction. Research focus on organizational psychology, human performance, and behavioral systems. The discipline that started in South Texas now ships to businesses across the U.S.",
    },
    {
      color: "#7fd7e2",
      label: "Peer-Reviewed Researcher",
      title: "Published Research — Cognitive Psychology & Industrial-Organizational Psychology",
      desc: "Published research in cognitive psychology and Industrial-Organizational Psychology — the sciences of how individuals process information and how teams behave inside organizations. The methodological discipline academic journals demand is the same discipline we bring to healthcare automation: hypothesis-driven design, evidence-based methods, measurable outcomes. Healthcare deserves nothing less.",
    },
    {
      color: "#7fd7e2",
      label: "Practitioner — 25 Years in the Valley",
      title: "Rebel Minds OPS — Founder & Systems Architect",
      desc: "Bicultural and bilingual by lived experience, not by geography alone. Forged operating in one of the country's hardest markets, where the relationship between owner, crew, and client is everything. Over 25 years of that means we understand not just the business problems, but the human context surrounding every one of them. We bring that context to clients in any U.S. market, and it is what makes our systems get adopted instead of abandoned.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(127,215,226,0.2)] bg-[rgba(127,215,226,0.06)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7fd7e2]">
              The Background
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
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
                  <h3 className="mb-2 text-lg font-semibold text-[#e9edf4]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#8fa0b3]">{item.desc}</p>
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
    { value: "30-50%", label: "of presented dental treatment plans never get scheduled — revenue currently leaving the practice" },
  ];

  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 80}>
              <div className="rounded-2xl border border-white/10 bg-[#141d2c] p-6 text-center">
                <div className="mb-3 text-4xl font-bold text-[#7fd7e2]">{stat.value}</div>
                <p className="text-sm text-[#8fa0b3]">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <p className="mx-auto mb-16 max-w-2xl text-center text-xs text-[#8fa0b3]">
            Figures are widely reported industry estimates from security, change
            management, learning science, and dental practice research — cited as
            context, not as guarantees.
          </p>
        </FadeIn>

        <div className="mx-auto mb-12 max-w-3xl">
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#141d2c] px-5 py-4">
            <span className="mt-0.5 flex-shrink-0 text-[#7fd7e2]">
              🔒
            </span>
            <div className="space-y-3 text-xs leading-relaxed text-[#6f858c] italic">
              <p>
                We intentionally don&apos;t publish implementation details. The
                methodology behind our systems is the result of significant original
                research — combining I-O Psychology, behavioral design, biological
                sciences, and operational architecture.
              </p>
              <p>
                For healthcare clients, our compliance posture is similarly
                disciplined: every system flows through BAA-signed vendors only
                (Twilio, AWS, Microsoft 365 where applicable). We share outcomes
                freely. We protect the work — and the patient data — that produces
                them. That protection is part of what you&apos;re hiring us for.
              </p>
            </div>
          </div>
        </div>

        <FadeIn delay={300}>
          <div className="rounded-2xl border border-white/10 bg-[#141d2c] p-8 text-center sm:p-12">
            <h2 className="mb-4 serif text-2xl font-medium text-[#e9edf4] sm:text-3xl">
              Ready to work with someone who actually understands your team?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[#8fa0b3]">
              Most consultants hand you software and leave. We stay until your
              people have adopted it, your security culture has shifted, and your systems
              are running without you having to think about them.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/#book"
                className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-all hover:scale-[1.02] hover:bg-[#5cc3ce]"
              >
                Get a Free Ops Scan
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/cybersecurity"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-all hover:border-white/40 hover:bg-white/5"
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

// ─── Page Root ───────────────────────────────────────────────────────────────

export default function OurSciencePage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <SiteNav />
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
      <SiteFooter />
    </div>
  );
}
