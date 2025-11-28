"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

type RelatedItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  bannerImage?: string;
  createdTime?: string;
};

type RelatedItemsProps = {
  items: RelatedItem[];
  title?: string;
};

const RelatedItems = ({
  items,
  title = "Tin tức liên quan",
}: RelatedItemsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Kiểm tra khả năng scroll
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          {title}
        </h2>

        {/* Scroll Container với navigation buttons */}
        <div className="relative group">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {item.bannerImage && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={item.bannerImage}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 hover:text-green-600 transition-colors line-clamp-2 mb-3 min-h-14">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                        {item.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {item.createdTime && (
                        <p className="text-xs text-gray-400">
                          {new Date(item.createdTime).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      )}
                      <span className="text-sm text-green-600 font-medium hover:underline">
                        Xem chi tiết →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 text-gray-400 font-semibold">
            <svg
              className="w-5 h-5 animate-bounce-horizontal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Vuốt để xem thêm tin tức</span>
            <svg
              className="w-5 h-5 animate-bounce-horizontal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes bounce-horizontal {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25%);
          }
        }
      `}</style>
    </div>
  );
};

export default RelatedItems;
