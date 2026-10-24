interface MentorMetricCardsProps {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

export function MentorMetricCards({
  totalCount,
  pendingCount,
  approvedCount,
  rejectedCount,
}: MentorMetricCardsProps) {
  return (
    <section aria-label="Mentor Key Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {/* Total Submissions */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-5 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)] hover:border-primary/40 transition-all duration-300 group">
        <div className="flex justify-between items-start">
          <span className="text-xs font-headline text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Submissions
          </span>
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(124,58,237,0.25)]">
            <span className="material-symbols-outlined text-[20px]">layers</span>
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-headline font-bold text-white tracking-tight">
            {totalCount}
          </span>
          <span className="text-xs font-headline font-semibold text-primary">+12 today</span>
        </div>
        <p className="text-body-xs font-body text-slate-400 mt-1">Across 3 distributed tracks</p>
      </div>

      {/* Pending Review */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-amber-500/20 p-5 shadow-[0_8px_32px_0_rgba(245,158,11,0.12)] hover:border-amber-400/50 transition-all duration-300 group">
        <div className="flex justify-between items-start">
          <span className="text-xs font-headline text-amber-200 uppercase tracking-wider font-semibold">
            Pending Review
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <span className="material-symbols-outlined text-[20px]">pending</span>
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-headline font-bold text-amber-300 tracking-tight">
            {pendingCount}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-headline font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            Action Required
          </span>
        </div>
        <p className="text-body-xs font-body text-slate-400 mt-1">Requires architectural evaluation</p>
      </div>

      {/* Approved */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-emerald-500/20 p-5 shadow-[0_8px_32px_0_rgba(16,185,129,0.12)] hover:border-emerald-400/50 transition-all duration-300 group">
        <div className="flex justify-between items-start">
          <span className="text-xs font-headline text-emerald-200 uppercase tracking-wider font-semibold">
            Approved
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-headline font-bold text-emerald-300 tracking-tight">
            {approvedCount}
          </span>
          <span className="text-xs font-headline font-semibold text-emerald-400">71.7% pass rate</span>
        </div>
        <p className="text-body-xs font-body text-slate-400 mt-1">Verified on quantum ledger</p>
      </div>

      {/* Rejected */}
      <div className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-rose-500/20 p-5 shadow-[0_8px_32px_0_rgba(244,63,94,0.12)] hover:border-rose-400/50 transition-all duration-300 group">
        <div className="flex justify-between items-start">
          <span className="text-xs font-headline text-rose-200 uppercase tracking-wider font-semibold">
            Rejected
          </span>
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(244,63,94,0.3)]">
            <span className="material-symbols-outlined text-[20px]">cancel</span>
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-headline font-bold text-rose-300 tracking-tight">
            {rejectedCount}
          </span>
          <span className="text-xs font-headline font-semibold text-rose-400">13.7% rate</span>
        </div>
        <p className="text-body-xs font-body text-slate-400 mt-1">Feedback dispatched to students</p>
      </div>
    </section>
  );
}
