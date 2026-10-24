export function VerificationChecklist() {
  const guidelines = [
    {
      icon: "schedule",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      text: "Repository accessibility checks occur immediately after deadline closing window.",
    },
    {
      icon: "block",
      color: "text-primary bg-purple-500/10 border-purple-500/20",
      text: "Duplicate GitHub URLs or unverified authorship signatures are permanently blocked.",
    },
    {
      icon: "history_edu",
      color: "text-tertiary bg-blue-500/10 border-blue-500/20",
      text: "Review feedback & cryptographic hash receipts are published directly to your History view.",
    },
    {
      icon: "speed",
      color: "text-amber-300 bg-amber-500/10 border-amber-500/20",
      text: "Autonomous test suite pass rate must exceed 85% for double-blind peer-review dispatch.",
    },
  ];

  return (
    <div className="rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-6 md:p-7 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)] relative overflow-hidden">
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-primary-container/20 border border-primary/30 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-lg">verified_user</span>
        </div>
        <div>
          <h3 className="font-headline text-headline-sm text-white font-semibold">
            Verification Guidelines
          </h3>
          <p className="text-[11px] text-outline font-body">Standard automated criteria</p>
        </div>
      </div>

      <ul className="space-y-4">
        {guidelines.map((g, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={`p-1 rounded-lg border mt-0.5 shrink-0 ${g.color}`}>
              <span className="material-symbols-outlined text-sm">{g.icon}</span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
              {g.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
