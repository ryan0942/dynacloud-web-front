"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";

import Support from "@/components/_backup/home/support";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { serviceOverviews, servicesPage } from "@/data/services";

export default function ServicesPage() {
  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="Comprehensive IT solutions tailored to your business needs"
          title="Our Services"
        />

        {/* Services Overview */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-blue-600"></span>
              <h2 className="text-sm font-medium text-blue-600">
                WHAT WE OFFER
              </h2>
              <span className="block h-0.5 w-5 bg-blue-600"></span>
            </div>
            <AnimatedText
              as="h2"
              className="justify-center text-3xl font-bold"
              text="Comprehensive IT Solutions"
            />
            <HoverEffect className="mt-12" items={serviceOverviews} />
          </div>
        </SectionWrapper>

        {/* Detailed Service Sections */}
        {servicesPage.map((service, index) => (
          <SectionWrapper
            key={service.id}
            className={`${index % 2 === 1 ? "bg-gray-50 dark:bg-gray-900" : ""}`}
          >
            <div
              className={`container mx-auto flex flex-col items-center px-4 md:px-10 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12`}
            >
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <SectionTitle subtitle="OUR EXPERTISE" title={service.title} />
                <p className="mb-3 text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>

                <div className="mb-8 space-y-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="flex size-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                          <ChevronRight className="size-3 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <Button className="group rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                  Request a Consultation
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="relative ">
                  <Image
                    alt={service.title}
                    className="h-[70vw] w-full overflow-hidden rounded-lg object-cover transition-transform duration-500 hover:scale-105 md:h-[43vw]"
                    height={500}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                    src={service.image || "/placeholder.svg"}
                    width={500}
                  />
                </div>
              </motion.div>
            </div>
          </SectionWrapper>
        ))}

        {/* Process Section */}
        <SectionWrapper className="bg-blue-600 text-white dark:bg-blue-900">
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-white"></span>
              <h2 className="text-sm font-medium text-white">OW WE WORK</h2>
              <span className="block h-0.5 w-5 bg-white"></span>
            </div>
            <AnimatedText
              as="h2"
              className="justify-center text-3xl font-bold"
              text="Our Proven Process"
            />

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description:
                    "We start by understanding your business goals, challenges, and requirements.",
                },
                {
                  number: "02",
                  title: "Strategy",
                  description:
                    "We develop a comprehensive strategy and roadmap tailored to your specific needs.",
                },
                {
                  number: "03",
                  title: "Implementation",
                  description:
                    "Our expert team brings the strategy to life with precision and attention to detail.",
                },
                {
                  number: "04",
                  title: "Support",
                  description:
                    "We provide ongoing support and optimization to ensure long-term success.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 flex items-center justify-between text-5xl font-bold text-blue-500 opacity-40 dark:text-blue-400">
                    {step.number}
                    {index < 3 && (
                      <div className="hidden md:block">
                        <ChevronRight className="size-6 text-blue-300 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-blue-100 dark:text-blue-200">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <Support />
      </main>
    </PageTransition>
  );
}
