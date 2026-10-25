"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";

interface MetricItem {
  id: string;
  label: string;
  value: string;
  trend: string;
  icon: string;
  subtext: string;
}

const METRICS: MetricItem[] = [
  {
    id: "submissions",
    label: "Attested Project Artifacts",
    value: "1,420+",
    trend: "+28% this term",
    icon: "folder_zip",
    subtext: "Live GitHub repositories and deployment links",
  },
  {
    id: "mentors",
    label: "Vetted Faculty & Mentors",
    value: "360+",
    trend: "100% vetted",
    icon: "supervisor_account",
    subtext: "Domain specialists approved by administrators",
  },
  {
    id: "turnaround",
    label: "Review Turnaround SLA",
    value: "< 48h",
    trend: "Consistent SLA",
    icon: "schedule",
    subtext: "From submission queue to detailed verdict",
  },
  {
    id: "consensus",
    label: "Constructive Feedback Rate",
    value: "99.8%",
    trend: "Audited ledger",
    icon: "fact_check",
    subtext: "Every project receives actionable evaluation notes",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function OverviewMetricsMatrix() {
  return (
    <section aria-label="System Metrics" className="w-full max-w-6xl mx-auto mb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {METRICS.map((metric) => (
          <motion.div
            key={metric.id}
            variants={cardVariants}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            className="h-full flex flex-col"
          >
            <GlassCard
              interactive
              level={1}
              className="p-5 flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-2xl p-2 rounded-xl bg-primary-container/20 border border-primary/30">
                  {metric.icon}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-headline font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  {metric.trend}
                </span>
              </div>

              <div>
                <div className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
                  {metric.value}
                </div>
                <div className="font-headline text-body-sm font-semibold text-white/90">
                  {metric.label}
                </div>
                <p className="font-body text-body-xs text-on-surface-variant mt-1 leading-snug">
                  {metric.subtext}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
