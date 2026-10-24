"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RoleToggle, RoleType } from "./RoleToggle";
import { PasswordEntropyBar } from "./PasswordEntropyBar";
import { MentorFields } from "./MentorFields";
import { registerAction } from "@/app/_actions/auth/registerAction";
import { showSuccessAlert, showErrorAlert, showWarningAlert } from "@/lib/alert";

export function RegisterCard() {
  const router = useRouter();
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time detection of academic / .edu domain
  const isRecognizedDomain =
    email.trim().toLowerCase().endsWith(".edu") ||
    email.trim().toLowerCase().includes(".ac.") ||
    email.trim().toLowerCase().endsWith(".edu.bd") ||
    email.trim().toLowerCase().endsWith(".edu.in") ||
    email.trim().toLowerCase().endsWith(".edu.sg");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreeTerms) {
      showWarningAlert("Action Required", "Please accept the Academic Evaluation Guidelines & Privacy Protocol.");
      return;
    }
    if (password !== confirmPassword) {
      showErrorAlert("Validation Error", "Passwords do not match. Please verify your passkeys.");
      return;
    }
    if (password.length < 6) {
      showErrorAlert("Validation Error", "Password must be at least 6 characters long.");
      return;
    }

    if (role === "mentor") {
      if (!expertise.trim()) {
        showWarningAlert("Required Field", "Please provide your area of technical expertise.");
        return;
      }
      if (!portfolio.trim()) {
        showWarningAlert("Required Field", "Please provide your portfolio or GitHub profile link.");
        return;
      }
      if (!bio.trim()) {
        showWarningAlert("Required Field", "Please provide a short bio or mentorship background.");
        return;
      }
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.set("role", role);
    formData.set("name", fullName);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    if (role === "mentor") {
      formData.set("expertise", expertise);
      formData.set("portfolioUrl", portfolio);
      formData.set("bio", bio);
    }

    const result = await registerAction(null, formData);
    setIsSubmitting(false);

    if (result.success) {
      const successMsg =
        result.message ||
        (role === "mentor"
          ? "Mentor application submitted successfully! Please sign in."
          : "Student registration successful! Please sign in.");
      showSuccessAlert("Registration Successful", successMsg);
      router.push("/login");
    } else {
      const errMsg = result.message || "Registration failed. Please check your credentials.";
      setErrorMessage(errMsg);
      showErrorAlert("Registration Failed", errMsg);
    }
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

      {/* Glassmorphic Register Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-7 sm:p-9 md:p-11 shadow-[0_8px_32px_0_rgba(124,58,237,0.25)] overflow-hidden">
        {/* Top Specular Highlight */}
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
            Create Your Account
          </h1>

          <p className="text-on-surface-variant font-body text-body-md max-w-sm">
            Join the academic project evaluation system and collaborate across verified quantum-secured nodes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Error Feedback State */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-headline flex items-center gap-2.5 shadow-[0_0_16px_rgba(244,63,94,0.15)] backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px] text-rose-400 shrink-0">
                error
              </span>
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* Role Toggle (Frosted Segmented Bar with Spring Animation) */}
          <RoleToggle currentRole={role} onChangeRole={setRole} />
          <input type="hidden" name="role" value={role} />

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
                name="name"
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
                  name="email"
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
                    name="password"
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
                    name="confirmPassword"
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

            {/* Dynamic Mentor Fields (Only when Apply as Mentor is selected) */}
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

            {/* Route directly to /login */}
            <div className="text-center pt-3">
              <p className="font-body text-body-sm text-on-surface-variant">
                Already registered in the network?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-purple-300 font-semibold ml-1 hover:underline transition-colors duration-150 inline-flex items-center gap-1"
                >
                  Sign in to your portal
                  <span className="material-symbols-outlined text-[14px]">login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
  );
}
