"use client";

import { useState } from "react";
import { ApplicantTableRow, MentorApplicant } from "./ApplicantTableRow";

interface ApplicantTableProps {
  applicants: MentorApplicant[];
  selectedIds: string[];
  activeInspectionId: string;
  onToggleSelectAll: (all: boolean) => void;
  onToggleSelectOne: (id: string) => void;
  onSelectInspection: (applicant: MentorApplicant) => void;
  onApprove: (id: string) => void;
  onReject: (applicant: MentorApplicant) => void;
}

export function ApplicantTable({
  applicants,
  selectedIds,
  activeInspectionId,
  onToggleSelectAll,
  onToggleSelectOne,
  onSelectInspection,
  onApprove,
  onReject,
}: ApplicantTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const isAllSelected =
    applicants.length > 0 && applicants.every((a) => selectedIds.includes(a.id));

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-2xl border border-white/15 overflow-hidden shadow-[0_8px_32px_0_rgba(124,58,237,0.18)] mb-8">
      {/* Scrollable Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
              <th className="py-4 px-4 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all applicants in current view"
                  checked={isAllSelected}
                  onChange={(e) => onToggleSelectAll(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer h-4 w-4"
                />
              </th>
              <th className="py-4 px-4" scope="col">
                Applicant &amp; Email
              </th>
              <th className="py-4 px-4" scope="col">
                Technical Expertise
              </th>
              <th className="py-4 px-4" scope="col">
                Portfolio &amp; Repos
              </th>
              <th className="py-4 px-4" scope="col">
                Applied Date
              </th>
              <th className="py-4 px-4" scope="col">
                Status
              </th>
              <th className="py-4 px-4 text-right" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06] text-xs font-body">
            {applicants.length > 0 ? (
              applicants.map((app) => (
                <ApplicantTableRow
                  key={app.id}
                  applicant={app}
                  isSelected={selectedIds.includes(app.id)}
                  isActiveInspection={activeInspectionId === app.id}
                  onToggleSelect={onToggleSelectOne}
                  onSelectInspection={onSelectInspection}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-16 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-slate-500">
                      folder_open
                    </span>
                    <p className="font-headline text-sm font-medium">
                      No mentor applications match the current query or filter.
                    </p>
                    <p className="font-body text-xs text-slate-400">
                      Try resetting domain filters or clearing your search term.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Footer Status */}
      <div className="p-4 px-6 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span>
            Showing <span className="text-white font-medium">1 - {applicants.length}</span> of{" "}
            <span className="text-white font-medium">14</span> pending applications
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-on-surface-variant hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Previous Page"
          >
            <span className="material-symbols-outlined text-[16px] leading-none">
              chevron_left
            </span>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-xl font-mono text-xs font-semibold transition-all ${
                currentPage === page
                  ? "bg-primary-container/40 border border-primary/40 text-white shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                  : "text-on-surface-variant hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-on-surface-variant hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Next Page"
          >
            <span className="material-symbols-outlined text-[16px] leading-none">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
