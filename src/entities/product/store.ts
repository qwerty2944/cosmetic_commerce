// 상품 상태 관리 스토어
// 상품 목록 조회(GET), 상품 상세 조회(GET) 전용
"use client";

import { create } from "zustand";
import { productsApi, type ProductsQuery } from "@/shared/api";
import type { Product } from "./types";

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  total: number;

  // 상품 목록 조회 (카테고리, 검색어 등 필터 적용 가능)
  fetchProducts: (query?: ProductsQuery) => Promise<void>;
  // 상품 ID로 상세 정보 조회
  fetchProductById: (id: string) => Promise<void>;
  // 현재 상세 조회 중인 상품 초기화
  clearCurrentProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  total: 0,

  fetchProducts: async (query) => {
    set({ loading: true, error: null });
    try {
      const { data } = await productsApi.list(query);
      set({ products: data.products, total: data.total, loading: false });
    } catch {
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await productsApi.getById(id);
      set({ currentProduct: data.product, loading: false });
    } catch {
      set({ error: "Product not found", loading: false });
    }
  },

  clearCurrentProduct: () => set({ currentProduct: null }),
}));
