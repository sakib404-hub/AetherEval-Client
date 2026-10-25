"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";

interface AdminReviewsMetricCardsProps {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
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
  hidden: { opacity: 0, y: 15, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function AdminReviewsMetricCards({
  totalCount,
  pendingCount,
  approvedCount,
  rejectedCount,
}: AdminReviewsMetricCardsProps) {
  const cards = [
    {
      id: "total",
      label: "Total Repositories",
      value: totalCount,
      subtext: "Student artifacts registered in evaluation ledger",
      badge: "Total Inflow",
      badgeColor: "text-primary bg-primary-container/20 border-primary/30",
      icon: "folder_zip",
    },
    {
      id: "pending",
      label: "Awaiting Review",
      value: pendingCount,
      subtext: "In double-blind peer and mentor review pipeline",
      badge: pendingCount > 0 ? "Review Required" : "Queue Clear",
      badgeColor:
        pendingCount > 0
          ? "text-amber-300 bg-amber-500/20 border-amber-500/40"
          : "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "pending_actions",
      alert: pendingCount > 0,
    },
    {
      id: "approved",
      label: "Approved Projects",
      value: approvedCount,
      subtext: "Passed codebase review and cryptographic attestation",
      badge: "Accredited",
      badgeColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      icon: "task_alt",
    },
    {
      id: "rejected",
      label: "Disqualified / Revisions",
      value: rejectedCount,
      subtext: "Did not meet evaluation rubric; revisions required",
      badge: "Needs Revision",
      badgeColor: "text-rose-300 bg-rose-500/15 border-rose-500/30",
      icon: "cancel",
    },
  ];

  return (
    <section aria-label="Submission Metrics" className="w-full my-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {cards.map((c) => (
          <motion.div
            key={c.id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="h-full flex flex-col"
          >
            <GlassCard
              interactive
              level={1}
              className="p-5 flex flex-col justify-between h-full border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="material-symbols-outlined text-xl p-2 rounded-xl border text-primary bg-primary-container/20 border-primary/30">
                  {c.icon}
                </span>
                <span
                  className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${c.badgeColor}`}
                >
                  {c.badge}
                </span>
              </div>

              <div>
                <div className="font-headline text-3xl font-bold tracking-tight text-white mb-0.5">
                  {c.value}
                </div>
                <div className="font-headline text-body-sm font-semibold text-white/90">
                  {c.label}
                </div>
                <p className="font-body text-body-xs text-on-surface-variant mt-1 leading-snug">
                  {c.subtext}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
