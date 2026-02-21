"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/entities/user/store";
import { signIn } from "@/features/sign-in/store";
import { loginSchema, type LoginFormData } from "@/features/sign-in/schemas";
import { authApi } from "@/shared/api";
import { Link } from "@/application/i18n/routing";

export default function AuthPage() {
  const t = useTranslations("auth");
  const [success, setSuccess] = useState<string | null>(null);

  const { loading, error, clearError } = useUserStore();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setSuccess(null);
    clearError();
    try {
      await signIn(data.email, data.password);
      setSuccess(t("loginButton") + " ✓");
      window.location.href = "/";
    } catch {
      // Error handled by store
    }
  };

  const handleOAuth = async (provider: "google" | "kakao") => {
    try {
      const { data } = await authApi.oauthUrl(provider);
      window.location.href = data.url;
    } catch {
      // OAuth error
    }
  };

  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h1 className="text-xl font-bold text-center mb-6">
            {t("loginTitle")}
          </h1>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-green-50 text-green-600 text-sm flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {success}
            </motion.div>
          )}

          <form
            className="space-y-4"
            onSubmit={loginForm.handleSubmit(handleLogin)}
          >
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                <input
                  type="email"
                  placeholder={t("email")}
                  {...loginForm.register("email")}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              {loginForm.formState.errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                <input
                  type="password"
                  placeholder={t("password")}
                  {...loginForm.register("password")}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl mt-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                t("loginButton")
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-subtext">{t("socialLogin")}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Google
            </button>
            <button
              onClick={() => handleOAuth("kakao")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border-[#FEE500] text-sm font-medium hover:bg-[#FEE500]/80 transition-colors bg-[#FEE500]"
            >
              Kakao
            </button>
          </div>

          <p className="text-center text-sm text-subtext mt-6">
            {t("noAccount")}{" "}
            <Link
              href="/auth/signup"
              className="text-primary font-medium hover:underline"
            >
              {t("signupTitle")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
