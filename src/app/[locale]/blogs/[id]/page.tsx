import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import BlogDetails from "@/components/blogs/blogs-details";
import { PageTransition } from "@/components/ui/page-transition";
import { getBlogsIdQuery } from "@/queries/blogs";
import { GetBlogIdResponse } from "@/types/api-response/blogs";

/** 產生 JSON-LD 結構化資料 */
function generateBlogJsonLd(data: GetBlogIdResponse, locale: string) {
  const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    image: data.cover ? [data.cover] : [],
    datePublished: data.updatedAt,
    dateModified: data.updatedAt,
    author: {
      "@type": "Organization",
      name: "Devun",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Devun",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blogs/${data.id}`,
    },
    keywords: data.tags,
    articleSection: data.category?.name,
    inLanguage: locale === "tw" ? "zh-TW" : "en",
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();

  /** 取得資料 */
  const queryClient = new QueryClient();
  const response = await queryClient.fetchQuery(
    getBlogsIdQuery(locale, { id }),
  );
  const data = response?.result;

  /** 如果資料不存在，顯示 404 頁面 */
  if (!data) return notFound();

  const jsonLd = generateBlogJsonLd(data, locale);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <PageTransition>
        <BlogDetails data={data} />
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
    getBlogsIdQuery(locale, { id }),
  );
  const data = response?.result;

  if (!data) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: data.title,
    description: data.description,
    keywords: data.tags?.split(",").map((tag) => tag.trim()),
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      modifiedTime: data.updatedAt,
      authors: ["Devun"],
      tags: data.tags?.split(",").map((tag) => tag.trim()),
      images: data.cover ? [{ url: data.cover, alt: data.title }] : [],
      url: `${baseUrl}/${locale}/blogs/${data.id}`,
      siteName: "Devun",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.cover ? [data.cover] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blogs/${data.id}`,
      languages: {
        "zh-TW": `${baseUrl}/tw/blogs/${data.id}`,
        en: `${baseUrl}/en/blogs/${data.id}`,
      },
    },
  };
}
