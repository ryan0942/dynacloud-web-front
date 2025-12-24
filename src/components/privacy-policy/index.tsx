"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { useLocale, useTranslations } from "next-intl";

import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getPrivacyPolicyQuery } from "@/queries/privacy-policy";

export default function PrivacyPolicyPage() {
  const t = useTranslations();
  const locale = useLocale();

  /** 取得資料 */
  const { data: privacyPolicyData } = useQuery(getPrivacyPolicyQuery(locale));
  const privacyPolicy = privacyPolicyData?.result;

  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle={t("PrivacyPolicySubTitle")}
          title={t("PrivacyPolicy.Title")}
        />

        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <motion.div
              className="ck-content mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {parse(privacyPolicy?.content || "")}
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
