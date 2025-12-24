import { apiFetcher } from "@/lib/fetcher";
import { GetBannersResponse } from "@/types/api-response/banners";

/** 取得所有 Banner, GET => /banners  */
export const GetBanners = () => apiFetcher<GetBannersResponse>("/banners");
