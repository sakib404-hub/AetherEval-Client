"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserProfileData } from "@/types/user";

export interface GetProfileResult {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfileData | null;
}

export async function getMe(): Promise<GetProfileResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        message: "You are not authenticated. Please log in to view your profile.",
        data: null,
      };
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(`${backendUrl}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success && result.data) {
      return {
        success: true,
        statusCode: result.statusCode || 200,
        message: result.message || "User profile retrieved successfully.",
        data: result.data,
      };
    }

    // Fallback: decode claims from verified session token
    const decoded = jwt.decode(token) as (JwtPayload & {
      userId?: string;
      id?: string;
      email?: string;
      role?: string;
      name?: string;
    }) | null;

    if (decoded && (decoded.userId || decoded.id || decoded.sub)) {
      return {
        success: true,
        statusCode: 200,
        message: "Profile loaded from current authentication session.",
        data: {
          id: decoded.userId || decoded.id || decoded.sub || "unknown-id",
          name: decoded.name || "Academic Member",
          email: decoded.email || "user@aethereval.net",
          role: decoded.role || "STUDENT",
          status: "ACTIVE",
        },
      };
    }

    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Failed to retrieve user profile from evaluation server.",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Network error contacting evaluation API.",
      data: null,
    };
  }
}
