// 홈페이지 — 서버 컴포넌트에서 데이터 패칭 후 위젯에 전달
import { HeroBanner } from "@/widgets/hero-banner";
import { CategoryNav } from "@/widgets/category-nav";
import { BestSellers } from "@/widgets/best-sellers";
import { ReviewsSection } from "@/widgets/reviews-section";
import { NewArrivals } from "@/widgets/new-arrivals";
import { BrandStory } from "@/widgets/brand-story";
import { getProducts } from "@/shared/lib/product-queries";

export default async function HomePage() {
  let bestProducts: Awaited<ReturnType<typeof getProducts>> = { products: [], total: 0 };
  let newProducts: Awaited<ReturnType<typeof getProducts>> = { products: [], total: 0 };

  try {
    [bestProducts, newProducts] = await Promise.all([
      getProducts({ is_best: true, limit: 8 }),
      getProducts({ is_new: true, limit: 8 }),
    ]);
  } catch (err) {
    console.error("[HomePage] Failed to fetch products:", err);
  }

  return (
    <>
      <HeroBanner />
      <CategoryNav />
      <BestSellers products={bestProducts.products} />
      <ReviewsSection />
      <NewArrivals products={newProducts.products} />
      <BrandStory />
    </>
  );
}
