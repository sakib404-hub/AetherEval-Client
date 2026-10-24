"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HistoryHeader } from "./HistoryHeader";
import { HistoryStatCards } from "./HistoryStatCards";
import { HistoryFilterTabs, FilterStatus } from "./HistoryFilterTabs";
import { SubmissionCard, SubmissionItem } from "./SubmissionCard";
import { LedgerReceiptModal } from "./LedgerReceiptModal";

const INITIAL_SUBMISSIONS: SubmissionItem[] = [
  {
    id: "sub-1",
    title: "AetherGrid: Quantum-Resistant DHT Protocol",
    version: "v1.4-rc2",
    date: "May 28, 2025",
    cycle: "2025-Q2",
    track: "Distributed Systems",
    status: "pending",
    description:
      "A zero-knowledge distributed hash table providing post-quantum Byzantine fault tolerance across unstructured academic peer overlays. Leverages state-pruning micro-rollups and lattice polynomial cryptography.",
    tags: ["Rust", "WebAssembly", "Next.js", "Solidity"],
    githubUrl: "https://github.com/aether-nodes/aethergrid-quantum-dht",
    demoUrl: "https://demo.vercel.app/aethergrid",
    healthStatus: "200 OK — Operational",
  },
  {
    id: "sub-2",
    title: "zk-Rollup Identity Protocol for Academic Credentials",
    version: "v2.0",
    date: "April 14, 2025",
    cycle: "2025-Q1",
    track: "Cryptographic Security",
    status: "approved",
    score: 96,
    description:
      "Anonymous selective disclosure of accredited university degrees via Groth16 zk-SNARK proofs on EVM testnets. Full verification consensus reached across 3 independent mentor nodes.",
    tags: ["Circom", "SnarkJS", "TypeScript", "Foundry"],
    githubUrl: "https://github.com/aether-nodes/zk-academic-identity",
    demoUrl: "https://demo.vercel.app/zk-identity",
  },
  {
    id: "sub-3",
    title: "NeuralMesh: Decentralized LLM Parameter Sharding",
    version: "v0.8-alpha",
    date: "March 02, 2025",
    cycle: "2025-Q1",
    track: "AI/ML Infrastructure",
    status: "rejected",
    description:
      "Distributed tensor parallelism across heterogeneous academic compute nodes using quantized matrix decompositions.",
    tags: ["PyTorch", "CUDA", "C++20", "gRPC"],
    githubUrl: "https://github.com/aether-nodes/neuralmesh-sharding",
    demoUrl: "",
    mentorFeedback:
      "Test harness pass rate did not achieve the required 85% threshold (currently 72.4%). Memory leak identified in the CUDA kernel reduction pass. Resubmit after patch.",
  },
];

export function HistoryPageContainer() {
  const [submissions] = useState<SubmissionItem[]>(INITIAL_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [selectedReceipt, setSelectedReceipt] = useState<SubmissionItem | null>(null);

  // Filter items
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.track.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === "all") return true;
    return item.status === filter;
  });

  const counts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto w-full space-y-7 pt-1"
    >
      {/* Top Bar Header */}
      <HistoryHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* KPI Stat Chips */}
      <HistoryStatCards
        totalCount={counts.all}
        pendingCount={counts.pending}
        approvedCount={counts.approved}
      />

      {/* Filter Tabs */}
      <HistoryFilterTabs
        currentFilter={filter}
        onChangeFilter={setFilter}
        counts={counts}
      />

      {/* Submissions Card List */}
      <section aria-label="Submission Registry Cards" className="space-y-5">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((sub) => (
            <SubmissionCard
              key={sub.id}
              item={sub}
              onViewReceipt={(item) => setSelectedReceipt(item)}
            />
          ))
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body text-body-sm">
            No submissions matched your filter criteria.
          </div>
        )}
      </section>

      {/* Verification Ledger Receipt Dialog */}
      <LedgerReceiptModal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        projectTitle={selectedReceipt?.title || ""}
        score={selectedReceipt?.score || 96}
      />
    </motion.div>
  );
}
