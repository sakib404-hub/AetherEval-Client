"use client";

import { useState } from "react";
import { UserProfileData } from "@/types/user";

interface ProfileHeroCardProps {
  profile: UserProfileData;
}

export function ProfileHeroCard({ profile }: ProfileHeroCardProps) {
  const [copied, setCopied] = useState(false);

  const role = (profile.role || "STUDENT").toUpperCase();
  const status = (profile.status || "ACTIVE").toUpperCase();

  const handleCopyId = () => {
    if (profile.id) {
      navigator.clipboard.writeText(profile.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Extract initials
  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : role[0] || "U";

  // Role style parameters
  const roleStyles =
    role === "ADMIN"
      ? {
          badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
          icon: "admin_panel_settings",
          label: "System Administrator • Root Governance",
          avatarGlow: "from-purple-600 to-indigo-600 shadow-[0_0_32px_rgba(147,51,234,0.4)]",
        }
      : role === "MENTOR"
      ? {
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          icon: "workspace_premium",
          label: "Peer Review Mentor • Evaluation Committee",
          avatarGlow: "from-emerald-600 to-teal-700 shadow-[0_0_32px_rgba(16,185,129,0.4)]",
        }
      : {
          badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
          icon: "school",
          label: "Research Scholar • Academic Candidate",
          avatarGlow: "from-primary-container to-blue-600 shadow-[0_0_32px_rgba(124,58,237,0.4)]",
        };

  return (
    <article className="rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/15 p-6 md:p-8 shadow-[0_8px_32px_0_rgba(124,58,237,0.2)] relative overflow-hidden transition-all duration-300">
      {/* Ambient card accent glow */}
      <div
        className={`absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
          role === "ADMIN"
            ? "bg-purple-500/20"
            : role === "MENTOR"
            ? "bg-emerald-500/20"
            : "bg-primary/20"
        }`}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
        {/* User Identity Info */}
        <div className="flex items-center gap-5">
          {/* Glowing Avatar */}
          <div
            className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr ${roleStyles.avatarGlow} flex items-center justify-center text-white text-2xl md:text-3xl font-headline font-bold border border-white/30 shrink-0 select-none`}
          >
            {initials}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-headline text-headline-sm md:text-headline-md font-bold text-white tracking-tight">
                {profile.name || "Academic Member"}
              </h2>
              {/* Role Chip */}
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-headline font-semibold border ${roleStyles.badge}`}
              >
                <span className="material-symbols-outlined text-sm">
                  {roleStyles.icon}
                </span>
                <span>{role}</span>
              </span>
            </div>

            <p className="font-body text-body-sm text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-outline">
                mail
              </span>
              <span>{profile.email}</span>
            </p>

            <p className="text-xs font-headline text-outline flex items-center gap-1.5">
              <span>{roleStyles.label}</span>
            </p>
          </div>
        </div>

        {/* Status & ID Badge Area */}
        <div className="flex flex-col sm:items-end gap-2.5 shrink-0 self-stretch sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          {/* Node Status Pill */}
          {status === "ACTIVE" && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NODE ACTIVE • Fully Operational</span>
            </div>
          )}

          {status === "PENDING_APPROVAL" && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>PENDING ACCREDITATION</span>
            </div>
          )}

          {status === "REJECTED" && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-headline font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
              <span className="material-symbols-outlined text-base text-rose-400">
                cancel
              </span>
              <span>ACCREDITATION SUSPENDED</span>
            </div>
          )}

          {/* Account ID Copy Button */}
          <button
            type="button"
            onClick={handleCopyId}
            title="Click to copy Account UUID"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono text-outline hover:text-white transition-all cursor-pointer"
          >
            <span>ID: #{profile.id ? profile.id.slice(0, 12) : "unknown"}...</span>
            <span className="material-symbols-outlined text-xs">
              {copied ? "check" : "content_copy"}
            </span>
            {copied && <span className="text-[10px] text-emerald-300 font-headline">Copied!</span>}
          </button>
        </div>
      </div>
    </article>
  );
}
