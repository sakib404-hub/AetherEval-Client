import { getMySubmissions } from "@/app/_actions/submissions/getMySubmissions";
import { ResubmitPageContainer } from "@/app/_components/student/resubmit/ResubmitPageContainer";

export default async function StudentResubmitPage() {
  const result = await getMySubmissions();

  return (
    <main className="w-full flex-1">
      <ResubmitPageContainer
        initialSubmissions={result.data}
        initialError={result.success ? null : result.message}
      />
    </main>
  );
}
