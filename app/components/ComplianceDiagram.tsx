"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HIPAA compliance schematic — a patient message crosses the BAA-covered boundary,
 * is encrypted at the door, and PHI never crosses back out.
 *
 * The named vendors (Twilio, Aptible, Amazon Bedrock) are ILLUSTRATIVE. This is a
 * reference architecture drawn to explain the shape of a compliant build, not a fixed
 * stack. Animation is scroll-gated; reduced-motion (globals.css) freezes wires drawn
 * and hides packets/blooms for a complete static diagram.
 */
export default function ComplianceDiagram() {
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
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
          The Compliance Diagram
        </p>
        <h2 className="serif mt-3 text-3xl font-medium text-[#e8eef0] sm:text-4xl">
          Airtight has a shape. We draw it before we build it.
        </h2>
        <p className="mt-3 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#8fa3aa]">
          Same schematic language, different argument: the dashed line is the BAA-covered
          boundary. Watch the patient&rsquo;s message get encrypted at the door; nothing
          carrying PHI ever crosses back out.
        </p>
      </div>

      <div ref={ref} className={`relative pt-4 ${visible ? "" : "diagram-idle"}`}>
        <svg
          viewBox="0 0 1120 430"
          style={{ width: "100%", display: "block" }}
          fontFamily="var(--font-plex-mono), monospace"
          role="img"
          aria-label="HIPAA compliance schematic: a patient message travels through Twilio, Aptible and an AI summary layer to the front desk view, all inside a BAA-covered boundary, so PHI never crosses back out."
        >
          {/* BAA boundary */}
          <rect x="258" y="28" width="822" height="372" rx="10" fill="none" stroke="rgba(127,215,226,0.35)" strokeWidth="1.2" strokeDasharray="7 6" />
          <text x="282" y="54" fill="#7fd7e2" fontSize="10" letterSpacing="0.14em" opacity="0.85">BAA-COVERED BOUNDARY · PHI STAYS INSIDE</text>

          {/* wires */}
          <g stroke="#7fd7e2" strokeWidth="1.2" fill="none" opacity="0.55">
            <path className={wire("wd1")} pathLength="1" d="M 190 217 L 300 217" />
            <path className={wire("wd2")} pathLength="1" d="M 470 217 L 560 217" />
            <path className={wire("wd2")} pathLength="1" d="M 730 217 C 772 217, 780 107, 820 107" />
            <path className={wire("wd3")} pathLength="1" d="M 730 217 C 772 217, 780 307, 820 307" />
          </g>
          <g fill="#7fd7e2" opacity="0.8">
            <circle cx="300" cy="217" r="2.6" />
            <circle cx="560" cy="217" r="2.6" />
            <circle cx="820" cy="107" r="2.6" />
            <circle cx="820" cy="307" r="2.6" />
          </g>

          {/* wire labels */}
          <g fill="#8fa3aa" fontSize="9.5" letterSpacing="0.08em">
            <text x="245" y="204" textAnchor="middle">TLS IN TRANSIT</text>
            <text x="515" y="204" textAnchor="middle">ENCRYPTED</text>
            <text x="782" y="140" textAnchor="middle">AI SUMMARY · BAA</text>
            <text x="782" y="282" textAnchor="middle">ROLE-BASED ACCESS</text>
          </g>

          {/* lock at the boundary crossing */}
          <g className="nodeglow" opacity="0">
            {visible && <animate id="hlk" attributeName="opacity" begin="hk1.begin+0.35s" dur="0.8s" values="0;1;0" keyTimes="0;0.3;1" />}
            <rect x="251" y="212" width="14" height="11" rx="2" fill="#0e1b21" stroke="#7fd7e2" strokeWidth="1.4" />
            <path d="M 254 212 v-3 a4 4 0 0 1 8 0 v3" fill="none" stroke="#7fd7e2" strokeWidth="1.4" />
          </g>

          {/* Patient (outside the line) */}
          <g>
            <rect className="nodeglow" x="40" y="190" width="150" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom2)" opacity="0">
              {visible && <animate attributeName="opacity" begin="hk1.begin" dur="0.8s" values="0;0.75;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="40" y="190" width="150" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)" />
            <circle cx="60" cy="210" r="3.5" fill="#8fa3aa" />
            <text x="74" y="215" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Patient</text>
            <text x="60" y="233" fill="#8fa3aa" fontSize="9">TEXTS THE PRACTICE</text>
          </g>
          {/* Twilio */}
          <g>
            <rect className="nodeglow" x="300" y="190" width="170" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom2)" opacity="0">
              {visible && <animate attributeName="opacity" begin="hk1.end" dur="0.8s" values="0;0.8;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="300" y="190" width="170" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="hk1.end" dur="0.8s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="320" cy="210" r="3.5" fill="#F22F46" />
            <text x="334" y="215" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Twilio</text>
            <text x="320" y="233" fill="#8fa3aa" fontSize="9">HIPAA-ELIGIBLE MESSAGING · BAA</text>
          </g>
          {/* Aptible */}
          <g>
            <rect className="nodeglow" x="560" y="190" width="170" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom2)" opacity="0">
              {visible && <animate attributeName="opacity" begin="hk2.end" dur="0.8s" values="0;0.8;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="560" y="190" width="170" height="54" rx="6" fill="#13242b" stroke="rgba(127,215,226,0.45)">
              {visible && <animate attributeName="stroke" begin="hk2.end" dur="0.8s" values="rgba(127,215,226,0.45);#7fd7e2;rgba(127,215,226,0.45)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="580" cy="210" r="3.5" fill="#7fd7e2" />
            <text x="594" y="215" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Aptible</text>
            <text x="580" y="233" fill="#8fa3aa" fontSize="9">HOSTING · AES-256 AT REST · AUDIT LOGS</text>
          </g>
          {/* Amazon Bedrock */}
          <g>
            <rect className="nodeglow" x="820" y="80" width="180" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom2)" opacity="0">
              {visible && <animate attributeName="opacity" begin="hk3.end" dur="0.8s" values="0;0.8;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="820" y="80" width="180" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="hk3.end" dur="0.8s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="840" cy="100" r="3.5" fill="#FF9900" />
            <text x="854" y="105" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Amazon Bedrock</text>
            <text x="840" y="123" fill="#8fa3aa" fontSize="9">HIPAA-ELIGIBLE AI · BAA</text>
          </g>
          {/* Front Desk View */}
          <g>
            <rect className="nodeglow" x="820" y="280" width="180" height="54" rx="6" fill="none" stroke="#7fd7e2" strokeWidth="2.5" filter="url(#bloom2)" opacity="0">
              {visible && <animate attributeName="opacity" begin="hk4.end" dur="1s" values="0;0.9;0" keyTimes="0;0.3;1" />}
            </rect>
            <rect x="820" y="280" width="180" height="54" rx="6" fill="#13242b" stroke="rgba(232,238,240,0.18)">
              {visible && <animate attributeName="stroke" begin="hk4.end" dur="1s" values="rgba(232,238,240,0.18);#7fd7e2;rgba(232,238,240,0.18)" keyTimes="0;0.3;1" />}
            </rect>
            <circle cx="840" cy="300" r="3.5" fill="#0F9D58" />
            <text x="854" y="305" fill="#e8eef0" fontSize="13.5" fontWeight="600" fontFamily="var(--font-inter), sans-serif">Front Desk View</text>
            <text x="840" y="323" fill="#8fa3aa" fontSize="9">INTAKE DONE BEFORE THE FIRST RING</text>
          </g>

          {/* closing annotation */}
          <g opacity="0.5">
            {visible && <animate id="hout" attributeName="opacity" begin="hk4.end+0.15s" dur="1.8s" values="0.5;1;1;0.7" keyTimes="0;0.15;0.8;1" />}
            <text x="560" y="376" fill="#7fd7e2" fontSize="11" letterSpacing="0.1em">PHI NEVER CROSSED BACK OUT</text>
            <text x="560" y="392" fill="#8fa3aa" fontSize="9" letterSpacing="0.08em">EVERY VENDOR INSIDE THE LINE SIGNS A BAA</text>
          </g>

          {/* packets */}
          {visible && (
            <>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="hk1" begin="1.4s;hout.end+2.4s" dur="0.9s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 190 217 L 300 217" />
                <animate attributeName="opacity" begin="hk1.begin" dur="0.9s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="hk2" begin="hk1.end+0.25s" dur="0.7s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 470 217 L 560 217" />
                <animate attributeName="opacity" begin="hk2.begin" dur="0.7s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="hk3" begin="hk2.end+0.25s" dur="0.8s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 730 217 C 772 217, 780 107, 820 107" />
                <animate attributeName="opacity" begin="hk3.begin" dur="0.8s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
              <circle className="packet" r="3.4" fill="#7fd7e2" opacity="0">
                <animateMotion id="hk4" begin="hk3.end+0.3s" dur="0.8s" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.3 0 0.2 1" path="M 730 217 C 772 217, 780 307, 820 307" />
                <animate attributeName="opacity" begin="hk4.begin" dur="0.8s" values="0;1;1;0" keyTimes="0;0.12;0.88;1" />
              </circle>
            </>
          )}

          <defs>
            <filter id="bloom2" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
        </svg>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2.5 px-4 pt-1.5 sm:px-6">
          <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa3aa]">
            Patient intake · reference architecture for HIPAA-aware practices
          </span>
          <span className="mono text-[0.66rem] uppercase tracking-[0.16em] text-[#8fa3aa]">
            Drawn for your practice before anything is built
          </span>
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <p className="max-w-[62ch] text-xs leading-relaxed text-[#6f858c]">
            Illustrative example. The vendors named above (Twilio, Aptible, Amazon Bedrock)
            are one reference architecture to show the shape of a compliant build. Your
            actual stack is scoped to your practice. If your business runs on something
            else, that&rsquo;s fine. We integrate; you own the keys.
          </p>
        </div>
      </div>
    </div>
  );
}
