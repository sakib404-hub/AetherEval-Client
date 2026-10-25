"use client";

import Link from "next/link";
import { GlassButton } from "@/app/_components/ui/GlassButton";

interface ResubmitHeaderProps {
  rejectedCount: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function ResubmitHeader({
  rejectedCount,
  onRefresh,
  isRefreshing = false,
}: ResubmitHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/student-dashboard"
            className="inline-flex items-center gap-1 text-xs font-headline text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Return to History</span>
          </Link>
          <span className="text-white/20">•</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-headline font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>Remediation Queue</span>
          </span>
        </div>

        <h1 className="font-headline text-headline-md md:text-headline-lg font-bold text-white tracking-tight flex items-center gap-2.5">
          <span className="material-symbols-outlined text-rose-400 text-3xl">
            published_with_changes
          </span>
          <span>Project Resubmissions</span>
        </h1>

        <p className="font-body text-body-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Submissions flagged by peer mentors require revision. Address the mentor consensus critiques below, update your repository or deployment links, and resubmit for evaluation.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
        <div className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
          <div className="text-[10px] font-headline text-outline uppercase tracking-wider">
            Flagged Projects
          </div>
          <div className="text-lg font-headline font-bold text-rose-300">
            {rejectedCount}
          </div>
        </div>

        {onRefresh && (
          <GlassButton
            type="button"
            variant="frosted"
            size="sm"
            onClick={onRefresh}
            loading={isRefreshing}
            icon="sync"
          >
            Refresh
          </GlassButton>
        )}
      </div>
    </div>
  );
}
