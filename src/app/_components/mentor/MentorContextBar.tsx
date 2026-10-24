"use client";

import { logout } from "@/app/_actions/auth/logout";
import { showSuccessAlert } from "@/lib/alert";

interface MentorContextBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function MentorContextBar({
  searchQuery,
  onSearchChange,
}: MentorContextBarProps) {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    showSuccessAlert("Logged Out", "Session terminated successfully.");
    await logout();
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl md:text-headline-md font-headline font-bold text-white tracking-tight">
            Evaluation Dashboard
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-headline uppercase tracking-wider bg-primary-container/20 text-primary border border-primary/40 shadow-[0_0_12px_rgba(124,58,237,0.25)] font-semibold">
            <span className="material-symbols-outlined text-[14px]">token</span>
            MENTOR NODE #0881
          </span>
        </div>
        <p className="text-body-md font-body text-on-surface-variant mt-1">
          Review pending submissions, verify cryptographic artifacts, and publish student feedback.
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Floating Pill Search */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search project, student hash, repo..."
            className="bg-white/[0.05] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 w-72 md:w-80 text-body-sm font-body text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner transition-all backdrop-blur-md"
          />
        </div>

        {/* Active Cycle Beacon Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-headline text-on-surface font-medium">
            Cycle 2025-Q2 Active Review Window
          </span>
        </div>

        {/* Logout Action */}
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            title="Disconnect Mentor Session"
            className="px-3.5 py-2 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 text-on-surface-variant hover:text-rose-300 border border-white/10 hover:border-rose-500/30 backdrop-blur-md flex items-center gap-1.5 text-xs font-headline font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-rose-400">
              logout
            </span>
            <span>Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
