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
      className="py-16 md:py-24 bg-gradient-to-br from-primary-light via-white to-primary-light/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-4 block">
              {t("brandStory")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight whitespace-pre-line mb-6">
              {t("brandStoryTitle")}
            </h2>
            <p className="text-subtext leading-relaxed mb-8">
              {t("brandStoryDesc")}
            </p>

            <div className="space-y-4 mb-8">
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
              className="inline-flex items-center px-6 py-3 rounded-full bg-foreground text-white text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              {t("brandStory")}
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-primary-light to-white flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary block">
                    BLOOMING
                  </span>
                  <span className="text-sm text-subtext mt-1 block">
                    K-Beauty Premium
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
