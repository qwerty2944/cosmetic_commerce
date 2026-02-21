export interface LocalizedString {
  ko: string;
  en: string;
  "zh-CN": string;
  "zh-TW": string;
}

export interface Product {
  id: string;
  category_id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  sale_price: number | null;
  images: string[];
  rating: number;
  review_count: number;
  is_best: boolean;
  is_new: boolean;
  created_at: string;
}
