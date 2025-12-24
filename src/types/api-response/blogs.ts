import {
  CategoryInterface,
  PaginatedResponse,
  StatusEnum,
} from "@/types/api-response";

export interface BlogsInterface {
  /** 部落格 ID */
  id: string;
  /** 標題（根據語系顯示） */
  title: string;
  /** 封面圖片 */
  cover: string;
  /** 描述（根據語系顯示） */
  description: string;
  /** 分類資訊 */
  category: CategoryInterface;
  /** 標籤（根據語系顯示，逗號分隔） */
  tags: string;
  /** 狀態 */
  status: StatusEnum;
  /** 更新時間 */
  updatedAt: string;
}
export type GetBlogsResponse = PaginatedResponse<BlogsInterface>;

export interface GetBlogIdResponse extends BlogsInterface {
  /** 內容 */
  content: string;
}

export type GetBlogCategoriesResponse = CategoryInterface[];
