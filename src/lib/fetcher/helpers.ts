import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

/** 物件轉換成網址參數字串 */
export const objectToQueryString = (obj?: Record<string, unknown>): string => {
  if (!obj) return "";
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params.toString();
};

/** 物件轉換成 FormData */
export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

/** 取得當前 locale */
export const getCurrentLocale = async (): Promise<string> => {
  // 嘗試從 next-intl 取得 locale（僅在伺服器端可用）
  try {
    return await getLocale();
  } catch {
    // 如果無法取得（客戶端），嘗試從 URL 或使用預設值
    if (typeof window !== "undefined") {
      // 在客戶端，從 URL 路徑中取得 locale
      const pathname = window.location.pathname;
      const localeMatch = pathname.match(/^\/([^/]+)/);
      if (localeMatch) {
        const locale = localeMatch[1];
        // 驗證 locale 是否為有效的值
        if (routing.locales.includes(locale as any)) {
          return locale;
        }
      }
    }
    // 如果都無法取得，使用預設值
    return routing.defaultLocale;
  }
};

/** 將 locale 轉換為 Accept-Language 格式 */
export const localeToAcceptLanguage = (locale: string): string => {
  const localeMap: Record<string, string> = {
    tw: "zh-TW",
    en: "en-US",
  };
  return localeMap[locale] || locale;
};
