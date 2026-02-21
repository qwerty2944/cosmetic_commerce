// 별점 표시 컴포넌트 — 1~5점 별 아이콘 렌더링
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
}

export function StarRating({ rating, size = "sm" }: StarRatingProps) {
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? "fill-accent text-accent" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
