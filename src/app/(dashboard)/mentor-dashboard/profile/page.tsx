import { getMe } from "@/app/_actions/auth/getMe";
import { ProfileContainer } from "@/app/_components/profile/ProfileContainer";

export default async function MentorProfilePage() {
  const result = await getMe();

  return (
    <main className="w-full flex-1">
      <ProfileContainer
        initialProfile={result.data}
        initialError={result.success ? null : result.message}
      />
    </main>
  );
}
