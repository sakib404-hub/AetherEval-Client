"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { ResolvedAdminMetrics } from "./admin-data-helpers";

interface AdminConsensusGaugeChartProps {
  metrics: ResolvedAdminMetrics;
}

export function AdminConsensusGaugeChart({
  metrics,
}: AdminConsensusGaugeChartProps) {
  const rateNum = metrics.approvalRateNumeric;
  const totalDecided = metrics.approvedSubmissions + metrics.rejectedSubmissions;

  // Semicircle arc constants
  const r = 68;
  const arcLength = Math.PI * r; // ~213.63
  const filledLength = (rateNum / 100) * arcLength;
  const strokeDashoffset = arcLength - filledLength;

  const decisionOutcomes = [
    {
      name: "Approved Submissions",
      count: metrics.approvedSubmissions,
      percent:
        metrics.totalSubmissions > 0
          ? `${Math.round((metrics.approvedSubmissions / metrics.totalSubmissions) * 100)}%`
          : "0%",
      icon: "check_circle",
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      name: "Pending Review Pipeline",
      count: metrics.pendingSubmissions,
      percent:
        metrics.totalSubmissions > 0
          ? `${Math.round((metrics.pendingSubmissions / metrics.totalSubmissions) * 100)}%`
          : "0%",
      icon: "pending",
      colorClass: "text-amber-400",
      bgClass: "bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Rejected / Revision Needed",
      count: metrics.rejectedSubmissions,
      percent:
        metrics.totalSubmissions > 0
          ? `${Math.round((metrics.rejectedSubmissions / metrics.totalSubmissions) * 100)}%`
          : "0%",
      icon: "cancel",
      colorClass: "text-rose-400",
      bgClass: "bg-rose-500/10 border-rose-500/20",
    },
  ];

  return (
    <GlassCard
      level={2}
      className="p-6 sm:p-7 flex flex-col justify-between h-full border-white/10 hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-emerald-400">
              Evaluator Decision Consensus
            </div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
              Ecosystem Approval Rate
            </h3>
          </div>
          <span className="text-[10px] font-headline font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {totalDecided > 0 ? "Real Consensus" : "Baseline"}
          </span>
        </div>

        {/* Semicircle Gauge Visual */}
        <div className="flex flex-col items-center justify-center my-1 relative">
          <div className="relative w-56 h-32 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 180 100"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="60%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>

              {/* Background Arc */}
              <path
                d="M 22 90 A 68 68 0 0 1 158 90"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Filled Animated Arc */}
              <motion.path
                d="M 22 90 A 68 68 0 0 1 158 90"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={arcLength}
                initial={{ strokeDashoffset: arcLength }}
                whileInView={{ strokeDashoffset }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {/* Center Display */}
            <div className="absolute bottom-1 flex flex-col items-center">
              <span className="font-headline text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-primary">
                {metrics.approvalRate}
              </span>
              <span className="text-[10px] font-headline font-semibold text-on-surface-variant uppercase tracking-wider">
                Approval Index
              </span>
            </div>
          </div>
        </div>

        {/* Real Outcome Breakdown List */}
        <div className="space-y-2.5 py-4 border-t border-white/10">
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-1">
            Real Decision Outcomes:
          </div>
          {decisionOutcomes.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex items-center justify-between ${item.bgClass}`}
            >
              <span className="text-body-xs font-headline text-white flex items-center gap-2">
                <span className={`material-symbols-outlined text-sm ${item.colorClass}`}>
                  {item.icon}
                </span>
                {item.name}
              </span>
              <div className="flex items-center gap-2 font-mono text-body-xs">
                <span className="font-bold text-white">{item.count}</span>
                <span className="text-[11px] text-on-surface-variant">
                  ({item.percent})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom info */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
        <span>DECIDED: {totalDecided} / {metrics.totalSubmissions}</span>
        <span className="text-primary font-semibold">
          QUEUE: {metrics.pendingSubmissions}
        </span>
      </div>
    </GlassCard>
  );
}