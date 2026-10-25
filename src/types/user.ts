export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN" | string;
  status?: string;
  bio?: string | null;
  expertise?: string | string[] | null;
  portfolioUrl?: string | null;
  rejectionReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface GetProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfileData;
}
