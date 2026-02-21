// 상품 이미지 UI — 상세 페이지에서 메인 이미지 + 배지 표시
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import type { Product } from "../types";

interface ProductImageProps {
  product: Product;
  name: string;
}

export function ProductImage({ product, name }: ProductImageProps) {
  const imageUrl = product.images?.[0];
  const hasDiscount = product.sale_price !== null;
  const discount = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative aspect-square rounded-3xl bg-gray-50 overflow-hidden"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="480px"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-300">
            <ShoppingBag className="w-20 h-20 mx-auto mb-4 opacity-30" />
            <span className="text-sm opacity-50">{name}</span>
          </div>
        </div>
      )}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {product.is_best && (
          <Badge variant="best" className="text-xs">BEST</Badge>
        )}
        {product.is_new && (
          <Badge variant="new" className="text-xs">NEW</Badge>
        )}
        {hasDiscount && (
          <Badge variant="sale" className="text-xs">-{discount}%</Badge>
        )}
      </div>
    </motion.div>
  );
}
