"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import {
  techSteps,
  techBanifits,
  technologyStack,
} from "@/components/_backup/data/technology";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";

export default function TechnologyPage() {
  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="Explore the cutting-edge technologies we use to build innovative solutions"
          title="Our Technology Stack"
        />

        {/* Technology Overview */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <SectionTitle
                  subtitle="TECHNOLOGY APPROACH"
                  title="Modern Solutions for Complex Challenges"
                />
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  At Devun, we leverage a diverse range of cutting-edge
                  technologies to deliver scalable, secure, and high-performance
                  solutions. Our technology stack is carefully selected to
                  address the specific needs of each project, ensuring optimal
                  results for our clients.
                </p>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  We continuously evaluate and adopt new technologies to stay at
                  the forefront of innovation, while maintaining a strong
                  foundation of proven tools and frameworks that ensure
                  reliability and maintainability.
                </p>
                <Link href="/contact">
                  <Button className="group bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Discuss Your Technology Needs
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Image
                  alt="Technology Stack"
                  className="h-[500px] w-full rounded-lg object-cover shadow-lg"
                  height={500}
                  src="https://besacenter.org/wp-content/uploads/2023/07/shutterstock_2286807935-scaled.jpg"
                  width={600}
                />
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* Technology Categories */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-blue-600"></span>
              <h2 className="text-sm font-medium text-blue-600">OUR TOOLS</h2>
              <span className="block h-0.5 w-5 bg-blue-600"></span>
            </div>
            <AnimatedText
              as="h2"
              className="mb-10 justify-center text-3xl font-bold"
              text="Technologies We Work With"
            />

            <div className="mt-12 space-y-16">
              {technologyStack.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <AnimatedText
                    as="h2"
                    className="mb-6 text-2xl font-bold"
                    text={category.category}
                  />
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {category.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        className="rounded-lg border border-gray-100 bg-white p-4 text-center transition-colors duration-300 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700"
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: techIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                      >
                        <div className="mb-3 flex justify-center">
                          <Image
                            alt={tech.name}
                            className="size-16 object-contain"
                            height={80}
                            src={tech.image || "/placeholder.svg"}
                            width={80}
                          />
                        </div>
                        <h3 className="mb-1 font-bold">{tech.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {tech.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Technology Selection Process */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-blue-600"></span>
              <h2 className="text-sm font-medium text-blue-600">OUR PROCESS</h2>
              <span className="block h-0.5 w-5 bg-blue-600"></span>
            </div>
            <AnimatedText
              as="h2"
              className="mb-10 justify-center text-3xl font-bold"
              text="How We Select Technologies"
            />

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {techSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 text-4xl font-bold text-blue-600/20 dark:text-blue-400/20">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Technology Benefits */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {techBanifits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <h3 className="mb-2 text-xl font-bold">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <SectionTitle
                  subtitle="WHY IT MATTERS"
                  title="The Benefits of Our Technology Approach"
                />
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Our carefully curated technology stack provides numerous
                  advantages for your business. By leveraging modern, proven
                  technologies, we ensure that your solutions are not only
                  powerful and feature-rich but also secure, scalable, and
                  maintainable.
                </p>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  We focus on selecting technologies that align with your
                  specific business needs while providing a solid foundation for
                  future growth and adaptation. This approach minimizes
                  technical debt and maximizes the long-term value of your
                  investment.
                </p>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* CTA Section */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <motion.div
              className="mx-auto max-w-4xl rounded-lg bg-blue-600 p-12 text-center text-white dark:bg-blue-900"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Leverage Our Technology Expertise?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-blue-100 dark:text-blue-200">
                Let's discuss how our technology stack can help solve your
                business challenges and drive innovation.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button className="group bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-white">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button
                    className="border-white bg-blue-600 text-white hover:bg-blue-700 dark:border-blue-300 dark:text-blue-200 dark:hover:bg-blue-800"
                    variant="outline"
                  >
                    View Our Case Studies
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
