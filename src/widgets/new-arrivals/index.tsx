// 신상품 위젯 — React Query로 자체 데이터 캐싱
"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/section";
import { ProductCard } from "@/entities/product";
import { useProducts } from "@/entities/product/api/use-products";
import { Link } from "@/application/i18n/routing";
import { ArrowRight } from "lucide-react";

export function NewArrivals() {
  const t = useTranslations("sections");
  const { data, isLoading } = useProducts({ is_new: true, limit: 8 });
  const products = data?.products ?? [];

  if (isLoading) {
    return (
      <Section
        title={t("newArrivals")}
        subtitle={t("newArrivalsDesc")}
        className="bg-gray-50/50"
      >
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </Section>
    );
  }

  if (products.length === 0) return null;

  return (
    <Section
      title={t("newArrivals")}
      subtitle={t("newArrivalsDesc")}
      className="bg-gray-50/50"
    >
      <div className="grid grid-cols-2 gap-3">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          {t("newArrivalsDesc")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
