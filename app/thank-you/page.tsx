import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for reaching out to Rebel Minds Ops.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1220] px-4">
      <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm">
        <h1 className="mb-3 text-3xl font-bold text-white">Thank You</h1>
        <p className="mb-6 text-slate-300">
          We received your request. Our team will follow up shortly.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-[#7DE3E6] px-5 py-2.5 font-semibold text-[#0B1220] transition-colors hover:bg-[#5BC8CC]"
        >
          Back to Homepage
        </Link>
      </section>
    </main>
  );
}
