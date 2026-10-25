"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { RawBackendMentor, GetAllMentorsResponse } from "@/types/admin";

export interface GetAllMentorsResult {
  success: boolean;
  statusCode: number;
  message: string;
  data: RawBackendMentor[];
}

export async function getAllMentors(): Promise<GetAllMentorsResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        statusCode: 401,
        message: "You are not logged in. Please log in with admin credentials.",
        data: [],
      };
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(`${backendUrl}/api/v1/admin/get-all-mentors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result: GetAllMentorsResponse = await res.json();

    if (result.success && Array.isArray(result.data)) {
      return {
        success: true,
        statusCode: result.statusCode || 200,
        message: result.message || "Mentors retrieved successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      statusCode: result.statusCode || res.status,
      message: result.message || "Failed to retrieve mentors from server.",
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Network error while connecting to admin endpoint.",
      data: [],
    };
  }
}
