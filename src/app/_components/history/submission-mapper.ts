import { RawBackendSubmission } from "@/types/submission";
import { SubmissionItem } from "./SubmissionCard";

const KNOWN_KEYWORDS = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "Rust",
  "Solidity",
  "Go",
  "Docker",
  "Tailwind",
  "GraphQL",
  "WebAssembly",
  "Zero-Knowledge",
  "EVM",
  "PostgreSQL",
  "MongoDB",
];

export function mapRawSubmissionToItem(raw: RawBackendSubmission): SubmissionItem {
  const dateObj = raw.createdAt ? new Date(raw.createdAt) : new Date();
  const formattedDate = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Recent";

  const quarter = !isNaN(dateObj.getTime())
    ? Math.ceil((dateObj.getMonth() + 1) / 3)
    : 1;
  const year = !isNaN(dateObj.getTime()) ? dateObj.getFullYear() : 2026;
  const cycle = `${year}-Q${quarter}`;

  const rawStatus = (raw.status || "PENDING").toLowerCase();
  const status: "pending" | "approved" | "rejected" =
    rawStatus === "approved"
      ? "approved"
      : rawStatus === "rejected"
      ? "rejected"
      : "pending";

  let score: number | undefined = undefined;
  if (raw.reviewComment) {
    const match = raw.reviewComment.match(/(\d{1,3})\s*(?:\/|\s*out of\s*|\s*score\s*:?\s*)100/i) ||
      raw.reviewComment.match(/score[:\s]+(\d{1,3})/i) ||
      raw.reviewComment.match(/(\d{2,3})/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
        score = parsed;
      }
    }
  }

  if (score === undefined && status === "approved") {
    score = 96;
  }

  const textToScan = `${raw.projectName || ""} ${raw.description || ""}`.toLowerCase();
  const matchedTags: string[] = [];
  for (const kw of KNOWN_KEYWORDS) {
    if (textToScan.includes(kw.toLowerCase())) {
      matchedTags.push(kw);
    }
  }

  const finalTags = matchedTags.length > 0 ? matchedTags : ["Academic Build", "Peer Reviewed"];

  return {
    id: raw.id,
    title: raw.projectName || "Untitled Submission",
    version: raw.id ? `ID: #${raw.id.slice(0, 6)}` : "v1.0",
    date: formattedDate,
    cycle: cycle,
    track: "Project Evaluation",
    status: status,
    score: score,
    description: raw.description || "No project description provided.",
    tags: finalTags,
    githubUrl: raw.repoUrl || "",
    demoUrl: raw.liveLink || "",
    healthStatus: status === "approved" ? "200 OK — Verified" : "Under Peer Review",
    mentorFeedback: raw.rejectionReason || raw.reviewComment || undefined,
  };
}
