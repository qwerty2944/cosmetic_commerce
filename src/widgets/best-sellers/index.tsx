"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/section";
import { ProductCard } from "@/entities/product";
import type { Product } from "@/entities/product/types";
import { productsApi } from "@/shared/api";
import { Link } from "@/application/i18n/routing";
import { ArrowRight } from "lucide-react";

export function BestSellers() {
  const t = useTranslations("sections");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.list({ is_best: true }).then(({ data }) => {
      setProducts(data.products);
    });
  }, []);

  if (products.length === 0) return null;

  return (
    <Section title={t("bestSellers")} subtitle={t("bestSellersDesc")}>
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
          {t("bestSellersDesc")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}
