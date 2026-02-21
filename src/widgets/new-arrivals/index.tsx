"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/section";
import { ProductCard } from "@/entities/product";
import { mockProducts } from "@/shared/lib/mock-data";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

export function NewArrivals() {
  const t = useTranslations("sections");
  const newProducts = mockProducts.filter((p) => p.is_new);

  return (
    <Section
      title={t("newArrivals")}
      subtitle={t("newArrivalsDesc")}
      className="bg-gray-50/50"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {newProducts.map((product, idx) => (
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
