import { getCompanyInfo } from "@/actions/company-info";

/** 取得公司資訊 query */
export const getCompanyInfoQuery = (locale: string) => {
  return {
    queryKey: [locale, "company-info"],
    queryFn: () => getCompanyInfo(),
  };
};
