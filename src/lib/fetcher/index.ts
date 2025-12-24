import { toast } from "sonner";

import {
  requestInterceptor,
  responseInterceptor,
} from "@/lib/fetcher/interceptors";
import { BaseResponse } from "@/types/api-response";

export type RequestConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  requestType?: "json" | "formData";
  responseType?: "json" | "blob";
};

/** 預設設定 */
const defaultConfig: RequestConfig = {
  requestType: "json",
  responseType: "json",
};

/** 自定義 API fetch */
export async function apiFetcher<T, R extends RequestConfig = RequestConfig>(
  endpoint: string,
  config?: R,
): Promise<R extends { responseType: "blob" } ? Blob : BaseResponse<T>> {
  try {
    const finalConfig = { ...defaultConfig, ...config };
    const { config: interceptorConfig, url } = await requestInterceptor(
      finalConfig,
      endpoint,
    );
    const response = await fetch(url, interceptorConfig);
    const data = await responseInterceptor(response, finalConfig);

    return data as R extends { responseType: "blob" } ? Blob : BaseResponse<T>;
  } catch (error: any) {
    if (typeof window !== "undefined")
      toast.error(error?.message || "Internal Server Error");
    throw error;
  }
}
