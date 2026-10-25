"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface UpdateMentorStatusPayload {
  mentorId: string;
  status: "APPROVED" | "REJECTED" | "ACTIVE" | string;
  rejectionReason?: string;
}

export interface UpdateMentorStatusResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function updateMentorStatus(
  payload: UpdateMentorStatusPayload
): Promise<UpdateMentorStatusResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be logged in as an administrator to perform this action.",
      };
    }

    if (!payload.mentorId || payload.mentorId.trim().length === 0) {
      return {
        success: false,
        message: "Mentor ID is required.",
      };
    }

    const normalizedStatus = payload.status.toUpperCase();

    const requestBody: Record<string, string> = {
      status: normalizedStatus,
    };

    if (payload.rejectionReason && payload.rejectionReason.trim().length > 0) {
      requestBody.rejectionReason = payload.rejectionReason.trim();
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(
      `${backendUrl}/api/v1/admin/update-mentor-status/${payload.mentorId.trim()}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await res.json();

    if (result.success) {
      revalidatePath("/admin-dashboard");
      revalidatePath("/(dashboard)/admin-dashboard", "page");
      revalidatePath("/mentor-dashboard");
      revalidatePath("/", "layout");

      return {
        success: true,
        message: result.message || `Mentor status updated to ${normalizedStatus}.`,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update mentor status.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error while updating mentor status.",
    };
  }
}
