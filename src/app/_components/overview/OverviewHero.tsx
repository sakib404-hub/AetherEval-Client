"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StatusBadge } from "../ui/StatusBadge";
import { GlassButton } from "../ui/GlassButton";

export function OverviewHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center max-w-4xl mx-auto w-full pt-4 md:pt-8 pb-12"
    >
      {/* Protocol Live Pulse Pill */}
      <div className="mb-6 inline-flex items-center gap-2">
        <StatusBadge
          variant="node"
          label="AetherEval Protocol v2.4 • Active Network"
          icon="verified"
          pulse
        />
      </div>

      {/* Main Headline with Specular Text Gradient */}
      <h1 className="font-headline text-4xl sm:text-5xl md:text-headline-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-primary leading-[1.12] mb-5">
        Academic Project Evaluation & Peer Review Consensus
      </h1>

      {/* Meaningful, Zero-Fluff Description */}
      <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-10">
        AetherEval connects student researchers, vetted faculty mentors, and institutional administrators in a standardized evaluation workflow—verifying code repositories, live web deployments, and double-blind peer feedback.
      </p>

      {/* Primary Action Button Cluster */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/how-it-works">
          <GlassButton
            variant="primary"
            size="lg"
            icon="schedule"
            className="shadow-[0_0_28px_rgba(124,58,237,0.45)] hover:shadow-[0_0_36px_rgba(124,58,237,0.65)]"
          >
            Explore Flow & Timeline
          </GlassButton>
        </Link>

        <Link href="/register">
          <GlassButton variant="frosted" size="lg" icon="how_to_reg">
            Register Account
          </GlassButton>
        </Link>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-label-md font-headline text-on-surface-variant hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          Sign In
        </Link>
      </div>
    </motion.section>
  );
}
