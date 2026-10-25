"use client";

import { motion } from "framer-motion";

interface RubricPill {
  title: string;
  icon: string;
  standard: string;
  color: string;
  hoverBorder: string;
}

const RUBRICS: RubricPill[] = [
  {
    title: "Code Architecture & Hygiene",
    icon: "code_blocks",
    standard: "Verified Git repo, clean commits, modular separation",
    color: "text-purple-400 border-purple-500/25 bg-purple-500/10",
    hoverBorder: "hover:border-purple-400/50 hover:shadow-[0_0_24px_rgba(168,85,247,0.2)]",
  },
  {
    title: "Runtime Deployment Health",
    icon: "terminal",
    standard: "Live 200 OK edge response, zero console exceptions",
    color: "text-cyan-400 border-cyan-500/25 bg-cyan-500/10",
    hoverBorder: "hover:border-cyan-400/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.2)]",
  },
  {
    title: "Double-Blind Impartiality",
    icon: "visibility_off",
    standard: "100% technical merit with zero demographic bias",
    color: "text-amber-400 border-amber-500/25 bg-amber-500/10",
    hoverBorder: "hover:border-amber-400/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]",
  },
  {
    title: "Immutable Consensus Rules",
    icon: "lock",
    standard: "Approved locked permanently; rejected resubmittable",
    color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10",
    hoverBorder: "hover:border-emerald-400/50 hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]",
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

export function CurvyCriteriaPills() {
  return (
    <section
      aria-label="Core Evaluation Rubrics"
      className="w-full max-w-5xl mx-auto my-12 px-4"
    >
      <div className="text-center mb-7">
        <span className="text-[11px] font-headline font-bold uppercase tracking-widest text-primary">
          Core Guarantees
        </span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Universal Evaluation Rubrics
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {RUBRICS.map((item) => (
          <motion.div
            key={item.title}
            variants={cardVariants}
            whileHover={{
              y: -4,
              scale: 1.015,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            className={`p-5 rounded-[24px] bg-white/[0.03] backdrop-blur-xl border border-white/10 ${item.hoverBorder} transition-all duration-300 flex items-start gap-4 group cursor-default`}
          >
            <div
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-headline text-sm font-bold text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                {item.standard}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
