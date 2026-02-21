// 상품 리뷰 목록 — 상세 페이지 하단에 표시
"use client";

import { motion } from "framer-motion";
import { ReviewCard } from "./review-card";
import type { Review } from "../types";

interface ProductReviewsProps {
  reviews: Review[];
  title: string;
}

export function ProductReviews({ reviews, title }: ProductReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16"
    >
      <h2 className="text-xl font-bold mb-6">
        {title} ({reviews.length})
      </h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </motion.div>
  );
}
