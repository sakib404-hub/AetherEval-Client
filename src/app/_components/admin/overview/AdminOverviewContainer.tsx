"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminStatsData, RawBackendMentor } from "@/types/admin";
import { resolveAdminMetrics } from "./admin-data-helpers";
import { AdminOverviewContextBar } from "./AdminOverviewContextBar";
import { AdminKpiGrid } from "./AdminKpiGrid";
import { AdminThroughputAreaChart } from "./AdminThroughputAreaChart";
import { AdminSubmissionsDonutChart } from "./AdminSubmissionsDonutChart";
import { AdminMentorDistributionChart } from "./AdminMentorDistributionChart";
import { AdminConsensusGaugeChart } from "./AdminConsensusGaugeChart";
import { AdminOperationsTable } from "./AdminOperationsTable";

interface AdminOverviewContainerProps {
  initialStats: AdminStatsData | null;
  initialMentors: RawBackendMentor[];
}

export function AdminOverviewContainer({
  initialStats,
  initialMentors,
}: AdminOverviewContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [stats] = useState<AdminStatsData | null>(initialStats);
  const [mentors] = useState<RawBackendMentor[]>(initialMentors);

  // Compute 100% mathematically real metrics
  const metrics = resolveAdminMetrics(stats, mentors);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Executive Context Bar */}
      <AdminOverviewContextBar
        metrics={metrics}
        onRefresh={handleRefresh}
        isRefreshing={isPending}
      />

      {/* Top 4 Real KPI Cards */}
      <AdminKpiGrid metrics={metrics} />

      {/* Real Platform Telemetry (Onboarding Timeline & Discipline Distribution) */}
      <AdminThroughputAreaChart mentors={mentors} metrics={metrics} />

      {/* 3-Column Visual Charts Row (Real Data Distributions) */}
      <section
        aria-label="Distribution and Consensus Analytics"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Real Submissions Donut Breakdown */}
        <AdminSubmissionsDonutChart metrics={metrics} />

        {/* Real Mentor Accreditation Funnel */}
        <AdminMentorDistributionChart metrics={metrics} />

        {/* Real Ecosystem Consensus Radial Gauge */}
        <AdminConsensusGaugeChart metrics={metrics} />
      </section>

      {/* Real Live Evaluators Application & Operations Log */}
      <AdminOperationsTable recentMentors={mentors} />
    </div>
  );
}