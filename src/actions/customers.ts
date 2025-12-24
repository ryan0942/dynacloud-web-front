"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetCustomersResponse } from "@/types/api-response/customers";

/** 取得所有客戶, GET => /customers */
export async function getCustomers() {
  return serverFetcher<GetCustomersResponse>("/customers");
}
