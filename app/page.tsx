"use client";

import { useState } from "react";

// ─── Brand SVG Logo ───────────────────────────────────────────────────────────
function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rebel Minds Ops logo"
    >
      <rect width="48" height="48" rx="10" fill="#0B1220" />
      <rect
        width="48"
        height="48"
        rx="10"
        fill="none"
        stroke="#7DE3E6"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      {/* Brain outline */}
      <path
        d="M24 10C17.5 10 13 14.5 13 20C13 23 14.5 25.5 16.5 27.3L16 33H32L31.5 27.3C33.5 25.5 35 23 35 20C35 14.5 30.5 10 24 10Z"
        stroke="#7DE3E6"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Brain midline */}
      <line
        x1="24"
        y1="10"
        x2="24"
        y2="27"
        stroke="#7DE3E6"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Chart line */}
      <polyline
        points="17,29 20,25 23,27 26.5,21 30,24"
        stroke="#7DE3E6"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom bar */}
      <line
        x1="14"
        y1="33"
        x2="34"
        y2="33"
        stroke="#7DE3E6"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0B1220]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Brand */}
          <a href="#" className="flex items-center gap-3">
            <BrandLogo size={36} />
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide text-white">
                Rebel Minds Ops
              </div>
              <div className="text-[11px] font-semibold tracking-widest text-[#7DE3E6] uppercase">
                ExpenseOps™
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#how"
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              How it works
            </a>
            <a
              href="#outcomes"
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              Outcomes
            </a>
            <a
              href="#book"
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              Schedule Operational Audit
            </a>
            <a
              href="#book"
              className="rounded-lg bg-[#7DE3E6] px-4 py-2 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
            >
              Schedule Operational Audit
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/[0.08] bg-[#0E1A2B] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {[
              { label: "How it works", href: "#how" },
              { label: "Outcomes", href: "#outcomes" },
              { label: "Schedule Operational Audit", href: "#book" },
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
            <div className="pt-2">
              <a
                href="#book"
                className="block rounded-lg bg-[#7DE3E6] px-4 py-2.5 text-center text-sm font-semibold text-[#0B1220]"
                onClick={() => setOpen(false)}
              >
                Schedule Operational Audit
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const stats = [
    { value: "70–90%", label: "less manual entry" },
    { value: "Job + vendor", label: "clarity" },
    { value: "14-day", label: "implementation" },
  ];

  const steps = [
    {
      step: "01",
      title: "Receipt Captured",
      desc: "Photo sent via WhatsApp",
      done: true,
    },
    {
      step: "02",
      title: "AI Extraction",
      desc: "Vendor, amount, category parsed",
      done: true,
    },
    {
      step: "03",
      title: "Cloud Organization",
      desc: "Tagged to job + department",
      done: true,
    },
    {
      step: "04",
      title: "Report Generated",
      desc: "Export-ready for accounting",
      done: false,
    },
  ];

  return (
    <section className="relative px-4 pb-24 pt-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[3fr_2fr]">
          {/* Left */}
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {[
                "Field-heavy businesses",
                "WhatsApp → AI → Reports",
                "Setup + Monthly",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[#7DE3E6]/25 bg-[#7DE3E6]/[0.06] px-3 py-1 text-xs font-medium text-[#7DE3E6]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stop losing money{" "}
              <span className="text-[#7DE3E6]">to receipt chaos.</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300">
              ExpenseOps™ captures receipts via WhatsApp, extracts and
              categorizes expenses with AI, and delivers clean, export-ready
              reports—so your team stops chasing paperwork.
            </p>

            <div className="mb-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#book"
                className="rounded-xl bg-[#7DE3E6] px-6 py-3.5 text-center text-base font-bold text-[#0B1220] shadow-lg shadow-[#7DE3E6]/10 transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
              >
                Schedule Operational Audit
              </a>
              <a
                href="#how"
                className="rounded-xl border border-white/20 px-6 py-3.5 text-center text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                See how ExpenseOps works
              </a>
            </div>

            {/* Proof stat cards */}
            <div className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
                >
                  <div className="text-base font-bold text-[#7DE3E6]">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Workflow Preview Card */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-[#7DE3E6]/[0.06] blur-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-2">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#7DE3E6]" />
                <span className="text-sm font-semibold text-white">
                  ExpenseOps™ Workflow
                </span>
                <span className="ml-auto rounded-full border border-[#7DE3E6]/25 bg-[#7DE3E6]/10 px-2 py-0.5 text-[11px] font-semibold text-[#7DE3E6]">
                  LIVE
                </span>
              </div>

              <div className="space-y-2.5">
                {steps.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        item.done
                          ? "bg-[#7DE3E6]/20 text-[#7DE3E6]"
                          : "bg-[#7DE3E6] text-[#0B1220]"
                      }`}
                    >
                      {item.done ? "✓" : "→"}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
                <span>Avg processing time</span>
                <span className="font-semibold text-[#7DE3E6]">
                  ~2 min end-to-end
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Problem ──────────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: "🚛",
    title: "Lost receipts in trucks & job sites",
    desc: "Field teams can't track paper. Receipts disappear before they reach the office.",
  },
  {
    icon: "📁",
    title: "Unorganized stacks in offices",
    desc: "Paper piles grow. Nothing is searchable. Month-end becomes a scramble.",
  },
  {
    icon: "⚠️",
    title: "Manual entry errors and rework",
    desc: "Human keying creates duplicates, miscategorizations, and hours of cleanup.",
  },
  {
    icon: "📊",
    title: "Cash flow visibility gaps",
    desc: "You don't know what you've spent until it's too late to act on it.",
  },
  {
    icon: "💸",
    title: "Missed tax deductions",
    desc: "Untracked expenses mean money left on the table every tax season.",
  },
  {
    icon: "🧾",
    title: "Unbilled client expenses",
    desc: "Job-site costs never make it to invoices. Margin silently erodes.",
  },
];

function Problem() {
  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1.5 text-xs font-semibold text-red-400">
            The Operational Problem
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            The hidden cost of expense chaos
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            For field-heavy businesses, every one of these problems is costing
            you money—every single week.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all hover:border-red-500/20 hover:bg-red-500/[0.02]"
            >
              <div className="mb-3 text-2xl">{p.icon}</div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    num: "01",
    title: "Capture via WhatsApp",
    desc: "Field teams snap photos or forward receipts in WhatsApp—no new apps, no new habits. It just works.",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI Extracts & Categorizes",
    desc: "Every receipt is parsed instantly—vendor, total, tax, job ID, and category—structured automatically with zero manual input.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Secure Cloud Organization",
    desc: "All receipts are stored, searchable, and centralized. Find any expense by date, vendor, job, or category in seconds.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Generate Reports",
    desc: "Export-ready expense reports for accounting, billing, and tax prep—delivered on your schedule, formatted to your needs.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
];

function HowItWorks() {
  return (
    <section id="how" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#7DE3E6]">
            How It Works
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            From receipt to report in minutes
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            Four steps. Zero new apps for your crew. Complete financial
            visibility for you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((step, i) => (
            <div
              key={step.num}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all hover:border-[#7DE3E6]/30 hover:bg-white/[0.06]"
            >
              {i < HOW_STEPS.length - 1 && (
                <div className="absolute -right-2.5 top-8 z-10 hidden lg:block">
                  <div className="h-[1px] w-5 bg-gradient-to-r from-[#7DE3E6]/20 to-transparent" />
                </div>
              )}

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10 text-[#7DE3E6] transition-colors group-hover:bg-[#7DE3E6]/20">
                  {step.icon}
                </div>
                <span className="font-mono text-sm text-slate-500">
                  {step.num}
                </span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Outcomes + Implementation ────────────────────────────────────────────────
function Outcomes() {
  const outcomes = [
    "Reduce manual data entry by 70–90%",
    "Improve expense visibility across teams and jobs",
    "Support more accurate job costing and margin tracking",
    "Reduce refund leakage",
    "Clean data for accounting and tax prep",
  ];

  const phases = [
    {
      week: "Week 1",
      title: "Setup",
      desc: "Configure capture workflows, integrate with existing tools, onboard your team.",
    },
    {
      week: "Week 2",
      title: "Testing + Integration",
      desc: "Live testing with real receipts, QA review, and system refinement.",
    },
    {
      week: "Week 3",
      title: "Operational Stability",
      desc: "Full go-live. Your team runs independently with full ongoing support.",
    },
  ];

  return (
    <section id="outcomes" className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#7DE3E6]">
            What You&apos;ll Gain
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Real outcomes, measurable results
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            Built for operations teams that need financial clarity—not more
            software to manage.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Outcomes */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7DE3E6]/20 text-sm text-[#7DE3E6]">
                ✦
              </span>
              Business Outcomes
            </h3>
            <ul className="space-y-4">
              {outcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#7DE3E6]/20 text-xs text-[#7DE3E6]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Implementation */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7DE3E6]/20 text-sm text-[#7DE3E6]">
                ⚡
              </span>
              Implementation Timeline
            </h3>

            <div className="mb-6 space-y-4">
              {phases.map((phase) => (
                <div key={phase.week} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 rounded-lg border border-[#7DE3E6]/20 bg-[#7DE3E6]/10 px-2 py-1 text-center font-mono text-xs font-bold text-[#7DE3E6]">
                      {phase.week}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {phase.title}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-slate-400">
                      {phase.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#7DE3E6]/15 bg-[#7DE3E6]/[0.06] p-4">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-[#7DE3E6]">
                  Setup + Monthly model
                </span>{" "}
                based on receipt volume and workflow complexity. Engineered for
                scalable operational control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking ──────────────────────────────────────────────────────────────────
function Booking() {
  const bullets = [
    {
      title: "Workflow Map",
      desc: "A clear picture of how expenses flow today and where the gaps are.",
    },
    {
      title: "Volume Estimate",
      desc: "Monthly receipt and invoice volume assessment for accurate pricing.",
    },
    {
      title: "Plan + Timeline",
      desc: "A specific implementation plan with a 3-week onboarding roadmap.",
    },
    {
      title: "Quote Range",
      desc: "Transparent pricing before any commitment.",
    },
  ];

  return (
    <section id="book" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#7DE3E6]">
            Free Consultation
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Schedule Operational Audit
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            We&apos;ll map your current workflow, estimate your volume, and give
            you a clear plan with pricing.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* What you'll get */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-xl font-bold text-white">
              What you&apos;ll get
            </h3>

            <ul className="mb-8 space-y-4">
              {bullets.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#7DE3E6]/20 text-xs text-[#7DE3E6]">
                    ✓
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {b.title}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">{b.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto rounded-xl border border-[#7DE3E6]/15 bg-[#7DE3E6]/[0.06] p-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-[#7DE3E6]">
                    Serving South Texas first.
                  </span>{" "}
                  Expanding statewide next. Schedule now to lock in early access
                  pricing.
                </p>
              </div>
            </div>
          </div>

          {/* Calendly embed */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
            <div className="rounded-t-2xl border-b border-white/10 bg-[#0B1220] px-4 py-3">
              <h3 className="text-sm font-semibold text-white">Pick a time</h3>
            </div>
            <div className="space-y-3 p-3">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src="https://calendly.com/YOUR-CALENDLY/operational-audit?hide_gdpr_banner=1&background_color=0B1220&text_color=F8FAFC&primary_color=7DE3E6"
                  width="100%"
                  height="650"
                  frameBorder={0}
                  title="Schedule your operational audit with Rebel Minds Ops"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 px-1 pb-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Times are shown in your local timezone and confirmed by email.
                </p>
                <a
                  href="https://calendly.com/YOUR-CALENDLY/operational-audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#7DE3E6] transition-colors hover:text-white"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is my data secure?",
    a: "Yes. All receipt data is encrypted in transit and at rest. Access is role-based, and your financial data is never shared with third parties. We follow industry-standard security practices for sensitive financial data.",
  },
  {
    q: "Do my crews need to install an app?",
    a: "No. Your field teams use WhatsApp—which they already have—to snap and send receipts. There's nothing new to download or learn. The system works entirely in the background.",
  },
  {
    q: "How fast can we go live?",
    a: "Most clients are fully operational within 14 days. Week 1 is setup and configuration, Week 2 is testing and integration, and Week 3 is full operational stability with your team running independently.",
  },
  {
    q: "What does pricing depend on?",
    a: "Pricing is based on monthly receipt and invoice volume and the complexity of your workflow—number of jobs, team size, and integrations needed. We provide a clear quote range during your free operational audit. No surprises.",
  },
  {
    q: "Can this integrate with QuickBooks or Sage?",
    a: "Yes. ExpenseOps™ produces clean, export-ready data that maps directly to accounting software including QuickBooks and Sage. We discuss specific integration requirements during your audit call.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-slate-400">
            Everything you need to know before booking your audit.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all hover:border-white/20"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span className="pr-4 text-sm font-medium text-white sm:text-base">
                  {faq.q}
                </span>
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#7DE3E6] transition-transform duration-200 ${
                    openIdx === i ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </span>
              </button>

              {openIdx === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-slate-300">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <BrandLogo size={28} />
            <span className="text-sm text-slate-400">
              © {new Date().getFullYear()} Rebel Minds Ops. All rights
              reserved.
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm text-slate-400">
            <a href="#how" className="transition-colors hover:text-white">
              How it works
            </a>
            <a href="#outcomes" className="transition-colors hover:text-white">
              Outcomes
            </a>
            <a href="#book" className="transition-colors hover:text-white">
              Schedule Operational Audit
            </a>
            <a
              href="#book"
              className="font-semibold text-[#7DE3E6] transition-colors hover:text-white"
            >
              Schedule Operational Audit
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1220]">
      {/* Fixed background layers */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#7DE3E6]/[0.04] blur-[180px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-[500px] w-[600px] rounded-full bg-[#7DE3E6]/[0.025] blur-[140px]" />

      {/* Content */}
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Problem />
        <HowItWorks />
        <Outcomes />
        <Booking />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}
