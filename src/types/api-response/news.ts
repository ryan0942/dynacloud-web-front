import {
  CategoryInterface,
  PaginatedResponse,
  StatusEnum,
} from "@/types/api-response";

export interface NewsInterface {
  /** 新聞 ID */
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
  /** 活動開始日期時間 */
  startDateTime: string;
  /** 活動結束日期時間 */
  endDateTime: string;
  /** 狀態 */
  status: StatusEnum;
  /** 更新時間 */
  updatedAt: string;
}

export type GetNewsResponse = PaginatedResponse<NewsInterface>;

export interface GetNewsIdResponse extends NewsInterface {
  /** 內容 */
  content: string;
}

export type GetNewsCategoriesResponse = CategoryInterface[];
