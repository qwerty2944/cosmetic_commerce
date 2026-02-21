"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/section";
import { mockReviews } from "@/shared/lib/mock-data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "fill-accent text-accent" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const t = useTranslations("sections");

  return (
    <Section title={t("reviews")} subtitle={t("reviewsDesc")}>
      <div className="grid grid-cols-1 gap-3">
        {mockReviews.slice(0, 6).map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {review.user_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {review.user_name}
                  </p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <Quote className="w-5 h-5 text-primary/20" />
            </div>
            <p className="text-sm text-subtext leading-relaxed line-clamp-3">
              {review.content}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
