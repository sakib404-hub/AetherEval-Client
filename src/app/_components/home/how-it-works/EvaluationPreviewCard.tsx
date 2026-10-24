"use client";

import { useState } from "react";
import { GlassCard } from "../../ui/GlassCard";
import { StatusBadge } from "../../ui/StatusBadge";
import { GlassButton } from "../../ui/GlassButton";

export function EvaluationPreviewCard() {
  const [activeTab, setActiveTab] = useState<"rubric" | "ledger">("rubric");

  return (
    <GlassCard level={3} interactive className="p-6 md:p-8 text-left w-full border-white/15">
      {/* Top Header of Simulated Academic Evaluation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-container/20 border border-primary/30 px-2 py-0.5 rounded-full">
              Live Evaluation Artifact #AE-8942
            </span>
            <StatusBadge variant="approved" label="Consensus Reached" />
            <span className="text-[11px] font-body text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">visibility_off</span>
              Double-Blind Mode
            </span>
          </div>
          <h4 className="font-headline text-headline-sm md:text-headline-md font-bold text-white">
            AetherCrypt: Quantum-Resistant State Attestation Engine
          </h4>
          <p className="font-body text-body-sm text-on-surface-variant mt-1">
            Track: Distributed Systems & Cryptographic Protocols • MIT CSAIL Cohort
          </p>
        </div>

        {/* Grade Summary Box */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 p-3.5 rounded-2xl sm:self-start">
          <div className="text-right">
            <div className="text-[10px] font-headline font-semibold uppercase tracking-wider text-on-surface-variant">
              Composite Score
            </div>
            <div className="text-2xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-primary">
              95.0%
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-headline font-bold text-emerald-400 text-xl shadow-[0_0_12px_rgba(52,211,153,0.3)]">
            A+
          </div>
        </div>
      </div>

      {/* Interactive Tab Switcher */}
      <div className="flex items-center justify-between gap-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("rubric")}
            className={`px-3.5 py-1.5 rounded-xl font-headline text-body-xs font-semibold transition-all cursor-pointer ${
              activeTab === "rubric"
                ? "bg-primary-container/30 border border-primary/50 text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            Evaluation Rubric Breakdown
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ledger")}
            className={`px-3.5 py-1.5 rounded-xl font-headline text-body-xs font-semibold transition-all cursor-pointer ${
              activeTab === "ledger"
                ? "bg-primary-container/30 border border-primary/50 text-white shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            Cryptographic Audit Ledger
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-body-xs font-headline text-on-surface-variant">
          <span className="material-symbols-outlined text-sm text-emerald-400">
            lock
          </span>
          Commit Freeze: <code className="text-white/80 font-mono">9f8a2...c41e</code>
        </div>
      </div>

      {/* Tab Content 1: Rubric Breakdown */}
      {activeTab === "rubric" && (
        <div className="py-6 space-y-4">
          {/* Dimension 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-body-sm font-headline">
              <span className="text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">architecture</span>
                Technical Architecture & Modularity
              </span>
              <span className="text-primary font-bold">38 / 40 pts (95%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-primary rounded-full w-[95%]" />
            </div>
          </div>

          {/* Dimension 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-body-sm font-headline">
              <span className="text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">terminal</span>
                Code Quality, Testing & Build Hygiene
              </span>
              <span className="text-primary font-bold">29 / 30 pts (96.7%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-primary rounded-full w-[96.7%]" />
            </div>
          </div>

          {/* Dimension 3 */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-body-sm font-headline">
              <span className="text-white font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">lightbulb</span>
                Novelty, Impact & Academic Rigor
              </span>
              <span className="text-primary font-bold">28 / 30 pts (93.3%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-primary rounded-full w-[93.3%]" />
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Ledger Audit Trail */}
      {activeTab === "ledger" && (
        <div className="py-6 space-y-3 font-mono text-body-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-on-surface-variant">BLOCK #781042</span>
            <span className="text-emerald-400">MERKLE_ROOT: 0x9fa1...66ee</span>
            <span className="text-white/70">12:04:19 UTC</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-on-surface-variant">ORACLE_CONSENSUS</span>
            <span className="text-primary">3 / 3 MENTOR ATTESTATIONS MATCHED</span>
            <span className="text-emerald-400 font-bold">VALIDATED</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
            <span className="text-on-surface-variant">LEDGER_CERTIFICATE</span>
            <span className="text-white/80">CERT-AE-8942-FINAL-A+.sig</span>
            <span className="text-primary font-bold">ANCHORED</span>
          </div>
        </div>
      )}

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-body-xs font-headline text-on-surface-variant">
          <span className="material-symbols-outlined text-base text-primary">verified_user</span>
          Signed by 3 Anonymous Evaluators • Tamper-Evident Receipt
        </div>

        <a href="#auth">
          <GlassButton variant="primary" size="sm" icon="assignment_turned_in">
            Verify With Your Academic ID
          </GlassButton>
        </a>
      </div>
    </GlassCard>
  );
}
