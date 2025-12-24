"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { getBannersQuery } from "@/queries/home/banners";
import { GetBannersResponse } from "@/types/api-response/banners";

import { NoDataPlaceholder } from "../ui/no-data-placeholder";

export function Banner() {
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /** 取得資料 */
  const { data } = useQuery(getBannersQuery());
  const banners = data?.result ?? [];

  /** 清除計時器 */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /** 停止所有影片並重置到第 0 秒 */
  const stopAllVideos = useCallback(() => {
    videoRefs.current.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }, []);

  /** 播放指定索引的影片（如果是影片類型） */
  const playVideoAtIndex = useCallback((index: number) => {
    const video = videoRefs.current.get(index);
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {
        // 自動播放被阻擋時忽略錯誤
      });
    }
  }, []);

  /** 設定當前投影片的計時器 */
  const startSlideTimer = useCallback(() => {
    clearTimer();

    if (!isVisible || banners.length <= 1) return;

    const currentBanner = banners[activeIndex];
    if (!currentBanner) return;

    const delay = currentBanner.duration * 1000;

    timerRef.current = setTimeout(() => {
      swiperRef.current?.slideNext();
    }, delay);
  }, [activeIndex, banners, clearTimer, isVisible]);

  /** 處理投影片切換 */
  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const newIndex = swiper.realIndex;
      setActiveIndex(newIndex);

      // 停止所有影片
      stopAllVideos();

      // 如果新的投影片是影片，則播放
      if (isVisible && banners[newIndex]?.type === "VIDEO") {
        playVideoAtIndex(newIndex);
      }
    },
    [banners, isVisible, playVideoAtIndex, stopAllVideos],
  );

  /** Intersection Observer：偵測 Banner 是否在可視範圍 */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  /** 當可視狀態或 activeIndex 改變時，控制影片播放和計時器 */
  useEffect(() => {
    if (isVisible) {
      // Banner 進入可視範圍
      if (banners[activeIndex]?.type === "VIDEO") {
        playVideoAtIndex(activeIndex);
      }
      startSlideTimer();
    } else {
      // Banner 離開可視範圍
      clearTimer();
      stopAllVideos();
    }

    return () => {
      clearTimer();
    };
  }, [
    isVisible,
    activeIndex,
    banners,
    playVideoAtIndex,
    startSlideTimer,
    clearTimer,
    stopAllVideos,
  ]);

  /** 組件卸載時清理 */
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  /** 註冊影片 ref */
  const registerVideoRef = useCallback(
    (index: number, element: HTMLVideoElement | null) => {
      if (element) {
        videoRefs.current.set(index, element);
      } else {
        videoRefs.current.delete(index);
      }
    },
    [],
  );

  /** 取得輪播項目內容 */
  const getCarouselItemContent = (
    { id, image, url, type, link }: GetBannersResponse[number],
    index: number,
  ) => {
    if (type === "VIDEO") {
      if (link) {
        return (
          <a
            className="block size-full"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <video
              ref={(el) => registerVideoRef(index, el)}
              muted
              playsInline
              className="pointer-events-none size-full rounded-2xl object-cover aspect-video"
              controls={false}
              src={url}
            />
          </a>
        );
      }
      return (
        <video
          ref={(el) => registerVideoRef(index, el)}
          muted
          playsInline
          className="pointer-events-none size-full rounded-2xl object-cover aspect-video"
          controls={false}
          src={url}
        />
      );
    } else {
      if (link) {
        return (
          <a
            className="block size-full"
            href={link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              priority
              alt={`Banner ${id}`}
              className="size-full rounded-2xl object-cover aspect-video"
              height={700}
              src={image}
              width={1250}
            />
          </a>
        );
      }
      return (
        <Image
          priority
          alt={`Banner ${id}`}
          className="size-full rounded-2xl object-cover aspect-video"
          height={700}
          src={image}
          width={1250}
        />
      );
    }
  };

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="mt-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 md:mt-16">
      <div ref={containerRef} className="container mx-auto px-4 md:px-10">
        {banners.length > 0 ? (
          <div className="relative">
            <Swiper
              className="w-full rounded-2xl aspect-video"
              loop={banners.length > 1}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={0}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={banner.id || index}>
                  {getCarouselItemContent(banner, index)}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 導航按鈕 */}
            {banners.length > 1 && (
              <>
                <button
                  aria-label="Previous slide"
                  className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 transition-all hover:scale-110 hover:bg-white/90 md:left-4 md:size-10"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="size-4 md:size-5" />
                </button>
                <button
                  aria-label="Next slide"
                  className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 transition-all hover:scale-110 hover:bg-white/90 md:right-4 md:size-10"
                  onClick={handleNext}
                >
                  <ChevronRight className="size-4 md:size-5" />
                </button>
              </>
            )}
          </div>
        ) : (
          <NoDataPlaceholder />
        )}
      </div>
    </section>
  );
}
