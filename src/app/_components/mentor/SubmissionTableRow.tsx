"use client";

import { StatusBadge } from "@/app/_components/ui/StatusBadge";

export interface MentorSubmissionItem {
  id: string;
  title: string;
  track: string;
  studentName: string;
  studentNode: string;
  repoUrl: string;
  repoBranch: string;
  demoUrl?: string;
  deploymentStatus: "Live" | "Staging" | "Offline" | "Pending";
  submittedTime: string;
  status: "pending" | "approved" | "rejected";
  merkleHash: string;
  score?: number;
}

interface SubmissionTableRowProps {
  item: MentorSubmissionItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (item: MentorSubmissionItem) => void;
}

export function SubmissionTableRow({
  item,
  isSelected,
  onToggleSelect,
  onApprove,
  onReject,
}: SubmissionTableRowProps) {
  const isApproved = item.status === "approved";
  const isRejected = item.status === "rejected";
  const canApprove = !isApproved && !isRejected;
  const canReject = !isApproved && !isRejected;

  return (
    <tr
      className={`border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-200 group ${
        isSelected ? "bg-primary/[0.05]" : ""
      }`}
    >
      {/* Checkbox */}
      <td className="py-4 px-4 w-10">
        <input
          type="checkbox"
          aria-label={`Select submission for ${item.title}`}
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer h-4 w-4"
        />
      </td>

      {/* Project & Track */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1">
          <span className="font-headline font-semibold text-white text-sm group-hover:text-primary transition-colors">
            {item.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5">
              <span className="material-symbols-outlined text-[13px] text-primary">hub</span>
              {item.track}
            </span>
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]" title={item.merkleHash}>
              #{item.merkleHash.slice(0, 8)}
            </span>
          </div>
        </div>
      </td>

      {/* Student & Node */}
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="text-sm font-headline text-on-surface font-medium">
            {item.studentName}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[13px] text-slate-400">verified_user</span>
            {item.studentNode}
          </span>
        </div>
      </td>

      {/* Code Repository */}
      <td className="py-4 px-4">
        <a
          href={item.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-primary bg-white/[0.03] hover:bg-white/[0.08] px-2.5 py-1.5 rounded-xl border border-white/10 transition-colors"
          title={`View ${item.repoUrl}`}
        >
          <span className="material-symbols-outlined text-[15px]">code</span>
          <span className="truncate max-w-[110px]">{item.repoBranch}</span>
          <span className="material-symbols-outlined text-[12px] opacity-60">open_in_new</span>
        </a>
      </td>

      {/* Deployment Status */}
      <td className="py-4 px-4">
        {item.demoUrl ? (
          <a
            href={item.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border transition-all duration-200 bg-white/[0.03] hover:border-emerald-500/40"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.deploymentStatus === "Live"
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : item.deploymentStatus === "Staging"
                  ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                  : "bg-slate-400"
              }`}
            />
            <span
              className={
                item.deploymentStatus === "Live"
                  ? "text-emerald-300"
                  : item.deploymentStatus === "Staging"
                  ? "text-amber-300"
                  : "text-slate-400"
              }
            >
              {item.deploymentStatus}
            </span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            N/A
          </span>
        )}
      </td>

      {/* Submitted Time */}
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="text-xs font-headline text-slate-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          {item.submittedTime}
        </span>
      </td>

      {/* Status */}
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <StatusBadge
            variant={item.status}
            label={item.status}
          />
          {item.score !== undefined && (
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
              {item.score}/100
            </span>
          )}
        </div>
      </td>

      {/* Evaluation Actions */}
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          {/* Quick Approve */}
          <button
            type="button"
            onClick={() => canApprove && onApprove(item.id)}
            disabled={!canApprove}
            title={
              isApproved
                ? "Already Approved"
                : isRejected
                ? "Rejected submissions cannot be approved"
                : "Quick Approve"
            }
            className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
              !canApprove
                ? "bg-white/[0.02] text-slate-500 border-white/5 opacity-40 cursor-not-allowed"
                : "bg-white/[0.04] hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border-white/10 hover:border-emerald-500/40 cursor-pointer"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">check</span>
          </button>

          {/* Quick Reject */}
          <button
            type="button"
            onClick={() => canReject && onReject(item)}
            disabled={!canReject}
            title={
              isRejected
                ? "Already Rejected"
                : isApproved
                ? "Approved submissions cannot be rejected"
                : "Reject & Provide Feedback"
            }
            className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
              !canReject
                ? "bg-white/[0.02] text-slate-500 border-white/5 opacity-40 cursor-not-allowed"
                : "bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border-white/10 hover:border-rose-500/40 cursor-pointer"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
