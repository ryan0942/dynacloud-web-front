import { PaginationRequest } from "@/types/api-request";

export interface GetBlogsRequest extends PaginationRequest {
  /** 搜索關鍵字 */
  query?: string;
  /** 分類 ID */
  categoryId?: string;
}

export interface GetBlogsIdRequest {
  /** 部落格 ID */
  id: string;
}
