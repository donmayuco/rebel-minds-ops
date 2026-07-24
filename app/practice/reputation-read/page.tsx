"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import HealthcareCluster from "@/app/components/HealthcareCluster";
import FaqAccordion, {
  faqSchemaEntities,
  type FaqItem,
} from "@/app/components/FaqAccordion";

// ─── FAQ ─────────────────────────────────────────────────────────────────────
// Source of truth for BOTH the visible accordion and the FAQPage JSON-LD.
// Scoped to the tool itself — how to read the output and how far to trust it.
// The "nothing is transmitted" answer is literally true: this page holds all
// state in React and makes no network calls. Keep it that way, or fix the copy.

const FAQS: FaqItem[] = [
  {
    q: "Do you store the numbers I just typed?",
    a: "No. This tool runs entirely inside your browser. Nothing you enter is transmitted, saved, or visible to us — there is no account, no submission, and no record that you used it at all. Close the tab and the numbers are gone. That is a deliberate choice for a page asking a practice about its weakest metric.",
  },
  {
    q: "Why is the estimate a range instead of a number?",
    a: "Because the underlying research produces a range. The best-identified study of this question compared businesses that landed just above and just below a rating rounding threshold, and found one full star was worth five to nine percent of demand. Reporting the midpoint would imply a precision nobody has, and reporting the top of it would be marketing. So the tool shows the band it was actually given.",
  },
  {
    q: "Patients say they require four stars. Why isn't the estimate far larger?",
    a: "Because what patients report and what patients do are different, and the gap is roughly a factor of ten. Survey data has 78% of patients saying they require four stars or better — taken literally, that predicts a practice at 2.5 stars would see almost no new patients at all, and practices at 2.5 stars plainly keep seeing them. The screening bar on this page shows those stated thresholds, because they are the mechanism and they are real directionally. The dollar figures come from studies that measured actual behaviour instead, which is the more conservative and more defensible source.",
  },
  {
    q: "How much should I trust the dollar figures themselves?",
    a: "Trust the arithmetic completely and the dollars directionally. Counting the five-star reviews needed to move a rounded badge is exact — it is arithmetic, not modelling. The dollar figures are not exact: they rest on published research applied to the numbers you entered for volume, revenue, and retention, and they move a great deal when those inputs move. That sensitivity is worth watching, because it tells you which assumption your estimated loss actually depends on.",
  },
  {
    q: "Why does the badge move so much sooner than my average?",
    a: "Because the badge is rounded and the average is not. Google displays one decimal, so the number patients see can tick up while the true average is still crawling. That is why the read reports the first move separately from the full climb — the figure a prospective patient sees can change within weeks even when the underlying average is a long project.",
  },
  {
    q: "Won’t asking every patient produce more bad reviews too?",
    a: "Some, yes, and any tool that does not tell you so is selling. What changes is representativeness. Today your public rating is drawn almost entirely from people motivated enough by frustration to post; asking everyone adds the satisfied majority who never would have. You will collect some negative reviews you would not otherwise have received, and considerably more positive ones. A well-built system also surfaces bad experiences to the practice first, which is what lets you address something before it hardens into a public review.",
  },
  {
    q: "Is asking patients for reviews against Google’s rules?",
    a: "Asking is not. What the policies prohibit is incentivizing reviews, buying them, and soliciting selectively so that only satisfied customers get invited. Asking every patient, offering nothing in exchange, and leaving entirely to them what they write sits squarely inside the rules. The line is not between asking and not asking. It is between inviting everyone and filtering who gets invited.",
  },
  {
    q: "My rating is already high. Is there anything here for me?",
    a: "Yes, and the arithmetic shows it. A strong average is fragile in one specific direction: the fewer reviews it rests on, the faster a handful of bad ones drags the displayed number down. A practice at 4.9 with a thin review count is a few unrecovered bad afternoons away from displaying 4.8. Set the target to your current rating and the read turns into a defense calculation instead of a recovery one.",
  },
  {
    q: "What counts as “new patients who look you up online”?",
    a: "Prospective patients who see your rating before they decide — someone searching your specialty nearby, someone checking you after a referral, someone comparing two practices their insurance covers. Not your existing patients, and not everyone who walks through the door. If you are unsure, estimate low. The read is more useful when it is conservative.",
  },
  {
    q: "What does the real version of this look like?",
    a: "A walkthrough of the actual operation instead of a slider: the phones, the front desk, the wait, the follow-up that never went out, mystery-patient calls, and your real numbers rather than defaults — read back to you by the same person who does the work. This page is the sketch that tells you whether the real one is worth an hour of your time.",
  },
];

const reputationReadJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.rebelmindsops.com/practice/reputation-read#faq",
  mainEntity: faqSchemaEntities(FAQS),
};

// ─── Model ───────────────────────────────────────────────────────────────────

// ── What patients say vs. what patients do ───────────────────────────────────
// These disagree by about an order of magnitude, and the tool keeps them in
// separate jobs rather than averaging them into one comfortable number.
//
// SCREENING CURVE (context, never money). The share of patients whose
// self-reported minimum acceptable rating your rating clears, from the RepuGen
// 2025 Patient Review Survey, n=1,212. Reported thresholds:
//   5★ 8.26% · 4.5★ 22.56% · 4★ 47.10% · 3.5★ 11.96% · 3★ 7.27%
//   2.5★ 1.48% · 2★ 1.11% · 1★ 0.25%
// https://www.repugen.com/patient-review-survey
//
// Deliberately a STEP function, not an interpolated curve. The thresholds are
// discrete, patients read a badge already rounded to one decimal, and smoothing
// across 3.5→4.0 would erase the four-star cliff, which is the single most
// documented feature of the data. Cross-check: capture(3.9) = 22.07%, so 77.9%
// screen out below four stars, matching the survey's headline 78%.
const THRESHOLDS: [number, number][] = [
  [1, 0.0025], [2, 0.0111], [2.5, 0.0148], [3, 0.0727],
  [3.5, 0.1196], [4, 0.471], [4.5, 0.2256], [5, 0.0826],
];
//
// THE MONEY BAND comes from causal research instead, because stated thresholds
// do not survive contact with reality: taken literally they imply a practice at
// 2.5★ would see almost no new patients at all, which any working practice at
// 2.5★ disproves by existing. Luca (HBS) used Yelp's rounding thresholds as a
// natural experiment and measured one full star at 5–9% of revenue; AJMC found
// a single 1-star physician review cost 2.3–2.6% of new patient volume for 16+
// weeks. The band below is Luca's range, applied to real patient volume.
// https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf
// https://www.ajmc.com/view/the-impact-of-1-star-physician-ratings-on-new-patient-volume
const DEMAND_PER_STAR_LOW = 0.05;
const DEMAND_PER_STAR_HIGH = 0.09;
function capture(r: number): number {
  let share = 0;
  for (const [threshold, mass] of THRESHOLDS) {
    if (threshold <= r + 1e-9) share += mass;
  }
  return Math.min(1, share);
}
// New 5-star reviews needed for the displayed badge (rounds at disp - 0.05) to reach `disp`.
function reviewsToDisplay(rating: number, reviews: number, disp: number): number {
  const thr = disp - 0.05;
  if (rating >= thr) return 0;
  const denom = 5 - thr;
  if (denom <= 0) return Infinity;
  return Math.max(0, Math.ceil((reviews * (thr - rating)) / denom));
}
const clamp = (n: number, min: number, max: number) =>
  isNaN(n) ? min : Math.min(max, Math.max(min, n));

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const n1 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

// ─── Small building blocks ───────────────────────────────────────────────────

function Field({
  label, min, max, step, value, set, hint,
}: {
  label: string; min: number; max: number; step: number;
  value: number; set: (n: number) => void; hint?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-[0.85rem] font-medium text-[#c4d0dc]">{label}</label>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => set(clamp(parseFloat(e.target.value), min, max))}
          aria-label={label}
          className="mono w-[74px] rounded-md border border-[#e9edf41a] bg-[#0c131e] px-2 py-1 text-right text-[0.95rem] font-semibold text-[#e9edf4] outline-none focus:border-[#7fd7e2]"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(parseFloat(e.target.value))}
        aria-label={label}
        className="mt-3 w-full accent-[#7fd7e2]"
      />
      {hint && <div className="mt-2 text-[0.72rem] leading-relaxed text-[#7d90a1]">{hint}</div>}
    </div>
  );
}

function Sub({ children, first }: { children: React.ReactNode; first?: boolean }) {
  return (
    <div
      className={`px-6 pb-1 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#7fd7e2] ${
        first ? "" : "border-t border-[#e9edf41a] mt-1"
      }`}
    >
      {children}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const w = `${(Math.max(0, Math.min(5, value)) / 5) * 100}%`;
  return (
    <span className="relative inline-block text-[1.3rem] leading-none tracking-[2px]" aria-hidden="true">
      <span className="text-[#2d3b4a]">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden whitespace-nowrap text-[#efb738]"
        style={{ width: w }}
      >
        ★★★★★
      </span>
    </span>
  );
}

function Cell({ k, v, x, good }: { k: string; v: React.ReactNode; x?: React.ReactNode; good?: boolean }) {
  return (
    <div className="bg-[#141d2c] p-4 sm:p-5">
      <div className="mono text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#7d90a1]">{k}</div>
      <div className={`serif mt-1.5 text-2xl font-medium ${good ? "text-[#4fc79a]" : "text-[#e9edf4]"}`}>{v}</div>
      {x && <div className="mt-1.5 text-[0.8rem] leading-relaxed text-[#8fa0b3]">{x}</div>}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReputationReadPage() {
  const [md, setMd] = useState(1);
  const [pa, setPa] = useState(0);
  const [rating, setRating] = useState(3.6);
  const [reviews, setReviews] = useState(40);
  const [target, setTarget] = useState(4.5);
  const [prospects, setProspects] = useState(40);
  const [rev, setRev] = useState(350);
  const [years, setYears] = useState(5);
  const [velocity, setVelocity] = useState(20);
  const [newPatients, setNewPatients] = useState(25);

  const providers = Math.max(0, Math.round(md + pa));
  const totalProspects = providers * prospects;
  const ltv = rev * years;
  const cCur = capture(rating);
  const cTgt = capture(Math.max(rating, target));
  const gap = Math.max(0, cTgt - cCur);
  const starGap = Math.max(0, target - rating);

  // Context only, never monetised: prospects per month whose stated minimum
  // rating the practice does not currently clear.
  const screenedOutMo = totalProspects * gap;

  // The money band — Luca's measured 5–9% of demand per full star, applied to
  // the new patients the practice actually sees.
  const patientsLow = providers * newPatients * (DEMAND_PER_STAR_LOW * starGap);
  const patientsHigh = providers * newPatients * (DEMAND_PER_STAR_HIGH * starGap);
  const floorLostYr = patientsLow * 12;
  const ceilLostYr = patientsHigh * 12;
  const floorBleedYr = floorLostYr * ltv;
  const ceilBleedYr = ceilLostYr * ltv;

  const curDisp = Math.round(rating * 10) / 10;
  let firstMove = Infinity;
  let nextDisp = curDisp;
  for (let d = Math.round((curDisp + 0.1) * 10) / 10; d <= 5.001; d = Math.round((d + 0.1) * 10) / 10) {
    const rr = reviewsToDisplay(rating, reviews, d);
    if (rr > 0 && isFinite(rr)) {
      firstMove = rr;
      nextDisp = d;
      break;
    }
  }
  const toTgt = reviewsToDisplay(rating, reviews, target);
  const months = toTgt / Math.max(1, velocity);
  const verdict =
    toTgt === 0
      ? "Already there — switch to defense."
      : months <= 3
      ? "Close — the badge is within a quarter."
      : months <= 9
      ? "A season of asking everyone."
      : "A long climb — but the badge moves in weeks, and patients read the fresh trend first.";

  return (
    <div className="min-h-screen bg-[#0c131e] text-[#e9edf4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reputationReadJsonLd) }}
      />
      <SiteNav />

      <header className="mx-auto max-w-6xl px-4 pb-2 pt-16 sm:px-6 sm:pt-20">
        <span className="mono inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
          Practice reputation read
        </span>
        <h1 className="serif mt-4 max-w-[18ch] text-4xl font-medium leading-[1.05] text-[#e9edf4] sm:text-5xl">
          What is your rating quietly <span className="italic text-[#7fd7e2]">costing you?</span>
        </h1>
        <p className="mt-5 max-w-[60ch] text-[0.98rem] leading-relaxed text-[#8fa0b3]">
          Satisfied patients rarely leave reviews, so a practice&rsquo;s public rating is mostly a sample of the
          frustrated few &mdash; and prospective patients filter on it before they ever pick up the phone. Enter your
          numbers to see that gap in dollars, and what it takes to close it.{" "}
          <span className="text-[#7d90a1] italic">Defaults model an average family practice.</span>
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* INTAKE */}
          <section className="rounded-2xl border border-[#e9edf41a] bg-[#141d2c] pb-3 lg:sticky lg:top-24" aria-label="Your practice numbers">
            <div className="mono px-6 pt-5 text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
              Your practice · the vitals
            </div>

            <Sub first>Providers</Sub>
            <Field label="Physicians (MD / DO)" min={0} max={20} step={1} value={md} set={setMd} />
            <Field
              label="Advanced-practice providers (PA / NP)"
              min={0}
              max={30}
              step={1}
              value={pa}
              set={setPa}
              hint={
                <>
                  <b className="font-semibold text-[#c4d0dc]">{providers}</b> provider{providers === 1 ? "" : "s"} ×{" "}
                  {nf.format(prospects)} = <b className="font-semibold text-[#c4d0dc]">{nf.format(totalProspects)}</b>{" "}
                  prospective patients / month
                </>
              }
            />

            <Sub>Reputation</Sub>
            <Field label="Current Google rating" min={1} max={5} step={0.1} value={rating} set={setRating} />
            <Field
              label="Number of reviews you have"
              min={0}
              max={3000}
              step={1}
              value={reviews}
              set={setReviews}
              hint="Slider caps at 600; type any number for more."
            />
            <Field label="Rating you want to display" min={3} max={5} step={0.1} value={target} set={setTarget} />

            <Sub>Economics &amp; pace</Sub>
            <Field
              label="New patients you actually see — per provider / month"
              min={0}
              max={500}
              step={1}
              value={newPatients}
              set={setNewPatients}
              hint="Your real number. The lower bound is built from this."
            />
            <Field
              label="New patients who look you up online — per provider / month"
              min={0}
              max={1000}
              step={1}
              value={prospects}
              set={setProspects}
              hint="Everyone who sees your rating while deciding. The upper bound is built from this."
            />
            <Field label="Revenue per patient, per year ($)" min={0} max={20000} step={10} value={rev} set={setRev} />
            <Field label="Years a patient typically stays" min={1} max={30} step={0.5} value={years} set={setYears} />
            <Field
              label="New reviews / month once you ask everyone"
              min={1}
              max={500}
              step={1}
              value={velocity}
              set={setVelocity}
            />
          </section>

          {/* READOUT */}
          <section className="grid gap-5" aria-label="The read">
            <div className="rounded-2xl border border-[#e9edf41a] bg-[#141d2c] p-6 sm:p-7">
              <div className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">The estimated bleed</div>
              <div className="mono mt-2 text-[2rem] font-semibold leading-none tracking-tight text-[#f2726b] sm:text-[2.6rem]">
                {usd.format(Math.round(floorBleedYr))} &ndash; {usd.format(Math.round(ceilBleedYr))}
              </div>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[#8fa0b3]">
                per year, as a range. Not a point estimate, because the honest evidence does not support one.
              </p>

              <div className="mono mt-3 text-[0.8rem] text-[#7d90a1]">
                ≈ {n1.format(floorLostYr)} to {n1.format(ceilLostYr)} new patients a year, at{" "}
                {usd.format(Math.round(ltv))} of lifetime revenue each
              </div>

              <p className="mt-4 text-[0.85rem] leading-relaxed text-[#8fa0b3]">
                The band is{" "}
                <span className="font-medium text-[#e9edf4]">
                  the range a Harvard Business School study actually measured
                </span>{" "}
                &mdash; five to nine percent of demand per full star, identified by comparing businesses that landed
                just above and just below a rounding threshold. Your {n1.format(starGap)}★ gap is worth that much of
                the new patients you already see.{" "}
                <span className="font-medium text-[#e9edf4]">
                  Most vendors quote you a single dramatic number instead.
                </span>{" "}
                There isn&rsquo;t one. There is a range, and this is it.
              </p>

              {/* capture bar */}
              <div className="mt-6">
                <div className="mb-2 flex flex-wrap gap-4 text-[0.78rem] text-[#8fa0b3]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: "rgba(127,215,226,0.8)" }} />
                    Prospects your rating clears now
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: "#f2726b" }} />
                    The gap you&rsquo;re leaving
                  </span>
                </div>
                <div
                  className="relative h-[34px] overflow-hidden rounded-lg border border-[#e9edf41a] bg-[#0c131e]"
                  role="img"
                  aria-label="Share of prospective patients captured now versus at your target rating"
                >
                  <div
                    className="absolute inset-y-0 left-0 transition-[width] duration-500"
                    style={{
                      width: `${(cTgt * 100).toFixed(1)}%`,
                      background:
                        "repeating-linear-gradient(45deg, rgba(242,114,107,0.22), rgba(242,114,107,0.22) 7px, transparent 7px, transparent 14px)",
                      borderRight: "2px dashed #f2726b",
                    }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 transition-[width] duration-500"
                    style={{ width: `${(cCur * 100).toFixed(1)}%`, background: "rgba(127,215,226,0.8)" }}
                  />
                </div>
                <div className="mt-2 space-y-2 text-[0.78rem] leading-relaxed text-[#7d90a1]">
                  <p>
                    At {n1.format(rating)}★, {Math.round(cCur * 100)}% of patients say your rating clears their personal
                    minimum; at {n1.format(Math.max(rating, target))}★ that becomes {Math.round(cTgt * 100)}%. On the
                    numbers you entered, that is about{" "}
                    <b className="font-semibold text-[#8fa0b3]">{n1.format(screenedOutMo)} people a month</b> who say
                    your rating would stop them.
                  </p>
                  <p>
                    We do not put a dollar figure on that line, because patients report far stricter standards than they
                    act on. Taken literally, these thresholds say a practice at 2.5★ would see almost no new patients at
                    all &mdash; which every working practice at 2.5★ disproves by continuing to exist. It shows you the
                    mechanism. The money above comes from what was measured, not what was reported.
                  </p>
                </div>
              </div>

              {/* badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="mono text-2xl font-semibold text-[#e9edf4]">{n1.format(rating)}</span>
                  <Stars value={rating} />
                  <span className="mono text-[0.66rem] uppercase tracking-[0.1em] text-[#7d90a1]">today</span>
                </div>
                <span className="text-xl text-[#7d90a1]" aria-hidden="true">→</span>
                <div className="flex items-center gap-3">
                  <span className="mono text-2xl font-semibold text-[#e9edf4]">{n1.format(target)}</span>
                  <Stars value={target} />
                  <span className="mono text-[0.66rem] uppercase tracking-[0.1em] text-[#7d90a1]">target</span>
                </div>
              </div>
            </div>

            {/* recovery */}
            <div className="rounded-2xl border border-[#e9edf41a] bg-[#141d2c] p-6 sm:p-7">
              <div className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d90a1]">
                What recovery takes — the arithmetic
              </div>
              <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-[#e9edf41a] bg-[#e9edf41a] sm:grid-cols-2">
                <Cell
                  k="Your badge first moves after"
                  v={isFinite(firstMove) ? nf.format(firstMove) : "0"}
                  good
                  x={
                    isFinite(firstMove)
                      ? `new 5★ reviews to display ${n1.format(nextDisp)}★ — it ticks up long before the average does.`
                      : "you already display near the ceiling."
                  }
                />
                <Cell
                  k="To display your target"
                  v={toTgt === 0 ? "0" : nf.format(toTgt)}
                  x={toTgt === 0 ? "you already display your target." : `new 5★ reviews to display ${n1.format(target)}★.`}
                />
                <Cell
                  k="At your review pace, that's"
                  v={toTgt === 0 ? "0" : n1.format(months)}
                  x="months of asking every patient."
                />
                <Cell k="The honest read" v={<span className="text-[0.95rem] leading-snug">{verdict}</span>} />
              </div>

              <details className="mt-4 group">
                <summary className="mono inline-flex cursor-pointer list-none items-center gap-2 text-[0.8rem] font-medium text-[#7fd7e2]">
                  <span className="text-[#7fd7e2]">[+]</span> Where these numbers come from
                </summary>
                <div className="mt-3 max-w-[68ch] space-y-3 text-[0.82rem] leading-relaxed text-[#7d90a1]">
                  <p>
                    <b className="font-semibold text-[#8fa0b3]">Why a range and not a number.</b> The best-identified
                    research on this question produces a range, not a point. Reporting the midpoint would imply a
                    precision the evidence does not have, and reporting the top of it would be marketing.
                  </p>
                  <p>
                    <b className="font-semibold text-[#8fa0b3]">The screening bar</b> shows the mechanism: the
                    cumulative share of patients whose self-reported minimum acceptable rating your rating clears. It is
                    built from the{" "}
                    <a
                      href="https://www.repugen.com/patient-review-survey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7fd7e2] underline-offset-2 hover:underline"
                    >
                      RepuGen 2025 Patient Review Survey
                    </a>{" "}
                    (1,212 patients), in which 78% report requiring four stars or better. We show it and deliberately
                    do not price it, because stated thresholds are aspirational: taken literally they would predict that
                    a practice at 2.5★ sees virtually no new patients, and practices at 2.5★ plainly do.
                  </p>
                  <p>
                    <b className="font-semibold text-[#8fa0b3]">The dollar band</b> comes from causal research on what
                    rating changes actually do to demand.{" "}
                    <a
                      href="https://www.hbs.edu/ris/Publication%20Files/12-016_a7e4a5a2-03f9-490d-b093-8f951238dba2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7fd7e2] underline-offset-2 hover:underline"
                    >
                      Luca (Harvard Business School)
                    </a>{" "}
                    used the rounding thresholds on Yelp as a natural experiment and found one full star moves revenue
                    5&ndash;9%, with independent businesses affected more than chains. In healthcare specifically,{" "}
                    <a
                      href="https://www.ajmc.com/view/the-impact-of-1-star-physician-ratings-on-new-patient-volume"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7fd7e2] underline-offset-2 hover:underline"
                    >
                      AJMC
                    </a>{" "}
                    found a single 1-star review cut new patient volume 2.3&ndash;2.6% for at least sixteen weeks. The
                    band you see is Luca&rsquo;s 5&ndash;9% range applied to the new patients you already report seeing,
                    which is why that input matters more than any other on this page.
                  </p>
                  <p>
                    Both ends are valued at patient lifetime revenue (revenue per year × years retained) and scale with
                    provider count. Luca&rsquo;s estimate comes from restaurants rather than clinics, and independent
                    businesses showed larger effects than chains &mdash; an independent practice is the closer analogue,
                    which is one reason the true figure may sit toward the upper end. The recovery counts on the left
                    are not estimates at all: they are exact arithmetic, assuming new reviews average five stars and
                    your displayed badge rounds to one decimal.
                  </p>
                </div>
              </details>
            </div>

            {/* disclaimer */}
            <div className="rounded-xl border border-dashed border-[#e9edf42e] px-5 py-4 text-[0.8rem] leading-relaxed text-[#7d90a1]">
              <b className="font-semibold text-[#8fa0b3]">Read this as a directional estimate, not a promise.</b> Defaults
              model an average family practice; results vary by specialty, market, and practice. The band is wide
              because the underlying evidence is genuinely uncertain, and a narrower number would be false precision.
              Nothing here guarantees a rating, a timeline, or revenue &mdash; no honest system can. What it shows is
              the shape of a gap that is usually invisible, and the arithmetic of closing it.
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-[rgba(127,215,226,0.35)] bg-[#141d2c] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="max-w-[46ch]">
                <h3 className="serif text-xl font-medium text-[#e9edf4] sm:text-2xl">
                  See a real read of your actual practice.
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-[#8fa0b3]">
                  This is the sketch. The real one is an on-site walkthrough, mystery-patient calls, and your own numbers
                  &mdash; done by one person who builds it, runs it, and reads it back.{" "}
                  <span className="text-[#c4d0dc]">M.A., Industrial &amp; Organizational Psychology.</span>
                </p>
              </div>
              <a
                href="/practice"
                className="mono inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#7fd7e2] px-5 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
              >
                Book a 20-minute read <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </main>

      <FaqAccordion
        items={FAQS}
        kicker="About this read"
        heading="What these numbers mean, and what they do not."
        intro="A calculator that will not explain its own assumptions is a sales tool wearing a lab coat. Here are ours."
      />

      <HealthcareCluster current="reputation-read" />

      <SiteFooter />
    </div>
  );
}
