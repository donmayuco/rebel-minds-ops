"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ClipboardList,
  Inbox,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Star,
} from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

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
    <div className="h-px bg-gradient-to-r from-transparent via-[rgba(127,215,226,0.15)] to-transparent" />
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
      {children}
    </span>
  );
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-16 sm:pt-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16">
        <FadeIn>
          <Kicker>Patient Experience Systems</Kicker>
        </FadeIn>

        <FadeIn delay={80}>
          <h1 className="serif mt-5 max-w-[16ch] text-[clamp(3rem,9vw,5.9rem)] font-medium leading-[0.99] tracking-[-0.02em] text-[#e9edf4]">
            Your rating is not measuring{" "}
            <em className="italic text-[#7fd7e2]">your&nbsp;medicine.</em>
          </h1>
        </FadeIn>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <FadeIn delay={160}>
            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-[#8fa0b3]">
              It is measuring who bothers to speak. Satisfied patients almost
              never leave reviews. Frustrated ones almost always do. A practice
              can deliver good medicine for years and still watch its rating
              describe its worst afternoons.{" "}
              <span className="font-medium text-[#e9edf4]">
                There is a fix, and it is not gaming the system. It is asking
                everyone.
              </span>
            </p>
          </FadeIn>

          <FadeIn delay={240}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/?offer=experience#book"
                className="inline-flex items-center gap-2 rounded-full bg-[#7fd7e2] px-7 py-3.5 text-sm font-medium text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
              >
                Request a walkthrough
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#7fd7e2] transition-colors hover:text-[#5cc3ce]"
              >
                Run your own numbers ↓
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 2. The Silent Majority ──────────────────────────────────────────────────

function JCurveSchematic() {
  return (
    <div className="mt-12" aria-hidden="true">
      <svg viewBox="0 0 1200 320" className="w-full" fill="none" role="img">
        {/* axes */}
        <line x1="80" y1="260" x2="1140" y2="260" stroke="rgba(233,237,244,0.16)" strokeWidth="1" />
        <path d="M1140 260 l-9 -4.5 v9 z" fill="rgba(233,237,244,0.25)" />
        <line x1="80" y1="260" x2="80" y2="40" stroke="rgba(233,237,244,0.16)" strokeWidth="1" />
        <path d="M80 40 l-4.5 9 h9 z" fill="rgba(233,237,244,0.25)" />

        {/* J-curve: high at angry end, low through middle, rises at delighted end */}
        <path
          d="M120 70 C 260 220, 420 245, 610 248 C 800 245, 950 200, 1100 90"
          stroke="rgba(127,215,226,0.7)"
          strokeWidth="1.5"
        />

        {/* annotations */}
        <text x="120" y="52" textAnchor="start" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.18em" fill="#7d90a1">
          THE ANGRY
        </text>
        <text x="1100" y="72" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.18em" fill="#7d90a1">
          THE DELIGHTED
        </text>

        {/* silent middle bracket */}
        <line x1="380" y1="278" x2="840" y2="278" stroke="rgba(127,215,226,0.4)" strokeWidth="1" strokeDasharray="2 5" />
        <text x="610" y="300" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.2em" fill="#7fd7e2">
          YOUR ACTUAL PATIENTS · SILENT
        </text>

        {/* axis labels */}
        <text x="1140" y="245" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.2em" fill="#5f6e85">
          SATISFACTION →
        </text>
        <text x="66" y="48" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.2em" fill="#5f6e85" transform="rotate(-90 66 48)">
          LIKELIHOOD OF REVIEWING →
        </text>
      </svg>
    </div>
  );
}

function SilentMajority() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>Who actually reviews you</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[24ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            The people you helped are the ones staying quiet.
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <FadeIn delay={140}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Consumer research has documented it for two decades: online
              ratings cluster at the extremes. The delighted and the angry
              write. The satisfied middle, the majority of any decent
              practice&rsquo;s patients, says nothing.{" "}
              <span className="font-medium text-[#e9edf4]">
                A public rating is not a census of your care. It is a survey of
                your outliers.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Every day your practice runs without a system that asks everyone,
              the sample stays rigged toward the worst experiences you produce.
              Not because your care got worse. Because silence is what
              satisfaction sounds like.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={260}>
          <JCurveSchematic />
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 3. The Calculator ───────────────────────────────────────────────────────

function neededFiveStars(rating: number, count: number, target: number): number | null {
  if (rating >= target) return 0;
  if (target >= 5) return null;
  const needed = Math.ceil((target * count - rating * count) / (5 - target));
  return needed > 0 ? needed : 0;
}

function fmtMonths(reviews: number, perWeek: number): string {
  if (perWeek <= 0) return "—";
  const months = reviews / perWeek / 4.33;
  if (months < 1) return "under a month";
  if (months > 48) return "4+ years";
  return `~${months.toFixed(months < 10 ? 1 : 0)} months`;
}

function badgeMovement(rating: number, count: number): { next: string; needed: number } | null {
  if (rating >= 4.9) return null;
  const nextDisplayed = Math.round(rating * 10 + 1) / 10;
  const threshold = nextDisplayed - 0.05;
  if (threshold >= 5) return null;
  const needed = Math.ceil(((threshold - rating) * count) / (5 - threshold));
  return { next: nextDisplayed.toFixed(1), needed: Math.max(1, needed) };
}

function Calculator() {
  const [rating, setRating] = useState(3.2);
  const [countStr, setCountStr] = useState("150");
  const [perWeekStr, setPerWeekStr] = useState("10");

  const count = Math.max(1, parseInt(countStr, 10) || 1);
  const perWeek = Math.max(1, parseInt(perWeekStr, 10) || 1);

  const targets = [3.0, 3.5, 4.0];
  const badge = badgeMovement(rating, count);

  return (
    <section id="calculator" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>The honest math</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Arithmetic, not magic.
          </h2>
        </FadeIn>
        <FadeIn delay={140}>
          <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
            Enter your current rating and review count. What follows is not a
            projection and not an offer. It is the arithmetic every practice
            deserves to see before anyone sells them anything.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-10 rounded-2xl border border-[#e9edf41a] bg-[#141d2c] p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <label className="block">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                  Current rating
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={0.1}
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="w-full accent-[#7fd7e2]"
                    aria-label="Current rating"
                  />
                  <span className="serif w-14 text-right text-2xl text-[#e9edf4]">
                    {rating.toFixed(1)}
                  </span>
                </div>
              </label>
              <label className="block">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                  Review count
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={countStr}
                  onChange={(e) => setCountStr(e.target.value.replace(/[^0-9]/g, "").slice(0, 5))}
                  className="mt-3 w-full rounded-lg border border-[#e9edf41a] bg-[#0c131e] px-4 py-2.5 text-lg text-[#e9edf4] outline-none focus:border-[#7fd7e2]"
                  aria-label="Current review count"
                />
              </label>
              <label className="block">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                  New reviews per week
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={perWeekStr}
                  onChange={(e) => setPerWeekStr(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
                  className="mt-3 w-full rounded-lg border border-[#e9edf41a] bg-[#0c131e] px-4 py-2.5 text-lg text-[#e9edf4] outline-none focus:border-[#7fd7e2]"
                  aria-label="Realistic new reviews per week"
                />
              </label>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#e9edf41a]">
                    <th className="mono pb-3 pr-4 text-[0.7rem] font-normal uppercase tracking-[0.2em] text-[#7d90a1]">
                      To reach
                    </th>
                    <th className="mono pb-3 pr-4 text-[0.7rem] font-normal uppercase tracking-[0.2em] text-[#7d90a1]">
                      Five-star reviews needed
                    </th>
                    <th className="mono pb-3 text-[0.7rem] font-normal uppercase tracking-[0.2em] text-[#7d90a1]">
                      At your pace
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {targets.map((t) => {
                    const n = neededFiveStars(rating, count, t);
                    return (
                      <tr key={t} className="border-b border-[#e9edf41a] last:border-0">
                        <td className="py-4 pr-4">
                          <span className="serif text-2xl text-[#e9edf4]">
                            {t.toFixed(1)}
                          </span>
                          <Star className="ml-2 inline h-4 w-4 text-[#7fd7e2]" aria-hidden="true" />
                        </td>
                        <td className="py-4 pr-4">
                          <span className="serif text-2xl text-[#7fd7e2]">
                            {n === null ? "—" : n === 0 ? "already there" : `~${n.toLocaleString()}`}
                          </span>
                        </td>
                        <td className="py-4 text-[0.95rem] text-[#8fa0b3]">
                          {n === null || n === 0 ? "—" : fmtMonths(n, perWeek)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {badge && (
              <div className="mt-6 rounded-xl border border-[rgba(127,215,226,0.35)] bg-[#0c131e] px-5 py-4">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
                  First movement
                </span>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                  About{" "}
                  <span className="serif text-xl text-[#7fd7e2]">
                    {badge.needed.toLocaleString()}
                  </span>{" "}
                  five-star {badge.needed === 1 ? "review" : "reviews"} until
                  your displayed rating shows{" "}
                  <span className="serif text-xl text-[#e9edf4]">{badge.next}</span>.
                </p>
              </div>
            )}

            <p className="mt-6 border-t border-[#e9edf41a] pt-5 text-[0.85rem] leading-relaxed text-[#7d90a1]">
              This assumes new reviews average five stars, which no one can
              promise. What a system changes is how many of your satisfied
              patients are ever asked. Nothing you enter here is stored or sent
              anywhere.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={260}>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="serif text-xl font-medium text-[#e9edf4]">
                Why the number is smaller than it looks.
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                Nearly every review you have today arrived unprompted, and
                unprompted reviews are powered by strong emotion, which usually
                means frustration. That is a trickle, and it is a skewed one.
              </p>
            </div>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3] md:pt-9">
              When every satisfied patient is asked the same day, while the
              visit is fresh, the pace changes entirely: the majority who would
              never have written a word get a warm invitation at the exact
              moment they are glad they came.{" "}
              <span className="font-medium text-[#e9edf4]">
                The years it took to reach your current count say nothing about
                the months ahead, because those years ran at the old pace.
              </span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={280}>
          <div className="mt-10 max-w-[70ch]">
            <h3 className="serif text-xl font-medium text-[#e9edf4]">
              The badge moves before the average does.
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Google shows one decimal. The full climb takes months, but the
              first visible tick does not: moving the displayed number often
              takes a handful of five-star reviews, not hundreds. That is the
              first movement line above, calculated from your own numbers.{" "}
              <span className="font-medium text-[#e9edf4]">
                The average is a long race. The display moves early, and the
                display is what patients see.
              </span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={320}>
          <div className="mt-16">
            <Kicker>What patients actually read</Kicker>
            <h3 className="serif mt-4 max-w-[26ch] text-2xl font-medium leading-tight text-[#e9edf4] sm:text-3xl">
              Nobody chooses a doctor from a number alone. They read the story
              under it.
            </h3>
            <div className="mt-6 grid gap-10 md:grid-cols-2">
              <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                A patient deciding where to go glances at the rating, then does
                what everyone does: scrolls the first few reviews and checks
                the dates. The largest annual consumer review survey now finds
                that{" "}
                <span className="font-medium text-[#e9edf4]">
                  recency carries as much weight as the rating itself.
                </span>{" "}
                Roughly three in four consumers pay attention to reviews from
                the last three months. One in three looks specifically at the
                last two weeks.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                Which changes what a recovery looks like from the outside. A
                practice climbing out of a rough number with a steady stream of
                fresh five-star reviews reads as exactly what it is: a practice
                that turned around.{" "}
                <span className="font-medium text-[#e9edf4]">
                  The trend arrives in the reader&rsquo;s mind long before the
                  average catches up.
                </span>{" "}
                And the same physics runs in reverse. A strong rating with a
                thinning, souring recent page is how every 2.5 once began.
              </p>
            </div>
            <p className="serif mx-auto mt-10 max-w-[34ch] text-center text-xl font-medium leading-relaxed text-[#e9edf4]">
              The average is history. The trend is news.{" "}
              <span className="text-[#7fd7e2]">Patients read the news.</span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={360}>
          <div id="protect" className="mt-16 rounded-2xl border border-[rgba(127,215,226,0.35)] bg-[#141d2c] p-6 sm:p-10">
            <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
              If your rating is already excellent
            </span>
            <h3 className="serif mt-3 max-w-[26ch] text-2xl font-medium leading-tight text-[#e9edf4] sm:text-3xl">
              Strong ratings are not safe. They are undefended.
            </h3>
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,260px)_1fr]">
              <div className="flex flex-col items-start justify-center rounded-xl border border-[#e9edf41a] bg-[#0c131e] p-6">
                <div className="serif text-5xl font-medium text-[#e9edf4]">
                  4.9 <span className="text-[#7d90a1]">→</span>{" "}
                  <span className="text-[#7fd7e2]">4.8</span>
                </div>
                <p className="mono mt-4 text-[0.7rem] uppercase leading-relaxed tracking-[0.2em] text-[#7d90a1]">
                  About seven unrecovered bad experiences · at 480 reviews
                </p>
              </div>
              <div className="space-y-5">
                <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                  A 4.9 with hundreds of reviews is years of work by real
                  people: the front desk that stayed kind under pressure, the
                  schedule that ran on time, the callbacks that actually
                  happened.{" "}
                  <span className="font-medium text-[#e9edf4]">
                    Nobody can afford a misrepresentation less than the
                    practice that earned its numbers.
                  </span>{" "}
                  And the arithmetic is blunt: one rough stretch, a staffing
                  gap, a billing change, a hard season, and the badge patients
                  compare stops describing what you built. The average is
                  earned slowly and dented quickly. And the bias behind it
                  never retires: the delighted go quiet on their own. The angry
                  never do.
                </p>
                <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                  The same system runs as defense: bad experiences get caught
                  and recovered before they ever reach the public record, and
                  the steady flow of invited reviews keeps raising the count
                  that makes your average hard to move.{" "}
                  <span className="font-medium text-[#e9edf4]">
                    Recovery is expensive. Defense is cheap. The system is the
                    same.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4. How It Works ─────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: MessageSquareText,
    title: "The text.",
    body: "A few hours after the visit, one message: how was your experience today, one to five. Nothing clinical. Ever. Not the reason for the visit, not a diagnosis, not a medication. Just the experience.",
  },
  {
    icon: Star,
    title: "A good day.",
    body: "Fours and fives get thanked, and invited to say it publicly where future patients are looking. The satisfied majority finally gets handed the microphone.",
  },
  {
    icon: Inbox,
    title: "A bad day.",
    body: "Ones through threes get something most practices never offer: someone asking what happened, before it hardens into a public review. The answer goes straight to your office manager, the same day, with a name attached when the patient wants a call back.",
  },
  {
    icon: RefreshCw,
    title: "The same invitation.",
    body: "Patients who had a bad day receive the same public review invitation as everyone else, after they have been heard. Nobody is filtered. Nobody is gated.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>The system</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[24ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Every patient gets asked. Every answer gets an answer.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#e9edf41a] bg-[#e9edf41a] sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <FadeIn key={s.title} delay={120 + i * 60} className="bg-[#0c131e]">
              <div className="h-full p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <s.icon className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
                  <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="serif mt-4 text-xl font-medium text-[#e9edf4]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-8 rounded-2xl border border-[rgba(127,215,226,0.35)] bg-[#141d2c] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#7fd7e2]" aria-hidden="true" />
              <div>
                <h3 className="serif text-xl font-medium text-[#e9edf4]">
                  We do not gate reviews.
                </h3>
                <p className="mt-3 max-w-[70ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                  Filtering unhappy patients away from public reviews violates
                  review platform policy and federal consumer protection rules,
                  and services that do it put your profile at risk. This system
                  does something better: it recovers the bad experience first,
                  then invites honestly.{" "}
                  <span className="font-medium text-[#e9edf4]">
                    The rating that results is one you actually earned.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// ─── 3b. Gating vs Science ───────────────────────────────────────────────────

function GatingSchematic() {
  return (
    <svg viewBox="0 0 520 210" className="w-full" fill="none" role="img" aria-hidden="true">
      {/* patient → filter */}
      <text x="30" y="105" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.14em" fill="#7d90a1">PATIENT</text>
      <line x1="105" y1="100" x2="165" y2="100" stroke="rgba(125,144,161,0.4)" strokeWidth="1" />
      <path d="M165 100 l-8 -4 v8 z" fill="rgba(125,144,161,0.4)" />
      {/* filter diamond */}
      <path d="M210 70 L255 100 L210 130 L165 100 Z" stroke="rgba(125,144,161,0.5)" strokeWidth="1" />
      <text x="210" y="105" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.1em" fill="#7d90a1">FILTER</text>
      {/* happy branch */}
      <line x1="245" y1="88" x2="360" y2="45" stroke="rgba(125,144,161,0.4)" strokeWidth="1" />
      <path d="M360 45 l-9 -1 4 8 z" fill="rgba(125,144,161,0.4)" />
      <text x="370" y="50" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.12em" fill="#7d90a1">HAPPY → PUBLIC</text>
      {/* unhappy branch: dashed, dead end */}
      <line x1="245" y1="112" x2="360" y2="160" stroke="rgba(125,144,161,0.35)" strokeWidth="1" strokeDasharray="3 5" />
      <text x="370" y="165" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.12em" fill="#5f6e85">UNHAPPY → BURIED</text>
      <line x1="480" y1="152" x2="494" y2="166" stroke="rgba(125,144,161,0.55)" strokeWidth="1.25" />
      <line x1="494" y1="152" x2="480" y2="166" stroke="rgba(125,144,161,0.55)" strokeWidth="1.25" />
      <text x="260" y="200" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.18em" fill="#5f6e85">THE SIGNAL DIES · THE PROBLEM STAYS</text>
    </svg>
  );
}

function ScienceSchematic() {
  return (
    <svg viewBox="0 0 520 210" className="w-full" fill="none" role="img" aria-hidden="true">
      {/* patient → asked */}
      <text x="30" y="105" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.14em" fill="#8fa0b3">PATIENT</text>
      <line x1="105" y1="100" x2="160" y2="100" stroke="rgba(127,215,226,0.6)" strokeWidth="1" />
      <path d="M160 100 l-8 -4 v8 z" fill="rgba(127,215,226,0.6)" />
      <circle cx="195" cy="100" r="26" stroke="rgba(127,215,226,0.7)" strokeWidth="1" fill="#0c131e" />
      <text x="195" y="104" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.08em" fill="#7fd7e2">ASKED</text>
      {/* good day branch */}
      <line x1="215" y1="85" x2="345" y2="45" stroke="rgba(127,215,226,0.6)" strokeWidth="1" />
      <path d="M345 45 l-9 -1 4 8 z" fill="rgba(127,215,226,0.6)" />
      <text x="355" y="50" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.12em" fill="#8fa0b3">GOOD DAY → INVITED</text>
      {/* bad day branch → heard → same invitation */}
      <line x1="215" y1="115" x2="290" y2="150" stroke="rgba(127,215,226,0.6)" strokeWidth="1" />
      <path d="M290 150 l-9 -2 3 8 z" fill="rgba(127,215,226,0.6)" />
      <text x="300" y="155" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.12em" fill="#8fa0b3">BAD DAY → HEARD</text>
      <line x1="455" y1="140" x2="455" y2="62" stroke="rgba(127,215,226,0.5)" strokeWidth="1" />
      <path d="M455 62 l-4 8 h8 z" fill="rgba(127,215,226,0.5)" />
      <text x="465" y="105" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.1em" fill="#7d90a1" transform="rotate(90 465 105)">SAME INVITE</text>
      {/* data loop back to practice */}
      <path d="M290 168 C 220 195, 120 190, 80 130" stroke="rgba(180,157,242,0.5)" strokeWidth="1" strokeDasharray="2 5" />
      <path d="M80 130 l-1 9 8 -4 z" fill="rgba(180,157,242,0.5)" />
      <text x="185" y="200" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="0.16em" fill="#b49df2">DATA → TRAINING → BETTER VISITS</text>
    </svg>
  );
}

function GatingVsScience() {
  return (
    <section className="py-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>The fork every practice faces</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[24ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            There are two ways to chase a rating. Only one is real.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <FadeIn delay={140}>
            <div className="h-full rounded-2xl border border-[#e9edf41a] bg-[#0c131e] p-6 opacity-80 sm:p-8">
              <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#5f6e85]">
                Review gating · the shortcut
              </span>
              <div className="mt-4">
                <GatingSchematic />
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#7d90a1]">
                The pitch sounds harmless: ask patients privately first, and
                only the happy ones get the public review link. The unhappy are
                quietly filtered out. It is the default design of most
                reputation software, it violates review platform rules and
                federal consumer protection law, and it carries a quieter cost:{" "}
                <span className="font-medium text-[#8fa0b3]">
                  every filtered complaint is a problem your practice never
                  hears about again.
                </span>{" "}
                The rating looks better. The operation stays exactly as it was.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={220}>
            <div className="h-full rounded-2xl border border-[rgba(127,215,226,0.35)] bg-[#141d2c] p-6 sm:p-8">
              <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
                This system · the science
              </span>
              <div className="mt-4">
                <ScienceSchematic />
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                Built on the research instead. Sampling: ask everyone, and the
                honest average rises on its own, because the satisfied majority
                finally gets counted. Service recovery: a complaint handled
                quickly and personally often earns more loyalty than a visit
                where nothing went wrong, a finding documented across service
                industries for three decades. Measurement: every complaint
                becomes data your team can train against.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <p className="serif mx-auto mt-10 max-w-[36ch] text-center text-xl font-medium leading-relaxed text-[#e9edf4]">
            Gating buries the signal. Science uses it.{" "}
            <span className="text-[#7fd7e2]">
              One hides your problems. The other retires them.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 4b. Day One ─────────────────────────────────────────────────────────────

function DayOne() {
  return (
    <section className="py-20" style={{ backgroundColor: "#141d2c" }}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <FadeIn>
          <Kicker>What changes on day one</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mx-auto mt-5 max-w-[20ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            The rating is the lagging indicator.
          </h2>
        </FadeIn>
        <FadeIn delay={160}>
          <p className="mx-auto mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-[#8fa0b3]">
            The perception shifts the first afternoon the texts go out. A
            practice that asks every patient how it did reads as a practice
            that cares how it did. Patients feel the difference between being
            processed and being asked, and the ones who had a rough day feel it
            most: someone noticed, the same day, and wanted to make it right.{" "}
            <span className="font-medium text-[#e9edf4]">
              The stars catch up later. The way your practice is experienced
              changes immediately.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 5. The Suggestion Box ───────────────────────────────────────────────────

function SuggestionBox() {
  return (
    <section className="py-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>For the person who actually runs the office</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Your operations, finally visible.
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <FadeIn delay={140}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Every rough experience your patients report lands in one place,
              readable in five minutes a day. Not scattered across review sites
              after the damage is done. Before. With patterns: if four patients
              this month mention the phone, the phone is the project. If the
              waiting room goes quiet in the data, whatever you changed worked.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              This is the difference between managing by anecdote and managing
              by evidence.{" "}
              <span className="font-medium text-[#e9edf4]">
                Office managers have always known where the problems are. This
                system hands them the proof,
              </span>{" "}
              and the proof is what gets problems fixed.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 6. The Loop ─────────────────────────────────────────────────────────────

function Loop() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>Why this holds when others fade</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Measure. Train. Measure again.
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <FadeIn delay={140}>
            <div className="space-y-5 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              <p>
                The suggestion box does not just catch complaints. It tells you
                what your team needs. When the patterns point at the front
                desk, the fix is not software. It is training: service under
                pressure, recovering a complaint in the moment, the habits that
                keep a hard Tuesday from becoming a one-star Wednesday. We
                build that training from your own data, deliver it to your
                team, and then the same system measures whether it worked.
              </p>
              <p className="font-medium text-[#e9edf4]">
                Software vendors can measure but cannot train. Trainers can
                train but cannot measure. A practice needs the loop, and the
                loop is what we do.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={220}>
            <div className="rounded-2xl border border-[#e9edf41a] bg-[#141d2c] p-6">
              <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                Who runs this
              </span>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
                Mario Arredondo. M.A., Industrial &amp; Organizational
                Psychology, with doctoral studies at SUNY Albany. Public health
                data operations across 19 Texas counties. Twenty years running
                operations in the United States. Founder, Rebel Minds OPS.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 6b. The Human Steps ─────────────────────────────────────────────────────

function HumanSteps() {
  return (
    <section className="py-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>The part we prepare with you</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[26ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Your team makes this work. We make sure they are ready.
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <FadeIn delay={140}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              The system has human steps on purpose. A warm mention at
              checkout: you will get a text from us, tell us honestly how we
              did. An office manager who reads yesterday&rsquo;s feedback with
              her morning coffee. A call back when a patient asks for one.{" "}
              <span className="font-medium text-[#e9edf4]">
                None of this is extra work bolted onto the day. It is the day,
                organized.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Before anything goes live, we sit with your team and walk the
              whole flow: what patients will receive, what happens with every
              answer, and why the honest ones matter most. When the people at
              the desk understand the system is there to back them up, not to
              grade them, they carry it.{" "}
              <span className="font-medium text-[#e9edf4]">
                That is adoption, and adoption is the step most technology
                projects skip. We never skip it.
              </span>{" "}
              Your staff hears it first, sees the patterns their work improves,
              and gets the credit when the numbers move.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 7. Privacy ──────────────────────────────────────────────────────────────

const PRIVACY_POINTS = [
  "Every component that touches patient information runs under signed business associate agreements, end to end.",
  "The system knows a patient visited. It never knows why. No diagnoses, no medications, no clinical content in any message, in either direction, by design.",
  "Patients consent at intake and can opt out with one word, permanently.",
  "Everything is encrypted, access-controlled, and audit-logged. Your office manager sees the feedback. Nobody else does.",
];

function Privacy() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>Built for healthcare, not adapted to it</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[24ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Under the strictest privacy discipline in any industry.
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#e9edf41a] bg-[#e9edf41a] sm:grid-cols-2">
          {PRIVACY_POINTS.map((p, i) => (
            <FadeIn key={i} delay={120 + i * 60} className="bg-[#0c131e]">
              <div className="flex h-full items-start gap-4 p-6 sm:p-8">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#7fd7e2]" aria-hidden="true" />
                <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">{p}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={400}>
          <p className="mt-8 max-w-[70ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
            Most reputation tools were built for restaurants and then sold to
            clinics.{" "}
            <span className="font-medium text-[#e9edf4]">
              This one was designed inside healthcare&rsquo;s rules from the
              first line.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 7b. The Gate ────────────────────────────────────────────────────────────

function TheGate() {
  return (
    <section className="py-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>Why the first layers come first</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[24ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            It took years to get here. That is where we start.
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <FadeIn delay={140}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              A rating is the visible end of a long chain: phones, staffing,
              scheduling, follow-up, busy seasons, hard years. It did not
              appear overnight, and it does not describe anyone&rsquo;s
              intentions.{" "}
              <span className="font-medium text-[#e9edf4]">
                But automation amplifies whatever operation it lands in,
              </span>{" "}
              and a feedback system switched on too early does not fix a
              strained office. It documents the strain, in higher resolution,
              at scale.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              That is why the first layers come first. The walkthrough and the
              assessment map how things got here, without judgment, because
              every practice&rsquo;s chain is different. The structure and the
              training give your team its footing.{" "}
              <span className="font-medium text-[#e9edf4]">
                Then the system goes live, when the operation around it is
                ready for what it will surface.
              </span>{" "}
              That is why the button on this page says walkthrough, not
              checkout.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── 7c. The Five Layers ─────────────────────────────────────────────────────

const LAYERS = [
  {
    title: "The assessment.",
    body: "How did things get here. We walk your operation the way a patient experiences it, the phones, the front desk, the waiting room, the follow-up that never came, and map where the experience leaks. Most practices have had software demos. Almost none have had this.",
  },
  {
    title: "The structure.",
    body: "A formal job analysis turns “somebody should handle that” into named responsibilities: who supervises the new protocol in its first weeks, who calls a frustrated patient back, who reads the feedback every morning. Plans survive when they have owners. Yours will have owners.",
  },
  {
    title: "The training.",
    body: "For your whole personnel, at every level. Management learns to handle the heat: receiving hard feedback without flinching, and leading the recovery. The front office learns to earn the premium review, because the five-star visit is made at checkout, not in the exam room.",
  },
  {
    title: "The system.",
    body: "Only then, the technology. Every patient asked, every bad day intercepted the same day, every pattern measured, under healthcare’s privacy rules end to end. Tools come fourth on purpose. That is the method.",
  },
  {
    title: "The reason you called.",
    body: "A rating that starts telling the truth about your medicine. Not a promised number. The machinery that finally lets what happens in your exam room show up where patients are looking.",
  },
];

function FiveLayers() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>What an engagement includes</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[22ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            The system is the fourth thing we build.
          </h2>
        </FadeIn>
        <FadeIn delay={140}>
          <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#8fa0b3]">
            Reputation software arrives as a login and a monthly invoice. This
            does not. By the time the first message goes out to a patient, four
            other things have already happened.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#e9edf41a] bg-[#e9edf41a] sm:grid-cols-2">
          {LAYERS.map((l, i) => (
            <FadeIn
              key={l.title}
              delay={200 + i * 60}
              className={`bg-[#0c131e] ${i === LAYERS.length - 1 ? "sm:col-span-2" : ""}`}
            >
              <div className="h-full p-6 sm:p-8">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                  Layer {i + 1}
                </span>
                <h3 className="serif mt-4 text-xl font-medium text-[#e9edf4]">
                  {l.title}
                </h3>
                <p className={`mt-3 text-[0.95rem] leading-relaxed text-[#8fa0b3] ${i === LAYERS.length - 1 ? "max-w-[70ch]" : ""}`}>
                  {l.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={520}>
          <p className="serif mx-auto mt-10 max-w-[38ch] text-center text-xl font-medium leading-relaxed text-[#e9edf4]">
            Vendors sell the fourth layer. We build the first three so the
            fourth one works.{" "}
            <span className="text-[#7fd7e2]">The fifth is why you called.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 8. What We Do Not Promise + CTA ─────────────────────────────────────────

function NoPromises() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>Read this before anyone sells you anything</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            What we will not tell you.
          </h2>
        </FadeIn>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <FadeIn delay={140}>
            <ul className="space-y-4 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              <li className="flex gap-3">
                <span className="text-[#7fd7e2]">·</span>
                We will not promise you a rating. Nobody can, and you should
                hear alarm bells when someone does.
              </li>
              <li className="flex gap-3">
                <span className="text-[#7fd7e2]">·</span>
                We cannot remove reviews, and neither can anyone charging you
                to try.
              </li>
              <li className="flex gap-3">
                <span className="text-[#7fd7e2]">·</span>
                The calculator above is arithmetic, not a forecast. Your
                patients decide what they write.
              </li>
            </ul>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              What we do promise:{" "}
              <span className="font-medium text-[#e9edf4]">
                every patient asked, every bad experience heard the same day,
                every pattern surfaced, and a team trained against your own
                evidence.
              </span>{" "}
              Practices that do those four things tend to find the rating takes
              care of itself, at the speed the arithmetic allows.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={280}>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="/?offer=experience#book"
              className="inline-flex items-center gap-2 rounded-full bg-[#7fd7e2] px-7 py-3.5 text-sm font-medium text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="max-w-[44ch] text-[0.85rem] leading-relaxed text-[#7d90a1]">
              The walkthrough is free and it is diagnostic, not a demo. If your
              experience layer is tight, you will hear that.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── 9. Cross-links ──────────────────────────────────────────────────────────

function CrossLinks() {
  return (
    <section className="py-14" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#e9edf41a] bg-[#e9edf41a] sm:grid-cols-2">
          <a href="/practice" className="group block bg-[#0c131e] p-6 transition-colors hover:bg-[#141d2c] sm:p-8">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
              <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                The larger method
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              This system is one door of a larger method.{" "}
              <span className="font-medium text-[#7fd7e2] group-hover:text-[#5cc3ce]">
                The Practice Experience Audit →
              </span>
            </p>
          </a>
          <a href="/healthcare" className="group block bg-[#0c131e] p-6 transition-colors hover:bg-[#141d2c] sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#7fd7e2]" aria-hidden="true" />
              <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                The systems
              </span>
            </div>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Clinic automation built under HIPAA discipline.{" "}
              <span className="font-medium text-[#7fd7e2] group-hover:text-[#5cc3ce]">
                Healthcare systems →
              </span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── JSON-LD ─────────────────────────────────────────────────────────────────

const experienceSystemJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.rebelmindsops.com/practice/experience-system#webpage",
      url: "https://www.rebelmindsops.com/practice/experience-system",
      name: "The Patient Experience System",
      description:
        "A HIPAA-disciplined patient feedback system for healthcare practices: every patient is asked about their visit experience, negative experiences receive same-day service recovery and route to an internal suggestion box, and every patient receives the same public review invitation. No review gating. Complaint patterns feed staff training, and the same system measures whether the training worked.",
      isPartOf: { "@id": "https://www.rebelmindsops.com/#organization" },
      author: { "@id": "https://www.rebelmindsops.com/#founder" },
      mainEntity: {
        "@id": "https://www.rebelmindsops.com/practice/experience-system#service",
      },
    },
    {
      "@type": "Service",
      "@id": "https://www.rebelmindsops.com/practice/experience-system#service",
      name: "The Patient Experience System",
      serviceType:
        "Patient experience feedback, service recovery, and review systems for healthcare practices",
      description:
        "After each office visit, patients receive a short text asking about their experience, never anything clinical. Positive experiences are invited to share publicly. Negative experiences are heard first through service recovery questions, routed to the office manager's suggestion box the same day, and then receive the same public review invitation as everyone else. Complaint volume and themes become operational metrics that target staff training, and the system re-measures after training. Built under business associate agreements end to end.",
      provider: { "@id": "https://www.rebelmindsops.com/#organization" },
      areaServed: "United States",
      audience: {
        "@type": "Audience",
        audienceType: "Medical, dental, and behavioral-health practices",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rebelmindsops.com/practice/experience-system#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this review gating?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Review gating means filtering unhappy customers away from public reviews, which violates review platform policy and federal consumer protection rules. In this system, every patient receives the same public review invitation. Patients who report a bad experience are heard first through service recovery, and then invited like everyone else. The sequence changes; the invitation never does.",
          },
        },
        {
          "@type": "Question",
          name: "Is the system HIPAA compliant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The system is built for HIPAA-covered practices: every component that touches patient information operates under signed business associate agreements, messages never contain clinical content in either direction, patients consent at intake and can opt out permanently, and all data is encrypted, access-controlled, and audit-logged.",
          },
        },
        {
          "@type": "Question",
          name: "Is this only for practices with low ratings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The system runs in two directions. For practices recovering a damaged rating, it corrects the sampling problem by asking every patient instead of only hearing from the frustrated ones. For practices with strong ratings, it runs as defense: bad experiences are caught and recovered before they reach the public record, and the steady flow of invited reviews raises the review count that makes a high average hard to move. A practice at 4.9 is about seven unrecovered bad experiences away from displaying 4.8.",
          },
        },
        {
          "@type": "Question",
          name: "Can you remove bad reviews or guarantee a rating?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, and no one can. Existing reviews cannot be removed by any service, and future ratings depend on what patients choose to write. What the system changes is sampling: satisfied patients, who rarely review on their own, are finally asked, and bad experiences are recovered before they harden into public reviews. The rating that results is earned, not engineered.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to raise a Google rating?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is arithmetic, not magic. The full climb depends on the current rating and review count, and for a low rating it takes hundreds of new reviews and many months. But two things move much sooner. The displayed badge rounds to one decimal, so it often ticks up within the first weeks of inviting every patient. And consumer research shows patients weight recent reviews heavily, so a visible stream of fresh positive reviews changes how a practice reads long before the average catches up. Anyone promising a specific rating by a specific date is selling something they cannot control.",
          },
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.rebelmindsops.com/#founder",
      name: "Mario L. Arredondo",
      url: "https://rebelminds.ai",
      jobTitle: "AI Adoption Strategist & Systems Builder",
      description:
        "M.A., Industrial & Organizational Psychology. Builds operational systems and researches the human layer of AI adoption.",
      worksFor: { "@id": "https://www.rebelmindsops.com/#organization" },
      sameAs: [
        "https://orcid.org/0000-0002-2340-9250",
        "https://scholar.google.com/citations?user=zgzsfsAAAAAJ",
        "https://www.linkedin.com/in/mario-arredondo-romo/",
        "https://www.youtube.com/@rebelmindsai",
        "https://www.youtube.com/@mentesrebeldesia",
        "https://rebelminds.ai",
        "https://doi.org/10.54014/DKAX-FS1S",
        "https://doi.org/10.1080/17470218.2016.1222446",
        "https://doi.org/10.1080/17470218.2016.1256416",
      ],
    },
  ],
};

// ─── Page Root ───────────────────────────────────────────────────────────────

export default function ExperienceSystemPage() {
  return (
    <div className="min-h-screen bg-[#0c131e]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceSystemJsonLd) }}
      />
      <SiteNav />
      <Hero />
      <SectionDivider />
      <SilentMajority />
      <SectionDivider />
      <GatingVsScience />
      <SectionDivider />
      <Calculator />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <DayOne />
      <SectionDivider />
      <SuggestionBox />
      <SectionDivider />
      <Loop />
      <SectionDivider />
      <HumanSteps />
      <SectionDivider />
      <Privacy />
      <SectionDivider />
      <FiveLayers />
      <SectionDivider />
      <TheGate />
      <SectionDivider />
      <NoPromises />
      <CrossLinks />
      <SiteFooter />
    </div>
  );
}
