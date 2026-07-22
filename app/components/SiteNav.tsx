"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const LINKS_BEFORE = [
  { label: "AI Consulting", href: "/ai-consulting", match: "/ai-consulting" },
  { label: "Systems", href: "/#what-we-build", match: null },
] as const;

const HEALTH_LINKS = [
  { label: "Healthcare Systems", href: "/healthcare", match: "/healthcare" },
  { label: "Practice Experience", href: "/practice", match: "/practice" },
  {
    label: "Patient Experience System",
    href: "/practice/experience-system",
    match: "/practice/experience-system",
  },
] as const;

const LINKS_AFTER = [
  { label: "Our Science", href: "/our-science", match: "/our-science" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [healthOpen, setHealthOpen] = useState(false);

  const healthActive = HEALTH_LINKS.some((l) => pathname === l.match);

  const desktopLink = (link: { label: string; href: string; match: string | null }) => {
    const active = link.match !== null && pathname === link.match;
    return (
      <a
        key={link.label}
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`text-sm transition-colors ${
          active ? "text-[#e9edf4]" : "text-[#8fa0b3] hover:text-[#e9edf4]"
        }`}
        style={
          active
            ? { borderBottom: "1px solid #7fd7e2", paddingBottom: "2px" }
            : undefined
        }
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b bg-[#0c131e]"
      style={{ borderColor: "rgba(233,237,244,0.10)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Brand lockup */}
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/rebelminds-icon.png"
              alt="Rebel Minds Ops"
              width={56}
              height={56}
              priority
              className="h-11 w-11 rounded-md object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-[16px] font-semibold tracking-tight text-[#e9edf4]">
                Rebel Minds <span className="text-[#7fd7e2]">OPS</span>
              </span>
              <span className="text-[11px] text-[#8fa0b3]">
                Operational Systems &amp; Automation
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {LINKS_BEFORE.map(desktopLink)}

            {/* Healthcare dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHealthOpen(true)}
              onMouseLeave={() => setHealthOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  healthActive ? "text-[#e9edf4]" : "text-[#8fa0b3] hover:text-[#e9edf4]"
                }`}
                style={
                  healthActive
                    ? { borderBottom: "1px solid #7fd7e2", paddingBottom: "2px" }
                    : undefined
                }
                onClick={() => setHealthOpen(!healthOpen)}
                aria-expanded={healthOpen}
                aria-haspopup="true"
              >
                Healthcare
                <Chevron open={healthOpen} />
              </button>
              {healthOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
                  role="menu"
                >
                  <div
                    className="overflow-hidden rounded-xl border bg-[#0c131e] py-2 shadow-xl"
                    style={{ borderColor: "rgba(233,237,244,0.12)" }}
                  >
                    {HEALTH_LINKS.map((link) => {
                      const active = pathname === link.match;
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          role="menuitem"
                          aria-current={active ? "page" : undefined}
                          className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                            active ? "text-[#7fd7e2]" : "text-[#8fa0b3] hover:text-[#e9edf4]"
                          }`}
                          onClick={() => setHealthOpen(false)}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {LINKS_AFTER.map(desktopLink)}
            <a
              href="/#book"
              className="border-b border-[#7fd7e2] pb-0.5 text-sm font-medium text-[#7fd7e2] transition-colors hover:text-[#e9edf4]"
              onClick={() =>
                trackEvent("CTA_Click", {
                  location: "nav_desktop",
                  cta: "Free Ops Scan",
                })
              }
            >
              Free Ops Scan
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-3 text-[#8fa0b3] transition-colors hover:text-[#e9edf4] md:hidden"
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
        <div
          id="mobile-navigation"
          className="border-t bg-[#0c131e] px-4 py-4 md:hidden"
          style={{ borderColor: "rgba(233,237,244,0.10)" }}
        >
          <div className="flex flex-col gap-1">
            {LINKS_BEFORE.map((link) => {
              const active = link.match !== null && pathname === link.match;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                    active ? "text-[#7fd7e2]" : "text-[#8fa0b3] hover:text-[#e9edf4]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}

            <span className="mono px-3 pb-1 pt-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#5f6e85]">
              Healthcare
            </span>
            {HEALTH_LINKS.map((link) => {
              const active = pathname === link.match;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg py-2.5 pl-6 pr-3 text-sm transition-colors hover:bg-white/5 ${
                    active ? "text-[#7fd7e2]" : "text-[#8fa0b3] hover:text-[#e9edf4]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}

            {LINKS_AFTER.map((link) => {
              const active = link.match !== null && pathname === link.match;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`mt-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                    active ? "text-[#7fd7e2]" : "text-[#8fa0b3] hover:text-[#e9edf4]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href="/#book"
                className="block rounded-lg bg-[#7fd7e2] px-4 py-2.5 text-center text-sm font-semibold text-[#0c131e]"
                onClick={() => {
                  trackEvent("CTA_Click", { location: "nav_mobile", cta: "Free Ops Scan" });
                  setOpen(false);
                }}
              >
                Free Ops Scan
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
