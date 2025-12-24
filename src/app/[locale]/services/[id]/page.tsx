import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import ServiceDetails from "@/components/services/service-details";
import { PageTransition } from "@/components/ui/page-transition";
import { getServiceIdQuery } from "@/queries/services";
import { GetServiceIdResponse } from "@/types/api-response/services";

/** 產生 JSON-LD 結構化資料 */
function generateServiceJsonLd(data: GetServiceIdResponse, locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    image: data.cover ? [data.cover] : [],
    provider: {
      "@type": "Organization",
      name: "Devun",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    serviceType: data.categoryName,
    url: `${baseUrl}/${locale}/services/${data.id}`,
    inLanguage: locale === "tw" ? "zh-TW" : "en",
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();

  /** 取得資料 */
  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(
    getServiceIdQuery(locale, { id }),
  );
  const data = response?.result;

  /** 如果資料不存在，顯示 404 頁面 */
  if (!data) return notFound();

  const jsonLd = generateServiceJsonLd(data, locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <PageTransition>
        <ServiceDetails data={data} />
      </PageTransition>
    </HydrationBoundary>
  );
}

/** 動態 Metadata */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";

  /** 取得資料 */
  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(
    getServiceIdQuery(locale, { id }),
  );
  const data = response?.result;

  if (!data) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: [data.categoryName, data.title, "Devun", "IT Solutions"].filter(
      Boolean,
    ),
    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
      images: data.cover ? [{ url: data.cover, alt: data.title }] : [],
      url: `${baseUrl}/${locale}/services/${data.id}`,
      siteName: "Devun",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.cover ? [data.cover] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/services/${data.id}`,
      languages: {
        "zh-TW": `${baseUrl}/tw/services/${data.id}`,
        en: `${baseUrl}/en/services/${data.id}`,
      },
    },
  };
}
