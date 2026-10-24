"use client";

import { motion, AnimatePresence } from "framer-motion";
import { showSuccessAlert } from "@/lib/alert";

interface LedgerReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  score: number;
}

export function LedgerReceiptModal({
  isOpen,
  onClose,
  projectTitle,
  score,
}: LedgerReceiptModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg rounded-3xl bg-[#0f0b1d] border border-white/20 p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Top Specular Line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  receipt_long
                </span>
                <h3 className="font-headline text-headline-sm font-bold text-white">
                  Verification Ledger Receipt
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 font-mono text-body-xs">
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1.5">
                <div className="text-on-surface-variant text-[11px]">PROJECT IDENTIFIER</div>
                <div className="text-white font-semibold font-headline text-sm truncate">
                  {projectTitle}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-black/50 border border-white/10">
                  <div className="text-on-surface-variant text-[10px]">CONSENSUS SCORE</div>
                  <div className="text-emerald-400 font-bold font-headline text-lg mt-0.5">
                    {score}/100 (A+)
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-black/50 border border-white/10">
                  <div className="text-on-surface-variant text-[10px]">ORACLE STATUS</div>
                  <div className="text-primary font-bold font-headline text-sm mt-1">
                    3/3 SIGNATURES
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <div className="text-on-surface-variant text-[10px]">MERKLE ROOT COMMIT</div>
                <div className="text-primary text-[11px] break-all">
                  0x7a89f92c10b48e3d641128a19b0fc3218de431aa
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                <div className="text-on-surface-variant text-[10px]">ANCHOR TRANSACTION BLOCK</div>
                <div className="text-white/80 text-[11px]">
                  Block #10,482,912 • Timestamp: 2025-04-14 18:22:04 UTC
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  showSuccessAlert(
                    "Certificate Downloaded",
                    "Verification Certificate signature file (.sig) downloaded."
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-primary-container/80 hover:bg-primary-container text-white font-headline text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-[0_0_16px_rgba(124,58,237,0.4)]"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download .sig Certificate</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-headline text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
