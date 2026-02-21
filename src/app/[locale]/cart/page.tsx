// 장바구니 페이지
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import { formatPrice } from "@/shared/lib/utils";
import { EmptyCart } from "@/features/cart/manage-cart/ui/empty-cart";

export default function CartPage() {
  const t = useTranslations("common");

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-foreground mb-6">
          {t("cart")}
        </h1>

        {/* 빈 장바구니 */}
        <EmptyCart />

        {/* 장바구니 요약 (비어있을 때 숨김, 템플릿으로 보존) */}
        <div className="hidden">
          <div className="border-t border-gray-100 pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">{t("total")}</span>
              <span className="text-2xl font-bold text-foreground">
                ₩{formatPrice(0)}
              </span>
            </div>
            <Button size="lg" className="w-full rounded-full">
              {t("checkout")}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
