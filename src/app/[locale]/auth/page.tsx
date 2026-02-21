"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Loader2, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/features/auth/store";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "@/features/auth/schemas";
import { authApi } from "@/shared/api";

export default function AuthPage() {
  const t = useTranslations("auth");
  const [isLogin, setIsLogin] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);

  const { login, signup, loading, error, clearError } = useAuthStore();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setSuccess(null);
    try {
      await login(data.email, data.password);
      setSuccess(t("loginButton") + " ✓");
      window.location.href = "/";
    } catch {
      // Error handled by store
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setSuccess(null);
    try {
      await signup(data.email, data.password, data.name);
      setSuccess("✓");
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

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setSuccess(null);
    loginForm.reset();
    signupForm.reset();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Tab Switch */}
          <div className="flex mb-6 bg-gray-50 rounded-full p-1">
            <button
              onClick={() => { setIsLogin(true); clearError(); setSuccess(null); }}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all",
                isLogin ? "bg-primary text-white shadow-sm" : "text-subtext"
              )}
            >
              {t("loginTitle")}
            </button>
            <button
              onClick={() => { setIsLogin(false); clearError(); setSuccess(null); }}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all",
                !isLogin ? "bg-primary text-white shadow-sm" : "text-subtext"
              )}
            >
              {t("signupTitle")}
            </button>
          </div>

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

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
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
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
                onSubmit={signupForm.handleSubmit(handleSignup)}
              >
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                    <input
                      type="text"
                      placeholder={t("name")}
                      {...signupForm.register("name")}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  {signupForm.formState.errors.name && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {signupForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                    <input
                      type="email"
                      placeholder={t("email")}
                      {...signupForm.register("email")}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                    <input
                      type="password"
                      placeholder={t("password")}
                      {...signupForm.register("password")}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                    <input
                      type="password"
                      placeholder={t("confirmPassword")}
                      {...signupForm.register("confirmPassword")}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1 ml-1">
                      {signupForm.formState.errors.confirmPassword.message}
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
                    t("signupButton")
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

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
            {isLogin ? t("noAccount") : t("hasAccount")}{" "}
            <button
              onClick={switchMode}
              className="text-primary font-medium hover:underline"
            >
              {isLogin ? t("signupTitle") : t("loginTitle")}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
