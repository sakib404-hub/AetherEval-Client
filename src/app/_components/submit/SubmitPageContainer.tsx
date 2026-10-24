"use client";

import { motion } from "framer-motion";
import { SubmissionHeader } from "./SubmissionHeader";
import { SubmissionForm } from "./SubmissionForm";
import { VerificationChecklist } from "./VerificationChecklist";
import { OracleMeshCard } from "./OracleMeshCard";

export function SubmitPageContainer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto w-full space-y-6 pt-2"
    >
      {/* Top Context Bar */}
      <SubmissionHeader />

      {/* Content Grid: 7-Col Form & 5-Col Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Container (7 cols) */}
        <div className="lg:col-span-7">
          <SubmissionForm />
        </div>

        {/* Right Column: Verification Guidelines & Oracle Mesh (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <VerificationChecklist />
          <OracleMeshCard />
        </div>
      </div>
    </motion.div>
  );
}
