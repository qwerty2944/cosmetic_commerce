// 상품 필터 위젯 — 카테고리 필터 + URL searchParams로 상태 관리
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockCategories } from "@/shared/lib/mock-data";
import { cn } from "@/shared/lib/utils";

export function ProductFilters() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? null;

  // 카테고리 선택 시 URL searchParams 업데이트 → 서버 재렌더
  function handleCategoryChange(categoryId: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm whitespace-nowrap hover:border-primary hover:text-primary transition-colors">
        <SlidersHorizontal className="w-4 h-4" />
        Filter
      </button>
      <button
        onClick={() => handleCategoryChange(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
          !selectedCategory
            ? "bg-primary text-white"
            : "bg-gray-100 text-subtext hover:bg-gray-200"
        )}
      >
        {t("common.all")}
      </button>
      {mockCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors",
            selectedCategory === cat.id
              ? "bg-primary text-white"
              : "bg-gray-100 text-subtext hover:bg-gray-200"
          )}
        >
          {t(`categories.${cat.slug}`)}
        </button>
      ))}
    </div>
  );
}
