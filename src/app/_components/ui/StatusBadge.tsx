import React from "react";

export type StatusBadgeVariant =
  | "pending"
  | "approved"
  | "rejected"
  | "node"
  | "info"
  | "neutral";

export interface StatusBadgeProps {
  variant?: StatusBadgeVariant;
  label: string;
  icon?: string;
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({
  variant = "neutral",
  label,
  icon,
  pulse,
  className = "",
}: StatusBadgeProps) {
  const variantStyles: Record<StatusBadgeVariant, string> = {
    pending:
      "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
    approved:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
    rejected:
      "bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]",
    node: "bg-primary-container/20 text-primary border-primary/40 shadow-[0_0_12px_rgba(124,58,237,0.25)]",
    info: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]",
    neutral:
      "bg-white/[0.05] text-on-surface-variant border-white/10 hover:text-white",
  };

  const dotColors: Record<StatusBadgeVariant, string> = {
    pending: "bg-amber-400",
    approved: "bg-emerald-400",
    rejected: "bg-rose-400",
    node: "bg-primary",
    info: "bg-cyan-400",
    neutral: "bg-slate-400",
  };

  const shouldPulse = pulse ?? (variant === "pending" || variant === "node");

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-headline font-semibold border backdrop-blur-md tracking-wider uppercase ${variantStyles[variant]} ${className}`}
    >
      {shouldPulse ? (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`}
          />
        </span>
      ) : (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`}
        />
      )}

      {icon && (
        <span className="material-symbols-outlined text-[14px] leading-none">
          {icon}
        </span>
      )}

      <span>{label}</span>
    </span>
  );
}
