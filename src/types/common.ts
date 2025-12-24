import { SearchParams } from "nuqs";

/** 頁面 props */
export interface PageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<Record<string, string>>;
}

/** 將 Nullable<T> 轉換回 T 的工具類型 */
export type RemoveNullable<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
