import { PaginationRequest } from "@/types/api-request";

export interface GetCasesRequest extends PaginationRequest {
  /** 搜索關鍵字 */
  query?: string;
  /** 分類 ID */
  categoryId?: string;
}

export interface GetCasesIdRequest {
  /** 案例 ID */
  id: string;
}
