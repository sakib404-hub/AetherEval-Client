import React from "react";

export type GlassButtonVariant =
  | "primary"
  | "frosted"
  | "icon"
  | "success"
  | "destructive"
  | "ghost";

export type GlassButtonSize = "sm" | "md" | "lg";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

export function GlassButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  className = "",
  disabled,
  ...props
}: GlassButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-headline font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles: Record<GlassButtonSize, string> = {
    sm: "text-label-sm px-3.5 py-1.5 rounded-xl gap-1.5",
    md: "text-label-md px-5 py-2.5 rounded-full gap-2",
    lg: "text-label-lg px-7 py-3.5 rounded-full gap-2.5",
  };

  const variantStyles: Record<GlassButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-primary-container to-[#4C1D95] text-white border border-white/30 shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:shadow-[0_0_36px_rgba(124,58,237,0.8)] hover:brightness-110",
    frosted:
      "bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white backdrop-blur-md shadow-sm hover:border-white/25",
    icon: "p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-on-surface-variant hover:text-white backdrop-blur-md shadow-sm",
    success:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 hover:border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.25)]",
    destructive:
      "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 hover:border-rose-400 shadow-[0_0_16px_rgba(244,63,94,0.25)]",
    ghost:
      "bg-transparent hover:bg-white/[0.05] text-on-surface-variant hover:text-white border border-transparent",
  };

  const resolvedSize = variant === "icon" ? "" : sizeStyles[size];

  return (
    <button
      className={`${baseStyles} ${resolvedSize} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="material-symbols-outlined text-[18px]">
              {icon}
            </span>
          )}
          {children && <span>{children}</span>}
          {icon && iconPosition === "right" && (
            <span className="material-symbols-outlined text-[18px]">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
