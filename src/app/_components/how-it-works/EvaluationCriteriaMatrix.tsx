"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";

interface Criterion {
  id: string;
  weight: string;
  weightPercent: number;
  title: string;
  icon: string;
  description: string;
  rubricPoints: string[];
}

const CRITERIA: Criterion[] = [
  {
    id: "architecture",
    weight: "40% Weight",
    weightPercent: 40,
    title: "Codebase Architecture & Modularity",
    icon: "architecture",
    description:
      "Evaluates repository organization, separation of concerns, clean code practices, and adherence to modern framework patterns.",
    rubricPoints: [
      "Clean directory conventions and component modularity",
      "Robust TypeScript types with no arbitrary 'any' casting",
      "Git commit history clarity and dependency hygiene",
    ],
  },
  {
    id: "deployment",
    weight: "35% Weight",
    weightPercent: 35,
    title: "Live Deployment & Runtime Stability",
    icon: "rocket_launch",
    description:
      "Inspects the production live link to ensure the application executes reliably in real-world hosting environments.",
    rubricPoints: [
      "Accessible production URL without runtime error crashes",
      "Mobile-first responsiveness across standard viewports",
      "Proper client-side error handling and loading indicators",
    ],
  },
  {
    id: "rigor",
    weight: "25% Weight",
    weightPercent: 25,
    title: "Technical Rigor & Problem Scope",
    icon: "psychology",
    description:
      "Assesses the engineering difficulty, technical description clarity, and suitability of the chosen architecture for the stated problem.",
    rubricPoints: [
      "Cohesive project description articulating problem and solution",
      "Appropriate choice of database, libraries, and protocols",
      "Novel engineering contributions or capstone depth",
    ],
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

export function EvaluationCriteriaMatrix() {
  return (
    <section
      aria-labelledby="evaluation-criteria-heading"
      className="w-full max-w-6xl mx-auto mb-16"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
            Rubric Transparency
          </div>
          <h2
            id="evaluation-criteria-heading"
            className="font-headline text-2xl sm:text-3xl md:text-headline-md font-bold text-white tracking-tight"
          >
            How Mentors Evaluate Submissions
          </h2>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant max-w-md">
          Standardized criteria prevent arbitrary scoring and guarantee every student receives structured, objective feedback.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {CRITERIA.map((criterion) => (
          <motion.div
            key={criterion.id}
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
              className="p-6 flex flex-col justify-between h-full border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">
                      {criterion.icon}
                    </span>
                  </div>
                  <span className="text-[11px] font-headline font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    {criterion.weight}
                  </span>
                </div>

                <h3 className="font-headline text-headline-sm font-semibold text-white mb-2">
                  {criterion.title}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-6">
                  {criterion.description}
                </p>

                {/* Rubric Points */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="text-[10px] font-headline font-bold text-white/90 uppercase tracking-wider mb-2">
                    Evaluation Factors:
                  </div>
                  {criterion.rubricPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">
                        check
                      </span>
                      <span className="font-body text-body-xs text-white/80">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Weight Percentage Bar with Framer Motion Fill */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-body-xs font-headline mb-1.5">
                  <span className="text-on-surface-variant">Rubric Share</span>
                  <span className="text-white font-bold">{criterion.weightPercent}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${criterion.weightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25,
                      ease: [0.16, 1, 0.3, 1] as const,
                    }}
                    className="h-full bg-gradient-to-r from-purple-500 to-primary rounded-full"
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
