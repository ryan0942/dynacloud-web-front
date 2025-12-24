/**
 * Utility functions for handling media (images and videos)
 */

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
  poster?: string;
}

/**
 * Formats image URL for optimal delivery based on device and viewport
 * @param url The original image URL
 * @param width Desired width
 * @param height Desired height
 * @param quality Image quality (1-100)
 * @returns Formatted image URL
 */
export function formatImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality = 80,
): string {
  // Handle placeholder SVGs
  if (url.includes("placeholder.svg")) {
    return url;
  }

  // Handle Unsplash images - they have their own optimization API
  if (url.includes("unsplash.com")) {
    const baseUrl = url.split("?")[0];
    const params = new URLSearchParams();

    if (width) params.append("w", width.toString());
    if (height) params.append("h", height.toString());
    params.append("q", quality.toString());
    params.append("auto", "format");
    params.append("fit", "crop");

    return `${baseUrl}?${params.toString()}`;
  }

  // Handle other image sources
  // In a real app, you might use a CDN like Cloudinary, Imgix, etc.
  return url;
}

/**
 * Formats video URL for optimal delivery
 * @param url The original video URL
 * @param quality The desired quality (low, medium, high)
 * @returns Formatted video URL
 */
export function formatVideoUrl(
  url: string,
  _quality: "low" | "medium" | "high" = "high",
): string {
  // This would normally handle CDN parameters or video transcoding service URLs
  // For now, we'll just return the original URL
  return url;
}

/**
 * Generates a video thumbnail at a specific timestamp
 * In a real implementation, this would call a video processing service
 * @param videoUrl The video URL
 * @param timestamp The timestamp in seconds
 * @returns URL to the thumbnail image
 */
export function generateVideoThumbnail(
  videoUrl: string,
  _timestamp = 0,
): string {
  // This is a placeholder that would normally generate a thumbnail
  // For now, we'll return a placeholder
  return "/placeholder.svg?height=450&width=600";
}

/**
 * Determines if a video format is supported by the browser
 * @param format The video format/extension
 * @returns Boolean indicating if the format is supported
 */
export function isVideoFormatSupported(format: string): boolean {
  if (typeof window === "undefined") return true; // SSR check

  const video = document.createElement("video");

  switch (format.toLowerCase()) {
    case "mp4":
      return video.canPlayType("video/mp4") !== "";
    case "webm":
      return video.canPlayType("video/webm") !== "";
    case "ogg":
      return video.canPlayType("video/ogg") !== "";
    case "mov":
      return video.canPlayType("video/quicktime") !== "";
    default:
      return false;
  }
}

/**
 * Optimizes a collection of media items for web delivery
 * @param media Array of media items
 * @returns Optimized media items
 */
export function optimizeMediaItems(media: MediaItem[]): MediaItem[] {
  return media.map((item) => {
    if (item.type === "image") {
      return {
        ...item,
        src: formatImageUrl(item.src, 1200, 800, 85),
      };
    } else {
      // For videos, ensure we have a thumbnail/poster
      return {
        ...item,
        poster:
          item.poster || item.thumbnail || generateVideoThumbnail(item.src),
        thumbnail:
          item.thumbnail || item.poster || generateVideoThumbnail(item.src),
      };
    }
  });
}

/**
 * Preloads critical media items for faster display
 * @param mediaItems Array of media items to potentially preload
 * @param count Number of items to preload
 */
export function preloadCriticalMedia(mediaItems: MediaItem[], count = 2): void {
  if (typeof window === "undefined") return; // SSR check

  // Only preload the first few items
  const itemsToPreload = mediaItems.slice(0, count);

  itemsToPreload.forEach((item) => {
    if (item.type === "image") {
      const img = new Image();
      img.src = formatImageUrl(item.src, 1200, 800);
    } else if (item.type === "video") {
      // For videos, preload the poster/thumbnail
      if (item.poster) {
        const img = new Image();
        img.src = item.poster;
      }

      // Optionally preload video for critical content
      // const link = document.createElement('link')
      // link.rel = 'preload'
      // link.as = 'video'
      // link.href = item.src
      // document.head.appendChild(link)
    }
  });
}
