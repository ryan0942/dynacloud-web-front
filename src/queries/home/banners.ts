import { getBanners } from "@/actions/banners";

/** 取得首頁 Banner query */
export const getBannersQuery = () => {
  return {
    queryKey: ["banners"],
    queryFn: () => getBanners(),
  };
};
