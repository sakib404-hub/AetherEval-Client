"use client";

import { useState } from "react";
import { GlassInput } from "../../ui/GlassInput";
import { GlassButton } from "../../ui/GlassButton";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate session authentication (Frontend-First)
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
    }, 1000);
  };

  if (loginSuccess) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-primary-container/30 border border-primary/50 text-primary mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(124,58,237,0.4)]">
          <span className="material-symbols-outlined text-3xl">token</span>
        </div>
        <h4 className="font-headline text-headline-sm font-bold text-white">
          Session Authenticated!
        </h4>
        <p className="font-body text-body-sm text-on-surface-variant max-w-sm mx-auto">
          Welcome back to the AetherEval Core Protocol. Your academic credentials have
          been verified for this session.
        </p>
        <div className="pt-2">
          <GlassButton
            variant="primary"
            size="md"
            icon="dashboard"
            onClick={() => setLoginSuccess(false)}
          >
            Access Node Dashboard
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Node Identifier / Academic Email */}
      <GlassInput
        label="Academic Email / Node ID"
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
          onClick={() => alert("Identity recovery sequence initiated. Check your verified academic email.")}
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
          disabled={isSubmitting}
          icon={isSubmitting ? "hourglass_empty" : "login"}
          className="w-full shadow-[0_0_24px_rgba(124,58,237,0.4)]"
        >
          {isSubmitting ? "Validating Session Keys..." : "Authenticate Session"}
        </GlassButton>
      </div>
    </form>
  );
}
