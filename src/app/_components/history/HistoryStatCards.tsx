interface HistoryStatCardsProps {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
}

export function HistoryStatCards({
  totalCount,
  pendingCount,
  approvedCount,
}: HistoryStatCardsProps) {
  return (
    <section aria-label="Key Submission Metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Submitted Stat */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/10 p-5 flex items-center justify-between shadow-[0_8px_32px_0_rgba(124,58,237,0.18)] hover:border-white/20 transition-all duration-300">
        <div>
          <span className="font-headline text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Total Submitted
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-headline text-2xl md:text-3xl font-bold text-white">
              {totalCount}
            </span>
            <span className="font-headline text-xs text-primary flex items-center font-medium">
              <span className="material-symbols-outlined text-sm mr-0.5">north_east</span>
              Active Cycle
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary shadow-[0_0_14px_rgba(124,58,237,0.25)]">
          <span className="material-symbols-outlined text-2xl">inventory_2</span>
        </div>
      </div>

      {/* Under Evaluation Stat */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/10 p-5 flex items-center justify-between shadow-[0_8px_32px_0_rgba(124,58,237,0.18)] hover:border-white/20 transition-all duration-300">
        <div>
          <span className="font-headline text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Under Evaluation
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-headline font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              {pendingCount} Pending
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.2)]">
          <span className="material-symbols-outlined text-2xl">hourglass_top</span>
        </div>
      </div>

      {/* Approved Projects Stat */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/10 p-5 flex items-center justify-between shadow-[0_8px_32px_0_rgba(124,58,237,0.18)] hover:border-white/20 transition-all duration-300">
        <div>
          <span className="font-headline text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Approved Projects
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-headline font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="material-symbols-outlined text-base text-emerald-400">
                verified
              </span>
              {approvedCount} Approved
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.2)]">
          <span className="material-symbols-outlined text-2xl">task_alt</span>
        </div>
      </div>
    </section>
  );
}
