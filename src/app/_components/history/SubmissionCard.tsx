"use client";

export interface SubmissionItem {
  id: string;
  title: string;
  version: string;
  date: string;
  cycle: string;
  track: string;
  status: "pending" | "approved" | "rejected";
  score?: number;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  healthStatus?: string;
  mentorFeedback?: string;
}

interface SubmissionCardProps {
  item: SubmissionItem;
  onViewReceipt?: (item: SubmissionItem) => void;
}

export function SubmissionCard({ item, onViewReceipt }: SubmissionCardProps) {
  return (
    <article className="rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/15 p-6 md:p-7 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] relative overflow-hidden transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_40px_0_rgba(124,58,237,0.35)]">
      {/* Ambient card accent glow */}
      <div
        className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
          item.status === "approved"
            ? "bg-emerald-500/15"
            : item.status === "pending"
            ? "bg-amber-500/15"
            : "bg-rose-500/15"
        }`}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-headline text-headline-sm font-semibold text-white tracking-tight">
              {item.title}
            </h2>
            <span className="text-outline font-headline text-[11px] bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
              {item.version}
            </span>
          </div>
          <p className="font-body text-body-sm text-on-surface-variant flex items-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-sm text-outline">
              calendar_today
            </span>
            Submitted {item.date} • Cycle {item.cycle} • Track: {item.track}
          </p>
        </div>

        {/* Status Glass Pill */}
        {item.status === "pending" && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)] shrink-0 self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span>PENDING • In Peer Review</span>
          </div>
        )}

        {item.status === "approved" && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)] shrink-0 self-start">
            <span className="material-symbols-outlined text-base text-emerald-400">
              verified
            </span>
            <span>APPROVED • Verified Score: {item.score}/100</span>
          </div>
        )}

        {item.status === "rejected" && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)] shrink-0 self-start">
            <span className="material-symbols-outlined text-base text-rose-400">
              error_outline
            </span>
            <span>REJECTED • Action Required</span>
          </div>
        )}
      </div>

      {/* Description excerpt */}
      <p className="font-body text-body-md text-on-surface mt-4 leading-relaxed">
        {item.description}
      </p>

      {/* Tech Tags Chips */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-headline bg-white/[0.05] border border-white/12 text-on-surface-variant"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Optional Mentor Feedback Box for Rejected Status */}
      {item.status === "rejected" && item.mentorFeedback && (
        <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs space-y-1">
          <div className="font-headline font-semibold flex items-center gap-1.5 text-rose-300">
            <span className="material-symbols-outlined text-sm">chat</span>
            Anonymous Mentor Consensus Feedback:
          </div>
          <p className="leading-relaxed font-body text-on-surface">
            {item.mentorFeedback}
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px w-full bg-white/10 my-5" />

      {/* Actions & Link Health Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* GitHub Repo Link */}
          <a
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-headline text-xs flex items-center gap-1.5 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-base">code</span>
            <span>GitHub Repo</span>
            <span className="material-symbols-outlined text-xs text-outline">open_in_new</span>
          </a>

          {/* Live Demo Link */}
          {item.demoUrl && (
            <a
              href={item.demoUrl}
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

        {/* Health Check or Receipt Button */}
        {item.status === "approved" ? (
          <button
            type="button"
            onClick={() => onViewReceipt?.(item)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-primary-container/20 hover:bg-primary-container/30 text-primary border border-primary-container/40 transition-colors cursor-pointer shadow-[0_0_12px_rgba(124,58,237,0.3)]"
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>View Verification Ledger Receipt</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-headline bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Health: 200 OK — Operational</span>
          </div>
        )}
      </div>
    </article>
  );
}
