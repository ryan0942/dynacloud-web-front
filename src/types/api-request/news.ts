import { PaginationRequest } from "@/types/api-request";

export interface GetNewsRequest extends PaginationRequest {
  /** 搜索關鍵字 */
  query?: string;
  /** 分類 ID */
  categoryId?: string;
}

export interface GetNewsIdRequest {
  /** 新聞 ID */
  id: string;
}
