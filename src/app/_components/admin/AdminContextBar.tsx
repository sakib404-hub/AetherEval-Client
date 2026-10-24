"use client";

interface AdminContextBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function AdminContextBar({
  searchQuery,
  onSearchChange,
}: AdminContextBarProps) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-[10px] font-headline uppercase font-bold tracking-wider bg-primary-container/30 border border-primary/40 text-primary flex items-center gap-1.5 shadow-[0_0_12px_rgba(124,58,237,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            Admin Oracle
          </span>
          <span className="text-on-surface-variant text-xs font-headline">
            • Access Tier Level 4
          </span>
        </div>
        <h1 className="text-2xl md:text-headline-lg font-headline font-bold text-white tracking-tight">
          Mentor Applications
        </h1>
        <p className="text-body-md font-body text-on-surface-variant mt-1">
          Approve or reject mentor registrations before they can review student work and sign cryptographic evaluations.
        </p>
      </div>

      {/* Right Quick Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Quick Search Pill Input */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, ENS, or lab..."
            className="w-full bg-white/[0.04] border border-white/10 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-2xl pl-10 pr-4 py-2.5 text-xs font-body text-white placeholder-on-surface-variant/60 backdrop-blur-md transition-all shadow-inner outline-none"
          />
        </div>

        {/* Network Node Status */}
        <div className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-2 whitespace-nowrap shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
          <span className="text-xs font-headline text-on-surface">
            Quorum Verified •{" "}
            <span className="text-primary font-mono font-semibold">
              Node #AD-01
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
