"use client";

import MiniHeroBanner from "../components/MiniHeroBanner";
import TruckCard from "../components/TruckCard";
import { useTrucks } from "../hooks/trucks/getTrucks";

export default function CarPage() {
  const { trucks, loading, error } = useTrucks();

  return (
    <div className="pt-3">
      <MiniHeroBanner
        backgroundImage="https://traton.com/.imaging/mte/tab-theme/standardLandscape-L/dam/01_Unternehmen/00_Landing-Page/01_Header/Archive/traton-3trucks-2020-50-teaser.jpg/jcr:content_en/TRATON-3trucks-2020-50_teaser.jpg"
        title="Danh mục xe"
        description="Lựa chọn dòng xe phù hợp cho nhu cầu vận chuyển của bạn với thông tin minh bạch và chi tiết."
        buttonText="Đặt xe ngay"
        buttonHref="/order#booking"
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold md:my-5 pt-5 my-5 text-center text-[#ff4500]">
          Danh mục xe
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff4500]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Trucks Grid */}
        {!loading && !error && trucks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {trucks.map((truck) => (
              <TruckCard key={truck.id} truck={truck} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && trucks.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Chưa có xe nào trong hệ thống</p>
          </div>
        )}
      </div>
    </div>
  );
}
