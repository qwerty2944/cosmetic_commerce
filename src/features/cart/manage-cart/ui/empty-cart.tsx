// 장바구니 비어있을 때 표시하는 UI
"use client";

import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import { Link } from "@/application/i18n/routing";

export function EmptyCart() {
  const t = useTranslations("common");

  return (
    <div className="text-center py-20">
      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-200" />
      <p className="text-lg text-subtext mb-6">{t("emptyCart")}</p>
      <Link href="/products">
        <Button variant="default" className="rounded-full">
          {t("continueShopping")}
        </Button>
      </Link>
    </div>
  );
}
