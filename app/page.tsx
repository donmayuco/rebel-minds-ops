"use client";
import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle,
  Clock,
  Globe,
  MapPin,
  ClipboardCheck,
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

// ─── Constants ────────────────────────────────────────────────────────────────
const TYPEWRITER_WORDS = [
  "Growing RGV Businesses",
  "Professional Services",
  "Construction Companies",
  "Restaurants & Retailers",
  "Logistics Teams",
  "Home Service Providers",
];

const TERM_LINES = [
  { text: "$ Initializing FieldOps\u2122 workflow...", type: "cmd" },
  { text: "[01] \u2713 Field submission received", type: "success" },
  { text: "[02] \u2713 Validated and processed", type: "success" },
  { text: "[03] \u2713 Organized by project", type: "success" },
  { text: "[04] \u2713 Back office updated", type: "success" },
  { text: "[05]   Generating summary report...", type: "active" },
] as const;

const MARQUEE_TOOLS = [
  { name: "WhatsApp", color: "#25D366" },
  { name: "n8n", color: "#EA5C0A" },
  { name: "Airtable", color: "#FCB400" },
  { name: "QuickBooks", color: "#2CA01C" },
  { name: "Google Workspace", color: "#4285F4" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Twilio", color: "#F22F46" },
  { name: "Make", color: "#9B59B6" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Google Sheets", color: "#0F9D58" },
  { name: "Slack", color: "#611F69" },
  { name: "Notion", color: "#E5E7EB" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useTypewriter(
  words: string[],
  typeSpeed = 85,
  deleteSpeed = 45,
  pause = 2400
) {
  const [display, setDisplay] = useState("");
  const wordIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[wordIdxRef.current];
      if (!deletingRef.current) {
        if (charIdxRef.current < word.length) {
          charIdxRef.current++;
          setDisplay(word.slice(0, charIdxRef.current));
          timeout = setTimeout(tick, typeSpeed);
        } else {
          timeout = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, pause);
        }
      } else {
        if (charIdxRef.current > 0) {
          charIdxRef.current--;
          setDisplay(word.slice(0, charIdxRef.current));
          timeout = setTimeout(tick, deleteSpeed);
        } else {
          deletingRef.current = false;
          wordIdxRef.current = (wordIdxRef.current + 1) % words.length;
          timeout = setTimeout(tick, typeSpeed);
        }
      }
    }

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return display;
}

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const counter = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(eased * target));
      if (frame >= totalFrames) clearInterval(counter);
    }, 16);
    return () => clearInterval(counter);
  }, [active, target, duration]);

  return { count, ref };
}

// ─── Utility Components ───────────────────────────────────────────────────────
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

function StatCard({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <div
      ref={ref}
      className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur-sm"
    >
      <div className="text-lg font-bold text-[#7DE3E6]">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

// ─── Industry Grid (Hero right column) ────────────────────────────────────────
function IndustryGrid() {
  const industries = [
    {
      icon: HardHat,
      accent: "#F59E0B",
      title: "Construction & Trades",
      pain: "Your crews are in the field. Your paperwork is everywhere else.",
      badge: null,
    },
    {
      icon: Truck,
      accent: "#7DE3E6",
      title: "Logistics & Transport",
      pain: "Your drivers move fast. Your compliance docs don\u2019t.",
      badge: null,
    },
    {
      icon: HomeIcon,
      accent: "#34D399",
      title: "Home Services",
      pain: "You\u2019re on a job when the next lead calls. They won\u2019t wait.",
      badge: null,
    },
    {
      icon: Scale,
      accent: "#A78BFA",
      title: "Legal Offices",
      pain: "Your billable hours shouldn\u2019t compete with your admin hours.",
      badge: null,
    },
    {
      icon: HeartPulse,
      accent: "#F472B6",
      title: "Healthcare",
      pain: "Patient care is the priority. We make sure everything else doesn\u2019t get in the way.",
      badge: "HIPAA-Aware Development",
    },
    {
      icon: Briefcase,
      accent: "#818CF8",
      title: "Professional Services",
      pain: "Your clients expect speed. Your back office slows you down.",
      badge: null,
    },
  ];

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[#7DE3E6]/[0.04] blur-3xl" />

      <div className="relative">
        <div className="mb-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
            Operations-First &middot; Built for Your Industry
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {industries.map((ind) => (
            <div
              key={ind.title}
              className="group relative flex min-h-[120px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ind.accent}, transparent)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] rounded-b-xl opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ind.accent}60, transparent)`,
                }}
              />

              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border"
                style={{
                  borderColor: `${ind.accent}30`,
                  backgroundColor: `${ind.accent}15`,
                }}
              >
                <ind.icon
                  className="h-[18px] w-[18px]"
                  style={{ color: ind.accent }}
                  aria-hidden="true"
                />
              </div>

              <p className="mb-2 text-[13px] font-semibold leading-tight text-white">
                {ind.title}
              </p>

              <p className="flex-1 text-[11px] leading-relaxed text-slate-400/80">
                {ind.pain}
              </p>

              {ind.badge && (
                <span className="mt-3 inline-block rounded-full border border-[#F472B6]/30 bg-[#F472B6]/[0.08] px-2 py-0.5 text-[10px] font-medium text-[#F472B6]">
                  🔒 {ind.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Logo Marquee ─────────────────────────────────────────────────────────────
function LogoMarquee() {
  const doubled = [...MARQUEE_TOOLS, ...MARQUEE_TOOLS];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0B1220] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0B1220] to-transparent" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((tool, i) => (
          <div
            key={i}
            className="mx-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: tool.color }}
            />
            <span className="text-sm text-slate-400">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Terminal Preview ─────────────────────────────────────────────────────────
function TerminalPreview() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    TERM_LINES.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 700 + 300);
      timeoutsRef.current.push(t);
    });

    const progressStart = setTimeout(() => {
      let p = 0;
      intervalRef.current = setInterval(() => {
        p += 1.5;
        if (p >= 88) {
          setProgressWidth(88);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          setProgressWidth(Math.round(p));
        }
      }, 25);
    }, TERM_LINES.length * 700 + 500);
    timeoutsRef.current.push(progressStart);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started]);

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#050A12] shadow-2xl"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-[#0A1220] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        <span className="ml-3 font-mono text-[11px] text-slate-500">
          fieldops.terminal
        </span>
        <span className="ml-auto rounded-full border border-[#7DE3E6]/25 bg-[#7DE3E6]/10 px-2 py-0.5 text-[10px] font-semibold text-[#7DE3E6]">
          LIVE
        </span>
      </div>

      {/* Terminal body */}
      <div className="min-h-[210px] space-y-2 p-5 font-mono text-xs">
        {TERM_LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className={
              line.type === "cmd"
                ? "text-slate-500"
                : line.type === "success"
                  ? "text-green-400"
                  : "text-[#7DE3E6]"
            }
          >
            {line.text}
          </div>
        ))}

        {progressWidth > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">Building report...</span>
              <span className="text-[#7DE3E6]">{progressWidth}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7DE3E6] to-[#5BC8CC] transition-all duration-100"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        )}

        {visibleCount > 0 && progressWidth === 0 && (
          <span className="cursor-blink inline-block h-3 w-1.5 bg-[#7DE3E6] opacity-80" />
        )}
      </div>
    </div>
  );
}

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
      <path
        d="M24 10C17.5 10 13 14.5 13 20C13 23 14.5 25.5 16.5 27.3L16 33H32L31.5 27.3C33.5 25.5 35 23 35 20C35 14.5 30.5 10 24 10Z"
        stroke="#7DE3E6"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      <line
        x1="24" y1="10" x2="24" y2="27"
        stroke="#7DE3E6" strokeWidth="1" strokeOpacity="0.3"
      />
      <polyline
        points="17,29 20,25 23,27 26.5,21 30,24"
        stroke="#7DE3E6" strokeWidth="1.8" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <line
        x1="14" y1="33" x2="34" y2="33"
        stroke="#7DE3E6" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0B1220]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-24 items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
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

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <a href="#for-who" className="text-sm text-slate-400 transition-colors hover:text-white">For who</a>
            <a href="#what-we-build" className="text-sm text-slate-400 transition-colors hover:text-white">What we build</a>
            <a href="#how" className="text-sm text-slate-400 transition-colors hover:text-white">How we work</a>
            <a href="#featured-system" className="text-sm text-slate-400 transition-colors hover:text-white">Example</a>
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
              href="#book"
              className="glow-teal rounded-lg bg-[#7DE3E6] px-4 py-2 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
              onClick={() => trackEvent("CTA_Click", { location: "nav_desktop", cta: "Get a Free Ops Scan" })}
            >
              Get a Free Ops Scan
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
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
        <div id="mobile-navigation" className="border-t border-white/[0.08] bg-[#0E1A2B] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {[
              { label: "For who", href: "#for-who" },
              { label: "What we build", href: "#what-we-build" },
              { label: "How we work", href: "#how" },
              { label: "Example", href: "#featured-system" },
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
                href="#book"
                className="block rounded-lg bg-[#7DE3E6] px-4 py-2.5 text-center text-sm font-semibold text-[#0B1220]"
                onClick={() => {
                  trackEvent("CTA_Click", { location: "nav_mobile", cta: "Get a Free Ops Scan" });
                  setOpen(false);
                }}
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const typewriterText = useTypewriter(TYPEWRITER_WORDS);

  return (
    <section className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
            style={{ minHeight: "460px" }}
          >
            <FadeIn>
              <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                {["Operations First · South Texas", "🇺🇸🇲🇽 100% Bilingüe · English & Spanish", "End-to-end implementation"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-[#7DE3E6]/25 bg-[#7DE3E6]/[0.06] px-3 py-1 text-xs font-medium text-[#7DE3E6]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="mb-6 pb-1 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Operational Systems & Automation for
                <span
                  className="gradient-text"
                  style={{
                    display: "block",
                    minHeight: "1.4em",
                    lineHeight: "1.4",
                    overflow: "visible",
                  }}
                >
                  {typewriterText}
                  <span className="cursor-blink">|</span>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="mb-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                Reduce manual work, improve visibility, and streamline operations
                with practical automation systems built for real businesses under
                real pressure.
              </p>
              <ul className="mb-6 flex max-w-2xl flex-col gap-1.5 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7DE3E6]/60" />
                  Reduce administrative workload
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7DE3E6]/60" />
                  Improve operational visibility
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7DE3E6]/60" />
                  Eliminate manual process friction
                </li>
              </ul>
              <p className="mb-3 text-base font-bold text-[#7DE3E6] italic">
                We Build the Systems Your IT Guys Don&apos;t Understand.
              </p>
              <p className="mb-10 text-sm font-medium text-slate-400">
                Local, structured, and hands-on. Not hype. Not templates. Just
                systems that work.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="mb-12 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
                <a
                  href="#book"
                  className="glow-teal rounded-xl bg-[#7DE3E6] px-6 py-3.5 text-center text-base font-bold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
                  onClick={() => trackEvent("CTA_Click", { location: "hero_primary", cta: "Get a Free Ops Scan" })}
                >
                  Get a Free Ops Scan
                </a>
                <a
                  href="#featured-system"
                  className="rounded-xl border border-white/20 px-6 py-3.5 text-center text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
                >
                  See a system example
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={400} className="mt-2">
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <StatCard target={80} suffix="%" label="Admin Work Reduced" />
                <StatCard target={3} suffix=" wks" label="Average Time to Launch" />
                <StatCard target={100} suffix="%" label="Custom-Built Systems" />
              </div>
            </FadeIn>
          </div>

          {/* Right: dashboard visual */}
          <FadeIn delay={150} className="w-full lg:pt-8">
            <IndustryGrid />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Who It's For ─────────────────────────────────────────────────────────────
function WhoItsFor() {
  const industries = [
    {
      title: "Construction & Trades",
      desc: "Field-heavy businesses needing job-costing and mobile tracking.",
      icon: HardHat,
    },
    {
      title: "Logistics & Transport",
      desc: "Fleet-heavy operations needing clear compliance and expense logs.",
      icon: Truck,
    },
    {
      title: "Home Services",
      desc: "Dispatch teams needing fewer paper trails and faster billing.",
      icon: HomeIcon,
    },
    {
      title: "Professional Services",
      desc: "Agencies and firms needing streamlined client onboarding and invoicing.",
      icon: Briefcase,
    },
  ];

  return (
    <section id="for-who" className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/[0.06] px-3 py-1.5 text-xs font-semibold text-teal-400">
              Who It&apos;s For
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Built for Operators in the Rio Grande Valley
            </h2>
            <p className="mx-auto max-w-xl text-slate-400">
              We partner with businesses that have outgrown their spreadsheets and
              paper forms. If your team is spending hours on data entry, it&apos;s
              time for a system.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <FadeIn key={ind.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(125,227,230,0.07)]">

                {/* Thin top accent line (stable, no snapping) */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)",
                  }}
                />

                <div className="relative mb-3">
                  <div className="absolute inset-0 rounded-xl bg-[#7DE3E6]/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10">
                    <ind.icon
                      className="h-5 w-5 text-[#7DE3E6]"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <h3 className="mb-2 text-base font-semibold leading-tight text-white">
                  {ind.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {ind.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── What We Build (Bento Grid) ───────────────────────────────────────────────
function WhatWeBuild() {
  const systems = [
    { title: "Field Data Capture",   desc: "Field-ready capture tools your crews already know how to use — zero new apps, zero learning curve.",  icon: ScanLine,      span: "lg:col-span-2", accent: "#8B5CF6" },
    { title: "Expense Tracking",     desc: "Expense workflows that keep your books clean without the manual work.",                          icon: Receipt,       span: "lg:col-span-2", accent: "#F97316" },
    { title: "Client Portals",       desc: "Unified dashboards where your customers can review project status.",                             icon: LayoutDashboard, span: "lg:col-span-1", accent: "#A855F7" },
    { title: "Inventory Workflows",  desc: "Barcode scanning and stock alert systems synced to your core database.",                         icon: Package,       span: "lg:col-span-2", accent: "#F59E0B" },
    { title: "Custom Dashboards",    desc: "Real-time KPI visualization tailored exactly to what ownership wants to see.",                   icon: ClipboardCheck, span: "lg:col-span-1", accent: "#C084FC" },
  ];

  const pipelineSteps = [
    { label: "Request", color: "#8B5CF6" },
    { label: "Route",   color: "#A855F7" },
    { label: "Review",  color: "#C084FC" },
    { label: "Approve", color: "#F59E0B" },
    { label: "Archive", color: "#F97316" },
  ];

  return (
    <section id="what-we-build" className="relative px-4 py-20 sm:px-6">
      {/* Subtle background gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#8B5CF6] opacity-[0.07] blur-[120px]" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-[#F97316] opacity-[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/30 bg-[#A855F7]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#C084FC]">
              What We Build
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Modular Systems We Build
            </h2>
            <p className="mx-auto max-w-xl text-slate-400">
              We don&apos;t sell bloated software. We build focused modules
              connected seamlessly via APIs and webhooks.
            </p>
          </div>
        </FadeIn>

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systems.map((sys, i) => (
            <FadeIn key={sys.title} delay={i * 60} className={sys.span}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl border bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                style={{ borderColor: `${sys.accent}28` }}
              >
                {/* Diagonal shine sweep on hover */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[250%]" />

                {/* Top accent line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${sys.accent}, transparent)` }}
                />

                {/* Corner glow blob */}
                <div
                  className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: sys.accent }}
                />

                {/* Icon */}
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 rounded-xl blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                    style={{ backgroundColor: `${sys.accent}50` }}
                  />
                  <div
                    className="relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: `${sys.accent}40`, backgroundColor: `${sys.accent}18` }}
                  >
                    <sys.icon
                      className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6"
                      style={{ color: sys.accent }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <h3 className="relative mb-2 text-lg font-semibold leading-tight text-white">{sys.title}</h3>
                <p className="relative text-sm leading-relaxed text-slate-400">{sys.desc}</p>
              </div>
            </FadeIn>
          ))}

          {/* Featured full-width bento card — Approval Pipelines */}
          <FadeIn delay={300} className="lg:col-span-4">
            <div className="group relative overflow-hidden rounded-2xl border border-[#8B5CF6]/25 bg-gradient-to-r from-[#8B5CF6]/[0.08] via-[#0B1220]/80 to-[#F97316]/[0.08] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#8B5CF6]/45 hover:shadow-[0_12px_56px_rgba(139,92,246,0.14)]">
              {/* Diagonal shine sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[250%]" />

              {/* Left + right corner glows */}
              <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#8B5CF6] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25" />
              <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-[#F97316] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="lg:w-1/2">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-xl bg-[#8B5CF6]/40 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#8B5CF6]/35 bg-[#8B5CF6]/15 transition-all duration-300 group-hover:scale-110">
                      <Workflow className="h-6 w-6 text-[#C084FC] transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="mb-2 inline-block rounded-full border border-[#F97316]/35 bg-[#F97316]/12 px-2.5 py-0.5 text-[11px] font-semibold text-[#FB923C]">
                    Most Requested
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-white">Approval Pipelines</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    Multi-step conditional routing for POs, vacations, and large expenses. Custom logic, any tool stack—no rigid SaaS limits.
                  </p>
                </div>

                {/* Pipeline steps with individual accent colors */}
                <div className="flex flex-wrap items-center gap-3 lg:w-1/2">
                  {pipelineSteps.map(({ label, color }, idx, arr) => (
                    <div key={label} className="flex items-center gap-2">
                      <div
                        className="rounded-lg border px-3 py-2 text-xs font-semibold transition-all duration-200 group-hover:scale-105 group-hover:-translate-y-0.5"
                        style={{
                          transitionDelay: `${idx * 40}ms`,
                          borderColor: `${color}35`,
                          backgroundColor: `${color}15`,
                          color,
                        }}
                      >
                        {label}
                      </div>
                      {idx < arr.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Featured System: ExpenseOps ──────────────────────────────────────────────
function FeaturedSystem() {
  const outcomes = [
    "Reduce manual data entry by 70–90%",
    "Improve expense visibility across teams and jobs",
    "Support more accurate job costing and margin tracking",
    "Clean data for accounting and tax prep",
  ];

  return (
    <section id="featured-system" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#7DE3E6]">
              Featured Proof Module
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Featured System: ExpenseOps™
            </h2>
            <p className="mx-auto max-w-xl text-slate-400">
              A real-world example of what we build. A dedicated system designed
              to end expense documentation chaos for field-heavy teams.
            </p>
          </div>
        </FadeIn>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <FadeIn>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7DE3E6]/20 text-sm text-[#7DE3E6]">
                  ✦
                </span>
                ExpenseOps™ Workflow & Outcomes
              </h3>
              <ul className="space-y-4">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#7DE3E6]/20 text-xs text-[#7DE3E6]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <IPNotice />
              <div className="mt-8">
                <a
                  href="#book"
                  className="glow-teal inline-block rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10 px-6 py-3 text-sm font-bold text-[#7DE3E6] transition-all hover:bg-[#7DE3E6]/20"
                  onClick={() => trackEvent("CTA_Click", { location: "featured_system", cta: "Discuss ExpenseOps Integration" })}
                >
                  Discuss an ExpenseOps Integration
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-[#7DE3E6]/[0.06] blur-3xl" />
              <div className="relative">
                <TerminalPreview />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── JPC Case Study ──────────────────────────────────────────────────────────
function JPCCaseStudy() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6" style={{ backgroundColor: "#060D18" }}>
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#F59E0B] opacity-[0.06] blur-[80px]" />

      <div className="relative mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#F59E0B]">
              Real Work. Real Client.
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              What Happens When a Growing Business Finally Stops Chasing Its Own Paperwork.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              J. Pe&ntilde;a Construction runs 5 to 15 active jobs across the Rio Grande Valley. Like any serious operation at that scale, every hour of focused time is a business asset. We helped them get more of it back.
            </p>
          </div>
        </FadeIn>

        {/* Pain Block */}
        <FadeIn delay={100}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 mb-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              The Operational Cost — Before
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Clock className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  With up to 15 active jobs running simultaneously, job cost documentation was coming in constantly — from crews, suppliers, and sites. Keeping up with it manually meant Sandra was spending 8 to 10 hours every week on back-office work that should have been running itself.
                </p>
              </div>
              <div className="flex gap-3">
                <Clock className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Every gap in the documentation trail was a potential deduction lost at tax time. With multiple jobs running at once, even small inconsistencies added up to real money left on the table — year after year.
                </p>
              </div>
              <div className="flex gap-3">
                <Clock className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Tax season meant handing their accountant months of unstructured records to organize manually. It worked — but it cost time, created stress, and left the back office carrying a burden that belonged in a system.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Result Block */}
        <FadeIn delay={200}>
          <div className="grid gap-6 mt-6 lg:grid-cols-2">
            {/* Left Card — Outcomes */}
            <div className="rounded-2xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.04] p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
                After Rebel Minds OPS
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-[#7DE3E6] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Sandra recovered 8 to 10 hours every week — time previously absorbed by manual back-office work across active jobs.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-[#7DE3E6] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Financial records arrive organized and accounting-ready, automatically. Their accountant receives clean data. Tax season is no longer a project.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-[#7DE3E6] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Pepe focuses on running jobs. Sandra focuses on running the business. The system handles the rest — exactly the way it should work.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card — Pull Quote */}
            <div className="flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <div>
                <div className="text-6xl text-[#7DE3E6]/20 font-serif leading-none mb-4">&ldquo;</div>
                <p className="text-xl font-semibold text-white leading-relaxed italic">
                  &ldquo;I can finally focus on my jobs.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-white px-3 py-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/JPC_logo.png"
                      alt="J. Peña Construction"
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Pepe Pe&ntilde;a</p>
                    <p className="text-xs text-slate-400 mt-0.5">Owner — J. Pe&ntilde;a Construction</p>
                    <p className="text-xs text-slate-500">Rio Grande Valley, Texas</p>
                  </div>
                </div>
                <span className="inline-block mt-4 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/[0.08] px-3 py-1 text-[10px] font-semibold text-[#F59E0B]">
                  Active Case Study Partner
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        <IPNotice />

        {/* Tagline Closer */}
        <FadeIn delay={300}>
          <div className="mt-10 text-center">
            <p className="text-2xl font-bold text-white sm:text-3xl">Protect your focus.</p>
            <p className="text-2xl font-bold sm:text-3xl gradient-text">Automate the rest.</p>
            <p className="mt-3 text-sm text-slate-500">
              That&apos;s not a tagline. That&apos;s what we actually build.
            </p>
            <div className="mt-8">
              <a
                href="#book"
                className="glow-teal inline-block rounded-xl bg-[#7DE3E6] px-6 py-3.5 text-sm font-bold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
              >
                See if your business qualifies &rarr;
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Spanish Section ─────────────────────────────────────────────────────────
function SpanishSection() {
  const cards = [
    {
      icon: MessageCircle,
      title: "La consulta es en espa\u00F1ol",
      desc: "Explicamos cada sistema en tu idioma. Sin tecnicismos, sin malentendidos, sin necesidad de traductores.",
    },
    {
      icon: Users,
      title: "Dise\u00F1ado para tu equipo, no para Silicon Valley",
      desc: "Sabemos que tus crews hablan espa\u00F1ol. Construimos sistemas que pueden usar desde el primer d\u00EDa — sin capacitaci\u00F3n complicada.",
    },
    {
      icon: Globe,
      title: "Bicultural. Biling\u00FCe. Del Valle.",
      desc: "M\u00E1s de 30 a\u00F1os navegando la cultura \u00FAnica del RGV — donde el negocio, el idioma, y las relaciones funcionan diferente. Lo entendemos porque lo vivimos.",
    },
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
      setError("Algo sali\u00F3 mal. Por favor intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#7DE3E6]">
              &#127474;&#127485; Hablamos Tu Idioma
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              &iquest;Tu negocio crece m&aacute;s r&aacute;pido de lo que tus sistemas aguantan?
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Trabajamos completamente en espa&ntilde;ol — desde la primera llamada hasta el soporte. No necesitas un int&eacute;rprete para modernizar tu negocio.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(125,227,230,0.07)]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)",
                  }}
                />
                <div className="relative mb-3">
                  <div className="absolute inset-0 rounded-xl bg-[#7DE3E6]/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10">
                    <card.icon className="h-5 w-5 text-[#7DE3E6]" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-2 text-base font-semibold leading-tight text-white">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Spanish Contact Form */}
        <FadeIn delay={300}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              &iquest;Listo para hablar? Cu&eacute;ntanos de tu negocio.
            </p>
            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#7DE3E6]/30 bg-[#7DE3E6]/10">
                  <svg className="h-7 w-7 text-[#7DE3E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-white">Solicitud recibida.</p>
                <p className="text-slate-400">Te llamamos pronto.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs text-slate-500 underline hover:text-slate-300"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Nombre del negocio */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="es-business">
                    Nombre del negocio <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    id="es-business"
                    name="business"
                    type="text"
                    required
                    placeholder="Ej. Construcciones Pe&ntilde;a LLC"
                    value={form.business}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                  />
                </div>

                {/* Tipo de negocio */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="es-type">
                    Tipo de negocio <span className="text-[#F97316]">*</span>
                  </label>
                  <select
                    id="es-type"
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                  >
                    <option value="" disabled>Selecciona tu industria&hellip;</option>
                    <option value="construction">Construcci&oacute;n / Oficios</option>
                    <option value="logistics">Log&iacute;stica / Transporte</option>
                    <option value="home-services">Servicios del Hogar</option>
                    <option value="professional-services">Servicios Profesionales</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                {/* Qué te gustaría mejorar */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    &iquest;Qu&eacute; te gustar&iacute;a mejorar? <span className="text-[#F97316]">*</span>
                  </label>
                  <select
                    name="priorityArea"
                    required
                    value={form.priorityArea}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                  >
                    <option value="" disabled>Selecciona el &aacute;rea con m&aacute;s fricci&oacute;n...</option>
                    <option value="Organize receipts and expenses for better accounting">Organizar recibos y gastos para contabilidad</option>
                    <option value="Improve project visibility and tracking">Mejorar la visibilidad y seguimiento de proyectos</option>
                    <option value="Reduce manual data entry and paperwork">Reducir captura manual de datos y papeleo</option>
                    <option value="Respond to leads faster and track inquiries">Responder a prospectos m&aacute;s r&aacute;pido</option>
                    <option value="Simplify scheduling and team coordination">Simplificar horarios y coordinaci&oacute;n del equipo</option>
                    <option value="Not sure yet — show me what's possible">No estoy seguro — mu&eacute;strame qu&eacute; es posible</option>
                  </select>
                  <p className="text-xs text-neutral-400">
                    &iquest;No sabes por d&oacute;nde empezar? Para eso es exactamente la llamada.
                  </p>
                </div>

                {/* Teléfono + Correo */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="es-phone">
                      Tel&eacute;fono <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      id="es-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(956) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="es-email">
                      Correo electr&oacute;nico <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      id="es-email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@negocio.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[#7DE3E6] to-[#5BC8CC] px-6 py-3.5 text-sm font-semibold text-[#0B1220] transition-all hover:shadow-[0_0_24px_rgba(125,227,230,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Enviando\u2026" : "Solicitar una llamada"}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Why Rebel Minds Ops ──────────────────────────────────────────────────────
function WhyRebelMindsOps() {
  const points = [
    { title: "RGV Roots", desc: "Bicultural. Bilingual. Over 30 years navigating the unique business culture of the Rio Grande Valley — where relationships, language, and trust work differently. We don\u2019t just know this market. We are this market.", icon: MapPin },
    { title: "Industrial & Org. Psychology Lens", desc: "Cognitive overload kills adoption. We design every system around the humans who have to use it daily — because a tool your team resists is just expensive shelf furniture.", icon: Brain },
    { title: "Business Ownership", desc: "We're not just coders; we are operators who have built and run businesses.", icon: HardHat },
    { title: "Modern Architecture", desc: "We utilize API-first toolchains and serverless functions to keep overhead low.", icon: Zap },
    { title: "You Own the Workflow", desc: "No vendor lock-in. We build it, secure it, and hand you the keys.", icon: KeyRound },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#7DE3E6]/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#7DE3E6]">
              Our Credibility
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Why Rebel Minds Ops
            </h2>
            <p className="mx-auto max-w-xl text-slate-400">
              Other automation companies sell you a tool and disappear. We start with how your business actually operates — the friction, the cognitive overload, the habits your team already has — and we build around all of it.
            </p>
          </div>
        </FadeIn>

        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((pt, i) => (
            <FadeIn key={pt.title} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.05] hover:shadow-[0_8px_32px_rgba(125,227,230,0.07)]">
                {/* Top accent line (thin = no snapping) */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)",
                  }}
                />

                <div className="relative mb-4">
                  <div className="absolute inset-0 rounded-xl bg-[#7DE3E6]/20 blur-lg opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10">
                    <pt.icon className="h-5 w-5 text-[#7DE3E6]" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">{pt.title}</h3>
                <p className="text-sm text-slate-400">{pt.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cybersecurity Teaser ─────────────────────────────────────────────────────
function CyberTeaser() {
  const stats = [
    { value: "43%", label: "of cyberattacks target small businesses" },
    { value: "$200K", label: "average cost of a breach for an SMB" },
    { value: "60%", label: "of breached businesses close within 6 months" },
  ];

  return (
    <section id="cybersecurity" className="relative px-4 py-20 sm:px-6" style={{ backgroundColor: "#060D18" }}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#7DE3E6]/[0.015] to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              New Service
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              We Now Protect What We Help You Build
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              The systems we build for your business store sensitive data, process
              payments, and connect your team. We now offer managed cybersecurity
              services to protect all of it — designed specifically for South Texas
              small businesses that can&apos;t afford an in-house security team.
            </p>
          </div>
        </FadeIn>

        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <FadeIn key={stat.value} delay={i * 80}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm">
                <div className="mb-2 text-3xl font-bold text-[#7DE3E6]">{stat.value}</div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center gap-3 text-center">
            <a
              href="/cybersecurity"
              className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
            >
              See our cybersecurity plans
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-slate-500">
              Free threat assessment included. No obligation.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Connect ──────────────────────────────────────────────────────────────────
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
    <section id="book" className="relative px-4 py-20 sm:px-6">
      {/* Accent gradient blobs — purple → orange, scoped to this section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-8 h-96 w-96 rounded-full bg-[#7B2FBE] opacity-[0.18] blur-[110px]" />
        <div className="absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-[#F97316] opacity-[0.14] blur-[110px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C2410C] opacity-[0.09] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/[0.08] px-3 py-1.5 text-xs font-semibold text-[#F97316]">
              Start Here
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Connect with Us
            </h2>
            <p className="mx-auto max-w-xl text-slate-400">
              Tell us about your business and we&apos;ll reach out to map your
              operational workflow and show you what can be systemized today.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#7DE3E6]/30 bg-[#7DE3E6]/10">
                  <svg className="h-7 w-7 text-[#7DE3E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-white">Request received.</p>
                <p className="text-slate-400">We&apos;ll call you shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs text-slate-500 underline hover:text-slate-300"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Business Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="connect-business">
                    Business Name <span className="text-[#F97316]">*</span>
                  </label>
                  <input
                    id="connect-business"
                    name="business"
                    type="text"
                    required
                    placeholder="e.g. Acme Construction LLC"
                    value={form.business}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                  />
                </div>

                {/* Type of Business */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="connect-type">
                    Type of Business <span className="text-[#F97316]">*</span>
                  </label>
                  <select
                    id="connect-type"
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                  >
                    <option value="" disabled>Select your industry…</option>
                    <option value="construction">Construction / Trades</option>
                    <option value="logistics">Logistics / Transport</option>
                    <option value="home-services">Home Services</option>
                    <option value="professional-services">Professional Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Priority Area */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    What would you most like to improve right now? <span className="text-[#F97316]">*</span>
                  </label>

                  <select
                    name="priorityArea"
                    required
                    value={form.priorityArea}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                  >
                    <option value="" disabled>
                      Select the area causing the most friction...
                    </option>
                    <option value="Organize receipts and expenses for better accounting">
                      Organize receipts and expenses for better accounting
                    </option>
                    <option value="Improve project visibility and tracking">
                      Improve project visibility and tracking
                    </option>
                    <option value="Reduce manual data entry and paperwork">
                      Reduce manual data entry and paperwork
                    </option>
                    <option value="Respond to leads faster and track inquiries">
                      Respond to leads faster and track inquiries
                    </option>
                    <option value="Simplify scheduling and team coordination">
                      Simplify scheduling and team coordination
                    </option>
                    <option value="Not sure yet — show me what’s possible">
                      Not sure yet — show me what’s possible
                    </option>
                  </select>

                  <p className="text-xs text-neutral-400">
                    Not sure where to start? That’s exactly what the call is for.
                  </p>
                </div>

                {/* Phone + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="connect-phone">
                      Phone Number <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      id="connect-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(956) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="connect-email">
                      Email Address <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      id="connect-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#7DE3E6]/40 focus:ring-1 focus:ring-[#7DE3E6]/30"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[#7DE3E6] to-[#5BC8CC] px-6 py-3.5 text-sm font-semibold text-[#0B1220] transition-all hover:shadow-[0_0_24px_rgba(125,227,230,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Request a Call"}
                </button>
                <p className="mt-3 text-center text-xs text-slate-400">
  Free 15-minute workflow review. No obligation.
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
  {
    q: "Do you only do setup, or do you manage the tools?",
    a: "We are a hybrid team. We design the architecture, implement the integration, and offer ongoing stabilization support. We don't just hand you a login—we make sure the system stays running smoothly.",
  },
  {
    q: "Do my crews need to install new apps?",
    a: "Usually no. We design around the tools your team already uses daily — mobile-first, zero learning curve. That\u2019s how we prevent adoption friction.",
  },
  {
    q: "How fast can we go live with a new system?",
    a: "Most foundational modules (like ExpenseTracking or custom forms) take 2–3 weeks from audit to launch. Complex operational architectures can take a month or more, broken down into launch phases.",
  },
  {
    q: "What does pricing depend on?",
    a: "Pricing relies on workflow complexity, system components, and integration difficulty. We estimate a straightforward project timeline and costs during our Free Ops Scan.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
        </FadeIn>
        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all hover:border-white/20">
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="pr-4 text-sm font-medium text-white sm:text-base">{faq.q}</span>
                  <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#7DE3E6] transition-transform duration-200 ${openIdx === i ? "rotate-45" : ""}`}>
                    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </span>
                </button>
                {openIdx === i && (
                  <div id={`faq-panel-${i}`} className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-slate-300">{faq.a}</p>
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

// ─── Footer ───────────────────────────────────────────────────────────────────
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
              © {new Date().getFullYear()} Rebel Minds OPS LLC. All rights reserved.
            </span>
            <div className="mt-2 space-y-1 text-sm text-slate-400">
              <p>
                
              </p>
            </div>
          </div>
          <nav className="flex flex-col flex-wrap items-center justify-center gap-3 text-sm text-slate-400 sm:items-end">
            <div className="mb-2 flex gap-5">
              <a href="#for-who" className="transition-colors hover:text-white">For who</a>
              <a href="#what-we-build" className="transition-colors hover:text-white">What we build</a>
              <a href="#how" className="transition-colors hover:text-white">How we work</a>
            </div>
            <a
              href="#book"
              className="font-semibold text-[#7DE3E6] transition-colors hover:text-white"
              onClick={() => trackEvent("CTA_Click", { location: "footer", cta: "Get a Free Ops Scan" })}
            >
              Get a Free Ops Scan
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function Home() {
  const businessDescription =
    "Reduce manual work, improve visibility, and streamline operations with practical automation systems built for real businesses under real pressure.";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@rebelmindsops.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+19560000000";

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://rebelmindsops.com/#organization",
          name: "Rebel Minds Ops",
          url: "https://rebelmindsops.com",
          description: businessDescription,
          areaServed: ["Rio Grande Valley (RGV)", "South Texas"],
          sameAs: [],
          contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: contactEmail, telephone: contactPhone, areaServed: "US-TX" }],
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://rebelmindsops.com/#service",
          name: "Rebel Minds Ops",
          url: "https://rebelmindsops.com",
          description: businessDescription,
          areaServed: ["Rio Grande Valley (RGV)", "South Texas"],
          sameAs: [],
          provider: { "@id": "https://rebelmindsops.com/#organization" },
          contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: contactEmail, telephone: contactPhone, areaServed: "US-TX" }],
        },
      ],
    }),
    [businessDescription, contactEmail, contactPhone]
  );

  useEffect(() => {
    const sectionIds = ["for-who", "what-we-build", "how", "featured-system", "book"];
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1220]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fixed background layers */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#7DE3E6]/[0.04] blur-[180px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-[500px] w-[600px] rounded-full bg-[#7DE3E6]/[0.025] blur-[140px]" />

      {/* Noise / grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.032]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Nav />
        <Hero />
        <LogoMarquee />
        <SectionDivider />
        <WhoItsFor />
        <SectionDivider />
        <WhatWeBuild />
        <SectionDivider />
        <FeaturedSystem />
        <JPCCaseStudy />
        <SectionDivider />
        <WhyRebelMindsOps />
        <SectionDivider />
        <Connect />
        <SectionDivider />
        <SpanishSection />
        <SectionDivider />
        <CyberTeaser />
        <SectionDivider />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}
