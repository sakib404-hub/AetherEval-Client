"use client";

import { useEffect } from "react";
import Link from "next/link";
import { GlassButton } from "@/app/_components/ui/GlassButton";

export default function ResubmitError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Resubmit page error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto w-full p-8 my-12 rounded-3xl bg-white/[0.03] border border-rose-500/20 backdrop-blur-2xl text-center space-y-5 shadow-[0_16px_40px_rgba(244,63,94,0.15)]">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(244,63,94,0.2)]">
        <span className="material-symbols-outlined text-3xl">error_outline</span>
      </div>

      <div className="space-y-2">
        <h2 className="font-headline text-headline-sm font-bold text-white">
          Remediation Queue Error
        </h2>
        <p className="font-body text-body-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
          {error.message || "An unexpected error occurred while loading your rejected submissions."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <GlassButton
          type="button"
          variant="frosted"
          size="md"
          icon="refresh"
          onClick={() => reset()}
        >
          Try Again
        </GlassButton>
        <Link
          href="/student-dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-white font-headline text-xs font-semibold shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-base">folder_managed</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
