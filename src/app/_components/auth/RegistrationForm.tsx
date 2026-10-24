"use client";

import { useState } from "react";
import { RoleToggle, RoleType } from "./RoleToggle";
import { PasswordEntropyBar } from "./PasswordEntropyBar";
import { MentorFields } from "./MentorFields";
import { StatusTiersLegend } from "./StatusTiersLegend";
import { showErrorAlert, showWarningAlert } from "@/lib/alert";

interface RegistrationFormProps {
  onSwitchToLogin: () => void;
}

export function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const [role, setRole] = useState<RoleType>("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mentor dynamic fields
  const [expertise, setExpertise] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [bio, setBio] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Real-time detection of academic / .edu domain
  const isRecognizedDomain =
    email.trim().toLowerCase().endsWith(".edu") ||
    email.trim().toLowerCase().includes(".ac.") ||
    email.trim().toLowerCase().endsWith(".edu.bd") ||
    email.trim().toLowerCase().endsWith(".edu.in") ||
    email.trim().toLowerCase().endsWith(".edu.sg");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showWarningAlert("Action Required", "Please accept the Academic Evaluation Guidelines & Privacy Protocol.");
      return;
    }
    if (password !== confirmPassword) {
      showErrorAlert("Validation Error", "Passwords do not match. Please verify your passkeys.");
      return;
    }

    setIsSubmitting(true);
    // Simulate cryptographic key attestation (Frontend-first approach)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="py-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_24px_rgba(52,211,153,0.35)]">
          <span className="material-symbols-outlined text-3xl">verified</span>
        </div>
        <div>
          <h3 className="font-headline text-headline-sm font-bold text-white mb-1.5">
            Node Identity Attested!
          </h3>
          <p className="font-body text-body-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            {role === "student"
              ? "Your Student Node is active. Instant repository submission permissions have been minted to your session."
              : "Your Mentor Application has been anchored to the review queue. The institutional review board will verify credentials within 24-48 hours."}
          </p>
        </div>

        <button
          type="button"
          onClick={onSwitchToLogin}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Sign In to Access Portal</span>
          <span className="material-symbols-outlined text-base">login</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Role Toggle (Frosted Segmented Bar) */}
      <RoleToggle currentRole={role} onChangeRole={setRole} />

      {/* Full Name Field */}
      <div className="space-y-1.5">
        <label className="block font-headline text-label-md text-on-surface">
          Full Name
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            person
          </span>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Dr. Elena Vance or Alex Rivera"
            className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Academic / Institutional Email Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="block font-headline text-label-md text-on-surface">
            Academic / Institutional Email
          </label>
          <span
            className={`text-[11px] font-headline flex items-center gap-1 ${
              isRecognizedDomain ? "text-emerald-400 font-semibold" : "text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">
              {isRecognizedDomain ? "verified" : "domain_verification"}
            </span>
            {isRecognizedDomain ? "Institutional .edu Validated" : ".edu or recognized domain"}
          </span>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
            mail
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@university.edu"
            className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Passwords Row / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="block font-headline text-label-md text-on-surface">
            Password
          </label>
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

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="block font-headline text-label-md text-on-surface">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-[20px] pointer-events-none">
              lock_reset
            </span>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white/[0.04] border border-white/10 focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-400 font-body text-body-md rounded-xl pl-12 pr-4 py-3.5 transition-all duration-200 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Password Strength Indicator */}
      <PasswordEntropyBar password={password} />

      {/* Dynamic Mentor Fields (Conditioned on Role) */}
      {role === "mentor" && (
        <MentorFields
          expertise={expertise}
          setExpertise={setExpertise}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          bio={bio}
          setBio={setBio}
        />
      )}

      {/* Status Tiers Legend */}
      <StatusTiersLegend />

      {/* Terms & Agreement Checkbox */}
      <div className="pt-2 flex items-start gap-3">
        <div className="flex items-center h-5">
          <input
            id="protocol-terms"
            type="checkbox"
            required
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-5 h-5 rounded-md bg-white/[0.05] border-white/20 text-primary-container focus:ring-primary-container focus:ring-offset-0 focus:ring-1 cursor-pointer"
          />
        </div>
        <label
          htmlFor="protocol-terms"
          className="font-body text-body-sm text-on-surface-variant cursor-pointer leading-tight"
        >
          I agree to the{" "}
          <span className="text-primary hover:text-white underline transition-colors">
            Academic Evaluation Guidelines
          </span>{" "}
          &{" "}
          <span className="text-primary hover:text-white underline transition-colors">
            Quantum Node Privacy Protocol
          </span>
          .
        </label>
      </div>

      {/* Primary CTA Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer w-full text-base tracking-wide active:scale-[0.98] disabled:opacity-60"
      >
        <span className="font-semibold text-white">
          {isSubmitting
            ? "Encrypting Node Credentials..."
            : role === "student"
            ? "Complete Registration"
            : "Submit Mentor Application"}
        </span>
        <span className="material-symbols-outlined text-[20px]">
          {isSubmitting ? "hourglass_empty" : "arrow_forward"}
        </span>
      </button>

      {/* Bottom Login Alternative */}
      <div className="text-center pt-3">
        <p className="font-body text-body-sm text-on-surface-variant">
          Already registered in the network?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-purple-300 font-semibold ml-1 hover:underline transition-colors duration-150 inline-flex items-center gap-1 cursor-pointer"
          >
            Sign in to your portal
            <span className="material-symbols-outlined text-[14px]">login</span>
          </button>
        </p>
      </div>
    </form>
  );
}
