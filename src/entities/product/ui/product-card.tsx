// 상품 카드 UI 컴포넌트
// 상품 목록에서 개별 상품을 표시하는 카드 (이미지, 이름, 가격, 평점, 배지)
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { Badge } from "@/shared/ui/badge";
import { formatPrice, getDiscountPercent } from "@/shared/lib/utils";
import { Link } from "@/application/i18n/routing";
import { useLocale } from "next-intl";
import type { Locale } from "@/shared/config/i18n";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const locale = useLocale() as Locale;
  const name = product.name[locale] || product.name.ko;
  const hasDiscount = product.sale_price !== null;
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.sale_price!)
    : 0;
  const imageUrl = product.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-square mb-3">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 480px) 50vw, 240px"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <span className="text-xs opacity-50">{name}</span>
              </div>
            </div>
          )}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_best && <Badge variant="best">BEST</Badge>}
            {product.is_new && <Badge variant="new">NEW</Badge>}
            {hasDiscount && <Badge variant="sale">-{discount}%</Badge>}
          </div>
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"
            whileHover={{ scale: 1.03 }}
          />
        </div>
        <div className="space-y-1 px-1">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-xs text-subtext">
              {product.rating} ({formatPrice(product.review_count)})
            </span>
          </div>
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-xs text-subtext line-through">
                ₩{formatPrice(product.price)}
              </span>
            )}
            <span className="text-sm font-bold text-foreground">
              ₩{formatPrice(hasDiscount ? product.sale_price! : product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs font-bold text-red-500">
                {discount}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
