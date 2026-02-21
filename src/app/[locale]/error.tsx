// 전역 에러 바운더리 — 런타임 에러 발생 시 실제 에러 메시지 + 복구 옵션
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-red-400 mb-6" />
      <h2 className="text-xl font-bold text-foreground mb-2">
        문제가 발생했습니다
      </h2>
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 max-w-sm w-full text-left">
        <p className="text-xs font-mono text-red-700 break-all">
          {error.message || "Unknown error"}
        </p>
        {error.digest && (
          <p className="text-xs text-red-400 mt-1">digest: {error.digest}</p>
        )}
      </div>
      <Button onClick={reset} className="rounded-full gap-2">
        <RefreshCw className="w-4 h-4" />
        다시 시도
      </Button>
    </div>
  );
}
