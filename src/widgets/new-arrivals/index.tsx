// 신상품 위젯 — props로 데이터 받아 렌더링
"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/section";
import { ProductCard } from "@/entities/product";
import type { Product } from "@/entities/product/types";
import { Link } from "@/application/i18n/routing";
import { ArrowRight } from "lucide-react";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  const t = useTranslations("sections");

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
