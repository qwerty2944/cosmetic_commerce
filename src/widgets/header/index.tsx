"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { DrawerMenu } from "@/widgets/drawer-menu";
import { useCartStore } from "@/features/cart/store";
import { useDrawerStore } from "@/shared/lib/drawer-store";

export function Header() {
  const t = useTranslations();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getTotalItems());
  const openDrawer = useDrawerStore((s) => s.open);

  return (
    <>
      <header className="app-header">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Hamburger */}
            <button
              onClick={openDrawer}
              className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-lg font-bold tracking-wider">
                <span className="text-primary">QIN</span>
                <span className="text-foreground">MU</span>
              </h1>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>
              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-gray-50 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext" />
                  <input
                    type="text"
                    placeholder={t("header.searchPlaceholder")}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-primary"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-subtext" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Drawer Menu */}
      <DrawerMenu />
    </>
  );
}
