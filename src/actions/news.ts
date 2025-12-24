"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetNewsIdRequest, GetNewsRequest } from "@/types/api-request/news";
import {
  GetNewsCategoriesResponse,
  GetNewsIdResponse,
  GetNewsResponse,
} from "@/types/api-response/news";

/** 取得所有新聞, GET => /news */
export async function getNews(params: GetNewsRequest) {
  return serverFetcher<GetNewsResponse>("/news", {
    body: params,
  });
}

/** 取得所有新聞分類, GET => /news-categories */
export async function getNewsCategories() {
  return serverFetcher<GetNewsCategoriesResponse>("/news-categories");
}

/** 取得單個新聞, GET => /news/{id} */
export async function getNewsById({ id }: GetNewsIdRequest) {
  return serverFetcher<GetNewsIdResponse>(`/news/${id}`);
}
