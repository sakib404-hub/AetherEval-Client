import { Suspense } from "react";
import { getAuthSession } from "@/app/_actions/auth/getAuthSession";
import { FloatingDock } from "./FloatingDock";

async function FloatingDockSessionLoader() {
  const session = await getAuthSession();
  return <FloatingDock initialSession={session} />;
}

export function FloatingDockWrapper() {
  return (
    <Suspense fallback={<FloatingDock />}>
      <FloatingDockSessionLoader />
    </Suspense>
  );
}
