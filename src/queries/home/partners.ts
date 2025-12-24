import { getPartners } from "@/actions/partners";

/** 取得合作夥伴列表 query */
export const getPartnersQuery = () => {
  return {
    queryKey: ["partners"],
    queryFn: () => getPartners(),
  };
};
