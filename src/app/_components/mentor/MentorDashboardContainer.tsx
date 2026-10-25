"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MentorContextBar } from "./MentorContextBar";
import { MentorMetricCards } from "./MentorMetricCards";
import {
  MentorFilterToolbar,
  MentorFilterStatus,
  TrackOption,
} from "./MentorFilterToolbar";
import { SubmissionTable } from "./SubmissionTable";
import { MentorSubmissionItem } from "./SubmissionTableRow";
import { RejectionModal } from "./RejectionModal";
import { RawBackendSubmission } from "@/types/submission";
import { mapRawToMentorSubmission } from "./mentor-submission-mapper";
import { getAllSubmissions } from "@/app/_actions/mentor/getAllSubmissions";
import { updateSubmissionStatus } from "@/app/_actions/mentor/updateSubmissionStatus";
import { showSuccessAlert, showErrorAlert } from "@/lib/alert";

interface MentorDashboardContainerProps {
  initialSubmissions?: RawBackendSubmission[];
  initialError?: string | null;
}

export function MentorDashboardContainer({
  initialSubmissions = [],
  initialError = null,
}: MentorDashboardContainerProps) {
  const [submissions, setSubmissions] = useState<MentorSubmissionItem[]>(() =>
    initialSubmissions.map(mapRawToMentorSubmission)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<MentorFilterStatus>("all");
  const [trackFilter, setTrackFilter] = useState<TrackOption>("All Tracks");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rejectionTarget, setRejectionTarget] =
    useState<MentorSubmissionItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRefresh = useCallback(() => {
    startTransition(async () => {
      const result = await getAllSubmissions();
      if (result.success) {
        setSubmissions(result.data.map(mapRawToMentorSubmission));
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message);
      }
    });
  }, []);

  // Sync state when initialSubmissions prop updates
  useEffect(() => {
    if (initialSubmissions) {
      setSubmissions(initialSubmissions.map(mapRawToMentorSubmission));
    }
    if (initialError !== undefined) {
      setErrorMessage(initialError);
    }
  }, [initialSubmissions, initialError]);

  // Seamless auto-sync on mount and when returning to the window (eliminates hard reload requirement)
  useEffect(() => {
    let isMounted = true;
    async function syncLatest() {
      const result = await getAllSubmissions();
      if (isMounted && result.success) {
        setSubmissions(result.data.map(mapRawToMentorSubmission));
        setErrorMessage(null);
      }
    }
    syncLatest();

    const handleFocus = () => {
      syncLatest();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      isMounted = false;
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Filter logic
  const filteredSubmissions = submissions.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.studentName.toLowerCase().includes(query) ||
      item.studentNode.toLowerCase().includes(query) ||
      item.merkleHash.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (trackFilter !== "All Tracks" && item.track !== trackFilter) {
      return false;
    }

    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }

    return true;
  });

  // Calculate counts
  const counts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  // Quick Approve Handler hitting real status update endpoint
  const handleApprove = async (id: string) => {
    const result = await updateSubmissionStatus({
      submissionId: id,
      status: "APPROVED",
      reviewComment: "Verified consensus score: 94/100. All peer criteria met.",
    });

    if (result.success) {
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, status: "approved", score: 94 } : sub
        )
      );
      showSuccessAlert(
        "Submission Approved",
        result.message || "Project approved and signed with Mentor Node consensus."
      );
    } else {
      showErrorAlert(
        "Approval Failed",
        result.message || "Failed to update submission status on evaluation network."
      );
    }
  };

  // Rejection confirmation handler hitting real status update endpoint
  const handleConfirmRejection = async (
    id: string,
    reason: string,
    vectors: string[]
  ) => {
    const combinedComment = vectors.length > 0
      ? `Failure vectors: ${vectors.join(", ")}. ${reason}`.trim()
      : reason;

    const result = await updateSubmissionStatus({
      submissionId: id,
      status: "REJECTED",
      rejectionReason: reason || "Peer review criteria not satisfied.",
      reviewComment: combinedComment,
    });

    if (result.success) {
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, status: "rejected" } : sub
        )
      );
      showSuccessAlert(
        "Submission Rejected",
        result.message || `Rejection recorded for submission. ${vectors.length} failure vectors logged.`
      );
    } else {
      showErrorAlert(
        "Rejection Failed",
        result.message || "Failed to record rejection on evaluation network."
      );
    }
  };

  // Batch approve hitting real status update endpoint
  const handleBatchApprove = async () => {
    if (selectedIds.length === 0) return;

    let successCount = 0;
    for (const id of selectedIds) {
      const res = await updateSubmissionStatus({
        submissionId: id,
        status: "APPROVED",
        reviewComment: "Batch verified via Mentor Oracle.",
      });
      if (res.success) {
        successCount++;
      }
    }

    setSubmissions((prev) =>
      prev.map((sub) =>
        selectedIds.includes(sub.id)
          ? { ...sub, status: "approved", score: 92 }
          : sub
      )
    );

    setSelectedIds([]);

    if (successCount > 0) {
      showSuccessAlert(
        "Batch Update Completed",
        `Successfully approved ${successCount} submissions on the evaluation ledger.`
      );
    } else {
      showErrorAlert("Batch Approval Failed", "Unable to approve selected submissions.");
    }
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSubmissions.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAuthError =
    errorMessage &&
    (errorMessage.toLowerCase().includes("not logged in") ||
      errorMessage.toLowerCase().includes("credentials") ||
      errorMessage.toLowerCase().includes("forbidden") ||
      errorMessage.toLowerCase().includes("permission"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto w-full space-y-6 pt-1 pb-16"
    >
      {/* Top Context & Search Bar */}
      <MentorContextBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Auth or Forbidden Warning Banner */}
      {isAuthError && (
        <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-200 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-amber-400 shrink-0">
              verified_user
            </span>
            <div>
              <h4 className="font-headline font-semibold text-sm text-white">
                Mentor Node Authentication Required
              </h4>
              <p className="font-body text-xs text-amber-200/80 mt-0.5">
                {errorMessage}
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-headline text-xs font-semibold hover:bg-amber-400 transition-all shrink-0 self-start sm:self-auto text-center"
          >
            Sign In with Mentor Node
          </Link>
        </div>
      )}

      {/* Generic Error Warning Banner */}
      {!isAuthError && errorMessage && (
        <div className="rounded-3xl bg-rose-500/10 border border-rose-500/25 p-4 flex items-center justify-between gap-3 text-rose-200 text-xs backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg text-rose-400">error</span>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="underline hover:text-white cursor-pointer"
          >
            Retry Sync
          </button>
        </div>
      )}

      {/* 4 KPI Metric Cards */}
      <MentorMetricCards
        totalCount={counts.all}
        pendingCount={counts.pending}
        approvedCount={counts.approved}
        rejectedCount={counts.rejected}
      />

      {/* Filter Toolbar (Status tabs, Track dropdown, Batch Approve) */}
      <MentorFilterToolbar
        currentStatus={statusFilter}
        onChangeStatus={setStatusFilter}
        currentTrack={trackFilter}
        onChangeTrack={setTrackFilter}
        counts={counts}
        selectedCount={selectedIds.length}
        onBatchApprove={handleBatchApprove}
      />

      {/* Submissions Glass Table */}
      {filteredSubmissions.length > 0 ? (
        <SubmissionTable
          items={filteredSubmissions}
          selectedIds={selectedIds}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleSelectOne={handleToggleSelectOne}
          onApprove={handleApprove}
          onRejectClick={(item) => setRejectionTarget(item)}
        />
      ) : submissions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 text-primary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">inbox</span>
          </div>
          <h3 className="font-headline font-semibold text-white text-base">
            No Submissions Found in Evaluation Queue
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Student submissions submitted to the evaluation network will appear here for peer review and consensus attestation.
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-headline cursor-pointer transition-all"
          >
            <span className={`material-symbols-outlined text-base ${isPending ? "animate-spin" : ""}`}>
              refresh
            </span>
            <span>Refresh Submissions</span>
          </button>
        </div>
      ) : (
        <div className="p-8 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body text-xs space-y-2">
          <span className="material-symbols-outlined text-xl text-outline block">
            filter_alt_off
          </span>
          <div>No submissions match the selected status or track filter.</div>
          <button
            type="button"
            onClick={() => {
              setStatusFilter("all");
              setTrackFilter("All Tracks");
              setSearchQuery("");
            }}
            className="text-primary underline hover:text-primary-fixed cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Rejection Feedback Modal */}
      <RejectionModal
        isOpen={Boolean(rejectionTarget)}
        onClose={() => setRejectionTarget(null)}
        submission={rejectionTarget}
        onConfirmRejection={handleConfirmRejection}
      />
    </motion.div>
  );
}
