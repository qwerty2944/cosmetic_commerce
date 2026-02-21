"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/section";
import { ProductCard } from "@/entities/product";
import { mockProducts } from "@/shared/lib/mock-data";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function BestSellers() {
  const t = useTranslations("sections");
  const bestProducts = mockProducts.filter((p) => p.is_best);

  return (
    <Section title={t("bestSellers")} subtitle={t("bestSellersDesc")}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {bestProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          {t("bestSellersDesc")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
