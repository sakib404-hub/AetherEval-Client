import { ProfileSkeleton } from "@/app/_components/profile/ProfileSkeleton";

export default function ProfileLoading() {
  return (
    <main className="w-full flex-1">
      <ProfileSkeleton />
    </main>
  );
}
