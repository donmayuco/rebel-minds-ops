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
                href="/?offer=practice#book"
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

function Calculator() {
  const [rating, setRating] = useState(3.2);
  const [count, setCount] = useState(150);
  const [perWeek, setPerWeek] = useState(10);

  const targets = [3.0, 3.5, 4.0];

  return (
    <section id="calculator" className="py-20" style={{ backgroundColor: "#0a101a" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <Kicker>The honest math</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            Arithmetic, not promises.
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
                  type="number"
                  min={1}
                  max={20000}
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value || "1", 10)))}
                  className="mt-3 w-full rounded-lg border border-[#e9edf41a] bg-[#0c131e] px-4 py-2.5 text-lg text-[#e9edf4] outline-none focus:border-[#7fd7e2]"
                  aria-label="Current review count"
                />
              </label>
              <label className="block">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                  New reviews per week
                </span>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={perWeek}
                  onChange={(e) => setPerWeek(Math.max(1, parseInt(e.target.value || "1", 10)))}
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
    <section className="py-20">
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
          <Kicker>Why this starts with an audit</Kicker>
        </FadeIn>
        <FadeIn delay={80}>
          <h2 className="serif mt-4 max-w-[24ch] text-3xl font-medium leading-tight text-[#e9edf4] sm:text-4xl">
            We will not install this into chaos.
          </h2>
        </FadeIn>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <FadeIn delay={140}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              Automation amplifies whatever operation it lands in. If the
              phones go unanswered and the front desk is drowning, a feedback
              system does not fix that. It documents it, in higher resolution,
              at scale.{" "}
              <span className="font-medium text-[#e9edf4]">
                Automating a leaky operation just automates the chaos.
              </span>
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-[0.95rem] leading-relaxed text-[#8fa0b3]">
              So this system is never the first step. The walkthrough and the
              audit come first: we find the leaks, classify what each one
              needs, and prescribe this system only when the operation around
              it can absorb what it will surface. That is why the button on
              this page says walkthrough, not checkout.
            </p>
          </FadeIn>
        </div>
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
              href="/?offer=practice#book"
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
          name: "Can you remove bad reviews or guarantee a rating?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, and no one can. Existing reviews cannot be removed by any service, and future ratings depend on what patients choose to write. What the system changes is sampling: satisfied patients, who rarely review on their own, are finally asked, and bad experiences are recovered before they harden into public reviews. The rating that results is earned, not engineered.",
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
      <Calculator />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <SuggestionBox />
      <SectionDivider />
      <Loop />
      <SectionDivider />
      <HumanSteps />
      <SectionDivider />
      <Privacy />
      <SectionDivider />
      <TheGate />
      <SectionDivider />
      <NoPromises />
      <CrossLinks />
      <SiteFooter />
    </div>
  );
}
