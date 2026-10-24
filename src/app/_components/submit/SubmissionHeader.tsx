import { StatusBadge } from "../ui/StatusBadge";

export function SubmissionHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-white tracking-tight">
            Project Submission Engine
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-headline uppercase tracking-wider bg-white/[0.08] text-primary border border-white/10">
            Cycle 2025-Q2
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
          Academic milestone evaluation • Quantum-encrypted verification ledger
        </p>
      </div>

      {/* Quick Context & Status Badges */}
      <div className="flex items-center gap-3">
        <div className="bg-primary-container/20 text-primary border border-primary/40 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold tracking-wider flex items-center gap-2 shadow-[0_0_12px_rgba(124,58,237,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>STUDENT NODE #4429</span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 text-body-xs font-headline text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Oracle Sync Ready</span>
        </div>
      </div>
    </header>
  );
}
