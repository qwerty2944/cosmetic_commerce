// 다국어(i18n) 설정 — 지원 로케일 및 기본 로케일 정의
export const locales = ["ko", "en", "zh-CN", "zh-TW"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

// 각 로케일의 표시 이름
export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};
