import { apiFetcher } from "@/lib/fetcher";
import { GetBlogsIdRequest, GetBlogsRequest } from "@/types/api-request/blogs";
import {
  GetBlogCategoriesResponse,
  GetBlogIdResponse,
  GetBlogsResponse,
} from "@/types/api-response/blogs";

/** 取得所有部落格, GET => /blogs  */
export const GetBlogs = (params: GetBlogsRequest) =>
  apiFetcher<GetBlogsResponse>("/blogs", {
    body: params,
  });

/** 取得所有部落格分類, GET => /blog-categories  */
export const GetBlogCategories = () =>
  apiFetcher<GetBlogCategoriesResponse>("/blog-categories");

/** 取得單一部落格, GET => /blogs/{id}  */
export const GetBlogById = async ({ id }: GetBlogsIdRequest) =>
  apiFetcher<GetBlogIdResponse>(`/blogs/${id}`);
