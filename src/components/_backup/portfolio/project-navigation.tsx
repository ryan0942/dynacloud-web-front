"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getAllProjects } from "@/components/_backup/data/project-data";
import { Link } from "@/i18n/navigation";

interface ProjectNavigationProps {
  currentProjectId: string;
}

export function ProjectNavigation({
  currentProjectId,
}: ProjectNavigationProps) {
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex(
    (project) => project.id === currentProjectId,
  );

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="flex flex-col items-center justify-between py-8 md:flex-row">
      {prevProject ? (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 w-full md:mb-0 md:w-auto"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            className="group flex items-center rounded-lg p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            href={`/projects/${prevProject.slug}`}
          >
            <ChevronLeft className="mr-2 size-5 text-gray-500 transition-colors group-hover:text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Previous Project</p>
              <p className="font-medium transition-colors group-hover:text-blue-600">
                {prevProject.title}
              </p>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div className="mb-4 w-full md:mb-0 md:w-auto" />
      )}

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mx-4"
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          href="/projects"
        >
          All Projects
        </Link>
      </motion.div>

      {nextProject ? (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full text-right md:w-auto"
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            className="group flex items-center justify-end rounded-lg p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            href={`/projects/${nextProject.slug}`}
          >
            <div>
              <p className="text-sm text-gray-500">Next Project</p>
              <p className="font-medium transition-colors group-hover:text-blue-600">
                {nextProject.title}
              </p>
            </div>
            <ChevronRight className="ml-2 size-5 text-gray-500 transition-colors group-hover:text-blue-600" />
          </Link>
        </motion.div>
      ) : (
        <div className="w-full md:w-auto" />
      )}
    </div>
  );
}
