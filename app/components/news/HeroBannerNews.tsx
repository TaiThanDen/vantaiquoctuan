import { useState, useMemo, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { CarouselApi } from "../ui/carousel";

interface NewsBannerItem {
  image: string;
  title: string;
  content: string;
  date: string;
  category: string;
  link: string;
}

interface NewsHeroBannerProps {
  items: NewsBannerItem[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const NewsHeroBanner = ({
  items,
  autoPlay = true,
  autoPlayDelay = 4000,
}: NewsHeroBannerProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugins = useMemo(() => {
    if (!autoPlay) return [];
    return [
      Autoplay({
        delay: autoPlayDelay,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ];
  }, [autoPlay, autoPlayDelay]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ align: "start", loop: true }}
          plugins={plugins}
        >
          <CarouselContent>
            {items.map((item, idx) => (
              <CarouselItem key={idx}>
                <div className="flex flex-col md:flex-row bg-gray-100 rounded-2xl overflow-hidden shadow-lg gap-4">
                  {/* Image left */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-1/2 h-48 md:h-96 object-cover"
                  />
                  {/* Content right */}
                  <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
                    <div>
                      <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6">
                        {item.content}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                        <span>{item.date}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          {item.category}
                        </span>
                      </div>
                      <a
                        href={item.link}
                        className="inline-block w-full md:w-auto mt-2 md:mt-0 px-5 py-2 bg-[#00aa64] text-white rounded-lg font-semibold hover:bg-[#008f53] transition text-center"
                      >
                        Đọc thêm
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="pl-2 hidden md:block" />
          <CarouselNext className="pl-2 hidden md:block" />
          {/* Dots */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === current - 1 ? "bg-[#00aa64]" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default NewsHeroBanner;
