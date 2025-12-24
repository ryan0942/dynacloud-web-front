"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";

export interface CaseCardProps {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  logo: string;
}

export const CaseCard = ({
  id,
  category,
  logo,
  image,
  title,
  description,
}: CaseCardProps) => {
  const t = useTranslations();

  return (
    <Link
      aria-label={title}
      className="flex size-full flex-col"
      href={`/cases/${id}`}
      prefetch={true}
    >
      <motion.div
        className="flex h-full flex-1 flex-col"
        transition={{ type: "spring", stiffness: 300 }}
        whileHover={{ y: -10 }}
      >
        <div className="relative aspect-video shrink-0 overflow-hidden rounded-2xl">
          <Image
            priority
            alt={title}
            className="size-full object-cover transition-transform duration-500 hover:scale-110"
            height={300}
            src={image}
            width={300}
          />
        </div>
        <div className="relative flex flex-1 flex-col p-6 dark:bg-gray-900">
          <div className="absolute -top-10 right-4 z-10 flex size-20 items-center justify-center rounded-lg bg-white p-1">
            <Image
              priority
              alt={title}
              className="size-full object-contain"
              height={80}
              src={logo}
              width={80}
            />
          </div>
          <div className="mb-2 flex items-center justify-between gap-2 text-sm">
            <span className="text-primary dark:bg-gray-700">{category}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 overflow-hidden text-ellipsis text-xl font-bold">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 flex-1 overflow-hidden text-ellipsis text-sm text-gray-600">
            {description}
          </p>
          <p className="mt-auto flex w-fit items-center rounded-full border border-gray-200 bg-blue-50/50 px-5 py-2 text-sm font-medium dark:bg-gray-700">
            {t("ReadMore")} <MoveRight className="ml-1 size-4" />
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
