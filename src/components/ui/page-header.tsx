"use client";

import { motion } from "framer-motion";

import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { AnimatedText } from "@/components/ui/animated-text";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  textColor?: string;
}

export function PageHeader({
  title,
  subtitle,
  bgColor: _bgColor = "bg-primary",
  textColor = "text-white",
}: PageHeaderProps) {
  return (
    <AnimatedGradient
      className={`${textColor} mx-4 mt-16 rounded-2xl py-14 md:mx-10 md:py-20`}
    >
      <div className="mx-auto px-4 text-center md:px-10">
        <AnimatedText
          as="h1"
          className="mb-4 justify-center text-4xl font-bold md:text-5xl lg:text-6xl"
          duration={0.08}
          text={title}
        />
        {subtitle && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-base opacity-90"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </AnimatedGradient>
  );
}
