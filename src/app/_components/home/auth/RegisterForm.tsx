"use client";

import { useState } from "react";
import { GlassInput } from "../../ui/GlassInput";
import { GlassButton } from "../../ui/GlassButton";
import { RoleSelector, RoleType } from "./RoleSelector";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

interface RegisterFormProps {
  onSuccessSwitch?: () => void;
}

export function RegisterForm({ onSuccessSwitch }: RegisterFormProps) {
  const [role, setRole] = useState<RoleType>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mentor-specific state
  const [expertise, setExpertise] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const [agreeHonorCode, setAgreeHonorCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Check if email ends with .edu or academic domain
  const isEduDomain = email.trim().toLowerCase().endsWith(".edu") ||
    email.trim().toLowerCase().includes(".ac.") ||
    email.trim().toLowerCase().endsWith(".edu.bd") ||
    email.trim().toLowerCase().endsWith(".edu.in");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeHonorCode) {
      alert("Please accept the Academic Honor Code to initialize your node.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please verify your passkeys.");
      return;
    }

    setIsSubmitting(true);
    // Simulate node cryptographic key generation & registration (Frontend-First)
    setTimeout(() => {
      setIsSubmitting(false);
      setRegisteredSuccess(true);
    }, 1200);
  };

  if (registeredSuccess) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(52,211,153,0.35)]">
          <span className="material-symbols-outlined text-3xl">verified_user</span>
        </div>
        <h4 className="font-headline text-headline-sm font-bold text-white">
          Node Identity Attested!
        </h4>
        <p className="font-body text-body-sm text-on-surface-variant max-w-sm mx-auto">
          {role === "student"
            ? "Your Student Node has been granted instant submission rights. You may now connect your repository."
            : "Your Mentor Application has been submitted to the consensus review queue. An admin node will verify your credentials within 24 hours."}
        </p>
        <div className="pt-2">
          <GlassButton
            variant="primary"
            size="md"
            icon="login"
            onClick={onSuccessSwitch}
          >
            Proceed to Sign In
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dual Role Selector */}
      <RoleSelector selectedRole={role} onSelectRole={setRole} />

      {/* Full Legal / Academic Name */}
      <GlassInput
        label="Full Academic Name"
        icon="person"
        placeholder={role === "student" ? "e.g. Julian Chen" : "e.g. Dr. Elena Vance"}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

      {/* Institutional Email Address */}
      <div className="space-y-1">
        <GlassInput
          label="Institutional Email Address"
          type="email"
          icon="alternate_email"
          placeholder="username@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          rightElement={
            isEduDomain ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-headline font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs">verified</span>
                .EDU Verified
              </span>
            ) : undefined
          }
          hint={
            isEduDomain
              ? "Verified institutional domain. Instant evaluation node access enabled."
              : "Use your accredited university or research email for instant verification."
          }
        />
      </div>

      {/* Dynamic Fields for Mentor Role */}
      {role === "mentor" && (
        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="text-[11px] font-headline font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Review Mentor Credentials
          </div>

          <GlassInput
            label="Primary Field of Technical Expertise"
            icon="science"
            placeholder="e.g. Distributed Systems, Machine Learning, Compilers"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
          />

          <GlassInput
            label="Academic Affiliation / Lab"
            icon="account_balance"
            placeholder="e.g. MIT CSAIL / Berkeley RISELab"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            required
          />

          <GlassInput
            label="Google Scholar, GitHub, or Portfolio URL"
            icon="link"
            placeholder="https://scholar.google.com/citations?user=..."
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            required
          />
        </div>
      )}

      {/* Password & Confirm Password Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

        <GlassInput
          label="Confirm Master Key"
          type={showPassword ? "text" : "password"}
          icon="lock_reset"
          placeholder="••••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {/* Dynamic Password Entropy Meter */}
      <PasswordStrengthMeter password={password} />

      {/* Academic Honor Code Agreement */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreeHonorCode}
            onChange={(e) => setAgreeHonorCode(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/40 focus:ring-offset-0 cursor-pointer"
          />
          <span className="font-body text-body-xs text-on-surface-variant group-hover:text-white/90 leading-relaxed">
            I attest that all submitted credentials and academic project artifacts adhere to
            institutional honor codes, peer review fairness, and cryptographic consensus
            rules.
          </span>
        </label>
      </div>

      {/* Submit Action Button */}
      <div className="pt-2">
        <GlassButton
          variant="primary"
          size="lg"
          type="submit"
          disabled={isSubmitting}
          icon={isSubmitting ? "hourglass_empty" : "how_to_reg"}
          className="w-full shadow-[0_0_24px_rgba(124,58,237,0.4)]"
        >
          {isSubmitting
            ? "Encrypting Node Credentials..."
            : role === "student"
            ? "Initialize Student Node"
            : "Submit Mentor Application"}
        </GlassButton>
      </div>
    </form>
  );
}
