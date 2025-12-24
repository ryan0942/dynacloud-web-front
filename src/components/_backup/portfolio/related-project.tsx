"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import type { Project } from "@/components/_backup/data/project-data";
import { Link } from "@/i18n/navigation";
import { formatImageUrl } from "@/lib/image-utils";

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects.length) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No related projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              fill
              alt={project.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={
                formatImageUrl(project.featuredImage, 600, 400) ||
                "/placeholder.svg"
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
              <span className="mb-2 inline-block rounded-full bg-blue-600 px-2 py-1 text-xs font-medium">
                {project.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="mb-2 line-clamp-1 text-xl font-bold">
              {project.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
              {project.summary}
            </p>
            <Link
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              href={`/projects/${project.slug}`}
            >
              View Project
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
