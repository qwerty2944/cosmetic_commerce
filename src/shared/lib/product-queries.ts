// 서버 전용 상품 데이터 패칭 함수
// React cache()로 요청 중복 제거, Supabase 직접 쿼리
import { cache } from "react";
import { createSupabaseServer } from "./supabase-server";
import type { Product } from "@/entities/product/types";

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

// 상품 목록 서버 쿼리
export const getProducts = cache(
  async (query?: ProductsQuery): Promise<ProductsResult> => {
    const supabase = await createSupabaseServer();
    const limit = query?.limit ?? 50;
    const offset = query?.offset ?? 0;

    let q = supabase.from("products").select("*", { count: "exact" });

    if (query?.category_id) {
      q = q.eq("category_id", query.category_id);
    }

    if (query?.search) {
      q = q.or(
        `name->>'ko'.ilike.%${query.search}%,name->>'en'.ilike.%${query.search}%`
      );
    }

    if (query?.is_best) {
      q = q.eq("is_best", true);
    }

    if (query?.is_new) {
      q = q.eq("is_new", true);
    }

    q = q
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: products, count, error } = await q;

    if (error) {
      throw new Error(error.message);
    }

    return { products: products ?? [], total: count ?? 0 };
  }
);

// 상품 상세 서버 쿼리
export const getProductById = cache(
  async (id: string): Promise<Product | null> => {
    const supabase = await createSupabaseServer();

    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !product) {
      return null;
    }

    return product as Product;
  }
);
