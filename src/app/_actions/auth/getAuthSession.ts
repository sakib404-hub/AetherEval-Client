"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthSession {
  isAuthenticated: boolean;
  role: "STUDENT" | "MENTOR" | "ADMIN" | string | null;
  dashboardHref: string | null;
}

export async function getAuthSession(): Promise<AuthSession> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        isAuthenticated: false,
        role: null,
        dashboardHref: null,
      };
    }

    const decoded = jwt.decode(token) as (JwtPayload & { role?: string }) | null;
    const role = (decoded?.role || "").toUpperCase();

    if (!role) {
      return {
        isAuthenticated: false,
        role: null,
        dashboardHref: null,
      };
    }

    const dashboardHref =
      role === "ADMIN"
        ? "/admin-dashboard"
        : role === "MENTOR"
        ? "/mentor-dashboard"
        : "/student-dashboard";

    return {
      isAuthenticated: true,
      role,
      dashboardHref,
    };
  } catch {
    return {
      isAuthenticated: false,
      role: null,
      dashboardHref: null,
    };
  }
}
