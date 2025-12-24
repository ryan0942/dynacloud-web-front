"use client";

import { motion } from "framer-motion";
import React from "react";

import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export default function Cta() {
  return (
    <SectionWrapper className="py-10">
      <div className="container mx-auto px-4 md:px-10">
        <motion.div
          className="flex flex-col items-center justify-between rounded-lg bg-blue-600 p-8 text-white md:flex-row"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="md:w-2/3">
            <AnimatedText
              as="h2"
              className="text-2xl font-bold"
              text="Stay Connected With Cutting Edge IT"
            />
          </div>
          <motion.div
            className="mt-4 md:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Get Connected
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
