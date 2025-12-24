"use server";

import { partnersData } from "@/data/partners";

/** 取得合作夥伴列表 */
export const getPartners = async () => {
  return partnersData;
};
