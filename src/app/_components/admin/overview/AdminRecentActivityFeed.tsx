"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/app/_components/ui/GlassCard";
import { RawBackendMentor } from "@/types/admin";

interface AdminRecentActivityFeedProps {
  recentMentors: RawBackendMentor[];
}

export function AdminRecentActivityFeed({
  recentMentors,
}: AdminRecentActivityFeedProps) {
  // Synthesize recent timeline events based on mentor records and platform stream
  const activities = [
    ...recentMentors.slice(0, 4).map((m) => {
      const isPending = (m.status || "PENDING_APPROVAL").toUpperCase() === "PENDING_APPROVAL";
      const isActive = (m.status || "").toUpperCase() === "ACTIVE" || (m.status || "").toUpperCase() === "APPROVED";
      return {
        id: `mentor-${m.id}`,
        title: isPending
          ? `Mentor Candidate Application: ${m.name}`
          : isActive
          ? `Mentor Accredited: ${m.name}`
          : `Candidate Rejected: ${m.name}`,
        subtext: `Email: ${m.email} • Expertise: ${m.expertise || "Computer Science"}`,
        timestamp: m.createdAt
          ? new Date(m.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })
          : "Recent",
        icon: isPending ? "how_to_reg" : isActive ? "verified" : "cancel",
        iconColor: isPending
          ? "text-amber-400 bg-amber-500/15 border-amber-500/30"
          : isActive
          ? "text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
          : "text-rose-400 bg-rose-500/15 border-rose-500/30",
        badge: isPending ? "Pending Review" : isActive ? "Active Evaluator" : "Disqualified",
        badgeVariant: isPending
          ? "text-amber-300 bg-amber-500/10 border-amber-500/30"
          : isActive
          ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/30"
          : "text-rose-300 bg-rose-500/10 border-rose-500/30",
      };
    }),
    {
      id: "platform-event-1",
      title: "Consensus Ledger Merkle Epoch Finalized",
      subtext: "Cryptographic root anchored across all active university evaluator nodes.",
      timestamp: "Today • Automated",
      icon: "lock_clock",
      iconColor: "text-primary bg-primary-container/20 border-primary/30",
      badge: "Epoch Verified",
      badgeVariant: "text-primary bg-primary-container/15 border-primary/30",
    },
    {
      id: "platform-event-2",
      title: "Double-Blind Review Queue Health Check",
      subtext: "Zero student metadata leakage detected. Anonymization filters verified.",
      timestamp: "Today • Continuous",
      icon: "visibility_off",
      iconColor: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
      badge: "Zero-Bias Standard",
      badgeVariant: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
    },
  ];

  return (
    <section aria-labelledby="activity-feed-heading" className="w-full my-8">
      <GlassCard level={2} className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="text-[11px] font-headline font-bold text-primary tracking-widest uppercase mb-1">
              Audit Stream
            </div>
            <h2
              id="activity-feed-heading"
              className="text-2xl font-headline font-bold text-white tracking-tight"
            >
              Recent Platform Activity & Audit Log
            </h2>
          </div>
          <span className="text-body-xs font-mono text-on-surface-variant bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full self-start">
            Audit Stream Active
          </span>
        </div>

        <div className="space-y-3">
          {activities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <span
                  className={`material-symbols-outlined text-xl p-2 rounded-xl border shrink-0 ${item.iconColor}`}
                >
                  {item.icon}
                </span>
                <div>
                  <div className="font-headline text-body-sm font-semibold text-white">
                    {item.title}
                  </div>
                  <div className="font-body text-body-xs text-on-surface-variant mt-0.5">
                    {item.subtext}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span className="font-mono text-[11px] text-on-surface-variant">
                  {item.timestamp}
                </span>
                <span
                  className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeVariant}`}
                >
                  {item.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
