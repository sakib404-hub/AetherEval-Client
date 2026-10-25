import type { Metadata } from "next";
import { getAllMentors } from "@/app/_actions/admin/getAllMentors";
import { getAdminStats } from "@/app/_actions/admin/getAdminStats";
import { AdminDashboardContainer } from "@/app/_components/admin/AdminDashboardContainer";

export const metadata: Metadata = {
  title: "Mentor Accreditation Queue — AetherEval Administrator",
  description:
    "Audit, verify, and approve academic mentor applications across university faculties.",
};

export default async function AdminMentorsPage() {
  const [mentorsResult, statsResult] = await Promise.all([
    getAllMentors(),
    getAdminStats(),
  ]);

  return (
    <main className="w-full flex-1">
      <AdminDashboardContainer
        initialMentors={mentorsResult.data}
        initialStats={statsResult.data}
        initialError={
          mentorsResult.success ? null : mentorsResult.message
        }
      />
    </main>
  );
}
