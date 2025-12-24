import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import CasePage from "@/components/cases";
import {
  getCaseCategoriesQuery,
  getCasesQuery,
  searchParamsCache,
} from "@/queries/cases";
import { PageProps } from "@/types/common";

/** 產生 CollectionPage JSON-LD */
function generateCasesListJsonLd(locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isZhTw ? "成功案例" : "Case Studies",
    description: isZhTw
      ? "探索雲動力的成功案例，了解我們如何協助企業進行軟體開發、雲端服務與數位轉型。"
      : "Explore Dynacloud's case studies and discover how we help businesses with software development, cloud services, and digital transformation.",
    url: `${baseUrl}/${locale}/cases`,
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

  const title = isZhTw ? "成功案例" : "Case Studies";
  const description = isZhTw
    ? "探索雲動力的成功案例，了解我們如何協助企業進行軟體開發、雲端服務與數位轉型。"
    : "Explore Dynacloud's case studies and discover how we help businesses with software development, cloud services, and digital transformation.";

  return {
    title,
    description,
    keywords: isZhTw
      ? "成功案例, IT 專案, 軟體開發, 雲端服務, 數位轉型, 專案展示, 雲動力, Dynacloud"
      : "case studies, IT projects, software development, cloud services, digital transformation, project showcase, Dynacloud",
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/cases`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/cases`,
      languages: {
        "zh-TW": `${baseUrl}/tw/cases`,
        en: `${baseUrl}/en/cases`,
      },
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();

  /** 網址參數 */
  const { query, caseCategoryId, page } =
    await searchParamsCache.parse(searchParams);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getCasesQuery(locale, { query, categoryId: caseCategoryId }),
  );
  await queryClient.prefetchQuery(getCaseCategoriesQuery(locale));

  const jsonLd = generateCasesListJsonLd(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <CasePage />
    </HydrationBoundary>
  );
}
