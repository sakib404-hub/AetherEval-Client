"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { StatusBadge } from "../ui/StatusBadge";

interface BenchmarkItem {
  actor: string;
  roleIcon: string;
  action: string;
  expectedTime: string;
  slaStatus: "Instant" | "Fast" | "Standard" | "Real-time";
  badgeVariant: "node" | "approved" | "info" | "pending";
  description: string;
}

const BENCHMARKS: BenchmarkItem[] = [
  {
    actor: "Student Builder",
    roleIcon: "school",
    action: "Registration & Project Submission",
    expectedTime: "7–12 Minutes Total",
    slaStatus: "Fast",
    badgeVariant: "node",
    description: "Account creation is instantaneous. Filling in project metadata and repository links takes minutes.",
  },
  {
    actor: "Institutional Admin",
    roleIcon: "admin_panel_settings",
    action: "Mentor Qualification Audit",
    expectedTime: "Under 24 Hours",
    slaStatus: "Standard",
    badgeVariant: "pending",
    description: "Prospective mentor credentials and GitHub histories are reviewed to ensure authentic domain expertise.",
  },
  {
    actor: "Vetted Mentor",
    roleIcon: "supervisor_account",
    action: "Double-Blind Review & Rubric Grading",
    expectedTime: "24–48 Hours Window",
    slaStatus: "Standard",
    badgeVariant: "info",
    description: "Evaluator clones repository, tests live deployment, and documents constructive feedback.",
  },
  {
    actor: "Platform Ledger",
    roleIcon: "sync",
    action: "Status Update & Student Notification",
    expectedTime: "Real-time (< 1 second)",
    slaStatus: "Real-time",
    badgeVariant: "approved",
    description: "The moment the mentor clicks submit, the student dashboard and project history update instantly.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
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

export function TurnaroundBenchmarkCard() {
  return (
    <section
      aria-labelledby="turnaround-benchmark-heading"
      className="w-full max-w-6xl mx-auto mb-16"
    >
      <GlassCard level={2} className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase">
                Time SLAs & Turnarounds
              </span>
              <StatusBadge variant="approved" label="Audited Benchmarks" />
            </div>
            <h2
              id="turnaround-benchmark-heading"
              className="font-headline text-2xl sm:text-headline-sm font-bold text-white tracking-tight"
            >
              System Turnaround Benchmarks
            </h2>
          </div>
          <p className="font-body text-body-xs text-on-surface-variant max-w-sm">
            Zero unnecessary tasks or bureaucratic drag. Every phase has a designated turnaround SLA.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {BENCHMARKS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.015,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">
                      {item.roleIcon}
                    </span>
                    <span className="font-headline text-body-sm font-bold text-white">
                      {item.actor}
                    </span>
                  </div>
                  <StatusBadge variant={item.badgeVariant} label={item.slaStatus} />
                </div>

                <div className="font-headline text-headline-sm font-bold text-white mb-1">
                  {item.expectedTime}
                </div>
                <div className="font-headline text-body-xs font-semibold text-primary mb-2">
                  {item.action}
                </div>
                <p className="font-body text-body-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </GlassCard>
    </section>
  );
}
