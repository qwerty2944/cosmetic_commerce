// 장바구니 관리 스토어 (mutation 전용)
// 상품 추가, 삭제, 수량 변경, 초기화
// persist key "qinmu-cart"로 localStorage에 저장
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/entities/cart/types";

interface CartState {
  items: CartItem[];
  // 장바구니에 상품 추가 (이미 있으면 수량 증가)
  addToCart: (productId: string, quantity?: number) => void;
  // 장바구니에서 상품 제거
  removeFromCart: (productId: string) => void;
  // 특정 상품의 수량 변경 (0 이하면 자동 제거)
  updateQuantity: (productId: string, quantity: number) => void;
  // 장바구니 전체 비우기
  clearCart: () => void;
  // 장바구니 고유 상품 수
  getCartCount: () => number;
  // 장바구니 전체 상품 수량 합계
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (productId, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === productId
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getCartCount: () => {
        return get().items.length;
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "qinmu-cart", // localStorage key — 변경 시 기존 장바구니 데이터 유실
    }
  )
);
