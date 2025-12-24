"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { navItems, socialLinks } from "@/data/commen";
import { Link } from "@/i18n/navigation";
import { getCompanyInfoQuery } from "@/queries/company-info";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  /** 取得公司資訊 */
  const { data: companyInfoData } = useQuery(getCompanyInfoQuery(locale));
  const companyInfo = companyInfoData?.result;

  const before =
    "before:absolute before:-top-28 before:-left-28 before:block before:w-60 before:h-60 before:rounded-full before:border-[40px] before:border-[#F8B914]";
  const after =
    "after:absolute after:hidden after:-bottom-28 after:-right-28 md:after:block after:w-60 after:h-60 after:rounded-full after:border-[40px] after:border-[#36A251]";

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className={`relative overflow-hidden border-t bg-indigo-900 pt-14 text-white dark:border-gray-700 dark:bg-gray-950 ${before} ${after}`}
      initial="hidden"
      variants={footerVariants}
      viewport={{ once: true }}
      whileInView="visible"
    >
      <div className="container z-10 mx-auto px-4 md:px-10">
        <div className="mb-10 grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div className="mx-auto flex flex-col" variants={itemVariants}>
            <Image
              alt="Logo"
              className="z-10 mb-6"
              height={56}
              src="/logo-white.svg"
              width={286}
            />
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    className="flex size-10 items-center justify-center rounded-lg bg-white text-blue-900 dark:bg-gray-700 dark:text-white "
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ul className="space-y-4">
              <li>
                {t("Address")}: {companyInfo?.address}
              </li>
              <li>
                {t("Email")}: {companyInfo?.email}
              </li>
              <li>
                {t("Phone")}: {companyInfo?.phone}
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  title={t(item.name)}
                >
                  {t(item.name)}
                </Link>
              ))}
              <Link href="/contact-us" prefetch={true} title={t("Contact")}>
                {t("Contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="relative z-10 bg-primary px-10 py-3 text-center dark:border-gray-800">
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
          <p className="text-sm text-white opacity-90">
            Copyright {new Date().getFullYear()} © Dynacloud CO., LTD. All
            Rights Reserved.
          </p>
          <Link
            className="text-sm text-white opacity-90 hover:underline hover:opacity-100"
            href="/privacy-policy"
            prefetch={true}
            title={t("PrivacyPolicy.Title")}
          >
            {t("PrivacyPolicy.Title")}
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
