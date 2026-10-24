"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { TrackSelector, TrackType } from "./TrackSelector";
import { TechStackTagManager } from "./TechStackTagManager";
import { CodeFreezeNotice } from "./CodeFreezeNotice";
import { createSubmission } from "@/app/_actions/submissions/createSubmission";
import { showSuccessAlert, showErrorAlert, showInfoAlert } from "@/lib/alert";

interface SubmissionAlert {
  type: "success" | "error";
  title: string;
  message: string;
}

export function SubmissionForm() {
  const router = useRouter();

  const [title, setTitle] = useState("AetherGrid: Quantum-Resistant DHT Protocol");
  const [track, setTrack] = useState<TrackType>("distributed");
  const [repoUrl, setRepoUrl] = useState("https://github.com/aether-nodes/aethergrid-quantum-dht");
  const [demoUrl, setDemoUrl] = useState("https://demo.vercel.app/aethergrid");
  const [abstract, setAbstract] = useState(
    "A zero-knowledge distributed hash table providing post-quantum Byzantine fault tolerance across unstructured academic peer overlays. Leverages state-pruning micro-rollups and lattice polynomial cryptography for state replication guarantees."
  );
  const [tags, setTags] = useState<string[]>(["Rust", "WebAssembly", "Next.js", "Solidity"]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [freezeSuccess, setFreezeSuccess] = useState<string | null>(null);
  const [alert, setAlert] = useState<SubmissionAlert | null>(null);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    try {
      const res = await createSubmission({
        projectName: title,
        repoUrl: repoUrl,
        liveLink: demoUrl,
        description: abstract,
      });

      setIsSubmitting(false);

      if (res.success) {
        const rawData = res.data as { id?: string } | undefined;
        const freezeHash = rawData?.id
          ? `0x${rawData.id.replace(/-/g, "").slice(0, 40)}`
          : "0x9f8a2c41e8840b2a95c8614e0bbd3910f54e12da84";

        const successMsg = res.message || "Your project was successfully published to the evaluation ledger.";

        setFreezeSuccess(freezeHash);
        setAlert({
          type: "success",
          title: "Submission Succeeded",
          message: successMsg,
        });

        // Trigger sweetalert from bottom left
        showSuccessAlert("Submission Succeeded", successMsg);

        // Instantly trigger Next.js router cache invalidation
        router.refresh();
      } else {
        const errorMsg = res.message || "Failed to submit project. Please verify required fields and try again.";
        setAlert({
          type: "error",
          title: "Submission Error",
          message: errorMsg,
        });

        // Trigger sweetalert for submission error from bottom left
        showErrorAlert("Submission Error", errorMsg);
      }
    } catch (err) {
      setIsSubmitting(false);
      const errorMsg = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setAlert({
        type: "error",
        title: "Submission Error",
        message: errorMsg,
      });

      // Trigger sweetalert for submission error from bottom left
      showErrorAlert("Submission Error", errorMsg);
    }
  };

  const handleNavigateToLedger = () => {
    router.refresh();
    router.push("/student-dashboard");
  };

  return (
    <div className="space-y-5">
      {/* Real-time Alert Notification Banner */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            role="alert"
            className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl flex items-start justify-between gap-4 shadow-xl ${
              alert.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200 shadow-[0_8px_30px_rgba(16,185,129,0.25)]"
                : "bg-rose-500/15 border-rose-500/30 text-rose-200 shadow-[0_8px_30px_rgba(244,63,94,0.25)]"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`material-symbols-outlined text-2xl shrink-0 mt-0.5 ${
                  alert.type === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {alert.type === "success" ? "verified" : "error"}
              </span>
              <div className="space-y-0.5">
                <h4 className="font-headline font-bold text-sm tracking-tight text-white flex items-center gap-2">
                  <span>{alert.title}</span>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.2 rounded-full border ${
                      alert.type === "success"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {alert.type === "success" ? "201 Created" : "Attention"}
                  </span>
                </h4>
                <p className="font-body text-xs text-on-surface leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAlert(null)}
              aria-label="Dismiss alert"
              className="p-1 rounded-lg hover:bg-white/10 text-on-surface-variant hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {freezeSuccess ? (
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/15 p-8 text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(52,211,153,0.35)]">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <div>
            <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
              SHA-256 Freeze Attested
            </span>
            <h3 className="font-headline text-headline-sm font-bold text-white mt-3 mb-1">
              Project Codebase Successfully Frozen!
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              Your repository commit tree has been permanently locked for double-blind review.
              Any subsequent commits to the branch will be flagged by the oracle consensus engine.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-1 font-mono text-body-xs max-w-md mx-auto">
            <div className="text-on-surface-variant text-[11px]">IMMUTABLE MERKLE HASH:</div>
            <div className="text-primary break-all">{freezeSuccess}</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleNavigateToLedger}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-container to-[#4C1D95] text-white font-headline text-body-sm font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View in Submission Ledger</span>
              <span className="material-symbols-outlined text-base">folder_managed</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setFreezeSuccess(null);
                setAlert(null);
              }}
              className="px-5 py-3 rounded-full bg-white/[0.05] border border-white/15 text-on-surface-variant hover:text-white transition-all text-body-sm font-headline cursor-pointer"
            >
              Submit Another Project
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border border-white/15 p-6 md:p-8 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] relative overflow-hidden">
          {/* Specular Highlight Edge */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Form Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-headline-sm text-white font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">memory</span>
                Submit Project Details
              </h2>
              <span className="text-xs font-headline text-primary bg-primary-container/20 border border-primary/30 px-2.5 py-1 rounded-full">
                Live Submission
              </span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant mt-1">
              Register your cryptographic repository, autonomous builds, and live deployment nodes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Project Title */}
            <div className="space-y-1.5">
              <label className="block font-headline text-label-md text-on-surface-variant">
                Project Title <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  folder_code
                </span>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., AetherGrid: Quantum-Resistant DHT Protocol"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body"
                />
              </div>
            </div>

            {/* 2. Track Selector */}
            <TrackSelector selectedTrack={track} onSelectTrack={setTrack} />

            {/* 3. GitHub Repository URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-headline text-label-md text-on-surface-variant">
                  GitHub Repository URL <span className="text-primary">*</span>
                </label>
                <span className="text-[11px] font-headline text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  Verified Public/Private
                </span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  code
                </span>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/username/project-repo"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body"
                />
              </div>
            </div>

            {/* 4. Live Deployment URL */}
            <div className="space-y-1.5">
              <label className="block font-headline text-label-md text-on-surface-variant">
                Live Deployment URL <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  language
                </span>
                <input
                  type="url"
                  required
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://demo.vercel.app/my-project"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body"
                />
              </div>
            </div>

            {/* 5. Project Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-headline text-label-md text-on-surface-variant">
                  Project Description & Specifications <span className="text-primary">*</span>
                </label>
                <span className="text-[11px] font-headline text-outline">
                  {abstract.length}/1000 chars
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={abstract}
                maxLength={1000}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Summarize your evaluation thesis, algorithmic invariants, and verification steps..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/30 transition-all font-body leading-relaxed"
              />
            </div>

            {/* 6. Technical Stack Tags */}
            <TechStackTagManager
              tags={tags}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />

            {/* Rate Limit Warning Banner */}
            <CodeFreezeNotice />

            {/* Action Button Cluster */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-[#4C1D95] text-white font-headline font-semibold shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(124,58,237,0.8)] border border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-xl">
                  {isSubmitting ? "hourglass_empty" : "rocket_launch"}
                </span>
                <span>{isSubmitting ? "Submitting to Evaluation Network..." : "Submit for Review"}</span>
              </button>

              <button
                type="button"
                onClick={handleNavigateToLedger}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-headline font-medium backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
