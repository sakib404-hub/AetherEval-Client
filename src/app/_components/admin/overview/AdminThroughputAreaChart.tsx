"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { RawBackendMentor } from "@/types/admin";
import {
  ResolvedAdminMetrics,
  computeRegistrationTimeline,
  computeExpertiseDistribution,
} from "./admin-data-helpers";

interface AdminThroughputAreaChartProps {
  mentors: RawBackendMentor[];
  metrics: ResolvedAdminMetrics;
}

export function AdminThroughputAreaChart({
  mentors,
  metrics,
}: AdminThroughputAreaChartProps) {
  const [viewMode, setViewMode] = useState<"TIMELINE" | "EXPERTISE">("TIMELINE");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Real data calculations
  const timelineData = computeRegistrationTimeline(mentors);
  const expertiseData = computeExpertiseDistribution(mentors);

  // SVG Chart Geometry
  const width = 640;
  const height = 220;
  const paddingX = 36;
  const paddingY = 28;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const maxVal =
    timelineData.length > 0
      ? Math.max(...timelineData.map((d) => d.cumulativeCount), 5) * 1.2
      : 10;

  // Generate SVG coordinates for cumulative timeline
  const points = timelineData.map((d, i) => {
    const x =
      timelineData.length === 1
        ? width / 2
        : paddingX + (i / (timelineData.length - 1)) * chartWidth;
    const y = height - paddingY - (d.cumulativeCount / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  // Convert points to smooth bezier path
  const makePath = (pts: typeof points) => {
    if (pts.length === 0) return "";
    if (pts.length === 1) {
      return `M ${paddingX} ${pts[0].y} L ${width - paddingX} ${pts[0].y}`;
    }
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = makePath(points);
  const areaPath =
    points.length > 1
      ? `${linePath} L ${width - paddingX} ${height - paddingY} L ${paddingX} ${height - paddingY} Z`
      : "";

  const activePoint =
    hoveredIdx !== null && points[hoveredIdx]
      ? points[hoveredIdx]
      : points[points.length - 1] || null;

  return (
    <GlassCard
      level={2}
      className="p-6 sm:p-8 w-full border-white/10 hover:border-primary/30 transition-all duration-300 my-6"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-headline font-bold uppercase tracking-wider text-primary">
              Real Platform Telemetry
            </span>
            <span className="text-[11px] font-headline font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
              Live Database
            </span>
          </div>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
            {viewMode === "TIMELINE"
              ? "Mentor Faculty Growth & Registration Timeline"
              : "Faculty Domain & Discipline Distribution"}
          </h3>
          <p className="font-body text-body-xs text-on-surface-variant mt-1">
            {viewMode === "TIMELINE"
              ? "Historical trajectory of evaluator onboarding compiled from mentor registration timestamps."
              : "Domain coverage across registered evaluators based on real profile expertise submissions."}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setViewMode("TIMELINE");
              setHoveredIdx(null);
            }}
            className={`px-3 py-1.5 rounded-xl font-headline text-body-xs font-semibold transition-all cursor-pointer ${
              viewMode === "TIMELINE"
                ? "bg-primary-container/30 border border-primary/50 text-white shadow-[0_0_12px_rgba(124,58,237,0.35)]"
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            Onboarding Timeline
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode("EXPERTISE");
              setHoveredIdx(null);
            }}
            className={`px-3 py-1.5 rounded-xl font-headline text-body-xs font-semibold transition-all cursor-pointer ${
              viewMode === "EXPERTISE"
                ? "bg-primary-container/30 border border-primary/50 text-white shadow-[0_0_12px_rgba(124,58,237,0.35)]"
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            Discipline Coverage
          </button>
        </div>
      </div>

      {/* Dynamic Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
        <div>
          <div className="text-[10px] font-headline font-semibold uppercase tracking-wider text-on-surface-variant">
            Total Evaluators
          </div>
          <div className="text-base font-headline font-bold text-white mt-0.5">
            {metrics.totalMentors} Enrolled
          </div>
        </div>
        <div>
          <div className="text-[10px] font-headline font-semibold uppercase tracking-wider text-emerald-400">
            Active Reviewers
          </div>
          <div className="text-base font-headline font-bold text-emerald-400 mt-0.5">
            {metrics.activeMentors} Accredited
          </div>
        </div>
        <div>
          <div className="text-[10px] font-headline font-semibold uppercase tracking-wider text-amber-300">
            Pending Audits
          </div>
          <div className="text-base font-headline font-bold text-amber-300 mt-0.5">
            {metrics.pendingMentors} In Queue
          </div>
        </div>
        <div>
          <div className="text-[10px] font-headline font-semibold uppercase tracking-wider text-cyan-300">
            Coverage Ratio
          </div>
          <div className="text-base font-headline font-bold text-cyan-300 mt-0.5">
            1 : {metrics.studentToMentorRatio} Students
          </div>
        </div>
      </div>

      {/* Content View Switching */}
      <AnimatePresence mode="wait">
        {viewMode === "TIMELINE" ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {timelineData.length > 0 ? (
              <div className="space-y-4">
                {/* SVG Area Chart */}
                <div className="relative w-full h-56 overflow-hidden">
                  <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      <linearGradient id="areaTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                      const y = paddingY + pct * chartHeight;
                      return (
                        <line
                          key={i}
                          x1={paddingX}
                          y1={y}
                          x2={width - paddingX}
                          y2={y}
                          stroke="rgba(255, 255, 255, 0.06)"
                          strokeDasharray="4 4"
                        />
                      );
                    })}

                    {/* Area Fill */}
                    {areaPath && (
                      <motion.path
                        d={areaPath}
                        fill="url(#areaTimelineGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}

                    {/* Line */}
                    {linePath && (
                      <motion.path
                        d={linePath}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    )}

                    {/* Interactive Points */}
                    {points.map((pt, i) => {
                      const isHovered = hoveredIdx === i;

                      return (
                        <g
                          key={i}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredIdx(i)}
                        >
                          {isHovered && (
                            <line
                              x1={pt.x}
                              y1={paddingY}
                              x2={pt.x}
                              y2={height - paddingY}
                              stroke="rgba(210, 187, 255, 0.4)"
                              strokeWidth="1.5"
                              strokeDasharray="3 3"
                            />
                          )}

                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 7 : 4.5}
                            fill="#0c081e"
                            stroke="#c084fc"
                            strokeWidth="2.5"
                            className="transition-all duration-200"
                          />

                          <text
                            x={pt.x}
                            y={height - 6}
                            textAnchor="middle"
                            className={`text-[10px] font-mono fill-current ${
                              isHovered ? "fill-white font-bold" : "fill-on-surface-variant/70"
                            }`}
                          >
                            {pt.dateLabel}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Point Inspection Strip */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-body-xs font-headline">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-1.5 rounded-full bg-purple-500" />
                      <span className="text-white">Cumulative Evaluator Pool</span>
                    </div>
                  </div>

                  {activePoint ? (
                    <span className="font-mono text-body-xs text-primary font-semibold">
                      {activePoint.dateLabel}: +{activePoint.dailyCount} new (Total: {activePoint.cumulativeCount})
                    </span>
                  ) : (
                    <span className="text-on-surface-variant font-mono text-[11px]">
                      Hover points to inspect registration metrics
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-on-surface-variant space-y-2">
                <span className="material-symbols-outlined text-4xl text-white/30">
                  timeline
                </span>
                <div className="font-headline text-sm font-semibold text-white">
                  No Mentor Registration Records
                </div>
                <p className="text-xs max-w-sm mx-auto text-on-surface-variant">
                  When mentors register their applications, their onboarding milestones will be plotted dynamically along this timeline.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="expertise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 py-2"
          >
            {expertiseData.length > 0 ? (
              <div className="space-y-3">
                {expertiseData.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-headline text-body-xs">
                      <span className="text-white font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {exp.discipline}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white font-mono">
                          {exp.count} {exp.count === 1 ? "Mentor" : "Mentors"}
                        </span>
                        <span className="text-on-surface-variant text-[11px] font-mono">
                          ({exp.percentage}%)
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary via-purple-400 to-cyan-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${exp.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-on-surface-variant space-y-2">
                <span className="material-symbols-outlined text-4xl text-white/30">
                  psychology
                </span>
                <div className="font-headline text-sm font-semibold text-white">
                  No Mentor Expertise Tags Recorded
                </div>
                <p className="text-xs max-w-sm mx-auto text-on-surface-variant">
                  Mentors have not yet submitted technical expertise tags in their application profiles.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}