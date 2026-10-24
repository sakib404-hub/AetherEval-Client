"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HistoryHeader } from "./HistoryHeader";
import { HistoryStatCards } from "./HistoryStatCards";
import { HistoryFilterTabs, FilterStatus } from "./HistoryFilterTabs";
import { SubmissionCard, SubmissionItem } from "./SubmissionCard";
import { LedgerReceiptModal } from "./LedgerReceiptModal";
import { RawBackendSubmission } from "@/types/submission";
import { mapRawSubmissionToItem } from "./submission-mapper";
import { getMySubmissions } from "@/app/_actions/submissions/getMySubmissions";

interface HistoryPageContainerProps {
  initialSubmissions?: RawBackendSubmission[];
  initialError?: string | null;
}

export function HistoryPageContainer({
  initialSubmissions = [],
  initialError = null,
}: HistoryPageContainerProps) {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(() =>
    initialSubmissions.map(mapRawSubmissionToItem)
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [selectedReceipt, setSelectedReceipt] = useState<SubmissionItem | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRefresh = useCallback(() => {
    startTransition(async () => {
      const result = await getMySubmissions();
      if (result.success) {
        setSubmissions(result.data.map(mapRawSubmissionToItem));
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message);
      }
    });
  }, []);

  // Sync state whenever initialSubmissions prop changes
  useEffect(() => {
    if (initialSubmissions) {
      setSubmissions(initialSubmissions.map(mapRawSubmissionToItem));
    }
    if (initialError !== undefined) {
      setErrorMessage(initialError);
    }
  }, [initialSubmissions, initialError]);

  // Seamless auto-sync on mount and when returning to this tab/window (eliminates hard reload requirement)
  useEffect(() => {
    let isMounted = true;
    async function fetchLatest() {
      const result = await getMySubmissions();
      if (isMounted && result.success) {
        setSubmissions(result.data.map(mapRawSubmissionToItem));
        setErrorMessage(null);
      }
    }
    fetchLatest();

    const handleFocus = () => {
      fetchLatest();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      isMounted = false;
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Filter items based on active status tab and search query
  const filteredSubmissions = submissions.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query)) ||
      item.track.toLowerCase().includes(query);

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

  const isAuthError =
    errorMessage &&
    (errorMessage.toLowerCase().includes("not logged in") ||
      errorMessage.toLowerCase().includes("authenticate") ||
      errorMessage.toLowerCase().includes("credentials"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto w-full space-y-7 pt-1"
    >
      {/* Top Bar Header */}
      <HistoryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isRefreshing={isPending}
      />

      {/* Authentication Notice if not logged in */}
      {isAuthError && (
        <div className="rounded-3xl bg-amber-500/10 border border-amber-500/25 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-200 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-amber-400 shrink-0">
              lock
            </span>
            <div>
              <h4 className="font-headline font-semibold text-sm text-white">
                Academic Authentication Required
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
            Authenticate Node
          </Link>
        </div>
      )}

      {/* Generic Error Notice */}
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

      {/* KPI Stat Chips with Real Counts */}
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
        <AnimatePresence mode="popLayout">
          {filteredSubmissions.length > 0 ? (
            filteredSubmissions.map((sub) => (
              <SubmissionCard
                key={sub.id}
                item={sub}
                onViewReceipt={(item) => setSelectedReceipt(item)}
              />
            ))
          ) : submissions.length === 0 ? (
            /* Empty State when zero submissions exist on this account */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body space-y-4"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/[0.05] border border-white/10 text-primary mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.2)]">
                <span className="material-symbols-outlined text-3xl">folder_open</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline text-headline-sm font-semibold text-white">
                  No Project Submissions Found
                </h3>
                <p className="text-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  You have not submitted any projects for evaluation yet. Submit your repository and live deployment to initiate the peer review process.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/student-dashboard/submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-white font-headline text-xs font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>Submit Your First Project</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Empty state when filter or search query returns 0 matches */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-on-surface-variant font-body text-body-sm space-y-2"
            >
              <span className="material-symbols-outlined text-2xl text-outline block">
                search_off
              </span>
              <div>No submissions matched your filter criteria.</div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="text-xs text-primary underline hover:text-primary-fixed cursor-pointer pt-1 inline-block"
              >
                Reset search & filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
