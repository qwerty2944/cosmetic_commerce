"use client";

import { motion } from "framer-motion";
import { Leaf, Eye, Recycle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    { icon: Leaf, title: t("value1"), desc: t("value1Desc") },
    { icon: Eye, title: t("value2"), desc: t("value2Desc") },
    { icon: Recycle, title: t("value3"), desc: t("value3Desc") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          {t("title")}
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="bg-gradient-to-br from-primary-light to-white rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t("mission")}
          </h2>
          <p className="text-lg text-subtext leading-relaxed">
            {t("missionDesc")}
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          {t("values")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                <val.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {val.title}
              </h3>
              <p className="text-sm text-subtext leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Brand Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-foreground rounded-3xl p-10 md:p-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          BLOOMING
        </h2>
        <p className="text-gray-400 text-sm tracking-widest uppercase">
          Premium K-Beauty Since 2024
        </p>
      </motion.div>
    </div>
  );
}
