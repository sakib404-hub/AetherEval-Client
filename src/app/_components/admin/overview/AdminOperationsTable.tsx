"use client";

import Link from "next/link";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { StatusBadge } from "@/app/_components/ui/StatusBadge";
import { RawBackendMentor } from "@/types/admin";

interface AdminOperationsTableProps {
  recentMentors: RawBackendMentor[];
}

export function AdminOperationsTable({
  recentMentors,
}: AdminOperationsTableProps) {
  return (
    <GlassCard level={2} className="p-6 sm:p-8 w-full border-white/10 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-primary">
            Ecosystem Registry
          </div>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
            Live Evaluator Applications & Operations Log
          </h3>
          <p className="font-body text-body-xs text-on-surface-variant mt-1">
            Real-time synchronization of university faculty candidates and platform verification status.
          </p>
        </div>

        <Link
          href="/admin-dashboard/mentors"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container/20 hover:bg-primary-container/30 border border-primary/40 text-primary hover:text-white text-xs font-headline font-semibold transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <span>Open Full Accreditation Table</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-headline font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="pb-3 px-3">Candidate / Evaluator</th>
              <th className="pb-3 px-3">Domain Expertise</th>
              <th className="pb-3 px-3">Submitted Timestamp</th>
              <th className="pb-3 px-3">Accreditation Status</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-body-xs">
            {recentMentors.length > 0 ? (
              recentMentors.slice(0, 6).map((mentor) => {
                const statusRaw = (mentor.status || "PENDING_APPROVAL").toUpperCase();
                const isPending = statusRaw === "PENDING_APPROVAL";
                const isActive = statusRaw === "ACTIVE" || statusRaw === "APPROVED";

                let expertiseDisplay = "General / Unassigned";
                if (Array.isArray(mentor.expertise)) {
                  expertiseDisplay = mentor.expertise.join(", ") || "General / Unassigned";
                } else if (typeof mentor.expertise === "string" && mentor.expertise.trim()) {
                  expertiseDisplay = mentor.expertise.trim();
                }

                return (
                  <tr
                    key={mentor.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-3.5 px-3">
                      <div className="font-headline font-semibold text-white group-hover:text-primary transition-colors">
                        {mentor.name}
                      </div>
                      <div className="font-mono text-[11px] text-on-surface-variant truncate max-w-[220px]">
                        {mentor.email}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-[11px] font-body text-white/90 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10 truncate inline-block max-w-[200px]" title={expertiseDisplay}>
                        {expertiseDisplay}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-[11px] text-on-surface-variant">
                      {mentor.createdAt
                        ? new Date(mentor.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td className="py-3.5 px-3">
                      <StatusBadge
                        variant={isPending ? "pending" : isActive ? "approved" : "rejected"}
                        label={isPending ? "Pending Audit" : isActive ? "Active Evaluator" : "Disqualified"}
                        pulse={isPending}
                      />
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href="/admin-dashboard/mentors"
                        className="text-[11px] font-headline font-semibold text-primary hover:text-white transition-colors"
                      >
                        {isPending ? "Review Credentials →" : "Manage Node →"}
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                  No mentor applications recorded in the ecosystem registry.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}