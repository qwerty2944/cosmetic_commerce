"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function BrandStory() {
  const t = useTranslations("sections");

  const points = [
    { icon: Leaf, text: t("brandStoryPoint1") },
    { icon: Shield, text: t("brandStoryPoint2") },
    { icon: Heart, text: t("brandStoryPoint3") },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 bg-gradient-to-br from-primary-light via-white to-primary-light/30 relative overflow-hidden"
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl" />

      <div className="px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 block">
            {t("brandStory")}
          </span>
          <h2 className="text-2xl font-bold text-foreground leading-tight whitespace-pre-line mb-4">
            {t("brandStoryTitle")}
          </h2>
          <p className="text-sm text-subtext leading-relaxed mb-6">
            {t("brandStoryDesc")}
          </p>

          <div className="space-y-3 mb-6">
            {points.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {point.text}
                </span>
              </motion.div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            {t("brandStory")}
          </Link>
        </motion.div>

        {/* Visual - simplified for mobile app */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center justify-center"
        >
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-primary-light to-white flex items-center justify-center">
              <div className="text-center">
                <span className="text-2xl font-bold text-primary block">
                  QINMU
                </span>
                <span className="text-[10px] text-subtext mt-0.5 block">
                  K-Beauty Premium
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
