"use client";

import { useState } from "react";
import { SubmissionTableRow, MentorSubmissionItem } from "./SubmissionTableRow";

interface SubmissionTableProps {
  items: MentorSubmissionItem[];
  selectedIds: string[];
  onToggleSelectAll: (all: boolean) => void;
  onToggleSelectOne: (id: string) => void;
  onApprove: (id: string) => void;
  onRejectClick: (item: MentorSubmissionItem) => void;
}

export function SubmissionTable({
  items,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectOne,
  onApprove,
  onRejectClick,
}: SubmissionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 21;
  const isAllSelected = items.length > 0 && items.every((i) => selectedIds.includes(i.id));

  return (
    <div className="w-full rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden">
      {/* Scrollable Table Area */}
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full text-left border-collapse min-w-[840px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="py-4 px-4 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all submissions in current view"
                  checked={isAllSelected}
                  onChange={(e) => onToggleSelectAll(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer h-4 w-4"
                />
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider">
                Project & Track
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider">
                Student & Node
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider">
                Repository
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider">
                Deployment
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider">
                Submitted
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="py-4 px-4 text-xs font-headline font-semibold text-slate-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((sub) => (
                <SubmissionTableRow
                  key={sub.id}
                  item={sub}
                  isSelected={selectedIds.includes(sub.id)}
                  onToggleSelect={onToggleSelectOne}
                  onApprove={onApprove}
                  onReject={onRejectClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-16 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-slate-500">
                      inbox
                    </span>
                    <p className="font-headline text-sm font-medium">
                      No submissions found matching the selected criteria.
                    </p>
                    <p className="font-body text-xs text-slate-400">
                      Try clearing your search query or switching track filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-white/[0.01]">
        <div className="text-xs font-headline text-slate-400">
          Showing <span className="font-semibold text-white">1</span> to{" "}
          <span className="font-semibold text-white">{items.length}</span> of{" "}
          <span className="font-semibold text-white">124</span> Submissions
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-headline font-medium text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-xl text-xs font-headline font-semibold transition-all ${
                currentPage === page
                  ? "bg-primary text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="px-1 text-slate-400 text-xs">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            className={`w-8 h-8 rounded-xl text-xs font-headline font-semibold transition-all ${
              currentPage === totalPages
                ? "bg-primary text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
            }`}
          >
            {totalPages}
          </button>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-headline font-medium text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
