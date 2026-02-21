// 상품 상세 콘텐츠 — React Query로 캐시된 데이터 표시
"use client";

import { ArrowLeft, PackageX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useProductById } from "../api/use-products";
import { ProductImage } from "./product-image";
import { ProductInfo } from "./product-info";
import { ProductReviews } from "@/entities/review/ui/product-reviews";
import { AddToCartSection } from "@/features/manage-cart/ui/add-to-cart-section";
import { Link } from "@/application/i18n/routing";
import { mockReviews } from "@/shared/lib/mock-data";
import type { Locale } from "@/shared/config/i18n";

interface ProductDetailContentProps {
  id: string;
  locale: string;
}

// 상품 상세 스켈레톤
function DetailSkeleton() {
  return (
    <div className="px-4 py-4">
      <div className="h-4 bg-gray-100 rounded animate-pulse w-20 mb-6" />
      <div className="aspect-square rounded-3xl bg-gray-100 animate-pulse mb-6" />
      <div className="space-y-4">
        <div className="h-6 bg-gray-100 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-gray-100 rounded animate-pulse w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-5/6" />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <div className="h-12 bg-gray-100 rounded-full animate-pulse flex-1" />
        <div className="h-12 w-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function ProductDetailContent({ id, locale }: ProductDetailContentProps) {
  const t = useTranslations();
  const { data: product, isLoading, error } = useProductById(id);

  if (isLoading) return <DetailSkeleton />;

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <PackageX className="w-16 h-16 text-gray-300 mb-6" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          상품을 찾을 수 없습니다
        </h2>
        <p className="text-sm text-subtext mb-8 max-w-xs">
          요청하신 상품이 존재하지 않거나 삭제되었습니다.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition-colors"
        >
          {t("common.products")}
        </Link>
      </div>
    );
  }

  const name = product.name[locale as Locale] || product.name.ko;
  const productReviews = mockReviews.filter((r) => r.product_id === product.id);

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
        <ProductImage product={product} name={name} />
        <ProductInfo
          product={product}
          locale={locale as Locale}
          reviewsLabel={t("product.reviews")}
        />
        <AddToCartSection product={product} />
      </div>

      <ProductReviews
        reviews={productReviews}
        title={t("product.reviews")}
      />
    </div>
  );
}
