// 회원가입 페이지 — 약관 동의 → 정보 입력 → 완료 퍼널
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TermsStep } from "@/features/auth/sign-up/ui/terms-step";
import { InfoStep } from "@/features/auth/sign-up/ui/info-step";
import { CompleteStep } from "@/features/auth/sign-up/ui/complete-step";

type Step = "terms" | "info" | "complete";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("terms");
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {step === "terms" && (
            <TermsStep onNext={() => setStep("info")} />
          )}
          {step === "info" && (
            <InfoStep
              onNext={(confirmation) => {
                setNeedsConfirmation(confirmation);
                setStep("complete");
              }}
              onBack={() => setStep("terms")}
            />
          )}
          {step === "complete" && (
            <CompleteStep needsConfirmation={needsConfirmation} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
