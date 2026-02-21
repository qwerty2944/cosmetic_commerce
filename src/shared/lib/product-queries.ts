// 서버 컴포넌트용 상품 쿼리 — React cache() 래퍼
// 실제 쿼리 로직은 entities/product/api/product.service.ts
import { cache } from "react";
import {
  findProducts,
  findProductById,
  type ProductsQuery,
} from "@/entities/product/api/product.service";

export type { ProductsQuery };

// 상품 목록 (요청 중복 제거)
export const getProducts = cache(
  async (query?: ProductsQuery) => findProducts(query)
);

// 상품 상세 (요청 중복 제거)
export const getProductById = cache(
  async (id: string) => findProductById(id)
);
