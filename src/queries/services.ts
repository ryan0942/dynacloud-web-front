import {
  createSearchParamsCache,
  Nullable,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

import {
  getServiceById,
  getServiceCategories,
  getServices,
} from "@/actions/services";
import { filterEmpty } from "@/lib/utils";
import {
  GetServicesIdRequest,
  GetServicesRequest,
} from "@/types/api-request/services";

/** 固定每頁筆數 */
export const SERVICES_LIMIT = 25;

/** 網址參數 parsers */
export const servicesSearchParams = {
  query: parseAsString.withDefault(""),
  serviceCategoryId: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

/** 網址參數 cache (page 使用) */
export const searchParamsCache = createSearchParamsCache(servicesSearchParams);

/** 取得所有產品服務 query */
export const getServicesQuery = (
  locale: string,
  params: Nullable<GetServicesRequest>,
) => {
  const filteredParams = filterEmpty({ ...params, limit: SERVICES_LIMIT });
  return {
    queryKey: [locale, "services", filteredParams],
    queryFn: () => getServices(filteredParams),
  };
};

/** 取得所有產品服務分類 query */
export const getServiceCategoriesQuery = (locale: string) => {
  return {
    queryKey: [locale, "service-categories"],
    queryFn: () => getServiceCategories(),
  };
};

/** 取得單一產品服務 query */
export const getServiceIdQuery = (
  locale: string,
  params: GetServicesIdRequest,
) => {
  return {
    queryKey: [locale, "serviceId", params],
    queryFn: () => getServiceById(params),
  };
};
