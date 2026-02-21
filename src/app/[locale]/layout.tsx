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
