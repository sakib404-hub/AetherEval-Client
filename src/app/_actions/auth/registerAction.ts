"use server";

import { config } from "@/config/config";

export interface RegisterActionResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface RegisterPayload {
  role: "student" | "mentor";
  name: string;
  email: string;
  password: string;
  expertise?: string;
  bio?: string;
  portfolioUrl?: string;
}

export const registerAction = async (
  prevState: RegisterActionResult | null,
  formData: FormData
): Promise<RegisterActionResult> => {
  const role = (formData.get("role") as string) || "student";
  const name = (formData.get("name") as string) || (formData.get("fullName") as string);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || name.trim().length === 0) {
    return {
      success: false,
      message: "Full name is required.",
    };
  }

  if (!email || email.trim().length === 0) {
    return {
      success: false,
      message: "Email address is required.",
    };
  }

  if (!password || password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (confirmPassword && password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match. Please verify your passkeys.",
    };
  }

  
  const isMentor = role === "mentor";
  const endpoint = isMentor
    ? `${config.urls.backendUrl}/api/v1/mentor/register-as-mentor`
    : `${config.urls.backendUrl}/api/v1/auth/signup`;

  const body: Record<string, string> = {
    name: name.trim(),
    email: email.trim(),
    password: password,
  };

  if (isMentor) {
    const expertise = formData.get("expertise") as string;
    const portfolioUrl =
      (formData.get("portfolioUrl") as string) || (formData.get("portfolio") as string);
    const bio = formData.get("bio") as string;

    if (!expertise || expertise.trim().length === 0) {
      return {
        success: false,
        message: "Area of expertise is required for mentor registration.",
      };
    }

    if (!portfolioUrl || portfolioUrl.trim().length === 0) {
      return {
        success: false,
        message: "Portfolio or GitHub URL is required for mentor registration.",
      };
    }

    if (!bio || bio.trim().length === 0) {
      return {
        success: false,
        message: "Short bio is required for mentor registration.",
      };
    }

    body.expertise = expertise.trim();
    body.portfolioUrl = portfolioUrl.trim();
    body.bio = bio.trim();
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        message:
          result.message ||
          (isMentor
            ? "Mentor application submitted successfully."
            : "Student account created successfully."),
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Registration request failed. Please check your inputs.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Network error during registration. Please try again.",
    };
  }
};
