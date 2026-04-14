"use client";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
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
  MessageSquareText,
  KeyRound,
  Brain,
  Check,
  Minus,
  HardHat,
  Truck,
  Car,
  Stethoscope,
  Scale,
  Briefcase,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
                    <a href="/cybersecurity#cyber-intake" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Free Security Assessment
                    </a>
                    <a href="/our-science" className="block rounded-lg px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
                      Our Science
                    </a>
                  </div>
                </div>
              )}
            </div>
            <a
              href="https://rebelmindsops.gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
            >
              DIY Templates
              <span className="rounded-full bg-[#F59E0B]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#F59E0B]">Shop</span>
            </a>
            <a
              href="#cyber-intake"
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
                <a href="/cybersecurity#cyber-intake" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Free Security Assessment
                </a>
                <a href="/our-science" className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>
                  Our Science
                </a>
              </div>
            )}
            <a
              href="https://rebelmindsops.gumroad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              DIY Templates
              <span className="rounded-full bg-[#F59E0B]/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#F59E0B]">Shop</span>
            </a>
            <div className="pt-2">
              <a
                href="#cyber-intake"
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

// ─── 4.1 Hero ─────────────────────────────────────────────────────────────────

function CyberHero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-96px)] items-center px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#7DE3E6]/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeIn>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-4 py-2">
            <Shield className="h-4 w-4 text-[#7DE3E6]" />
            <span className="text-xs font-semibold text-[#7DE3E6]">Managed Cybersecurity</span>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Cybersecurity for South Texas Small Businesses
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            AI-powered threat monitoring, phishing protection, and behavior-based security
            training — managed for you, starting at $299/month.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#cyber-intake"
              className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
              onClick={() => trackEvent("CTA_Click", { location: "cyber_hero_primary", cta: "Free Security Assessment" })}
            >
              Get my free security assessment
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#cyber-plans"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              See our plans
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="mt-6 text-xs text-slate-500">
            No contracts. No jargon. Cancel anytime.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Animated Threat Flow ─────────────────────────────────────────────────────

const THREAT_SOURCES = ["Email", "Dark Web", "Credentials", "Endpoints", "Web Browsing"];
const RESOLVE_LABELS = ["Blocked", "Secured", "Resolved"];
const PILL_LABELS = ["Email security", "Dark web monitor", "Endpoint EDR", "Phishing training", "Threat response"];

interface Particle {
  x: number;
  y: number;
  sourceIdx: number;
  progress: number;
  speed: number;
  resolved: boolean;
  resolveLabel: string;
  opacity: number;
  size: number;
}

function ThreatFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const dimRef = useRef({ w: 0, h: 0 });
  const logoImg = useRef<HTMLImageElement | null>(null);
  const pulseRef = useRef(0);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/rebelminds-icon.png";
    img.onload = () => { logoImg.current = img; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = Math.min(420, Math.max(280, w * 0.38));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimRef.current = { w, h };
    }

    resize();
    window.addEventListener("resize", resize);

    function spawnParticle() {
      const { h } = dimRef.current;
      const sourceIdx = Math.floor(Math.random() * THREAT_SOURCES.length);
      const slotH = h / THREAT_SOURCES.length;
      const y = slotH * sourceIdx + slotH * 0.5 + (Math.random() - 0.5) * slotH * 0.3;
      particlesRef.current.push({
        x: 0,
        y,
        sourceIdx,
        progress: 0,
        speed: 0.003 + Math.random() * 0.003,
        resolved: false,
        resolveLabel: RESOLVE_LABELS[Math.floor(Math.random() * RESOLVE_LABELS.length)],
        opacity: 1,
        size: 3 + Math.random() * 2,
      });
    }

    let spawnAccum = 0;

    function draw(time: number) {
      if (!ctx) return;
      const { w, h } = dimRef.current;
      if (w === 0) { animRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#0a0d14";
      ctx.fillRect(0, 0, w, h);

      const detectX = w * 0.18;
      const shieldX = w * 0.5;
      const resolveX = w * 0.82;
      const shieldR = Math.min(36, w * 0.055);

      // Zone labels
      ctx.textAlign = "center";
      ctx.font = `600 ${Math.max(10, w * 0.012)}px system-ui, sans-serif`;
      const labelY = 22;
      ctx.fillStyle = "rgba(239,68,68,0.6)";
      ctx.fillText("DETECT", detectX, labelY);
      ctx.fillStyle = "rgba(125,227,230,0.6)";
      ctx.fillText("PROTECT", shieldX, labelY);
      ctx.fillStyle = "rgba(74,222,128,0.6)";
      ctx.fillText("RESOLVE", resolveX, labelY);

      // Source labels (left)
      const slotH = h / THREAT_SOURCES.length;
      ctx.textAlign = "right";
      ctx.font = `500 ${Math.max(9, w * 0.011)}px system-ui, sans-serif`;
      ctx.fillStyle = "rgba(239,68,68,0.45)";
      for (let i = 0; i < THREAT_SOURCES.length; i++) {
        const sy = slotH * i + slotH * 0.5;
        ctx.fillText(THREAT_SOURCES[i], detectX - 16, sy + 3);
        // dot
        ctx.beginPath();
        ctx.arc(detectX - 8, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239,68,68,0.35)";
        ctx.fill();
        ctx.fillStyle = "rgba(239,68,68,0.45)";
      }

      // Funnel guide lines (subtle)
      ctx.strokeStyle = "rgba(125,227,230,0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < THREAT_SOURCES.length; i++) {
        const sy = slotH * i + slotH * 0.5;
        ctx.beginPath();
        ctx.moveTo(detectX, sy);
        ctx.quadraticCurveTo(shieldX * 0.75, sy, shieldX - shieldR - 10, h * 0.5);
        ctx.stroke();
      }
      // Right funnel
      ctx.strokeStyle = "rgba(74,222,128,0.04)";
      for (let i = 0; i < 3; i++) {
        const ey = h * 0.3 + i * h * 0.2;
        ctx.beginPath();
        ctx.moveTo(shieldX + shieldR + 10, h * 0.5);
        ctx.quadraticCurveTo(resolveX * 0.9, ey, resolveX, ey);
        ctx.stroke();
      }

      // Pulse
      pulseRef.current = (Math.sin(time * 0.003) + 1) * 0.5;
      const pulse = pulseRef.current;

      // Shield glow
      const glowR = shieldR + 12 + pulse * 8;
      const grd = ctx.createRadialGradient(shieldX, h * 0.5, shieldR * 0.5, shieldX, h * 0.5, glowR);
      grd.addColorStop(0, "rgba(125,227,230,0.12)");
      grd.addColorStop(1, "rgba(125,227,230,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(shieldX, h * 0.5, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Shield circle
      ctx.beginPath();
      ctx.arc(shieldX, h * 0.5, shieldR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(125,227,230,${0.08 + pulse * 0.06})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(125,227,230,${0.35 + pulse * 0.25})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Logo in shield
      if (logoImg.current) {
        const logoS = shieldR * 1.2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(shieldX, h * 0.5, shieldR - 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg.current, shieldX - logoS * 0.5, h * 0.5 - logoS * 0.5, logoS, logoS);
        ctx.restore();
      }

      // Spawn
      spawnAccum += 1;
      if (spawnAccum >= 8) { spawnParticle(); spawnAccum = 0; }

      // Update & draw particles
      const alive: Particle[] = [];
      for (const p of particlesRef.current) {
        p.progress += p.speed;

        if (p.progress < 0.5) {
          // Traveling toward shield
          const t = p.progress / 0.5;
          const startY = p.y;
          const sy = slotH * p.sourceIdx + slotH * 0.5;
          const cx = detectX + (shieldX - detectX) * 0.5;
          const cy = sy;
          const ex = shieldX - shieldR - 4;
          const ey = h * 0.5;
          // quadratic bezier
          const u = t;
          p.x = (1 - u) * (1 - u) * detectX + 2 * (1 - u) * u * cx + u * u * ex;
          p.y = (1 - u) * (1 - u) * sy + 2 * (1 - u) * u * cy + u * u * ey;

          // Red particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239,68,68,${0.7 * p.opacity})`;
          ctx.fill();

          // Trail
          ctx.beginPath();
          ctx.arc(p.x - 4, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239,68,68,${0.2 * p.opacity})`;
          ctx.fill();

        } else if (p.progress < 0.55) {
          // Absorb at shield — brief flash
          const flashT = (p.progress - 0.5) / 0.05;
          const flashR = shieldR + flashT * 6;
          ctx.beginPath();
          ctx.arc(shieldX, h * 0.5, flashR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(125,227,230,${0.08 * (1 - flashT)})`;
          ctx.fill();
          p.resolved = true;
        } else {
          // Traveling toward resolve
          const t = (p.progress - 0.55) / 0.45;
          const resolveSlot = p.sourceIdx % 3;
          const ey = h * 0.3 + resolveSlot * h * 0.2;
          const sx = shieldX + shieldR + 4;
          const sy2 = h * 0.5;
          const cx2 = sx + (resolveX - sx) * 0.5;
          const cy2 = ey;
          const u = Math.min(t, 1);
          p.x = (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * cx2 + u * u * resolveX;
          p.y = (1 - u) * (1 - u) * sy2 + 2 * (1 - u) * u * cy2 + u * u * ey;

          if (t > 0.8) p.opacity = Math.max(0, 1 - (t - 0.8) / 0.2);

          // Green particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(74,222,128,${0.7 * p.opacity})`;
          ctx.fill();

          // Resolve label near end
          if (t > 0.7 && p.opacity > 0.1) {
            ctx.font = `600 ${Math.max(8, w * 0.009)}px system-ui, sans-serif`;
            ctx.textAlign = "left";
            ctx.fillStyle = `rgba(74,222,128,${0.5 * p.opacity})`;
            ctx.fillText(p.resolveLabel, p.x + 8, p.y + 3);
          }
        }

        if (p.progress < 1.05 && p.opacity > 0) alive.push(p);
      }
      particlesRef.current = alive;

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16" style={{ backgroundColor: "#0a0d14" }}>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <canvas ref={canvasRef} className="block w-full" />
        </div>

        {/* Live pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {PILL_LABELS.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/[0.06] px-3.5 py-1.5 text-xs font-medium text-green-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              {label}
            </span>
          ))}
        </div>
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
    <section id="cyber-why" className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              Why It Matters
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Small Businesses Are the #1 Target
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Hackers don&apos;t only go after banks and hospitals. 43% of all cyberattacks
              target small businesses — precisely because most have no security in place.
              One phishing email to one employee can shut down years of work in hours.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-3">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.05] hover:shadow-[0_8px_32px_rgba(125,227,230,0.07)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)" }} />
                <div className="relative mb-4">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10">
                    <p.icon className="h-5 w-5 text-[#7DE3E6]" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-slate-400">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4.3 Pricing Comparison Table ────────────────────────────────────────────

type CellValue = "check" | "dash" | string;

function CellContent({ value }: { value: CellValue }) {
  if (value === "check") return <Check className="mx-auto h-5 w-5 text-green-400" />;
  if (value === "dash") return <Minus className="mx-auto h-4 w-4 text-slate-600" />;
  return <span className="text-amber-300">{value}</span>;
}

function CyberPlans() {
  type FeatureRow = { feature: string; starter: CellValue; growth: CellValue; shield: CellValue };
  type FeatureGroup = { group: string; badge?: string; highlight?: boolean; rows: FeatureRow[] };

  const groups: FeatureGroup[] = [
    {
      group: "Monitoring & detection",
      rows: [
        { feature: "AI threat monitoring", starter: "Business hours", growth: "24/7", shield: "24/7" },
        { feature: "Managed detection & response (MDR)", starter: "dash", growth: "check", shield: "check" },
        { feature: "Dark web credential monitoring", starter: "check", growth: "check", shield: "check" },
        { feature: "External vulnerability scanning", starter: "Monthly", growth: "Weekly", shield: "Continuous" },
      ],
    },
    {
      group: "Email & identity",
      rows: [
        { feature: "Email security + phishing filter", starter: "check", growth: "check", shield: "check" },
        { feature: "Domain spoofing protection (DMARC)", starter: "check", growth: "check", shield: "check" },
        { feature: "Identity threat detection (ITDR)", starter: "dash", growth: "check", shield: "check" },
        { feature: "Microsoft 365 / Google Workspace", starter: "dash", growth: "check", shield: "check" },
      ],
    },
    {
      group: "Endpoint & device protection",
      rows: [
        { feature: "Endpoint protection (antivirus)", starter: "check", growth: "check", shield: "check" },
        { feature: "SentinelOne EDR", starter: "dash", growth: "check", shield: "check" },
        { feature: "Annual penetration test", starter: "dash", growth: "dash", shield: "check" },
      ],
    },
    {
      group: "Human risk & training",
      badge: "I-O Psychology",
      highlight: true,
      rows: [
        { feature: "Monthly phishing simulation", starter: "check", growth: "check", shield: "check" },
        { feature: "Automated micro-learning (weekly)", starter: "Self-guided", growth: "Managed", shield: "Managed" },
        { feature: "Live virtual training sessions", starter: "dash", growth: "Monthly, 1hr", shield: "Bi-weekly, 1hr" },
        { feature: "On-site training (your location)", starter: "dash", growth: "dash", shield: "Quarterly, half-day" },
        { feature: "Leadership / executive briefing", starter: "dash", growth: "dash", shield: "Quarterly" },
        { feature: "Security culture assessment", starter: "dash", growth: "dash", shield: "Annual" },
        { feature: "Employee security champion program", starter: "dash", growth: "dash", shield: "check" },
        { feature: "Training completion & behavior tracking", starter: "Basic", growth: "Full dashboard", shield: "Full dashboard" },
      ],
    },
    {
      group: "Compliance & reporting",
      rows: [
        { feature: "Monthly automated security report", starter: "check", growth: "check", shield: "check" },
        { feature: "HIPAA / PCI compliance readiness", starter: "dash", growth: "check", shield: "check" },
        { feature: "Cyber insurance readiness report", starter: "dash", growth: "dash", shield: "check" },
        { feature: "Security policy creation", starter: "dash", growth: "dash", shield: "check" },
      ],
    },
    {
      group: "Support & advisory",
      rows: [
        { feature: "Incident response SLA", starter: "Next biz day", growth: "Same day", shield: "2-hour SLA" },
        { feature: "Quarterly security review call", starter: "dash", growth: "check", shield: "check" },
        { feature: "Virtual CISO — 4 hrs/month", starter: "dash", growth: "dash", shield: "check" },
      ],
    },
  ];

  const bestFor = [
    { tier: "Starter", desc: "Low compliance risk. Team needs solid baseline protection and will learn security habits on their own schedule." },
    { tier: "Growth", desc: "Handles sensitive data (health, legal, financial). Needs real endpoint coverage, live training, and compliance reporting." },
    { tier: "Shield", desc: "Regulated industry, multiple locations, or needs documented security posture for insurance or contracts." },
  ];

  return (
    <section id="cyber-plans" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              Plans
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Compare Protection Levels
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-400">
              Price reflects your protection level and training depth — not just headcount.
              A 5-person law firm often needs more than a 30-person restaurant.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              {/* Header */}
              <thead>
                <tr>
                  <th className="w-[220px] bg-[#0E1A2B]/60 p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500" />
                  <th className="bg-white/[0.02] p-4 text-center">
                    <div className="text-sm font-semibold text-white">Starter</div>
                    <div className="text-2xl font-bold text-white">$299<span className="text-xs font-normal text-slate-400">/mo</span></div>
                    <div className="mt-1 text-xs text-slate-500">Essentials + automated training</div>
                  </th>
                  <th className="border-x-2 border-[#534AB7]/50 bg-[#534AB7]/[0.06] p-4 text-center">
                    <div className="mb-1">
                      <span className="rounded-full bg-[#534AB7]/20 px-2 py-0.5 text-[10px] font-semibold text-[#534AB7]">Most popular</span>
                    </div>
                    <div className="text-sm font-semibold text-white">Growth</div>
                    <div className="text-2xl font-bold text-[#534AB7]">$699<span className="text-xs font-normal text-slate-400">/mo</span></div>
                    <div className="mt-1 text-xs text-slate-500">Full coverage + live virtual training</div>
                  </th>
                  <th className="bg-white/[0.02] p-4 text-center">
                    <div className="text-sm font-semibold text-white">Shield</div>
                    <div className="text-2xl font-bold text-white">$1,499<span className="text-xs font-normal text-slate-400">/mo</span></div>
                    <div className="mt-1 text-xs text-slate-500">Enterprise + on-site training</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <Fragment key={g.group}>
                    {/* Group header */}
                    <tr>
                      <td colSpan={4} className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider ${g.highlight ? "bg-[#534AB7]/[0.08] text-[#534AB7]" : "bg-[#0E1A2B]/80 text-slate-400"}`}>
                        <span className="flex items-center gap-2">
                          {g.group}
                          {g.badge && (
                            <span className="rounded-full bg-[#534AB7]/20 px-2 py-0.5 text-[10px] font-semibold normal-case text-[#534AB7]">
                              {g.badge}
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {g.rows.map((row) => (
                      <tr key={row.feature} className={`border-t border-white/[0.04] ${g.highlight ? "bg-[#534AB7]/[0.02]" : ""}`}>
                        <td className="bg-[#0E1A2B]/40 px-4 py-3 text-sm text-slate-300">{row.feature}</td>
                        <td className="px-4 py-3 text-center text-sm"><CellContent value={row.starter} /></td>
                        <td className="border-x-2 border-[#534AB7]/50 bg-[#534AB7]/[0.03] px-4 py-3 text-center text-sm"><CellContent value={row.growth} /></td>
                        <td className="px-4 py-3 text-center text-sm"><CellContent value={row.shield} /></td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <p className="mt-3 text-center text-xs text-slate-500">
          * Email security and identity monitoring features require Microsoft 365 or Google Workspace. Clients on other platforms receive equivalent protection through our security partner network.
        </p>

        {/* Best for notes */}
        <FadeIn delay={200}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {bestFor.map((b) => (
              <div key={b.tier} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 text-sm font-semibold text-white">{b.tier} is best if:</div>
                <p className="text-xs text-slate-400">{b.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA buttons */}
        <FadeIn delay={300}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a href="#cyber-intake" className="block rounded-lg border border-white/20 py-3 text-center text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">
              Get Starter
            </a>
            <a href="#cyber-intake" className="glow-teal block rounded-lg bg-[#534AB7] py-3 text-center text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[#6358c5]" style={{ boxShadow: "0 0 28px rgba(83,74,183,0.35)" }}>
              Get Growth
            </a>
            <a href="#cyber-intake" className="block rounded-lg border border-white/20 py-3 text-center text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">
              Get Shield
            </a>
          </div>
        </FadeIn>

        {/* Free add-on */}
        <FadeIn delay={400}>
          <div className="mt-10 rounded-2xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.04] p-8 text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">Free Add-on</div>
            <h3 className="mb-2 text-xl font-bold text-white">Security Risk Assessment</h3>
            <p className="mb-1 text-sm text-slate-400">
              <span className="text-slate-500 line-through">Value: $497</span>{" "}
              <span className="font-semibold text-[#7DE3E6]">Your price: $0</span>
            </p>
            <p className="mx-auto mb-6 max-w-xl text-sm text-slate-400">
              We scan your public-facing assets, check your domain for misconfigurations,
              and run your emails against breach databases. Real report, no obligation.
            </p>
            <a
              href="#cyber-intake"
              className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]"
            >
              Claim my free assessment <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4.3b RGV Industries ─────────────────────────────────────────────────────

function RGVIndustries() {
  const industries = [
    { icon: HardHat, title: "Construction & Trades", desc: "Crew payroll, subcontractor data, project financials" },
    { icon: Truck, title: "Logistics & Fleets", desc: "Driver records, route data, carrier agreements" },
    { icon: Car, title: "Auto Dealerships", desc: "Customer financing data, DMS access, F&I records" },
    { icon: Stethoscope, title: "Medical & Dental", desc: "Patient records, HIPAA compliance, billing systems" },
    { icon: Scale, title: "Legal & Accounting", desc: "Client files, trust accounts, privileged communications" },
    { icon: Briefcase, title: "Professional Services", desc: "Contracts, invoicing, client relationship data" },
  ];

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              Who We Protect
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              We Know Your Industry Because We Work In It
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              These aren&apos;t abstract SMB categories to us. They&apos;re our neighbors. We know what you handle daily, what data you carry, and what a breach would cost your operation.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <FadeIn key={ind.title} delay={i * 80}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#7DE3E6]/30 hover:bg-[#7DE3E6]/[0.04]">
                <ind.icon className="mb-3 h-6 w-6 text-[#7DE3E6]" />
                <h3 className="mb-1 text-sm font-semibold text-white">{ind.title}</h3>
                <p className="text-xs text-slate-400">{ind.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4.4 How It Works ────────────────────────────────────────────────────────

function CyberHow() {
  const steps = [
    { num: "01", title: "You complete the intake form below (5 minutes)", desc: "We learn about your business size, industry, and current setup." },
    { num: "02", title: "We run your free security assessment", desc: "We scan your public assets and check for exposed credentials. You get a real report — not a sales deck." },
    { num: "03", title: "We recommend the right plan", desc: "Based on your actual risk profile — not a sales script." },
    { num: "04", title: "We deploy your protection in 48 hours", desc: "We deploy your monitoring, email security, and training automatically using enterprise-grade security platforms — no action required from your team." },
    { num: "05", title: "You get a plain-English report every month", desc: "What was blocked, what was caught, what your team\u2019s training scores look like. Automated. No jargon." },
  ];

  return (
    <section id="cyber-how" className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              How It Works
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Up and Running in 48 Hours
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 80}>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#7DE3E6]/30 hover:bg-white/[0.05]">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10 text-sm font-bold text-[#7DE3E6]">
                  {s.num}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
                  <p className="text-sm text-slate-400">{s.desc}</p>
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
      title: "RGV — 30 Years and Counting",
      desc: "Deep roots in South Texas — we know this market, these businesses, and these communities because we\u2019ve lived and worked here for decades. Family-owned medical offices, trades companies, law firms, logistics operators. We\u2019re not a faceless SaaS platform. We\u2019re your neighbors.",
    },
    {
      icon: Wrench,
      title: "Systems First",
      desc: "We already build the operational infrastructure that runs your business. Protecting it is the natural next step. Our security service uses the same API-first, automation-heavy approach as everything else we build.",
    },
    {
      icon: Brain,
      title: "Behavior Science Behind the Training",
      desc: "Our founder\u2019s I-O Psychology background means your security training is designed using real behavior change science — spaced repetition, threat appraisal theory, psychological safety — not compliance checkbox slides.",
      link: { label: "Learn about our science \u2192", href: "/our-science" },
    },
    {
      icon: KeyRound,
      title: "You Own It",
      desc: "No vendor lock-in. Monthly plans, cancel anytime. If you leave, we hand you full documentation of every protection we put in place. You are not renting security — you are building it.",
    },
    {
      icon: ShieldCheck,
      title: "Up to $1M Breach Response Coverage",
      desc: "Growth and Shield plan clients receive up to $1 million in breach response expense coverage through our security partner warranty — so you\u2019re protected even if something gets through. This is enterprise-level protection at small business pricing.",
    },
  ];

  return (
    <section id="cyber-trust" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              Why Trust Us
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              The Same Team That Automates Your Operations Now Protects Them
            </h2>
          </div>
        </FadeIn>

        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2">
          {points.map((pt, i) => (
            <FadeIn key={pt.title} delay={i * 70}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7DE3E6]/30 hover:bg-white/[0.05] hover:shadow-[0_8px_32px_rgba(125,227,230,0.07)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(90deg, transparent, rgba(125,227,230,0.9), transparent)" }} />
                <div className="relative mb-4">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#7DE3E6]/20 bg-[#7DE3E6]/10">
                    <pt.icon className="h-5 w-5 text-[#7DE3E6]" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{pt.title}</h3>
                <p className="text-sm text-slate-400">{pt.desc}</p>
                {pt.link && (
                  <a href={pt.link.href} className="mt-3 inline-block text-sm font-medium text-[#7DE3E6] transition-colors hover:text-white">
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
              ? "border-[#7DE3E6] bg-[#7DE3E6]/10 text-[#7DE3E6]"
              : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
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
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#7DE3E6]/30 bg-[#7DE3E6]/10">
                <ShieldCheck className="h-8 w-8 text-[#7DE3E6]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">Your security score is on its way.</h2>
              <p className="mb-6 text-slate-400">
                We&apos;ll send your personalized risk summary to{" "}
                <span className="font-medium text-white">{form.email}</span> within 24 business hours.
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
              <p className="mb-6 text-xs text-slate-500">
                You&apos;re also subscribed to SMB Cyber Shield Weekly — free threat briefings every Tuesday. No spam, ever.
              </p>
              <a href="#cyber-plans" className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]">
                See our cybersecurity plans <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="cyber-intake" className="relative px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-8 h-96 w-96 rounded-full bg-[#7B2FBE] opacity-[0.12] blur-[110px]" />
        <div className="absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-[#7DE3E6] opacity-[0.08] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <FadeIn>
          <div className="mb-8 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7DE3E6]/20 bg-[#7DE3E6]/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7DE3E6]">
              Free Assessment
            </span>
            <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
              {step === 3 ? "Where should we send your results?" : "How protected is your business?"}
            </h2>
            {step !== 3 && (
              <p className="text-slate-400">5 quick questions. We&apos;ll show you where your biggest risks are.</p>
            )}
          </div>
        </FadeIn>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                s === step ? "bg-[#7DE3E6] text-[#0B1220]" : s < step ? "bg-[#7DE3E6]/20 text-[#7DE3E6]" : "bg-white/10 text-slate-500"
              }`}>{s}</div>
              {s < 3 && <div className={`h-0.5 w-8 rounded-full transition-colors ${s < step ? "bg-[#7DE3E6]/40" : "bg-white/10"}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-slate-500">Step {step} of 3</span>
        </div>

        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-white">How many people work at your company?</label>
                  <CardSelect
                    options={[{ value: "1-5", label: "1\u20135" }, { value: "6-20", label: "6\u201320" }, { value: "21-50", label: "21\u201350" }, { value: "50+", label: "50+" }]}
                    value={form.companySize}
                    onChange={(val) => updateField("companySize", val)}
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-white">What industry are you in?</label>
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
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC] disabled:cursor-not-allowed disabled:opacity-40">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-white">Do your employees receive cybersecurity training?</label>
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
                  <label className="mb-3 block text-sm font-medium text-white">Do you have multi-factor authentication (MFA) enabled?</label>
                  <p className="mb-3 text-xs text-slate-500">A second verification step when logging in — like a code texted to your phone.</p>
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
                  <label className="mb-3 block text-sm font-medium text-white">Has your business ever had a security incident?</label>
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
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">&larr; Back</button>
                  <button type="button" disabled={!canAdvance2()} onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC] disabled:cursor-not-allowed disabled:opacity-40">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="cyber-name" className="mb-1.5 block text-sm font-medium text-white">Your name <span className="text-red-400">*</span></label>
                  <input id="cyber-name" type="text" required value={form.name} onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#7DE3E6]/50" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="cyber-biz" className="mb-1.5 block text-sm font-medium text-white">Business name <span className="text-red-400">*</span></label>
                  <input id="cyber-biz" type="text" required value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#7DE3E6]/50" placeholder="Business name" />
                </div>
                <div>
                  <label htmlFor="cyber-email" className="mb-1.5 block text-sm font-medium text-white">Email address <span className="text-red-400">*</span></label>
                  <input id="cyber-email" type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#7DE3E6]/50" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="cyber-phone" className="mb-1.5 block text-sm font-medium text-white">Phone <span className="text-xs text-slate-500">(optional — only if you&apos;d like a follow-up call)</span></label>
                  <input id="cyber-phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#7DE3E6]/50" placeholder="Phone number (optional)" />
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={form.newsletter} onChange={(e) => updateField("newsletter", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/[0.04] accent-[#7DE3E6]" />
                  <div>
                    <span className="text-sm text-slate-300">Subscribe me to SMB Cyber Shield Weekly — free cybersecurity threat briefings for South Texas businesses, every Tuesday.</span>
                    <p className="mt-0.5 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
                  </div>
                </label>

                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
                )}

                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">&larr; Back</button>
                  <button type="button" disabled={submitting} onClick={handleSubmit}
                    className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC] disabled:cursor-not-allowed disabled:opacity-60">
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
  { q: "Do I need to install anything on my computers?", a: "Minimal setup required. For Growth and Shield plans, we deploy lightweight endpoint agents \u2014 5 minutes per computer, invisible during normal use. The Starter plan requires no device installation at all." },
  { q: "What if I already have antivirus?", a: "Antivirus catches about 30% of modern threats. The other 70% \u2014 phishing, credential theft, dark web exposure, social engineering \u2014 antivirus never sees. We cover the full threat landscape." },
  { q: "Is this a long-term contract?", a: "No contracts. Monthly billing, cancel anytime. We\u2019re confident you\u2019ll stay because the service works \u2014 not because we\u2019ve locked you in." },
  { q: "What industries do you focus on?", a: "Medical and dental offices (HIPAA), law firms and accounting practices, construction companies, logistics operations, and professional services firms across the Rio Grande Valley." },
  { q: "How quickly can you respond if something happens?", a: "Starter: next business day. Growth: same day. Shield: 2-hour response SLA. Automated monitoring and alerts run 24/7 for all plans." },
  { q: "What is the free security assessment?", a: "We scan your public-facing assets, check your domain for email spoofing vulnerabilities, and run your email addresses against known breach databases. You get a real report showing what we found. No obligation to buy anything." },
  { q: "How is your training different from what other MSPs offer?", a: "Most security training is compliance-driven \u2014 click through slides, check the box. Our founder holds a graduate degree in Industrial-Organizational Psychology and designs training programs using actual behavior change science: spaced repetition, psychological safety, threat appraisal theory, and industry-specific scenarios. The goal isn\u2019t passing a quiz. It\u2019s changing what your employees do when a real phishing email lands in their inbox." },
];

function CyberFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="cyber-faq" className="bg-[#0E1A2B]/60 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Common Questions</h2>
          </div>
        </FadeIn>
        <div className="space-y-2.5">
          {CYBER_FAQS.map((faq, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all hover:border-white/20">
                <button className="flex w-full items-center justify-between px-6 py-5 text-left" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i} aria-controls={`cyber-faq-panel-${i}`}>
                  <span className="pr-4 text-sm font-medium text-white sm:text-base">{faq.q}</span>
                  <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#7DE3E6] transition-transform duration-200 ${openIdx === i ? "rotate-45" : ""}`}>
                    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
                  </span>
                </button>
                {openIdx === i && (
                  <div id={`cyber-faq-panel-${i}`} className="px-6 pb-5">
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

// ─── 4.8 Footer CTA ─────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#060D18" }}>
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Know Where You Stand?</h2>
          <p className="mb-8 text-slate-400">The free assessment takes 5 minutes. The report tells you exactly what&apos;s exposed. No obligation.</p>
          <a href="#cyber-intake" className="glow-teal inline-flex items-center gap-2 rounded-lg bg-[#7DE3E6] px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all hover:scale-[1.02] hover:bg-[#5BC8CC]">
            Get my free assessment <ArrowRight className="h-4 w-4" />
          </a>
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
              <Image src="/rebelminds-icon.png" alt="Rebel Minds Ops" width={28} height={28} className="h-7 w-7 object-contain" />
              <span className="text-sm font-bold tracking-wide text-white">Rebel Minds OPS</span>
            </div>
            <span className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Rebel Minds OPS LLC. All rights reserved.</span>
          </div>
          <nav className="flex flex-col flex-wrap items-center justify-center gap-3 text-sm text-slate-400 sm:items-end">
            <div className="mb-2 flex gap-5">
              <a href="/" className="transition-colors hover:text-white">Home</a>
              <a href="/our-science" className="transition-colors hover:text-white">Our Science</a>
              <a href="/cybersecurity" className="transition-colors hover:text-white">Cybersecurity</a>
            </div>
            <a href="#cyber-intake" className="font-semibold text-[#7DE3E6] transition-colors hover:text-white">Free Security Assessment</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Root ───────────────────────────────────────────────────────────────

export default function CybersecurityPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B1220]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[#7DE3E6]/[0.04] blur-[180px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-[500px] w-[600px] rounded-full bg-[#7DE3E6]/[0.025] blur-[140px]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.032]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }} />
      <div className="relative z-10">
        <Nav />
        <CyberHero />
        <ThreatFlow />
        <SectionDivider />
        <CyberWhy />
        <SectionDivider />
        <RGVIndustries />
        <SectionDivider />
        <CyberPlans />
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
        <Footer />
      </div>
    </div>
  );
}
