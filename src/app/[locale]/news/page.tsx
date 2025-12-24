import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import NewsPage from "@/components/news";
import {
  getNewsCategoriesQuery,
  getNewsQuery,
  searchParamsCache,
} from "@/queries/news";
import { PageProps } from "@/types/common";

/** 產生 CollectionPage JSON-LD */
function generateNewsListJsonLd(locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isZhTw ? "最新消息" : "News",
    description: isZhTw
      ? "瀏覽雲動力的最新消息、活動資訊與產業動態。"
      : "Browse the latest news, events, and industry updates from Dynacloud.",
    url: `${baseUrl}/${locale}/news`,
    isPartOf: {
      "@type": "WebSite",
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

  const title = isZhTw ? "最新消息" : "News";
  const description = isZhTw
    ? "瀏覽雲動力的最新消息、活動資訊與產業動態。"
    : "Browse the latest news, events, and industry updates from Dynacloud.";

  return {
    title,
    description,
    keywords: isZhTw
      ? "最新消息, 活動, 產業動態, 雲動力, Dynacloud"
      : "news, events, industry updates, Dynacloud",
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/news`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/news`,
      languages: {
        "zh-TW": `${baseUrl}/tw/news`,
        en: `${baseUrl}/en/news`,
      },
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();

  /** 網址參數 */
  const { query, newsCategoryId, page } =
    await searchParamsCache.parse(searchParams);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getNewsQuery(locale, { query, categoryId: newsCategoryId }),
  );
  await queryClient.prefetchQuery(getNewsCategoriesQuery(locale));

  const jsonLd = generateNewsListJsonLd(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <NewsPage />
    </HydrationBoundary>
  );
}
