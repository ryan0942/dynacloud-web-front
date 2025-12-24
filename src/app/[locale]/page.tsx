import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getLocale } from "next-intl/server";

import { About } from "@/components/home/about";
import { Banner } from "@/components/home/banner";
import { Blogs } from "@/components/home/blogs";
import { Cases } from "@/components/home/cases";
import { ContactSection } from "@/components/home/contact";
import { Customers } from "@/components/home/customers";
import { News } from "@/components/home/news";
import { Services } from "@/components/home/services";
import { PageTransition } from "@/components/ui/page-transition";
import { getAboutQuery } from "@/queries/about";
import { getBlogCategoriesQuery, getBlogsQuery } from "@/queries/blogs";
import { getCaseCategoriesQuery, getCasesQuery } from "@/queries/cases";
import { getCompanyInfoQuery } from "@/queries/company-info";
import { getBannersQuery } from "@/queries/home/banners";
import { getCustomersQuery } from "@/queries/home/customer";
import { getNewsCategoriesQuery, getNewsQuery } from "@/queries/news";
import {
  getServiceCategoriesQuery,
  getServicesQuery,
} from "@/queries/services";
import { GetCompanyInfoResponse } from "@/types/api-response/company-info";

/** 產生首頁 JSON-LD（Organization + WebSite） */
function generateHomeJsonLd(
  locale: string,
  companyInfo: GetCompanyInfoResponse | undefined,
) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  const organizationName = isZhTw ? "雲動力 Dynacloud" : "Dynacloud";
  const description = isZhTw
    ? "Dynacloud 雲動力資訊提供全方位雲端解決方案，提供 GCP、Google Workspace 及多樣雲端工具，協助客戶從規劃、採購至驗收，挑選最合適的雲端應用產品。"
    : "Dynacloud provides comprehensive cloud solutions, offering GCP, Google Workspace, and various cloud tools. We assist clients from planning and procurement to acceptance.";

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: organizationName,
      url: baseUrl,
      logo: `${baseUrl}/logo.svg`,
      description,
      address: companyInfo?.address
        ? {
            "@type": "PostalAddress",
            streetAddress: companyInfo.address,
          }
        : undefined,
      telephone: companyInfo?.phone,
      email: companyInfo?.email,
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: organizationName,
      url: baseUrl,
      description,
      inLanguage: isZhTw ? "zh-TW" : "en",
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/${locale}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

export default async function HomePage() {
  const locale = await getLocale();

  /** 取得資料 - 參數必須與 client component 完全一致以確保 hydration 正確 */
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getBannersQuery()),
    queryClient.prefetchQuery(
      getServicesQuery(locale, { categoryId: "", limit: 10, page: 1 }),
    ),
    queryClient.prefetchQuery(getServiceCategoriesQuery(locale)),
    queryClient.prefetchQuery(getAboutQuery(locale)),
    queryClient.prefetchQuery(getNewsQuery(locale, { categoryId: "" })),
    queryClient.prefetchQuery(getNewsCategoriesQuery(locale)),
    queryClient.prefetchQuery(getBlogsQuery(locale, { categoryId: "" })),
    queryClient.prefetchQuery(getBlogCategoriesQuery(locale)),
    queryClient.prefetchQuery(getCasesQuery(locale, { categoryId: "" })),
    queryClient.prefetchQuery(getCaseCategoriesQuery(locale)),
    queryClient.prefetchQuery(getCustomersQuery(locale)),
    queryClient.prefetchQuery(getCompanyInfoQuery(locale)),
  ]);

  /** 取得公司資訊用於 JSON-LD */
  const companyInfoResponse = await queryClient.fetchQuery(
    getCompanyInfoQuery(locale),
  );
  const companyInfo = companyInfoResponse?.result;

  const jsonLdArray = generateHomeJsonLd(locale, companyInfo);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {jsonLdArray.map((jsonLd, index) => (
        <script
          key={index}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      ))}
      <PageTransition>
        <div className="w-full overflow-hidden">
          {/* 最上方 Banner 區塊 */}
          <Banner />
          {/* 產品服務區塊 */}
          <Services />
          {/* 關於雲動力區塊 */}
          <About />
          {/* 媒體活動區塊 */}
          <News />
          {/* 資訊專欄區塊 */}
          <Blogs />
          {/* 案例分享區塊 */}
          <Cases />
          {/* 聯繫我們區塊 */}
          <ContactSection />
          {/* 合作客戶區塊 */}
          <Customers />
        </div>
      </PageTransition>
    </HydrationBoundary>
  );
}
