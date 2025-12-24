import {
  createSearchParamsCache,
  Nullable,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

import { getNews, getNewsById, getNewsCategories } from "@/actions/news";
import { filterEmpty } from "@/lib/utils";
import { GetNewsIdRequest, GetNewsRequest } from "@/types/api-request/news";

/** 固定每頁筆數 */
export const NEWS_LIMIT = 25;

/** 網址參數 parsers */
export const newsSearchParams = {
  query: parseAsString.withDefault(""),
  newsCategoryId: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

/** 網址參數 cache (page 使用) */
export const searchParamsCache = createSearchParamsCache(newsSearchParams);

/** 取得所有新聞 query */
export const getNewsQuery = (
  locale: string,
  params: Nullable<GetNewsRequest>,
) => {
  const filteredParams = filterEmpty({ ...params, limit: NEWS_LIMIT });
  return {
    queryKey: [locale, "news", filteredParams],
    queryFn: () => getNews(filteredParams),
  };
};

/** 取得所有新聞分類 query */
export const getNewsCategoriesQuery = (locale: string) => {
  return {
    queryKey: [locale, "news-categories"],
    queryFn: () => getNewsCategories(),
  };
};

/** 取得單個新聞 query */
export const getNewsIdQuery = (locale: string, params: GetNewsIdRequest) => {
  return {
    queryKey: [locale, "newsId", params],
    queryFn: () => getNewsById(params),
  };
};
