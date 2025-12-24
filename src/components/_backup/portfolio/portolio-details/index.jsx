
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag, Share2, ArrowRight } from "lucide-react"

import { PageTransition } from "@/components/ui/page-transition"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { SectionTitle } from "@/components/ui/section-title"
import { Button } from "@/components/ui/button"
import { MediaGallery } from "@/components/ui/media-gallery"
import { ProjectNavigation } from "@/components/portfolio/project-navigation"
import { RelatedProjects } from "@/components/portfolio/related-project"
import { formatImageUrl } from "@/lib/image-utils"
import { getRelatedProjects } from "@/components/data/portfolio-data"
import { optimizeMediaItems, preloadCriticalMedia } from "@/lib/media-utils"
import { PageHeader } from "@/components/ui/page-header"
import { AnimatedText } from "@/components/ui/animated-text"


export default function ProjectDetailsPage({ project }) {

    if (!project) {
        return (
            <PageTransition>
                <div className="container mx-auto py-20 text-center">
                    <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                    <p className="mb-8">The project you're looking for doesn't exist or has been moved.</p>
                    <Button asChild>
                        <Link href="/portfolio">View All Projects</Link>
                    </Button>
                </div>
            </PageTransition>
        )
    }

    const relatedProjects = getRelatedProjects(project.id, project.category, 3)
    const optimizedGallery = optimizeMediaItems(project.gallery)

    // Preload critical media on the client side
    if (typeof window !== "undefined") {
        preloadCriticalMedia(optimizedGallery, 2)
    }

    return (
        <PageTransition>
            {/* Hero Section */ }
            <div className="mb-10">
                <PageHeader
                    title={ project.title }
                    subtitle={ project.summary }
                />
            </div>

            {/* Featured Image */ }
            <div className="container mx-auto">
                <div className="relative w-full h-[250px] md:h-[500px] rounded-xl overflow-hidden">
                    <Image
                        src={ formatImageUrl(project.featuredImage, 1920, 1080) || "/placeholder.svg" }
                        alt={ project.title }
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="(max-width: 768px) 100vw, 1200px"
                        quality={ 90 }
                    />
                </div>
            </div>

            {/* Project Overview */ }
            <SectionWrapper>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <SectionTitle title="Project Overview" alignment="left" />
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed mb-6">{ project.overview }</p>
                                { project.description.map((paragraph, index) => (
                                    <p key={ index } className="mb-4">
                                        { paragraph }
                                    </p>
                                )) }
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4">Project Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-base text-gray-700 font-bold dark:text-gray-400">Client</h4>
                                    <p className="font-medium">{ project.client }</p>
                                </div>
                                <div>
                                    <h4 className="text-base text-gray-700 font-bold dark:text-gray-400">Industry</h4>
                                    <p className="font-medium">{ project.industry }</p>
                                </div>
                                <div>
                                    <h4 className="text-base text-gray-700 font-bold dark:text-gray-400">Services</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        { project.services.map((service, index) => (
                                            <span
                                                key={ index }
                                                className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                                            >
                                                { service }
                                            </span>
                                        )) }
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-base text-gray-700 font-bold dark:text-gray-400">Technologies</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        { project.technologies.map((tech, index) => (
                                            <span
                                                key={ index }
                                                className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-full"
                                            >
                                                { tech }
                                            </span>
                                        )) }
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-6">
                                    <div className="flex items-center text-sm">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                        <span>{ project.date }</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                                        <span>{ project.duration }</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Tag className="w-4 h-4 mr-2 text-blue-600" />
                                        <span>{ project.category }</span>
                                    </div>
                                </div>
                                { project.website && (
                                    <div>
                                        <h4 className="font-bold text-gray-700 dark:text-gray-400">Website</h4>
                                        <a
                                            href={ project.website }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium inline-flex items-center"
                                        >
                                            Visit Website
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                ) }
                                <div className="pt-2">
                                    <Button variant="outline" size="sm" className="justify-start w-fit">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share Project
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Project Gallery */ }
            <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <span className='bg-blue-600 block w-5 h-0.5'></span>
                        <h2 className="text-blue-600 text-sm font-medium">Visual Showcase</h2>
                        <span className='bg-blue-600 block w-5 h-0.5'></span>
                    </div>
                    <AnimatedText text="Project Gallery" className="text-3xl font-bold justify-center mb-10" as="h2" />

                    <MediaGallery media={ optimizedGallery } />
                </div>
            </SectionWrapper>

            {/* Results & Outcomes */ }
            <SectionWrapper>
                <div className="container mx-auto">
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <span className='bg-blue-600 block w-5 h-0.5'></span>
                        <h2 className="text-blue-600 text-sm font-medium">Project Impact</h2>
                        <span className='bg-blue-600 block w-5 h-0.5'></span>
                    </div>
                    <AnimatedText text="Results & Outcomes" className="text-3xl font-bold justify-center mb-10" as="h2" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        { project.results.map((result, index) => (
                            <div
                                key={ index }
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">{ index + 1 }</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{ result.title }</h3>
                                <p className="text-gray-600 dark:text-gray-300">{ result.description }</p>
                            </div>
                        )) }
                    </div>
                </div>
            </SectionWrapper>

            {/* Testimonial (if available) */ }
            { project.testimonial && (
                <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="text-5xl text-blue-600 dark:text-blue-400 mb-6">"</div>
                            <p className="text-xl md:text-2xl italic mb-6">{ project.testimonial.quote }</p>
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                    <Image
                                        src={ project.testimonial.avatar || "/placeholder.svg?height=48&width=48" }
                                        alt={ project.testimonial.name }
                                        width={ 48 }
                                        height={ 48 }
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold">{ project.testimonial.name }</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        { project.testimonial.position }, { project.testimonial.company }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            ) }

            {/* Project Navigation */ }
            <SectionWrapper className="border-t border-gray-200 dark:border-gray-800">
                <div className="container mx-auto">
                    <ProjectNavigation currentProjectId={ project.id } />
                </div>
            </SectionWrapper>

            {/* Related Projects */ }
            <SectionWrapper className="bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto">
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <span className='bg-blue-600 block w-5 h-0.5'></span>
                        <h2 className="text-blue-600 text-sm font-medium">Explore More</h2>
                        <span className='bg-blue-600 block w-5 h-0.5'></span>
                    </div>
                    <AnimatedText text="Related Projects" className="text-3xl font-bold justify-center mb-10" as="h2" />

                    <RelatedProjects projects={ relatedProjects } />
                    <div className="text-center mt-12">
                        <Button asChild>
                            <Link href="/portfolio">View All Projects</Link>
                        </Button>
                    </div>
                </div>
            </SectionWrapper>

            {/* CTA Section */ }
            <SectionWrapper>
                <div className="container mx-auto">
                    <div className="bg-blue-600 dark:bg-blue-900 rounded-2xl p-8 md:p-12 text-white">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your project?</h2>
                            <p className="text-blue-100 mb-8">
                                Let's discuss how we can help you achieve your business goals with our IT solutions.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild variant="secondary">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
                                >
                                    <Link href="/services">Our Services</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </PageTransition>
    )
}
