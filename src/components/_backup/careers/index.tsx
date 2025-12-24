"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  banifits,
  departments,
  positions,
  steps,
  testimonials,
} from "@/components/_backup/data/careers";
import QuoteIcon from "@/components/assets/quote-icon";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { SectionTitle } from "@/components/ui/section-title";

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [openPositions, setOpenPositions] = useState<Record<string, boolean>>(
    {},
  );

  const togglePosition = (id: string) => {
    setOpenPositions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredPositions =
    activeTab === "all"
      ? positions
      : positions.filter((position) => position.department === activeTab);

  const router = useRouter();

  const handleApplyNow = () => {
    router.push("/careers/apply");
  };

  return (
    <main>
      <PageHeader
        subtitle="Join our team and help shape the future of technology"
        title="Careers at Devun"
      />

      {/* Why Join Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <SectionTitle
                subtitle="JOIN US"
                title="Join Our Innovative Team"
              />
              <p className="mb-6 text-gray-600">
                At Devun, we're building a team of passionate, creative, and
                talented individuals who are excited about using technology to
                solve complex problems and create exceptional digital
                experiences.
              </p>
              <p className="mb-6 text-gray-600">
                We believe in fostering a collaborative, inclusive, and
                growth-oriented environment where everyone has the opportunity
                to learn, innovate, and make a meaningful impact.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {banifits.map((benefit, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900"
                  >
                    <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Image
                alt="Team collaboration"
                className="rounded-lg"
                height={600}
                src="/images/join.jpg?height=600&width=600"
                width={600}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600">
              OPEN POSITIONS
            </h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="mb-10 justify-center text-3xl font-bold"
            text="Join Our Team"
          />

          {/* Search */}
          <div className="mx-auto mb-10 max-w-2xl">
            <div className="relative">
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for positions..."
                type="text"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Search className="size-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Department Tabs */}
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {departments.map((department) => (
              <button
                key={department.id}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === department.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-white"
                }`}
                onClick={() => setActiveTab(department.id)}
              >
                {department.name}
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="mx-auto max-w-4xl">
            {filteredPositions.length > 0 ? (
              <div className="space-y-6">
                {filteredPositions.map((position, index) => (
                  <motion.div
                    key={position.id}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-950"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div
                      className="cursor-pointer p-6 transition-colors hover:bg-gray-50"
                      onClick={() => togglePosition(position.id)}
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                          <h3 className="text-xl font-bold">
                            {position.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="mr-1 size-4" />
                              {position.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="mr-1 size-4" />
                              {position.department.charAt(0).toUpperCase() +
                                position.department.slice(1)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 size-4" />
                              {position.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button className="mr-4 bg-blue-600 text-white hover:bg-blue-700">
                            Apply Now
                          </Button>
                          {openPositions[position.id] ? (
                            <ChevronUp className="size-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="size-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {openPositions[position.id] && (
                      <div className="px-6 pb-6">
                        <p className="mb-6 text-gray-600">
                          {position.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="mb-3 text-lg font-bold">
                            Responsibilities:
                          </h4>
                          <ul className="list-disc space-y-2 pl-5 text-gray-600">
                            {position.responsibilities.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-6">
                          <h4 className="mb-3 text-lg font-bold">
                            Requirements:
                          </h4>
                          <ul className="list-disc space-y-2 pl-5 text-gray-600">
                            {position.requirements.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={handleApplyNow}
                        >
                          Apply for this Position
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600">
                  No positions found in this department at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600">TEAM VOICES</h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="mb-10 justify-center text-3xl font-bold"
            text="What Our Team Says"
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group  rounded-lg border border-gray-100 bg-white p-8 shadow-sm transition-colors duration-300 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="mb-4 text-4xl text-gray-200 group-hover:text-blue-600">
                  <QuoteIcon />
                </div>
                <p className="mb-6 text-gray-600 dark:text-white">
                  {testimonial.quote}
                </p>
                <div className="flex items-center ">
                  <Image
                    alt={testimonial.name}
                    className="mr-4 rounded-full"
                    height={50}
                    src={testimonial.image || "/placeholder.svg"}
                    width={50}
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="line-clamp-4 overflow-hidden text-ellipsis text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 md:px-10">
          <SectionTitle
            alignment="center"
            subtitle="HOW TO APPLY"
            subtitleColor="text-blue-200"
            title="Our Hiring Process"
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="mb-4 text-5xl font-bold text-blue-500 opacity-20">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                <p className="text-blue-100">{step.description}</p>

                {index < 3 && (
                  <div className="absolute right-0 top-5 hidden translate-x-1/2 md:block">
                    <ChevronRight className="size-6 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-10">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="mb-6 text-3xl font-bold">
              Don't See a Perfect Fit?
            </h2>
            <p className="mb-8 text-gray-600">
              We're always looking for talented individuals to join our team.
              Send us your resume and we'll keep you in mind for future
              opportunities.
            </p>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Submit Your Resume
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
