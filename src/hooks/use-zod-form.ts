import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

/** 封裝 useForm，加上 zod 和 i18n 語系 (強烈建議設定 defaultValues，所以 type 改為必填) */
export const useZodForm = <T extends z.ZodType>(
  schema: T,
  options: UseFormProps<z.infer<T>> &
    Required<Pick<UseFormProps<z.infer<T>>, "defaultValues">>,
) => {
  return useForm<z.infer<T>>({ resolver: zodResolver(schema), ...options });
};
