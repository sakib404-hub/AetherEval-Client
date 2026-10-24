"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { GlassInput } from "../../ui/GlassInput";
import { GlassButton } from "../../ui/GlassButton";
import { loginAction } from "@/app/_actions/auth/loginAction";
import { showSuccessAlert, showErrorAlert, showInfoAlert } from "@/lib/alert";

export function LoginForm() {
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
        showSuccessAlert("Login Successful", "Welcome back to your academic node.");
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
        showErrorAlert("Login Failed", msg);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Feedback State */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-headline flex items-center gap-2.5 shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-rose-400 shrink-0">
            error
          </span>
          <span className="leading-snug">{error}</span>
        </div>
      )}

      {/* Node Identifier / Academic Email */}
      <GlassInput
        label="Academic Email / Node ID"
        name="email"
        type="email"
        icon="fingerprint"
        placeholder="elena.vance@mit.edu or 0x71C...a429"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Master Key / Password */}
      <GlassInput
        label="Master Key / Passphrase"
        name="password"
        type={showPassword ? "text" : "password"}
        icon="lock"
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-on-surface-variant hover:text-white transition-colors cursor-pointer"
            title={showPassword ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-outlined text-lg">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        }
      />

      {/* Session Options & Recovery */}
      <div className="flex items-center justify-between text-body-xs font-headline pt-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="rememberSession"
            checked={rememberSession}
            onChange={(e) => setRememberSession(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/40 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-on-surface-variant group-hover:text-white/90">
            Remember node session
          </span>
        </label>

        <button
          type="button"
          onClick={() =>
            showInfoAlert(
              "Identity Recovery Initiated",
              "Check your verified academic email inbox for recovery steps."
            )
          }
          className="text-primary hover:text-purple-300 transition-colors cursor-pointer"
        >
          Recover Identity?
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <GlassButton
          variant="primary"
          size="lg"
          type="submit"
          disabled={isPending}
          icon={isPending ? "progress_activity" : "login"}
          className={`w-full shadow-[0_0_24px_rgba(124,58,237,0.4)] ${
            isPending ? "[&_.material-symbols-outlined]:animate-spin" : ""
          }`}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </GlassButton>
      </div>
    </form>
  );
}
