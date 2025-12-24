import { RequestConfig } from "@/lib/fetcher";
import {
  getCurrentLocale,
  localeToAcceptLanguage,
  objectToFormData,
  objectToQueryString,
} from "@/lib/fetcher/helpers";
import { BaseResponse } from "@/types/api-response";

/** Request interceptor */
export const requestInterceptor = async (
  { requestType, ...config }: RequestConfig,
  endpoint: string,
): Promise<{ config: RequestConfig; url: string }> => {
  const method = config.method?.toUpperCase() || "GET";

  // 取得當前 locale 並轉換為 Accept-Language 格式
  const currentLocale = await getCurrentLocale();
  const acceptLanguage = localeToAcceptLanguage(currentLocale);

  config.headers = {
    "Content-Type": "application/json",
    "Accept-Language": acceptLanguage,
    ...config.headers,
  };

  // 特殊情境: Content-Type 為空字串，正在做匯入 api，需要 formData 上傳和 blob 回應
  if (requestType === "formData") delete config.headers?.["Content-Type"];

  let url = `${process.env.NEXT_PUBLIC_API_HOST}${endpoint}`;
  if (config.body) {
    // For GET requests, convert body to query parameters
    if (method === "GET") {
      const queryString = objectToQueryString(config.body);
      url += (url.includes("?") ? "&" : "?") + queryString;
      delete config.body; // Remove body from GET requests
    } else {
      config.body =
        requestType === "formData"
          ? objectToFormData(config.body)
          : JSON.stringify(config.body);
    }
  }

  return { config, url };
};

/** Response interceptor */
export const responseInterceptor = async (
  response: Response,
  config: RequestConfig,
) => {
  // 錯誤處理
  if (!response.ok) {
    const data = (await response.clone().json()) as BaseResponse<any>;
    console.error(data.message || response.statusText);
  }

  // 如果是 blob 類型，直接回傳 blob
  if (config.responseType === "blob") return response.blob();

  return response.json();
};
