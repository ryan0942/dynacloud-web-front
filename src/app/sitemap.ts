import { MetadataRoute } from "next";

import { getBlogs } from "@/actions/blogs";
import { getCases } from "@/actions/cases";
import { getNews } from "@/actions/news";
import { getServices } from "@/actions/services";

const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";
const locales = ["tw", "en"] as const;

/** 靜態頁面路徑 */
const staticPages = ["", "/about", "/news", "/blogs", "/services", "/cases"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  /** 靜態頁面 */
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            "zh-TW": `${baseUrl}/tw${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }
  }

  /** 動態頁面：新聞 */
  try {
    const newsResponse = await getNews({ page: 1, limit: 10 });
    const newsList = newsResponse?.result?.data || [];

    for (const news of newsList) {
      for (const locale of locales) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/news/${news.id}`,
          lastModified: new Date(news.updatedAt),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              "zh-TW": `${baseUrl}/tw/news/${news.id}`,
              en: `${baseUrl}/en/news/${news.id}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch news for sitemap:", error);
  }

  /** 動態頁面：部落格 */
  try {
    const blogsResponse = await getBlogs({ page: 1, limit: 10 });
    const blogsList = blogsResponse?.result?.data || [];

    for (const blog of blogsList) {
      for (const locale of locales) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/blogs/${blog.id}`,
          lastModified: new Date(blog.updatedAt),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              "zh-TW": `${baseUrl}/tw/blogs/${blog.id}`,
              en: `${baseUrl}/en/blogs/${blog.id}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  /** 動態頁面：成功案例 */
  try {
    const casesResponse = await getCases({ page: 1, limit: 10 });
    const casesList = casesResponse?.result?.data || [];

    for (const caseItem of casesList) {
      for (const locale of locales) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/cases/${caseItem.id}`,
          lastModified: new Date(caseItem.updatedAt),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: {
              "zh-TW": `${baseUrl}/tw/cases/${caseItem.id}`,
              en: `${baseUrl}/en/cases/${caseItem.id}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch cases for sitemap:", error);
  }

  /** 動態頁面：產品服務 */
  try {
    const servicesResponse = await getServices({ page: 1, limit: 10 });
    const servicesList = servicesResponse?.result?.data || [];

    for (const service of servicesList) {
      for (const locale of locales) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/services/${service.id}`,
          lastModified: new Date(service.updatedAt),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: {
              "zh-TW": `${baseUrl}/tw/services/${service.id}`,
              en: `${baseUrl}/en/services/${service.id}`,
            },
          },
        });
      }
    }
  } catch (error) {
    console.error("Failed to fetch services for sitemap:", error);
  }

  return sitemapEntries;
}
