import { RawBackendSubmission } from "@/types/submission";
import { MentorSubmissionItem } from "./SubmissionTableRow";

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Recently";

  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hr${diffHour > 1 ? "s" : ""} ago`;
  return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
}

export function mapRawToMentorSubmission(raw: RawBackendSubmission): MentorSubmissionItem {
  const rawStatus = (raw.status || "PENDING").toLowerCase();
  const status: "pending" | "approved" | "rejected" =
    rawStatus === "approved"
      ? "approved"
      : rawStatus === "rejected"
      ? "rejected"
      : "pending";

  let score: number | undefined = undefined;
  if (raw.reviewComment) {
    const match = raw.reviewComment.match(/(\d{1,3})/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
        score = parsed;
      }
    }
  }
  if (score === undefined && status === "approved") {
    score = 94;
  }

  const studentName = raw.student?.name || "Student Node";
  const studentEmail = raw.student?.email || "";
  const studentPrefix = studentEmail ? studentEmail.split("@")[0] : "";
  const studentNode = studentPrefix
    ? `${studentPrefix.charAt(0).toUpperCase() + studentPrefix.slice(1)} Node`
    : `Academic Node #${raw.id.slice(0, 4)}`;

  const merkleHash = raw.id
    ? `0x${raw.id.replace(/-/g, "").slice(0, 40)}`
    : "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";

  return {
    id: raw.id,
    title: raw.projectName || "Untitled Project",
    track: "Distributed Systems",
    studentName: studentName,
    studentNode: studentNode,
    repoUrl: raw.repoUrl || "",
    repoBranch: "main:head",
    demoUrl: raw.liveLink || undefined,
    deploymentStatus: raw.liveLink ? "Live" : "Pending",
    submittedTime: raw.createdAt ? formatRelativeTime(raw.createdAt) : "Recently",
    status: status,
    merkleHash: merkleHash,
    score: score,
  };
}
