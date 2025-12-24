"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { ArrowRight, Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { AnimatedText } from "@/components/ui/animated-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SliderContainer } from "@/components/ui/slider-container";
import { Link } from "@/i18n/navigation";
import { getCasesQuery } from "@/queries/cases";
import { GetCaseIdResponse } from "@/types/api-response/cases";

import { CaseCard } from "../case-card";

interface CaseDetailsProps {
  data: GetCaseIdResponse;
}

export default function CaseDetails({ data }: CaseDetailsProps) {
  const t = useTranslations();
  const locale = useLocale();

  /** 取得同類別案例（用於側邊欄「其他案例」） */
  const { data: relatedCasesResponse } = useQuery(
    getCasesQuery(locale, {
      categoryId: data.category.id,
    }),
  );

  /** 取得所有案例（用於底部「更多案例」） */
  const { data: allCasesResponse } = useQuery(getCasesQuery(locale, {}));

  /** 其他案例（同類別） */
  const relatedCases = (() => {
    const cases = relatedCasesResponse?.result?.data ?? [];
    return cases.filter((item) => item.id !== data.id).slice(0, 3);
  })();

  /** 更多案例（所有類別） */
  const allCases = (() => {
    const cases = allCasesResponse?.result?.data ?? [];
    return cases.filter((item) => item.id !== data.id);
  })();

  /** 將 tags 字串轉換為陣列 */
  const tagsArray = data.tags
    ? data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

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
                href="/cases"
              >
                <ArrowRight className="mr-2 size-4 rotate-180" />
                {t("Case")}
              </Link>
              <AnimatedText
                as="h1"
                className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
                duration={0.08}
                text={data.title}
              />
              <div className="flex items-center justify-between gap-6">
                {data.company_description && (
                  <Quote className="mb-auto size-8 rotate-180 text-blue-800" />
                )}
                <div className="flex flex-1 flex-col gap-2">
                  <span>{data.company_description}</span>
                  <span className="ml-auto">{data.company_title}</span>
                </div>
                {data.company_title && (
                  <Quote className="mt-auto size-8 text-blue-800" />
                )}
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
                    className="size-full object-cover"
                    height={600}
                    placeholder="blur"
                    src={data.cover || "/placeholder.svg"}
                    width={1200}
                  />
                </div>

                <div className="ck-content mb-10">
                  {parse(data.content || "")}
                </div>

                {/* 標籤區塊 */}
                {tagsArray.length > 0 && (
                  <div className="mb-10 flex flex-wrap gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {tagsArray.map((tag, index) => (
                        <span
                          key={index}
                          className="block w-fit rounded-full bg-gray-50 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                  {/* 文章摘要 */}
                  <div className="mb-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                    <div className="mb-4 flex items-center">
                      <Image
                        alt={data.title}
                        className="mr-4"
                        height={60}
                        src={data.company_logo || "/placeholder.svg"}
                        width={60}
                      />
                      <div>
                        <h4 className="font-bold">{data.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {data.category.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {data.description}
                    </p>
                  </div>

                  {/* 其他案例 */}
                  {relatedCases.length > 0 && (
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-bold">
                        {t("OtherCase")}
                      </h3>
                      <div className="space-y-4">
                        {relatedCases.map((item) => (
                          <Link
                            key={item.id}
                            aria-label={item.title}
                            className="group flex gap-3"
                            href={`/cases/${item.id}`}
                            prefetch={true}
                          >
                            <Image
                              alt={item.title}
                              blurDataURL={item.company_logo}
                              className="size-20 rounded-md object-contain transition-transform duration-500 hover:scale-110"
                              height={80}
                              placeholder="blur"
                              src={item.company_logo || "/placeholder.svg"}
                              width={80}
                            />
                            <div>
                              <h4 className="font-medium transition-colors group-hover:text-primary dark:group-hover:text-blue-400">
                                {item.title}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.category.name}
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

      {/* 更多案例區塊 */}
      {allCases.length > 0 && (
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <h2 className="mb-8 text-center text-2xl font-bold">
              {t("MoreCase")}
            </h2>

            <SliderContainer autoPlay={false} gap={24} itemsPerView={3}>
              {allCases.map((item) => (
                <CaseCard
                  key={item.id}
                  category={item.category.name}
                  description={item.description}
                  id={item.id}
                  image={item.cover}
                  logo={item.company_logo}
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
