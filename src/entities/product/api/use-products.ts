// 상품 React Query 훅 — 클라이언트 캐싱 + API 엔드포인트 호출
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/instance";
import type { Product } from "../types";

export interface ProductsQuery {
  category_id?: string;
  search?: string;
  is_best?: boolean;
  is_new?: boolean;
  limit?: number;
  offset?: number;
}

interface ProductsResult {
  products: Product[];
  total: number;
}

// 상품 목록 (캐시 5분)
export function useProducts(query?: ProductsQuery) {
  return useQuery<ProductsResult>({
    queryKey: ["products", query ?? {}],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query?.category_id) params.set("category_id", query.category_id);
      if (query?.search) params.set("search", query.search);
      if (query?.is_best) params.set("is_best", "true");
      if (query?.is_new) params.set("is_new", "true");
      if (query?.limit) params.set("limit", String(query.limit));
      if (query?.offset) params.set("offset", String(query.offset));

      const { data } = await api.get<ProductsResult>(
        `/products?${params.toString()}`
      );
      return data;
    },
  });
}

// 상품 단건 (캐시 5분)
export function useProductById(id: string) {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get<{ product: Product }>(`/products/${id}`);
      return data.product;
    },
    enabled: !!id,
  });
}
