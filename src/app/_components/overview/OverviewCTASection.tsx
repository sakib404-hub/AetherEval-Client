"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { GlassButton } from "../ui/GlassButton";
import { StatusBadge } from "../ui/StatusBadge";

export function OverviewCTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl mx-auto mb-12"
      aria-label="Call to Action"
    >
      <GlassCard
        level={3}
        className="p-8 sm:p-12 relative overflow-hidden border-white/20 bg-gradient-to-br from-white/[0.08] via-primary-container/[0.12] to-transparent shadow-[0_16px_48px_rgba(124,58,237,0.25)]"
      >
        {/* Ambient Decorative Glow behind CTA */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <StatusBadge
                variant="approved"
                label="Open Evaluation Cohort"
                icon="verified"
              />
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
              Ready to Submit or Review Academic Research?
            </h2>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Experience an unbiased, transparent academic review process. Join as a student builder or apply to our vetted faculty evaluation panel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link href="/register?role=student">
              <GlassButton
                variant="primary"
                size="lg"
                icon="school"
                className="w-full sm:w-auto shadow-[0_0_24px_rgba(124,58,237,0.45)]"
              >
                Register as Student
              </GlassButton>
            </Link>

            <Link href="/how-it-works">
              <GlassButton
                variant="frosted"
                size="lg"
                icon="schedule"
                className="w-full sm:w-auto"
              >
                View Workflow Timeline
              </GlassButton>
            </Link>
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}
