// 상품 상세 페이지 — 서버는 params만 읽고 데이터는 React Query 클라이언트 캐싱
import { getProductById } from "@/shared/lib/product-queries";
import { ProductDetailContent } from "@/entities/product/ui/product-detail-content";
import type { Locale } from "@/shared/config/i18n";
import type { Metadata } from "next";

// generateMetadata 유지 (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  try {
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
  } catch {
    return {};
  }
}

// 서버 컴포넌트: params만 읽기 (sync 가능하게 async 최소화)
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  return <ProductDetailContent id={id} locale={locale} />;
}
