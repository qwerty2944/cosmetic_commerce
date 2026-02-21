// 상품 목록 로딩 스켈레톤 — 그리드 형태 플레이스홀더
export default function ProductsLoading() {
  return (
    <div className="px-4 py-6">
      {/* 헤더 스켈레톤 */}
      <div className="mb-8">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3 mb-2" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
      </div>

      {/* 필터 스켈레톤 */}
      <div className="flex gap-3 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-20 bg-gray-100 rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* 그리드 스켈레톤 */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
            <div className="space-y-1.5 px-1">
              <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
