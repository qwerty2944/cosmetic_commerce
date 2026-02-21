// 상품 필터링 및 정렬 유틸리티
// 카테고리 필터, 가격/최신순/평점 정렬 지원
import type { Product } from "../types";

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

// 상품 목록을 카테고리 및 정렬 기준으로 필터링
export function filterProducts(
  products: Product[],
  categoryId?: string | null,
  sort?: SortOption
): Product[] {
  let filtered = [...products];

  // 카테고리 ID가 지정된 경우 해당 카테고리만 필터링
  if (categoryId) {
    filtered = filtered.filter((p) => p.category_id === categoryId);
  }

  // 정렬 기준에 따라 상품 목록 정렬
  switch (sort) {
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "price-asc":
      filtered.sort(
        (a, b) => (a.sale_price || a.price) - (b.sale_price || b.price)
      );
      break;
    case "price-desc":
      filtered.sort(
        (a, b) => (b.sale_price || b.price) - (a.sale_price || a.price)
      );
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  return filtered;
}
