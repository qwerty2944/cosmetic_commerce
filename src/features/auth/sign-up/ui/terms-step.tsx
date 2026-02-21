// 회원가입 약관 동의 단계 UI
// 이용약관과 개인정보처리방침을 스크롤 끝까지 내려야 체크 가능
"use client";

import { useRef, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { throttle } from "es-toolkit";
import { Check } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface TermsStepProps {
  onNext: (agreed: { termsAgreed: boolean; privacyAgreed: boolean }) => void;
}

export function TermsStep({ onNext }: TermsStepProps) {
  const t = useTranslations("auth");
  const [termsScrolled, setTermsScrolled] = useState(false);
  const [privacyScrolled, setPrivacyScrolled] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const termsRef = useRef<HTMLDivElement>(null);
  const privacyRef = useRef<HTMLDivElement>(null);

  // 스크롤이 끝까지 내려갔는지 확인
  const checkScrollEnd = (el: HTMLDivElement, setter: (v: boolean) => void) => {
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setter(true);
    }
  };

  // es-toolkit throttle로 스크롤 이벤트 최적화
  const handleTermsScroll = useMemo(
    () =>
      throttle(() => {
        if (termsRef.current) checkScrollEnd(termsRef.current, setTermsScrolled);
      }, 100),
    []
  );

  const handlePrivacyScroll = useMemo(
    () =>
      throttle(() => {
        if (privacyRef.current)
          checkScrollEnd(privacyRef.current, setPrivacyScrolled);
      }, 100),
    []
  );

  const canProceed = termsAgreed && privacyAgreed;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-center">{t("termsTitle")}</h2>

      {/* 이용약관 */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">
          {t("termsOfService")}
        </h3>
        <div
          ref={termsRef}
          onScroll={handleTermsScroll}
          className="h-40 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-subtext leading-relaxed whitespace-pre-wrap scrollbar-hide"
        >
          {t("termsContent")}
        </div>
        <label
          className={cn(
            "flex items-center gap-2 text-sm cursor-pointer select-none",
            !termsScrolled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              termsAgreed
                ? "bg-primary border-primary text-white"
                : "border-gray-300 bg-white"
            )}
          >
            {termsAgreed && <Check className="w-3 h-3" />}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={termsAgreed}
            disabled={!termsScrolled}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />
          {t("agreeTerms")}
          {!termsScrolled && (
            <span className="text-xs text-subtext ml-auto">
              {t("scrollToBottom")}
            </span>
          )}
        </label>
      </div>

      {/* 개인정보처리방침 */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">
          {t("privacyPolicy")}
        </h3>
        <div
          ref={privacyRef}
          onScroll={handlePrivacyScroll}
          className="h-40 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-subtext leading-relaxed whitespace-pre-wrap scrollbar-hide"
        >
          {t("privacyContent")}
        </div>
        <label
          className={cn(
            "flex items-center gap-2 text-sm cursor-pointer select-none",
            !privacyScrolled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              privacyAgreed
                ? "bg-primary border-primary text-white"
                : "border-gray-300 bg-white"
            )}
          >
            {privacyAgreed && <Check className="w-3 h-3" />}
          </span>
          <input
            type="checkbox"
            className="sr-only"
            checked={privacyAgreed}
            disabled={!privacyScrolled}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
          />
          {t("agreePrivacy")}
          {!privacyScrolled && (
            <span className="text-xs text-subtext ml-auto">
              {t("scrollToBottom")}
            </span>
          )}
        </label>
      </div>

      <Button
        size="lg"
        className="w-full rounded-xl"
        disabled={!canProceed}
        onClick={() => onNext({ termsAgreed: true, privacyAgreed: true })}
      >
        {t("next")}
      </Button>
    </div>
  );
}
