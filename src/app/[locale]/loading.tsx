// 전역 로딩 상태 — Suspense 바운더리 자동 생성
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-subtext">로딩 중...</p>
      </div>
    </div>
  );
}
