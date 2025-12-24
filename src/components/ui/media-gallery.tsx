"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
  Volume2,
  VolumeX,
  Pause,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { formatImageUrl } from "@/lib/image-utils";
import type { MediaItem } from "@/lib/media-utils";
import { cn } from "@/lib/utils";

interface MediaGalleryProps {
  media: MediaItem[];
  className?: string;
}

export function MediaGallery({ media, className }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const galleryItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const mediaElement = entry.target as
              | HTMLImageElement
              | HTMLVideoElement;
            if (mediaElement.dataset.src) {
              mediaElement.src = mediaElement.dataset.src;
              observerRef.current?.unobserve(mediaElement);
            }
          }
        });
      },
      { rootMargin: "200px" },
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Observe gallery items for lazy loading
  useEffect(() => {
    galleryItemsRef.current.forEach((item) => {
      if (item) {
        const mediaElement = item.querySelector("img, video");
        if (mediaElement && observerRef.current) {
          observerRef.current.observe(mediaElement);
        }
      }
    });
  }, [media]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
    setIsPlaying(false);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
    setIsPlaying(false);
  };

  const navigateMedia = (direction: "next" | "prev") => {
    if (selectedIndex === null) return;

    if (direction === "next") {
      setSelectedIndex((selectedIndex + 1) % media.length);
    } else {
      setSelectedIndex((selectedIndex - 1 + media.length) % media.length);
    }
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateMedia("next");
      } else if (e.key === "ArrowLeft") {
        navigateMedia("prev");
      } else if (e.key === " " && media[selectedIndex].type === "video") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === "m" && media[selectedIndex].type === "video") {
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, media, isPlaying]);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          className,
        )}
      >
        {media.map((item, index) => (
          <motion.div
            key={index}
            ref={(el) => (galleryItemsRef.current[index] = el)}
            className="group relative cursor-pointer overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            onClick={() => openLightbox(index)}
          >
            <div className="relative aspect-[4/3] w-full">
              {item.type === "image" ? (
                <Image
                  fill
                  alt={item.alt}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={formatImageUrl(item.src, 600, 450) || "/placeholder.svg"}
                />
              ) : (
                <div className="size-full">
                  <Image
                    fill
                    alt={item.alt}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={formatImageUrl(
                      item.thumbnail || item.poster || "/placeholder.svg",
                      600,
                      450,
                    )}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
                      <Play className="size-8 fill-white text-white" />
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
            </div>
            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm">{item.caption}</p>
              </div>
            )}
            {item.type === "video" && (
              <div className="absolute right-4 top-4 rounded bg-black/50 px-2 py-1 text-xs text-white">
                Video
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 md:p-8"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button
              aria-label="Close lightbox"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="size-6" />
            </button>

            <div
              className="relative max-h-[85vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex size-full items-center justify-center">
                {media[selectedIndex].type === "image" ? (
                  <Image
                    priority
                    alt={media[selectedIndex].alt}
                    className="max-h-[85vh] w-auto object-contain"
                    height={1080}
                    width={1920}
                    src={
                      formatImageUrl(media[selectedIndex].src, 1920, 1080) ||
                      "/placeholder.svg"
                    }
                  />
                ) : (
                  <div className="relative w-full max-w-4xl">
                    <video
                      ref={videoRef}
                      playsInline
                      className="max-h-[75vh] w-full object-contain"
                      controls={false}
                      poster={media[selectedIndex].poster}
                      src={media[selectedIndex].src}
                      onEnded={() => setIsPlaying(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4">
                      <button
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="p-2 text-white transition-colors hover:text-blue-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}
                      >
                        {isPlaying ? (
                          <Pause className="size-6" />
                        ) : (
                          <Play className="size-6" />
                        )}
                      </button>
                      <div className="flex items-center space-x-4">
                        <button
                          aria-label={isMuted ? "Unmute video" : "Mute video"}
                          className="p-2 text-white transition-colors hover:text-blue-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                        >
                          {isMuted ? (
                            <VolumeX className="size-5" />
                          ) : (
                            <Volume2 className="size-5" />
                          )}
                        </button>
                        <button
                          aria-label="Toggle fullscreen"
                          className="p-2 text-white transition-colors hover:text-blue-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current) {
                              if (document.fullscreenElement) {
                                document.exitFullscreen();
                              } else {
                                videoRef.current.requestFullscreen();
                              }
                            }
                          }}
                        >
                          <Maximize2 className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {media[selectedIndex].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-black/50 p-4 text-center text-white">
                  <p>{media[selectedIndex].caption}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <button
                aria-label="Previous image"
                className={cn(
                  "absolute top-1/2 left-4 transform -translate-y-1/2 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors",
                  media.length <= 1 && "hidden",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateMedia("prev");
                }}
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                aria-label="Next image"
                className={cn(
                  "absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors",
                  media.length <= 1 && "hidden",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateMedia("next");
                }}
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            {/* Media counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white">
              {selectedIndex + 1} / {media.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
