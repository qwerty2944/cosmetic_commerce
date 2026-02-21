// 상품 서비스 — Supabase 쿼리 로직 단일 소스
// API route, 서버 컴포넌트 모두 이 서비스를 호출
import { createSupabaseServer } from "@/shared/lib/supabase-server";
import type { Product } from "../types";

export interface ProductsQuery {
  category_id?: string;
  search?: string;
  is_best?: boolean;
  is_new?: boolean;
  limit?: number;
  offset?: number;
}

export interface ProductsResult {
  products: Product[];
  total: number;
}

// 상품 목록 조회
export async function findProducts(query?: ProductsQuery): Promise<ProductsResult> {
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

  return { products: (products as Product[]) ?? [], total: count ?? 0 };
}

// 상품 단건 조회
export async function findProductById(id: string): Promise<Product | null> {
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
