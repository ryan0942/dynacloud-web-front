"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { AnimatedText } from "@/components/ui/animated-text";
import { NoDataPlaceholder } from "@/components/ui/no-data-placeholder";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";
import { getCustomersQuery } from "@/queries/home/customer";

export function Customers() {
  const t = useTranslations();
  const locale = useLocale();

  /** 取得資料 */
  const { data: customerResponse } = useQuery(getCustomersQuery(locale));
  const customers = customerResponse?.result ?? [];

  return (
    <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="invisible relative -top-64" id="partners_section" />
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-primary"></span>
            <h2 className="text-sm font-medium text-primary">OUR CUSTOMERS</h2>
            <span className="block h-0.5 w-5 bg-primary"></span>
          </div>
          <AnimatedText
            as="h2"
            className="justify-center text-3xl font-bold"
            text={t("Partners")}
          />
        </motion.div>
      </div>

      <div className="container mx-auto max-w-[1400px] -translate-y-4">
        {customers.length > 0 ? (
          <div className="grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-3 lg:grid-cols-5">
            {customers.map((item, index) => {
              const MotionComponent = item.url ? motion.a : motion.div;
              const commonProps = {
                initial: { opacity: 0, y: 20 },
                transition: { duration: 0.5, delay: index * 0.1 },
                viewport: { once: true },
                whileInView: { opacity: 1, y: 0 },
                className: cn(
                  "group relative m-auto flex items-center justify-center bg-white lg:size-52",
                  item.url ? "cursor-pointer" : "cursor-default",
                ),
              };

              const linkProps = item.url
                ? {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <MotionComponent key={item.id} {...commonProps} {...linkProps}>
                  <Image
                    alt={item.name}
                    className="size-full object-contain"
                    height={232}
                    src={item.logo}
                    width={232}
                  />
                  <div className="absolute inset-0 bg-[#312E81] opacity-0 transition-opacity duration-300 group-hover:opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.name}
                  </div>
                </MotionComponent>
              );
            })}
          </div>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </SectionWrapper>
  );
}
