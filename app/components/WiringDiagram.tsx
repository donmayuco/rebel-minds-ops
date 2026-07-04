"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated ExpenseOps(TM) schematic — the live system wired at J. Peña Construction.
 * A receipt travels WhatsApp -> n8n -> OpenAI / Airtable / QuickBooks -> Google Sheets.
 * Animation is gated to scroll-into-view; under prefers-reduced-motion (handled in
 * globals.css) the wires read as fully drawn and the packets/blooms are hidden, so the
 * static state is a complete, legible diagram.
 */
export default function WiringDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const wire = (delay: "wd1" | "wd2" | "wd3") =>
    visible ? `wire ${delay}` : undefined;

  return (
    <div className="border-t" style={{ borderColor: "rgba(232,238,240,0.10)" }}>
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6" id="case-studies">
        <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
          The Wiring Diagram
        </p>
        <h2 className="serif mt-3 text-3xl font-medium text-[#e8eef0] sm:text-4xl">
          We don&rsquo;t sell a stack. We wire yours.
        </h2>
        <p className="mt-3 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#8fa3aa]">
          Below is the actual system running at J. Peña Construction, drawn like the spec
          it came from, and animated: watch one receipt travel from the crew&rsquo;s pocket
          to reconciled books. The dim wires leaving the frame are the rest of the catalog:
          anything with an API, connected when the operation calls for it.
        </p>
      </div>

      <div
        ref={ref}
        className={`relative pt-4 ${visible ? "" : "diagram-idle"}`}
      >
        <svg
          viewBox="0 0 1120 410"
          style={{ width: "100%", display: "block" }}
          fontFamily="var(--font-plex-mono), monospace"
          role="img"
          aria-label="ExpenseOps schematic: a receipt travels from WhatsApp through n8n to OpenAI, Airtable and QuickBooks, then to Google Sheets, recovering 8 to 10 hours a week."
        >
          {/* dim catalog wires trailing off-frame */}
          <g opacity="0.32">
            <path d="M 130 46 C 60 46, 40 30, -10 24" stroke="#8fa3aa" fill="none" strokeWidth="1" />
            <rect x="130" y="26" width="104" height="40" rx="5" fill="#13242b" stroke="rgba(232,238,240,0.2)" />
            <text x="182" y="50" textAnchor="middle" fill="#8fa3aa" fontSize="12" fontFamily="var(--font-inter), sans-serif">Twilio</text>

            <path d="M 986 306 C 1060 306, 1080 320, 1130 326" stroke="#8fa3aa" fill="none" strokeWidth="1" />
            <rect x="882" y="286" width="104" height="40" rx="5" fill="#13242b" stroke="rgba(232,238,240,0.2)" />
            <text x="934" y="310" textAnchor="middle" fill="#8fa3aa" fontSize="12" fontFamily="var(--font-inter), sans-serif">Stripe</text>

            <path d="M 312 384 C 312 400, 312 405, 312 420" stroke="#8fa3aa" fill="none" strokeWidth="1" />
            <rect x="260" y="344" width="104" height="40" rx="5" fill="#13242b" stroke="rgba(232,238,240,0.2)" />
            <text x="312" y="368" textAnchor="middle" fill="#8fa3aa" fontSize="12" fontFamily="var(--font-inter), sans-serif">Zoho</text>

            <path d="M 1000 46 C 1060 46, 1080 40, 1130 34" stroke="#8fa3aa" fill="none" strokeWidth="1" />
            <rect x="896" y="26" width="104" height="40" rx="5" fill="#13242b" stroke="rgba(232,238,240,0.2)" />
            <text x="948" y="50" textAnchor="middle" fill="#8fa3aa" fontSize="12" fontFamily="var(--font-inter), sans-serif">Supabase</text>

            <path d="M -10 300 C 40 300, 60 296, 100 290" stroke="#8fa3aa" fill="none" strokeWidth="1" />
            <path d="M 1130 160 C 1090 160, 1075 164, 1040 168" stroke="#8fa3aa" fill="none" strokeWidth="1" />
          </g>

          {/* live wires */}
          <g stroke="#7fd7e2" strokeWidth="1.2" fill="none" opacity="0.55">
            <path className={wire("wd1")} pathLength="1" d="M 210 205 L 330 205" />
            <path className={wire("wd2")} pathLength="1" d="M 490 205 C 530 205, 540 92, 588 92" />
            <path className={wire("wd2")} pathLength="1" d="M 490 205 L 588 205" />
            <path className={wire("wd2")} pathLength="1" d="M 490 205 C 530 205, 540 318, 588 318" />
            <path className={wire("wd3")} pathLength="1" d="M 748 205 C 790 205, 800 152, 848 152" />
          </g>
          <g fill="#7fd7e2" opacity="0.8">
            <circle cx="330" cy="205" r="2.6" />
            <circle cx="588" cy="92" r="2.6" />
            <circle cx="588" cy="205" r="2.6" />
            <circle cx="588" cy="318" r="2.6" />
            <circle cx="848" cy="152" r="2.6" />
          </g>

          {/* wire labels */}
          <g fill="#8fa3aa" fontSize="9.5" letterSpacing="0.08em">
            <text x="270" y="194" textAnchor="middle">RECEIPT PHOTO</text>
            <text x="537" y="128" textAnchor="middle">VENDOR · AMOUNT · DATE</text>
            <text x="537" y="256" textAnchor="middle">CATEGORIZED</text>
            <text x="800" y="166" textAnchor="middle">NIGHTLY</text>
          </g>

          {/* WhatsApp */}
          <g>
            <rect className="nodeglow" x="50" y="178" width="160" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom)" opacity="0">
              {visible && <animate attributeName="opacity" begin="pk1.begin" dur="0.8s" values="0;0.75;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="50" y="178" width="160" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="pk1.begin" dur="0.8s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="70" cy="198" r="3.5" fill="#25D366" />
            <text x="84" y="203" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">WhatsApp</text>
            <text x="70" y="221" fill="#8fa3aa" fontSize="9">FROM THE CREW&rsquo;S POCKET</text>
          </g>
          {/* n8n */}
          <g>
            <rect className="nodeglow" x="330" y="178" width="160" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom)" opacity="0">
              {visible && <animate attributeName="opacity" begin="pk1.end" dur="0.9s" values="0;0.85;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="330" y="178" width="160" height="54" rx="6" fill="#13242b" stroke="rgba(127,215,226,0.45)">
              {visible && <animate attributeName="stroke" begin="pk1.end" dur="0.9s" values="rgba(127,215,226,0.45);#7fd7e2;rgba(127,215,226,0.45)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="350" cy="198" r="3.5" fill="#EA5C0A" />
            <text x="364" y="203" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">n8n</text>
            <text x="350" y="221" fill="#8fa3aa" fontSize="9">ORCHESTRATION</text>
          </g>
          {/* OpenAI */}
          <g>
            <rect className="nodeglow" x="588" y="65" width="160" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom)" opacity="0">
              {visible && <animate attributeName="opacity" begin="pk2.end" dur="0.8s" values="0;0.75;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="588" y="65" width="160" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="pk2.end" dur="0.8s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="608" cy="85" r="3.5" fill="#10A37F" />
            <text x="622" y="90" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">OpenAI</text>
            <text x="608" y="108" fill="#8fa3aa" fontSize="9">READS THE RECEIPT</text>
          </g>
          {/* Airtable */}
          <g>
            <rect className="nodeglow" x="588" y="178" width="160" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom)" opacity="0">
              {visible && <animate attributeName="opacity" begin="pk3.end" dur="0.8s" values="0;0.75;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="588" y="178" width="160" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="pk3.end" dur="0.8s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="608" cy="198" r="3.5" fill="#FCB400" />
            <text x="622" y="203" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Airtable</text>
            <text x="608" y="221" fill="#8fa3aa" fontSize="9">OWNER&rsquo;S DASHBOARD</text>
          </g>
          {/* QuickBooks */}
          <g>
            <rect className="nodeglow" x="588" y="291" width="160" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom)" opacity="0">
              {visible && <animate attributeName="opacity" begin="pk3.end" dur="0.8s" values="0;0.75;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="588" y="291" width="160" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="pk3.end" dur="0.8s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="608" cy="311" r="3.5" fill="#2CA01C" />
            <text x="622" y="316" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">QuickBooks</text>
            <text x="608" y="334" fill="#8fa3aa" fontSize="9">BOOKS THAT RECONCILE</text>
          </g>
          {/* Google Sheets */}
          <g>
            <rect className="nodeglow" x="848" y="125" width="160" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom)" opacity="0">
              {visible && <animate attributeName="opacity" begin="pk4.end" dur="1s" values="0;0.9;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="848" y="125" width="160" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="pk4.end" dur="1s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="868" cy="145" r="3.5" fill="#0F9D58" />
            <text x="882" y="150" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Google Sheets</text>
            <text x="868" y="168" fill="#8fa3aa" fontSize="9">THE FRIDAY REPORT</text>
          </g>

          {/* outcome annotation */}
          <g opacity="0.5">
            {visible && <animate id="outg" attributeName="opacity" begin="pk4.end+0.15s" dur="1.8s" values="0.5;1;1;0.7" keyTimes="0;0.15;0.8;1" />}
            <text x="848" y="240" fill="#7fd7e2" fontSize="11" letterSpacing="0.1em">RESULT: 8&ndash;10 HRS/WK</text>
            <text x="848" y="256" fill="#8fa3aa" fontSize="9" letterSpacing="0.08em">BACK IN SANDRA&rsquo;S WEEK</text>
          </g>

          {/* the receipt, traveling */}
          {visible && (
            <>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="pk1" begin="1.2s;outg.end+2.2s" dur="0.9s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 210 205 L 330 205" />
                <animate attributeName="opacity" begin="pk1.begin" dur="0.9s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="pk2" begin="pk1.end+0.3s" dur="0.9s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 490 205 C 530 205, 540 92, 588 92" />
                <animate attributeName="opacity" begin="pk2.begin" dur="0.9s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="pk3" begin="pk1.end+0.3s" dur="0.9s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 490 205 L 588 205" />
                <animate attributeName="opacity" begin="pk3.begin" dur="0.9s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion begin="pk1.end+0.3s" dur="0.9s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 490 205 C 530 205, 540 318, 588 318" />
                <animate attributeName="opacity" begin="pk3.begin" dur="0.9s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="pk4" begin="pk3.end+0.3s" dur="0.8s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 748 205 C 790 205, 800 152, 848 152" />
                <animate attributeName="opacity" begin="pk4.begin" dur="0.8s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
            </>
          )}

          {/* edge fades */}
          <rect x="0" y="0" width="46" height="410" fill="url(#fadeL)" />
          <rect x="1074" y="0" width="46" height="410" fill="url(#fadeR)" />
          <defs>
            <filter id="bloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <linearGradient id="fadeL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0e1b21" />
              <stop offset="1" stopColor="#0e1b21" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="fadeR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0e1b21" stopOpacity="0" />
              <stop offset="1" stopColor="#0e1b21" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2.5 px-4 pt-1.5 sm:px-6">
          <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa3aa]">
            ExpenseOps&trade; · as wired for J. Peña Construction
          </span>
          <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa3aa]">
            Your operation gets its own diagram
          </span>
        </div>
      </div>
    </div>
  );
}
