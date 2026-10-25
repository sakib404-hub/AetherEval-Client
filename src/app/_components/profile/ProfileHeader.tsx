"use client";

import Link from "next/link";
import { GlassButton } from "@/app/_components/ui/GlassButton";

interface ProfileHeaderProps {
  role?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function ProfileHeader({
  role = "STUDENT",
  onRefresh,
  isRefreshing = false,
}: ProfileHeaderProps) {
  const normalizedRole = role.toUpperCase();
  const dashboardHref =
    normalizedRole === "ADMIN"
      ? "/admin-dashboard"
      : normalizedRole === "MENTOR"
      ? "/mentor-dashboard"
      : "/student-dashboard";

  const dashboardLabel =
    normalizedRole === "ADMIN"
      ? "Admin Console"
      : normalizedRole === "MENTOR"
      ? "Mentor Reviews"
      : "Student History";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href={dashboardHref}
            className="inline-flex items-center gap-1 text-xs font-headline text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Return to {dashboardLabel}</span>
          </Link>
          <span className="text-white/20">•</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-headline font-semibold bg-primary/10 text-primary border border-primary/25">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Cryptographic Identity Ledger</span>
          </span>
        </div>

        <h1 className="font-headline text-headline-md md:text-headline-lg font-bold text-white tracking-tight flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary text-3xl">
            badge
          </span>
          <span>Academic Identity & Profile</span>
        </h1>

        <p className="font-body text-body-sm text-on-surface-variant max-w-2xl leading-relaxed">
          Cryptographically attested account credentials, committee credentials, and consensus status synced directly with the AetherEval central protocol.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
        {onRefresh && (
          <GlassButton
            type="button"
            variant="frosted"
            size="sm"
            onClick={onRefresh}
            loading={isRefreshing}
            icon="sync"
          >
            Sync Profile
          </GlassButton>
        )}
      </div>
    </div>
  );
}
