import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import BlogPage from "@/components/blogs";
import {
  getBlogCategoriesQuery,
  getBlogsQuery,
  searchParamsCache,
} from "@/queries/blogs";
import { PageProps } from "@/types/common";

/** 產生 CollectionPage JSON-LD */
function generateBlogsListJsonLd(locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
  const isZhTw = locale === "tw";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: isZhTw ? "部落格" : "Blog",
    description: isZhTw
      ? "瀏覽雲動力的技術部落格，獲取最新的 IT 解決方案洞見、軟體開發趨勢與專家建議。"
      : "Browse Dynacloud's tech blog for the latest insights on IT solutions, software development trends, and expert advice.",
    url: `${baseUrl}/${locale}/blogs`,
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

  const title = isZhTw ? "部落格" : "Blog";
  const description = isZhTw
    ? "瀏覽雲動力的技術部落格，獲取最新的 IT 解決方案洞見、軟體開發趨勢與專家建議。"
    : "Browse Dynacloud's tech blog for the latest insights on IT solutions, software development trends, and expert advice.";

  return {
    title,
    description,
    keywords: isZhTw
      ? "部落格, 技術文章, IT 解決方案, 軟體開發, 雲端技術, 雲動力, Dynacloud"
      : "blog, tech articles, IT solutions, software development, cloud technology, Dynacloud",
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/blogs`,
      siteName: isZhTw ? "雲動力 Dynacloud" : "Dynacloud",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blogs`,
      languages: {
        "zh-TW": `${baseUrl}/tw/blogs`,
        en: `${baseUrl}/en/blogs`,
      },
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const locale = await getLocale();

  /** 網址參數 */
  const { query, blogCategoryId, page } =
    await searchParamsCache.parse(searchParams);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getBlogsQuery(locale, { query, categoryId: blogCategoryId }),
  );
  await queryClient.prefetchQuery(getBlogCategoriesQuery(locale));

  const jsonLd = generateBlogsListJsonLd(locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <BlogPage />
    </HydrationBoundary>
  );
}
