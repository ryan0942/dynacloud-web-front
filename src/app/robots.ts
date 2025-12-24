import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_APP_URL || "https://u-dynacloud.uidea.tw";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
