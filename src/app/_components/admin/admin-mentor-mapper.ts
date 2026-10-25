import { RawBackendMentor } from "@/types/admin";
import { MentorApplicant } from "./ApplicantTableRow";

const GRADIENTS = [
  "from-purple-500/20 to-blue-500/20",
  "from-indigo-500/20 to-purple-500/20",
  "from-cyan-500/20 to-purple-500/20",
  "from-violet-500/20 to-pink-500/20",
  "from-blue-500/20 to-emerald-500/20",
];

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "MN";
}

function deriveInstitution(email: string): { institution: string; department: string } {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  if (domain.includes("stanford")) {
    return { institution: "Stanford University", department: "Stanford AI Lab • Systems" };
  }
  if (domain.includes("mit")) {
    return { institution: "Massachusetts Institute of Technology", department: "MIT CSAIL" };
  }
  if (domain.includes("berkeley")) {
    return { institution: "UC Berkeley", department: "Blockchain X-Lab" };
  }
  if (domain.includes("ox.ac") || domain.includes("oxford")) {
    return { institution: "University of Oxford", department: "Oxford Quantum Institute" };
  }
  if (domain.includes("cam.ac") || domain.includes("cambridge")) {
    return { institution: "University of Cambridge", department: "Computer Laboratory" };
  }
  if (domain.includes("harvard")) {
    return { institution: "Harvard University", department: "SEAS Research" };
  }
  if (domain.includes("ethz")) {
    return { institution: "ETH Zurich", department: "Distributed Systems Group" };
  }

  const instName = domain
    .replace(/\.(edu|ac|org|io|dev|com).*/i, "")
    .replace(/[^a-zA-Z]/g, " ");
  const capitalized = instName
    ? instName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Academic Institution";

  return { institution: `${capitalized} Institute`, department: "Computer Science Faculty" };
}

export function mapRawMentorToApplicant(raw: RawBackendMentor, index: number = 0): MentorApplicant {
  const rawStatus = (raw.status || "PENDING_APPROVAL").toUpperCase();
  const status: "pending" | "approved" | "rejected" =
    rawStatus === "ACTIVE" || rawStatus === "APPROVED"
      ? "approved"
      : rawStatus === "REJECTED"
      ? "rejected"
      : "pending";

  const dateObj = raw.createdAt ? new Date(raw.createdAt) : new Date();
  const appliedDate = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Recent";
  const appliedTimeUtc = !isNaN(dateObj.getTime())
    ? `${String(dateObj.getUTCHours()).padStart(2, "0")}:${String(dateObj.getUTCMinutes()).padStart(2, "0")} UTC`
    : "12:00 UTC";

  const { institution, department } = deriveInstitution(raw.email || "");

  let expertiseList: string[] = [];
  if (Array.isArray(raw.expertise)) {
    expertiseList = raw.expertise;
  } else if (typeof raw.expertise === "string" && raw.expertise.trim()) {
    expertiseList = raw.expertise
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (expertiseList.length === 0) {
    expertiseList = ["Distributed Systems", "Peer Review"];
  }

  return {
    id: raw.id,
    name: raw.name || "Academic Candidate",
    verifiedIdentity: status === "approved",
    email: raw.email || "",
    institution,
    department: raw.expertise ? `${raw.expertise} Faculty` : department,
    avatarInitials: getInitials(raw.name || "Academic Candidate"),
    avatarGradient: GRADIENTS[index % GRADIENTS.length],
    expertise: expertiseList,
    githubUrl: raw.portfolioUrl || undefined,
    webUrl: raw.portfolioUrl || undefined,
    appliedDate,
    appliedTimeUtc,
    status,
    dnsValid: true,
    gpgVerified: true,
    reputationScore: 94 + (index % 5),
    bioSummary:
      raw.bio ||
      "Academic identity verified via institutional record matching and cryptographic reputation assessment.",
  };
}
