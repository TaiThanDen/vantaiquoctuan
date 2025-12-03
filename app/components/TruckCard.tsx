import Link from "next/link";
import { Truck } from "@/services/trucks.client";

interface TruckCardProps {
  truck: Truck;
}

export default function TruckCard({ truck }: TruckCardProps) {
  const firstImage =
    truck.images && truck.images.length > 0
      ? truck.images[0].url
      : "/assets/truck-placeholder.jpg";

  return (
    <Link href={`/cars/${truck.id}`}>
      <div className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden cursor-pointer">
        {/* Image Section */}
        <div className="relative h-48 w-full bg-gray-200">
          {firstImage && (
            <img
              src={firstImage}
              alt={truck.name}
              className="object-cover rounded w-full h-full"
              loading="lazy"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Truck Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">{truck.name}</h3>

          {/* Model */}
          {truck.models && (
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Model:</span> {truck.models}
            </p>
          )}

          {/* Load Capacity */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-700">Tải trọng:</span>
            <span className="text-[#ff4500] font-bold">
              {truck.load} {truck.load_unit}
            </span>
          </div>

          {/* Brand */}
          {truck.brand && (
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Hãng:</span> {truck.brand}
            </p>
          )}

          {/* Status */}
          <div className="mt-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                truck.status === "available"
                  ? "bg-green-100 text-green-700"
                  : truck.status === "in_use"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {truck.status === "active"
                ? "Sẵn sàng"
                : truck.status === "in_use"
                ? "Đang sử dụng"
                : "Bảo trì"}
            </span>
          </div>

          {/* View Details Button */}
          <div className="mt-4">
            <span className="text-[#ff4500] font-semibold hover:underline">
              Xem chi tiết →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
