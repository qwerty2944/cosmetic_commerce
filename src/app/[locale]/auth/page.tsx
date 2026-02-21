"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Loader2, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { supabase } from "@/shared/lib/supabase";

export default function AuthPage() {
  const t = useTranslations("auth");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSuccess("로그인 성공!");
        window.location.href = "/";
      } else {
        if (password !== confirmPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });
        if (error) throw error;
        setSuccess("회원가입 완료! 이메일을 확인해주세요.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "오류가 발생했습니다.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          {/* Tab Switch */}
          <div className="flex mb-8 bg-gray-50 rounded-full p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
                setSuccess(null);
              }}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all",
                isLogin
                  ? "bg-primary text-white shadow-sm"
                  : "text-subtext"
              )}
            >
              {t("loginTitle")}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError(null);
                setSuccess(null);
              }}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all",
                !isLogin
                  ? "bg-primary text-white shadow-sm"
                  : "text-subtext"
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
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                  <input
                    type="text"
                    placeholder={t("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                <input
                  type="email"
                  placeholder={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                <input
                  type="password"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                  <input
                    type="password"
                    placeholder={t("confirmPassword")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isLogin ? (
                  t("loginButton")
                ) : (
                  t("signupButton")
                )}
              </Button>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-subtext">{t("socialLogin")}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors bg-[#FEE500] border-[#FEE500]">
              Kakao
            </button>
          </div>

          <p className="text-center text-sm text-subtext mt-6">
            {isLogin ? t("noAccount") : t("hasAccount")}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccess(null);
              }}
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
