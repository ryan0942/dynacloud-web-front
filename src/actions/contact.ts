"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { PostContactRequest } from "@/types/api-request/contact";
import { BaseResponse } from "@/types/api-response";

/** 送出聯絡表單, POST => /contact */
export async function postContact(data: PostContactRequest) {
  return serverFetcher<BaseResponse<null>>("/contact", {
    method: "POST",
    body: data,
  });
}
