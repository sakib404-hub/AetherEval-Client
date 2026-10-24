"use client";

export type RoleType = "student" | "mentor";

interface RoleSelectorProps {
  selectedRole: RoleType;
  onSelectRole: (role: RoleType) => void;
}

export function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <div className="w-full space-y-2">
      <label className="block font-headline text-body-sm font-medium text-white/90">
        Select Academic Node Type
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Student Role Card */}
        <button
          type="button"
          onClick={() => onSelectRole("student")}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
            selectedRole === "student"
              ? "bg-primary-container/25 border-primary shadow-[0_0_20px_rgba(124,58,237,0.35)]"
              : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              selectedRole === "student"
                ? "bg-primary text-white shadow-[0_0_12px_#7c3aed]"
                : "bg-white/10 text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-body-sm font-semibold text-white">
                Student Node
              </span>
              <span className="text-[10px] font-headline font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                Instant
              </span>
            </div>
            <p className="font-body text-body-xs text-on-surface-variant mt-0.5">
              Submit research repositories, track review stages & earn ledger certificates.
            </p>
          </div>
        </button>

        {/* Mentor Role Card */}
        <button
          type="button"
          onClick={() => onSelectRole("mentor")}
          className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
            selectedRole === "mentor"
              ? "bg-primary-container/25 border-primary shadow-[0_0_20px_rgba(124,58,237,0.35)]"
              : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              selectedRole === "mentor"
                ? "bg-primary text-white shadow-[0_0_12px_#7c3aed]"
                : "bg-white/10 text-on-surface-variant"
            }`}
          >
            <span className="material-symbols-outlined text-xl">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-body-sm font-semibold text-white">
                Review Mentor
              </span>
              <span className="text-[10px] font-headline font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded">
                Admin Review
              </span>
            </div>
            <p className="font-body text-body-xs text-on-surface-variant mt-0.5">
              Access blinded evaluation queues, score along rubrics & sign consensus blocks.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
