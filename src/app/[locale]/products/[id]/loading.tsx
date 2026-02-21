// 상품 상세 로딩 스켈레톤 — 이미지 + 텍스트 플레이스홀더
export default function ProductDetailLoading() {
  return (
    <div className="px-4 py-4">
      {/* 뒤로가기 스켈레톤 */}
      <div className="h-4 bg-gray-100 rounded animate-pulse w-20 mb-6" />

      {/* 이미지 스켈레톤 */}
      <div className="aspect-square rounded-3xl bg-gray-100 animate-pulse mb-6" />

      {/* 정보 스켈레톤 */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-gray-100 rounded animate-pulse w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-5/6" />
        </div>
      </div>

      {/* 버튼 스켈레톤 */}
      <div className="flex gap-3 mt-6">
        <div className="h-12 bg-gray-100 rounded-full animate-pulse flex-1" />
        <div className="h-12 w-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
