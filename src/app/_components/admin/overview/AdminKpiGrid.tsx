"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { ResolvedAdminMetrics } from "./admin-data-helpers";

interface AdminKpiGridProps {
  metrics: ResolvedAdminMetrics;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function AdminKpiGrid({ metrics }: AdminKpiGridProps) {
  const kpis = [
    {
      id: "students",
      label: "Registered Students",
      value: metrics.totalStudents.toLocaleString(),
      subtext: "Student builder accounts registered in database",
      badge: "Real Student Count",
      badgeColor: "text-primary bg-primary-container/20 border-primary/30",
      icon: "school",
      metricPill: `${metrics.studentToMentorRatio} students / mentor`,
    },
    {
      id: "submissions",
      label: "Total Submissions",
      value: metrics.totalSubmissions.toLocaleString(),
      subtext: `${metrics.approvedSubmissions} approved, ${metrics.pendingSubmissions} pending, ${metrics.rejectedSubmissions} rejected`,
      badge: "Total Project Artifacts",
      badgeColor: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30",
      icon: "folder_zip",
      metricPill: `${metrics.pendingSubmissions} in review queue`,
    },
    {
      id: "mentors",
      label: "Accredited Mentors",
      value: metrics.activeMentors.toLocaleString(),
      subtext: `${metrics.totalMentors} total enrolled (${metrics.pendingMentors} pending audit)`,
      badge: metrics.pendingMentors > 0 ? `${metrics.pendingMentors} Pending Audit` : "Audit Clear",
      badgeColor:
        metrics.pendingMentors > 0
          ? "text-amber-300 bg-amber-500/20 border-amber-500/40"
          : "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "supervisor_account",
      metricPill: `${metrics.totalMentors} total candidates`,
      alert: metrics.pendingMentors > 0,
    },
    {
      id: "consensus",
      label: "Ecosystem Consensus Rate",
      value: metrics.approvalRate,
      subtext: `Calculated from ${metrics.approvedSubmissions + metrics.rejectedSubmissions} decided evaluations`,
      badge: "Decision Agreement",
      badgeColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "verified",
      metricPill: `${metrics.approvedSubmissions} approved`,
    },
  ];

  return (
    <section aria-label="Database Key Performance Indicators" className="w-full my-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.id}
            variants={cardVariants}
            whileHover={{
              y: -5,
              scale: 1.015,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className="h-full flex flex-col"
          >
            <GlassCard
              interactive
              level={1}
              className="p-5 flex flex-col justify-between h-full border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              {/* Header row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="material-symbols-outlined text-xl p-2 rounded-xl border text-primary bg-primary-container/20 border-primary/30">
                  {kpi.icon}
                </span>

                <span
                  className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${kpi.badgeColor}`}
                >
                  {kpi.badge}
                </span>
              </div>

              {/* Body */}
              <div>
                <div className="font-headline text-3xl font-bold tracking-tight text-white mb-0.5">
                  {kpi.value}
                </div>
                <div className="font-headline text-body-sm font-semibold text-white/90">
                  {kpi.label}
                </div>
                <p className="font-body text-body-xs text-on-surface-variant mt-1 leading-snug">
                  {kpi.subtext}
                </p>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                  <span>Status:</span>
                  <span className="text-white font-medium">{kpi.metricPill}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
