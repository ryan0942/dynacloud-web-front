"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface SliderContainerProps {
  children: React.ReactNode[];
  itemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function SliderContainer({
  children,
  itemsPerView = 1,
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}: SliderContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_isMobile, setIsMobile] = useState(false);
  // 依照螢幕寬度決定「理想欄數」（1 / 2 / 3），用來控制寬度比例
  const [columns, setColumns] = useState(itemsPerView);
  // 實際一頁顯示幾筆，用於分頁與輪播邏輯（會被 totalItems 限制）
  const [itemsToShow, setItemsToShow] = useState(itemsPerView);
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      let baseColumns = 1;

      if (width < 768) {
        // 手機：固定 1 欄
        baseColumns = 1;
        setIsMobile(true);
      } else if (width < 1024) {
        // 平板：最多 2 欄
        baseColumns = Math.min(2, itemsPerView);
        setIsMobile(false);
      } else if (width < 1280) {
        // 小桌機：最多 3 欄
        baseColumns = Math.min(3, itemsPerView);
        setIsMobile(false);
      } else {
        // 大桌機（> 1280px）：支援 4 欄或更多
        baseColumns = itemsPerView;
        setIsMobile(false);
      }

      // 記錄目前視窗理想欄數（用來決定每張卡片寬度比例）
      setColumns(baseColumns);

      // 實際一頁顯示數量不得超過總資料數，避免在資料少於一頁時出現寬度異常
      const safeItemsToShow =
        totalItems > 0 ? Math.min(baseColumns, totalItems) : baseColumns;

      setItemsToShow(safeItemsToShow);

      // 若目前 index 已超過可以顯示的最大起始位置，重設為 0
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(totalItems - safeItemsToShow, 0);
        return Math.min(prev, maxIndex);
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView, totalItems]);

  useEffect(() => {
    // 當資料數量小於等於一頁可顯示數量時，不啟用自動輪播，避免不必要的 index 變動
    if (autoPlay && totalItems > itemsToShow) {
      const interval = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, autoPlay, autoPlayInterval, totalItems, itemsToShow]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [totalItems]);

  const handlePrevious = () => {
    // 若資料不足一頁，就不做切換，維持穩定寬度
    if (totalItems <= itemsToShow) return;

    const maxIndex = Math.max(totalItems - itemsToShow, 0);

    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  const handleNext = () => {
    // 若資料不足一頁，就不做切換，維持穩定寬度
    if (totalItems <= itemsToShow) return;

    const maxIndex = Math.max(totalItems - itemsToShow, 0);

    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrevious();
    }
  };

  const displayItems = () => {
    const visibleItems = children.slice(
      currentIndex,
      currentIndex + itemsToShow,
    );

    // 依照當前欄數(columns)嚴格控制每張卡片寬度：
    // 1 欄 => 100%，2 欄 => 50% / 50%，3 欄 => 33% / 33% / 33%，4 欄 => 25% / 25% / 25% / 25%
    // 使用 calc() 考慮 gap 的影響，確保總寬度不會超過 100%
    // 公式：每張卡片寬度 = (100% - (gap數 * gap寬度)) / columns
    const gapCount = Math.max(visibleItems.length - 1, 0);
    const gapTotalWidth = `${gapCount * gap}px`;
    const basisPercent = `calc((100% - ${gapTotalWidth}) / ${columns})`;

    return visibleItems.map((child, index) => {
      // 優先使用 child 本身的 key，避免 React key 警告
      const key = (child as any)?.key ?? index;

      return (
        <div
          key={key}
          className="shrink-0 [&>*]:size-full"
          style={{
            flexBasis: basisPercent,
            maxWidth: basisPercent,
            minWidth: 0,
          }}
        >
          {child}
        </div>
      );
    });
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        ref={sliderRef}
        className="flex w-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ gap: `${gap}px` }}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            animate={{ x: 0, opacity: 1 }}
            className="flex w-full items-stretch"
            exit={{ x: -100, opacity: 0 }}
            initial={{ x: 100, opacity: 0 }}
            style={{ gap: `${gap}px` }}
            transition={{ duration: 0.3 }}
          >
            {displayItems()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-2 md:justify-end">
        <button
          aria-label="Previous slide"
          className="flex size-8 items-center justify-center rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
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
