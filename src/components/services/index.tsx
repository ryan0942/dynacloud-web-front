"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { NoDataPlaceholder } from "@/components/ui/no-data-placeholder";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils";
import {
  getServiceCategoriesQuery,
  getServicesQuery,
  SERVICES_LIMIT,
} from "@/queries/services";

import { ServiceCard } from "./service-card";

export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations();

  /** 網址參數 */
  const [searchParams, setSearchParams] = useQueryStates({
    query: parseAsString.withDefault(""),
    serviceCategoryId: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
  });

  /** 取得資料 */
  const { data: servicesResponse } = useQuery(
    getServicesQuery(locale, {
      query: searchParams.query,
      categoryId: searchParams.serviceCategoryId,
      limit: SERVICES_LIMIT * searchParams.page,
    }),
  );
  const { data: categoriesResponse } = useQuery(
    getServiceCategoriesQuery(locale),
  );

  const services = servicesResponse?.result?.data ?? [];
  const pagination = servicesResponse?.result?.pagination ?? null;

  const categories = (() => {
    let arr = [{ id: "", name: t("All") }];
    if (categoriesResponse?.result) arr = arr.concat(categoriesResponse.result);
    return arr;
  })();

  /** 載入更多 */
  const handleLoadMore = () => {
    setSearchParams({ page: searchParams.page + 1 });
  };

  /** 搜尋 */
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    setSearchParams({ query, page: 1 });
  };

  return (
    <PageTransition>
      <main>
        <PageHeader subtitle={t("ServicesSubTitle")} title={t("Services")} />

        {/* 搜尋區塊 */}
        <SectionWrapper className="bg-gray-50 py-10 dark:bg-gray-900">
          <form
            noValidate
            className="container mx-auto px-4 md:px-10"
            onSubmit={handleSearch}
          >
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  defaultValue={searchParams.query}
                  name="query"
                  placeholder={t("SearchServices")}
                  type="text"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  type="submit"
                >
                  <Search className="size-5 text-gray-400 dark:text-gray-500" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      searchParams.serviceCategoryId === category.id
                        ? "bg-primary text-white dark:bg-blue-700"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => {
                      setSearchParams({ serviceCategoryId: category.id, page: 1 });
                    }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </form>
        </SectionWrapper>

        {/* 最新服務區塊 */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <SectionTitle
              subtitle="RECENT SERVICES"
              title={t("RecentServices")}
            />
            {services.length > 0 ? (
              <>
                {services.slice(0, 1).map((item) => (
                  <motion.div
                    key={item.id}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-5"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Link href={`/services/${item.id}`} prefetch={true} aria-label={item.title} className="group relative overflow-hidden rounded-lg lg:col-span-3">
                      <div className="overflow-hidden rounded-lg aspect-video">
                        <Image
                          alt={item.title}
                          blurDataURL={item.cover}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          height={600}
                          placeholder="blur"
                          src={item.cover || "/placeholder.svg"}
                          width={1200}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </Link>

                    <div className="flex flex-col justify-center lg:col-span-2">
                      <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-primary dark:text-blue-400">
                          {item.categoryName}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(item.updatedAt)}</span>
                      </div>
                      <AnimatedText
                        as="h2"
                        className="mb-4 text-3xl font-bold"
                        text={item.title}
                      />
                      <p className="mb-6 text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                      <Link href={`/services/${item.id}`}>
                        <Button className="group bg-primary text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                          {t("ReadMore")}
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <NoDataPlaceholder />
            )}
          </div>
        </SectionWrapper>

        {/* 其他列表區塊 */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <SectionTitle subtitle="SERVICES" title={t("Services")} />
            {services.length > 1 ? (
              <>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {services.slice(1).map((item) => (
                    <ServiceCard
                      key={item.id}
                      description={item.description}
                      icon={item.icon}
                      id={item.id}
                      image={item.cover}
                      title={item.title}
                    />
                  ))}
                </div>
                {pagination?.has_next && (
                  <div className="mt-12 flex justify-center">
                    <Button
                      className="border-primary text-primary hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                      variant="outline"
                      onClick={handleLoadMore}
                    >
                      {t("LoadMore")}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <NoDataPlaceholder />
            )}
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
