"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { GlassButton } from "@/app/_components/ui/GlassButton";
import { StatusBadge } from "@/app/_components/ui/StatusBadge";
import { RawBackendMentor } from "@/types/admin";

interface AdminQuickActionsGridProps {
  pendingMentors: RawBackendMentor[];
  pendingCount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
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

export function AdminQuickActionsGrid({
  pendingMentors,
  pendingCount,
}: AdminQuickActionsGridProps) {
  return (
    <section aria-labelledby="quick-actions-heading" className="w-full my-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
            Governance Centers
          </div>
          <h2
            id="quick-actions-heading"
            className="text-2xl font-headline font-bold text-white tracking-tight"
          >
            Operational Control Hubs
          </h2>
        </div>
        <p className="text-xs font-body text-on-surface-variant max-w-sm">
          Direct administrator pathways to verify applicants, inspect evaluation velocity, and audit platform security.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Module 1: Mentor Accreditation Center */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="h-full flex flex-col"
        >
          <GlassCard
            interactive
            level={2}
            className="p-6 flex flex-col justify-between h-full border-white/10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_16px_rgba(124,58,237,0.3)]">
                  <span className="material-symbols-outlined text-2xl">
                    how_to_reg
                  </span>
                </div>
                <StatusBadge
                  variant={pendingCount > 0 ? "pending" : "approved"}
                  label={pendingCount > 0 ? `${pendingCount} Pending` : "Queue Clear"}
                  pulse={pendingCount > 0}
                />
              </div>

              <h3 className="font-headline text-headline-sm font-semibold text-white mb-2">
                Mentor Accreditation Center
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-6">
                Audit applicant credentials, portfolio URLs, and academic faculty affiliations. Authorize evaluator access or issue disqualifications.
              </p>

              {/* Pending Applicants Preview */}
              {pendingMentors.length > 0 ? (
                <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Awaiting Verification:
                  </div>
                  {pendingMentors.slice(0, 3).map((mentor) => (
                    <div
                      key={mentor.id}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <div className="font-headline text-body-xs font-semibold text-white truncate">
                          {mentor.name}
                        </div>
                        <div className="font-mono text-[10px] text-on-surface-variant truncate">
                          {mentor.email}
                        </div>
                      </div>
                      <span className="text-[10px] font-headline text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full shrink-0">
                        Review
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center text-body-xs text-on-surface-variant mb-6">
                  All mentor applications have been reviewed.
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link href="/admin-dashboard/mentors" className="block w-full">
                <GlassButton
                  variant="primary"
                  size="sm"
                  className="w-full justify-center shadow-[0_0_16px_rgba(124,58,237,0.35)]"
                  icon="arrow_forward"
                  iconPosition="right"
                >
                  Manage Mentor Applications
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>

        {/* Module 2: Submission Velocity & SLA */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="h-full flex flex-col"
        >
          <GlassCard
            interactive
            level={2}
            className="p-6 flex flex-col justify-between h-full border-white/10 hover:border-cyan-400/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
                  <span className="material-symbols-outlined text-2xl">
                    speed
                  </span>
                </div>
                <StatusBadge variant="info" label="SLA Benchmark" />
              </div>

              <h3 className="font-headline text-headline-sm font-semibold text-white mb-2">
                Evaluation Velocity & SLA
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-6">
                Monitors double-blind review turnaround times across cohorts. Ensures student submissions meet the standard 24–48 hour resolution deadline.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                <div>
                  <div className="flex justify-between items-center text-body-xs font-headline mb-1">
                    <span className="text-on-surface-variant">Average Turnaround</span>
                    <span className="text-white font-bold">28.4 Hours (Within SLA)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full w-[65%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="flex justify-between text-[11px] font-headline">
                    <span className="text-on-surface-variant">Review Standard</span>
                    <span className="text-emerald-400 font-semibold">Double-Blind Validated</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-headline">
                    <span className="text-on-surface-variant">Overdue Submissions</span>
                    <span className="text-white font-semibold">0 (Zero Overdue)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/admin-dashboard/mentors" className="block w-full">
                <GlassButton
                  variant="frosted"
                  size="sm"
                  className="w-full justify-center"
                  icon="analytics"
                >
                  Inspect Active Queue
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>

        {/* Module 3: Autonomous Oracle & Protocol Security */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          className="h-full flex flex-col"
        >
          <GlassCard
            interactive
            level={2}
            className="p-6 flex flex-col justify-between h-full border-white/10 hover:border-emerald-400/40 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.25)]">
                  <span className="material-symbols-outlined text-2xl">
                    security
                  </span>
                </div>
                <StatusBadge variant="approved" label="Secure Mainnet" />
              </div>

              <h3 className="font-headline text-headline-sm font-semibold text-white mb-2">
                Autonomous Oracle & Integrity
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-6">
                Guarantees immutable cryptographic anchoring. Verifies SHA-256 Merkle proofs, academic domain keys, and tamper-evident audit trails.
              </p>

              <div className="space-y-2 pt-4 border-t border-white/10 mb-6 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <span className="text-on-surface-variant">MERKLE_ROOT</span>
                  <span className="text-emerald-400">ACTIVE (0x8f2a...91e)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <span className="text-on-surface-variant">DKIM / GPG KEYS</span>
                  <span className="text-primary">100% VALIDATED</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <span className="text-on-surface-variant">TAMPER ALERTS</span>
                  <span className="text-emerald-400 font-bold">0 INCIDENTS</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <GlassButton
                variant="frosted"
                size="sm"
                className="w-full justify-center"
                icon="shield"
                onClick={() => {}}
              >
                Security Audit Passing
              </GlassButton>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
