"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

import { categories, faqs } from "@/components/_backup/data/faq";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = searchQuery
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : faqs[activeCategory as keyof typeof faqs];

  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="Find answers to common questions about our services and processes"
          title="Frequently Asked Questions"
        />

        {/* Search Section */}
        <SectionWrapper className="bg-gray-50 py-10 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Search for answers..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Search className="size-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* FAQ Categories */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            {!searchQuery && (
              <div className="mb-12 flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white dark:bg-blue-700"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            )}

            <div className="mx-auto max-w-3xl">
              <SectionTitle
                alignment="center"
                subtitle={
                  searchQuery
                    ? "SEARCH RESULTS"
                    : `${categories.find((c) => c.id === activeCategory)?.name.toUpperCase()} QUESTIONS`
                }
                title={
                  searchQuery
                    ? `Results for "${searchQuery}"`
                    : `${categories.find((c) => c.id === activeCategory)?.name} FAQs`
                }
              />

              <div className="mt-12 space-y-4">
                <AnimatePresence mode="wait">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        animate={{ opacity: 1, y: 0 }}
                        className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
                        exit={{ opacity: 0, y: -20 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <motion.button
                          className="flex w-full items-center justify-between bg-white p-6 text-left transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          onClick={() => toggleItem(faq.id)}
                        >
                          <h3 className="text-lg font-bold">{faq.question}</h3>
                          {openItems[faq.id] ? (
                            <ChevronUp className="size-5 shrink-0 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ChevronDown className="size-5 shrink-0 text-gray-400 dark:text-gray-500" />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {openItems[faq.id] && (
                            <motion.div
                              animate={{ height: "auto", opacity: 1 }}
                              className="overflow-hidden"
                              exit={{ height: 0, opacity: 0 }}
                              initial={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="bg-white p-6 pt-0 dark:bg-gray-800">
                                <p className="text-gray-600 dark:text-gray-400">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="py-12 text-center"
                      initial={{ opacity: 0 }}
                    >
                      <p className="text-gray-600 dark:text-gray-400">
                        No matching questions found. Try a different search
                        term.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Contact CTA */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 text-3xl font-bold">Still Have Questions?</h2>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                If you couldn't find the answer to your question, our team is
                here to help. Contact us for personalized assistance.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button className="group bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                  Contact Support
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
                  variant="outline"
                >
                  Schedule a Call
                </Button>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
