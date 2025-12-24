"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetCasesIdRequest, GetCasesRequest } from "@/types/api-request/cases";
import {
  GetCaseCategoriesResponse,
  GetCaseIdResponse,
  GetCasesResponse,
} from "@/types/api-response/cases";

/** 取得所有案例, GET => /cases */
export async function getCases(params: GetCasesRequest) {
  return serverFetcher<GetCasesResponse>("/cases", {
    body: params,
  });
}

/** 取得所有案例分類, GET => /case-categories */
export async function getCaseCategories() {
  return serverFetcher<GetCaseCategoriesResponse>("/case-categories");
}

/** 取得單一案例, GET => /cases/{id} */
export async function getCaseById({ id }: GetCasesIdRequest) {
  return serverFetcher<GetCaseIdResponse>(`/cases/${id}`);
}
