"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useLocale, useTranslations } from "next-intl";

import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getAboutQuery } from "@/queries/about";

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();

  /** 取得資料 */
  const { data: aboutData } = useQuery(getAboutQuery(locale));
  const about = aboutData?.result;

  return (
    <PageTransition>
      <main>
        <PageHeader subtitle={t("AboutSubTitle")} title={t("About")} />

        {/* Company Overview */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <motion.div
              className="ck-content mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {parse(about?.content || "")}
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
