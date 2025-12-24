import { CategoryInterface, PaginatedResponse } from "@/types/api-response";

export interface ServicesInterface {
  /** 服務 ID */
  id: string;
  /** 服務圖示 URL */
  icon: string;
  /** 服務標誌 URL */
  logo: string;
  /** 服務封面圖 URL */
  cover: string;
  /** 標題（根據語系顯示） */
  title: string;
  /** 描述（根據語系顯示） */
  description: string;
  /** 分類資訊 */
  category: CategoryInterface;
  /** 分類名稱（根據語系顯示） */
  categoryName: string;
  /** 建立時間 */
  createdAt: string;
  /** 更新時間 */
  updatedAt: string;
}

export type GetServicesResponse = PaginatedResponse<ServicesInterface>;

export interface GetServiceIdResponse extends ServicesInterface {
  /** 內容 */
  content: string;
}

export type GetServiceCategoriesResponse = CategoryInterface[];
