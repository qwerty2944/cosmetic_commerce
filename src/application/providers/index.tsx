// 앱 프로바이더 — 앱 초기화 시 사용자 세션 복원
"use client";

import { useEffect } from "react";
import { useUserStore } from "@/entities/user/store";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const fetchUser = useUserStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthInitializer>
      {children}
    </AuthInitializer>
  );
}
