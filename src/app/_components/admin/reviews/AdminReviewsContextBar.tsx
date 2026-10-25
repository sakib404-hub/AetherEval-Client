"use client";

import Link from "next/link";
import { logout } from "@/app/_actions/auth/logout";
import { showSuccessAlert } from "@/lib/alert";

interface AdminReviewsContextBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function AdminReviewsContextBar({
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing,
}: AdminReviewsContextBarProps) {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    showSuccessAlert("Logged Out", "Session terminated successfully.");
    await logout();
  };

  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
      <div>
        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
          <Link
            href="/admin-dashboard"
            className="inline-flex items-center gap-1 text-xs font-headline font-semibold text-primary hover:text-white transition-colors bg-primary-container/15 border border-primary/30 px-2.5 py-0.5 rounded-full"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Overview
          </Link>
          <Link
            href="/admin-dashboard/mentors"
            className="inline-flex items-center gap-1 text-xs font-headline font-semibold text-on-surface-variant hover:text-white transition-colors bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-full"
          >
            <span className="material-symbols-outlined text-[14px]">how_to_reg</span>
            Mentors
          </Link>
          <span className="px-3 py-0.5 rounded-full text-[10px] font-headline uppercase font-bold tracking-wider bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Reviews Queue
          </span>
          <span className="text-on-surface-variant text-xs font-headline">
            • Admin Consensus Authority
          </span>
        </div>
        <h1 className="text-2xl md:text-headline-lg font-headline font-bold text-white tracking-tight">
          Submission Evaluation Ledger
        </h1>
        <p className="text-body-md font-body text-on-surface-variant mt-1 max-w-3xl">
          Supervisory review, audit, and consensus certification for student project submissions across all university tracks.
        </p>
      </div>

      {/* Right Quick Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Quick Search Pill Input */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by project, author, or hash..."
            className="w-full bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-body text-white placeholder-on-surface-variant/60 backdrop-blur-md transition-all shadow-inner outline-none"
          />
        </div>

        {/* Re-sync Button */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Re-sync submissions from network"
            className="p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-on-surface-variant hover:text-white transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isRefreshing ? "animate-spin text-primary" : ""
              }`}
            >
              sync
            </span>
          </button>
        )}

        {/* Network Node Status */}
        <div className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-2 whitespace-nowrap shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38BDF8]" />
          <span className="text-xs font-headline text-on-surface">
            Admin Oracle •{" "}
            <span className="text-cyan-300 font-mono font-semibold">
              Node #AD-01
            </span>
          </span>
        </div>

        {/* Logout Action */}
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            title="Disconnect Admin Session"
            className="px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 text-on-surface-variant hover:text-rose-300 border border-white/10 hover:border-rose-500/30 backdrop-blur-md flex items-center gap-1.5 text-xs font-headline font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-rose-400">
              logout
            </span>
            <span>Logout</span>
          </button>
        </form>
      </div>
    </header>
  );
}
