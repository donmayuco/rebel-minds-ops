"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BellOff,
  CalendarClock,
  Hourglass,
  PhoneMissed,
  Star,
  Users,
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
            Practice Operations &middot; The Practice Experience Audit
          </span>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 serif text-4xl font-medium leading-[1.05] text-[#e9edf4] sm:text-5xl lg:text-6xl">
            The medicine was never the problem.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#8fa0b3]">
            Practices rarely decline because of what happens in the exam room.
            They decline because of everything around it: the phone that rings
            out, the follow-up that never comes, the front desk running on
            fumes. All of it is measurable. Most of it is fixable.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/?offer=practice#book"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#four-doors"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-[#e9edf4] transition-colors hover:border-white/40 hover:bg-white/5"
            >
              See how the audit works
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 2. The Story ────────────────────────────────────────────────────────────

function Story() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <span className="mb-4 mono inline-block text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
            Why this page exists
          </span>
        </FadeIn>
        <FadeIn delay={100}>
          <div
            className="space-y-5 border-l pl-6 text-lg leading-relaxed text-[#8fa0b3] sm:pl-8"
            style={{ borderColor: "rgba(127,215,226,0.25)" }}
          >
            <p>
              One of the finest physicians I have ever known ran a practice
              that was packed every single day. Patients waited weeks to see
              him, and they waited gladly.
            </p>
            <p>
              A few years later, the waiting room had gone quiet. Not because
              his medicine changed. His medicine never changed. What changed
              was everything around it: scheduling that leaked, phones that
              went unanswered, staff that turned over faster than they could
              be trained, patients who quietly stopped coming back and told
              their friends why.
            </p>
            <p>
              I watched it happen, and I have carried the lesson ever since:{" "}
              <span className="text-[#e9edf4]">
                a practice produces its reputation twice. Once in the exam
                room, and once everywhere else.
              </span>{" "}
              Doctors are trained for the first. Almost nobody is watching the
              second.
            </p>
            <p className="text-[#e9edf4]">
              That second production line is what we audit.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 3. The Leaks ────────────────────────────────────────────────────────────

function Leaks() {
  const cards = [
    {
      icon: PhoneMissed,
      title: "The phones.",
      body: "How many calls ring out, how long callers hold, what happens after hours. We call your office as patients before we ever visit. We arrive with data.",
    },
    {
      icon: CalendarClock,
      title: "The schedule.",
      body: "No-shows, same-day cancellations, and how far out your next available appointment really is. Access is an experience, and patients measure it in days.",
    },
    {
      icon: Hourglass,
      title: "The wait.",
      body: "Not just how long, but how silent. Patients forgive waiting. They do not forgive not knowing.",
    },
    {
      icon: BellOff,
      title: "The follow-up.",
      body: "Recalls that never happen, results that arrive late, treatment plans that go quiet. Every one of them is a patient deciding whether you remember them.",
    },
    {
      icon: Star,
      title: "The reviews.",
      body: "What patients say when they stop telling you and start telling everyone else, and whether anyone answers them when they do.",
    },
    {
      icon: Users,
      title: "The front desk.",
      body: "The highest-pressure, highest-turnover, least-trained role in the building, and the first voice every patient hears.",
    },
  ];

  return (
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              Where practices lose patients
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Every leak is a number. We count them.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

// ─── 4. The Science ──────────────────────────────────────────────────────────

function Science() {
  const credentials = [
    "M.A., Industrial & Organizational Psychology, with doctoral studies at SUNY Albany",
    "Published population health work across 19 Texas counties under state oversight",
    "Twenty years running operations in the United States",
    "Founder, Rebel Minds OPS",
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-8 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              The part nobody else audits
            </span>
            <h2 className="mb-6 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Patient experience is downstream of staff experience.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="space-y-4 text-lg leading-relaxed text-[#8fa0b3]">
            <p>
              Decades of organizational research point the same direction:
              what your patients feel in the lobby is a reflection of what
              your staff feels behind the desk. Teams that are stretched thin,
              trained once, and afraid to flag problems produce exactly the
              experience your reviews describe. Not because they do not care.
              Because the conditions make caring expensive.
            </p>
            <p>
              This is the layer a software vendor cannot see and a practice
              management binder cannot fix. It is the layer I am trained in.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div
            className="mt-10 rounded-2xl border bg-[#141d2c] p-6 sm:p-8"
            style={{ borderColor: "rgba(233,237,244,0.1)" }}
          >
            <p className="mb-4 mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
              Who does the looking
            </p>
            <p className="mb-4 text-lg font-semibold text-[#e9edf4]">Mario Arredondo</p>
            <ul className="space-y-2">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-[#8fa0b3]">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7fd7e2]" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[#8fa0b3]">
              The research background lives on{" "}
              <a href="/our-science" className="text-[#7fd7e2] underline-offset-2 hover:underline">
                our science page
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 5. The Four Doors ───────────────────────────────────────────────────────

function FourDoors() {
  const doors = [
    {
      num: "01",
      verb: "Eliminate",
      body: "The step should not exist. Redundant forms, double data entry, work that serves nobody.",
    },
    {
      num: "02",
      verb: "Simplify",
      body: "The step stays, the friction goes. Intake before arrival. Confirmations in one tap.",
    },
    {
      num: "03",
      verb: "Train",
      body: "The human is the fix. Front desk service under pressure, recovering a complaint before it becomes a review, the habits that make new systems stick.",
    },
    {
      num: "04",
      verb: "Automate",
      body: "Only what survives the first three doors. Reminders, recalls, overflow capture. Never before, never instead.",
    },
  ];

  return (
    <section id="four-doors" className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-6 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              The Four Doors
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Every problem we find gets exactly one door.
            </h2>
            <p className="mx-auto max-w-2xl text-[#8fa0b3]">
              An audit that ends in a report is a document. Ours ends in a
              classification: each leak, its evidence, and the one fix it
              actually needs.
            </p>
          </div>
        </FadeIn>

        {/* Classification stem */}
        <FadeIn delay={80}>
          <div className="mx-auto mb-10 flex max-w-xs flex-col items-center" aria-hidden="true">
            <span className="mono rounded-full border px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]"
              style={{ borderColor: "rgba(127,215,226,0.3)" }}>
              Every leak
            </span>
            <div className="h-8 w-px bg-[rgba(127,215,226,0.3)]" />
            <span className="mono text-[0.65rem] uppercase tracking-[0.2em] text-[#7d90a1]">
              one door each
            </span>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doors.map((d, i) => (
            <FadeIn key={d.num} delay={i * 100}>
              <div
                className="flex h-full min-h-[300px] flex-col border border-white/15 bg-[#141d2c] px-6 pb-6 pt-10 transition-all duration-300 hover:border-[rgba(127,215,226,0.35)]"
                style={{ borderRadius: "9rem 9rem 0.75rem 0.75rem" }}
              >
                <span className="mono mb-3 text-center text-[0.7rem] tracking-[0.25em] text-[#7fd7e2]">
                  {d.num}
                </span>
                <h3 className="mb-4 serif text-center text-2xl font-medium text-[#e9edf4]">
                  {d.verb}
                </h3>
                <p className="text-center text-sm leading-relaxed text-[#8fa0b3]">{d.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <p className="mt-10 text-center text-lg text-[#e9edf4]">
            Most consultants only have one door.{" "}
            <span className="text-[#8fa0b3]">
              That is why their fixes do not hold.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 6. The Postures ─────────────────────────────────────────────────────────

function Postures() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              On your terms
            </span>
            <h2 className="mb-4 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              Including no AI at all.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          <FadeIn delay={0}>
            <div
              className="flex h-full flex-col rounded-2xl border bg-[#141d2c] p-6"
              style={{ borderColor: "rgba(127,215,226,0.35)" }}
            >
              <span className="mono mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
                Posture one
              </span>
              <h3 className="mb-3 text-lg font-semibold text-[#e9edf4]">No AI.</h3>
              <p className="text-sm leading-relaxed text-[#8fa0b3]">
                Some practices want nothing automated, and we think that is a
                legitimate position. The audit runs exactly the same. You get
                the first three doors: eliminate, simplify, train. Anything
                that could be automated goes in a sealed annex with its
                evidence. If you never open it, it stays sealed.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#141d2c] p-6">
              <span className="mono mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                Posture two
              </span>
              <h3 className="mb-3 text-lg font-semibold text-[#e9edf4]">Hybrid.</h3>
              <p className="text-sm leading-relaxed text-[#8fa0b3]">
                Open to automation, selectively. We recommend it only where
                the evidence clears a bar: high friction, low judgment, no
                patient relationship at stake. What should stay human, stays
                human, on purpose.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#141d2c] p-6">
              <span className="mono mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                Posture three
              </span>
              <h3 className="mb-3 text-lg font-semibold text-[#e9edf4]">Systems first.</h3>
              <p className="mb-4 text-sm leading-relaxed text-[#8fa0b3]">
                Already know what you want built? We build operational systems
                for clinics under the strictest privacy standards in any
                industry. The audit still looks at the operation around the
                system, because a good tool inside a broken process just
                breaks faster.
              </p>
              <a
                href="/healthcare"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#7fd7e2] underline-offset-2 hover:underline"
              >
                Clinic automation under HIPAA discipline
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 7. The Leak Map + How it starts ─────────────────────────────────────────

function LeakMap() {
  const steps = [
    {
      num: "01",
      title: "The walkthrough",
      body: "About an hour on site, free. We call your office as patients before we come. You get an honest read on the spot, whatever it turns out to be.",
    },
    {
      num: "02",
      title: "The audit",
      body: "Both layers measured: the patient journey and the team producing it. You receive the Leak Map.",
    },
    {
      num: "03",
      title: "The fixes",
      body: "Training, process changes, systems, or all three. Through the doors the evidence opened, and only those.",
    },
  ];

  return (
    <section className="bg-[#0a101a] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              What you get
            </span>
            <h2 className="mb-6 serif text-3xl font-medium text-[#e9edf4] sm:text-4xl">
              The Leak Map.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#8fa0b3]">
              Every leak we found. The evidence for each. The one door each
              needs. Sequenced by what it costs you, so you fix the expensive
              ones first. Written so your office manager can act on it, not
              decode it.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-[#141d2c] p-6">
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

// ─── 8. Final CTA ────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div
            className="rounded-3xl border bg-[#141d2c] p-8 text-center sm:p-12"
            style={{ borderColor: "rgba(127,215,226,0.3)" }}
          >
            <span className="mb-4 mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              Free &middot; About an hour &middot; No commitment
            </span>
            <h2 className="mb-4 serif text-2xl font-medium text-[#e9edf4] sm:text-3xl">
              Request a walkthrough.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[#8fa0b3]">
              We call your office as patients first, walk the practice with
              you, and tell you what we see. Then the Leak Map, then the
              doors, and only the ones the evidence opens.
            </p>
            <a
              href="/?offer=practice#book"
              className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-8 text-sm italic text-[#7d90a1]">
              If everything is tight, you will have that confirmed by someone
              trained to look. That happens, and it is a fine outcome.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Structured data ──────────────────────────────────────────────────────────

const practiceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.rebelmindsops.com/practice#webpage",
      url: "https://www.rebelmindsops.com/practice",
      name: "The Practice Experience Audit",
      description:
        "An operational audit for medical, dental, and behavioral-health practices that measures where patient experience leaks revenue and classifies every finding into one of the Four Doors: eliminate, simplify, train, automate. Includes a no-AI engagement option and a free on-site walkthrough.",
      isPartOf: { "@id": "https://www.rebelmindsops.com/#organization" },
      author: { "@id": "https://www.rebelmindsops.com/#founder" },
      mainEntity: { "@id": "https://www.rebelmindsops.com/practice#service" },
    },
    {
      "@type": "Service",
      "@id": "https://www.rebelmindsops.com/practice#service",
      name: "The Practice Experience Audit",
      serviceType: "Practice operations and patient experience audit",
      description:
        "A two-layer diagnostic for healthcare practices: the visible patient journey (phones, scheduling, waits, follow-up, reviews, front desk) and the staff conditions producing it. Every finding is classified into one of the Four Doors (eliminate, simplify, train, automate) and delivered as the Leak Map, sequenced by cost. Practices can engage with no automation at all: findings that could be automated are held in a sealed annex unless the practice chooses to open it. Begins with a free on-site walkthrough.",
      provider: { "@id": "https://www.rebelmindsops.com/#organization" },
      areaServed: "United States",
      audience: {
        "@type": "Audience",
        audienceType: "Medical, dental, and behavioral-health practices",
      },
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://www.rebelmindsops.com/practice#four-doors",
      name: "The Four Doors",
      description:
        "A classification system for practice operations problems, developed by Mario Arredondo (Rebel Minds OPS). Every operational leak found in an audit is assigned exactly one of four fixes.",
      hasDefinedTerm: [
        {
          "@type": "DefinedTerm",
          name: "Eliminate",
          description: "The step should not exist and is removed entirely.",
        },
        {
          "@type": "DefinedTerm",
          name: "Simplify",
          description: "The step stays but sheds friction.",
        },
        {
          "@type": "DefinedTerm",
          name: "Train",
          description:
            "The human is the fix: skills, service recovery, and adoption habits grounded in organizational psychology.",
        },
        {
          "@type": "DefinedTerm",
          name: "Automate",
          description:
            "Only what survives the first three doors is automated.",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.rebelmindsops.com/#founder",
      name: "Mario L. Arredondo",
      url: "https://rebelminds.ai",
      jobTitle: "AI Adoption Strategist & Systems Builder",
      description:
        "M.A., Industrial & Organizational Psychology. Builds operational systems and researches the human layer of AI adoption.",
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

// ─── Page Root ───────────────────────────────────────────────────────────────

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(practiceJsonLd) }}
      />
      <SiteNav />
      <Hero />
      <SectionDivider />
      <Story />
      <SectionDivider />
      <Leaks />
      <SectionDivider />
      <Science />
      <SectionDivider />
      <FourDoors />
      <SectionDivider />
      <Postures />
      <SectionDivider />
      <LeakMap />
      <SectionDivider />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}
