"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import HealthcareCluster from "@/app/components/HealthcareCluster";

// ─── Model ───────────────────────────────────────────────────────────────────

// Capture curve: rating -> estimated share of prospects who choose you.
// Illustrative and conservative; anchored on the well-documented pattern that
// most patients screen out practices below ~4 stars before making contact.
const CAP: [number, number][] = [
  [1, 0.04], [1.5, 0.06], [2, 0.1], [2.5, 0.18], [3, 0.3],
  [3.5, 0.5], [4, 0.75], [4.5, 0.92], [5, 1],
];
function capture(r: number): number {
  if (r <= CAP[0][0]) return CAP[0][1];
  if (r >= CAP[CAP.length - 1][0]) return CAP[CAP.length - 1][1];
  for (let i = 0; i < CAP.length - 1; i++) {
    const a = CAP[i];
    const b = CAP[i + 1];
    if (r >= a[0] && r <= b[0]) {
      const t = (r - a[0]) / (b[0] - a[0]);
      return a[1] + t * (b[1] - a[1]);
    }
  }
  return 1;
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

  const providers = Math.max(0, Math.round(md + pa));
  const totalProspects = providers * prospects;
  const ltv = rev * years;
  const cCur = capture(rating);
  const cTgt = capture(Math.max(rating, target));
  const gap = Math.max(0, cTgt - cCur);
  const lostMo = totalProspects * gap;
  const lostYr = lostMo * 12;
  const bleedYr = lostYr * ltv;

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
              label="New patients who look you up online — per provider / month"
              min={0}
              max={1000}
              step={1}
              value={prospects}
              set={setProspects}
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
              <div className="mono mt-2 text-[3rem] font-semibold leading-none tracking-tight text-[#f2726b] sm:text-[3.5rem]">
                {usd.format(Math.round(bleedYr))}
              </div>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-[#8fa0b3]">
                left on the table each year &mdash; roughly{" "}
                <b className="font-semibold text-[#e9edf4]">{nf.format(Math.round(lostYr))}</b> patients a year who
                choose elsewhere because of the rating gap.
              </p>
              <div className="mono mt-2 text-[0.8rem] text-[#7d90a1]">
                ≈ {usd.format(Math.round(bleedYr / 12))} / month · {n1.format(lostMo)} patients / month
              </div>

              {/* capture bar */}
              <div className="mt-6">
                <div className="mb-2 flex flex-wrap gap-4 text-[0.78rem] text-[#8fa0b3]">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: "rgba(127,215,226,0.8)" }} />
                    Patients you win now
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
                <div className="mt-2 text-[0.78rem] text-[#7d90a1]">
                  At {n1.format(rating)}★ you capture an estimated {Math.round(cCur * 100)}% of prospects; at{" "}
                  {n1.format(Math.max(rating, target))}★ that rises to {Math.round(cTgt * 100)}%.
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
                  <span className="text-[#7fd7e2]">[+]</span> How the bleed is estimated
                </summary>
                <p className="mt-3 max-w-[68ch] text-[0.82rem] leading-relaxed text-[#7d90a1]">
                  Consumer-review research consistently finds that most patients screen out practices below about four
                  stars before they ever make contact. This tool models that as a capture curve &mdash; the share of
                  prospects who choose you rises with your rating &mdash; and estimates the bleed as the patients lost
                  across that gap, valued at their lifetime revenue (revenue per year × years retained). The prospect
                  pool scales with your provider count. The curve is illustrative and conservative; your real capture
                  depends on market, specialty, and competition. The recovery counts are exact arithmetic, assuming new
                  reviews average five stars and your displayed badge rounds to one decimal.
                </p>
              </details>
            </div>

            {/* disclaimer */}
            <div className="rounded-xl border border-dashed border-[#e9edf42e] px-5 py-4 text-[0.8rem] leading-relaxed text-[#7d90a1]">
              <b className="font-semibold text-[#8fa0b3]">Read this as a directional estimate, not a promise.</b> Defaults
              model an average family practice; results vary by specialty, market, and practice. Nothing here guarantees
              a rating, a timeline, or revenue &mdash; no honest system can. What it shows is the shape of a gap that is
              usually invisible, and the arithmetic of closing it.
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

      <HealthcareCluster current="reputation-read" />

      <SiteFooter />
    </div>
  );
}
