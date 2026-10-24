"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { GlassButton } from "@/app/_components/ui/GlassButton";
import { GlassTextarea } from "@/app/_components/ui/GlassTextarea";
import { MentorApplicant } from "./ApplicantTableRow";

interface ApplicantRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicant: MentorApplicant | null;
  onConfirm: (id: string, reason: string, vectors: string[]) => void;
}

const DISQUALIFICATION_REASONS = [
  "Non-Accredited / Unverified Domain",
  "GPG Key Signature Verification Failure",
  "Insufficient Research Publications (< 5)",
  "Duplicate Node Identity Registration",
  "Institutional Disciplinary Flag",
  "Honor Code Non-Compliance",
];

export function ApplicantRejectModal({
  isOpen,
  onClose,
  applicant,
  onConfirm,
}: ApplicantRejectModalProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  if (!isOpen || !applicant) return null;

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleConfirm = () => {
    onConfirm(applicant.id, notes, selectedReasons);
    setSelectedReasons([]);
    setNotes("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        data-lenis-prevent
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative z-10 w-full max-w-lg"
        >
          <GlassCard
            level={2}
            className="p-6 md:p-8 border-rose-500/30 shadow-[0_16px_48px_rgba(244,63,94,0.2)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <span className="material-symbols-outlined text-[22px]">
                    gpp_bad
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-headline font-bold text-white tracking-tight">
                    Reject Mentor Registration
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Candidate: {applicant.name} ({applicant.email})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Target Summary */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-body">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Institutional Affiliation
              </span>
              <p className="font-headline font-semibold text-white">
                {applicant.department} • {applicant.institution}
              </p>
            </div>

            {/* Disqualification Vectors */}
            <div className="mt-5">
              <label className="text-xs font-headline font-semibold text-slate-300 block mb-2">
                Select Observed Disqualification Vectors
              </label>
              <div className="flex flex-wrap gap-2">
                {DISQUALIFICATION_REASONS.map((reason) => {
                  const isChecked = selectedReasons.includes(reason);
                  return (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => toggleReason(reason)}
                      className={`text-xs font-headline px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.25)]"
                          : "bg-white/[0.03] text-on-surface-variant border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isChecked ? "✕ " : "+ "}
                      {reason}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Architectural Justification */}
            <div className="mt-5 space-y-1.5">
              <label className="text-xs font-headline font-semibold text-slate-300 flex justify-between items-center">
                <span>Administrative Audit Rationale</span>
                <span className="text-[10px] font-mono text-slate-400">Required</span>
              </label>
              <GlassTextarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="State the verification findings or failed faculty database checks..."
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <GlassButton variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </GlassButton>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!notes.trim() && selectedReasons.length === 0}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-headline font-semibold transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  gpp_bad
                </span>
                Confirm Disqualification
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
