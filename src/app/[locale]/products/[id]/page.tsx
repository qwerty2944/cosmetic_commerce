// 상품 상세 페이지 — 서버 컴포넌트 (SSR) + generateMetadata
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/shared/lib/product-queries";
import { ProductImage } from "@/entities/product/ui/product-image";
import { ProductInfo } from "@/entities/product/ui/product-info";
import { ProductReviews } from "@/entities/review/ui/product-reviews";
import { AddToCartSection } from "@/features/manage-cart/ui/add-to-cart-section";
import { Link } from "@/application/i18n/routing";
import { mockReviews } from "@/shared/lib/mock-data";
import type { Locale } from "@/shared/config/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const product = await getProductById(id);

  if (!product) return {};

  const name = product.name[locale as Locale] || product.name.ko;
  const description =
    product.description?.[locale as Locale] || product.description?.ko;

  return {
    title: `${name} | QINMU`,
    description,
    openGraph: {
      title: name,
      description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations();
  const product = await getProductById(id);

  if (!product) notFound();

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
        {/* 상품 이미지 */}
        <ProductImage product={product} name={name} />

        {/* 상품 정보 */}
        <ProductInfo
          product={product}
          locale={locale as Locale}
          reviewsLabel={t("product.reviews")}
        />

        {/* 수량 선택 + 장바구니 (클라이언트) */}
        <AddToCartSection product={product} />
      </div>

      {/* 리뷰 섹션 */}
      <ProductReviews
        reviews={productReviews}
        title={t("product.reviews")}
      />
    </div>
  );
}
