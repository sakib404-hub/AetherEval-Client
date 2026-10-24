import Link from "next/link";

interface HistoryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function HistoryHeader({
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing = false,
}: HistoryHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-white tracking-tight">
            My Submissions Ledger
          </h1>
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-headline font-semibold bg-white/[0.06] border border-white/10 text-primary">
            Live Peer Review
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant mt-1">
          Track review states, mentor remarks, and cryptographic receipts across distributed evaluation cycles.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search filter box */}
        <div className="relative flex-1 sm:w-64">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-lg">search</span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter by project or ID..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-body-sm text-white placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all backdrop-blur-md"
          />
        </div>

        {/* Refresh button */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh submissions from server"
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-on-surface hover:text-white transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-lg block ${
                isRefreshing ? "animate-spin text-primary" : ""
              }`}
            >
              refresh
            </span>
          </button>
        )}

        {/* New Submission Quick Action */}
        <Link
          href="/student-dashboard/submit"
          className="bg-primary-container/85 hover:bg-primary-container text-white font-headline text-body-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-[0_0_24px_rgba(124,58,237,0.45)] border border-white/20 active:scale-95 transition-all duration-150 shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>New Submission</span>
        </Link>
      </div>
    </header>
  );
}
