// 카테고리 엔티티 타입 정의
export interface Category {
  id: string;
  name_ko: string;
  name_en: string;
  name_zh_cn: string;
  name_zh_tw: string;
  icon: string;
  slug: string;
  sort_order: number;
}
