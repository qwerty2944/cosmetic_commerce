// 로그인 페이지 — LoginForm 컴포넌트를 감싸는 래퍼
"use client";

import { motion } from "framer-motion";
import { LoginForm } from "@/features/auth/sign-in/ui/login-form";

export default function AuthPage() {
  return (
    <div className="min-h-[calc(100dvh-200px)] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
}
