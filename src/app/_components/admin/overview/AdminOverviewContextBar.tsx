"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StatusBadge } from "@/app/_components/ui/StatusBadge";
import { GlassButton } from "@/app/_components/ui/GlassButton";
import { ResolvedAdminMetrics } from "./admin-data-helpers";

interface AdminOverviewContextBarProps {
  metrics: ResolvedAdminMetrics;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function AdminOverviewContextBar({
  metrics,
  onRefresh,
  isRefreshing,
}: AdminOverviewContextBarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10"
    >
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <StatusBadge
            variant="node"
            label="Admin Governance • Real-Time Database State"
            icon="admin_panel_settings"
            pulse
          />
          <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Registry: {metrics.totalMentors} Mentors Enrolled
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tight">
          System Administration & Network Health
        </h1>
        <p className="text-xs md:text-sm font-body text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
          Real-time metrics calculated from database state: monitoring {metrics.totalStudents} student builders, {metrics.totalSubmissions} submissions, and faculty accreditation status.
        </p>
      </div>

      {/* Action Cluster */}
      <div className="flex flex-wrap items-center gap-3">
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Re-sync data from server"
            className="p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-on-surface-variant hover:text-white transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isRefreshing ? "animate-spin text-primary" : ""
              }`}
            >
              sync
            </span>
          </button>
        )}

        <Link href="/admin-dashboard/mentors">
          <GlassButton
            variant="frosted"
            size="md"
            icon="how_to_reg"
            className="border-white/10 hover:border-primary/40 text-white"
          >
            <span>Mentor Applications</span>
            {metrics.pendingMentors > 0 && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-headline font-bold">
                {metrics.pendingMentors} Pending
              </span>
            )}
          </GlassButton>
        </Link>

        <Link href="/admin-dashboard/reviews">
          <GlassButton
            variant="primary"
            size="md"
            icon="fact_check"
            className="shadow-[0_0_24px_rgba(124,58,237,0.4)]"
          >
            <span>Submission Reviews</span>
            {metrics.pendingSubmissions > 0 && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-cyan-400 text-black text-[10px] font-headline font-bold">
                {metrics.pendingSubmissions} In Queue
              </span>
            )}
          </GlassButton>
        </Link>
      </div>
    </motion.header>
  );
}
