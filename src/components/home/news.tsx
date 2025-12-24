"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { NewsCard } from "@/components/news/news-card";
import { AnimatedText } from "@/components/ui/animated-text";
import { NoDataPlaceholder } from "@/components/ui/no-data-placeholder";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SwiperContainer } from "@/components/ui/swiper-container";
import { formatDateTimeInterval } from "@/lib/utils";
import { getNewsCategoriesQuery, getNewsQuery } from "@/queries/news";

export function News() {
  const t = useTranslations();
  const locale = useLocale();

  /** 本地狀態 */
  const [categoryId, setCategoryId] = useState("");

  /** 取得資料 */
  const { data: newsData } = useQuery(getNewsQuery(locale, { categoryId }));
  const { data: categoriesData } = useQuery(getNewsCategoriesQuery(locale));

  const news = newsData?.result?.data ?? [];
  const categories = (() => {
    let arr = [{ id: "", name: t("All") }];
    if (categoriesData?.result) arr = arr.concat(categoriesData.result);
    return arr;
  })();

  return (
    <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-10">
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-primary"></span>
              <h2 className="text-sm font-medium text-primary">NEWS</h2>
              <span className="block h-0.5 w-5 bg-primary"></span>
            </div>
            <AnimatedText
              as="h2"
              className="justify-center text-3xl font-bold"
              text={t("News")}
            />
          </motion.div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                categoryId === category.id
                  ? "bg-primary text-white dark:bg-blue-700"
                  : "border border-gray-200 bg-blue-50/50 px-5 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              onClick={() => setCategoryId(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div>
          {news.length > 0 ? (
            <SwiperContainer autoPlay={false} gap={24} itemsPerView={3}>
              {news.map((item) => (
                <NewsCard
                  key={item.id}
                  category={item.category.name}
                  description={item.description}
                  id={item.id}
                  image={item.cover}
                  title={item.title}
                  date={formatDateTimeInterval(
                    item.startDateTime,
                    item.endDateTime,
                  )}
                />
              ))}
            </SwiperContainer>
          ) : (
            <NoDataPlaceholder />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
