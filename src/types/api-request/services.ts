import { PaginationRequest } from "@/types/api-request";

export interface GetServicesRequest extends PaginationRequest {
  /** 搜索關鍵字 */
  query?: string;
  /** 分類 ID */
  categoryId?: string;
}

export interface GetServicesIdRequest {
  /** 服務 ID */
  id: string;
}
