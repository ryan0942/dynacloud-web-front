import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import PrivacyPolicyPage from "@/components/privacy-policy";
import { getPrivacyPolicyQuery } from "@/queries/privacy-policy";

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

/** 產生 PrivacyPolicy JSON-LD */
function generatePrivacyPolicyJsonLd(locale: string, description: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isZhTw ? "隱私權政策" : "Privacy Policy",
    description,
    url: `${baseUrl}/${locale}/privacy-policy`,
    isPartOf: {
      "@type": "WebSite",
      name: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "Organization",
      name: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
      url: baseUrl,
    },
    inLanguage: isZhTw ? "zh-TW" : "en",
  };
}

/** 動態 Metadata */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  /** 取得隱私權政策資料 */
  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(getPrivacyPolicyQuery(locale));
  const data = response?.result;

  /** 將 HTML 內容轉換為純文字並截取前 160 字元作為 description */
  const plainText = data?.content ? htmlToPlainText(data.content) : "";
  const description =
    plainText.length > 160 ? `${plainText.slice(0, 157)}...` : plainText;

  const title = isZhTw ? "隱私權政策" : "Privacy Policy";
  const fallbackDescription = isZhTw
    ? "雲動力隱私權政策，說明我們如何收集、使用及保護您的個人資料。了解您的資料權利與我們的資料處理方式。"
    : "Dynacloud Privacy Policy explaining how we collect, use and protect your personal data. Learn about your data rights and our data handling practices.";

  return {
    title,
    description: description || fallbackDescription,
    keywords: isZhTw
      ? "隱私權政策, 個人資料保護, 資料收集, 資料使用, 雲動力, Dynacloud"
      : "privacy policy, personal data protection, data collection, data usage, Dynacloud",
    openGraph: {
      title,
      description: description || fallbackDescription,
      type: "website",
      url: `${baseUrl}/${locale}/privacy-policy`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || fallbackDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy-policy`,
      languages: {
        "zh-TW": `${baseUrl}/tw/privacy-policy`,
        en: `${baseUrl}/en/privacy-policy`,
      },
    },
  };
}

export default async function Page() {
  const locale = await getLocale();

  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(getPrivacyPolicyQuery(locale));
  const data = response?.result;

  /** 將 HTML 內容轉換為純文字作為 JSON-LD description */
  const plainText = data?.content ? htmlToPlainText(data.content) : "";
  const description =
    plainText.length > 160 ? `${plainText.slice(0, 157)}...` : plainText;

  const isZhTw = locale === "tw";
  const fallbackDescription = isZhTw
    ? "雲動力隱私權政策，說明我們如何收集、使用及保護您的個人資料。"
    : "Dynacloud Privacy Policy explaining how we collect, use and protect your personal data.";

  const jsonLd = generatePrivacyPolicyJsonLd(
    locale,
    description || fallbackDescription,
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <PrivacyPolicyPage />
    </HydrationBoundary>
  );
}
