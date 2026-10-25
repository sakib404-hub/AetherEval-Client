"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroActionButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center mt-9 w-full"
    >
      {/* Sole Prominent Action: Explore Workflow */}
      <div className="flex items-center justify-center w-full sm:w-auto">
        <Link
          href="/how-it-works"
          className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-headline text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 hover:border-primary/50 shadow-[0_0_24px_rgba(124,58,237,0.25)] hover:shadow-[0_0_36px_rgba(124,58,237,0.5)] backdrop-blur-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg text-primary">schema</span>
          <span>Explore Workflow</span>
          <span className="material-symbols-outlined text-base text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all">
            arrow_forward
          </span>
        </Link>
      </div>

      {/* Trust micro-indicators */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-xs font-headline text-on-surface-variant/80">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
          <span>Dual-Artifact Verification</span>
        </div>
        <div className="hidden sm:inline text-white/20">•</div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
          <span>Double-Blind Peer Review</span>
        </div>
        <div className="hidden sm:inline text-white/20">•</div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
          <span>&lt; 48h SLA Guarantee</span>
        </div>
      </div>
    </motion.div>
  );
}
