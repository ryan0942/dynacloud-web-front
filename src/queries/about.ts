import { getAbout } from "@/actions/about";

/** 取得關於我們 query */
export const getAboutQuery = (locale: string) => {
  return {
    queryKey: [locale, "about"],
    queryFn: () => getAbout(),
  };
};
