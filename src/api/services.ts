import { apiFetcher } from "@/lib/fetcher";
import {
  GetServicesIdRequest,
  GetServicesRequest,
} from "@/types/api-request/services";
import {
  GetServiceCategoriesResponse,
  GetServiceIdResponse,
  GetServicesResponse,
} from "@/types/api-response/services";

/** 取得所有產品服務, GET => /services  */
export const GetServices = (params: GetServicesRequest) =>
  apiFetcher<GetServicesResponse>("/services", {
    body: params,
  });

/** 取得所有產品服務分類, GET => /service-categories  */
export const GetServiceCategories = () =>
  apiFetcher<GetServiceCategoriesResponse>("/service-categories");

/** 取得單一產品服務, GET => /services/{id}  */
export const GetServiceId = async ({ id }: GetServicesIdRequest) =>
  apiFetcher<GetServiceIdResponse>(`/services/${id}`);
