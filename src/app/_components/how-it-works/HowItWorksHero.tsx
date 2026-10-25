"use client";

import { motion } from "framer-motion";
import { StatusBadge } from "../ui/StatusBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
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

export function HowItWorksHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center max-w-4xl mx-auto w-full pt-4 md:pt-8 pb-10"
    >
      {/* SLA Eyebrow Pill */}
      <div className="mb-6 inline-flex items-center gap-2">
        <StatusBadge
          variant="info"
          label="Chronological Flow • 24–48h Standard SLA"
          icon="schedule"
          pulse
        />
      </div>

      {/* Main Headline */}
      <h1 className="font-headline text-4xl sm:text-5xl md:text-headline-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-primary leading-[1.12] mb-5">
        How AetherEval Works: The Evaluation Lifecycle
      </h1>

      {/* Meaningful Context Copy */}
      <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
        Understand the complete journey from initial registration to verified evaluation verdict. Clear time benchmarks and transparent role handoffs eliminate uncertainty at every milestone.
      </p>

      {/* Time SLA Quick Indicators with Staggered Framer Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl"
      >
        <motion.div
          variants={pillVariants}
          whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
          className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center hover:border-primary/40 transition-colors"
        >
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-primary">
            T - 0 • Setup
          </div>
          <div className="font-headline text-headline-sm font-bold text-white mt-0.5">
            2–3 mins
          </div>
          <div className="text-[11px] font-body text-on-surface-variant">
            Account registration
          </div>
        </motion.div>

        <motion.div
          variants={pillVariants}
          whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
          className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center hover:border-cyan-400/40 transition-colors"
        >
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-cyan-400">
            T + 1 • Submit
          </div>
          <div className="font-headline text-headline-sm font-bold text-white mt-0.5">
            5–10 mins
          </div>
          <div className="text-[11px] font-body text-on-surface-variant">
            Repo & live deployment
          </div>
        </motion.div>

        <motion.div
          variants={pillVariants}
          whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
          className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center hover:border-amber-400/40 transition-colors"
        >
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-amber-400">
            T + 2 • Review
          </div>
          <div className="font-headline text-headline-sm font-bold text-white mt-0.5">
            24–48 hours
          </div>
          <div className="text-[11px] font-body text-on-surface-variant">
            Double-blind evaluation
          </div>
        </motion.div>

        <motion.div
          variants={pillVariants}
          whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
          className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center hover:border-emerald-400/40 transition-colors"
        >
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-emerald-400">
            T + 3 • Verdict
          </div>
          <div className="font-headline text-headline-sm font-bold text-white mt-0.5">
            Real-time
          </div>
          <div className="text-[11px] font-body text-on-surface-variant">
            Status & mentor feedback
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
