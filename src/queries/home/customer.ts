import { getCustomers } from "@/actions/customers";

/** 取得客戶列表 query */
export const getCustomersQuery = (locale: string) => {
  return {
    queryKey: [locale, "customers"],
    queryFn: () => getCustomers(),
  };
};
