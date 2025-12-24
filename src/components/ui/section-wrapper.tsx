"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionWrapper({
  id,
  children,
  className,
  delay = 0,
}: SectionWrapperProps) {
  return (
    <motion.section
      className={cn("py-16 md:py-24", className)}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.section>
  );
}
