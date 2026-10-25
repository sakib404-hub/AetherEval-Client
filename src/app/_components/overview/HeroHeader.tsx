"use client";

import { motion } from "framer-motion";

export function HeroHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Protocol Live Pulse Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(124,58,237,0.15)] mb-6 hover:border-primary/40 transition-colors"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-headline text-[11px] font-semibold tracking-wide uppercase text-white/90">
          AetherEval 2.0 • Academic Consensus Network
        </span>
      </motion.div>

      {/* Main High-Standard Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
      >
        Academic Evaluation,{" "}
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-primary to-indigo-300">
          Refined by Consensus.
        </span>
      </motion.h1>

      {/* Clean, Concise Value Proposition */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mt-6 leading-relaxed font-normal"
      >
        A standardized, double-blind peer review platform connecting student builders with accredited faculty mentors. Verifiable dual-artifact inspection for code repositories and live deployments.
      </motion.p>
    </div>
  );
}
