"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/application/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="px-4 py-8">
        {/* Brand */}
        <div className="mb-6">
          <h2 className="text-lg font-bold tracking-wider mb-1">
            <span className="text-primary">QIN</span>
            <span className="text-foreground">MU</span>
          </h2>
          <p className="text-xs text-gray-400 tracking-wider">沁木國際 &bull; Premium K-Beauty</p>
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-6 text-sm">
          <Link
            href="/about"
            className="text-subtext hover:text-primary transition-colors"
          >
            {t("company")}
          </Link>
          <span className="text-subtext hover:text-primary transition-colors cursor-pointer">
            {t("terms")}
          </span>
          <span className="text-subtext hover:text-primary transition-colors cursor-pointer">
            {t("privacy")}
          </span>
        </div>

        {/* Contact */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-subtext">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t("phone")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-subtext">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t("email")}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-subtext">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{t("address")}</span>
          </div>
          <p className="text-xs text-subtext">{t("csHours")}</p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-subtext">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
