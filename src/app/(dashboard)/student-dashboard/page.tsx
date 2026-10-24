import { getMySubmissions } from "@/app/_actions/submissions/getMySubmissions";
import { HistoryPageContainer } from "@/app/_components/history/HistoryPageContainer";

export default async function StudentDashboardPage() {
  const result = await getMySubmissions();

  return (
    <main className="w-full flex-1">
      <HistoryPageContainer
        initialSubmissions={result.data}
        initialError={result.success ? null : result.message}
      />
    </main>
  );
}
