"use client";

import { motion } from "framer-motion";

export function HeroPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto mt-14 relative"
    >
      {/* Ambient Backlight Aura */}
      <div
        className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-indigo-500/20 to-purple-600/30 rounded-[32px] blur-2xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Glass Terminal Container */}
      <div className="relative rounded-3xl bg-[#0d091a]/85 backdrop-blur-2xl border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden text-left">
        {/* Terminal Chrome Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.02]">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>

          {/* Omnibox Address Pill */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-outline">
            <span className="material-symbols-outlined text-sm text-primary">lock</span>
            <span>aethereval.network/consensus/sub-9402</span>
          </div>

          {/* Live Consensus Status Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-headline font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE AUDIT ATTESTED</span>
          </div>
        </div>

        {/* Terminal Body: Two-Column Inspection View */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Project Submission Details (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              {/* Track Badge & Project ID */}
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-primary-container/20 border border-primary/30 text-primary font-headline text-[11px] font-semibold">
                  Distributed Systems Track
                </span>
                <span className="text-outline font-mono text-[11px]">
                  ID: #AE-9402
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
                HyperGraph — Neural Memory Indexer
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                Decentralized vector search index with real-time WebAssembly bindings and zero-knowledge attestation across academic evaluation nodes.
              </p>
            </div>

            {/* Dual Artifact Verification Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* GitHub Repo Verification */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-outline text-[11px] font-headline">
                  <span className="flex items-center gap-1.5 text-white/90 font-medium">
                    <span className="material-symbols-outlined text-sm text-primary">code</span>
                    Repository
                  </span>
                  <span className="text-emerald-400 flex items-center gap-0.5 text-[10px]">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    Verified
                  </span>
                </div>
                <div className="font-mono text-xs text-white truncate">
                  github.com/aether/hypergraph
                </div>
                <div className="text-[10px] text-outline">
                  Branch: main • Clean Commit Tree
                </div>
              </div>

              {/* Live Deployment Verification */}
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-outline text-[11px] font-headline">
                  <span className="flex items-center gap-1.5 text-white/90 font-medium">
                    <span className="material-symbols-outlined text-sm text-tertiary">terminal</span>
                    Live Deployment
                  </span>
                  <span className="text-emerald-400 flex items-center gap-0.5 text-[10px]">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    200 OK
                  </span>
                </div>
                <div className="font-mono text-xs text-white truncate">
                  hypergraph-indexer.app
                </div>
                <div className="text-[10px] text-outline">
                  Edge Response: 38ms • Zero Errors
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {["TypeScript", "Next.js 16", "Rust / Wasm", "PostgreSQL", "Zero-Knowledge"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-headline text-on-surface-variant font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right Column: Mentor Consensus Verdict (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-emerald-500/20 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle corner aura */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Header Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-headline font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  CONSENSUS APPROVED
                </span>
                <span className="text-[11px] font-mono text-outline">
                  Tier 1 Review
                </span>
              </div>

              {/* Consensus Score Dial */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-headline text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  98.5
                </span>
                <span className="font-headline text-sm font-semibold text-outline">
                  / 100 Score
                </span>
                <span className="ml-auto text-[11px] font-headline font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Top 2%
                </span>
              </div>

              {/* Mentor Critique Excerpt */}
              <p className="font-body text-xs text-on-surface-variant italic leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5">
                &ldquo;Exceptional architectural separation, clean WASM bindings, and 100% test coverage across evaluation benchmarks. Deployment responded flawlessly under synthetic load.&rdquo;
              </p>
            </div>

            {/* Evaluator Footer */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-container/30 border border-primary/40 flex items-center justify-center font-headline text-xs font-bold text-white">
                  EV
                </div>
                <div>
                  <div className="text-xs font-headline font-semibold text-white">
                    Dr. Elena Vance
                  </div>
                  <div className="text-[10px] text-outline font-body">
                    Systems Evaluation Chair
                  </div>
                </div>
              </div>
              <span className="text-emerald-400 material-symbols-outlined text-lg">
                check_circle
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
