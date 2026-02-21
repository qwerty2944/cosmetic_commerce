// 상품 상세 API — 서비스 레이어 호출
import { NextRequest, NextResponse } from "next/server";
import { findProductById } from "@/entities/product/api/product.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await findProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
