import { AuthCardSkeleton } from "../_components/auth/AuthCardSkeleton";

export default function RegisterLoading() {
  return (
    <main className="w-full flex-1 flex items-center justify-center px-4 sm:px-6 py-6 md:py-10">
      <AuthCardSkeleton />
    </main>
  );
}
