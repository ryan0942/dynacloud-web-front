import {
  CategoryInterface,
  PaginatedResponse,
  StatusEnum,
} from "@/types/api-response";

export interface CasesInterface {
  /** 案例 ID */
  id: string;
  /** 標題（根據語系顯示） */
  title: string;
  /** 封面圖片 */
  cover: string;
  /** 公司 LOGO */
  company_logo: string;
  /** 公司名稱 */
  company_name: string;
  /** 公司描述 */
  company_description: string;
  /** 公司職稱 */
  company_title: string;
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

export type GetCasesResponse = PaginatedResponse<CasesInterface>;

export interface GetCaseIdResponse extends CasesInterface {
  /** 內容 */
  content: string;
}

export type GetCaseCategoriesResponse = CategoryInterface[];
