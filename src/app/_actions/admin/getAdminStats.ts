"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { AdminStatsData, GetAdminStatsResponse } from "@/types/admin";

export interface GetAdminStatsResult {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminStatsData | null;
}

export async function getAdminStats(): Promise<GetAdminStatsResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        message: "You are not logged in. Please log in with admin credentials.",
        data: null,
      };
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(`${backendUrl}/api/v1/admin/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result: GetAdminStatsResponse = await res.json();

    if (result.success && result.data) {
      return {
        success: true,
        statusCode: result.statusCode || 200,
        message: result.message || "Admin statistics retrieved successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Failed to retrieve statistics from server.",
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Network error while connecting to stats endpoint.",
      data: null,
    };
  }
}
