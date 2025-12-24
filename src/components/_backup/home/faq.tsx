"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useState } from "react";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const faqs = [
  {
    id: "faq-1",
    question: "What services does Devun offer?",
    answer:
      "Devun offers a comprehensive range of IT services including web and mobile app development, UI/UX design, digital marketing, cybersecurity, and cloud computing solutions tailored to meet the specific needs of your business.",
  },
  {
    id: "faq-2",
    question: "How long does it take to complete a typical project?",
    answer:
      "Project timelines vary depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex enterprise application could take several months. We provide detailed timelines during the initial consultation phase.",
  },
  {
    id: "faq-3",
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer various support and maintenance packages to ensure your digital solutions continue to perform optimally. Our team is available for technical support, updates, and enhancements as your business evolves.",
  },
  {
    id: "faq-4",
    question: "How do you handle project pricing?",
    answer:
      "We offer transparent pricing based on project requirements. Depending on the nature of the project, we may work on a fixed-price model, time and materials basis, or retainer arrangement. We provide detailed quotes after understanding your specific needs.",
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto px-4 md:px-10">
      <motion.div
        className="my-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="block h-0.5 w-5 bg-blue-600"></span>
          <h2 className="text-sm font-medium text-blue-600">
            COMMON QUESTIONS
          </h2>
          <span className="block h-0.5 w-5 bg-blue-600"></span>
        </div>
        <AnimatedText
          as="h2"
          className="justify-center text-3xl font-bold"
          text="Frequently Asked Questions"
        />
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <div className="space-y-4">
          <AnimatePresence>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <motion.button
                  className="flex w-full items-center justify-between bg-white p-6 text-left transition-colors hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"
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
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link href="/faq">
            <Button
              className="group border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
              variant="outline"
            >
              View All FAQs
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
