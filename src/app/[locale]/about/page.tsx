import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import AboutPage from "@/components/about";
import { getAboutQuery } from "@/queries/about";

/** 將 HTML 字串轉換為純文字 */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "") // 移除所有 HTML 標籤
    .replace(/&nbsp;/g, " ") // 替換 &nbsp;
    .replace(/&amp;/g, "&") // 替換 &amp;
    .replace(/&lt;/g, "<") // 替換 &lt;
    .replace(/&gt;/g, ">") // 替換 &gt;
    .replace(/&quot;/g, '"') // 替換 &quot;
    .replace(/&#39;/g, "'") // 替換 &#39;
    .replace(/\s+/g, " ") // 合併多餘空白
    .trim();
}

/** 產生 AboutPage JSON-LD */
function generateAboutJsonLd(locale: string, description: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: isZhTw ? "關於我們" : "About Us",
    description,
    url: `${baseUrl}/${locale}/about`,
    isPartOf: {
      "@type": "WebSite",
      name: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "Organization",
      name: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
      url: baseUrl,
      description,
    },
    inLanguage: isZhTw ? "zh-TW" : "en",
  };
}

/** 動態 Metadata */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  /** 取得關於我們資料 */
  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(getAboutQuery(locale));
  const data = response?.result;

  /** 將 HTML 內容轉換為純文字並截取前 160 字元作為 description */
  const plainText = data?.content ? htmlToPlainText(data.content) : "";
  const description =
    plainText.length > 160 ? `${plainText.slice(0, 157)}...` : plainText;

  const title = isZhTw ? "關於我們" : "About Us";
  const fallbackDescription = isZhTw
    ? "了解雲動力的發展歷程與我們對創新 IT 解決方案的承諾，認識我們的團隊、價值觀，以及我們如何協助企業在數位時代蓬勃發展。"
    : "Discover Dynacloud's journey and our commitment to providing innovative IT solutions. Learn about our team, values, and how we help businesses thrive in the digital age.";

  return {
    title,
    description: description || fallbackDescription,
    keywords: isZhTw
      ? "關於我們, 雲動力, IT 解決方案, 團隊, 價值觀, 數位轉型, Dynacloud"
      : "about us, Dynacloud, IT solutions, team, values, digital transformation",
    openGraph: {
      title,
      description: description || fallbackDescription,
      type: "website",
      url: `${baseUrl}/${locale}/about`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || fallbackDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        "zh-TW": `${baseUrl}/tw/about`,
        en: `${baseUrl}/en/about`,
      },
    },
  };
}

export default async function Page() {
  const locale = await getLocale();

  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(getAboutQuery(locale));
  const data = response?.result;

  /** 將 HTML 內容轉換為純文字作為 JSON-LD description */
  const plainText = data?.content ? htmlToPlainText(data.content) : "";
  const description =
    plainText.length > 160 ? `${plainText.slice(0, 157)}...` : plainText;

  const isZhTw = locale === "tw";
  const fallbackDescription = isZhTw
    ? "了解雲動力的發展歷程與我們對創新 IT 解決方案的承諾。"
    : "Discover Dynacloud's journey and our commitment to providing innovative IT solutions.";

  const jsonLd = generateAboutJsonLd(
    locale,
    description || fallbackDescription,
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <AboutPage />
    </HydrationBoundary>
  );
}
