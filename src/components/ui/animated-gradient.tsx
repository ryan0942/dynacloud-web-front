"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children: React.ReactNode;
}

export function AnimatedGradient({
  className,
  children,
}: AnimatedGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      container.style.setProperty("--x", x.toString());
      container.style.setProperty("--y", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ "--x": "0.5", "--y": "0.5" } as React.CSSProperties}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary to-indigo-700 bg-[length:200%_200%]",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_calc(var(--x,0.5)*100%)_calc(var(--y,0.5)*100%),rgba(255,255,255,0.15),transparent_30%)]",
        "transition-all duration-300",
        className,
      )}
    >
      <motion.div
        animate={{ opacity: 1 }}
        className="relative z-10"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
