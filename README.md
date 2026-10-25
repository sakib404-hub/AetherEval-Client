# 🌌 AetherEval — Academic Project Evaluation Platform

<div align="center">

![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Turbopack](https://img.shields.io/badge/Turbopack-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A high-performance, quantum-attested academic project evaluation and peer review consensus platform.**  
Connecting student builders, accredited review mentors, and academic administrators in a tamper-resistant, verifiable workflow.

[🌐 Live Backend API](https://aethar-eval.vercel.app) • [📦 Backend Repository](https://github.com/sakib404-hub/AetherEval.git) • [🚀 Frontend Client](#-getting-started)

</div>

---

## ⚡ Executive Summary

**AetherEval** transforms traditional, fragmented academic grading into a transparent, multi-tiered consensus engine. Students deploy and attest real-world software submissions, domain mentors conduct rigorous multi-criteria peer reviews under strict consensus constraints, and administrators oversee systemic integrity and mentor accreditations.

Engineered with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS 4**, and **Lenis kinetic inertia**, AetherEval delivers a fluid cyber-academic interface backed by enterprise-grade cryptographic JWT verification.

---

## 🌐 Connected Ecosystem & Repositories

| Component | Target URL / Repository | Purpose |
| :--- | :--- | :--- |
| **Backend REST API** | [`https://aethar-eval.vercel.app`](https://aethar-eval.vercel.app) | Production backend microservice exposing `/api/v1` routes |
| **Backend Repository** | [`sakib404-hub/AetherEval`](https://github.com/sakib404-hub/AetherEval.git) | Express/Nest/Node.js API engine, database schemas & business logic |
| **Frontend Client** | `task-client` (Current Repository) | Next.js 16 App Router SPA/SSR interface with kinetic motion design |

---

## 🚀 Key Platform Features

```
                                 ┌────────────────────────┐
                                 │   Student Submitter    │
                                 │ • Submits project      │
                                 │ • Tracks status        │
                                 │ • Edits/Resubmits      │
                                 └───────────┬────────────┘
                                             │
                                             ▼
┌────────────────────────┐       ┌────────────────────────┐
│     Administrator      │       │     Review Mentor      │
│ • Accredit mentors     │◀─────▶│ • Audits codebase      │
│ • Sovereign overrides  │       │ • Approves / Rejects   │
│ • System ledger review │       │ • Leaves critiques     │
└────────────────────────┘       └────────────────────────┘
```

### 🎓 1. Student Builder Portal (`/student-dashboard`)
- **Interactive Project History (`/student-dashboard`)**: Multi-cycle submission timeline with real-time status pills (`PENDING`, `APPROVED`, `REJECTED`), technology tags, and direct GitHub/Live Demo links.
- **Project Dispatch Portal (`/student-dashboard/submit`)**: Comprehensive submission form validating repository hygiene, deployment URLs, and architecture summaries.
- **Critique & Resubmission Engine (`/student-dashboard/resubmit`)**: Dedicated rejected project resolution center. Displays mentor consensus critiques and opens an interactive modal to edit and re-dispatch submissions (`PATCH /api/v1/submission/:id`).
- **Cryptographic Profile (`/student-dashboard/profile`)**: Live telemetry of user account ID, clearance level, genesis attestation date, and session status via `GET /api/v1/auth/me`.

### 🛡️ 2. Review Mentor Consensus Queue (`/mentor-dashboard`)
- **Consensus Queue**: Filter submissions by track (Fullstack, Web3, AI/ML, Cloud), view project links, and execute evaluation audits.
- **Immutable Consensus Rules**:
  - 🔒 **Approved submissions CANNOT be rejected** (Consensus lock).
  - 🔒 **Rejected submissions CANNOT be approved** without resubmission.
- **Detailed Evaluation Modal**: Provide actionable mentor feedback, scoring criteria, and official verdict dispatch.

### 🏛️ 3. Root Administrator Governance (`/admin-dashboard`)
- **System Overview (`/admin-dashboard`)**: High-level platform health metrics, active mentor counts, total audit volumes, and recent activity logs.
- **Mentor Accreditation (`/admin-dashboard/mentors`)**: Review incoming mentor applicants, inspect domain expertise, and approve or disqualify evaluators.
- **Sovereign Review Auditing (`/admin-dashboard/reviews`)**: Comprehensive administrative audit view with full authority to approve or reject submissions while honoring underlying consensus immutability.
- **Root Profile Clearance (`/admin-dashboard/profile`)**: Root governance clearance status.

### 🌌 4. Global Ergonomics & Motion Design
- **Kinetic Scrolling**: Orchestrated with **Lenis** (`lerp: 0.08`, `duration: 1.2`, kinetic inertia) with `data-lenis-prevent` on nested modals.
- **Floating Quantum Dock**: Adaptive left sidebar with gliding glass capsules (powered by Framer Motion), dynamic height balancing, and pinned end-cap logout.
- **Zero-Hydration-Drift Architecture**: Server-hydrated session snapshots prevent layout pop-ins and client-server mismatches.

---

## 🛠️ Technology Stack

```
Frontend Architecture:
├── Framework:           Next.js 16.4.3 (Turbopack Engine)
├── Core Library:        React 19.3.0 / React-DOM 19.3.0
├── Language:            TypeScript 5.x (Strict Typing, Zero `any`)
├── Styling:             Tailwind CSS 4.x + Custom Theme Tokens
├── Motion & Animation:  Framer Motion 14.x + Lenis Kinetic Scrolling
├── Icons:               Google Material Symbols + Lucide Primitives
├── Feedback:            SweetAlert2 + Quantum Glass Notifications
└── Security & Auth:     JWT Cookie Extraction + HTTP-Only Session Sync
```

---

## 📡 API Integration Reference

The frontend interfaces directly with the backend microservice at `https://aethar-eval.vercel.app/api/v1`:

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Authenticate user credentials and retrieve JWT bearer token |
| `POST` | `/api/v1/auth/register` | Register new student or candidate account |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile, role, clearance & metadata |

### 📂 Submissions (`/api/v1/submission`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/submission` | Retrieve list of project submissions (filterable by track/status) |
| `POST` | `/api/v1/submission` | Create a new student project submission |
| `PATCH` | `/api/v1/submission/:id` | Update / resubmit a rejected submission with revised links |
| `PATCH` | `/api/v1/submission/review/:id` | Dispatch mentor review verdict (`APPROVED` or `REJECTED`) |

### 👨‍🏫 Mentors (`/api/v1/mentor`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/mentor` | Fetch list of active and pending mentor applicants |
| `PATCH` | `/api/v1/mentor/:id` | Approve or reject mentor candidate applications |

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/sakib404-hub/AetherEval.git
cd task-client
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Backend Base API Endpoint
NEXT_PUBLIC_API_URL=https://aethar-eval.vercel.app/api/v1

# Node Environment
NODE_ENV=development
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application with Turbopack fast refresh.

### 5. Production Build & Quality Gate
Run strict TypeScript validation and Turbopack production compilation:
```bash
# Typecheck
npx tsc --noEmit

# Production Build
npm run build

# Start Production Server
npm run start
```

---

## 📁 Repository Structure

```
task-client/
├── public/                     # Static assets (favicons, SVG illustrations)
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── (auth)/             # Route groups: /login, /register
│   │   ├── (dashboard)/        # Route groups: /student-dashboard, /mentor-dashboard, /admin-dashboard, /profile
│   │   ├── _actions/           # Isolated Server Actions ('use server')
│   │   │   ├── auth/           # Login, logout, getAuthSession, getMe
│   │   │   ├── submission/     # Submit, updateSubmission, reviewAction
│   │   │   └── mentor/         # Approve/reject mentor candidates
│   │   ├── _components/        # Atomic, single-responsibility UI components
│   │   │   ├── navigation/     # FloatingDock, FloatingDockWrapper
│   │   │   ├── student/        # History, submission form, resubmit card & modal
│   │   │   ├── mentor/         # Consensus review table & verdict dialog
│   │   │   ├── admin/          # Metric matrix, operations table, activity feed
│   │   │   ├── profile/        # Ledger details grid, clearance badge
│   │   │   └── shared/         # CosmicBackground, SmoothScrollProvider
│   │   ├── globals.css         # Tailwind CSS 4 theme rules & keyframes
│   │   ├── layout.tsx          # Root layout with kinetic scroll & quantum dock
│   │   └── page.tsx            # Clean presentation container (Overview page)
│   ├── lib/                    # Shared utilities (alert, apiClient, env)
│   └── types/                  # Strictly typed interfaces (submission, user, mentor)
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Platform documentation
```

---

## 🔒 Consensus Invariants & Business Logic

AetherEval enforces strict state machine rules to maintain academic grading integrity:

```
[ PENDING ] ──(Mentor Reviews)──┬──► [ APPROVED ] ──► (Permanently Locked)
                                │
                                └──► [ REJECTED ] ──► (Requires Fixes)
                                           │
                                           └──► [ RESUBMITTED ] ──► (Re-enters Queue)
```

1. **Terminal Approval**: Once a submission reaches `APPROVED` consensus, it is permanently locked and cannot be transitioned to `REJECTED`.
2. **Explanatory Rejection**: Rejections require an explicit critique reason stored on the ledger to guide the student builder.
3. **Resubmission Gateway**: Rejected submissions trigger an action badge redirecting the student to `/student-dashboard/resubmit` for patching.

---

## 👥 Contributors & Attestation

Developed with passion by **[Sakib](https://github.com/sakib404-hub)** and the AetherEval Core Team.  
For questions, backend issues, or protocol extensions, visit the [Backend Repository](https://github.com/sakib404-hub/AetherEval.git).

---

<div align="center">
<sub>Crafted with modern web precision • Next.js 16 • Turbopack • Lenis • Tailwind CSS 4</sub>
</div>
