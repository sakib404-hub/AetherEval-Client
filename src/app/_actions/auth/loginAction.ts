"use server";

import { config } from "@/config/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface LoginActionResult {
  success?: boolean;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      role?: string;
      email?: string;
      id?: string;
      name?: string;
    };
    [key: string]: unknown;
  };
  role?: string;
  [key: string]: unknown;
}

export const loginAction = async (
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payLoad = {
    email: email,
    password: password,
  };

  try {
    const res = await fetch(`${config.urls.backendUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });

    const result = await res.json();

    if (result.success && result.data?.accessToken) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      const decoded = jwt.decode(result.data.accessToken) as (JwtPayload & { role?: string }) | null;
      const role = (decoded?.role || result.data?.user?.role || result.data?.role || "").toUpperCase();

      if (role) {
        cookieStore.set("userRole", role, {
          httpOnly: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
          path: "/",
        });
      }

      revalidatePath("/", "layout");

      return {
        success: true,
        message: result.message || "Authentication successful.",
        role,
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message || "Invalid academic credentials. Please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Authentication request failed",
    };
  }
};
