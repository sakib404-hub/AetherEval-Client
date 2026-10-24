"use client";

import { motion } from "framer-motion";

export type RoleType = "student" | "mentor";

interface RoleToggleProps {
  currentRole: RoleType;
  onChangeRole: (role: RoleType) => void;
}

export function RoleToggle({ currentRole, onChangeRole }: RoleToggleProps) {
  return (
    <div
      className="rounded-2xl p-1.5 bg-black/40 border border-white/10 grid grid-cols-2 gap-2 mb-8 shadow-inner relative"
      role="tablist"
      aria-label="Academic Role Selector"
    >
      {/* Student Option */}
      <button
        type="button"
        role="tab"
        aria-selected={currentRole === "student"}
        onClick={() => onChangeRole("student")}
        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer z-10 ${
          currentRole === "student"
            ? "text-white"
            : "text-on-surface-variant hover:text-white hover:bg-white/[0.04]"
        }`}
      >
        {currentRole === "student" && (
          <motion.div
            layoutId="activeRoleHighlight"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/85 to-indigo-600/85 border border-purple-400/40 shadow-[0_0_20px_rgba(124,58,237,0.4)] pointer-events-none"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}

        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 relative z-10">
          <span className="material-symbols-outlined text-white text-[20px]">
            school
          </span>
        </div>
        <div className="relative z-10">
          <span className="font-headline text-sm font-semibold block leading-tight text-white">
            Student
          </span>
          <span className="text-[11px] font-body text-purple-200/80 block leading-tight mt-0.5">
            Instant activation
          </span>
        </div>
      </button>

      {/* Apply as Mentor Option */}
      <button
        type="button"
        role="tab"
        aria-selected={currentRole === "mentor"}
        onClick={() => onChangeRole("mentor")}
        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer z-10 ${
          currentRole === "mentor"
            ? "text-white"
            : "text-on-surface-variant hover:text-white hover:bg-white/[0.04]"
        }`}
      >
        {currentRole === "mentor" && (
          <motion.div
            layoutId="activeRoleHighlight"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/85 to-indigo-600/85 border border-purple-400/40 shadow-[0_0_20px_rgba(124,58,237,0.4)] pointer-events-none"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}

        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 relative z-10">
          <span className="material-symbols-outlined text-white text-[20px]">
            verified_user
          </span>
        </div>
        <div className="relative z-10">
          <span className="font-headline text-sm font-semibold block leading-tight text-white">
            Apply as Mentor
          </span>
          <span className="text-[11px] font-body text-slate-300/80 block leading-tight mt-0.5">
            Admin verification
          </span>
        </div>
      </button>
    </div>
  );
}
