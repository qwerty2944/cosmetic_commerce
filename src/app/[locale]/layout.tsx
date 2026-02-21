import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/application/i18n/routing";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { MobileNav } from "@/widgets/mobile-nav";
import { SideBanner } from "@/widgets/side-banner";
import { AppProviders } from "@/application";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "QINMU | 沁木國際 — Premium K-Beauty",
    template: "%s | QINMU",
  },
  description: "프리미엄 K-뷰티 브랜드 QINMU(沁木國際). 자연에서 영감을 받은 스킨케어.",
  openGraph: {
    siteName: "QINMU",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <div className="layout-wrapper">
              {/* Fixed left-side promotional banner (desktop only) */}
              <SideBanner />

              {/* Mobile-app shell */}
              <div className="app-shell">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <MobileNav />
              </div>
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
