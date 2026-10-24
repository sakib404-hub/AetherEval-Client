"use client";

import { useState } from "react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate session authentication
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="py-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-primary-container/30 border border-primary/50 text-primary mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.45)]">
          <span className="material-symbols-outlined text-3xl">token</span>
        </div>
        <div>
          <h3 className="font-headline text-headline-sm font-bold text-white mb-1.5">
            Node Session Authorized!
          </h3>
          <p className="font-body text-body-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Identity verified on the AetherEval Core Protocol. Your evaluation privileges and submission
            queues are unlocked.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Return to Dashboard</span>
          <span className="material-symbols-outlined text-base">dashboard</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email / Node Identifier */}
      <div className="space-y-1.5">
        <label className="block font-headline text-label-md text-on-surface">
          Academic Email or Node ID
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            fingerprint
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elena.vance@mit.edu or node@ox71...a429"
            className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Master Key / Password */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block font-headline text-label-md text-on-surface">
            Master Key / Passphrase
          </label>
          <button
            type="button"
            onClick={() => alert("Identity recovery sequence initiated. Check your verified academic email inbox.")}
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-11 py-3.5 transition-all duration-200 outline-none"
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
            checked={rememberSession}
            onChange={(e) => setRememberSession(e.target.checked)}
            className="w-4 h-4 rounded bg-white/[0.05] border-white/20 text-primary-container focus:ring-primary-container focus:ring-offset-0 focus:ring-1 cursor-pointer"
          />
          <span className="text-on-surface-variant group-hover:text-white transition-colors">
            Preserve node cryptographic session
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer w-full text-base tracking-wide active:scale-[0.98] disabled:opacity-60"
      >
        <span className="font-semibold text-white">
          {isSubmitting ? "Authenticating Session Keys..." : "Sign In to Node"}
        </span>
        <span className="material-symbols-outlined text-[20px]">
          {isSubmitting ? "hourglass_empty" : "login"}
        </span>
      </button>

      {/* Bottom Switch to Register */}
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
    </form>
  );
}
