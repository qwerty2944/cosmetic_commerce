// 상품 목록 페이지 — 서버는 레이아웃만, 데이터는 React Query 캐싱
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ProductListContent } from "@/entities/product/ui/product-list-content";
import { ProductFilters } from "@/widgets/product-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | QINMU",
  description: "Premium K-Beauty products — 프리미엄 K-뷰티 상품",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations();

  return (
    <div className="px-4 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground">
          {t("common.products")}
        </h1>
        <p className="text-subtext mt-1">{t("sections.bestSellersDesc")}</p>
      </div>

      {/* Filters (클라이언트) */}
      <Suspense>
        <ProductFilters />
      </Suspense>

      {/* Product Grid — React Query 캐싱 */}
      <ProductListContent category={params.category} search={params.search} />
    </div>
  );
}
