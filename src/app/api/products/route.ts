import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/shared/lib/supabase-server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");
    const search = searchParams.get("search");
    const isBest = searchParams.get("is_best");
    const isNew = searchParams.get("is_new");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const supabase = await createSupabaseServer();

    let query = supabase
      .from("products")
      .select("*", { count: "exact" });

    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    if (search) {
      query = query.or(
        `name->>'ko'.ilike.%${search}%,name->>'en'.ilike.%${search}%`
      );
    }

    if (isBest === "true") {
      query = query.eq("is_best", true);
    }

    if (isNew === "true") {
      query = query.eq("is_new", true);
    }

    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: products, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products: products ?? [], total: count ?? 0 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
