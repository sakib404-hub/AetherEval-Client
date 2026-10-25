"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { StatusBadge } from "../ui/StatusBadge";

interface TimeStage {
  id: string;
  stepNumber: string;
  timeLabel: string;
  duration: string;
  title: string;
  actor: string;
  actorIcon: string;
  statusBadge: string;
  badgeVariant: "node" | "pending" | "info" | "approved";
  description: string;
  deliverables: string[];
  systemState: string;
}

const TIME_STAGES: TimeStage[] = [
  {
    id: "stage-1",
    stepNumber: "STAGE 01",
    timeLabel: "T - 0",
    duration: "2–3 minutes",
    title: "Account Genesis & Role Attestation",
    actor: "Students & Mentor Applicants",
    actorIcon: "how_to_reg",
    statusBadge: "Instant / 24h Vetting",
    badgeVariant: "node",
    description:
      "Users select their platform role upon registration. Student accounts activate immediately, while mentor candidates submit credentials (expertise, bio, portfolio) for administrative verification.",
    deliverables: [
      "Instant student session token and submission access",
      "Mentor application routed to administrator review panel",
      "Role-specific navigation dock activated",
    ],
    systemState: "Student: Active • Mentor: PENDING_APPROVAL",
  },
  {
    id: "stage-2",
    stepNumber: "STAGE 02",
    timeLabel: "T + 1",
    duration: "5–10 minutes",
    title: "Project Submission & Dual-Artifact Anchor",
    actor: "Student Builder",
    actorIcon: "cloud_upload",
    statusBadge: "PENDING",
    badgeVariant: "pending",
    description:
      "The student prepares their submission by providing their project name, public Git repository URL, live application deployment URL, and technical architecture abstract. No extra busywork or filler forms.",
    deliverables: [
      "Git repository link validated for public access",
      "Live deployment preview URL verified",
      "Submission record created in central evaluation queue",
    ],
    systemState: "Submission Status: PENDING",
  },
  {
    id: "stage-3",
    stepNumber: "STAGE 03",
    timeLabel: "T + 2",
    duration: "24–48 hours",
    title: "Double-Blind Mentor Evaluation Window",
    actor: "Vetted Faculty Mentor",
    actorIcon: "fact_check",
    statusBadge: "IN REVIEW",
    badgeVariant: "info",
    description:
      "Approved mentors access the evaluation queue. The submission is audited along two real-world dimensions: examining source code quality in the repository and testing interaction in the live deployment.",
    deliverables: [
      "Code architecture, testing, and dependency audit",
      "Live application interface and console error verification",
      "Detailed qualitative evaluation commentary prepared",
    ],
    systemState: "Evaluation Status: UNDER_PEER_REVIEW",
  },
  {
    id: "stage-4",
    stepNumber: "STAGE 04",
    timeLabel: "T + 3",
    duration: "Real-time sync (0s delay)",
    title: "Verdict Resolution & Actionable Feedback",
    actor: "Mentor & Student Ledger",
    actorIcon: "verified",
    statusBadge: "APPROVED / REJECTED",
    badgeVariant: "approved",
    description:
      "The mentor finalizes the assessment. If approved, commendations and grading are recorded. If revisions are required, clear constructive rejection notes are provided. The student history updates immediately.",
    deliverables: [
      "Permanent status updated to APPROVED or REJECTED",
      "Comprehensive mentor review comments visible in student history",
      "Immediate capability to remediate and resubmit if rejected",
    ],
    systemState: "Final Status: APPROVED or REJECTED",
  },
];

export function TimeFlowTracker() {
  const [activeStageId, setActiveStageId] = useState<string>("stage-1");
  const activeStage =
    TIME_STAGES.find((s) => s.id === activeStageId) || TIME_STAGES[0];
  const activeIndex = TIME_STAGES.findIndex((s) => s.id === activeStageId);
  const progressPercent = ((activeIndex + 1) / TIME_STAGES.length) * 100;

  return (
    <section
      aria-labelledby="time-tracker-heading"
      className="w-full max-w-6xl mx-auto mb-16"
    >
      <GlassCard level={2} className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase">
                Interactive Timeline Explorer
              </span>
              <StatusBadge variant="info" label="Step Through Flow" />
            </div>
            <h2
              id="time-tracker-heading"
              className="font-headline text-2xl sm:text-headline-sm font-bold text-white tracking-tight"
            >
              Chronological Evaluation Stepper
            </h2>
          </div>

          <div className="flex items-center gap-2 text-body-xs font-headline text-on-surface-variant bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-full self-start">
            <span className="material-symbols-outlined text-sm text-primary">
              timer
            </span>
            <span>Total Expected Turnaround: 24–48 Hours</span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="pt-6 pb-2">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-purple-400 to-cyan-400 rounded-full"
              initial={{ width: "25%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Stepper Buttons Cluster */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIME_STAGES.map((stage, idx) => {
              const isSelected = stage.id === activeStageId;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 border cursor-pointer relative ${
                    isSelected
                      ? "bg-primary-container/25 border-primary shadow-[0_0_20px_rgba(124,58,237,0.35)]"
                      : isPast
                      ? "bg-white/[0.04] border-white/15 hover:border-white/30 text-white"
                      : "bg-white/[0.02] border-white/5 hover:border-white/15 text-on-surface-variant hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-headline font-bold uppercase tracking-wider ${
                        isSelected ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      {stage.timeLabel}
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">
                      {stage.duration}
                    </span>
                  </div>
                  <div
                    className={`font-headline text-body-sm font-semibold truncate ${
                      isSelected ? "text-white" : "text-white/80"
                    }`}
                  >
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="pt-6 mt-4 border-t border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Left Column: Stage Overview */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-headline text-[11px] font-bold text-primary bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {activeStage.stepNumber}
                  </span>
                  <StatusBadge
                    variant={activeStage.badgeVariant}
                    label={activeStage.statusBadge}
                  />
                  <span className="text-body-xs font-headline text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary">
                      {activeStage.actorIcon}
                    </span>
                    Actor: {activeStage.actor}
                  </span>
                </div>

                <h3 className="font-headline text-xl sm:text-2xl font-bold text-white">
                  {activeStage.title}
                </h3>

                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Key Deliverables */}
                <div className="pt-2 space-y-2">
                  <div className="text-[11px] font-headline font-bold uppercase tracking-wider text-white/90">
                    Stage Deliverables & Verification:
                  </div>
                  {activeStage.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <span className="font-body text-body-sm text-white/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Time & State Snapshot */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Elapsed Stage Duration
                  </div>
                  <div className="font-headline text-2xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">
                      timelapse
                    </span>
                    {activeStage.duration}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    System State
                  </div>
                  <div className="font-mono text-body-xs text-primary font-medium bg-primary-container/20 p-2.5 rounded-xl border border-primary/30">
                    {activeStage.systemState}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-body-xs font-body text-on-surface-variant">
                  Step {activeIndex + 1} of {TIME_STAGES.length} in the evaluation lifecycle.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>
    </section>
  );
}
