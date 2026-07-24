import { ArrowRight, Star } from "lucide-react";

type Slug = "experience-system" | "practice" | "healthcare" | "reputation-read";

const FLAGSHIP = {
  href: "/practice/experience-system",
  title: "The Patient Experience System",
  blurb:
    "Every patient asked, every bad experience recovered the same day before it becomes a review, every complaint pattern turned into staff training — measured, and built under HIPAA discipline.",
};

const SUPPORT: { slug: string; href: string; tag: string; title: string; blurb: string }[] = [
  {
    slug: "practice",
    href: "/practice",
    tag: "The method",
    title: "The Practice Experience Audit",
    blurb: "Where a practice loses patients, measured and mapped — every leak sorted into one of the Four Doors.",
  },
  {
    slug: "healthcare",
    href: "/healthcare",
    tag: "The build",
    title: "Healthcare Systems",
    blurb: "Clinic automation built under signed business associate agreements, end to end.",
  },
  {
    slug: "reputation-read",
    href: "/practice/reputation-read",
    tag: "The tool",
    title: "The Reputation Read",
    blurb: "Enter your numbers and see what a rating gap quietly costs you — free, and no number promised.",
  },
  {
    slug: "our-science",
    href: "/our-science",
    tag: "The credential",
    title: "The Science Behind It",
    blurb: "The I-O psychology and the record that let one person diagnose the human layer no vendor can touch.",
  },
];

export default function HealthcareCluster({ current }: { current: Slug }) {
  const onFlagship = current === "experience-system";
  const support = SUPPORT.filter((p) => p.slug !== current);

  return (
    <section className="px-4 py-20 sm:px-6" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl">
        <span className="mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
          One body of work
        </span>
        <h2 className="serif mt-4 max-w-[24ch] text-2xl font-medium leading-tight text-[#e9edf4] sm:text-3xl">
          {onFlagship ? "You’re looking at the flagship." : "The Patient Experience System is the flagship."}
        </h2>
        <p className="mt-4 max-w-[64ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
          A software vendor can sell you the tool. They cannot run the diagnosis, hold the credential, or sign the
          compliance &mdash; and here one person does all of it: designs it, builds it, delivers it, and reads the
          results back. That is why it cannot be copied.
        </p>

        {!onFlagship && (
          <a
            href={FLAGSHIP.href}
            className="group mt-8 block rounded-2xl border border-[rgba(127,215,226,0.35)] bg-[#141d2c] p-7 transition-colors hover:bg-[#18232f] sm:p-9"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#7fd7e2]" aria-hidden="true" />
              <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">The flagship</span>
            </div>
            <h3 className="serif mt-3 text-2xl font-medium text-[#e9edf4] sm:text-[1.7rem]">{FLAGSHIP.title}</h3>
            <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">{FLAGSHIP.blurb}</p>
            <span className="mono mt-4 inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.14em] text-[#7fd7e2] group-hover:text-[#5cc3ce]">
              See the flagship <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        )}

        <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#e9edf41a] bg-[#e9edf41a] sm:grid-cols-3">
          {support.map((p) => (
            <a
              key={p.slug}
              href={p.href}
              className="group block bg-[#0c131e] p-6 transition-colors hover:bg-[#141d2c] sm:p-7"
            >
              <span className="mono text-[0.68rem] uppercase tracking-[0.18em] text-[#7d90a1]">{p.tag}</span>
              <h4 className="serif mt-2 text-lg font-medium text-[#e9edf4]">{p.title}</h4>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[#8fa0b3]">{p.blurb}</p>
              <span className="mono mt-3 inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.12em] text-[#7fd7e2] group-hover:text-[#5cc3ce]">
                Open <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
