"use client";

import { useFunnel } from "@use-funnel/next";
import { motion } from "framer-motion";
import { TermsStep } from "@/features/sign-up/ui/terms-step";
import { InfoStep } from "@/features/sign-up/ui/info-step";
import { CompleteStep } from "@/features/sign-up/ui/complete-step";

type SignupFunnel = {
  terms: { termsAgreed: boolean; privacyAgreed: boolean };
  info: { termsAgreed: boolean; privacyAgreed: boolean };
  complete: { needsConfirmation: boolean };
};

export default function SignupPage() {
  const funnel = useFunnel<SignupFunnel>({
    id: "signup",
    initial: {
      step: "terms",
      context: { termsAgreed: false, privacyAgreed: false },
    },
  });

  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
        </div>
      </motion.div>
    </div>
  );
}
