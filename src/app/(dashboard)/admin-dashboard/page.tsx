import { getAllMentors } from "@/app/_actions/admin/getAllMentors";
import { getAdminStats } from "@/app/_actions/admin/getAdminStats";
import { AdminDashboardContainer } from "@/app/_components/admin/AdminDashboardContainer";

export default async function AdminDashboardPage() {
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
