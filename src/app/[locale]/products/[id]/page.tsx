"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { mockProducts, mockReviews } from "@/shared/lib/mock-data";
import { formatPrice, getDiscountPercent } from "@/shared/lib/utils";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/shared/config/i18n";

export default function ProductDetailPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-subtext">Product not found</p>
        <Link href="/products" className="text-primary mt-4 inline-block">
          <ArrowLeft className="w-4 h-4 inline mr-1" />
          {t("common.products")}
        </Link>
      </div>
    );
  }

  const name = product.name[locale] || product.name.ko;
  const description = product.description[locale] || product.description.ko;
  const hasDiscount = product.sale_price !== null;
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.sale_price!)
    : 0;
  const productReviews = mockReviews.filter(
    (r) => r.product_id === product.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-subtext hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("common.products")}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-3xl bg-gray-50 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-300">
              <ShoppingBag className="w-20 h-20 mx-auto mb-4 opacity-30" />
              <span className="text-sm opacity-50">{name}</span>
            </div>
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.is_best && (
              <Badge variant="best" className="text-xs">
                BEST
              </Badge>
            )}
            {product.is_new && (
              <Badge variant="new" className="text-xs">
                NEW
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="sale" className="text-xs">
                -{discount}%
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {name}
            </h1>
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
                {product.rating} ({formatPrice(product.review_count)}{" "}
                {t("product.reviews")})
              </span>
            </div>
          </div>

          <div className="space-y-1">
            {hasDiscount && (
              <p className="text-lg text-subtext line-through">
                ₩{formatPrice(product.price)}
              </p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                ₩
                {formatPrice(
                  hasDiscount ? product.sale_price! : product.price
                )}
              </span>
              {hasDiscount && (
                <span className="text-lg font-bold text-red-500">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          <p className="text-subtext leading-relaxed">{description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{t("common.quantity")}</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1 rounded-full">
              <ShoppingBag className="w-5 h-5 mr-2" />
              {t("common.addToCart")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-4"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-subtext">
              <Truck className="w-4 h-4" />
              <span>{t("product.freeShipping")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-subtext">
              <Shield className="w-4 h-4" />
              <span>{t("product.deliveryTime")}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      {productReviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-xl font-bold mb-6">
            {t("product.reviews")} ({productReviews.length})
          </h2>
          <div className="space-y-4">
            {productReviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-2xl p-5 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {review.user_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.user_name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-subtext">{review.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
