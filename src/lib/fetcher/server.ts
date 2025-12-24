"use server";

import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { BaseResponse } from "@/types/api-response";

import { localeToAcceptLanguage, objectToQueryString } from "./helpers";

export type ServerRequestConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  requestType?: "json" | "formData";
  responseType?: "json" | "blob";
  /** 明確指定 locale（用於非 locale route 的情境，如 sitemap） */
  locale?: string;
};

/** 預設設定 */
const defaultConfig: ServerRequestConfig = {
  requestType: "json",
  responseType: "json",
};

/** Server Action 專用的 API fetcher */
export async function serverFetcher<
  T,
  R extends ServerRequestConfig = ServerRequestConfig,
>(
  endpoint: string,
  config?: R,
): Promise<R extends { responseType: "blob" } ? Blob : BaseResponse<T>> {
  const finalConfig = { ...defaultConfig, ...config };
  const method = finalConfig.method?.toUpperCase() || "GET";

  // 取得當前 locale 並轉換為 Accept-Language 格式
  let currentLocale: string;
  if (finalConfig.locale) {
    currentLocale = finalConfig.locale;
  } else {
    try {
      currentLocale = await getLocale();
    } catch {
      currentLocale = routing.defaultLocale;
    }
  }
  const acceptLanguage = localeToAcceptLanguage(currentLocale);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept-Language": acceptLanguage,
    ...finalConfig.headers,
  };

  // FormData 不需要 Content-Type header
  if (finalConfig.requestType === "formData") {
    delete headers["Content-Type"];
  }

  let url = `${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`;
  let body: string | FormData | undefined;

  if (finalConfig.body) {
    if (method === "GET") {
      // GET 請求將 body 轉為 query string
      const queryString = objectToQueryString(finalConfig.body);
      url += (url.includes("?") ? "&" : "?") + queryString;
    } else {
      // POST/PUT/PATCH/DELETE 請求
      body =
        finalConfig.requestType === "formData"
          ? objectToFormData(finalConfig.body)
          : JSON.stringify(finalConfig.body);
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  // 錯誤處理
  if (!response.ok) {
    const data = (await response.clone().json()) as BaseResponse<any>;
    console.error(data.message || response.statusText);
  }

  // 如果是 blob 類型，直接回傳 blob
  if (finalConfig.responseType === "blob") {
    return response.blob() as Promise<
      R extends { responseType: "blob" } ? Blob : BaseResponse<T>
    >;
  }

  return response.json();
}

/** 物件轉換成 FormData */
function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
}
