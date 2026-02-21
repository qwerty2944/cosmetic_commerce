// 상품 목록 콘텐츠 — React Query로 캐시된 데이터 표시 + useSearchParams 직접 사용
"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useProducts } from "../api/use-products";
import { ProductCard } from "./product-card";
import { ProductFilters } from "@/widgets/product-filters";

export function ProductListContent() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const { data, isLoading, error } = useProducts({
    category_id: category,
    search,
  });

  return (
    <>
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground">
          {t("common.products")}
        </h1>
        <p className="text-subtext mt-1">{t("sections.bestSellersDesc")}</p>
      </div>

      {/* 카테고리 필터 */}
      <ProductFilters />

      {/* 상품 그리드 */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs font-mono text-red-700 break-all">
            {error.message}
          </p>
        </div>
      ) : (data?.products ?? []).length === 0 ? (
        <div className="text-center py-20">
          <p className="text-subtext">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {(data?.products ?? []).map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      )}
    </>
  );
}
