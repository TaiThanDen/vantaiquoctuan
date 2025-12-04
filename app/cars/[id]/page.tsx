"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTruck } from "@/app/hooks/trucks/getTruckBySlug";
import MiniHeroBanner from "@/app/components/MiniHeroBanner";

export default function TruckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { truck, loading, error } = useTruck(resolvedParams.id);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#ff4500]"></div>
      </div>
    );
  }

  if (error || !truck) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {error || "Không tìm thấy xe"}
        </h1>
        <Link href="/cars" className="text-[#ff4500] hover:underline">
          ← Quay lại danh sách xe
        </Link>
      </div>
    );
  }

  const mainImage =
    truck.images && truck.images.length > 0
      ? truck.images[0].url
      : "/assets/truck-placeholder.jpeg";

  return (
    <div className="pt-3">
      {/* Hero Banner */}
      <MiniHeroBanner
        backgroundImage={mainImage}
        title={truck.name}
        description={truck.description || "Thông tin chi tiết về xe"}
        buttonText="Đặt xe ngay"
        buttonHref="/order#booking"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/cars"
          className="inline-flex items-center text-[#ff4500] hover:underline mb-6"
        >
          ← Quay lại danh sách xe
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 w-full bg-gray-200 rounded-xl overflow-hidden mb-4">
              <Image
                src={mainImage}
                alt={truck.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {truck.images && truck.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {truck.images.slice(1, 5).map((image: any, index: number) => (
                  <div
                    key={image.id}
                    className="relative h-24 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={image.image_url}
                      alt={`${truck.name} - ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {truck.name}
            </h1>

            {/* Status Badge */}
            <div className="mb-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  truck.status === "available"
                    ? "bg-green-100 text-green-700"
                    : truck.status === "in_use"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {truck.status === "available"
                  ? "Sẵn sàng"
                  : truck.status === "in_use"
                  ? "Đang sử dụng"
                  : "Bảo trì"}
              </span>
            </div>

            {/* Description */}
            {truck.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Mô tả
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {truck.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Thông số kỹ thuật
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700">Model:</span>
                  <span className="text-gray-600">{truck.models}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700">Hãng:</span>
                  <span className="text-gray-600">{truck.brand}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-semibold text-gray-700">
                    Tải trọng:
                  </span>
                  <span className="text-[#ff4500] font-bold">
                    {truck.load} {truck.load_unit}
                  </span>
                </div>
                {truck.year && (
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">
                      Năm sản xuất:
                    </span>
                    <span className="text-gray-600">{truck.year}</span>
                  </div>
                )}
                {truck.color && (
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">
                      Màu sắc:
                    </span>
                    <span className="text-gray-600">{truck.color}</span>
                  </div>
                )}
                {truck.license_plate && (
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-700">
                      Biển số:
                    </span>
                    <span className="text-gray-600">{truck.license_plate}</span>
                  </div>
                )}
                {truck.registration_expiry && (
                  <div className="flex justify-between pb-2">
                    <span className="font-semibold text-gray-700">
                      Hạn đăng kiểm:
                    </span>
                    <span className="text-gray-600">
                      {new Date(truck.registration_expiry).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Owner Info */}
            {(truck.owner_name || truck.owner_phone) && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Thông tin chủ xe
                </h2>
                <div className="space-y-2">
                  {truck.owner_name && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Tên:</span>{" "}
                      {truck.owner_name}
                    </p>
                  )}
                  {truck.owner_phone && (
                    <p className="text-gray-700">
                      <span className="font-semibold">SĐT:</span>{" "}
                      {truck.owner_phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Truck Types */}
            {truck.truck_types && truck.truck_types.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Loại xe
                </h2>
                <div className="flex flex-wrap gap-2">
                  {truck.truck_types.map((type: any) => (
                    <span
                      key={type.id}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <Link
              href="/order#booking"
              className="block w-full bg-[#ff4500] text-white text-center font-semibold py-3 rounded-lg hover:bg-[#e63e00] transition-colors"
            >
              Đặt xe này ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
