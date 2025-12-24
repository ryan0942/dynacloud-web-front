export interface GetCompanyInfoResponse {
  /** 公司 ID */
  id: string;
  /** 地址（根據語系顯示） */
  address: string;
  /** 聯絡電話 */
  phone: string;
  /** 電子郵件 */
  email: string;
  /** 營業時間（根據語系顯示） */
  opening_time: string;
}
