// 상품 상세 페이지 — 이미지, 정보, 수량 선택, 리뷰 표시
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
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
import { mockReviews } from "@/shared/lib/mock-data";
import { useProductStore } from "@/entities/product/store";
import { ProductImage } from "@/entities/product/ui/product-image";
import { ProductInfo } from "@/entities/product/ui/product-info";
import { ReviewCard } from "@/entities/review/ui/review-card";
import { Link } from "@/application/i18n/routing";
import type { Locale } from "@/shared/config/i18n";

export default function ProductDetailPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const {
    currentProduct: product,
    loading,
    fetchProductById,
    clearCurrentProduct,
  } = useProductStore();

  useEffect(() => {
    if (params.id) {
      fetchProductById(params.id as string);
    }
    return () => clearCurrentProduct();
  }, [params.id, fetchProductById, clearCurrentProduct]);

  // 로딩 스켈레톤
  if (loading) {
    return (
      <div className="px-4 py-4">
        <div className="aspect-square rounded-3xl bg-gray-100 animate-pulse mb-6" />
        <div className="space-y-3">
          <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
          <div className="h-8 bg-gray-100 rounded animate-pulse w-1/3" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-subtext">Product not found</p>
        <Link href="/products" className="text-primary mt-4 inline-block">
          <ArrowLeft className="w-4 h-4 inline mr-1" />
          {t("common.products")}
        </Link>
      </div>
    );
  }

  const name = product.name[locale] || product.name.ko;
  const productReviews = mockReviews.filter(
    (r) => r.product_id === product.id
  );

  return (
    <div className="px-4 py-4">
      {/* 뒤로가기 */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-subtext hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("common.products")}
      </Link>

      <div className="space-y-6">
        {/* 상품 이미지 */}
        <ProductImage product={product} name={name} />

        {/* 상품 정보 */}
        <ProductInfo
          product={product}
          locale={locale}
          reviewsLabel={t("product.reviews")}
        />

        {/* 수량 선택 */}
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

        {/* 액션 버튼 */}
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

        {/* 배송 정보 */}
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
      </div>

      {/* 리뷰 섹션 */}
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
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
