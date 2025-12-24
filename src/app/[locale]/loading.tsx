"use client";

import "@/styles/globals.css";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LayoutLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoading = () => setLoading(false);

    const timer = setTimeout(handleLoading, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white">
          <Image alt="logo" height={100} src="/logo.svg" width={300} />
        </div>
      )}
    </>
  );
}
