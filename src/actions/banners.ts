"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetBannersResponse } from "@/types/api-response/banners";

/** 取得所有 Banner, GET => /banners */
export async function getBanners() {
  return serverFetcher<GetBannersResponse>("/banners");
}
