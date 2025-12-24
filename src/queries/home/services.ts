import { getServices } from "@/actions/services";

/** 取得產品服務列表 query */
export const getServicesQuery = (locale: string) => {
  return {
    queryKey: [locale, "services"],
    queryFn: () => getServices({}),
  };
};
