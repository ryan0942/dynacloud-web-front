"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

import { AnimatedText } from "@/components/ui/animated-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function About() {
  const t = useTranslations();

  return (
    <SectionWrapper className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 flex-col-reverse lg:grid-cols-2">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div>
              <Image
                alt="About Dynacloud"
                className="size-full object-contain lg:h-[500px]"
                height={200}
                src="/images/about-bg.png"
                width={350}
              />
            </div>
          </motion.div>
          <motion.div
            className="md:pl-10"
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="mb-2 text-base font-medium text-blue-300">
              ABOUT DYNACLOUD
            </div>
            <AnimatedText
              as="h2"
              className="mb-6 text-4xl font-bold"
              text={t("AboutDynacloud")}
            />

            <motion.div
              className="mb-6 text-base"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {t.rich("AboutDynacloudDescription", {
                br: () => <br />,
              })}
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500">
                  <BadgeCheck />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">{t("Provision")}</h3>
                  <p className="text-base text-blue-100">
                    {t("ProvisionDescription")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500">
                  <BadgeCheck />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">{t("Mission")}</h3>
                  <p className="text-base text-blue-100">
                    {t("MissionDescription")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
