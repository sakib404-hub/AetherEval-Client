"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { ResolvedAdminMetrics } from "./admin-data-helpers";

interface AdminSubmissionsDonutChartProps {
  metrics: ResolvedAdminMetrics;
}

export function AdminSubmissionsDonutChart({
  metrics,
}: AdminSubmissionsDonutChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const approved = metrics.approvedSubmissions;
  const pending = metrics.pendingSubmissions;
  const rejected = metrics.rejectedSubmissions;
  const total = metrics.totalSubmissions > 0 ? metrics.totalSubmissions : approved + pending + rejected;

  const hasData = total > 0;

  const approvedPct = hasData ? Math.round((approved / total) * 100) : 0;
  const pendingPct = hasData ? Math.round((pending / total) * 100) : 0;
  const rejectedPct = hasData ? Math.max(0, 100 - approvedPct - pendingPct) : 0;

  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12

  const safeTotal = total || 1;
  const approvedLen = (approved / safeTotal) * circumference;
  const pendingLen = (pending / safeTotal) * circumference;
  const rejectedLen = (rejected / safeTotal) * circumference;

  const approvedOffset = 0;
  const pendingOffset = -approvedLen;
  const rejectedOffset = -(approvedLen + pendingLen);

  const segments = [
    {
      id: "approved",
      label: "Approved Submissions",
      count: approved,
      pct: approvedPct,
      color: "#34d399",
      bgClass: "bg-emerald-500",
      stroke: "url(#donutEmerald)",
      length: approvedLen,
      offset: approvedOffset,
    },
    {
      id: "pending",
      label: "Pending Mentor Review",
      count: pending,
      pct: pendingPct,
      color: "#fbbf24",
      bgClass: "bg-amber-400",
      stroke: "url(#donutAmber)",
      length: pendingLen,
      offset: pendingOffset,
    },
    {
      id: "rejected",
      label: "Disqualified / Revision",
      count: rejected,
      pct: rejectedPct,
      color: "#f43f5e",
      bgClass: "bg-rose-500",
      stroke: "url(#donutRose)",
      length: rejectedLen,
      offset: rejectedOffset,
    },
  ];

  return (
    <GlassCard
      level={2}
      className="p-6 sm:p-7 flex flex-col justify-between h-full border-white/10 hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div>
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-cyan-400">
            Real Database Distribution
          </div>
          <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
            Submission Status Breakdown
          </h3>
        </div>
        <span className="text-[11px] font-headline font-semibold text-white/80 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full">
          {total} Total
        </span>
      </div>

      {hasData ? (
        /* Chart & Legend Row */
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          {/* SVG Donut */}
          <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full -rotate-90 overflow-visible"
            >
              <defs>
                <linearGradient id="donutEmerald" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <linearGradient id="donutAmber" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="donutRose" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="18"
              />

              {/* Segments */}
              {segments.map((seg) => {
                if (seg.count === 0) return null;
                const isHovered = hoveredSegment === seg.id;

                return (
                  <motion.circle
                    key={seg.id}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke={seg.stroke}
                    strokeWidth={isHovered ? "22" : "18"}
                    strokeDasharray={`${seg.length} ${circumference - seg.length}`}
                    strokeDashoffset={seg.offset}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: seg.offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredSegment(seg.id)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer transition-all duration-200"
                  />
                );
              })}
            </svg>

            {/* Center Callout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="font-headline text-2xl font-black text-white">
                {hoveredSegment
                  ? `${segments.find((s) => s.id === hoveredSegment)?.pct}%`
                  : `${approvedPct}%`}
              </span>
              <span className="text-[10px] font-headline font-semibold uppercase tracking-wider text-on-surface-variant">
                {hoveredSegment
                  ? segments.find((s) => s.id === hoveredSegment)?.label.split(" ")[0]
                  : "Approved"}
              </span>
            </div>
          </div>

          {/* Legend List */}
          <div className="space-y-3 w-full sm:max-w-xs">
            {segments.map((seg) => (
              <div
                key={seg.id}
                onMouseEnter={() => setHoveredSegment(seg.id)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  hoveredSegment === seg.id
                    ? "bg-white/[0.08] border-white/20 shadow-sm scale-[1.02]"
                    : "bg-white/[0.03] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="font-headline text-body-xs font-semibold text-white">
                      {seg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-headline text-body-xs">
                    <span className="font-bold text-white">{seg.count}</span>
                    <span className="text-on-surface-variant text-[11px]">
                      ({seg.pct}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full ${seg.bgClass} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${seg.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-on-surface-variant space-y-2">
          <span className="material-symbols-outlined text-4xl text-white/30">
            folder_open
          </span>
          <div className="font-headline text-sm font-semibold text-white">
            No Submissions In Database Yet
          </div>
          <p className="text-xs max-w-xs mx-auto text-on-surface-variant">
            When students submit repository artifacts, their verification statuses will plot dynamically here.
          </p>
        </div>
      )}

      {/* Footer Benchmark Note */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-body-xs font-body text-on-surface-variant">
        <span>Verified Submissions: {approved}</span>
        <span className="text-amber-400 font-semibold font-headline">
          {pending} Awaiting Review
        </span>
      </div>
    </GlassCard>
  );
}
