"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  ShoppingBag,
  Grid3X3,
  User,
  Info,
  Globe,
  ChevronRight,
  Droplets,
  Palette,
  Bath,
  Scissors,
  Flower2,
  Sun,
  Smile,
  Gift,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { localeNames, type Locale } from "@/shared/config/i18n";
import { cn } from "@/shared/lib/utils";
import { useDrawerStore } from "@/shared/lib/drawer-store";

const categoryIcons: Record<string, React.ElementType> = {
  Droplets,
  Palette,
  Bath,
  Scissors,
  Flower2,
  Sun,
  Smile,
  Gift,
};

const categories = [
  { slug: "skincare", icon: "Droplets" },
  { slug: "makeup", icon: "Palette" },
  { slug: "bodycare", icon: "Bath" },
  { slug: "haircare", icon: "Scissors" },
  { slug: "fragrance", icon: "Flower2" },
  { slug: "suncare", icon: "Sun" },
  { slug: "masks", icon: "Smile" },
  { slug: "sets", icon: "Gift" },
];

export function DrawerMenu() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, close } = useDrawerStore();

  // Prevent body scroll when drawer is open (mobile only)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isOpen && !isDesktop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    close();
  };

  const navItems = [
    { icon: Home, label: t("common.home"), href: "/" as const },
    { icon: Grid3X3, label: t("common.products"), href: "/products" as const },
    { icon: ShoppingBag, label: t("common.cart"), href: "/cart" as const },
    { icon: User, label: t("common.mypage"), href: "/auth" as const },
    { icon: Info, label: t("common.about"), href: "/about" as const },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (mobile only - hidden on lg via CSS) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="drawer-overlay"
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="drawer-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold tracking-wider">
                  <span className="text-primary">QIN</span>
                  <span className="text-foreground">MU</span>
                </h2>
                <p className="text-[10px] text-gray-400 tracking-wider">沁木國際</p>
              </div>
              <button
                onClick={close}
                className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={close}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                          isActive
                            ? "bg-primary/5 text-primary font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.label}</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Categories */}
            <div className="px-4 pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                {t("common.products")}
              </p>
              <div className="grid grid-cols-4 lg:grid-cols-3 gap-2">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.icon];
                  return (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      onClick={close}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] text-gray-600 text-center">
                        {t(`categories.${cat.slug}`)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Language Selector */}
            <div className="px-4 pb-4 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 mb-3 px-4">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {t("common.language")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(localeNames) as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-sm transition-colors",
                      locale === loc
                        ? "bg-primary text-white font-medium"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {localeNames[loc]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
