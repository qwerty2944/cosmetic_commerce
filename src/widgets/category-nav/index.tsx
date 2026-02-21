"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Palette,
  Bath,
  Scissors,
  Flower2,
  Sun,
  Smile,
  Gift,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const categories = [
  { slug: "skincare", icon: Droplets, key: "skincare" },
  { slug: "makeup", icon: Palette, key: "makeup" },
  { slug: "bodycare", icon: Bath, key: "bodycare" },
  { slug: "haircare", icon: Scissors, key: "haircare" },
  { slug: "fragrance", icon: Flower2, key: "fragrance" },
  { slug: "suncare", icon: Sun, key: "suncare" },
  { slug: "masks", icon: Smile, key: "masks" },
  { slug: "sets", icon: Gift, key: "sets" },
];

export function CategoryNav() {
  const t = useTranslations("categories");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary-light flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <cat.icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs md:text-sm text-foreground font-medium text-center">
                  {t(cat.key)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
