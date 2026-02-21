// 홈페이지 — 위젯들이 React Query로 자체 데이터 캐싱
import { HeroBanner } from "@/widgets/hero-banner";
import { CategoryNav } from "@/widgets/category-nav";
import { BestSellers } from "@/widgets/best-sellers";
import { ReviewsSection } from "@/widgets/reviews-section";
import { NewArrivals } from "@/widgets/new-arrivals";
import { BrandStory } from "@/widgets/brand-story";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryNav />
      <BestSellers />
      <ReviewsSection />
      <NewArrivals />
      <BrandStory />
    </>
  );
}
