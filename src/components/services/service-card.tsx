"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Link } from "@/i18n/navigation";

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  category?: string;
  date?: string;
}

export const ServiceCard = ({
  id,
  icon,
  title,
  description,
  image,
}: ServiceCardProps) => {
  return (
    <Link href={`/services/${id}`}>
      <motion.div
        className="flex size-full flex-col rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-950"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Image
          alt={`${icon} icon`}
          className="mb-4 size-10"
          height={40}
          src={icon}
          width={40}
        />
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <Image
          alt={`${title} image`}
          className="mt-auto"
          height={40}
          src={image}
          width={100}
        />
      </motion.div>
    </Link>
  );
};
