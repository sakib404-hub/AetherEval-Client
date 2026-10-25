"use client";

import { useState, useTransition, useCallback } from "react";
import { motion } from "framer-motion";
import { UserProfileData } from "@/types/user";
import { getMe } from "@/app/_actions/auth/getMe";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileHeroCard } from "./ProfileHeroCard";
import { ProfileDetailsGrid } from "./ProfileDetailsGrid";
import { ProfileRoleSpecificCard } from "./ProfileRoleSpecificCard";
import { ProfileSecurityCard } from "./ProfileSecurityCard";

interface ProfileContainerProps {
  initialProfile: UserProfileData | null;
  initialError?: string | null;
}

export function ProfileContainer({
  initialProfile,
  initialError = null,
}: ProfileContainerProps) {
  const [profile, setProfile] = useState<UserProfileData | null>(initialProfile);
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [isPending, startTransition] = useTransition();

  const handleRefresh = useCallback(() => {
    startTransition(async () => {
      const result = await getMe();
      if (result.success && result.data) {
        setProfile(result.data);
        setErrorMessage(null);
      } else {
        setErrorMessage(result.message);
      }
    });
  }, []);

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto w-full p-8 text-center space-y-4">
        <div className="rounded-3xl bg-rose-500/10 border border-rose-500/25 p-6 text-rose-200">
          <span className="material-symbols-outlined text-3xl text-rose-400 mb-2">
            account_circle
          </span>
          <h3 className="font-headline font-bold text-lg text-white">
            Unable to Load Profile
          </h3>
          <p className="font-body text-xs text-on-surface-variant max-w-md mx-auto mt-1 mb-4">
            {errorMessage || "No active authentication session was found. Please log in again to access your profile."}
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-headline text-xs font-semibold transition-all cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl mx-auto w-full space-y-7 pt-1"
    >
      {/* Top Header */}
      <ProfileHeader
        role={profile.role}
        onRefresh={handleRefresh}
        isRefreshing={isPending}
      />

      {/* Error banner if present */}
      {errorMessage && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/25 p-3.5 flex items-center justify-between text-rose-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-rose-400">error</span>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="underline hover:text-white cursor-pointer font-headline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Hero Identity Card */}
      <ProfileHeroCard profile={profile} />

      {/* Detailed Credential Attributes Grid */}
      <section aria-label="Account Credentials">
        <ProfileDetailsGrid profile={profile} />
      </section>

      {/* Role-Specific Portal Card (Mentor / Student / Admin) */}
      <section aria-label="Role Capabilities">
        <ProfileRoleSpecificCard profile={profile} />
      </section>

      {/* Security Attestation & Signout Card */}
      <section aria-label="Security Attestation">
        <ProfileSecurityCard />
      </section>
    </motion.div>
  );
}
