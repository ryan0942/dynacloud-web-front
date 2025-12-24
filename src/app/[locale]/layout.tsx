import "@/styles/globals.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next";
import type React from "react";

import { CookieConsent } from "@/components/cookie-consent";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { routing } from "@/i18n/routing";

import LayoutLoading from "./loading";

const inter = Urbanist({ subsets: ["latin"] });

/** 根據語系產生對應的 metadata */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isZhTw = locale === "tw";

  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const title = isZhTw
    ? "Dynacloud | 全方位雲端解決方案與數位轉型策略夥伴"
    : "Dynacloud | Comprehensive Cloud Solutions and Digital Transformation Strategy Partner";
  const description = isZhTw
    ? "Dynacloud 雲動力資訊提供全方位雲端解決方案，提供 GCP 、Google Workspace及多樣雲端工具，協助客戶從「規劃」、「採購」至「驗收」，挑選最合適的雲端應用產品，伴隨客戶並一同審視雲端廠商之效度與服務品質，以最有效益的方式，與企業共同成長，達成數位轉型的願景。"
    : "Dynacloud provides comprehensive cloud solutions, offering GCP, Google Workspace, and various cloud tools. We assist clients from planning and procurement to acceptance, helping them select the most suitable cloud applications. We accompany our clients in evaluating cloud vendors' effectiveness and service quality, growing together with enterprises in the most efficient way to achieve the vision of digital transformation.";

  return {
    title: {
      default: title,
      template: isZhTw
        ? "%s | Dynacloud | 全方位雲端解決方案與數位轉型策略夥伴"
        : "%s | Dynacloud | Comprehensive Cloud Solutions and Digital Transformation Strategy Partner",
    },
    description,
    keywords: isZhTw
      ? "雲端解決方案, 數位轉型, IT 顧問, 雲動力, Dynacloud, GCP, Google Workspace, 雲端工具, 數位轉型策略夥伴, 雲端廠商, 雲端服務, 雲端應用產品, 雲端解決方案, 數位轉型策略夥伴, 雲端廠商, 雲端服務, 雲端應用產品"
      : "cloud solutions, digital transformation, IT consulting, Dynacloud, GCP, Google Workspace, cloud tools, digital transformation strategy partner, cloud vendor, cloud service, cloud application product, cloud solution, digital transformation strategy partner, cloud vendor, cloud service, cloud application product",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isZhTw ? "zh_TW" : "en_US",
      url: `${baseUrl}/${locale}`,
      siteName: title,
      images: [
        {
          url: `${baseUrl}/logo.svg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/logo.svg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "zh-TW": `${baseUrl}/tw`,
        en: `${baseUrl}/en`,
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale === "tw" ? "zh-TW" : "en-US"}>
      <GoogleTagManager gtmId="GTM-WZP689ZH" />
      <body
        className={`${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100`}
      >
        <NextIntlClientProvider>
          <NuqsAdapter>
            <QueryProvider>
              <LayoutLoading />
              <ThemeProvider
                disableTransitionOnChange
                enableSystem
                attribute="class"
                defaultTheme="light"
              >
                <Header />
                {children}
                <Footer />
                <CookieConsent />
                <Toaster richColors position="top-center" />
              </ThemeProvider>
            </QueryProvider>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-SVZ5X5F55C" />
    </html>
  );
}
