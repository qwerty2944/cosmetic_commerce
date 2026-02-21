"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold tracking-wider mb-3">
              <span className="text-primary">BL</span>
              <span className="text-foreground">OO</span>
              <span className="text-primary">MING</span>
            </h2>
            <p className="text-sm text-subtext leading-relaxed">
              Premium K-Beauty
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              {t("company")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-subtext hover:text-primary transition-colors"
                >
                  {t("company")}
                </Link>
              </li>
              <li>
                <span className="text-sm text-subtext hover:text-primary transition-colors cursor-pointer">
                  {t("terms")}
                </span>
              </li>
              <li>
                <span className="text-sm text-subtext hover:text-primary transition-colors cursor-pointer">
                  {t("privacy")}
                </span>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              {t("cs")}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-subtext">
                <Phone className="w-3.5 h-3.5" />
                {t("phone")}
              </li>
              <li className="flex items-center gap-2 text-sm text-subtext">
                <Mail className="w-3.5 h-3.5" />
                {t("email")}
              </li>
              <li className="text-sm text-subtext">{t("csHours")}</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-foreground">
              Address
            </h3>
            <div className="flex items-start gap-2 text-sm text-subtext">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>{t("address")}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-xs text-subtext text-center">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
