"use server";

import { serverFetcher } from "@/lib/fetcher/server";
import { GetBlogsIdRequest, GetBlogsRequest } from "@/types/api-request/blogs";
import {
  GetBlogCategoriesResponse,
  GetBlogIdResponse,
  GetBlogsResponse,
} from "@/types/api-response/blogs";

/** 取得所有部落格, GET => /blogs */
export async function getBlogs(params: GetBlogsRequest) {
  return serverFetcher<GetBlogsResponse>("/blogs", {
    body: params,
  });
}

/** 取得所有部落格分類, GET => /blog-categories */
export async function getBlogCategories() {
  return serverFetcher<GetBlogCategoriesResponse>("/blog-categories");
}

/** 取得單一部落格, GET => /blogs/{id} */
export async function getBlogById({ id }: GetBlogsIdRequest) {
  return serverFetcher<GetBlogIdResponse>(`/blogs/${id}`);
}
