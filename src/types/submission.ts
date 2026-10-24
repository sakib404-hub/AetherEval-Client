export interface RawSubmissionStudent {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RawBackendSubmission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  reviewComment: string | null;
  rejectionReason: string | null;
  reviewedAt: string | null;
  studentId: string;
  reviewedById: string | null;
  createdAt: string;
  updatedAt: string;
  student?: RawSubmissionStudent;
}

export interface GetMySubmissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RawBackendSubmission[];
}
