// 상품 검색 유틸리티
// 로케일별 상품명/설명에서 키워드 검색
import type { Product } from "../types";
import type { Locale } from "@/shared/config/i18n";

// 로케일에 맞는 상품명/설명에서 키워드를 검색
export function searchProducts(
  products: Product[],
  query: string,
  locale: Locale
): Product[] {
  if (!query.trim()) return products;

  const lowerQuery = query.toLowerCase();
  return products.filter((p) => {
    const name = (p.name[locale] || p.name.ko).toLowerCase();
    const desc = (p.description[locale] || p.description.ko).toLowerCase();
    return name.includes(lowerQuery) || desc.includes(lowerQuery);
  });
}
