"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetCompanyInfoResponse } from "@/types/api-response/company-info";

/** 取得公司資訊, GET => /company-info */
export async function getCompanyInfo() {
  return serverFetcher<GetCompanyInfoResponse>("/company-info");
}
