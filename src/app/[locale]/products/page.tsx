// 상품 목록 페이지 — sync 서버 컴포넌트, 데이터는 React Query 클라이언트 캐싱
import { Suspense } from "react";
import { ProductListContent } from "@/entities/product/ui/product-list-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | QINMU",
  description: "Premium K-Beauty products — 프리미엄 K-뷰티 상품",
};

export default function ProductsPage() {
  return (
    <div className="px-4 py-6">
      <Suspense>
        <ProductListContent />
      </Suspense>
    </div>
  );
}
