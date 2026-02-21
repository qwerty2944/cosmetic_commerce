// 공통 유틸리티 함수
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSS 클래스 병합 (조건부 클래스 적용 시 사용)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 가격을 한국 원화 형식으로 포맷 (예: 1,000)
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price);
}

// 할인율 계산 (정가 대비 할인가의 퍼센트)
export function getDiscountPercent(price: number, salePrice: number): number {
  return Math.round(((price - salePrice) / price) * 100);
}
