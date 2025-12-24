import { apiFetcher } from "@/lib/fetcher";
import { PrivacyPolicyInterface } from "@/types/api-response/privacy-policy";

/** 取得隱私權政策, GET => /privacy-policy  */
export const GetPrivacyPolicy = () =>
  apiFetcher<PrivacyPolicyInterface>("/privacy-policy");
