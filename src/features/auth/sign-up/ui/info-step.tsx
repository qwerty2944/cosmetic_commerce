// 회원가입 정보 입력 단계 UI
// 이름, 이메일, 비밀번호 입력 후 회원가입 요청
"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { signupSchema, type SignupFormData } from "@/features/auth/sign-up/schemas";
import { signUp } from "@/features/auth/sign-up/store";
import { useUserStore } from "@/entities/user/store";

interface InfoStepProps {
  onNext: (needsConfirmation: boolean) => void;
  onBack: () => void;
}

export function InfoStep({ onNext, onBack }: InfoStepProps) {
  const t = useTranslations("auth");
  const { loading, error } = useUserStore();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleSubmit = async (data: SignupFormData) => {
    try {
      const needsConfirmation = await signUp(
        data.email,
        data.password,
        data.name
      );
      onNext(needsConfirmation);
    } catch {
      // 에러는 useUserStore에서 처리됨
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-lg font-bold">{t("infoTitle")}</h2>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
            <input
              type="text"
              placeholder={t("name")}
              {...form.register("name")}
              className={inputClass}
            />
          </div>
          {form.formState.errors.name && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
            <input
              type="email"
              placeholder={t("email")}
              {...form.register("email")}
              className={inputClass}
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
            <input
              type="password"
              placeholder={t("password")}
              {...form.register("password")}
              className={inputClass}
            />
          </div>
          {form.formState.errors.password && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
            <input
              type="password"
              placeholder={t("confirmPassword")}
              {...form.register("confirmPassword")}
              className={inputClass}
            />
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-xl"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            t("signupButton")
          )}
        </Button>
      </form>
    </div>
  );
}
