"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const INITIAL_MENTOR_SUBMISSIONS: MentorSubmissionItem[] = [
  {
    id: "sub-101",
    title: "AetherGrid: Quantum-Resistant DHT Protocol",
    track: "Distributed Systems",
    studentName: "Elena Vance",
    studentNode: "MIT Node #4429",
    repoUrl: "https://github.com/aether-nodes/aethergrid-quantum-dht",
    repoBranch: "main:8f3a9d",
    demoUrl: "https://aethergrid.dev",
    deploymentStatus: "Live",
    submittedTime: "24 mins ago",
    status: "pending",
    merkleHash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
  },
  {
    id: "sub-102",
    title: "zk-Rollup Identity Protocol for Credentials",
    track: "Post-Quantum Cryptography",
    studentName: "Marcus Chen",
    studentNode: "Stanford Node #1024",
    repoUrl: "https://github.com/aether-nodes/zk-academic-identity",
    repoBranch: "v2.0-prod",
    demoUrl: "https://zk-id.stanford.edu",
    deploymentStatus: "Live",
    submittedTime: "1 hour ago",
    status: "approved",
    score: 96,
    merkleHash: "0x4a1b89ef5532d184a3c10928beef30198aa723554109bdac832948192a34892c",
  },
  {
    id: "sub-103",
    title: "NeuralMesh: Decentralized LLM Parameter Sharding",
    track: "AI/ML Governance",
    studentName: "Priya Patel",
    studentNode: "Oxford Node #8812",
    repoUrl: "https://github.com/aether-nodes/neuralmesh-sharding",
    repoBranch: "dev:c44b91",
    demoUrl: "https://neuralmesh.ox.ac.uk",
    deploymentStatus: "Staging",
    submittedTime: "3 hours ago",
    status: "pending",
    merkleHash: "0x9e2c451a88bb33ef9200aa563bca2801908234ea7781bcf09941a823b49911e0",
  },
  {
    id: "sub-104",
    title: "LatticeVault: Homomorphic Encrypted Storage",
    track: "Post-Quantum Cryptography",
    studentName: "David Kim",
    studentNode: "Caltech Node #3391",
    repoUrl: "https://github.com/aether-nodes/lattice-vault",
    repoBranch: "main:11ba90",
    deploymentStatus: "Offline",
    submittedTime: "5 hours ago",
    status: "rejected",
    merkleHash: "0x3c71a9f022bd189a55c2810938472910fa8329402948271039840293849182aa",
  },
  {
    id: "sub-105",
    title: "Byzantine Fault Tolerant Oracle Engine",
    track: "Distributed Systems",
    studentName: "Liam O'Connor",
    studentNode: "ETH Zurich Node #5120",
    repoUrl: "https://github.com/aether-nodes/bft-oracle",
    repoBranch: "main:08ec22",
    demoUrl: "https://oracle.ethz.ch",
    deploymentStatus: "Live",
    submittedTime: "8 hours ago",
    status: "approved",
    score: 91,
    merkleHash: "0x88f1dc3400a129ef993881023948572019482019482938402948293840293841",
  },
  {
    id: "sub-106",
    title: "HyperSpectral Vision Transformer",
    track: "AI/ML Governance",
    studentName: "Sofia Rossi",
    studentNode: "Cambridge Node #7741",
    repoUrl: "https://github.com/aether-nodes/sat-vit",
    repoBranch: "release:2.1",
    demoUrl: "https://satvit.cam.ac.uk",
    deploymentStatus: "Live",
    submittedTime: "12 hours ago",
    status: "pending",
    merkleHash: "0x55d08e1a66ff0192837492817293840192840192840192830192840192840192",
  },
];

export function MentorDashboardContainer() {
  const [submissions, setSubmissions] = useState<MentorSubmissionItem[]>(
    INITIAL_MENTOR_SUBMISSIONS
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<MentorFilterStatus>("all");
  const [trackFilter, setTrackFilter] = useState<TrackOption>("All Tracks");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rejectionTarget, setRejectionTarget] =
    useState<MentorSubmissionItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filter logic
  const filteredSubmissions = submissions.filter((item) => {
    // Search query matches title, student, node, or hash
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.studentName.toLowerCase().includes(query) ||
      item.studentNode.toLowerCase().includes(query) ||
      item.merkleHash.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // Track filter
    if (trackFilter !== "All Tracks" && item.track !== trackFilter) {
      return false;
    }

    // Status filter
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

  // Quick Approve Handler
  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "approved", score: 94 } : sub
      )
    );
    showNotification("Project approved and signed with Mentor Node #0881 consensus.");
  };

  // Rejection confirmation handler
  const handleConfirmRejection = (id: string, reason: string, vectors: string[]) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: "rejected" } : sub
      )
    );
    showNotification(`Rejection feedback recorded for submission. ${vectors.length} failure vectors logged.`);
  };

  // Batch approve
  const handleBatchApprove = () => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        selectedIds.includes(sub.id)
          ? { ...sub, status: "approved", score: 92 }
          : sub
      )
    );
    const count = selectedIds.length;
    setSelectedIds([]);
    showNotification(`Batch approved ${count} submissions successfully.`);
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
      {/* Dynamic Toast Feedback Pill */}
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

      {/* Top Context & Search Bar */}
      <MentorContextBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
      <SubmissionTable
        items={filteredSubmissions}
        selectedIds={selectedIds}
        onToggleSelectAll={handleToggleSelectAll}
        onToggleSelectOne={handleToggleSelectOne}
        onApprove={handleApprove}
        onRejectClick={(item) => setRejectionTarget(item)}
      />

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
