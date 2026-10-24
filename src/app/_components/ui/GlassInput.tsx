import React, { forwardRef } from "react";

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  rightElement?: React.ReactNode;
  error?: string;
  hint?: string;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      label,
      icon,
      rightElement,
      error,
      hint,
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-headline text-label-md text-on-surface"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <span
              className="material-symbols-outlined pointer-events-none absolute left-4 text-on-surface-variant text-[20px]"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full bg-white/[0.04] border ${
              error ? "border-rose-500/60" : "border-white/10"
            } focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl ${
              icon ? "pl-12" : "pl-4"
            } ${
              rightElement ? "pr-12" : "pr-4"
            } py-3.5 transition-all duration-200 outline-none backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3.5 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="font-body text-[12px] text-rose-400 mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </p>
        )}

        {hint && !error && (
          <p className="font-body text-[11px] text-on-surface-variant/80 mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
