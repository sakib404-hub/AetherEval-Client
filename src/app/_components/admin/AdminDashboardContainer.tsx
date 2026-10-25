"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AdminContextBar } from "./AdminContextBar";
import { AdminMetricCards } from "./AdminMetricCards";
import {
  AdminFilterToolbar,
  AdminFilterStatus,
  DisciplineOption,
  DomainOption,
} from "./AdminFilterToolbar";
import { ApplicantTable } from "./ApplicantTable";
import { MentorApplicant } from "./ApplicantTableRow";
import { AutonomousOraclePreview } from "./AutonomousOraclePreview";
import { ApplicantRejectModal } from "./ApplicantRejectModal";
import { RawBackendMentor, AdminStatsData } from "@/types/admin";
import { mapRawMentorToApplicant } from "./admin-mentor-mapper";
import { getAllMentors } from "@/app/_actions/admin/getAllMentors";
import { getAdminStats } from "@/app/_actions/admin/getAdminStats";
import { updateMentorStatus } from "@/app/_actions/admin/updateMentorStatus";
import { showSuccessAlert, showErrorAlert } from "@/lib/alert";

interface AdminDashboardContainerProps {
  initialMentors?: RawBackendMentor[];
  initialStats?: AdminStatsData | null;
  initialError?: string | null;
}

export function AdminDashboardContainer({
  initialMentors = [],
  initialStats = null,
  initialError = null,
}: AdminDashboardContainerProps) {
  const [applicants, setApplicants] = useState<MentorApplicant[]>(() =>
    initialMentors.map((m, idx) => mapRawMentorToApplicant(m, idx))
  );
  const [stats, setStats] = useState<AdminStatsData | null>(initialStats);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminFilterStatus>("pending");
  const [disciplineFilter, setDisciplineFilter] =
    useState<DisciplineOption>("All Disciplines");
  const [domainFilter, setDomainFilter] = useState<DomainOption>("All Domains");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeInspection, setActiveInspection] = useState<MentorApplicant | null>(() =>
    applicants.length > 0 ? applicants[0] : null
  );
  const [rejectionTarget, setRejectionTarget] =
    useState<MentorApplicant | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRefresh = useCallback(() => {
    startTransition(async () => {
      const [mentorsRes, statsRes] = await Promise.all([
        getAllMentors(),
        getAdminStats(),
      ]);

      if (mentorsRes.success) {
        const mapped = mentorsRes.data.map((m, idx) => mapRawMentorToApplicant(m, idx));
        setApplicants(mapped);
        if (mapped.length > 0 && !activeInspection) {
          setActiveInspection(mapped[0]);
        }
        setErrorMessage(null);
      } else {
        setErrorMessage(mentorsRes.message);
      }

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }
    });
  }, [activeInspection]);

  // Sync state whenever props update
  useEffect(() => {
    if (initialMentors) {
      const mapped = initialMentors.map((m, idx) => mapRawMentorToApplicant(m, idx));
      setApplicants(mapped);
      if (mapped.length > 0) {
        setActiveInspection((prev) => prev || mapped[0]);
      }
    }
    if (initialStats) {
      setStats(initialStats);
    }
    if (initialError !== undefined) {
      setErrorMessage(initialError);
    }
  }, [initialMentors, initialStats, initialError]);

  // Seamless auto-sync on mount and window focus (no hard reload required)
  useEffect(() => {
    let isMounted = true;
    async function syncLatest() {
      const [mentorsRes, statsRes] = await Promise.all([
        getAllMentors(),
        getAdminStats(),
      ]);
      if (isMounted) {
        if (mentorsRes.success) {
          const mapped = mentorsRes.data.map((m, idx) => mapRawMentorToApplicant(m, idx));
          setApplicants(mapped);
          setErrorMessage(null);
        }
        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }
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
  const filteredApplicants = applicants.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.institution.toLowerCase().includes(query) ||
      item.department.toLowerCase().includes(query) ||
      item.expertise.some((e) => e.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    // Status filter
    if (statusFilter === "pending" && item.status !== "pending") return false;
    if (statusFilter === "active" && item.status !== "approved") return false;
    if (statusFilter === "rejected" && item.status !== "rejected") return false;

    // Discipline filter
    if (
      disciplineFilter !== "All Disciplines" &&
      !item.expertise.includes(disciplineFilter)
    ) {
      return false;
    }

    // Domain filter
    if (
      domainFilter !== "All Domains" &&
      !item.email.toLowerCase().endsWith(domainFilter.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Calculate real counts combining stats endpoint and active applicants
  const counts = {
    pending:
      stats?.users?.mentors?.pendingApproval ??
      stats?.pendingMentors ??
      applicants.filter((a) => a.status === "pending").length,
    active:
      stats?.users?.mentors?.active ??
      stats?.activeMentors ??
      applicants.filter((a) => a.status === "approved").length,
    rejected:
      stats?.users?.mentors?.rejected ??
      stats?.rejectedMentors ??
      applicants.filter((a) => a.status === "rejected").length,
  };

  const totalEvaluated = counts.active + counts.rejected;
  const computedApprovalRate =
    totalEvaluated > 0
      ? `${Math.round((counts.active / totalEvaluated) * 100)}%`
      : "100%";
  const approvalRate = stats?.approvalRate ? String(stats.approvalRate) : computedApprovalRate;

  // Approve action hitting real update-mentor-status route
  const handleApprove = async (id: string) => {
    const target = applicants.find((a) => a.id === id);
    const result = await updateMentorStatus({
      mentorId: id,
      status: "ACTIVE",
    });

    if (result.success) {
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "approved" as const, verifiedIdentity: true } : app
        )
      );
      showSuccessAlert(
        "Candidate Approved",
        result.message || `Candidate ${target?.name || id} approved. Mentor Node credentials minted.`
      );
    } else {
      showErrorAlert(
        "Approval Failed",
        result.message || "Failed to update mentor status on evaluation network."
      );
    }
  };

  // Reject confirmation action hitting real update-mentor-status route
  const handleConfirmRejection = async (
    id: string,
    notes: string,
    reasons: string[]
  ) => {
    const combinedReason = reasons.length > 0 ? `${reasons.join(", ")}. ${notes}`.trim() : notes;
    const result = await updateMentorStatus({
      mentorId: id,
      status: "REJECTED",
      rejectionReason: combinedReason || "Application did not meet accreditation criteria.",
    });

    if (result.success) {
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "rejected" as const, verifiedIdentity: false } : app
        )
      );
      showSuccessAlert(
        "Application Disqualified",
        result.message || `Candidate application disqualified. ${reasons.length} failure vectors recorded.`
      );
    } else {
      showErrorAlert(
        "Rejection Failed",
        result.message || "Failed to update mentor rejection on evaluation network."
      );
    }
  };

  // Batch approve action hitting real update-mentor-status route
  const handleBatchApprove = async () => {
    if (selectedIds.length === 0) return;

    let successCount = 0;
    for (const id of selectedIds) {
      const res = await updateMentorStatus({
        mentorId: id,
        status: "ACTIVE",
      });
      if (res.success) {
        successCount++;
      }
    }

    setApplicants((prev) =>
      prev.map((app) =>
        selectedIds.includes(app.id)
          ? { ...app, status: "approved" as const, verifiedIdentity: true }
          : app
      )
    );

    setSelectedIds([]);

    if (successCount > 0) {
      showSuccessAlert(
        "Batch Update Completed",
        `Successfully approved ${successCount} mentor applications on the evaluation network.`
      );
    } else {
      showErrorAlert("Batch Approval Failed", "Unable to approve selected candidates.");
    }
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredApplicants.map((a) => a.id));
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
      {/* Top Header & Search Bar */}
      <AdminContextBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Auth or Forbidden Warning Banner */}
      {isAuthError && (
        <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-200 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-amber-400 shrink-0">
              admin_panel_settings
            </span>
            <div>
              <h4 className="font-headline font-semibold text-sm text-white">
                Admin Authentication Required
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
            Authenticate Admin Node
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
            Retry Connection
          </button>
        </div>
      )}

      {/* 4 KPI Metric Cards */}
      <AdminMetricCards
        pendingCount={counts.pending}
        activeCount={counts.active}
        rejectedCount={counts.rejected}
        approvalRate={approvalRate}
      />

      {/* Filter Toolbar (Segmented Tabs, Discipline, Domain, Batch Actions) */}
      <AdminFilterToolbar
        currentStatus={statusFilter}
        onChangeStatus={setStatusFilter}
        currentDiscipline={disciplineFilter}
        onChangeDiscipline={setDisciplineFilter}
        currentDomain={domainFilter}
        onChangeDomain={setDomainFilter}
        counts={counts}
        selectedCount={selectedIds.length}
        onBatchApprove={handleBatchApprove}
      />

      {/* Applicants Glass Table */}
      {filteredApplicants.length > 0 ? (
        <ApplicantTable
          applicants={filteredApplicants}
          selectedIds={selectedIds}
          activeInspectionId={activeInspection?.id || ""}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleSelectOne={handleToggleSelectOne}
          onSelectInspection={setActiveInspection}
          onApprove={handleApprove}
          onReject={(app) => setRejectionTarget(app)}
        />
      ) : applicants.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 text-primary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">group_off</span>
          </div>
          <h3 className="font-headline font-semibold text-white text-base">
            No Mentor Applications in Queue
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Candidates who apply for mentor node accreditation will appear here for verification and GPG key attestation.
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
            <span>Refresh Queue</span>
          </button>
        </div>
      ) : (
        <div className="p-8 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body text-xs space-y-2">
          <span className="material-symbols-outlined text-xl text-outline block">
            filter_alt_off
          </span>
          <div>No mentor applications match the selected status, discipline, or domain filters.</div>
          <button
            type="button"
            onClick={() => {
              setStatusFilter("pending");
              setDisciplineFilter("All Disciplines");
              setDomainFilter("All Domains");
              setSearchQuery("");
            }}
            className="text-primary underline hover:text-primary-fixed cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Autonomous Oracle Candidate Inspection Preview */}
      {activeInspection && <AutonomousOraclePreview applicant={activeInspection} />}

      {/* Applicant Rejection Modal */}
      <ApplicantRejectModal
        isOpen={Boolean(rejectionTarget)}
        onClose={() => setRejectionTarget(null)}
        applicant={rejectionTarget}
        onConfirm={handleConfirmRejection}
      />
    </motion.div>
  );
}
