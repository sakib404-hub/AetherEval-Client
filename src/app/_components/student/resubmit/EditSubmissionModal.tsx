"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RawBackendSubmission } from "@/types/submission";
import { updateSubmission } from "@/app/_actions/submissions/updateSubmission";
import { showSuccessAlert, showErrorAlert } from "@/lib/alert";
import { GlassButton } from "@/app/_components/ui/GlassButton";

interface EditSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: RawBackendSubmission | null;
  onSuccess: (updated: RawBackendSubmission) => void;
}

export function EditSubmissionModal({
  isOpen,
  onClose,
  submission,
  onSuccess,
}: EditSubmissionModalProps) {
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync form inputs whenever the selected submission changes
  useEffect(() => {
    if (submission) {
      setProjectName(submission.projectName || "");
      setRepoUrl(submission.repoUrl || "");
      setLiveLink(submission.liveLink || "");
      setDescription(submission.description || "");
      setErrorMsg(null);
    }
  }, [submission]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !submission) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!projectName.trim()) {
      setErrorMsg("Project name cannot be empty.");
      return;
    }
    if (!repoUrl.trim()) {
      setErrorMsg("Repository URL is required.");
      return;
    }
    if (!liveLink.trim()) {
      setErrorMsg("Live deployment URL is required.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Project description / remediation summary is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await updateSubmission({
        submissionId: submission.id,
        projectName: projectName.trim(),
        repoUrl: repoUrl.trim(),
        liveLink: liveLink.trim(),
        description: description.trim(),
      });

      setIsSubmitting(false);

      if (res.success) {
        const updatedSubmission: RawBackendSubmission = {
          ...submission,
          projectName: projectName.trim(),
          repoUrl: repoUrl.trim(),
          liveLink: liveLink.trim(),
          description: description.trim(),
          status: "PENDING",
          updatedAt: new Date().toISOString(),
        };

        showSuccessAlert(
          "Project Resubmitted",
          res.message || "Your revised project has been re-queued for mentor evaluation."
        );
        onSuccess(updatedSubmission);
        onClose();
      } else {
        setErrorMsg(res.message);
        showErrorAlert("Update Failed", res.message);
      }
    } catch (err) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
      showErrorAlert("Network Error", msg);
    }
  };

  const feedbackText = submission.rejectionReason || submission.reviewComment;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          data-lenis-prevent
          className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0f0b1d] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Glowing Top Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.3)]">
                <span className="material-symbols-outlined text-xl">
                  published_with_changes
                </span>
              </div>
              <div>
                <h2 className="font-headline text-headline-sm font-bold text-white tracking-tight">
                  Edit & Resubmit Project
                </h2>
                <p className="font-body text-xs text-on-surface-variant font-mono">
                  ID: #{submission.id.slice(0, 8)} • Re-evaluation Protocol
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1" data-lenis-prevent>
            {/* Feedback Critique Box */}
            {feedbackText && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-200 space-y-1.5">
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-rose-300">
                  <span className="material-symbols-outlined text-sm">assignment_late</span>
                  <span>Mentor Critique & Rejection Notes:</span>
                </div>
                <p className="font-body text-xs leading-relaxed text-on-surface pl-5">
                  {feedbackText}
                </p>
              </div>
            )}

            {/* Error banner */}
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-rose-400 shrink-0">
                  error
                </span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form id="edit-submission-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Project Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-projectName"
                  className="block font-headline text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Project Title <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                    title
                  </span>
                  <input
                    id="edit-projectName"
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., AetherGrid: Distributed DHT Protocol"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 focus:border-rose-400 focus:bg-white/[0.07] text-white font-body text-sm outline-none transition-all placeholder:text-outline"
                  />
                </div>
              </div>

              {/* GitHub Repository URL */}
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-repoUrl"
                  className="block font-headline text-xs font-semibold text-white uppercase tracking-wider"
                >
                  GitHub Repository URL <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                    code
                  </span>
                  <input
                    id="edit-repoUrl"
                    type="url"
                    required
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/organization/repo-name"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 focus:border-rose-400 focus:bg-white/[0.07] text-white font-body text-sm outline-none transition-all placeholder:text-outline font-mono text-xs"
                  />
                </div>
              </div>

              {/* Live Deployment Link */}
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-liveLink"
                  className="block font-headline text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Live Deployment / Demo URL <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                    terminal
                  </span>
                  <input
                    id="edit-liveLink"
                    type="url"
                    required
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    placeholder="https://my-project.vercel.app"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/15 focus:border-rose-400 focus:bg-white/[0.07] text-white font-body text-sm outline-none transition-all placeholder:text-outline font-mono text-xs"
                  />
                </div>
              </div>

              {/* Description & Fixes Summary */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="edit-description"
                    className="block font-headline text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    Project Description & Remediation Notes <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-outline">
                    {description.length} chars
                  </span>
                </div>
                <textarea
                  id="edit-description"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the architectural enhancements, test fixes, or resolved failure vectors addressed in this resubmission..."
                  className="w-full p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 focus:border-rose-400 focus:bg-white/[0.07] text-white font-body text-sm outline-none transition-all placeholder:text-outline resize-none leading-relaxed"
                />
                <p className="text-[11px] font-body text-on-surface-variant">
                  Tip: Specifically outline how you resolved the issues mentioned in the mentor critique.
                </p>
              </div>
            </form>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3 shrink-0 bg-white/[0.02]">
            <GlassButton
              type="button"
              variant="frosted"
              size="md"
              disabled={isSubmitting}
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </GlassButton>
            <GlassButton
              type="submit"
              form="edit-submission-form"
              variant="primary"
              size="md"
              loading={isSubmitting}
              icon="send"
              className="w-full sm:w-auto bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-[0_0_24px_rgba(244,63,94,0.4)]"
            >
              {isSubmitting ? "Updating Ledger..." : "Update & Resubmit"}
            </GlassButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
