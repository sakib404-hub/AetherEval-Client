"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CreateSubmissionPayload {
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
}

export interface CreateSubmissionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function createSubmission(
  payload: CreateSubmissionPayload
): Promise<CreateSubmissionResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "You must be logged in to submit a project.",
      };
    }

    const decoded = jwt.decode(token) as (JwtPayload & { userId?: string; id?: string; sub?: string }) | null;
    const studentId = decoded?.userId || decoded?.id || decoded?.sub;

    if (!studentId) {
      return {
        success: false,
        message: "Unable to verify student credentials from current session.",
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
    const res = await fetch(`${backendUrl}/api/v1/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        projectName: payload.projectName.trim(),
        repoUrl: payload.repoUrl.trim(),
        liveLink: payload.liveLink.trim(),
        description: payload.description.trim(),
        studentId: studentId,
      }),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/student-dashboard");
      revalidatePath("/(dashboard)/student-dashboard", "page");
      revalidatePath("/", "layout");
      return {
        success: true,
        message: result.message || "Project submitted successfully.",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Submission failed. Please check the fields and try again.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Network error while submitting project.",
    };
  }
}
