"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/entities/product";
import { mockProducts, mockCategories } from "@/shared/lib/mock-data";
import { cn } from "@/shared/lib/utils";

export default function ProductsPage() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? mockProducts.filter((p) => p.category_id === selectedCategory)
    : mockProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {t("common.products")}
        </h1>
        <p className="text-subtext mt-1">{t("sections.bestSellersDesc")}</p>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm whitespace-nowrap hover:border-primary hover:text-primary transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
        <button
          onClick={() => setSelectedCategory(null)}
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
            onClick={() => setSelectedCategory(cat.id)}
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-subtext">No products found.</p>
        </div>
      )}
    </div>
  );
}
