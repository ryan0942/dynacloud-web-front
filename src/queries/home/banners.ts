import { getBanners } from "@/actions/banners";

/** 取得首頁 Banner query */
export const getBannersQuery = (locale: string) => {
  return {
    queryKey: ["banners", locale],
    queryFn: () => getBanners(),
  };
};
