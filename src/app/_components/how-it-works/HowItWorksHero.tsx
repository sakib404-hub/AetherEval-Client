"use client";

import { motion } from "framer-motion";

export function HowItWorksHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center max-w-4xl mx-auto w-full pt-4 md:pt-10 pb-8 px-4"
      aria-label="Workflow Timeline Overview"
    >
      {/* Ambient Radial Backlight Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />

      {/* SLA Eyebrow Pill */}
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_0_24px_rgba(124,58,237,0.2)] hover:border-primary/40 transition-colors"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        <span className="font-headline text-[11px] font-semibold tracking-wide uppercase text-white/90">
          The 4-Stage Consensus Lifecycle
        </span>
      </motion.div>

      {/* Staggered Animated Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-headline text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4 relative z-10"
      >
        The Evaluation Journey,{" "}
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-primary to-emerald-300">
          Curated & Attested.
        </span>
      </motion.h1>

      {/* Essential Copy Only */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-body text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed relative z-10"
      >
        From initial project dispatch to binding consensus verdict in 4 clear, transparent milestones. Fast turnaround with zero demographic bias.
      </motion.p>
    </motion.section>
  );
}
