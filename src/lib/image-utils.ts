// Helper functions for image optimization and management

/**
 * Formats an image URL for responsive sizes
 * @param baseUrl The base URL of the image
 * @param width The desired width
 * @param height The desired height (optional)
 * @returns Formatted image URL
 */
export function formatImageUrl(
  baseUrl: string,
  width: number,
  height?: number,
): string {
  // This is a placeholder function that would normally handle CDN parameters
  // For Unsplash, we can use their sizing parameters
  if (baseUrl.includes("unsplash.com")) {
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}w=${width}${height ? `&h=${height}` : ""}&auto=format&q=80`;
  }

  // For Pexels
  if (baseUrl.includes("pexels.com")) {
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}${height ? `&h=${height}` : ""}&dpr=2`;
  }

  // Default case - return the original URL
  return baseUrl;
}

/**
 * Generates a placeholder blur data URL for an image
 * In a real implementation, this would generate actual blur data
 * @returns A placeholder blur data URL
 */
export function generateBlurPlaceholder(): string {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhAAAAABJRU5ErkJggg==";
}
