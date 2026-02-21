"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ children, className, title, subtitle }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={cn("py-8", className)}
    >
      <div className="px-4">
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h2 className="text-xl font-bold text-foreground mb-1">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-subtext text-sm">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
