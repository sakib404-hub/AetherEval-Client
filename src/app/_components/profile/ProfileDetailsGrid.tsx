"use client";

import { useState } from "react";
import { UserProfileData } from "@/types/user";

interface ProfileDetailsGridProps {
  profile: UserProfileData;
}

export function ProfileDetailsGrid({ profile }: ProfileDetailsGridProps) {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const createdDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      })
    : "Verified Registration";

  const updatedDate = profile.updatedAt
    ? new Date(profile.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      })
    : "Synchronized with Protocol";

  const role = (profile.role || "STUDENT").toUpperCase();

  const clearanceLabel =
    role === "ADMIN"
      ? "Tier 0 • Root Authority"
      : role === "MENTOR"
      ? "Tier 1 • Consensus Reviewer"
      : "Tier 2 • Academic Submitter";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Account UUID */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-2 backdrop-blur-xl hover:border-white/20 transition-all">
        <div className="flex items-center justify-between text-outline text-xs font-headline">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">fingerprint</span>
            Account Identifier
          </span>
          <button
            type="button"
            onClick={() => handleCopy(profile.id)}
            className="hover:text-white transition-colors cursor-pointer"
            title="Copy Account ID"
          >
            <span className="material-symbols-outlined text-sm">
              {copiedId ? "check" : "content_copy"}
            </span>
          </button>
        </div>
        <div className="text-white font-mono text-xs break-all bg-black/40 p-2.5 rounded-xl border border-white/5">
          {profile.id || "N/A"}
        </div>
      </div>

      {/* Institutional Email */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-2 backdrop-blur-xl hover:border-white/20 transition-all">
        <div className="text-outline text-xs font-headline flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">alternate_email</span>
          Institutional Email
        </div>
        <div className="text-white font-headline font-semibold text-sm truncate pt-1">
          {profile.email || "N/A"}
        </div>
        <div className="text-[11px] font-body text-on-surface-variant">
          Authenticated via JWT Session
        </div>
      </div>

      {/* Clearance Level */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-2 backdrop-blur-xl hover:border-white/20 transition-all">
        <div className="text-outline text-xs font-headline flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">shield</span>
          Governance Clearance
        </div>
        <div className="text-primary font-headline font-semibold text-sm pt-1">
          {clearanceLabel}
        </div>
        <div className="text-[11px] font-body text-on-surface-variant">
          Protocol Role: {role}
        </div>
      </div>

      {/* Registration Date */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-2 backdrop-blur-xl hover:border-white/20 transition-all">
        <div className="text-outline text-xs font-headline flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">calendar_month</span>
          Enrolled In Protocol
        </div>
        <div suppressHydrationWarning className="text-white font-headline font-semibold text-sm pt-1">
          {createdDate}
        </div>
        <div className="text-[11px] font-body text-on-surface-variant">
          Initial Genesis Attestation
        </div>
      </div>

      {/* Last Protocol Sync */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-2 backdrop-blur-xl hover:border-white/20 transition-all">
        <div className="text-outline text-xs font-headline flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">sync_saved_locally</span>
          Last Ledger Sync
        </div>
        <div suppressHydrationWarning className="text-white font-headline font-semibold text-sm pt-1">
          {updatedDate}
        </div>
        <div className="text-[11px] font-body text-on-surface-variant">
          Endpoint: /api/v1/auth/me
        </div>
      </div>

      {/* Node Status */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 space-y-2 backdrop-blur-xl hover:border-white/20 transition-all">
        <div className="text-outline text-xs font-headline flex items-center gap-1.5 uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          Network Status
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-300 font-headline font-semibold text-sm">
            {profile.status || "ACTIVE"}
          </span>
        </div>
        <div className="text-[11px] font-body text-on-surface-variant">
          Eligible for evaluation actions
        </div>
      </div>
    </div>
  );
}
