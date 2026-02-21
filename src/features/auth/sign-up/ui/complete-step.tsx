// 회원가입 완료 단계 UI
// 이메일 인증 필요 여부에 따라 다른 메시지 표시
"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Link } from "@/application/i18n/routing";

interface CompleteStepProps {
  needsConfirmation: boolean;
}

export function CompleteStep({ needsConfirmation }: CompleteStepProps) {
  const t = useTranslations("auth");

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
      {needsConfirmation ? (
        <>
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{t("completeTitle")}</h2>
            <p className="text-sm text-subtext">{t("signupConfirmEmail")}</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold">{t("completeTitle")}</h2>
            <p className="text-sm text-subtext">{t("completeMessage")}</p>
          </div>
        </>
      )}

      <Link href="/" className="w-full">
        <Button size="lg" className="w-full rounded-xl">
          {t("goHome")}
        </Button>
      </Link>
    </div>
  );
}
