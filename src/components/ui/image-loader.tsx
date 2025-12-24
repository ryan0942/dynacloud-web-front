"use client";

import { useState, useEffect } from "react";

import { formatImageUrl } from "@/lib/image-utils";

import { ImageWithFallback } from "./image-with-fallback";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageCatalog {
  [category: string]: ImageData[];
}

interface ImageLoaderProps {
  category: string;
  index?: number;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function ImageLoader({
  category,
  index = 0,
  width,
  height,
  className,
  priority = false,
  quality = 80,
}: ImageLoaderProps) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImageCatalog() {
      try {
        // In a real implementation, this would be fetched from an API or imported directly
        const response = await fetch("/images/image-catalog.json");
        const catalog: ImageCatalog = await response.json();

        if (catalog[category] && catalog[category].length > 0) {
          // Get the image at the specified index, or wrap around if index is out of bounds
          const actualIndex = index % catalog[category].length;
          setImageData(catalog[category][actualIndex]);
        }
      } catch (error) {
        console.error("Failed to load image catalog:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadImageCatalog();
  }, [category, index]);

  if (isLoading || !imageData) {
    // Return a skeleton loader while loading
    return (
      <div
        className={`animate-pulse bg-gray-200 dark:bg-gray-800 ${className}`}
        style={{ width: width || "100%", height: height || 300 }}
      />
    );
  }

  // Format the image URL for the requested size
  const optimizedSrc = formatImageUrl(
    imageData.src,
    width || imageData.width,
    height || imageData.height,
  );

  return (
    <ImageWithFallback
      alt={imageData.alt}
      className={className}
      height={height || imageData.height}
      priority={priority}
      quality={quality}
      src={optimizedSrc || "/placeholder.svg"}
      width={width || imageData.width}
    />
  );
}
