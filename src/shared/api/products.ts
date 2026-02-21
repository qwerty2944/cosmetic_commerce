// 상품 관련 API 호출 모듈
// 상품 목록 조회, 상품 상세 조회
import { api } from "./instance";
import type { Product } from "@/entities/product/types";

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductResponse {
  product: Product;
}

// 상품 목록 쿼리 파라미터
export interface ProductsQuery {
  category_id?: string;
  search?: string;
  is_best?: boolean;
  is_new?: boolean;
  limit?: number;
  offset?: number;
}

export const productsApi = {
  // 상품 목록 조회 (필터링 가능)
  list: (params?: ProductsQuery) =>
    api.get<ProductsResponse>("/products", { params }),

  // 상품 ID로 상세 조회
  getById: (id: string) => api.get<ProductResponse>(`/products/${id}`),
};
