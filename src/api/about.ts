import { apiFetcher } from "@/lib/fetcher";
import { GetAboutResponse } from "@/types/api-response/about";

/** 取得關於我們, GET => /about  */
export const GetAbout = () => apiFetcher<GetAboutResponse>("/about");
