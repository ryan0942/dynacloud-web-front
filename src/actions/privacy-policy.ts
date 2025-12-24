"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { PrivacyPolicyInterface } from "@/types/api-response/privacy-policy";

/** 取得隱私權政策, GET => /privacy-policy */
export async function getPrivacyPolicy() {
  return serverFetcher<PrivacyPolicyInterface>("/privacy-policy");
}
