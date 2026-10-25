import type { Metadata } from "next";
import { getAllSubmissions } from "@/app/_actions/mentor/getAllSubmissions";
import { AdminReviewsContainer } from "@/app/_components/admin/reviews/AdminReviewsContainer";

export const metadata: Metadata = {
  title: "Submission Reviews & Consensus — AetherEval Administrator",
  description:
    "Supervise, audit, approve, or reject student project submissions across all university tracks with administrative consensus authority.",
};

export default async function AdminReviewsPage() {
  const submissionsResult = await getAllSubmissions();

  return (
    <main className="w-full flex-1">
      <AdminReviewsContainer
        initialSubmissions={submissionsResult.data}
        initialError={
          submissionsResult.success ? null : submissionsResult.message
        }
      />
    </main>
  );
}
