"use client";

import { useState } from "react";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import { InstitutionalSSO } from "./InstitutionalSSO";

interface AuthCardProps {
  initialMode?: "register" | "login";
}

export function AuthCard({ initialMode = "register" }: AuthCardProps) {
  const [mode, setMode] = useState<"register" | "login">(initialMode);

  return (
    <div className="max-w-xl w-full mx-auto relative group">
      {/* Ambient Backing Glow under Card */}
      <div
        className="absolute -inset-1 bg-gradient-to-b from-primary-container/40 via-purple-900/20 to-transparent rounded-[32px] blur-xl opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glassmorphism Form Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-7 sm:p-9 md:p-11 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] overflow-hidden">
        {/* Subtle Top Specular Violet Highlight */}
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
          {/* System Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-highest/60 border border-primary/30 shadow-[0_0_12px_rgba(124,58,237,0.25)] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-headline text-[10px] text-primary uppercase tracking-wider font-semibold">
              Academic Evaluation Protocol v2.4
            </span>
          </div>

          {/* Glowing Gradient Title */}
          <h1 className="text-3xl sm:text-4xl md:text-headline-lg font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300 mb-2.5">
            {mode === "register" ? "Create Your Account" : "Access Your Portal"}
          </h1>

          <p className="text-on-surface-variant font-body text-body-md max-w-sm">
            {mode === "register"
              ? "Join the academic project evaluation system and collaborate across verified quantum-secured nodes."
              : "Sign in with your verified academic identity to access submission queues and evaluation rubrics."}
          </p>
        </div>

        {/* Active Form Mode */}
        {mode === "register" ? (
          <RegistrationForm onSwitchToLogin={() => setMode("login")} />
        ) : (
          <LoginForm onSwitchToRegister={() => setMode("register")} />
        )}

        {/* Institutional Single Sign-On */}
        <div className="mt-5">
          <InstitutionalSSO />
        </div>
      </div>
    </div>
  );
}
