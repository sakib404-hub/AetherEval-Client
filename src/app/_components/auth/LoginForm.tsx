"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/_actions/auth/loginAction";
import { showSuccessAlert, showErrorAlert, showInfoAlert } from "@/lib/alert";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(null, formData);

      if (result.success) {
        showSuccessAlert("Authentication Succeeded", "Welcome back to your academic node.");
        const normalizedRole = (
          result.role ||
          (result.data as { user?: { role?: string } })?.user?.role ||
          ""
        ).toUpperCase();

        if (normalizedRole === "ADMIN") {
          router.push("/admin-dashboard");
        } else if (normalizedRole === "MENTOR") {
          router.push("/mentor-dashboard");
        } else {
          router.push("/student-dashboard");
        }
      } else {
        const msg = result.message || "Invalid academic credentials. Please try again.";
        setError(msg);
        showErrorAlert("Authentication Failed", msg);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Feedback State */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-headline flex items-center gap-2.5 shadow-[0_0_16px_rgba(244,63,94,0.15)] backdrop-blur-md">
          <span className="material-symbols-outlined text-[18px] text-rose-400 shrink-0">
            error
          </span>
          <span className="leading-snug">{error}</span>
        </div>
      )}

      {/* Email / Node Identifier */}
      <div className="space-y-1.5 text-left">
        <label className="block font-headline text-label-md text-on-surface">
          Academic Email or Node ID
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            fingerprint
          </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elena.vance@mit.edu or node@ox71...a429"
            className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-white placeholder-slate-400 font-body text-body-md rounded-2xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none backdrop-blur-md shadow-inner"
          />
        </div>
      </div>

      {/* Master Key / Password */}
      <div className="space-y-1.5 text-left">
        <div className="flex justify-between items-center">
          <label className="block font-headline text-label-md text-on-surface">
            Master Key / Passphrase
          </label>
          <button
            type="button"
            onClick={() =>
              showInfoAlert(
                "Identity Recovery Initiated",
                "Check your verified academic email inbox for password reset instructions."
              )
            }
            className="text-[11px] font-headline text-primary hover:text-purple-300 transition-colors cursor-pointer"
          >
            Recover Identity?
          </button>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            lock
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-white placeholder-slate-400 font-body text-body-md rounded-2xl pl-12 pr-11 py-3.5 transition-all duration-200 outline-none backdrop-blur-md shadow-inner"
          />
          <button
            type="button"
            aria-label="Toggle password view"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-on-surface-variant hover:text-white transition-colors p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      {/* Remember Session Checkbox */}
      <div className="pt-1 flex items-center justify-between text-body-sm font-headline">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            name="rememberSession"
            checked={rememberSession}
            onChange={(e) => setRememberSession(e.target.checked)}
            className="w-4 h-4 rounded-md bg-white/[0.05] border-white/20 text-primary-container focus:ring-primary-container focus:ring-offset-0 focus:ring-1 cursor-pointer"
          />
          <span className="text-on-surface-variant group-hover:text-white transition-colors">
            Preserve node cryptographic session
          </span>
        </label>
      </div>

      {/* Submit Button (Styled according to Glassmorphism standards and labelled 'Sign In') */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-primary-container via-purple-600 to-[#4C1D95] hover:brightness-110 text-white font-headline font-semibold py-4 px-6 rounded-2xl border border-white/25 shadow-[0_0_28px_rgba(124,58,237,0.5)] hover:shadow-[0_0_38px_rgba(124,58,237,0.8)] transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-wide"
      >
        {isPending ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <span className="material-symbols-outlined text-xl">login</span>
          </>
        )}
      </button>

      {/* Bottom Switch to Register */}
      {onSwitchToRegister && (
        <div className="text-center pt-3">
          <p className="font-body text-body-sm text-on-surface-variant">
            Need to initialize a new node?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:text-purple-300 font-semibold ml-1 hover:underline transition-colors duration-150 inline-flex items-center gap-1 cursor-pointer"
            >
              Create your account
              <span className="material-symbols-outlined text-[14px]">how_to_reg</span>
            </button>
          </p>
        </div>
      )}
    </form>
  );
}
