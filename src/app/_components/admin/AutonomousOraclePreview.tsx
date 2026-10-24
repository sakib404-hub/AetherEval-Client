"use client";

import { motion } from "framer-motion";
import { MentorApplicant } from "./ApplicantTableRow";

interface AutonomousOraclePreviewProps {
  applicant: MentorApplicant;
}

export function AutonomousOraclePreview({
  applicant,
}: AutonomousOraclePreviewProps) {
  return (
    <motion.section
      key={applicant.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Active Candidate Inspection"
      className="rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-6 shadow-[0_8px_32px_0_rgba(124,58,237,0.2)] mb-10 relative overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-primary text-xs font-headline font-bold">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
            <span>INSTANT VERIFICATION PROTOCOL (AUTONOMOUS ORACLE)</span>
          </div>
          <h3 className="text-lg md:text-xl font-headline font-bold text-white tracking-tight">
            Active Candidate Inspection: {applicant.name}
          </h3>
          <p className="text-xs md:text-sm font-body text-on-surface-variant leading-relaxed">
            {applicant.bioSummary}
          </p>
        </div>

        {/* Live Diagnostic Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          {/* DNS / DKIM */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-start">
            <span className="text-[11px] font-mono text-on-surface-variant">
              DNS / DKIM
            </span>
            <span className="text-xs font-headline font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">
                check_circle
              </span>
              Valid ({applicant.email.split("@")[1]})
            </span>
          </div>

          {/* GPG Academic Key */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col items-start">
            <span className="text-[11px] font-mono text-on-surface-variant">
              GPG Academic Key
            </span>
            <span className="text-xs font-headline font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">key</span>
              4096R Verified
            </span>
          </div>

          {/* Identity Score */}
          <div className="p-3 rounded-2xl bg-primary-container/20 border border-primary/40 flex flex-col items-start col-span-2 sm:col-span-1 shadow-[0_0_12px_rgba(124,58,237,0.25)]">
            <span className="text-[11px] font-headline font-semibold text-primary">
              Identity Score
            </span>
            <span className="text-sm font-headline font-bold text-white flex items-center gap-1 mt-0.5 font-mono">
              <span className="material-symbols-outlined text-[16px] text-primary">
                verified_user
              </span>
              {applicant.reputationScore} / 100
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
