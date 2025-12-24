import { apiFetcher } from "@/lib/fetcher";
import { GetNewsIdRequest, GetNewsRequest } from "@/types/api-request/news";
import {
  GetNewsCategoriesResponse,
  GetNewsIdResponse,
  GetNewsResponse,
} from "@/types/api-response/news";

/** 取得所有新聞, GET => /news  */
export const GetNews = (params: GetNewsRequest) =>
  apiFetcher<GetNewsResponse>("/news", {
    body: params,
  });

/** 取得所有新聞分類, GET => /news-categories  */
export const GetNewsCategories = () =>
  apiFetcher<GetNewsCategoriesResponse>("/news-categories");

/** 取得單個新聞, GET => /news/{id}  */
export const GetNewsById = async ({ id }: GetNewsIdRequest) =>
  apiFetcher<GetNewsIdResponse>(`/news/${id}`);
