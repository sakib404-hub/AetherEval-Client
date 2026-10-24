"use client";

import { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { RegisterForm } from "./auth/RegisterForm";
import { LoginForm } from "./auth/LoginForm";
import { SocialAuthProviders } from "./auth/SocialAuthProviders";

export function AuthSection() {
  const [authMode, setAuthMode] = useState<"register" | "login">("register");

  return (
    <section
      id="auth"
      className="relative flex flex-col items-center pt-16 pb-24 scroll-mt-24 max-w-2xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-2">
          Decentralized Authentication Gateway
        </div>
        <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          {authMode === "register" ? "Initialize Academic Node" : "Access Evaluation Session"}
        </h2>
        <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
          {authMode === "register"
            ? "Register your verified academic identity to submit projects or join the consensus review mentor network."
            : "Authenticate with your academic passkey or institutional SSO credentials to access your queues."}
        </p>
      </div>

      {/* Main Glass Authentication Card */}
      <GlassCard level={2} className="w-full p-6 sm:p-8 border-white/15">
        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-black/40 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`py-2.5 px-4 rounded-xl font-headline text-body-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              authMode === "register"
                ? "bg-primary-container/40 border border-primary/50 text-white shadow-[0_0_16px_rgba(124,58,237,0.35)]"
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">how_to_reg</span>
            <span>Register Node</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`py-2.5 px-4 rounded-xl font-headline text-body-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              authMode === "login"
                ? "bg-primary-container/40 border border-primary/50 text-white shadow-[0_0_16px_rgba(124,58,237,0.35)]"
                : "text-on-surface-variant hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-lg">login</span>
            <span>Sign In</span>
          </button>
        </div>

        {/* Dynamic Form Content */}
        {authMode === "register" ? (
          <RegisterForm onSuccessSwitch={() => setAuthMode("login")} />
        ) : (
          <LoginForm />
        )}

        {/* Institutional SSO Providers */}
        <SocialAuthProviders />
      </GlassCard>
    </section>
  );
}
