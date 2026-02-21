"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/application/i18n/routing";
import { cn } from "@/shared/lib/utils";

const slides = [
  {
    titleKey: "slide1Title",
    subtitleKey: "slide1Subtitle",
    ctaKey: "slide1Cta",
    href: "/products",
    gradient: "from-pink-100 via-rose-50 to-pink-50",
    accentColor: "bg-primary",
  },
  {
    titleKey: "slide2Title",
    subtitleKey: "slide2Subtitle",
    ctaKey: "slide2Cta",
    href: "/products",
    gradient: "from-amber-50 via-orange-50 to-yellow-50",
    accentColor: "bg-accent",
  },
  {
    titleKey: "slide3Title",
    subtitleKey: "slide3Subtitle",
    ctaKey: "slide3Cta",
    href: "/about",
    gradient: "from-green-50 via-emerald-50 to-teal-50",
    accentColor: "bg-emerald-600",
  },
];

export function HeroBanner() {
  const t = useTranslations("hero");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0">
              <div
                className={cn(
                  "relative h-[320px] bg-gradient-to-r",
                  slide.gradient
                )}
              >
                <div className="px-4 h-full flex items-center">
                  <AnimatePresence mode="wait">
                    {selectedIndex === idx && (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-lg"
                      >
                        <h2 className="text-2xl font-bold text-foreground leading-tight whitespace-pre-line mb-3">
                          {t(slide.titleKey)}
                        </h2>
                        <p className="text-sm text-subtext mb-4">
                          {t(slide.subtitleKey)}
                        </p>
                        <Link
                          href={slide.href}
                          className={cn(
                            "inline-flex items-center px-6 py-3 rounded-full text-white font-medium text-sm transition-transform hover:scale-105",
                            slide.accentColor
                          )}
                        >
                          {t(slide.ctaKey)}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative circles */}
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/30 blur-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              selectedIndex === idx
                ? "bg-primary w-6"
                : "bg-foreground/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}
