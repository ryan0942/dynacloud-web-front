export type GetBannersResponse = {
  /** Banner ID */
  id: string;
  /** Banner 圖片 url */
  image: string;
  /** Banner 連結 url */
  url: string;
  /** Banner 網頁連結 */
  link: string | null;
  /** Banner 顯示時長（秒） */
  duration: number;
  /** Banner 類型 */
  type: "IMAGE" | "VIDEO";
  /** 建立時間 */
  createdAt: string;
  /** 更新時間 */
  updatedAt: string;
}[];
