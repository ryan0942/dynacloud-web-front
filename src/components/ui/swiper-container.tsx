"use client";

import { ChevronRight } from "lucide-react";
import type React from "react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

interface SwiperContainerProps {
  children: React.ReactNode[];
  itemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function SwiperContainer({
  children,
  itemsPerView = 1,
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}: SwiperContainerProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className={`relative ${className}`}>
      <Swiper
        className="!grid !h-full !w-full"
        loop={children.length > itemsPerView}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={gap}
        autoplay={
          autoPlay
            ? {
                delay: autoPlayInterval,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        breakpoints={{
          768: {
            slidesPerView: Math.min(2, itemsPerView),
          },
          1024: {
            slidesPerView: Math.min(3, itemsPerView),
          },
          1280: {
            slidesPerView: itemsPerView,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children.map((child, index) => {
          const key =
            (child as React.ReactElement)?.key ?? `swiper-slide-${index}`;
          return (
            <SwiperSlide key={key} className="!h-full">
              <div className="h-full">{child}</div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-6 flex items-center justify-center gap-2 md:justify-end">
        <button
          aria-label="Previous slide"
          className="flex size-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          onClick={handlePrevious}
        >
          <ChevronRight className="size-4 rotate-180" />
        </button>
        <button
          aria-label="Next slide"
          className="flex size-8 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-blue-700"
          onClick={handleNext}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
