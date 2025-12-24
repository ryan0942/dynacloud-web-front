"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowRight, Facebook } from "lucide-react";
import Image from "next/image";

import {
  departmentTeams,
  feature,
  leadershipTeam,
  whatDiffrent,
} from "@/components/_backup/data/team";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionTitle } from "@/components/ui/section-title";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";

export default function TeamPage() {
  return (
    <PageTransition>
      <main>
        <PageHeader
          subtitle="Meet the talented individuals behind our innovative solutions"
          title="Our Team"
        />

        {/* Leadership Team */}
        <SectionWrapper>
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-blue-600"></span>
              <h2 className="text-sm font-medium text-blue-600">LEADERSHIP</h2>
              <span className="block h-0.5 w-5 bg-blue-600"></span>
            </div>
            <AnimatedText
              as="h2"
              className="mb-10 justify-center text-3xl font-bold"
              text="Meet Our Leadership Team"
            />

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={index}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      alt={member.name}
                      className="h-80 w-full object-cover object-top transition-transform duration-500 group-hover:scale-110 md:h-72"
                      height={400}
                      quality={100}
                      src={member.image || "/placeholder.svg"}
                      width={400}
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="w-full p-4">
                        <div className="flex justify-center space-x-4">
                          <a
                            className="rounded-full bg-white/20 p-3 transition-colors hover:bg-white/40"
                            href={member.social.linkedin}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Linkedin className="size-5 text-white" />
                          </a>
                          <a
                            className="rounded-full bg-white/20 p-3 transition-colors hover:bg-white/40"
                            href={member.social.facebook}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Facebook className="size-5 text-white" />
                          </a>
                          <a
                            className="rounded-full bg-white/20 p-3 transition-colors hover:bg-white/40"
                            href={`mailto:${member.social.email}`}
                          >
                            <Mail className="size-5 text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                    <p className="mb-3 text-blue-600 dark:text-blue-400">
                      {member.position}
                    </p>
                    <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Department Teams */}
        <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="block h-0.5 w-5 bg-blue-600"></span>
              <h2 className="text-sm font-medium text-blue-600">OUR EXPERTS</h2>
              <span className="block h-0.5 w-5 bg-blue-600"></span>
            </div>
            <AnimatedText
              as="h2"
              className="mb-10 justify-center text-3xl font-bold"
              text="Department Teams"
            />

            <div className="mt-12 space-y-16">
              {departmentTeams.map((team, teamIndex) => (
                <div key={teamIndex}>
                  <h3 className="mb-6 text-2xl font-bold">{team.department}</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {team.members.map((member, memberIndex) => (
                      <motion.div
                        key={memberIndex}
                        className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 transition-colors duration-300 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700"
                        initial={{ opacity: 0, y: 20 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: memberIndex * 0.05,
                        }}
                      >
                        <Image
                          alt={member.name}
                          className="size-12 rounded-full object-cover"
                          height={100}
                          quality={100}
                          src={member.image || "/placeholder.svg"}
                          width={100}
                        />
                        <div>
                          <h4 className="font-bold">{member.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {member.position}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Company Culture */}
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
                  subtitle="OUR CULTURE"
                  title="What Makes Us Different"
                />

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  At Devun, we believe that our culture is the foundation of our
                  success. We foster an environment of collaboration,
                  innovation, and continuous learning where every team member
                  can thrive and make a meaningful impact.
                </p>

                <div className="mb-6 space-y-4">
                  {feature.map((value, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="flex size-4 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                          <div className="size-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                        </div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-2 md:gap-4"
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                {whatDiffrent.map((item, index) => (
                  <motion.div
                    key={index}
                    className="overflow-hidden rounded-lg"
                    transition={{ type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      alt={`Team Culture ${index + 1}`}
                      className="h-[180px] w-full object-cover md:h-[220px]"
                      height={300}
                      quality={100}
                      src={item}
                      width={300}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* Join Our Team */}
        <SectionWrapper className="bg-blue-600 text-white dark:bg-blue-900">
          <div className="container mx-auto px-4 md:px-10">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 text-3xl font-bold">Join Our Team</h2>
              <p className="mb-8 text-xl opacity-90">
                We're always looking for talented individuals to join our team.
                Check out our open positions and become part of our journey.
              </p>
              <Link href="/careers">
                <Button className="group bg-white px-8 py-6 text-lg text-blue-600 hover:bg-blue-50 dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-white">
                  View Open Positions
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>
    </PageTransition>
  );
}
