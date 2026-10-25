"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { StatusBadge } from "../ui/StatusBadge";

interface PillarItem {
  id: string;
  title: string;
  badge: string;
  badgeVariant: "node" | "info" | "approved";
  icon: string;
  description: string;
  metricLabel: string;
  metricValue: string;
}

const PILLARS: PillarItem[] = [
  {
    id: "dual-artifact",
    title: "Dual-Artifact Verification",
    badge: "Code & Live Demo",
    badgeVariant: "node",
    icon: "code_blocks",
    description:
      "Every submission requires both a verifiable Git repository and an active live deployment URL. Mentors inspect real codebase architecture and test production behavior side by side.",
    metricLabel: "Verification Standard",
    metricValue: "Repo + Live App",
  },
  {
    id: "blind-queue",
    title: "Double-Blind Review Queue",
    badge: "Meritocratic",
    badgeVariant: "info",
    icon: "visibility_off",
    description:
      "Projects enter a centralized mentor queue evaluated strictly on technical merit. Reviewers assess architecture, documentation, and interface performance without demographic bias.",
    metricLabel: "Evaluation Focus",
    metricValue: "Code • Architecture • Utility",
  },
  {
    id: "actionable-feedback",
    title: "Actionable Feedback Loop",
    badge: "Constructive",
    badgeVariant: "approved",
    icon: "rate_review",
    description:
      "All evaluations deliver meaningful outcomes. Approved projects receive faculty commendations, while rejected projects receive clear, actionable remediation notes for rapid resubmission.",
    metricLabel: "Feedback Standard",
    metricValue: "100% Documented Notes",
  },
];

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
  hidden: { opacity: 0, y: 28, scale: 0.96 },
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

export function EvaluationPillarsSection() {
  return (
    <section aria-labelledby="evaluation-pillars-heading" className="w-full max-w-6xl mx-auto mb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
            Core Guarantees
          </div>
          <h2
            id="evaluation-pillars-heading"
            className="font-headline text-2xl sm:text-3xl md:text-headline-md font-bold text-white tracking-tight"
          >
            Built for Academic Integrity
          </h2>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant max-w-md">
          Strict verification protocols ensure evaluations are prompt, fair, and academically rigorous across every research track.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {PILLARS.map((pillar) => (
          <motion.div
            key={pillar.id}
            variants={cardVariants}
            whileHover={{
              y: -6,
              scale: 1.015,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="h-full flex flex-col"
          >
            <GlassCard
              interactive
              level={2}
              className="p-6 flex flex-col justify-between h-full group border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_16px_rgba(124,58,237,0.3)]">
                    <span className="material-symbols-outlined text-2xl">
                      {pillar.icon}
                    </span>
                  </div>
                  <StatusBadge variant={pillar.badgeVariant} label={pillar.badge} />
                </div>

                <h3 className="font-headline text-headline-sm font-semibold text-white group-hover:text-primary transition-colors mb-2.5">
                  {pillar.title}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-headline text-body-xs text-on-surface-variant">
                  {pillar.metricLabel}
                </span>
                <span className="font-headline text-body-xs font-semibold text-white">
                  {pillar.metricValue}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
