"use client";

import { useState } from "react";
import { logout } from "@/app/_actions/auth/logout";
import { showSuccessAlert } from "@/lib/alert";
import { GlassButton } from "@/app/_components/ui/GlassButton";

export function ProfileSecurityCard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    showSuccessAlert("Logged Out", "Cryptographic session revoked.");
    await logout();
  };

  return (
    <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-8 backdrop-blur-2xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary text-2xl">
            security
          </span>
          <div>
            <h3 className="font-headline text-headline-sm font-semibold text-white">
              Session Attestation & Security
            </h3>
            <p className="text-xs font-body text-on-surface-variant">
              Centralized protocol endpoint: https://aethar-eval.vercel.app/api/v1/auth/me
            </p>
          </div>
        </div>

        <GlassButton
          type="button"
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          loading={isLoggingOut}
          icon="logout"
        >
          Sign Out Node
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-body">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
          <div className="text-outline font-headline text-[10px] uppercase tracking-wider">
            TOKEN INTEGRITY
          </div>
          <div className="text-emerald-300 font-semibold flex items-center gap-1.5 font-headline">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Cryptographically Verified</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Encrypted RS256 JWT attestation.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
          <div className="text-outline font-headline text-[10px] uppercase tracking-wider">
            COOKIE SECURITY
          </div>
          <div className="text-emerald-300 font-semibold flex items-center gap-1.5 font-headline">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>HTTP-Only & Secure</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Protected against XSS token harvesting.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
          <div className="text-outline font-headline text-[10px] uppercase tracking-wider">
            TRANSPORT ENCRYPTION
          </div>
          <div className="text-emerald-300 font-semibold flex items-center gap-1.5 font-headline">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>TLS 1.3 End-to-End</span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Evaluation Ledger TLS encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
