"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import {
  GetServicesIdRequest,
  GetServicesRequest,
} from "@/types/api-request/services";
import {
  GetServiceCategoriesResponse,
  GetServiceIdResponse,
  GetServicesResponse,
} from "@/types/api-response/services";

/** 取得所有產品服務, GET => /services */
export async function getServices(params: GetServicesRequest) {
  return serverFetcher<GetServicesResponse>("/services", {
    body: params,
  });
}

/** 取得所有產品服務分類, GET => /service-categories */
export async function getServiceCategories() {
  return serverFetcher<GetServiceCategoriesResponse>("/service-categories");
}

/** 取得單一產品服務, GET => /services/{id} */
export async function getServiceById({ id }: GetServicesIdRequest) {
  return serverFetcher<GetServiceIdResponse>(`/services/${id}`);
}
