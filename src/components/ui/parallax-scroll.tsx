"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import type React from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  baseVelocity?: number;
}

export function ParallaxScroll({
  children,
  className,
  baseVelocity = 5,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -baseVelocity * 100]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="size-full" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
