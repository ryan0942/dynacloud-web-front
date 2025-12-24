import { apiFetcher } from "@/lib/fetcher";
import { GetCompanyInfoResponse } from "@/types/api-response/company-info";

/** 取得公司資訊, GET => /company-info  */
export const GetCompanyInfo = () =>
  apiFetcher<GetCompanyInfoResponse>("/company-info");
