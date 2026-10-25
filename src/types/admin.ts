export interface RawBackendMentor {
  id: string;
  name: string;
  email: string;
  role: "MENTOR" | string;
  status: "PENDING_APPROVAL" | "ACTIVE" | "APPROVED" | "REJECTED" | string;
  expertise: string | string[] | null;
  bio: string | null;
  portfolioUrl: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackendAdminStatsUsersStudents {
  total: number;
  active: number;
}

export interface BackendAdminStatsUsersMentors {
  total: number;
  active: number;
  pendingApproval: number;
  rejected: number;
  blocked?: number;
}

export interface BackendAdminStatsUsers {
  total: number;
  students: BackendAdminStatsUsersStudents;
  mentors: BackendAdminStatsUsersMentors;
}

export interface BackendAdminStatsSubmissions {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface AdminStatsData {
  users?: BackendAdminStatsUsers;
  submissions?: BackendAdminStatsSubmissions;
  // Backward compatibility flat properties
  totalMentors?: number;
  pendingMentors?: number;
  activeMentors?: number;
  rejectedMentors?: number;
  totalSubmissions?: number;
  pendingSubmissions?: number;
  approvedSubmissions?: number;
  rejectedSubmissions?: number;
  totalStudents?: number;
  approvalRate?: string | number;
  [key: string]: unknown;
}

export interface GetAllMentorsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RawBackendMentor[];
}

export interface GetAdminStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminStatsData;
}
