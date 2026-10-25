"use client";

import { useState, useTransition, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RawBackendSubmission } from "@/types/submission";
import { getMySubmissions } from "@/app/_actions/submissions/getMySubmissions";
import { ResubmitHeader } from "./ResubmitHeader";
import { RejectedSubmissionCard } from "./RejectedSubmissionCard";
import { EditSubmissionModal } from "./EditSubmissionModal";

interface ResubmitPageContainerProps {
  initialSubmissions?: RawBackendSubmission[];
  initialError?: string | null;
}

function ResubmitPageContent({
  initialSubmissions = [],
  initialError = null,
}: ResubmitPageContainerProps) {
  const searchParams = useSearchParams();
  const submissionIdParam = searchParams.get("submissionId");

  // Keep only rejected submissions
  const filterRejected = useCallback((items: RawBackendSubmission[]) => {
    return items.filter(
      (sub) => (sub.status || "").toUpperCase() === "REJECTED"
    );
  }, []);

  const [rejectedSubmissions, setRejectedSubmissions] = useState<RawBackendSubmission[]>(() =>
    filterRejected(initialSubmissions)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSubmission, setEditingSubmission] = useState<RawBackendSubmission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Refresh data from server
  const handleRefresh = useCallback(() => {
    startTransition(async () => {
      const res = await getMySubmissions();
      if (res.success) {
        setRejectedSubmissions(filterRejected(res.data));
        setErrorMessage(null);
      } else {
        setErrorMessage(res.message);
      }
    });
  }, [filterRejected]);

  // Sync state if initial props change
  useEffect(() => {
    if (initialSubmissions) {
      setRejectedSubmissions(filterRejected(initialSubmissions));
    }
    if (initialError !== undefined) {
      setErrorMessage(initialError);
    }
  }, [initialSubmissions, initialError, filterRejected]);

  // Check URL search parameter for target submissionId to auto-open modal
  useEffect(() => {
    if (submissionIdParam && rejectedSubmissions.length > 0) {
      const found = rejectedSubmissions.find((s) => s.id === submissionIdParam);
      if (found) {
        setEditingSubmission(found);
        setIsModalOpen(true);
      }
    }
  }, [submissionIdParam, rejectedSubmissions]);

  // Filter items by search query
  const filteredItems = rejectedSubmissions.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      (item.projectName || "").toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      (item.description || "").toLowerCase().includes(query) ||
      (item.rejectionReason || "").toLowerCase().includes(query) ||
      (item.reviewComment || "").toLowerCase().includes(query)
    );
  });

  const handleOpenEdit = (submission: RawBackendSubmission) => {
    setEditingSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsModalOpen(false);
    setEditingSubmission(null);
  };

  const handleSuccessUpdate = (updated: RawBackendSubmission) => {
    // When a submission is updated and resubmitted, it is re-queued as PENDING
    // Remove it from the remediation queue and refresh
    setRejectedSubmissions((prev) => prev.filter((s) => s.id !== updated.id));
    handleRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto w-full space-y-7 pt-1"
    >
      {/* Page Header */}
      <ResubmitHeader
        rejectedCount={rejectedSubmissions.length}
        onRefresh={handleRefresh}
        isRefreshing={isPending}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="rounded-3xl bg-rose-500/10 border border-rose-500/25 p-4 flex items-center justify-between gap-3 text-rose-200 text-xs backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg text-rose-400">error</span>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="underline hover:text-white cursor-pointer font-headline"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Search Bar when items exist */}
      {rejectedSubmissions.length > 0 && (
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flagged submissions by project title, ID, or critique..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/12 text-white font-body text-sm outline-none focus:border-rose-400 focus:bg-white/[0.06] transition-all placeholder:text-outline"
          />
        </div>
      )}

      {/* Rejected Cards List */}
      <section aria-label="Rejected Submissions" className="space-y-5">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((submission) => (
              <RejectedSubmissionCard
                key={submission.id}
                submission={submission}
                onEdit={handleOpenEdit}
              />
            ))
          ) : rejectedSubmissions.length === 0 ? (
            /* Empty State: No Rejected Submissions */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body space-y-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline text-headline-sm font-semibold text-white">
                  No Projects Flagged for Resubmission
                </h3>
                <p className="text-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  All your project submissions are in good standing, verified, or currently under active peer review. No remediation actions are required at this time.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/student-dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-headline text-xs font-semibold shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-base">folder_managed</span>
                  <span>View Submission History</span>
                </Link>
                <Link
                  href="/student-dashboard/submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-white font-headline text-xs font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>Submit New Project</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Search returned 0 matches */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-10 text-center rounded-3xl bg-white/[0.02] border border-white/10 text-on-surface-variant font-body space-y-2"
            >
              <span className="material-symbols-outlined text-3xl text-outline">
                filter_list_off
              </span>
              <p className="text-body-sm">
                No flagged submissions match &ldquo;{searchQuery}&rdquo;.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Edit Submission Modal */}
      <EditSubmissionModal
        isOpen={isModalOpen}
        onClose={handleCloseEdit}
        submission={editingSubmission}
        onSuccess={handleSuccessUpdate}
      />
    </motion.div>
  );
}

export function ResubmitPageContainer(props: ResubmitPageContainerProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto w-full p-8 text-center text-on-surface-variant font-headline text-xs">
          Loading Remediation Registry...
        </div>
      }
    >
      <ResubmitPageContent {...props} />
    </Suspense>
  );
}
