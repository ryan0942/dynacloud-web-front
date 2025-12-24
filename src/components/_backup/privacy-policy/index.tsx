"use client";

import { motion } from "framer-motion";

import { sections } from "@/components/_backup/data/privacy-policy";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 14, 2025";

  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="How we collect, use, and protect your information"
          title="Privacy Policy"
        />

        <SectionWrapper>
          <div className="container mx-auto px-4">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="mb-10 rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Last Updated:</strong> {lastUpdated}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  This Privacy Policy describes how Devun ("we", "us", or "our")
                  collects, uses, and shares your personal information when you
                  visit our website, use our services, or otherwise interact
                  with us.
                </p>
              </motion.div>

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <SectionTitle title={section.title} />
                    <div className="prose prose-blue max-w-none dark:prose-invert">
                      {section.content.map((item, i) => {
                        if (typeof item === "string") {
                          return (
                            <p
                              key={i}
                              className="text-gray-600 dark:text-gray-400"
                            >
                              {item}
                            </p>
                          );
                        } else {
                          return (
                            <div key={i} className="mt-4">
                              {item.items && (
                                <h3 className="mb-2 text-lg font-bold">
                                  {item.items}
                                </h3>
                              )}
                              <ul className="list-disc space-y-2 pl-6">
                                {item.items.map((listItem, j) => (
                                  <li
                                    key={j}
                                    className="text-gray-600 dark:text-gray-400"
                                  >
                                    {listItem}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
