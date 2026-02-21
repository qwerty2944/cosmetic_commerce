import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "@/shared/lib/mock-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");
    const search = searchParams.get("search");
    const isBest = searchParams.get("is_best");
    const isNew = searchParams.get("is_new");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    let filtered = [...mockProducts];

    if (categoryId) {
      filtered = filtered.filter((p) => p.category_id === categoryId);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.ko.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q)
      );
    }

    if (isBest === "true") {
      filtered = filtered.filter((p) => p.is_best);
    }

    if (isNew === "true") {
      filtered = filtered.filter((p) => p.is_new);
    }

    const total = filtered.length;
    const products = filtered.slice(offset, offset + limit);

    return NextResponse.json({ products, total });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
