// 상품 정보 UI — 이름, 평점, 가격, 할인율, 설명 표시
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { formatPrice, getDiscountPercent } from "@/shared/lib/utils";
import type { Product } from "../types";
import type { Locale } from "@/shared/config/i18n";

interface ProductInfoProps {
  product: Product;
  locale: Locale;
  reviewsLabel: string;
}

export function ProductInfo({ product, locale, reviewsLabel }: ProductInfoProps) {
  const name = product.name[locale] || product.name.ko;
  const description = product.description[locale] || product.description.ko;
  const hasDiscount = product.sale_price !== null;
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.sale_price!)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      {/* 상품명 + 평점 */}
      <div>
        <h1 className="text-xl font-bold text-foreground mb-2">{name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating)
                    ? "fill-accent text-accent"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-subtext">
            {product.rating} ({formatPrice(product.review_count)} {reviewsLabel})
          </span>
        </div>
      </div>

      {/* 가격 */}
      <div className="space-y-1">
        {hasDiscount && (
          <p className="text-lg text-subtext line-through">
            ₩{formatPrice(product.price)}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            ₩{formatPrice(hasDiscount ? product.sale_price! : product.price)}
          </span>
          {hasDiscount && (
            <span className="text-lg font-bold text-red-500">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* 설명 */}
      <p className="text-subtext leading-relaxed">{description}</p>
    </motion.div>
  );
}
