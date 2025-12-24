"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import QuoteIcon from "@/components/assets/quote-icon";
import { ImageLoader } from "@/components/ui/image-loader";
import { SliderContainer } from "@/components/ui/slider-container";

interface TestimonialProps {
  content: string;
  name: string;
  position: string;
  rating: number;
  index: number;
  highlighted?: boolean;
  src: string;
}

const TestimonialCard = ({
  src,
  content,
  name,
  position,
  rating: _rating,
  index,
  highlighted = false,
}: TestimonialProps) => {
  return (
    <motion.div
      transition={{ type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.02 }}
      className={`h-full min-w-[280px] flex-1 rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 md:min-w-[320px] ${
        highlighted ? "bg-blue-600 text-white" : "bg-white"
      }`}
    >
      <div className="mb-4 flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="size-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <p
        className={`${highlighted ? "text-blue-100" : "line-clamp-4 overflow-hidden text-ellipsis text-gray-600"} mb-6`}
      >
        {content}
      </p>
      <div className="flex items-center">
        <div className="mr-4 size-12 overflow-hidden rounded-full">
          <ImageLoader
            category={src}
            className="size-full object-cover"
            height={150}
            index={index}
            width={150}
          />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p
            className={`text-sm ${highlighted ? "text-blue-200" : "text-gray-500"}`}
          >
            {position}
          </p>
        </div>
        <div
          className={`ml-auto ${highlighted ? "text-white" : "text-gray-200"} text-2xl`}
        >
          <QuoteIcon />
        </div>
      </div>
    </motion.div>
  );
};

export function TestimonialsSlider() {
  const [_centerIndex, _setCenterIndex] = useState(0);

  const ClientTestimonials = [
    {
      content:
        "Working with Devun has been a game-changer for our business. Their expertise in web development helped us create a platform that truly resonates with our users.",
      name: "Sarah Johnson",
      position: "CEO, TechStart",
      rating: 5,
    },
    {
      content:
        "The team at Devun exceeded our expectations. Their attention to detail and commitment to quality delivered a solution that transformed our business operations.",
      name: "Carlos Mendez",
      position: "CTO, InnovateCorp",
      rating: 5,
      highlighted: true,
    },
    {
      content:
        "Devun's strategic approach to our digital marketing needs resulted in a significant increase in our online presence and customer engagement our business operations.",
      name: "Robert Lee",
      position: "Marketing Director, GrowthX",
      rating: 5,
    },
    {
      content:
        "The mobile app developed by Devun has received outstanding feedback from our customers. Their team's technical expertise and creativity are truly impressive.",
      name: "Jennifer Chen",
      position: "Product Manager, AppWorks",
      rating: 5,
    },
    {
      content:
        "We've worked with several IT companies, but Devun stands out for their professionalism and ability to deliver complex projects on time and within budget.",
      name: "Michael Rodriguez",
      position: "COO, Enterprise Solutions",
      rating: 5,
      highlighted: true,
    },
  ];

  return (
    <div>
      <SliderContainer
        autoPlay={true}
        autoPlayInterval={7000}
        gap={24}
        itemsPerView={3}
      >
        {ClientTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            content={testimonial.content}
            highlighted={testimonial.highlighted}
            index={index}
            name={testimonial.name}
            position={testimonial.position}
            rating={testimonial.rating}
            src="teamMembers"
          />
        ))}
      </SliderContainer>
    </div>
  );
}
