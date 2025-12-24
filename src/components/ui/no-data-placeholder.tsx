import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

interface NoDataPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function NoDataPlaceholder({
  text,
  className,
  ...props
}: NoDataPlaceholderProps) {
  const t = useTranslations();

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <p className="text-xl text-gray-500">{text || t("NoData")}</p>
    </div>
  );
}
