// 리뷰 카드 UI 컴포넌트 — 사용자 아바타, 별점, 리뷰 내용 표시
import { StarRating } from "./star-rating";
import type { Review } from "../types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
          <span className="text-xs font-bold text-primary">
            {review.user_name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium">{review.user_name}</p>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-sm text-subtext">{review.content}</p>
    </div>
  );
}
