"use client";

import { motion } from "framer-motion";
import React from "react";

import { AnimatedText } from "@/components/ui/animated-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TestimonialsSlider } from "@/components/ui/testimonials-slider";

export default function Testimonials() {
  return (
    <SectionWrapper className="bg-gray-50 py-16 dark:dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-10">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600">TESTIMONIALS</h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="justify-center text-3xl font-bold"
            text="Our Latest Client Feedback"
          />
        </motion.div>

        <TestimonialsSlider />
      </div>
    </SectionWrapper>
  );
}
