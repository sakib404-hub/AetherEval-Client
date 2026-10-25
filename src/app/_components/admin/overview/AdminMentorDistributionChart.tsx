"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { GlassButton } from "@/app/_components/ui/GlassButton";
import { ResolvedAdminMetrics } from "./admin-data-helpers";

interface AdminMentorDistributionChartProps {
  metrics: ResolvedAdminMetrics;
}

export function AdminMentorDistributionChart({
  metrics,
}: AdminMentorDistributionChartProps) {
  const active = metrics.activeMentors;
  const pending = metrics.pendingMentors;
  const rejected = metrics.rejectedMentors;
  const total = metrics.totalMentors > 0 ? metrics.totalMentors : active + pending + rejected;

  const hasData = total > 0;
  const safeTotal = total || 1;

  const tiers = [
    {
      id: "active",
      label: "Accredited Review Mentors",
      count: active,
      pct: hasData ? Math.round((active / safeTotal) * 100) : 0,
      color: "from-purple-500 to-primary",
      icon: "verified",
    },
    {
      id: "pending",
      label: "Pending Qualification Audit",
      count: pending,
      pct: hasData ? Math.round((pending / safeTotal) * 100) : 0,
      color: "from-amber-500 to-amber-300",
      icon: "pending",
      isActionNeeded: pending > 0,
    },
    {
      id: "rejected",
      label: "Disqualified Candidates",
      count: rejected,
      pct: hasData ? Math.max(0, 100 - Math.round((active / safeTotal) * 100) - Math.round((pending / safeTotal) * 100)) : 0,
      color: "from-rose-600 to-rose-400",
      icon: "block",
    },
  ];

  return (
    <GlassCard
      level={2}
      className="p-6 sm:p-7 flex flex-col justify-between h-full border-white/10 hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div>
            <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-primary">
              Real Evaluator Capacity
            </div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
              Mentor Accreditation Funnel
            </h3>
          </div>
          <span className="text-[11px] font-headline font-semibold text-white/80 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-full">
            {total} Enrolled
          </span>
        </div>

        {/* Real Coverage Ratio Metric Callout */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-primary p-2 rounded-xl bg-primary-container/20 border border-primary/30">
              balance
            </span>
            <div>
              <div className="text-[10px] font-headline font-semibold uppercase tracking-wider text-on-surface-variant">
                Evaluator Coverage Ratio
              </div>
              <div className="text-xl font-headline font-bold text-white">
                1 Mentor : {metrics.studentToMentorRatio} Students
              </div>
            </div>
          </div>
          <span className="text-[10px] font-headline font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full hidden sm:inline-block">
            {metrics.totalStudents} Students Recorded
          </span>
        </div>

        {/* Real Distribution Bars */}
        <div className="space-y-4 mb-6">
          {tiers.map((tier) => (
            <div key={tier.id} className="space-y-1.5">
              <div className="flex justify-between items-center text-body-xs font-headline">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">
                    {tier.icon}
                  </span>
                  {tier.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{tier.count}</span>
                  <span className="text-on-surface-variant text-[11px]">
                    ({tier.pct}%)
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${tier.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tier.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action footer */}
      <div className="pt-4 border-t border-white/10">
        <Link href="/admin-dashboard/mentors" className="block w-full">
          <GlassButton
            variant="primary"
            size="sm"
            className="w-full justify-center shadow-[0_0_18px_rgba(124,58,237,0.35)]"
            icon="how_to_reg"
            iconPosition="right"
          >
            <span>Review Mentor Queue</span>
            {pending > 0 && (
              <span className="ml-1.5 px-2 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-bold">
                {pending} Pending
              </span>
            )}
          </GlassButton>
        </Link>
      </div>
    </GlassCard>
  );
}
