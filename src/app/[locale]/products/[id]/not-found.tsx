// 상품 상세 전용 404 — 존재하지 않는 상품 접근 시 표시
import { PackageX } from "lucide-react";
import { Link } from "@/application/i18n/routing";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <PackageX className="w-16 h-16 text-gray-300 mb-6" />
      <h2 className="text-xl font-bold text-foreground mb-2">
        상품을 찾을 수 없습니다
      </h2>
      <p className="text-sm text-subtext mb-8 max-w-xs">
        요청하신 상품이 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
      >
        상품 목록으로 돌아가기
      </Link>
    </div>
  );
}
