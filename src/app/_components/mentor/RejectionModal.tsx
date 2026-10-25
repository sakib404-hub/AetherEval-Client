"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { GlassButton } from "@/app/_components/ui/GlassButton";
import { GlassTextarea } from "@/app/_components/ui/GlassTextarea";
import { MentorSubmissionItem } from "./SubmissionTableRow";

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: MentorSubmissionItem | null;
  onConfirmRejection: (id: string, reason: string, tags: string[]) => void;
}

const FAILURE_VECTORS = [
  "Private / Inaccessible Repository",
  "Failed Unit Benchmarks (< 85%)",
  "Missing Deployment / 404 Error",
  "Plagiarism Flag (> 20% similarity)",
  "Incomplete Architectural Documentation",
  "Missing Consensus Cryptographic Signatures",
];

export function RejectionModal({
  isOpen,
  onClose,
  submission,
  onConfirmRejection,
}: RejectionModalProps) {
  const [selectedVectors, setSelectedVectors] = useState<string[]>([]);
  const [justification, setJustification] = useState("");

  if (!isOpen || !submission || submission.status === "approved") return null;

  const toggleVector = (vec: string) => {
    setSelectedVectors((prev) =>
      prev.includes(vec) ? prev.filter((v) => v !== vec) : [...prev, vec]
    );
  };

  const handleConfirm = () => {
    onConfirmRejection(submission.id, justification, selectedVectors);
    setSelectedVectors([]);
    setJustification("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        data-lenis-prevent
      >
        {/* Backdrop animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative z-10 w-full max-w-lg"
        >
          <GlassCard level={2} className="p-6 md:p-8 border-rose-500/30 shadow-[0_16px_48px_rgba(244,63,94,0.2)]">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <span className="material-symbols-outlined text-[22px]">error</span>
                </div>
                <div>
                  <h3 className="text-lg font-headline font-bold text-white tracking-tight">
                    Reject Submission
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    ID: {submission.id} • {submission.studentNode}
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

            {/* Target Project Summary */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                Target Project
              </span>
              <p className="text-sm font-headline font-semibold text-white">
                {submission.title}
              </p>
              <p className="text-xs text-on-surface-variant font-body">
                Author: {submission.studentName} ({submission.track})
              </p>
            </div>

            {/* Failure Vectors */}
            <div className="mt-5">
              <label className="text-xs font-headline font-semibold text-slate-300 block mb-2">
                Select Observed Failure Vectors
              </label>
              <div className="flex flex-wrap gap-2">
                {FAILURE_VECTORS.map((vector) => {
                  const isChecked = selectedVectors.includes(vector);
                  return (
                    <button
                      key={vector}
                      type="button"
                      onClick={() => toggleVector(vector)}
                      className={`text-xs font-headline px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.25)]"
                          : "bg-white/[0.03] text-on-surface-variant border-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {isChecked ? "✕ " : "+ "}
                      {vector}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Architectural Justification */}
            <div className="mt-5 space-y-1.5">
              <label className="text-xs font-headline font-semibold text-slate-300 flex justify-between items-center">
                <span>Architectural Justification & Feedback</span>
                <span className="text-[10px] font-mono text-slate-400">Required</span>
              </label>
              <GlassTextarea
                rows={3}
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="State the technical rationale, failed test assertions, or missing cryptographic proofs to guide the student's next revision cycle..."
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </GlassButton>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!justification.trim() && selectedVectors.length === 0}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-headline font-semibold transition-all shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
                Confirm Rejection
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
