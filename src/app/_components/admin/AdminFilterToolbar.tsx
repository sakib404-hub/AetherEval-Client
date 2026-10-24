"use client";

import { motion } from "framer-motion";

export type AdminFilterStatus = "pending" | "active" | "rejected";

export const DISCIPLINE_OPTIONS = [
  "All Disciplines",
  "Distributed Consensus",
  "Post-Quantum Cryptography",
  "EVM Internals",
  "Autonomous Systems",
  "Quantum Computing",
] as const;

export const DOMAIN_OPTIONS = [
  "All Domains",
  "stanford.edu",
  "mit.edu",
  "berkeley.edu",
  "ox.ac.uk",
  "ethz.ch",
] as const;

export type DisciplineOption = (typeof DISCIPLINE_OPTIONS)[number];
export type DomainOption = (typeof DOMAIN_OPTIONS)[number];

interface AdminFilterToolbarProps {
  currentStatus: AdminFilterStatus;
  onChangeStatus: (s: AdminFilterStatus) => void;
  currentDiscipline: DisciplineOption;
  onChangeDiscipline: (d: DisciplineOption) => void;
  currentDomain: DomainOption;
  onChangeDomain: (dom: DomainOption) => void;
  counts: {
    pending: number;
    active: number;
    rejected: number;
  };
  selectedCount?: number;
  onBatchApprove?: () => void;
}

export function AdminFilterToolbar({
  currentStatus,
  onChangeStatus,
  currentDiscipline,
  onChangeDiscipline,
  currentDomain,
  onChangeDomain,
  counts,
  selectedCount = 0,
  onBatchApprove,
}: AdminFilterToolbarProps) {
  const tabs: { id: AdminFilterStatus; label: string; count: number }[] = [
    { id: "pending", label: "Pending Review", count: counts.pending },
    { id: "active", label: "Active Mentors", count: counts.active },
    { id: "rejected", label: "Rejected", count: counts.rejected },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
      {/* Segmented Tab Controls */}
      <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = currentStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeStatus(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-xs font-headline font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-white shadow-[0_0_16px_rgba(124,58,237,0.35)]"
                  : "text-on-surface-variant hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeAdminTab"
                  className="absolute inset-0 rounded-xl bg-primary-container/40 border border-primary/40 pointer-events-none"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`relative z-10 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? "bg-primary/30 text-primary"
                    : "bg-white/10 text-on-surface-variant"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filters & Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Discipline Filter Dropdown */}
        <div className="relative">
          <select
            value={currentDiscipline}
            onChange={(e) => onChangeDiscipline(e.target.value as DisciplineOption)}
            aria-label="Filter candidates by technical discipline"
            className="appearance-none px-3.5 pr-8 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-on-surface text-xs font-headline backdrop-blur-md transition-all cursor-pointer outline-none focus:border-primary"
          >
            {DISCIPLINE_OPTIONS.map((disc) => (
              <option key={disc} value={disc} className="bg-slate-900 text-white">
                {disc}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Domain Filter Dropdown */}
        <div className="relative">
          <select
            value={currentDomain}
            onChange={(e) => onChangeDomain(e.target.value as DomainOption)}
            aria-label="Filter candidates by institutional domain"
            className="appearance-none px-3.5 pr-8 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-on-surface text-xs font-headline backdrop-blur-md transition-all cursor-pointer outline-none focus:border-primary"
          >
            {DOMAIN_OPTIONS.map((dom) => (
              <option key={dom} value={dom} className="bg-slate-900 text-white">
                {dom}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Batch Actions Button */}
        {selectedCount > 0 && onBatchApprove ? (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onBatchApprove}
            className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-headline font-semibold shadow-[0_0_18px_rgba(16,185,129,0.3)] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            <span>Batch Approve ({selectedCount})</span>
          </motion.button>
        ) : (
          <button
            type="button"
            onClick={() => alert("Batch applicant queue selection enabled.")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-container/80 to-secondary-container/80 hover:from-primary-container hover:to-secondary-container border border-primary/40 text-white font-headline text-xs shadow-[0_0_18px_rgba(124,58,237,0.3)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">rule_folder</span>
            <span>Batch Actions</span>
          </button>
        )}
      </div>
    </div>
  );
}
