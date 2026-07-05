"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowDownToLine, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

const HAIRLINE = "rgba(233,237,244,0.10)";
const inputCls =
  "w-full rounded-lg border bg-[#0c131e] px-4 py-3 text-sm text-[#e9edf4] placeholder-[#5f6e85] outline-none transition focus:border-[rgba(127,215,226,0.5)]";
const inputStyle = { borderColor: HAIRLINE };

type Lang = "en" | "es";

const PDFS: Record<Lang, { href: string; label: string }> = {
  en: { href: "/downloads/the-impact-vs-risk-matrix.pdf", label: "The Impact vs. Risk Matrix (EN)" },
  es: { href: "/downloads/la-matrix-de-impacto-vs-riesgo.pdf", label: "La Matrix de Impacto vs. Riesgo (ES)" },
};

const PREVIEWS: Record<Lang, string> = {
  en: "/downloads/the-matrix-preview-en.png",
  es: "/downloads/la-matrix-preview-es.png",
};

const COPY = {
  en: {
    kicker: "Free tool · The audit method on one page",
    title: "The Impact vs. Risk Matrix",
    sub: "The diagnostic most people skip before buying or building AI. Map one process, score impact against risk, and know what to automate, what to run hybrid, and what to simply leave alone. No tool talk until the operation says so.",
    steps: [
      ["Map it", "One process that steals your time every week, written step by step."],
      ["Place it", "Every step lands in one of four quadrants: impact against risk."],
      ["Decide", "Automate, hybrid, or simplify. The quadrant decides, not the hype."],
      ["Define the return", "A measurable signal, written down before anything gets built."],
    ],
    formTitle: "Get the worksheet",
    formSub: "Tell us who you are and the download unlocks right here. Print it, fill it by hand, keep it on the desk.",
    nameLabel: "Your name or business",
    namePlaceholder: "Who's auditing?",
    emailLabel: "Email",
    emailPlaceholder: "you@yourbusiness.com",
    cta: "Get the worksheet",
    submitting: "One second…",
    validation: "Please add your name and email.",
    errorGeneric: "Something went wrong. Please try again.",
    successTitle: "It's yours.",
    successSub: "Both languages, same method. Print letter size.",
    fineprint: "The download unlocks immediately. No spam; your email is only how we send you the method when it grows.",
    langToggle: "Español",
  },
  es: {
    kicker: "Herramienta gratuita · El método de auditoría en una página",
    title: "La Matrix de Impacto vs. Riesgo",
    sub: "El diagnóstico que la mayoría se salta antes de comprar o construir IA. Mapea un proceso, califica impacto contra riesgo, y sabrás qué automatizar, qué correr en híbrido, y qué dejar en paz. Cero herramientas hasta que la operación lo pida.",
    steps: [
      ["Mapea", "Un proceso que te roba tiempo cada semana, escrito paso por paso."],
      ["Ubícalo", "Cada paso cae en uno de cuatro cuadrantes: impacto contra riesgo."],
      ["Decide", "Automatizar, híbrido, o simplificar. Decide el cuadrante, no el hype."],
      ["Define el retorno", "Una señal medible, escrita antes de construir nada."],
    ],
    formTitle: "Recibe la hoja",
    formSub: "Dinos quién eres y la descarga se abre aquí mismo. Imprímela, llénala a mano, déjala en el escritorio.",
    nameLabel: "Tu nombre o negocio",
    namePlaceholder: "¿Quién va a auditar?",
    emailLabel: "Correo",
    emailPlaceholder: "tu@tunegocio.com",
    cta: "Recibir la hoja",
    submitting: "Un segundo…",
    validation: "Agrega tu nombre y tu correo.",
    errorGeneric: "Algo salió mal. Intenta de nuevo.",
    successTitle: "Es tuya.",
    successSub: "Los dos idiomas, el mismo método. Imprime tamaño carta.",
    fineprint: "La descarga se abre de inmediato. Cero spam; tu correo es solo para mandarte el método cuando crezca.",
    langToggle: "English",
  },
} as const;

export default function MatrixClient() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Lang>("en");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (searchParams.get("lang") === "es") setLang("es");
  }, [searchParams]);

  const t = COPY[lang];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !email) {
      setError(t.validation);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: name,
          email,
          phone: "",
          type: "",
          priorityArea: "",
          notes:
            lang === "es"
              ? "Pidió La Matrix de Impacto vs. Riesgo (hoja de auditoría)"
              : "Requested The Impact vs. Risk Matrix (audit worksheet)",
          source: lang === "es" ? "Website · La Matrix (ES)" : "Website · La Matrix",
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.details || data?.error || "Request failed");
      }
      setSuccess(true);
      trackEvent("matrix_request", { lang });
    } catch (err) {
      console.error("Matrix request failed:", err);
      setError(t.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#0c131e]">
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Copy + form */}
            <div>
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7fd7e2]">
                  {t.kicker}
                </span>
                <button
                  type="button"
                  onClick={() => setLang(lang === "en" ? "es" : "en")}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-semibold text-[#8fa0b3] transition-colors hover:text-[#e9edf4]"
                  style={{ borderColor: "rgba(233,237,244,0.15)" }}
                >
                  {t.langToggle}
                </button>
              </div>

              <h1 className="serif text-4xl font-medium leading-[1.06] text-[#e9edf4] sm:text-5xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-[#8fa0b3]">
                {t.sub}
              </p>

              <ol className="mt-8 space-y-3">
                {t.steps.map(([label, desc], i) => (
                  <li key={label} className="flex gap-4 text-sm">
                    <span className="mono flex-shrink-0 text-[0.72rem] text-[#7fd7e2]">
                      0{i + 1}
                    </span>
                    <span className="text-[#8fa0b3]">
                      <span className="font-semibold text-[#e9edf4]">{label}.</span> {desc}
                    </span>
                  </li>
                ))}
              </ol>

              <div
                className="mt-10 rounded-xl border bg-[#141d2c] p-7"
                style={{ borderColor: HAIRLINE }}
              >
                {success ? (
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-[#7fd7e2]" />
                      <p className="text-lg font-semibold text-[#e9edf4]">{t.successTitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {([lang, lang === "en" ? "es" : "en"] as Lang[]).map((l, idx) => (
                        <a
                          key={l}
                          href={PDFS[l].href}
                          download
                          onClick={() => trackEvent("matrix_download", { lang: l })}
                          className={
                            idx === 0
                              ? "inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-5 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce]"
                              : "inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold text-[#8fa0b3] transition-colors hover:text-[#e9edf4]"
                          }
                          style={idx === 0 ? undefined : { borderColor: "rgba(233,237,244,0.15)" }}
                        >
                          <ArrowDownToLine className="h-4 w-4" /> {PDFS[l].label}
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-[#6f858c]">{t.successSub}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <p className="text-lg font-semibold text-[#e9edf4]">{t.formTitle}</p>
                      <p className="mt-1 text-sm text-[#8fa0b3]">{t.formSub}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          className="mb-1.5 block text-sm font-medium text-[#8fa0b3]"
                          htmlFor="matrix-name"
                        >
                          {t.nameLabel} <span className="text-[#7fd7e2]">*</span>
                        </label>
                        <input
                          id="matrix-name"
                          type="text"
                          required
                          placeholder={t.namePlaceholder}
                          value={name}
                          onChange={(e) => { setName(e.target.value); setError(""); }}
                          className={inputCls}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label
                          className="mb-1.5 block text-sm font-medium text-[#8fa0b3]"
                          htmlFor="matrix-email"
                        >
                          {t.emailLabel} <span className="text-[#7fd7e2]">*</span>
                        </label>
                        <input
                          id="matrix-email"
                          type="email"
                          required
                          placeholder={t.emailPlaceholder}
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(""); }}
                          className={inputCls}
                          style={inputStyle}
                        />
                      </div>
                    </div>
                    {error && <p className="text-sm text-[#ff8f8f]">{error}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#7fd7e2] px-6 py-3 text-sm font-semibold text-[#0c131e] transition-colors hover:bg-[#5cc3ce] disabled:opacity-60"
                    >
                      <ArrowDownToLine className="h-4 w-4" />
                      {submitting ? t.submitting : t.cta}
                    </button>
                    <p className="text-xs leading-relaxed text-[#6f858c]">{t.fineprint}</p>
                  </form>
                )}
              </div>
            </div>

            {/* Worksheet preview */}
            <div className="relative mx-auto w-full max-w-md lg:mt-10">
              <Image
                src={PREVIEWS[lang]}
                alt={
                  lang === "es"
                    ? "Vista previa de La Matrix de Impacto vs. Riesgo: hoja de auditoría de una página"
                    : "Preview of The Impact vs. Risk Matrix: one-page audit worksheet"
                }
                width={850}
                height={1100}
                className="w-full rounded-lg border shadow-2xl"
                style={{ borderColor: "rgba(233,237,244,0.14)" }}
                priority
              />
              <p className="mono mt-3 text-center text-[0.66rem] uppercase tracking-[0.16em] text-[#6f858c]">
                {lang === "es" ? "Una página · carta · imprimible" : "One page · letter · printable"}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
