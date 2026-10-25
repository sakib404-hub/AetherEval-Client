import { AdminStatsData, RawBackendMentor } from "@/types/admin";

export interface ResolvedAdminMetrics {
  totalUsers: number;
  totalStudents: number;
  activeStudents: number;
  totalSubmissions: number;
  approvedSubmissions: number;
  pendingSubmissions: number;
  rejectedSubmissions: number;
  totalMentors: number;
  activeMentors: number;
  pendingMentors: number;
  rejectedMentors: number;
  approvalRate: string;
  approvalRateNumeric: number;
  studentToMentorRatio: string;
}

export interface ExpertiseItem {
  discipline: string;
  count: number;
  percentage: number;
}

export interface TimelineDataPoint {
  dateLabel: string;
  dailyCount: number;
  cumulativeCount: number;
}

export function resolveAdminMetrics(
  stats: AdminStatsData | null,
  mentors: RawBackendMentor[]
): ResolvedAdminMetrics {
  // Count real status from mentors array as fallback
  const activeFromMentors = mentors.filter((m) => {
    const s = (m.status || "").toUpperCase();
    return s === "ACTIVE" || s === "APPROVED";
  }).length;

  const pendingFromMentors = mentors.filter((m) => {
    const s = (m.status || "PENDING_APPROVAL").toUpperCase();
    return s === "PENDING_APPROVAL";
  }).length;

  const rejectedFromMentors = mentors.filter((m) => {
    const s = (m.status || "").toUpperCase();
    return s === "REJECTED";
  }).length;

  // 1. Mentors - Extract from real nested stats: stats.users.mentors
  const nestedMentors = stats?.users?.mentors;
  const activeMentors =
    nestedMentors?.active !== undefined
      ? Number(nestedMentors.active)
      : stats?.activeMentors !== undefined
      ? Number(stats.activeMentors)
      : activeFromMentors;

  const pendingMentors =
    nestedMentors?.pendingApproval !== undefined
      ? Number(nestedMentors.pendingApproval)
      : stats?.pendingMentors !== undefined
      ? Number(stats.pendingMentors)
      : pendingFromMentors;

  const rejectedMentors =
    nestedMentors?.rejected !== undefined
      ? Number(nestedMentors.rejected)
      : stats?.rejectedMentors !== undefined
      ? Number(stats.rejectedMentors)
      : rejectedFromMentors;

  const totalMentors =
    nestedMentors?.total !== undefined
      ? Number(nestedMentors.total)
      : stats?.totalMentors !== undefined
      ? Number(stats.totalMentors)
      : activeMentors + pendingMentors + rejectedMentors || mentors.length;

  // 2. Submissions - Extract from real nested stats: stats.submissions
  const nestedSubmissions = stats?.submissions;
  const approvedSubmissions =
    nestedSubmissions?.approved !== undefined
      ? Number(nestedSubmissions.approved)
      : Number(stats?.approvedSubmissions ?? 0);

  const pendingSubmissions =
    nestedSubmissions?.pending !== undefined
      ? Number(nestedSubmissions.pending)
      : Number(stats?.pendingSubmissions ?? 0);

  const rejectedSubmissions =
    nestedSubmissions?.rejected !== undefined
      ? Number(nestedSubmissions.rejected)
      : Number(stats?.rejectedSubmissions ?? 0);

  const totalSubmissions =
    nestedSubmissions?.total !== undefined
      ? Number(nestedSubmissions.total)
      : stats?.totalSubmissions !== undefined
      ? Number(stats.totalSubmissions)
      : approvedSubmissions + pendingSubmissions + rejectedSubmissions;

  // 3. Students & Users - Extract from real nested stats: stats.users.students
  const nestedStudents = stats?.users?.students;
  const totalStudents =
    nestedStudents?.total !== undefined
      ? Number(nestedStudents.total)
      : Number(stats?.totalStudents ?? 0);

  const activeStudents =
    nestedStudents?.active !== undefined
      ? Number(nestedStudents.active)
      : totalStudents;

  const totalUsers =
    stats?.users?.total !== undefined
      ? Number(stats.users.total)
      : totalStudents + totalMentors;

  // 4. Approval Rate
  // With real data: e.g. approved: 3, rejected: 1 => decided = 4 => (3/4)*100 = 75%
  let approvalRateStr = "100%";
  let approvalRateNumeric = 100;

  if (stats?.approvalRate !== undefined && stats.approvalRate !== null) {
    const str = String(stats.approvalRate);
    approvalRateStr = str.endsWith("%") ? str : `${str}%`;
    approvalRateNumeric = parseFloat(str.replace("%", "")) || 100;
  } else {
    const decided = approvedSubmissions + rejectedSubmissions;
    if (decided > 0) {
      approvalRateNumeric = Math.round((approvedSubmissions / decided) * 100);
      approvalRateStr = `${approvalRateNumeric}%`;
    }
  }

  // 5. Ratio: 1 Mentor to N Students
  const studentToMentorRatio =
    activeMentors > 0 && totalStudents > 0
      ? (totalStudents / activeMentors).toFixed(1)
      : "0.0";

  return {
    totalUsers,
    totalStudents,
    activeStudents,
    totalSubmissions,
    approvedSubmissions,
    pendingSubmissions,
    rejectedSubmissions,
    totalMentors,
    activeMentors,
    pendingMentors,
    rejectedMentors,
    approvalRate: approvalRateStr,
    approvalRateNumeric,
    studentToMentorRatio,
  };
}

export function computeExpertiseDistribution(
  mentors: RawBackendMentor[]
): ExpertiseItem[] {
  if (!mentors || mentors.length === 0) return [];

  const counts: Record<string, number> = {};
  let totalTags = 0;

  for (const mentor of mentors) {
    let tags: string[] = [];
    if (Array.isArray(mentor.expertise)) {
      tags = mentor.expertise;
    } else if (typeof mentor.expertise === "string" && mentor.expertise.trim()) {
      tags = mentor.expertise.split(/[,;/]/);
    }

    for (const rawTag of tags) {
      const clean = rawTag.trim();
      if (clean) {
        // Normalize title case
        const normalized = clean.charAt(0).toUpperCase() + clean.slice(1);
        counts[normalized] = (counts[normalized] || 0) + 1;
        totalTags++;
      }
    }
  }

  if (totalTags === 0) return [];

  return Object.entries(counts)
    .map(([discipline, count]) => ({
      discipline,
      count,
      percentage: Math.round((count / totalTags) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 real disciplines
}

export function computeRegistrationTimeline(
  mentors: RawBackendMentor[]
): TimelineDataPoint[] {
  if (!mentors || mentors.length === 0) return [];

  // Filter valid dates
  const sorted = [...mentors]
    .map((m) => ({
      ...m,
      dateObj: m.createdAt ? new Date(m.createdAt) : new Date(),
    }))
    .filter((m) => !isNaN(m.dateObj.getTime()))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

  if (sorted.length === 0) return [];

  // Group by date string (e.g. "Oct 24")
  const dateBuckets: Record<string, number> = {};

  for (const item of sorted) {
    const key = item.dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    dateBuckets[key] = (dateBuckets[key] || 0) + 1;
  }

  let runningTotal = 0;
  return Object.entries(dateBuckets).map(([dateLabel, dailyCount]) => {
    runningTotal += dailyCount;
    return {
      dateLabel,
      dailyCount,
      cumulativeCount: runningTotal,
    };
  });
}