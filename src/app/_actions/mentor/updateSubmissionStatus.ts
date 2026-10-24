"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface UpdateSubmissionStatusPayload {
  submissionId: string;
  status: "APPROVED" | "REJECTED" | "PENDING" | string;
  reviewComment?: string;
  rejectionReason?: string;
}

export interface UpdateSubmissionStatusResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function updateSubmissionStatus(
  payload: UpdateSubmissionStatusPayload
): Promise<UpdateSubmissionStatusResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be authenticated as a mentor to perform this action.",
      };
    }

    if (!payload.submissionId || payload.submissionId.trim().length === 0) {
      return {
        success: false,
        message: "Submission ID is required.",
      };
    }

    const normalizedStatus = payload.status.toUpperCase();

    const requestBody: Record<string, string> = {
      status: normalizedStatus,
    };

    if (payload.reviewComment && payload.reviewComment.trim().length > 0) {
      requestBody.reviewComment = payload.reviewComment.trim();
    }

    if (payload.rejectionReason && payload.rejectionReason.trim().length > 0) {
      requestBody.rejectionReason = payload.rejectionReason.trim();
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(
      `${backendUrl}/api/v1/mentor/update-submission-status/${payload.submissionId.trim()}`,
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
      revalidatePath("/mentor-dashboard");
      revalidatePath("/(dashboard)/mentor-dashboard", "page");
      revalidatePath("/student-dashboard");
      revalidatePath("/(dashboard)/student-dashboard", "page");
      revalidatePath("/", "layout");

      return {
        success: true,
        message: result.message || `Submission status updated to ${normalizedStatus}.`,
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update submission status.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error while updating submission status.",
    };
  }
}
