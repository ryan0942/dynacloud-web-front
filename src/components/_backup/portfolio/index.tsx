import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";

import {
  getAllProjects,
  getAllCategories,
} from "@/components/_backup/data/portfolio-data";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { PageTransition } from "@/components/ui/page-transition";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Link } from "@/i18n/navigation";
import { formatImageUrl } from "@/lib/image-utils";

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();

  // Featured project is the first one
  const featuredProject = projects[0];
  // Other projects exclude the featured one
  const otherProjects = projects.slice(1);

  return (
    <PageTransition>
      <PageHeader
        subtitle="Explore our portfolio of successful IT projects and case studies across various industries and technologies."
        title="Our Projects"
      />

      {/* Featured Project */}
      <SectionWrapper>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[400px] lg:h-[500px]">
              <Image
                fill
                priority
                alt={featuredProject.title}
                className="object-cover"
                src={
                  formatImageUrl(featuredProject.featuredImage, 1000, 800) ||
                  "/placeholder.svg"
                }
              />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                {featuredProject.category}
              </div>
              <h2 className="mb-4 text-3xl font-bold">
                {featuredProject.title}
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {featuredProject.summary}
              </p>
              <Button asChild>
                <Link href={`/portfolio/${featuredProject.slug}`}>
                  View Project Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Project Categories */}
      <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600">
              Expertise Areas
            </h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="mb-10 justify-center text-3xl font-bold"
            text="Project Categories"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-colors duration-300 hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-700"
              >
                <div className="mb-2 text-xl font-bold">{category}</div>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Innovative solutions for {category.toLowerCase()} challenges
                </p>
                <Button asChild size="sm" variant="outline">
                  <Link
                    href={`/portfolio?category=${encodeURIComponent(category)}`}
                  >
                    View Projects
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* All Projects */}
      <SectionWrapper>
        <div className="container">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="block h-0.5 w-5 bg-blue-600"></span>
            <h2 className="text-sm font-medium text-blue-600"> Our Work</h2>
            <span className="block h-0.5 w-5 bg-blue-600"></span>
          </div>
          <AnimatedText
            as="h2"
            className="mb-10 justify-center text-3xl font-bold"
            text="All Projects"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, _index) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <Link className="block" href={`/portfolio/${project.slug}`}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      fill
                      alt={project.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      src={
                        formatImageUrl(project.featuredImage, 600, 400) ||
                        "/placeholder.svg"
                      }
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute right-3 top-3 translate-y-2 rounded-full bg-white p-2 text-gray-900 opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-gray-800 dark:text-gray-100">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="my-3 flex flex-wrap gap-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 size-4 text-blue-600" />
                        <span>{project.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 size-4 text-blue-600" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Tag className="mr-2 size-4 text-blue-600" />
                        <span>{project.category}</span>
                      </div>
                    </div>
                    <div className="mb-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {project.category}
                    </div>
                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                      {project.summary}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="rounded-2xl bg-blue-600 p-8 text-white dark:bg-blue-900 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                Ready to start your project?
              </h2>
              <p className="mb-8 text-blue-100">
                Let's discuss how we can help you achieve your business goals
                with our IT solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="secondary">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  asChild
                  className="border-white bg-transparent text-white hover:bg-white hover:text-blue-600"
                  variant="outline"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
