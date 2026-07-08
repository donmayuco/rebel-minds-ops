"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const LINKS = [
  { label: "Systems", href: "/#what-we-build", match: null },
  { label: "Case Studies", href: "/#case-studies", match: null },
  { label: "Healthcare", href: "/healthcare", match: "/healthcare" },
  { label: "Practice Experience", href: "/practice", match: "/practice" },
  { label: "Security Workshops", href: "/cybersecurity", match: "/cybersecurity" },
  { label: "Our Science", href: "/our-science", match: "/our-science" },
] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            {LINKS.map((link) => {
              const active = link.match !== null && pathname === link.match;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition-colors ${
                    active
                      ? "text-[#e9edf4]"
                      : "text-[#8fa0b3] hover:text-[#e9edf4]"
                  }`}
                  style={
                    active
                      ? {
                          borderBottom: "1px solid #7fd7e2",
                          paddingBottom: "2px",
                        }
                      : undefined
                  }
                >
                  {link.label}
                </a>
              );
            })}
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
            {LINKS.map((link) => {
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
