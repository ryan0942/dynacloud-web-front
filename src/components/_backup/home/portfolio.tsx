"use client";

import { motion } from "framer-motion";
import { CalendarCheck, MoveRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  getAllProjectCategories,
  getAllProjects,
  getProjectsByCategory,
} from "@/components/_backup/data/project-data";
import { AnimatedText } from "@/components/ui/animated-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  const filteredProjects =
    activeCategory === "All"
      ? getAllProjects()
      : getProjectsByCategory(activeCategory);

  return (
    <SectionWrapper className="px-4 md:px-10">
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600">OUR WORK</h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="justify-center text-3xl font-bold"
            text="Featured Projects"
          />
        </motion.div>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {["All", ...getAllProjectCategories()].map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-blue-600 text-white dark:bg-blue-700"
                : "border border-gray-200 bg-blue-50/50 px-5 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.slice(0, 6).map((item, index) => (
          <motion.div
            key={item.id}
            className="group"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link href={`/portfolio/${item.slug}`}>
              <div className="h-full overflow-hidden rounded-lg">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    alt={item.title}
                    className="size-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
                    height={300}
                    src={item.featuredImage}
                    width={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                <div className="space-y-3 py-6 pr-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium uppercase text-blue-600 dark:text-blue-400">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 ">
                      <CalendarCheck className="w-4" /> {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-gray-500">
                    {item.summary}
                  </p>
                  <button
                    className=" flex w-fit items-center rounded-full border border-gray-200 bg-blue-50/50 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => router.push("/")}
                  >
                    View Project <MoveRight className="ml-1 size-4" />
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      {/* <motion.div
                initial={ { opacity: 0, y: 20 } }
                whileInView={ { opacity: 1, y: 0 } }
                viewport={ { once: true } }
                transition={ { duration: 0.5, delay: 0.2 } }
                className="mt-4 md:mt-0"
            >
                <Link href="/case-studies">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 group">
                        View All Projects
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </motion.div> */}
    </SectionWrapper>
  );
}
