"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Milestone {
  step: string;
  timeTag: string;
  title: string;
  role: string;
  icon: string;
  description: string;
  keyDeliverable: string;
  systemState: string;
  accentColor: string;
  borderHover: string;
  badgeBg: string;
}

const MILESTONES: Milestone[] = [
  {
    step: "01",
    timeTag: "T - 0 • 2 Mins",
    title: "Account Genesis & Identity",
    role: "Students & Mentor Applicants",
    icon: "how_to_reg",
    description:
      "Select platform role and authenticate. Student accounts activate instantly; mentors submit professional credentials for faculty audit.",
    keyDeliverable: "Authenticated JWT session & role clearance",
    systemState: "Student: ACTIVE • Mentor: PENDING_VETTING",
    accentColor: "from-purple-500 to-indigo-500",
    borderHover: "hover:border-purple-400/60 hover:shadow-[0_0_36px_rgba(168,85,247,0.35)]",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
  {
    step: "02",
    timeTag: "T + 1 • 5 Mins",
    title: "Dual-Artifact Dispatch",
    role: "Student Builder",
    icon: "cloud_upload",
    description:
      "Submit project repository and live application demo URL. Both artifacts are anchored simultaneously for parallel code and runtime inspection.",
    keyDeliverable: "Public Git repository + 200 OK deployment URL",
    systemState: "Queue State: PENDING",
    accentColor: "from-indigo-500 to-cyan-500",
    borderHover: "hover:border-cyan-400/60 hover:shadow-[0_0_36px_rgba(6,182,212,0.35)]",
    badgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  {
    step: "03",
    timeTag: "T + 2 • 24–48 Hours",
    title: "Double-Blind Peer Review",
    role: "Accredited Review Mentor",
    icon: "fact_check",
    description:
      "Vetted mentors evaluate codebase architecture, test runtime behavior, and author multi-criteria audit notes with zero demographic bias.",
    keyDeliverable: "Code quality score, runtime inspection & critique",
    systemState: "Review State: IN_EVALUATION",
    accentColor: "from-cyan-500 to-amber-500",
    borderHover: "hover:border-amber-400/60 hover:shadow-[0_0_36px_rgba(245,158,11,0.35)]",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  {
    step: "04",
    timeTag: "T + 3 • Real-Time",
    title: "Consensus Verdict Resolution",
    role: "Evaluation Consensus Ledger",
    icon: "verified",
    description:
      "Binding consensus verdict is recorded. Approved projects are permanently locked; rejected submissions receive actionable revision directives.",
    keyDeliverable: "Commendation certificate or resubmission gateway",
    systemState: "Final State: APPROVED or REJECTED",
    accentColor: "from-amber-500 to-emerald-500",
    borderHover: "hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
];

// SVG S-Curve Path connecting the nodes
const SVG_CURVE_D =
  "M 280 140 C 500 140, 500 410, 720 410 C 500 410, 500 680, 280 680 C 500 680, 500 950, 720 950";

export function CurvyWorkflowRoad() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked progress for drawing the glowing laser curve
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      aria-label="Curvy Evaluation Roadmap"
      className="w-full max-w-5xl mx-auto my-12 relative px-4"
    >
      {/* Background Curvy Glowing S-Curve SVG Highway (Desktop) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="curvyRoadGradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="35%" stopColor="#818cf8" />
              <stop offset="70%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Guide Path (Muted Dashed Track) */}
          <path
            d={SVG_CURVE_D}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 8"
          />

          {/* Glowing Aura Beam Behind Curve (Scroll-Animated) */}
          <motion.path
            d={SVG_CURVE_D}
            stroke="url(#curvyRoadGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            className="opacity-40 blur-md"
            style={{
              pathLength: smoothProgress,
            }}
          />

          {/* Laser Core Curve (Progressively Drawn on Scroll) */}
          <motion.path
            d={SVG_CURVE_D}
            stroke="url(#curvyRoadGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#laserGlow)"
            style={{
              pathLength: smoothProgress,
            }}
          />
        </svg>
      </div>

      {/* Mobile Vertical Glowing Line (Scroll-Animated) */}
      <div className="lg:hidden absolute left-8 top-10 bottom-10 w-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-purple-500 via-cyan-400 to-emerald-400 origin-top shadow-[0_0_12px_rgba(124,58,237,0.8)]"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {/* Alternating Curvy Milestone Cards */}
      <div className="flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 relative z-10">
        {MILESTONES.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <motion.div
              key={item.step}
              initial={{
                opacity: 0,
                y: 36,
                x: isEven ? 36 : -36,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Circular Curved Milestone Node with Breathing Halo */}
              <div className="relative shrink-0 flex items-center justify-center group cursor-default">
                {/* Continuous Ambient Breathing Halo */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr ${item.accentColor} blur-xl pointer-events-none`}
                />

                <motion.div
                  whileHover={{ scale: 1.12, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#120d24] border-2 border-white/25 flex flex-col items-center justify-center shadow-[0_0_28px_rgba(0,0,0,0.8)] relative z-10 transition-colors group-hover:border-white/50"
                >
                  <span className="font-headline text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-white via-white to-primary">
                    {item.step}
                  </span>
                  <span className="text-[9px] font-mono text-outline uppercase tracking-wider font-semibold">
                    Step
                  </span>
                </motion.div>
              </div>

              {/* Curved Organic Glass Card with Smooth Kinetic Hover */}
              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className={`w-full lg:w-[460px] rounded-[32px] p-6 sm:p-7 bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-2xl border border-white/10 ${item.borderHover} shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Header with pill & role */}
                <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-headline font-semibold border ${item.badgeBg}`}
                  >
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    <span>{item.timeTag}</span>
                  </span>

                  <span className="text-[11px] font-headline font-medium text-outline">
                    {item.role}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Essential Action Copy */}
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Deliverable & State Chips */}
                <div className="pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-white/90 font-headline">
                    <span className="material-symbols-outlined text-sm text-primary">task_alt</span>
                    <span className="truncate">{item.keyDeliverable}</span>
                  </div>
                  <div className="font-mono text-[10px] text-outline self-start sm:self-auto bg-black/40 px-2.5 py-0.5 rounded-full border border-white/5">
                    {item.systemState}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
