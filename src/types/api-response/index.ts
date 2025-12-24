export interface BaseResponse<T> {
  /** 是否成功 */
  success: boolean;
  /** 回傳資料 */
  result: T;
  /** 回傳訊息 */
  message: string;
}

export interface PaginatedResponse<T> {
  /** 回傳資料陣列 */
  data: T[];
  /** 分頁資訊 */
  pagination: {
    /** 當前頁面 */
    page: number;
    /** 每頁筆數 */
    limit: number;
    /** 是否有下一頁 */
    has_next: boolean;
    /** 總筆數 */
    total: number;
  };
}

export enum StatusEnum {
  "進行中" = "Active",
  "草稿" = "Draft",
  "已結束" = "Closed",
}

export interface CategoryInterface {
  /** 分類 ID */
  id: string;
  /** 分類名稱（根據語系顯示） */
  name: string;
}
