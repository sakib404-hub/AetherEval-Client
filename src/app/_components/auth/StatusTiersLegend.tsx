export function StatusTiersLegend() {
  return (
    <div className="pt-2 pb-1 px-3.5 py-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
      <div className="flex justify-between items-center text-xs text-on-surface-variant font-headline">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-primary">
            badge
          </span>
          Protocol Node Status Tiers:
        </span>
        <span className="text-[11px] text-slate-400 font-body">
          Real-time ledger state
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Pending Badge */}
        <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Pending Review
        </span>

        {/* Approved Badge */}
        <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Approved & Verified
        </span>

        {/* Rejected Badge */}
        <span className="bg-rose-500/10 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 shadow-[0_0_8px_rgba(239,68,68,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          Rejected / Revoked
        </span>
      </div>
    </div>
  );
}
