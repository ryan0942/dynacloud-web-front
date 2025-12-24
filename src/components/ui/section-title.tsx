"use client";

import { motion } from "framer-motion";

import { AnimatedText } from "@/components/ui/animated-text";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  alignment?: "left" | "center" | "right";
  subtitleColor?: string;
}

export function SectionTitle({
  subtitle,
  title,
  alignment = "left",
  subtitleColor = "text-blue-600",
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      className={`mb-10 max-w-2xl ${alignmentClasses[alignment]}`}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileInView={{ opacity: 1 }}
    >
      {subtitle && (
        <motion.div
          className={`mb-2 text-sm font-medium ${subtitleColor}`}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {subtitle}
        </motion.div>
      )}
      <AnimatedText as="h2" className="text-3xl font-bold" text={title} />
    </motion.div>
  );
}
