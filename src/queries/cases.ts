import {
  createSearchParamsCache,
  Nullable,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

import { getCaseById, getCaseCategories, getCases } from "@/actions/cases";
import { filterEmpty } from "@/lib/utils";
import { GetCasesIdRequest, GetCasesRequest } from "@/types/api-request/cases";

/** 固定每頁筆數 */
export const CASES_LIMIT = 25;

/** 網址參數 parsers */
export const casesSearchParams = {
  query: parseAsString.withDefault(""),
  caseCategoryId: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

/** 網址參數 cache (page 使用) */
export const searchParamsCache = createSearchParamsCache(casesSearchParams);

/** 取得所有案例 query */
export const getCasesQuery = (
  locale: string,
  params: Nullable<GetCasesRequest>,
) => {
  const filteredParams = filterEmpty({ ...params, limit: CASES_LIMIT });
  return {
    queryKey: [locale, "cases", filteredParams],
    queryFn: () => getCases(filteredParams),
  };
};

/** 取得所有案例分類 query */
export const getCaseCategoriesQuery = (locale: string) => {
  return {
    queryKey: [locale, "case-categories"],
    queryFn: () => getCaseCategories(),
  };
};

/** 取得單一案例 query */
export const getCasesIdQuery = (locale: string, params: GetCasesIdRequest) => {
  return {
    queryKey: [locale, "caseId", params],
    queryFn: () => getCaseById(params),
  };
};
