// 상품 목록 페이지 — 서버 컴포넌트 (SSR)
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/shared/lib/product-queries";
import { ProductGrid } from "@/entities/product/ui/product-grid";
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

  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];

  try {
    const result = await getProducts({
      category_id: params.category,
      search: params.search,
    });
    products = result.products;
  } catch (err) {
    console.error("[ProductsPage] Failed to fetch products:", err);
  }

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

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
