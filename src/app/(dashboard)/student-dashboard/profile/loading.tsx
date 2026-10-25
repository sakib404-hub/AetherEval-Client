import { ProfileSkeleton } from "@/app/_components/profile/ProfileSkeleton";

export default function StudentProfileLoading() {
  return (
    <main className="w-full flex-1">
      <ProfileSkeleton />
    </main>
  );
}
