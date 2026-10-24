"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function LoginCard() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-xl w-full mx-auto relative group"
    >
      {/* Ambient Backing Glow under Card */}
      <div
        className="absolute -inset-1 bg-gradient-to-b from-primary-container/40 via-purple-900/20 to-transparent rounded-[32px] blur-xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glassmorphic Login Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-7 sm:p-9 md:p-11 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] overflow-hidden">
        {/* Top Specular Violet Line & Radial Highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-75 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-24 bg-primary/20 blur-2xl rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Card Header Cluster */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Protocol Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest/60 border border-primary/30 shadow-[0_0_12px_rgba(124,58,237,0.25)] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-headline text-[10px] text-primary uppercase tracking-wider font-semibold">
              Academic Evaluation Protocol v2.4
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-headline-lg font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 mb-2.5">
            Access Your Portal
          </h1>

          <p className="text-on-surface-variant font-body text-body-md max-w-sm">
            Sign in with your verified academic identity to access submission queues and evaluation rubrics.
          </p>
        </div>

        {isSuccess ? (
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/student-dashboard"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 px-5 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all inline-flex items-center gap-2 cursor-pointer text-xs font-headline w-full sm:w-auto justify-center"
              >
                <span>Enter Student Dashboard</span>
                <span className="material-symbols-outlined text-base">school</span>
              </Link>
              <Link
                href="/mentor-dashboard"
                className="bg-white/10 hover:bg-white/15 text-white font-medium py-3 px-5 rounded-xl border border-white/15 hover:border-primary/50 transition-all inline-flex items-center gap-2 cursor-pointer text-xs font-headline w-full sm:w-auto justify-center shadow-lg"
              >
                <span>Enter Mentor Dashboard</span>
                <span className="material-symbols-outlined text-base text-primary">fact_check</span>
              </Link>
            </div>
          </div>
        ) : (
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

            {/* Route directly to /register */}
            <div className="text-center pt-3">
              <p className="font-body text-body-sm text-on-surface-variant">
                Need to initialize a new node?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:text-purple-300 font-semibold ml-1 hover:underline transition-colors duration-150 inline-flex items-center gap-1"
                >
                  Create your account
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
