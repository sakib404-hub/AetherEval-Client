"use client";

import Link from "next/link";
import { UserProfileData } from "@/types/user";

interface ProfileRoleSpecificCardProps {
  profile: UserProfileData;
}

export function ProfileRoleSpecificCard({ profile }: ProfileRoleSpecificCardProps) {
  const role = (profile.role || "STUDENT").toUpperCase();

  // Normalize expertise into string array
  let expertiseList: string[] = [];
  if (Array.isArray(profile.expertise)) {
    expertiseList = profile.expertise;
  } else if (typeof profile.expertise === "string" && profile.expertise.trim()) {
    expertiseList = profile.expertise.split(",").map((s) => s.trim());
  }

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-8 backdrop-blur-2xl space-y-6">
      {/* Mentor-Specific Section */}
      {role === "MENTOR" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-400 text-2xl">
                workspace_premium
              </span>
              <h3 className="font-headline text-headline-sm font-semibold text-white">
                Mentor Committee Credentials
              </h3>
            </div>
            <Link
              href="/mentor-dashboard"
              className="text-xs font-headline text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>Go to Review Ledger</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Academic / Professional Bio */}
          <div className="space-y-2">
            <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
              Academic Background & Biography
            </h4>
            <p className="text-sm font-body text-on-surface leading-relaxed p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              {profile.bio || "No professional biography or academic statement has been provided yet."}
            </p>
          </div>

          {/* Technical Expertise Domains */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
              Evaluator Specialization & Technical Stacks
            </h4>
            <div className="flex flex-wrap gap-2">
              {expertiseList.length > 0 ? (
                expertiseList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 rounded-full text-xs font-headline bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs font-body text-outline">
                  General Academic Peer Evaluation
                </span>
              )}
            </div>
          </div>

          {/* External Verification Portfolio */}
          {profile.portfolioUrl && (
            <div className="space-y-2">
              <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
                Research / Portfolio Link
              </h4>
              <a
                href={profile.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-headline text-xs transition-all"
              >
                <span className="material-symbols-outlined text-base text-primary">link</span>
                <span className="font-mono">{profile.portfolioUrl}</span>
                <span className="material-symbols-outlined text-xs text-outline">open_in_new</span>
              </a>
            </div>
          )}

          {/* Rejection / Feedback Note if rejected */}
          {profile.rejectionReason && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-200 text-xs space-y-1">
              <div className="font-headline font-semibold flex items-center gap-1.5 text-rose-300">
                <span className="material-symbols-outlined text-sm">info</span>
                Committee Accreditation Notes:
              </div>
              <p className="font-body pl-5 text-on-surface leading-relaxed">
                {profile.rejectionReason}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Student-Specific Section */}
      {role === "STUDENT" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-blue-400 text-2xl">
                school
              </span>
              <h3 className="font-headline text-headline-sm font-semibold text-white">
                Candidate Scholar Portfolio
              </h3>
            </div>
            <Link
              href="/student-dashboard"
              className="text-xs font-headline text-primary hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View All Submissions</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Student Bio */}
          <div className="space-y-2">
            <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
              Candidate Research Profile
            </h4>
            <p className="text-sm font-body text-on-surface leading-relaxed p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              {profile.bio || "Candidate node registered for decentralized academic evaluation and consensus grading."}
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
              Academic Actions & Workflows
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/student-dashboard"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 space-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-base">folder_managed</span>
                  <span>Submission History</span>
                </div>
                <p className="text-[11px] font-body text-on-surface-variant">
                  Track ongoing evaluation rounds & receipts.
                </p>
              </Link>

              <Link
                href="/student-dashboard/submit"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 space-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-white group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-base">cloud_upload</span>
                  <span>Submit Project</span>
                </div>
                <p className="text-[11px] font-body text-on-surface-variant">
                  Register a new project for peer evaluation.
                </p>
              </Link>

              <Link
                href="/student-dashboard/resubmit"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 space-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-white group-hover:text-rose-400 transition-colors">
                  <span className="material-symbols-outlined text-base text-rose-400">
                    published_with_changes
                  </span>
                  <span>Resubmission Queue</span>
                </div>
                <p className="text-[11px] font-body text-on-surface-variant">
                  Rectify feedback and resubmit flagged projects.
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Admin-Specific Section */}
      {role === "ADMIN" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-purple-400 text-2xl">
                admin_panel_settings
              </span>
              <h3 className="font-headline text-headline-sm font-semibold text-white">
                System Governance & Supervisory Access
              </h3>
            </div>
            <Link
              href="/admin-dashboard"
              className="text-xs font-headline text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <span>Go to Admin Console</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
              Supervisory Authority Description
            </h4>
            <p className="text-sm font-body text-on-surface leading-relaxed p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              Root administrator account empowered to oversee platform consensus metrics, verify mentor credentials, and perform supervisory reviews across the evaluation ledger.
            </p>
          </div>

          {/* Quick Administrative Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-headline uppercase tracking-wider text-outline">
              Governance Portals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/admin-dashboard"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 space-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-white group-hover:text-purple-300 transition-colors">
                  <span className="material-symbols-outlined text-base">dashboard</span>
                  <span>Platform Overview</span>
                </div>
                <p className="text-[11px] font-body text-on-surface-variant">
                  Real-time participant and submission charts.
                </p>
              </Link>

              <Link
                href="/admin-dashboard/mentors"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 space-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-white group-hover:text-purple-300 transition-colors">
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>Mentor Approvals</span>
                </div>
                <p className="text-[11px] font-body text-on-surface-variant">
                  Audit, approve, or reject mentor applicants.
                </p>
              </Link>

              <Link
                href="/admin-dashboard/reviews"
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 space-y-1 transition-all group"
              >
                <div className="flex items-center gap-2 font-headline font-semibold text-xs text-white group-hover:text-purple-300 transition-colors">
                  <span className="material-symbols-outlined text-base">fact_check</span>
                  <span>Supervisory Reviews</span>
                </div>
                <p className="text-[11px] font-body text-on-surface-variant">
                  Oversee and enforce submission decisions.
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
