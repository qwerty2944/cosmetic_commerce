// 홈페이지 — 서버 컴포넌트에서 데이터 패칭 후 위젯에 전달
import { HeroBanner } from "@/widgets/hero-banner";
import { CategoryNav } from "@/widgets/category-nav";
import { BestSellers } from "@/widgets/best-sellers";
import { ReviewsSection } from "@/widgets/reviews-section";
import { NewArrivals } from "@/widgets/new-arrivals";
import { BrandStory } from "@/widgets/brand-story";
import { getProducts } from "@/shared/lib/product-queries";

export default async function HomePage() {
  const [bestSellersData, newArrivalsData] = await Promise.all([
    getProducts({ is_best: true, limit: 8 }),
    getProducts({ is_new: true, limit: 8 }),
  ]);

  return (
    <>
      <HeroBanner />
      <CategoryNav />
      <BestSellers products={bestSellersData.products} />
      <ReviewsSection />
      <NewArrivals products={newArrivalsData.products} />
      <BrandStory />
    </>
  );
}
