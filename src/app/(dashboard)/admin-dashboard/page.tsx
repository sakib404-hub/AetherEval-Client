import type { Metadata } from "next";
import { getAdminStats } from "@/app/_actions/admin/getAdminStats";
import { getAllMentors } from "@/app/_actions/admin/getAllMentors";
import { AdminOverviewContainer } from "@/app/_components/admin/overview/AdminOverviewContainer";

export const metadata: Metadata = {
  title: "Admin Executive Dashboard — AetherEval Platform Analytics",
  description:
    "Executive administration dashboard displaying real-time platform telemetry, submission velocity, mentor accreditation funnels, and consensus gauge analytics.",
};

export default async function AdminDashboardOverviewPage() {
  const [statsResult, mentorsResult] = await Promise.all([
    getAdminStats(),
    getAllMentors(),
  ]);

  const stats = statsResult.data;
  const mentors = mentorsResult.data || [];

  return (
    <main className="w-full flex-1 max-w-7xl mx-auto pb-20">
      <AdminOverviewContainer
        initialStats={stats}
        initialMentors={mentors}
      />
    </main>
  );
}