"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import { useEffect, useMemo, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/app/components/ui/carousel";

interface SolutionItem {
  image: string;
  imageAlt?: string;
  title: string;
  label: string;
  description: string;
  features: string[];
}

interface SolutionCarouselProps {
  items: SolutionItem[];
  // Bật/tắt auto play và cấu hình thời gian trễ
  autoPlay?: boolean;
  autoPlayDelay?: number; // ms
}

const SolutionCarousel = ({
  items,
  autoPlay = false,
  autoPlayDelay = 3000,
}: SolutionCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Chuẩn bị plugins theo props
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
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col relative bg-gray-50  ">
      {/* Tầng nền trên */}
      <section className="relative bg-[#ff4500] text-white h-[500px] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md z-20">
          Giải Pháp Vận Chuyển Nổi Bật
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-3xl z-20 mb-10">
          Tối ưu cho đơn hàng tải trọng lớn, chuyển nhà trọn gói và vận chuyển
          doanh nghiệp. chúng tôi nổi bật với đội xe 100kg–5 tấn, quy trình
          chuyên nghiệp từ A–Z.
        </p>
      </section>

      {/* Carousel nổi giữa 2 tầng */}
      <div className="relative z-30 -mt-35  md:-mt-48 w-[75%] mx-auto pb-8">
        <div className="bg-gray-100 rounded-2xl  overflow-hidden relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={plugins}
          >
            <CarouselContent>
              {items.map((item, idx) => (
                <CarouselItem key={idx}>
                  <div className="flex flex-col md:flex-row h-[520px] overflow-auto">
                    {/* Ảnh*/}
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      className="w-full h-56 object-cover md:w-[35%] md:h-full rounded-t-2xl md:rounded-none"
                    />
                    <div className="flex-1 bg-blue-500 text-white p-4 md:p-8 flex flex-col justify-center gap-4 md:gap-6 rounded-b-2xl md:rounded-none h-full">
                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base mb-2 md:mb-4">
                        {item.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                        {item.features.map((feature, i) => (
                          <div
                            key={i}
                            className="p-2 md:p-4 border border-white/30 rounded-xl text-center text-xs md:text-base"
                          >
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Dots Indicator - Nổi trên carousel */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40  ">
            <div className="flex space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current - 1
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCarousel;
