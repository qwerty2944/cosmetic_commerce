// 리뷰 엔티티 타입 정의
export interface Review {
  id: string;
  product_id: string;
  user_name: string;
  rating: number;
  content: string;
  avatar_url: string | null;
  created_at: string;
}
