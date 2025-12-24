import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import ServicesPage from "@/components/services";
import {
  getServiceCategoriesQuery,
  getServicesQuery,
  searchParamsCache,
} from "@/queries/services";
import { PageProps } from "@/types/common";

/** 產生 CollectionPage JSON-LD */
function generateServicesListJsonLd(locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isZhTw ? "產品服務" : "Services",
    description: isZhTw
      ? "探索雲動力全方位的專業 IT 解決方案與服務，從雲端運算到軟體開發，協助企業在數位時代蓬勃發展。"
      : "Explore Dynacloud's comprehensive range of professional IT solutions and services, from cloud computing to software development, helping businesses thrive in the digital age.",
    url: `${baseUrl}/${locale}/services`,
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

  const title = isZhTw ? "產品服務" : "Services";
  const description = isZhTw
    ? "探索雲動力全方位的專業 IT 解決方案與服務，從雲端運算到軟體開發，協助企業在數位時代蓬勃發展。"
    : "Explore Dynacloud's comprehensive range of professional IT solutions and services, from cloud computing to software development, helping businesses thrive in the digital age.";

  return {
    title,
    description,
    keywords: isZhTw
      ? "產品服務, IT 解決方案, 雲端運算, 軟體開發, 數位轉型, 企業解決方案, 雲動力, Dynacloud"
      : "services, IT solutions, cloud computing, software development, digital transformation, enterprise solutions, Dynacloud",
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/services`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        "zh-TW": `${baseUrl}/tw/services`,
        en: `${baseUrl}/en/services`,
      },
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();

  /** 網址參數 */
  const { query, serviceCategoryId, page } =
    await searchParamsCache.parse(searchParams);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getServicesQuery(locale, { query, categoryId: serviceCategoryId }),
  );
  await queryClient.prefetchQuery(getServiceCategoriesQuery(locale));

  const jsonLd = generateServicesListJsonLd(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ServicesPage />
    </HydrationBoundary>
  );
}
