"use client";

import { Home, Search, ShoppingBag, User, Grid3X3 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, labelKey: "home", href: "/" },
  { icon: Grid3X3, labelKey: "products", href: "/products" },
  { icon: Search, labelKey: "search", href: "/products" },
  { icon: ShoppingBag, labelKey: "cart", href: "/cart" },
  { icon: User, labelKey: "mypage", href: "/auth" },
] as const;

export function MobileNav() {
  const t = useTranslations("common");
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-subtext"
              )}
            >
              <item.icon
                className={cn("w-5 h-5", isActive && "text-primary")}
              />
              <span className="text-[10px] font-medium">
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
