import React, { forwardRef } from "react";

export interface GlassTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  characterCount?: {
    current: number;
    max: number;
  };
  error?: string;
  hint?: string;
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  (
    {
      label,
      characterCount,
      error,
      hint,
      className = "",
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {(label || characterCount) && (
          <div className="flex items-center justify-between">
            {label && (
              <label
                htmlFor={textareaId}
                className="block font-headline text-label-md text-on-surface"
              >
                {label}
              </label>
            )}
            {characterCount && (
              <span className="font-headline text-[11px] text-on-surface-variant/80">
                {characterCount.current} / {characterCount.max}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-white/[0.04] border ${
            error ? "border-rose-500/60" : "border-white/10"
          } focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl p-3.5 transition-all duration-200 outline-none backdrop-blur-md resize-none leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />

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

GlassTextarea.displayName = "GlassTextarea";
