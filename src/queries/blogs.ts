import {
  createSearchParamsCache,
  Nullable,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

import { getBlogById, getBlogCategories, getBlogs } from "@/actions/blogs";
import { filterEmpty } from "@/lib/utils";
import { GetBlogsIdRequest, GetBlogsRequest } from "@/types/api-request/blogs";

/** 固定每頁筆數 */
export const BLOGS_LIMIT = 25;

/** 網址參數 parsers */
export const blogsSearchParams = {
  query: parseAsString.withDefault(""),
  blogCategoryId: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
};

/** 網址參數 cache (page 使用) */
export const searchParamsCache = createSearchParamsCache(blogsSearchParams);

/** 取得所有部落格 query */
export const getBlogsQuery = (
  locale: string,
  params: Nullable<GetBlogsRequest>,
) => {
  const filteredParams = filterEmpty({ ...params, limit: BLOGS_LIMIT });
  return {
    queryKey: [locale, "blogs", filteredParams],
    queryFn: () => getBlogs(filteredParams),
  };
};

/** 取得所有部落格分類 query */
export const getBlogCategoriesQuery = (locale: string) => {
  return {
    queryKey: [locale, "blog-categories"],
    queryFn: () => getBlogCategories(),
  };
};

/** 取得單一部落格 query */
export const getBlogsIdQuery = (locale: string, params: GetBlogsIdRequest) => {
  return {
    queryKey: [locale, "blogId", params],
    queryFn: () => getBlogById(params),
  };
};
