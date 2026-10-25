"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { AdminStatsData } from "@/types/admin";
import { resolveAdminMetrics } from "./admin-data-helpers";

interface AdminOverviewMetricsProps {
  stats: AdminStatsData | null;
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

export function AdminOverviewMetrics({ stats }: AdminOverviewMetricsProps) {
  const resolved = resolveAdminMetrics(stats, []);

  const metrics = [
    {
      id: "students",
      label: "Registered Students",
      value: resolved.totalStudents.toLocaleString(),
      badge: "Builders",
      badgeColor: "text-primary bg-primary-container/20 border-primary/30",
      icon: "school",
      subtext: `${resolved.activeStudents} active student builders in database`,
    },
    {
      id: "total-subs",
      label: "Total Submissions",
      value: resolved.totalSubmissions.toLocaleString(),
      badge: "Repositories",
      badgeColor: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30",
      icon: "folder_zip",
      subtext: "Git repositories and project submission artifacts",
    },
    {
      id: "pending-subs",
      label: "Pending in Review Queue",
      value: resolved.pendingSubmissions.toLocaleString(),
      badge: "In Queue",
      badgeColor: "text-amber-300 bg-amber-500/15 border-amber-500/30",
      icon: "pending_actions",
      subtext: "Awaiting double-blind faculty evaluation",
    },
    {
      id: "approved-subs",
      label: "Approved Projects",
      value: resolved.approvedSubmissions.toLocaleString(),
      badge: "Accredited",
      badgeColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "task_alt",
      subtext: "Passed codebase and evaluation rubric checks",
    },
    {
      id: "active-mentors",
      label: "Active Faculty Mentors",
      value: resolved.activeMentors.toLocaleString(),
      badge: "Evaluators",
      badgeColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "supervisor_account",
      subtext: "Vetted reviewers with active review queue access",
    },
    {
      id: "pending-mentors",
      label: "Pending Mentor Applicants",
      value: resolved.pendingMentors.toLocaleString(),
      badge: resolved.pendingMentors > 0 ? "Needs Audit" : "Clear",
      badgeColor:
        resolved.pendingMentors > 0
          ? "text-amber-300 bg-amber-500/20 border-amber-500/40"
          : "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "how_to_reg",
      subtext: "Awaiting qualification & portfolio vetting",
    },
    {
      id: "disqualified-mentors",
      label: "Disqualified Candidates",
      value: resolved.rejectedMentors.toLocaleString(),
      badge: "Filtered",
      badgeColor: "text-rose-300 bg-rose-500/15 border-rose-500/30",
      icon: "person_off",
      subtext: "Did not meet academic domain accreditation criteria",
    },
    {
      id: "approval-rate",
      label: "Consensus Approval Rate",
      value: resolved.approvalRate,
      badge: "Consensus",
      badgeColor: "text-primary bg-primary-container/20 border-primary/30",
      icon: "verified",
      subtext: "Calculated from decided submission evaluations",
    },
  ];

  return (
    <section aria-label="Ecosystem Metrics Matrix" className="w-full my-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {metrics.map((item) => (
          <motion.div
            key={item.id}
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
              className="p-5 flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-2xl p-2 rounded-xl bg-primary-container/20 border border-primary/30">
                  {item.icon}
                </span>
                <span
                  className={`text-[10px] font-headline font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <div>
                <div className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white mb-0.5">
                  {item.value}
                </div>
                <div className="font-headline text-body-sm font-semibold text-white/90">
                  {item.label}
                </div>
                <p className="font-body text-body-xs text-on-surface-variant mt-1 leading-snug">
                  {item.subtext}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}