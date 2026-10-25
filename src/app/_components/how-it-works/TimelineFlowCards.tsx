"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { StatusBadge } from "../ui/StatusBadge";

interface FlowStep {
  stepNumber: string;
  timeTag: string;
  durationTag: string;
  title: string;
  role: string;
  roleIcon: string;
  badgeText: string;
  badgeVariant: "node" | "pending" | "info" | "approved";
  description: string;
  actions: string[];
  outputTag: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    stepNumber: "01",
    timeTag: "T - 0 • Day 0",
    durationTag: "2–3 mins",
    title: "Node Identity Attestation & Vetting",
    role: "Student & Mentor Applicants",
    roleIcon: "how_to_reg",
    badgeText: "Auth & Vetting",
    badgeVariant: "node",
    description:
      "Participants initiate their session with purpose-driven account registration. Students receive immediate access to the submission interface; prospective mentors submit professional qualifications for administrator audit.",
    actions: [
      "Student selects builder role and authenticates immediately",
      "Mentor provides field of expertise, portfolio / GitHub link, and bio",
      "Administrator reviews and approves qualified mentor applications",
    ],
    outputTag: "Active student session or pending mentor review ticket",
  },
  {
    stepNumber: "02",
    timeTag: "T + 1 • Day 1",
    durationTag: "5–10 mins",
    title: "Dual-Artifact Project Submission",
    role: "Student Builder",
    roleIcon: "cloud_upload",
    badgeText: "Queue: PENDING",
    badgeVariant: "pending",
    description:
      "Students submit their academic capstone or hackathon project. The system requires both the code repository and a live preview URL, ensuring reviewers can inspect implementation and observe runtime behavior.",
    actions: [
      "Enter project title and technical overview abstract",
      "Attach public Git repository (GitHub / GitLab)",
      "Provide accessible live application preview deployment URL",
    ],
    outputTag: "Immutable submission record anchored with PENDING status",
  },
  {
    stepNumber: "03",
    timeTag: "T + 2 • Day 1–2",
    durationTag: "24–48 hours SLA",
    title: "Double-Blind Mentor Evaluation",
    role: "Vetted Faculty Mentor",
    roleIcon: "fact_check",
    badgeText: "In Evaluation",
    badgeVariant: "info",
    description:
      "Submissions are routed to active mentors. Evaluators perform double-blind assessments, verifying codebase architecture, automated tests, and testing interactive functionality on the live URL.",
    actions: [
      "Inspect repository modularity, readability, and commit discipline",
      "Test live web deployment for UI responsiveness and runtime errors",
      "Formulate qualitative assessment and rubric score breakdown",
    ],
    outputTag: "Comprehensive qualitative review commentary and status determination",
  },
  {
    stepNumber: "04",
    timeTag: "T + 3 • Day 2+",
    durationTag: "Real-time sync",
    title: "Consensus Verdict & Actionable Feedback",
    role: "System & Student Dashboard",
    roleIcon: "verified",
    badgeText: "Final Verdict",
    badgeVariant: "approved",
    description:
      "The mentor confirms the outcome. Approved projects receive faculty accreditation; rejected projects receive explicit constructive feedback specifying required architectural improvements for resubmission.",
    actions: [
      "Status changes atomically to APPROVED or REJECTED",
      "Student dashboard receives real-time notification with review notes",
      "Direct pathway for revision and re-evaluation if status is rejected",
    ],
    outputTag: "Accredited project record or clear remediation roadmap",
  },
];

const cardMotionVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.98 },
  visible: (idx: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: idx * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function TimelineFlowCards() {
  return (
    <section
      aria-labelledby="timeline-flow-heading"
      className="w-full max-w-6xl mx-auto mb-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
            Chronological Progression
          </div>
          <h2
            id="timeline-flow-heading"
            className="font-headline text-2xl sm:text-3xl md:text-headline-md font-bold text-white tracking-tight"
          >
            Four Stages from Submission to Verdict
          </h2>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant max-w-md">
          Structured sequentially to ensure quick turnaround times without unnecessary bureaucratic hurdles.
        </p>
      </div>

      {/* Vertical Timeline Stack with Connected Glowing Rail */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-purple-500 before:to-emerald-400">
        {FLOW_STEPS.map((step, idx) => (
          <motion.div
            key={step.stepNumber}
            custom={idx}
            variants={cardMotionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            {/* Glowing Milestone Marker along rail with subtle breathing pulse */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(124,58,237,0.5)",
                  "0 0 22px rgba(124,58,237,0.85)",
                  "0 0 10px rgba(124,58,237,0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
              className="absolute -left-[30px] sm:-left-[46px] top-6 w-5 h-5 rounded-full bg-[#0d091b] border-2 border-primary flex items-center justify-center z-10"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <GlassCard
                level={2}
                interactive
                className="p-6 sm:p-8 border-white/10 hover:border-primary/40 transition-all duration-300"
              >
                {/* Card Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-headline text-[11px] font-bold text-primary bg-primary-container/20 border border-primary/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      STAGE {step.stepNumber}
                    </span>
                    <span className="font-mono text-body-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                      {step.timeTag}
                    </span>
                    <StatusBadge variant={step.badgeVariant} label={step.badgeText} />
                  </div>

                  <div className="flex items-center gap-2 text-body-xs font-headline text-on-surface-variant self-start sm:self-auto">
                    <span className="material-symbols-outlined text-sm text-primary">
                      schedule
                    </span>
                    <span>
                      Duration: <strong className="text-white">{step.durationTag}</strong>
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-body-xs font-headline text-primary mb-1">
                    <span className="material-symbols-outlined text-sm">
                      {step.roleIcon}
                    </span>
                    <span>Responsible Role: {step.role}</span>
                  </div>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Actions & Deliverable */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-[11px] font-headline font-bold text-white/90 uppercase tracking-wider mb-2">
                      Key Execution Actions:
                    </div>
                    <div className="space-y-1.5">
                      {step.actions.map((action, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">
                            arrow_right_alt
                          </span>
                          <span className="font-body text-body-xs text-white/80">
                            {action}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                    <div className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                      System State & Deliverable:
                    </div>
                    <div className="font-body text-body-xs text-primary font-medium">
                      {step.outputTag}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
