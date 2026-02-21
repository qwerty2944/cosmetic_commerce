// 상품 목록 콘텐츠 — React Query로 캐시된 데이터 표시
"use client";

import { useProducts } from "../api/use-products";
import { ProductCard } from "./product-card";

interface ProductListContentProps {
  category?: string;
  search?: string;
}

export function ProductListContent({
  category,
  search,
}: ProductListContentProps) {
  const { data, isLoading, error } = useProducts({
    category_id: category,
    search,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-xs font-mono text-red-700 break-all">
          {error.message}
        </p>
      </div>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-subtext">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} index={idx} />
      ))}
    </div>
  );
}
