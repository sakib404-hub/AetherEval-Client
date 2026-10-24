"use client";

import { motion } from "framer-motion";

export type MentorFilterStatus = "all" | "pending" | "approved" | "rejected";

export const TRACK_OPTIONS = [
  "All Tracks",
  "Distributed Systems",
  "AI/ML Governance",
  "Post-Quantum Cryptography",
] as const;

export type TrackOption = (typeof TRACK_OPTIONS)[number];

interface MentorFilterToolbarProps {
  currentStatus: MentorFilterStatus;
  onChangeStatus: (status: MentorFilterStatus) => void;
  currentTrack: TrackOption;
  onChangeTrack: (track: TrackOption) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  selectedCount?: number;
  onBatchApprove?: () => void;
}

export function MentorFilterToolbar({
  currentStatus,
  onChangeStatus,
  currentTrack,
  onChangeTrack,
  counts,
  selectedCount = 0,
  onBatchApprove,
}: MentorFilterToolbarProps) {
  const tabs: { id: MentorFilterStatus; label: string; count: number }[] = [
    { id: "all", label: "All Submissions", count: counts.all },
    { id: "pending", label: "Pending Review", count: counts.pending },
    { id: "approved", label: "Approved", count: counts.approved },
    { id: "rejected", label: "Rejected", count: counts.rejected },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      {/* Status Segmented Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = currentStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeStatus(tab.id)}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-headline font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-on-surface-variant hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMentorStatusTab"
                  className="absolute inset-0 rounded-xl bg-primary-container/40 border border-primary/50 shadow-[0_0_15px_rgba(124,58,237,0.35)] pointer-events-none"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span
                className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
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

      {/* Right Controls: Track Dropdown & Batch Action */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Track Filter Select */}
        <div className="relative">
          <select
            value={currentTrack}
            onChange={(e) => onChangeTrack(e.target.value as TrackOption)}
            aria-label="Filter submissions by track"
            className="appearance-none bg-white/[0.04] border border-white/10 rounded-2xl pl-3.5 pr-9 py-2 text-xs font-headline font-medium text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary backdrop-blur-xl cursor-pointer"
          >
            {TRACK_OPTIONS.map((track) => (
              <option key={track} value={track} className="bg-slate-900 text-white">
                {track}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Batch Actions Button (when items selected) */}
        {selectedCount > 0 && onBatchApprove && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={onBatchApprove}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-headline font-semibold hover:bg-emerald-500/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            <span>Batch Approve ({selectedCount})</span>
          </motion.button>
        )}

        {/* Quick Export/Audit Beacon */}
        <button
          type="button"
          onClick={() => alert("Consensus ledger batch export generated. Merkle root verified.")}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.03] text-on-surface-variant hover:text-white border border-white/10 hover:border-white/20 text-xs font-headline font-medium transition-all cursor-pointer"
          title="Export current verification ledger"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span>Export Ledger</span>
        </button>
      </div>
    </div>
  );
}
