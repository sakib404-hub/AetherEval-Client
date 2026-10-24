"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  const cookieStore = await cookies();

  // Remove cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  // Explicit zero-age expiration to guarantee instant browser purging
  cookieStore.set("accessToken", "", {
    maxAge: 0,
    path: "/",
  });
  cookieStore.set("refreshToken", "", {
    maxAge: 0,
    path: "/",
  });

  // Purge router cache to prevent stale auth state
  revalidatePath("/", "layout");

  redirect("/login");
};
