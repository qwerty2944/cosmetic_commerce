import { Product } from "@/entities/product/types";
import type { Locale } from "@/shared/config/i18n";

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
