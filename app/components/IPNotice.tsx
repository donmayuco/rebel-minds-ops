export default function IPNotice() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
      <span className="mt-0.5 flex-shrink-0 text-[#7DE3E6]">
        🔒
      </span>
      <p className="text-xs leading-relaxed text-slate-500 italic">
        We intentionally don&apos;t publish implementation details.
        The methodology behind our systems is the result of
        significant original research — combining I-O Psychology,
        behavioral design, and operational architecture. We share
        outcomes freely. We protect the work that produces them.
        That protection is part of what you&apos;re hiring us for.
      </p>
    </div>
  );
}
