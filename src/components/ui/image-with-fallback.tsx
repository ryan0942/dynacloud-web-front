"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string;
};

export function ImageWithFallback({
  src,
  fallbackSrc = "/images/placeholder-minimal.jpg",
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc || "/placeholder.svg"}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
