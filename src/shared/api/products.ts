import { api } from "./instance";
import type { Product } from "@/entities/product/types";

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductResponse {
  product: Product;
}

export interface ProductsQuery {
  category_id?: string;
  search?: string;
  is_best?: boolean;
  is_new?: boolean;
  limit?: number;
  offset?: number;
}

export const productsApi = {
  list: (params?: ProductsQuery) =>
    api.get<ProductsResponse>("/products", { params }),

  getById: (id: string) =>
    api.get<ProductResponse>(`/products/${id}`),
};
