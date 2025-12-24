"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetAboutResponse } from "@/types/api-response/about";

/** 取得關於我們, GET => /about */
export async function getAbout() {
  return serverFetcher<GetAboutResponse>("/about");
}
