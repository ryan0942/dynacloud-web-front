import { apiFetcher } from "@/lib/fetcher";
import { GetCustomersResponse } from "@/types/api-response/customers";

/** 取得所有客戶, GET => /customers  */
export const GetCustomers = () =>
  apiFetcher<GetCustomersResponse>("/customers");
