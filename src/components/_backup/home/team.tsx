"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

import { AnimatedText } from "@/components/ui/animated-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { HOME_TEAM_DATA } from "@/data/commen";

export default function Team() {
  return (
    <SectionWrapper className="py-16">
      <div className="container mx-auto px-4 md:px-10">
        <motion.div
          className=" mb-10"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600">OUR TEAM</h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="justify-center text-3xl font-bold"
            text="The Minds Behind Our Success"
          />
        </motion.div>

        <motion.div
          className="relative z-10 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Image
            alt="about video"
            className="h-[60vw] w-full object-cover md:h-[45vw] "
            height={500}
            src="/images/about-video.jpg"
            width={1920}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border  border-white p-2">
              <div className="rounded-full border border-white p-2 dark:border-black">
                <motion.button
                  className="flex size-16 items-center justify-center rounded-full bg-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="ml-1 size-6 text-blue-600" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="-mt-14 grid grid-cols-1 gap-8 bg-indigo-900 p-10 pt-32 text-white md:grid-cols-3"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {HOME_TEAM_DATA.map((item, idx) => (
          <motion.div
            key={idx}
            className="text-center"
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={{ y: -10 }}
          >
            {item.icon}
            <h3 className="mb-2 text-xl font-bold">{item.heading}</h3>
            <p className="mx-auto w-4/5 text-sm text-blue-200 md:w-10/12">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
