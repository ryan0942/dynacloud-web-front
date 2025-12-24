import { getPrivacyPolicy } from "@/actions/privacy-policy";

/** 取得隱私權政策 query */
export const getPrivacyPolicyQuery = (locale: string) => {
  return {
    queryKey: [locale, "privacy-policy"],
    queryFn: () => getPrivacyPolicy(),
  };
};
