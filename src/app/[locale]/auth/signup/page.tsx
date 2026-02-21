// 회원가입 페이지 — 약관 동의 → 정보 입력 → 완료 퍼널
"use client";

import { Suspense } from "react";
import { useFunnel } from "@use-funnel/next";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { TermsStep } from "@/features/auth/sign-up/ui/terms-step";
import { InfoStep } from "@/features/auth/sign-up/ui/info-step";
import { CompleteStep } from "@/features/auth/sign-up/ui/complete-step";

type SignupFunnel = {
  terms: { termsAgreed: boolean; privacyAgreed: boolean };
  info: { termsAgreed: boolean; privacyAgreed: boolean };
  complete: { needsConfirmation: boolean };
};

// useFunnel이 내부적으로 useSearchParams를 사용하므로 Suspense 필요
function SignupFunnelContent() {
  const funnel = useFunnel<SignupFunnel>({
    id: "signup",
    initial: {
      step: "terms",
      context: { termsAgreed: false, privacyAgreed: false },
    },
  });

  return (
    <funnel.Render
      terms={({ history }) => (
        <TermsStep
          onNext={(agreed) => {
            history.push("info", agreed);
          }}
        />
      )}
      info={({ history }) => (
        <InfoStep
          onNext={(needsConfirmation) => {
            history.push("complete", { needsConfirmation });
          }}
          onBack={() => {
            history.back();
          }}
        />
      )}
      complete={({ context }) => (
        <CompleteStep needsConfirmation={context.needsConfirmation} />
      )}
    />
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            }
          >
            <SignupFunnelContent />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
