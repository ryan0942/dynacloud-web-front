export interface CustomersInterface {
  /** 客戶 ID */
  id: string;
  /** 客戶名稱 */
  name: string;
  /** 客戶 LOGO */
  logo: string;
  /** 客戶網址 */
  url: string;
}

export type GetCustomersResponse = CustomersInterface[];
