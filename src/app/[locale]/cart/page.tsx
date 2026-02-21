"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui/button";
import { Link } from "@/i18n/routing";
import { formatPrice } from "@/shared/lib/utils";

export default function CartPage() {
  const t = useTranslations("common");

  // Empty cart state for now
  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl font-bold text-foreground mb-6">
          {t("cart")}
        </h1>

        {/* Empty Cart */}
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-200" />
          <p className="text-lg text-subtext mb-6">{t("emptyCart")}</p>
          <Link href="/products">
            <Button variant="default" className="rounded-full">
              {t("continueShopping")}
            </Button>
          </Link>
        </div>

        {/* Cart Summary (hidden when empty, shown as template) */}
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
