"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const promoSlides = [
  {
    id: 1,
    gradient: "from-pink-400 to-rose-500",
    emoji: "🌸",
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
  },
  {
    id: 2,
    gradient: "from-amber-400 to-orange-500",
    emoji: "✨",
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
  },
  {
    id: 3,
    gradient: "from-emerald-400 to-teal-500",
    emoji: "🌿",
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
  },
];

export function SideBanner() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = promoSlides[current];

  return (
    <aside className="side-banner">
      <div className="w-full h-full flex flex-col items-center justify-center px-8 gap-10">
        {/* Brand Logo Area */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-wider text-gray-800">
            <span className="text-primary">QIN</span>
            <span className="text-foreground">MU</span>
          </h2>
          <p className="text-xs text-gray-400 tracking-[0.3em] mt-1 uppercase">
            沁木國際
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">Premium K-Beauty</p>
        </div>

        {/* Promo Slide */}
        <div className="relative w-[260px] h-[260px] rounded-3xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex flex-col items-center justify-center text-white p-6`}
            >
              <span className="text-5xl mb-3">{slide.emoji}</span>
              <p className="text-base font-bold text-center leading-snug whitespace-pre-line">
                {t(slide.titleKey)}
              </p>
              <p className="text-xs mt-2 opacity-80 text-center">
                {t(slide.subtitleKey)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {promoSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  current === idx ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slogan */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            자연에서 찾은 순수한 아름다움
          </p>
          <p className="text-xs text-gray-400">
            Nature-inspired K-Beauty
          </p>
        </div>

        {/* Decorative Element */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        <div className="text-center">
          <p className="text-[10px] text-gray-400 tracking-wider">
            VEGAN &bull; CLEAN &bull; SUSTAINABLE
          </p>
        </div>
      </div>
    </aside>
  );
}
