// 전역 에러 바운더리 — 런타임 에러 발생 시 사용자에게 복구 옵션 제공
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
      <p className="text-sm text-subtext mb-8 max-w-xs">
        일시적인 오류가 발생했습니다. 다시 시도해 주세요.
      </p>
      <Button onClick={reset} className="rounded-full gap-2">
        <RefreshCw className="w-4 h-4" />
        다시 시도
      </Button>
    </div>
  );
}
