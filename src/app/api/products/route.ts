// 상품 목록 API — 서비스 레이어 호출
import { NextRequest, NextResponse } from "next/server";
import { findProducts } from "@/entities/product/api/product.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const result = await findProducts({
      category_id: searchParams.get("category_id") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      is_best: searchParams.get("is_best") === "true" || undefined,
      is_new: searchParams.get("is_new") === "true" || undefined,
      limit: parseInt(searchParams.get("limit") || "50"),
      offset: parseInt(searchParams.get("offset") || "0"),
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
