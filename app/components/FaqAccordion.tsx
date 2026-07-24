"use client";
import { useEffect, useRef, useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * Single source of truth: the same items render the visible accordion AND the
 * FAQPage JSON-LD, so the human copy and the schema can never drift apart.
 * Copy source: 03-RMOps/IGOA-FAQ.md (Part B — public treatment).
 */
export function faqSchemaEntities(items: FaqItem[]) {
  return items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
}

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

export default function FaqAccordion({
  items,
  kicker,
  heading,
  intro,
  id = "faq",
  background,
}: {
  items: FaqItem[];
  kicker: string;
  heading: string;
  intro?: string;
  id?: string;
  background?: string;
}) {
  return (
    <section
      id={id}
      className="py-20"
      style={background ? { backgroundColor: background } : undefined}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <span className="mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
            {kicker}
          </span>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[26ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            {heading}
          </h2>
        </FadeIn>
        {intro ? (
          <FadeIn delay={140}>
            <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              {intro}
            </p>
          </FadeIn>
        ) : null}

        <FadeIn delay={180}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#e9edf41a]">
            {items.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className={`group bg-[#0c131e] ${i > 0 ? "border-t border-[#e9edf41a]" : ""}`}
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-4 px-6 py-5 transition-colors hover:bg-[#111a27] sm:px-8">
                  <span className="mono w-6 shrink-0 text-[0.8rem] font-medium text-[#7fd7e2]">
                    <span className="group-open:hidden">[+]</span>
                    <span className="hidden group-open:inline">[&minus;]</span>
                  </span>
                  <h3 className="serif text-lg font-medium leading-snug text-[#e9edf4] sm:text-xl">
                    {f.q}
                  </h3>
                </summary>
                <div className="px-6 pb-7 sm:px-8">
                  <p className="max-w-[72ch] text-[0.95rem] leading-relaxed text-[#8fa0b3] sm:ml-10">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
