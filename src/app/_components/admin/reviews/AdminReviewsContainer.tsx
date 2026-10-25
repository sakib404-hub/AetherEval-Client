"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { motion } from "framer-motion";
import { AdminReviewsContextBar } from "./AdminReviewsContextBar";
import { AdminReviewsMetricCards } from "./AdminReviewsMetricCards";
import {
  AdminReviewsFilterToolbar,
  AdminReviewFilterStatus,
  AdminTrackOption,
} from "./AdminReviewsFilterToolbar";
import { AdminReviewsTable } from "./AdminReviewsTable";
import { AdminSubmissionRejectionModal } from "./AdminSubmissionRejectionModal";
import { MentorSubmissionItem } from "@/app/_components/mentor/SubmissionTableRow";
import { RawBackendSubmission } from "@/types/submission";
import { mapRawToMentorSubmission } from "@/app/_components/mentor/mentor-submission-mapper";
import { getAllSubmissions } from "@/app/_actions/mentor/getAllSubmissions";
import { updateSubmissionStatus } from "@/app/_actions/mentor/updateSubmissionStatus";
import { showSuccessAlert, showErrorAlert } from "@/lib/alert";

interface AdminReviewsContainerProps {
  initialSubmissions?: RawBackendSubmission[];
  initialError?: string | null;
}

export function AdminReviewsContainer({
  initialSubmissions = [],
  initialError = null,
}: AdminReviewsContainerProps) {
  const [submissions, setSubmissions] = useState<MentorSubmissionItem[]>(() =>
    initialSubmissions.map(mapRawToMentorSubmission)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminReviewFilterStatus>("all");
  const [trackFilter, setTrackFilter] = useState<AdminTrackOption>("All Tracks");
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

  // Sync state if initialSubmissions prop changes
  useEffect(() => {
    if (initialSubmissions) {
      setSubmissions(initialSubmissions.map(mapRawToMentorSubmission));
    }
    if (initialError !== undefined) {
      setErrorMessage(initialError);
    }
  }, [initialSubmissions, initialError]);

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

  // Calculate live counts
  const counts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  // 1. Admin Quick Approve with strict business logic
  const handleApprove = async (id: string) => {
    const target = submissions.find((s) => s.id === id);

    // Business Logic: Rejected submissions cannot be approved
    if (target?.status === "rejected") {
      showErrorAlert(
        "Action Denied",
        "Rejected submissions cannot be approved."
      );
      return;
    }

    if (target?.status === "approved") {
      return;
    }

    const result = await updateSubmissionStatus({
      submissionId: id,
      status: "APPROVED",
      reviewComment: "Consensus certified via Admin Executive Authority.",
    });

    if (result.success) {
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, status: "approved", score: 95 } : sub
        )
      );
      showSuccessAlert(
        "Submission Approved",
        result.message || "Project approved with supervisory consensus attestation."
      );
    } else {
      showErrorAlert(
        "Approval Failed",
        result.message || "Failed to update submission status on network."
      );
    }
  };

  // 2. Admin Rejection with strict business logic
  const handleConfirmRejection = async (
    id: string,
    reason: string,
    vectors: string[]
  ) => {
    const target = submissions.find((s) => s.id === id);

    // Business Logic: Approved submissions cannot be rejected
    if (target?.status === "approved") {
      showErrorAlert(
        "Action Denied",
        "Approved submissions cannot be rejected."
      );
      return;
    }

    const combinedComment =
      vectors.length > 0
        ? `Observed failure vectors: ${vectors.join(", ")}. ${reason}`.trim()
        : reason;

    const result = await updateSubmissionStatus({
      submissionId: id,
      status: "REJECTED",
      rejectionReason: reason || "Administrative review criteria not satisfied.",
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
        result.message || `Rejection recorded. ${vectors.length} deficiency vectors logged.`
      );
    } else {
      showErrorAlert(
        "Rejection Failed",
        result.message || "Failed to record rejection on network."
      );
    }
  };

  // 3. Batch approve with filter for rejected/approved items
  const handleBatchApprove = async () => {
    if (selectedIds.length === 0) return;

    // Filter out rejected and already approved submissions
    const eligibleSubmissions = selectedIds
      .map((id) => submissions.find((s) => s.id === id))
      .filter(
        (s): s is MentorSubmissionItem =>
          Boolean(s && s.status !== "rejected" && s.status !== "approved")
      );

    if (eligibleSubmissions.length === 0) {
      showErrorAlert(
        "Action Denied",
        "Selected submissions are already approved or rejected. Rejected submissions cannot be approved."
      );
      return;
    }

    let successCount = 0;
    for (const sub of eligibleSubmissions) {
      const res = await updateSubmissionStatus({
        submissionId: sub.id,
        status: "APPROVED",
        reviewComment: "Batch verified via Admin Executive Oracle.",
      });
      if (res.success) {
        successCount++;
      }
    }

    const eligibleIds = eligibleSubmissions.map((s) => s.id);
    setSubmissions((prev) =>
      prev.map((sub) =>
        eligibleIds.includes(sub.id)
          ? { ...sub, status: "approved", score: 95 }
          : sub
      )
    );

    setSelectedIds([]);

    if (successCount > 0) {
      const skippedCount = selectedIds.length - eligibleSubmissions.length;
      showSuccessAlert(
        "Batch Update Completed",
        skippedCount > 0
          ? `Successfully approved ${successCount} submissions (${skippedCount} rejected/approved submissions skipped).`
          : `Successfully approved ${successCount} submissions on the evaluation ledger.`
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto w-full space-y-6 pt-1 pb-16"
    >
      {/* Top Header & Search Bar */}
      <AdminReviewsContextBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
            className="underline hover:text-white cursor-pointer"
          >
            Retry Sync
          </button>
        </div>
      )}

      {/* 4 KPI Metric Cards */}
      <AdminReviewsMetricCards
        totalCount={counts.all}
        pendingCount={counts.pending}
        approvedCount={counts.approved}
        rejectedCount={counts.rejected}
      />

      {/* Filter Toolbar (Status tabs, Track dropdown, Batch Approve) */}
      <AdminReviewsFilterToolbar
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
        <AdminReviewsTable
          items={filteredSubmissions}
          selectedIds={selectedIds}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleSelectOne={handleToggleSelectOne}
          onApprove={handleApprove}
          onRejectClick={(item) => {
            if (item.status === "approved") {
              showErrorAlert(
                "Action Denied",
                "Approved submissions cannot be rejected."
              );
              return;
            }
            setRejectionTarget(item);
          }}
        />
      ) : submissions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 text-cyan-400 mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">inbox</span>
          </div>
          <h3 className="font-headline font-semibold text-white text-base">
            No Student Submissions In Evaluation Ledger
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Student project repositories submitted for peer evaluation will appear here for administrative supervision and consensus attestation.
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-headline cursor-pointer transition-all"
          >
            <span
              className={`material-symbols-outlined text-base ${
                isPending ? "animate-spin" : ""
              }`}
            >
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
            className="text-cyan-400 underline hover:text-white cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Rejection Feedback Modal */}
      <AdminSubmissionRejectionModal
        isOpen={Boolean(rejectionTarget)}
        onClose={() => setRejectionTarget(null)}
        submission={rejectionTarget}
        onConfirmRejection={handleConfirmRejection}
      />
    </motion.div>
  );
}
