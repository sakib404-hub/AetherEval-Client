"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminContextBar } from "./AdminContextBar";
import { AdminMetricCards } from "./AdminMetricCards";
import {
  AdminFilterToolbar,
  AdminFilterStatus,
  DisciplineOption,
  DomainOption,
} from "./AdminFilterToolbar";
import { ApplicantTable } from "./ApplicantTable";
import { ApplicantTableRow, MentorApplicant } from "./ApplicantTableRow";
import { AutonomousOraclePreview } from "./AutonomousOraclePreview";
import { ApplicantRejectModal } from "./ApplicantRejectModal";

const INITIAL_APPLICANTS: MentorApplicant[] = [
  {
    id: "app-201",
    name: "Dr. Aris Thorne",
    verifiedIdentity: true,
    email: "aris.thorne@stanford.edu",
    institution: "Stanford University",
    department: "Stanford AI Lab • Robotics & Systems",
    avatarInitials: "AT",
    avatarGradient: "from-purple-500/20 to-blue-500/20",
    expertise: ["Distributed Consensus", "Rust", "Zero-Knowledge"],
    githubUrl: "github.com/aris-thorne",
    webUrl: "stanford.edu/~thorne",
    appliedDate: "May 28, 2025",
    appliedTimeUtc: "10:14 UTC",
    status: "pending",
    dnsValid: true,
    gpgVerified: true,
    reputationScore: 98,
    bioSummary:
      "Stanford Academic identity verified via institutional GPG keys and DKIM record matching. Automated cryptographic reputation score calculated across 48 peer-reviewed publications and 3 decentralized testnets.",
  },
  {
    id: "app-202",
    name: "Prof. Maya Lin",
    verifiedIdentity: true,
    email: "mlin@mit.edu",
    institution: "Massachusetts Institute of Technology",
    department: "MIT CSAIL • Cryptography & Information Security",
    avatarInitials: "ML",
    avatarGradient: "from-indigo-500/20 to-purple-500/20",
    expertise: ["Post-Quantum Cryptography", "Lattice Crypto", "C++"],
    githubUrl: "github.com/mayalin-mit",
    appliedDate: "May 28, 2025",
    appliedTimeUtc: "08:30 UTC",
    status: "pending",
    dnsValid: true,
    gpgVerified: true,
    reputationScore: 96,
    bioSummary:
      "MIT Faculty Identity attested through CSAIL institutional root keys. Authored fundamental papers on lattice-based polynomial ring signatures with 1,200+ academic citations.",
  },
  {
    id: "app-203",
    name: "Kevin Zhang",
    verifiedIdentity: true,
    email: "kzhang@berkeley.edu",
    institution: "University of California, Berkeley",
    department: "UC Berkeley • Blockchain X-Lab Lead",
    avatarInitials: "KZ",
    avatarGradient: "from-cyan-500/20 to-purple-500/20",
    expertise: ["EVM Internals", "Solidity", "ZK-Rollups"],
    webUrl: "kzhang.eth.limo",
    appliedDate: "May 27, 2025",
    appliedTimeUtc: "22:45 UTC",
    status: "pending",
    dnsValid: true,
    gpgVerified: true,
    reputationScore: 94,
    bioSummary:
      "Lead researcher at UC Berkeley Blockchain X-Lab. Contributor to Ethereum consensus client specs and zero-knowledge rollup circuit optimizations across EVM test networks.",
  },
  {
    id: "app-204",
    name: "Dr. Soraya Patel",
    verifiedIdentity: true,
    email: "s.patel@ox.ac.uk",
    institution: "University of Oxford",
    department: "Oxford Quantum Institute • Faculty of Physics",
    avatarInitials: "SP",
    avatarGradient: "from-violet-500/20 to-pink-500/20",
    expertise: ["Quantum Computing", "Qiskit", "Formal Verification"],
    webUrl: "ox.ac.uk/dept/spatel",
    appliedDate: "May 27, 2025",
    appliedTimeUtc: "16:10 UTC",
    status: "pending",
    dnsValid: true,
    gpgVerified: true,
    reputationScore: 97,
    bioSummary:
      "Senior fellow at Oxford Quantum Institute. Specializes in formally verified quantum circuits and Qiskit quantum error mitigation protocols for academic compute grids.",
  },
  {
    id: "app-205",
    name: "Dr. Julian Mercer",
    verifiedIdentity: true,
    email: "mercer@ethz.ch",
    institution: "ETH Zürich",
    department: "ETH Zürich • Machine Learning & Autonomous Systems",
    avatarInitials: "JM",
    avatarGradient: "from-emerald-500/20 to-purple-500/20",
    expertise: ["Autonomous Systems", "PyTorch", "gRPC"],
    githubUrl: "github.com/julianmercer",
    appliedDate: "May 26, 2025",
    appliedTimeUtc: "11:20 UTC",
    status: "approved",
    dnsValid: true,
    gpgVerified: true,
    reputationScore: 92,
    bioSummary:
      "Active verified mentor from ETH Zürich. Supervises graduate distributed reinforcement learning research with 8 current student teams and published consensus evaluation blocks.",
  },
];

export function AdminDashboardContainer() {
  const [applicants, setApplicants] =
    useState<MentorApplicant[]>(INITIAL_APPLICANTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<AdminFilterStatus>("pending");
  const [disciplineFilter, setDisciplineFilter] =
    useState<DisciplineOption>("All Disciplines");
  const [domainFilter, setDomainFilter] =
    useState<DomainOption>("All Domains");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeInspection, setActiveInspection] = useState<MentorApplicant>(
    INITIAL_APPLICANTS[0]
  );
  const [rejectionTarget, setRejectionTarget] =
    useState<MentorApplicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filter logic
  const filteredApplicants = applicants.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
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

  // Calculate counts
  const counts = {
    pending: applicants.filter((a) => a.status === "pending").length + 10, // 14 total in mockup
    active: applicants.filter((a) => a.status === "approved").length + 67, // 68 total in mockup
    rejected: applicants.filter((a) => a.status === "rejected").length + 9, // 9 total in mockup
  };

  // Approve action
  const handleApprove = (id: string) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "approved" as const } : app
      )
    );
    const target = applicants.find((a) => a.id === id);
    showNotification(
      `Candidate ${target?.name || id} approved. Mentor Node credentials minted.`
    );
  };

  // Reject confirmation action
  const handleConfirmRejection = (
    id: string,
    notes: string,
    reasons: string[]
  ) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" as const } : app
      )
    );
    showNotification(
      `Candidate application disqualified. ${reasons.length} failure vectors recorded.`
    );
  };

  // Batch approve action
  const handleBatchApprove = () => {
    setApplicants((prev) =>
      prev.map((app) =>
        selectedIds.includes(app.id)
          ? { ...app, status: "approved" as const }
          : app
      )
    );
    const count = selectedIds.length;
    setSelectedIds([]);
    showNotification(`Batch approved ${count} mentor applications.`);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto w-full space-y-6 pt-1 pb-16"
    >
      {/* Toast Feedback Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 text-white border border-primary/40 shadow-[0_8px_32px_rgba(124,58,237,0.35)] backdrop-blur-xl"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">
              task_alt
            </span>
            <span className="text-xs font-headline font-medium">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Search Bar */}
      <AdminContextBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 4 KPI Metric Cards */}
      <AdminMetricCards
        pendingCount={counts.pending}
        activeCount={counts.active}
        rejectedCount={counts.rejected}
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
      <ApplicantTable
        applicants={filteredApplicants}
        selectedIds={selectedIds}
        activeInspectionId={activeInspection.id}
        onToggleSelectAll={handleToggleSelectAll}
        onToggleSelectOne={handleToggleSelectOne}
        onSelectInspection={setActiveInspection}
        onApprove={handleApprove}
        onReject={(app) => setRejectionTarget(app)}
      />

      {/* Autonomous Oracle Candidate Inspection Preview */}
      <AutonomousOraclePreview applicant={activeInspection} />

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
