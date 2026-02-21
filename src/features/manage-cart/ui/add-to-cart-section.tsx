// 장바구니 추가 섹션 — 수량 선택 + 장바구니/찜 버튼 (클라이언트)
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, Truck, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import type { Product } from "@/entities/product/types";

interface AddToCartSectionProps {
  product: Product;
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const t = useTranslations();
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {/* 수량 선택 */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{t("common.quantity")}</span>
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <Button size="lg" className="flex-1 rounded-full">
          <ShoppingBag className="w-5 h-5 mr-2" />
          {t("common.addToCart")}
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-4">
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      {/* 배송 정보 */}
      <div className="border-t border-gray-100 pt-4 space-y-3">
        <div className="flex items-center gap-3 text-sm text-subtext">
          <Truck className="w-4 h-4" />
          <span>{t("product.freeShipping")}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-subtext">
          <Shield className="w-4 h-4" />
          <span>{t("product.deliveryTime")}</span>
        </div>
      </div>
    </>
  );
}
