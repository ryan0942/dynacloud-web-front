import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import ContactUsPage from "@/components/contact-us";
import { getCompanyInfoQuery } from "@/queries/company-info";

/** 產生 ContactPage JSON-LD */
function generateContactJsonLd(locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isZhTw ? "聯繫我們" : "Contact Us",
    description: isZhTw
      ? "聯繫雲動力，讓我們協助您的企業邁向雲端智慧新時代"
      : "Contact Dynacloud to help your business embrace the new era of cloud intelligence",
    url: `${baseUrl}/${locale}/contact-us`,
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

  const title = isZhTw ? "聯繫我們" : "Contact Us";
  const description = isZhTw
    ? "聯繫雲動力，讓我們協助您的企業邁向雲端智慧新時代。填寫表單或透過電話、電子郵件與我們取得聯繫。"
    : "Contact Dynacloud to help your business embrace the new era of cloud intelligence. Fill out the form or reach us by phone or email.";

  return {
    title,
    description,
    keywords: isZhTw
      ? "聯繫我們, 雲動力, 聯絡方式, 諮詢, 雲端服務, Dynacloud"
      : "contact us, Dynacloud, contact information, consultation, cloud services",
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/contact-us`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact-us`,
      languages: {
        "zh-TW": `${baseUrl}/tw/contact-us`,
        en: `${baseUrl}/en/contact-us`,
      },
    },
  };
}

export default async function Page() {
  const locale = await getLocale();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getCompanyInfoQuery(locale));

  const isZhTw = locale === "tw";
  const jsonLd = generateContactJsonLd(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ContactUsPage />
    </HydrationBoundary>
  );
}
