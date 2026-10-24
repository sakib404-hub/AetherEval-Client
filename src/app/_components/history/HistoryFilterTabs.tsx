"use client";

export type FilterStatus = "all" | "pending" | "approved" | "rejected";

interface HistoryFilterTabsProps {
  currentFilter: FilterStatus;
  onChangeFilter: (f: FilterStatus) => void;
  counts: { all: number; pending: number; approved: number; rejected: number };
}

export function HistoryFilterTabs({
  currentFilter,
  onChangeFilter,
  counts,
}: HistoryFilterTabsProps) {
  const tabs: { id: FilterStatus; label: string; count: number }[] = [
    { id: "all", label: "All Submissions", count: counts.all },
    { id: "pending", label: "Pending Review", count: counts.pending },
    { id: "approved", label: "Approved & Verified", count: counts.approved },
    { id: "rejected", label: "Action Required", count: counts.rejected },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = currentFilter === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeFilter(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-headline font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              isActive
                ? "bg-primary-container/30 border border-primary/50 text-white shadow-[0_0_16px_rgba(124,58,237,0.35)]"
                : "bg-white/[0.03] hover:bg-white/[0.08] text-on-surface-variant hover:text-white border border-white/5"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-white/10 text-on-surface-variant"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
