"use client";

interface AdminMetricCardsProps {
  pendingCount: number;
  activeCount: number;
  rejectedCount: number;
  approvalRate?: string;
}

export function AdminMetricCards({
  pendingCount,
  activeCount,
  rejectedCount,
  approvalRate = "88.3%",
}: AdminMetricCardsProps) {
  return (
    <section
      aria-label="Admin Key Performance Indicators"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 py-8"
    >
      {/* Card 1: Pending Verification */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)] flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/40 transition-all duration-300">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
            Pending Verification
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            +4 new today
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight">
            {pendingCount}
          </span>
          <span className="text-xs font-body text-on-surface-variant">
            candidates
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-amber-400">
            hourglass_top
          </span>
          <span>Requires credential check</span>
        </div>
      </div>

      {/* Card 2: Active Mentors */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)] flex flex-col justify-between relative overflow-hidden group hover:border-emerald-400/40 transition-all duration-300">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
            Active Mentors
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Verified
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight">
            {activeCount}
          </span>
          <span className="text-xs font-body text-on-surface-variant">
            delegates
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">
            domain_verification
          </span>
          <span>Covering 12 academic disciplines</span>
        </div>
      </div>

      {/* Card 3: Rejected / Flagged */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)] flex flex-col justify-between relative overflow-hidden group hover:border-rose-400/40 transition-all duration-300">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
            Rejected / Flagged
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Review archived
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight">
            {rejectedCount}
          </span>
          <span className="text-xs font-body text-on-surface-variant">
            disqualified
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-rose-400">
            gpp_bad
          </span>
          <span>Failed domain verification</span>
        </div>
      </div>

      {/* Card 4: Approval Rate */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)] flex flex-col justify-between relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container/20 rounded-full blur-2xl group-hover:bg-primary-container/30 transition-colors pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
            Approval Rate
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-headline font-bold bg-primary-container/30 border border-primary/40 text-primary flex items-center gap-1 shadow-[0_0_10px_rgba(124,58,237,0.3)]">
            <span className="material-symbols-outlined text-[12px]">bolt</span>
            Fast-track 2.1 hrs avg
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight">
            {approvalRate}
          </span>
          <span className="text-xs font-headline font-medium text-emerald-400">
            +2.4% MoM
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-primary">
            verified
          </span>
          <span>Quantum-attested credentials</span>
        </div>
      </div>
    </section>
  );
}
