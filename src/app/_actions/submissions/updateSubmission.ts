"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface UpdateSubmissionPayload {
  submissionId: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
}

export interface UpdateSubmissionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function updateSubmission(
  payload: UpdateSubmissionPayload
): Promise<UpdateSubmissionResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to update or resubmit a project.",
      };
    }

    if (!payload.submissionId || payload.submissionId.trim().length === 0) {
      return {
        success: false,
        message: "Submission ID is required.",
      };
    }

    if (!payload.projectName || payload.projectName.trim().length === 0) {
      return {
        success: false,
        message: "Project name is required.",
      };
    }

    if (!payload.repoUrl || payload.repoUrl.trim().length === 0) {
      return {
        success: false,
        message: "Repository URL is required.",
      };
    }

    if (!payload.liveLink || payload.liveLink.trim().length === 0) {
      return {
        success: false,
        message: "Live deployment URL is required.",
      };
    }

    if (!payload.description || payload.description.trim().length === 0) {
      return {
        success: false,
        message: "Project description is required.",
      };
    }

    const backendUrl = config.urls.backendUrl || "https://aethar-eval.vercel.app";
    const res = await fetch(`${backendUrl}/api/v1/submission/${payload.submissionId.trim()}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        projectName: payload.projectName.trim(),
        repoUrl: payload.repoUrl.trim(),
        liveLink: payload.liveLink.trim(),
        description: payload.description.trim(),
      }),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/student-dashboard");
      revalidatePath("/(dashboard)/student-dashboard", "page");
      revalidatePath("/student-dashboard/resubmit");
      revalidatePath("/(dashboard)/student-dashboard/resubmit", "page");
      revalidatePath("/mentor-dashboard");
      revalidatePath("/(dashboard)/mentor-dashboard", "page");
      revalidatePath("/admin-dashboard/reviews");
      revalidatePath("/(dashboard)/admin-dashboard/reviews", "page");
      revalidatePath("/", "layout");

      return {
        success: true,
        message: result.message || "Submission updated and re-queued for evaluation successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to update submission. Please check your inputs.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error while connecting to evaluation API.",
    };
  }
}
