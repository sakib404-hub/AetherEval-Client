"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { GetMySubmissionsResponse, RawBackendSubmission } from "@/types/submission";

export interface GetMySubmissionsResult {
  success: boolean;
  statusCode: number;
  message: string;
  data: RawBackendSubmission[];
}

export async function getMySubmissions(): Promise<GetMySubmissionsResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        message: "You are not logged in. Please log in to view your submissions.",
        data: [],
      };
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(`${backendUrl}/api/v1/submission/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result: GetMySubmissionsResponse = await res.json();

    if (result.success && Array.isArray(result.data)) {
      return {
        success: true,
        statusCode: result.statusCode || 200,
        message: result.message || "Submissions retrieved successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Failed to retrieve submissions from server.",
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Network error while connecting to evaluation API.",
      data: [],
    };
  }
}
