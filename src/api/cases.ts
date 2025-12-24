import { apiFetcher } from "@/lib/fetcher";
import { GetCasesIdRequest, GetCasesRequest } from "@/types/api-request/cases";
import {
  GetCaseCategoriesResponse,
  GetCaseIdResponse,
  GetCasesResponse,
} from "@/types/api-response/cases";

/** 取得所有案例, GET => /cases  */
export const GetCases = (params: GetCasesRequest) =>
  apiFetcher<GetCasesResponse>("/cases", {
    body: params,
  });

/** 取得所有案例分類, GET => /case-categories  */
export const GetCaseCategories = () =>
  apiFetcher<GetCaseCategoriesResponse>("/case-categories");

/** 取得單一案例, GET => /cases/{id}  */
export const GetCaseById = async ({ id }: GetCasesIdRequest) =>
  apiFetcher<GetCaseIdResponse>(`/cases/${id}`);
