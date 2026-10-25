"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { StatusBadge } from "../ui/StatusBadge";
import { GlassButton } from "../ui/GlassButton";

interface RoleCardItem {
  id: string;
  role: string;
  title: string;
  badge: string;
  badgeVariant: "node" | "info" | "approved";
  icon: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const ROLES: RoleCardItem[] = [
  {
    id: "student",
    role: "STUDENT",
    title: "Project Builder Node",
    badge: "Instant Access",
    badgeVariant: "node",
    icon: "school",
    description:
      "Submit capstone and research repositories, provide live demo URLs, and track evaluation milestones with full transparency.",
    features: [
      "Instant student account registration",
      "Git repository & live deployment linking",
      "Real-time status tracking (Pending, Approved, Rejected)",
      "Actionable mentor critique and feedback review",
    ],
    ctaLabel: "Register as Student",
    ctaHref: "/register?role=student",
  },
  {
    id: "mentor",
    role: "MENTOR",
    title: "Domain Review Mentor",
    badge: "Admin Vetted",
    badgeVariant: "info",
    icon: "supervisor_account",
    description:
      "Evaluate student codebase architecture and live application performance along standardized rubrics with constructive guidance.",
    features: [
      "Expertise and portfolio qualification review",
      "Double-blind peer evaluation queue",
      "Comprehensive code & deployment inspection",
      "Constructive approval notes or revision directives",
    ],
    ctaLabel: "Apply as Mentor",
    ctaHref: "/register?role=mentor",
  },
  {
    id: "admin",
    role: "ADMINISTRATOR",
    title: "Platform Governance",
    badge: "System Authority",
    badgeVariant: "approved",
    icon: "admin_panel_settings",
    description:
      "Audit mentor applications, maintain peer review integrity, and inspect aggregate platform analytics across departments.",
    features: [
      "Review & activate pending mentor candidates",
      "Enforce academic evaluation standards",
      "Live submission throughput & SLA analytics",
      "Rejection reason auditing and compliance",
    ],
    ctaLabel: "Admin Access",
    ctaHref: "/login",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function RoleArchitectureSection() {
  return (
    <section aria-labelledby="role-architecture-heading" className="w-full max-w-6xl mx-auto mb-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
            System Ecosystem
          </div>
          <h2
            id="role-architecture-heading"
            className="font-headline text-2xl sm:text-3xl md:text-headline-md font-bold text-white tracking-tight"
          >
            Three Specialized Platform Roles
          </h2>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant max-w-md">
          AetherEval balances builder submissions, vetted evaluator scoring, and administrative governance to preserve academic excellence.
        </p>
      </div>

      {/* Role Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {ROLES.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{
              y: -6,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            className="h-full flex flex-col"
          >
            <GlassCard
              interactive
              level={2}
              className="p-6 flex flex-col justify-between h-full group border-white/10 hover:border-primary/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_16px_rgba(124,58,237,0.3)]">
                    <span className="material-symbols-outlined text-2xl">
                      {item.icon}
                    </span>
                  </div>
                  <StatusBadge variant={item.badgeVariant} label={item.badge} />
                </div>

                <div className="text-[10px] font-headline font-bold uppercase tracking-wider text-primary mb-1">
                  {item.role}
                </div>
                <h3 className="font-headline text-headline-sm font-semibold text-white group-hover:text-primary transition-colors mb-2.5">
                  {item.title}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Functional features list */}
                <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <span className="font-body text-body-xs text-white/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link href={item.ctaHref} className="block w-full">
                  <GlassButton
                    variant="frosted"
                    size="sm"
                    className="w-full justify-center group-hover:border-primary/50 group-hover:text-white"
                    icon="arrow_forward"
                    iconPosition="right"
                  >
                    {item.ctaLabel}
                  </GlassButton>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
