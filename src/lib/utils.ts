import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

import { RemoveNullable } from "@/types/common";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 移除物件中的空值資料 */
export const filterEmpty = <T extends Record<string, any>>(obj: T) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== "" && v !== null),
  ) as RemoveNullable<T>;
};

/** 格式化日期 */
export const formatDate = (date: string) => {
  return format(new Date(date), "yyyy-MM-dd");
};

/** 格式化日期時間區間字串 */
export const formatDateTimeInterval = (
  startDateTime: string,
  endDateTime: string,
) => {
  const startDate = formatDate(startDateTime);
  const endDate = formatDate(endDateTime);
  const startTime = format(new Date(startDateTime), "HH:mm");
  const endTime = format(new Date(endDateTime), "HH:mm");
  if (startDate === endDate) {
    return `${startDate} ${startTime} ~ ${endTime}`;
  }
  return `${startDate} ${startTime} ~ ${endDate} ${endTime}`;
};
