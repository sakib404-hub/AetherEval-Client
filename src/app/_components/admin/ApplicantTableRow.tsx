"use client";

import { StatusBadge } from "@/app/_components/ui/StatusBadge";
import { showInfoAlert } from "@/lib/alert";

export interface MentorApplicant {
  id: string;
  name: string;
  verifiedIdentity: boolean;
  email: string;
  institution: string;
  department: string;
  avatarUrl?: string;
  avatarInitials: string;
  avatarGradient: string;
  expertise: string[];
  githubUrl?: string;
  webUrl?: string;
  appliedDate: string;
  appliedTimeUtc: string;
  status: "pending" | "approved" | "rejected";
  dnsValid: boolean;
  gpgVerified: boolean;
  reputationScore: number;
  bioSummary: string;
}

interface ApplicantTableRowProps {
  applicant: MentorApplicant;
  isSelected: boolean;
  isActiveInspection: boolean;
  onToggleSelect: (id: string) => void;
  onSelectInspection: (applicant: MentorApplicant) => void;
  onApprove: (id: string) => void;
  onReject: (applicant: MentorApplicant) => void;
}

export function ApplicantTableRow({
  applicant,
  isSelected,
  isActiveInspection,
  onToggleSelect,
  onSelectInspection,
  onApprove,
  onReject,
}: ApplicantTableRowProps) {
  const isPending = applicant.status === "pending";
  const isApproved = applicant.status === "approved";

  return (
    <tr
      onClick={() => onSelectInspection(applicant)}
      className={`border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors cursor-pointer group ${
        isActiveInspection
          ? "bg-primary/[0.06] ring-1 ring-inset ring-primary/30"
          : isSelected
          ? "bg-white/[0.04]"
          : ""
      }`}
    >
      {/* Checkbox */}
      <td className="py-4 px-4 w-10" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          aria-label={`Select ${applicant.name}`}
          checked={isSelected}
          onChange={() => onToggleSelect(applicant.id)}
          className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer h-4 w-4"
        />
      </td>

      {/* Applicant & Email */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${applicant.avatarGradient} border border-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm text-xs font-headline font-bold text-white`}
          >
            {applicant.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={applicant.avatarUrl}
                alt={applicant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{applicant.avatarInitials}</span>
            )}
          </div>
          <div>
            <div className="font-headline text-sm font-semibold text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
              <span>{applicant.name}</span>
              {applicant.verifiedIdentity && (
                <span
                  className="material-symbols-outlined text-[16px] text-primary"
                  title="Verified Institutional Faculty Identity"
                >
                  verified
                </span>
              )}
            </div>
            <div className="text-on-surface-variant font-mono text-xs">
              {applicant.email}
            </div>
            <div className="text-[11px] text-on-surface-variant/80 mt-0.5 font-body">
              {applicant.department} • {applicant.institution}
            </div>
          </div>
        </div>
      </td>

      {/* Technical Expertise */}
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {applicant.expertise.map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded-full text-[10px] font-headline font-medium border ${
                i === 0
                  ? "bg-primary-container/20 text-primary border-primary/30"
                  : "bg-white/[0.04] text-on-surface border-white/10"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </td>

      {/* Portfolio & Repos */}
      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-1.5">
          {applicant.githubUrl && (
            <a
              href={`https://${applicant.githubUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-primary hover:text-white transition-colors bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10 w-fit"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span className="truncate max-w-[130px]">{applicant.githubUrl}</span>
              <span className="material-symbols-outlined text-[11px] text-on-surface-variant">
                north_east
              </span>
            </a>
          )}
          {applicant.webUrl && (
            <a
              href={`https://${applicant.webUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-on-surface-variant hover:text-white transition-colors bg-white/[0.02] px-2.5 py-1 rounded-lg border border-white/5 w-fit"
            >
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span className="truncate max-w-[130px]">{applicant.webUrl}</span>
              <span className="material-symbols-outlined text-[11px] text-on-surface-variant">
                north_east
              </span>
            </a>
          )}
        </div>
      </td>

      {/* Applied Date */}
      <td className="py-4 px-4 text-on-surface-variant font-mono text-xs whitespace-nowrap">
        {applicant.appliedDate}
        <br />
        <span className="text-[11px] text-on-surface-variant/70">
          {applicant.appliedTimeUtc}
        </span>
      </td>

      {/* Status */}
      <td className="py-4 px-4 whitespace-nowrap">
        <StatusBadge
          variant={
            applicant.status === "approved"
              ? "approved"
              : applicant.status === "rejected"
              ? "rejected"
              : "pending"
          }
          label={
            applicant.status === "approved"
              ? "Approved & Active"
              : applicant.status === "rejected"
              ? "Disqualified"
              : "Pending Check"
          }
        />
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="inline-flex items-center justify-end gap-2">
          {isPending ? (
            <>
              <button
                type="button"
                onClick={() => onApprove(applicant.id)}
                className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 hover:border-emerald-400 px-3 py-1.5 rounded-xl text-xs font-headline font-semibold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.2)] active:scale-95 cursor-pointer"
                title="Approve applicant credentials"
              >
                <span className="material-symbols-outlined text-[16px]">
                  check_circle
                </span>
                <span>Approve</span>
              </button>

              <button
                type="button"
                onClick={() => onReject(applicant)}
                className="bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 hover:border-rose-400 px-3 py-1.5 rounded-xl text-xs font-headline font-semibold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,63,94,0.2)] active:scale-95 cursor-pointer"
                title="Reject registration"
              >
                <span className="material-symbols-outlined text-[16px]">
                  cancel
                </span>
                <span>Reject</span>
              </button>
            </>
          ) : isApproved ? (
            <button
              type="button"
              onClick={() =>
                showInfoAlert(
                  "Mentor Node Management",
                  `Managing mentor node privileges for ${applicant.name}.`
                )
              }
              className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white px-3.5 py-1.5 rounded-xl text-xs font-headline font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">
                terminal
              </span>
              <span>Manage Node</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onApprove(applicant.id)}
              className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-on-surface-variant hover:text-white px-3 py-1.5 rounded-xl text-xs font-headline transition-all cursor-pointer"
            >
              Reinstate
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
