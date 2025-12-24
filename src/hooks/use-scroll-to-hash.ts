"use client";

import { useEffect } from "react";

import { usePathname } from "@/i18n/navigation";

/**
 * Custom hook to handle smooth scrolling to hash anchors after navigation
 * Works with Next.js App Router and handles both route changes and hash changes
 *
 * @param options - Configuration options
 * @param options.behavior - Scroll behavior (default: "smooth")
 * @param options.maxAttempts - Maximum retry attempts to find element (default: 20)
 * @param options.retryDelay - Delay between retry attempts in ms (default: 50)
 */
export function useScrollToHash(options?: {
  behavior?: ScrollBehavior;
  maxAttempts?: number;
  retryDelay?: number;
}) {
  const pathname = usePathname();
  const {
    behavior = "smooth",
    maxAttempts = 20,
    retryDelay = 50,
  } = options || {};

  useEffect(() => {
    const scrollToHash = (hash?: string) => {
      const targetId = (hash ?? window.location.hash).replace("#", "");
      if (!targetId) return;

      let attempts = 0;

      const tryScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          // Use scrollIntoView for native browser behavior
          // Offset should be handled by the anchor element's position
          element.scrollIntoView({ behavior });
          return true;
        }

        if (attempts < maxAttempts) {
          attempts += 1;
          setTimeout(tryScroll, retryDelay);
        }
        return false;
      };

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(tryScroll);
    };

    // Handle initial hash on route change
    if (window.location.hash) {
      scrollToHash();
    }

    // Handle hash changes (e.g., clicking same-page anchor links)
    const handleHashChange = () => scrollToHash();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, behavior, maxAttempts, retryDelay]);
}
