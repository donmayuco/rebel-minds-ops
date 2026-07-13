"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export default function SiteFooter() {
  return (
    <footer
      className="border-t px-4 py-10 sm:px-6"
      style={{ borderColor: "rgba(233,237,244,0.10)" }}
    >
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
              <span className="text-sm font-semibold tracking-wide text-[#e9edf4]">
                REBEL MINDS <span className="text-[#7fd7e2]">OPS</span>
              </span>
            </div>
            <span className="text-sm text-[#8fa0b3]">
              © {new Date().getFullYear()} Rebel Minds OPS LLC. All rights reserved.
            </span>
            <span className="text-xs text-[#8fa0b3]">
              Founded by Mario Arredondo, M.A., Industrial &amp; Organizational
              Psychology. The science behind the systems lives at{" "}
              <a
                href="https://rebelminds.ai"
                target="_blank"
                rel="noopener"
                className="text-[#8fa0b3] underline-offset-2 transition-colors hover:text-[#e9edf4] hover:underline"
              >
                rebelminds.ai
              </a>
              .
            </span>
            <div className="mt-2 space-y-1 text-sm text-[#8fa0b3]">
              <p>
                <a href="tel:+19565204123" className="transition-colors hover:text-[#e9edf4]">
                  (956) 520-4123
                </a>
              </p>
            </div>
          </div>
          <nav className="flex flex-col flex-wrap items-center justify-center gap-3 text-sm text-[#8fa0b3] sm:items-end">
            <div className="mb-2 flex flex-wrap justify-center gap-5">
              <a href="/" className="transition-colors hover:text-[#e9edf4]">Home</a>
              <a href="/ai-consulting" className="transition-colors hover:text-[#e9edf4]">AI Consulting</a>
              <a href="/our-science" className="transition-colors hover:text-[#e9edf4]">Our Science</a>
              <a href="/healthcare" className="transition-colors hover:text-[#e9edf4]">Healthcare</a>
              <a href="/cybersecurity" className="transition-colors hover:text-[#e9edf4]">Security Workshops</a>
              <a href="/matrix" className="transition-colors hover:text-[#e9edf4]">Impact vs. Risk Matrix</a>
              <a href="/privacy" className="transition-colors hover:text-[#e9edf4]">Privacy</a>
            </div>
            <a
              href="/#book"
              className="border-b border-[#7fd7e2] pb-0.5 font-medium text-[#7fd7e2] transition-colors hover:text-[#e9edf4]"
              onClick={() => trackEvent("CTA_Click", { location: "footer", cta: "Free Ops Scan" })}
            >
              Get a Free Ops Scan
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
