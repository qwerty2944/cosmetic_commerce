import { Product } from "@/entities/product/types";

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

export function filterProducts(
  products: Product[],
  categoryId?: string | null,
  sort?: SortOption
): Product[] {
  let filtered = [...products];

  if (categoryId) {
    filtered = filtered.filter((p) => p.category_id === categoryId);
  }

  switch (sort) {
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "price-asc":
      filtered.sort(
        (a, b) =>
          (a.sale_price || a.price) - (b.sale_price || b.price)
      );
      break;
    case "price-desc":
      filtered.sort(
        (a, b) =>
          (b.sale_price || b.price) - (a.sale_price || a.price)
      );
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  return filtered;
}
