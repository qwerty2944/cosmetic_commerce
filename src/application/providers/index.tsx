"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((s) => s.fetchUser);

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
