"use client";

import type React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [_hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative block h-full rounded-lg  border border-gray-100 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-950 dark:hover:border-blue-700"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative z-10">
            {item.icon && <div className="mb-4">{item.icon}</div>}
            <div className="mb-2 text-lg font-bold">{item.title}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
