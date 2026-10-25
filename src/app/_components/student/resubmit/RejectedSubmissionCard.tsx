"use client";

import { RawBackendSubmission } from "@/types/submission";

interface RejectedSubmissionCardProps {
  submission: RawBackendSubmission;
  onEdit: (submission: RawBackendSubmission) => void;
}

export function RejectedSubmissionCard({
  submission,
  onEdit,
}: RejectedSubmissionCardProps) {
  const dateObj = submission.createdAt ? new Date(submission.createdAt) : null;
  const formattedDate =
    dateObj && !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })
      : "Recent";

  const feedback =
    submission.rejectionReason ||
    submission.reviewComment ||
    "The evaluation team identified deficiencies in the deployment or codebase requirements. Please review guidelines and submit updated links.";

  return (
    <article className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-rose-500/25 p-6 md:p-7 shadow-[0_8px_32px_0_rgba(244,63,94,0.15)] relative overflow-hidden transition-all duration-300 hover:border-rose-500/40 hover:shadow-[0_12px_40px_0_rgba(244,63,94,0.25)]">
      {/* Ambient card accent glow */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none bg-rose-500/15"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-headline text-headline-sm font-semibold text-white tracking-tight">
              {submission.projectName || "Untitled Project"}
            </h2>
            <span className="text-outline font-headline text-[11px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/10 font-mono">
              ID: #{submission.id.slice(0, 8)}
            </span>
          </div>
          <p className="font-body text-body-sm text-on-surface-variant flex items-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-sm text-outline">
              calendar_today
            </span>
            Original Submission:{" "}
            <span suppressHydrationWarning>{formattedDate}</span>
          </p>
        </div>

        {/* Status Glass Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.25)] shrink-0 self-start">
          <span className="material-symbols-outlined text-base text-rose-400">
            error_outline
          </span>
          <span>REJECTED • Awaiting Fixes</span>
        </div>
      </div>

      {/* Description excerpt */}
      <p className="font-body text-body-md text-on-surface mt-4 leading-relaxed">
        {submission.description || "No project description provided."}
      </p>

      {/* Mentor Critique Box */}
      <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-200 text-xs space-y-1.5">
        <div className="font-headline font-semibold flex items-center gap-1.5 text-rose-300">
          <span className="material-symbols-outlined text-sm">assignment_late</span>
          <span>Mentor Consensus Rejection Reason:</span>
        </div>
        <p className="leading-relaxed font-body text-on-surface pl-5">
          {feedback}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10 my-5" />

      {/* Actions & Link Health Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* GitHub Repo Link */}
          {submission.repoUrl && (
            <a
              href={submission.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-headline text-xs flex items-center gap-1.5 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-base">code</span>
              <span>GitHub Repo</span>
              <span className="material-symbols-outlined text-xs text-outline">open_in_new</span>
            </a>
          )}

          {/* Live Demo Link */}
          {submission.liveLink && (
            <a
              href={submission.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-headline text-xs flex items-center gap-1.5 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-base">terminal</span>
              <span>Live Demo</span>
              <span className="material-symbols-outlined text-xs text-outline">open_in_new</span>
            </a>
          )}
        </div>

        {/* Edit Submission Button that triggers modal */}
        <button
          type="button"
          onClick={() => onEdit(submission)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-headline font-bold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">edit_note</span>
          <span>Edit Submission</span>
        </button>
      </div>
    </article>
  );
}
