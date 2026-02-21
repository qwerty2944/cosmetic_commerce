"use client";

import { create } from "zustand";
import { productsApi, type ProductsQuery } from "@/shared/api";
import type { Product } from "@/entities/product/types";

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  total: number;

  fetchProducts: (query?: ProductsQuery) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  clearCurrentProduct: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
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
