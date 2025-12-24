"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { AnimatedText } from "@/components/ui/animated-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SliderContainer } from "@/components/ui/slider-container";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import { getServicesQuery } from "@/queries/services";
import { GetServiceIdResponse } from "@/types/api-response/services";

import { ServiceCard } from "../service-card";

interface ServiceDetailsProps {
  data: GetServiceIdResponse;
}

export default function ServiceDetails({ data }: ServiceDetailsProps) {
  const t = useTranslations();
  const locale = useLocale();

  /** 取得同類別服務（用於側邊欄「其他服務」） */
  const { data: relatedServicesResponse } = useQuery(
    getServicesQuery(locale, {
      categoryId: data.category.id,
    }),
  );

  /** 取得所有服務（用於底部「更多服務」） */
  const { data: allServicesResponse } = useQuery(getServicesQuery(locale, {}));

  /** 其他服務（同類別） */
  const relatedServices = (() => {
    const services = relatedServicesResponse?.result?.data ?? [];
    return services.filter((item) => item.id !== data.id).slice(0, 3);
  })();

  /** 更多服務（所有類別） */
  const allServices = (() => {
    const services = allServicesResponse?.result?.data ?? [];
    return services.filter((item) => item.id !== data.id);
  })();

  return (
    <div>
      {/* 標題區塊 */}
      <div className="bg-primary pb-16 pt-32 text-white dark:bg-blue-900">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mx-auto max-w-3xl">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                className="mb-4 inline-flex items-center text-blue-200 transition-colors hover:text-white dark:text-blue-300"
                href="/services"
              >
                <ArrowRight className="mr-2 size-4 rotate-180" />
                {t("Services")}
              </Link>
              <AnimatedText
                as="h1"
                className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
                duration={0.08}
                text={data.title}
              />
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-blue-100 dark:text-blue-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Calendar className="mr-1 size-4" />
                    <span>{formatDate(data.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 內容區塊 */}
      <SectionWrapper>
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* 主要內容 */}
            <div className="lg:col-span-2">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mb-8 overflow-hidden rounded-lg aspect-video">
                  <Image
                    alt={data.title}
                    blurDataURL={data.cover}
                    className="h-auto w-full"
                    height={600}
                    placeholder="blur"
                    src={data.cover || "/placeholder.svg"}
                    width={1200}
                  />
                </div>

                <div className="ck-content mb-10">
                  {parse(data.content || "")}
                </div>
              </motion.div>
            </div>

            {/* 側邊欄 */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {/* 服務摘要 */}
                  <div className="mb-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                    <div className="mb-4 flex items-center">
                      {data.icon && (
                        <Image
                          alt={data.title}
                          className="mr-4"
                          height={60}
                          src={data.icon}
                          width={60}
                        />
                      )}
                      <div>
                        <h4 className="font-bold">{data.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {data.categoryName}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {data.description}
                    </p>
                  </div>

                  {/* 其他服務 */}
                  {relatedServices.length > 0 && (
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-bold">
                        {t("OtherService")}
                      </h3>
                      <div className="space-y-4">
                        {relatedServices.map((item) => (
                          <Link
                            key={item.id}
                            className="group flex gap-3"
                            href={`/services/${item.id}`}
                          >
                            <Image
                              alt={item.title}
                              blurDataURL={item.cover}
                              className="size-20 rounded-md object-contain transition-transform duration-500 hover:scale-110"
                              height={80}
                              placeholder="blur"
                              src={item.cover || "/placeholder.svg"}
                              width={80}
                            />
                            <div>
                              <h4 className="font-medium transition-colors group-hover:text-primary dark:group-hover:text-blue-400">
                                {item.title}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.categoryName}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 更多服務區塊 */}
      {allServices.length > 0 && (
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <h2 className="mb-8 text-center text-2xl font-bold">
              {t("MoreService")}
            </h2>

            <SliderContainer autoPlay={false} gap={24} itemsPerView={4}>
              {allServices.map((item) => (
                <ServiceCard
                  key={item.id}
                  description={item.description}
                  icon={item.icon}
                  id={item.id}
                  image={item.cover}
                  title={item.title}
                />
              ))}
            </SliderContainer>
          </div>
        </SectionWrapper>
      )}
    </div>
  );
}
