import { getAllSubmissions } from "@/app/_actions/mentor/getAllSubmissions";
import { MentorDashboardContainer } from "@/app/_components/mentor/MentorDashboardContainer";

export default async function MentorDashboardPage() {
  const result = await getAllSubmissions();

  return (
    <main className="w-full flex-1">
      <MentorDashboardContainer
        initialSubmissions={result.data}
        initialError={result.success ? null : result.message}
      />
    </main>
  );
}
